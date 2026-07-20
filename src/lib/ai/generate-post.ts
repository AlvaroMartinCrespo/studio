import { getSupabaseAdminClient, getSupabaseServerClient } from '@/lib/supabase/server';
import { groqChat } from './groq-client';
import { fetchPexelsImage } from './pexels-client';
import { TOPIC_POOL, type TopicCandidate } from './topic-pool';
import type { BlogPost } from '@/lib/types';

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

/** Elige un tema del pool que no se haya usado todavía (por `topic`). */
async function pickUnusedTopic(): Promise<TopicCandidate> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from('blog_posts').select('topic, title');
  if (error) {
    console.error('No se pudo leer el histórico de temas, se continúa igualmente:', error.message);
  }

  const usedTopics = new Set((data ?? []).map((p) => p.topic));
  const recentTitles = (data ?? []).map((p) => p.title as string);

  let candidates = TOPIC_POOL.filter((c) => !usedTopics.has(c.topic));

  // Pool agotado: se reutiliza, pero evitando el tema usado más recientemente
  // (mejor repetir algo de hace meses que algo de ayer).
  if (candidates.length === 0) {
    candidates = TOPIC_POOL;
  }

  // Evita elegir un candidato cuyo título semilla se parezca demasiado
  // (por si acaso) a un título ya publicado recientemente.
  const filtered = candidates.filter((c) =>
    recentTitles.every((title) => jaccardSimilarity(c.seedTitle, title) < 0.5)
  );

  const pool = filtered.length > 0 ? filtered : candidates;
  return pool[Math.floor(Math.random() * pool.length)];
}

interface GeneratedArticle {
  title: string;
  excerpt: string;
  contentHtml: string;
  tags: string[];
}

async function generateArticle(
  candidate: TopicCandidate,
  recentTitles: string[]
): Promise<GeneratedArticle> {
  const system = `${AUTHOR_CONTEXT}
Devuelves SIEMPRE un JSON válido con esta forma exacta, sin texto adicional fuera del JSON:
{
  "title": string,
  "excerpt": string (máximo 160 caracteres, resumen para SEO),
  "contentHtml": string (HTML del cuerpo del artículo, usando <p>, <h3>, <ul>/<li>, <code>/<pre> cuando aplique; 500-800 palabras, sin <html>/<body>, sin el título repetido dentro),
  "tags": string[] (3 a 5 tags cortos en minúscula, en español o el nombre técnico habitual)
}`;

  const user = `Escribe un artículo de blog técnico sobre: "${candidate.seedTitle}".
Tema base: ${candidate.topic}. Tags orientativos: ${candidate.tags.join(', ')}.

Para no repetirte, estos son los títulos ya publicados en el blog (evita enfoques y ejemplos casi idénticos a estos, aunque el tema de fondo se repita):
${recentTitles.length ? recentTitles.map((t) => `- ${t}`).join('\n') : '(todavía no hay posts publicados)'}

Escribe el artículo en español de España, con un ejemplo de código cuando tenga sentido, tono cercano y práctico.`;

  const raw = await groqChat(
    [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    { temperature: 0.85, jsonMode: true }
  );

  const parsed = JSON.parse(raw);
  return {
    title: parsed.title,
    excerpt: parsed.excerpt,
    contentHtml: parsed.contentHtml,
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
