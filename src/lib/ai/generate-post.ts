import { getSupabaseAdminClient, getSupabaseServerClient } from '@/lib/supabase/server';
import { groqChat } from './groq-client';
import { fetchPexelsImage } from './pexels-client';
import { TOPIC_POOL, CURIOSITY_TOPIC_POOL, type TopicCandidate } from './topic-pool';
import type { BlogPost } from '@/lib/types';

/**
 * Probabilidad de elegir un tema del pool de curiosidades en vez del técnico.
 * Deliberadamente baja: son un complemento ocasional, no el grueso del blog.
 */
const CURIOSITY_PROBABILITY = 0.12;

const AUTHOR_CONTEXT =
  'Escribes para el blog personal de Álvaro Martín Crespo, desarrollador frontend de Sevilla, España. ' +
  'El tono es cercano, claro y técnico pero accesible, en español de España, dirigido a otros desarrolladores ' +
  'y gente que empieza en programación web.';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function jaccardSimilarity(a: string, b: string): number {
  const setA = new Set(a.toLowerCase().split(/\W+/).filter(Boolean));
  const setB = new Set(b.toLowerCase().split(/\W+/).filter(Boolean));
  const intersection = new Set([...setA].filter((w) => setB.has(w)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

/** Elige un tema no usado todavía (por `topic`) dentro de un pool concreto. */
function pickFromPool(
  pool: TopicCandidate[],
  usedTopics: Set<string>,
  recentTitles: string[]
): TopicCandidate {
  let candidates = pool.filter((c) => !usedTopics.has(c.topic));

  // Pool agotado: se reutiliza, pero evitando el tema usado más recientemente
  // (mejor repetir algo de hace meses que algo de ayer).
  if (candidates.length === 0) {
    candidates = pool;
  }

  // Evita elegir un candidato cuyo título semilla se parezca demasiado
  // (por si acaso) a un título ya publicado recientemente.
  const filtered = candidates.filter((c) =>
    recentTitles.every((title) => jaccardSimilarity(c.seedTitle, title) < 0.5)
  );

  const finalPool = filtered.length > 0 ? filtered : candidates;
  return finalPool[Math.floor(Math.random() * finalPool.length)];
}

/**
 * Elige un tema para el próximo post. La mayoría de las veces sale del pool
 * técnico; con probabilidad CURIOSITY_PROBABILITY sale del pool de
 * curiosidades, para dar variedad sin que dominen el blog.
 */
async function pickUnusedTopic(): Promise<TopicCandidate> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from('blog_posts').select('topic, title');
  if (error) {
    console.error('No se pudo leer el histórico de temas, se continúa igualmente:', error.message);
  }

  const usedTopics = new Set((data ?? []).map((p) => p.topic));
  const recentTitles = (data ?? []).map((p) => p.title as string);

  const pool = Math.random() < CURIOSITY_PROBABILITY ? CURIOSITY_TOPIC_POOL : TOPIC_POOL;
  return pickFromPool(pool, usedTopics, recentTitles);
}

interface GeneratedArticle {
  title: string;
  excerpt: string;
  contentHtml: string;
  tags: string[];
}

/**
 * Escapa caracteres especiales de HTML para meter texto/código dentro de un
 * <pre><code> sin que `<`, `>` o `&` rompan el marcado de la página.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Red de seguridad: aunque el prompt pide HTML con <pre>/<code>, los modelos
 * a veces "recaen" en el hábito de Markdown y sueltan bloques ```lang ... ```
 * o `inline code` como texto plano. Eso es justo lo que se veía mal en la
 * página (sin resaltado, con saltos de línea colapsados). Aquí convertimos
 * cualquier resto de sintaxis Markdown que se haya colado a HTML real antes
 * de guardar el post, y escapamos el contenido de código para que un `<` o
 * `>` dentro de un ejemplo no rompa el HTML de la página.
 */
function normalizeContentHtml(html: string): string {
  let result = html;

  // Bloques de código ```lang\n...\n``` -> <pre><code class="language-lang">...</code></pre>
  result = result.replace(
    /```(\w+)?\n?([\s\S]*?)```/g,
    (_match, lang: string | undefined, code: string) => {
      const cls = lang ? ` class="language-${lang}"` : '';
      return `<pre><code${cls}>${escapeHtml(code.trim())}</code></pre>`;
    }
  );

  // Código inline `algo` -> <code>algo</code> (evitando tocar lo ya convertido arriba)
  result = result.replace(/`([^`\n]+)`/g, (_match, code: string) => `<code>${escapeHtml(code)}</code>`);

  // Negrita/cursiva Markdown residual, por si se cuela junto al resto
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

  return result;
}

async function generateArticle(
  candidate: TopicCandidate,
  recentTitles: string[],
  attempt = 1
): Promise<GeneratedArticle> {
  const system = `${AUTHOR_CONTEXT}
Devuelves SIEMPRE un JSON válido con esta forma exacta, sin texto adicional fuera del JSON:
{
  "title": string,
  "excerpt": string (máximo 160 caracteres, resumen para SEO),
  "contentHtml": string (HTML del cuerpo del artículo; 500-800 palabras, sin <html>/<body>, sin el título repetido dentro),
  "tags": string[] (3 a 5 tags cortos en minúscula, en español o el nombre técnico habitual)
}

Reglas estrictas para "contentHtml" (esto es HTML real que se inserta tal cual en la página, NUNCA Markdown):
- Párrafos con <p>, subtítulos con <h3>, listas con <ul>/<li>.
- Para código, usa EXCLUSIVAMENTE <pre><code>...</code></pre>. Prohibido usar los tres backticks (\`\`\`) de Markdown para bloques de código: no se renderizan como código en esta web, salen como texto plano.
- Para código inline dentro de un párrafo, usa EXCLUSIVAMENTE <code>...</code>. Prohibido usar backtick simple (\`palabra\`).
- Dentro de <pre><code>, escapa los símbolos < y > del propio código como &lt; y &gt; (por ejemplo un genérico Array<string> se escribe Array&lt;string&gt;).
- Para negrita usa <strong>, para cursiva <em>. Nunca ** ni * de Markdown.`;

  const isCuriosity = candidate.tags.includes('curiosidades');
  const user = `Escribe un artículo de blog sobre: "${candidate.seedTitle}".
Tema base: ${candidate.topic}. Tags orientativos: ${candidate.tags.join(', ')}.

Para no repetirte, estos son los títulos ya publicados en el blog (evita enfoques y ejemplos casi idénticos a estos, aunque el tema de fondo se repita):
${recentTitles.length ? recentTitles.map((t) => `- ${t}`).join('\n') : '(todavía no hay posts publicados)'}

Escribe el artículo en español de España, tono cercano y práctico.${
    isCuriosity
      ? ' Este es un post de curiosidades/cultura, no técnico: no fuerces ningún ejemplo de código.'
      : ' Incluye un ejemplo de código cuando tenga sentido, siguiendo las reglas de formato de HTML indicadas arriba.'
  }`;

  let parsed: { title: string; excerpt: string; contentHtml: string; tags?: string[] };
  try {
    const raw = await groqChat(
      [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      { temperature: 0.85, jsonMode: true, maxTokens: 4000 }
    );
    parsed = JSON.parse(raw);
  } catch (err) {
    // Fallo probabilístico del modelo generando JSON (respuesta cortada,
    // finish_reason=length, o JSON mal cerrado). Se reintenta un par de
    // veces antes de rendirse.
    if (attempt < 3) {
      console.warn(`Fallo generando el artículo (intento ${attempt}): ${(err as Error).message}. Reintentando...`);
      return generateArticle(candidate, recentTitles, attempt + 1);
    }
    throw new Error(`No se pudo generar el artículo tras ${attempt} intentos: ${(err as Error).message}`);
  }

  return {
    title: parsed.title,
    excerpt: parsed.excerpt,
    contentHtml: normalizeContentHtml(parsed.contentHtml),
    tags: Array.isArray(parsed.tags) && parsed.tags.length ? parsed.tags : candidate.tags,
  };
}

async function uniqueSlug(baseSlug: string): Promise<string> {
  const supabase = getSupabaseServerClient();
  let slug = baseSlug;
  let attempt = 1;
  // Comprueba colisiones y añade sufijo -2, -3... si hiciera falta.
  // (poco probable dado que cada `topic` es único, pero cubre el caso borde)
  while (true) {
    const { data } = await supabase.from('blog_posts').select('id').eq('slug', slug).maybeSingle();
    if (!data) return slug;
    attempt += 1;
    slug = `${baseSlug}-${attempt}`;
  }
}

export async function generateAndPublishPost(): Promise<BlogPost> {
  const supabaseRead = getSupabaseServerClient();
  const { data: existing } = await supabaseRead
    .from('blog_posts')
    .select('title')
    .order('created_at', { ascending: false })
    .limit(20);
  const recentTitles = (existing ?? []).map((p) => p.title as string);

  const candidate = await pickUnusedTopic();
  const article = await generateArticle(candidate, recentTitles);

  const image = await fetchPexelsImage(article.tags.join(' '), candidate.tags.join(' '));
  if (!image) {
    throw new Error('Pexels no devolvió ninguna imagen para este tema.');
  }

  const baseSlug = slugify(article.title);
  const slug = await uniqueSlug(baseSlug);

  const admin = getSupabaseAdminClient();
  const { data, error } = await admin
    .from('blog_posts')
    .insert({
      slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.contentHtml,
      image_url: image.url,
      image_alt: image.alt,
      image_credit_name: image.photographerName,
      image_credit_url: image.photographerUrl,
      topic: candidate.topic,
      tags: article.tags,
      date: new Date().toISOString().slice(0, 10),
    })
    .select('*')
    .single();

  if (error) {
    throw new Error(`No se pudo guardar el post en Supabase: ${error.message}`);
  }

  return data as BlogPost;
}
