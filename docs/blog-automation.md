# Blog automático (Groq + Pexels + Supabase)

## Qué hace

Cada día, un cron de Vercel llama a `/api/cron/generate-post`, que:

1. Elige un tema del pool en `src/lib/ai/topic-pool.ts` que **no se haya usado
   todavía** (comprobando los `topic` ya guardados en Supabase). Si el pool
   completo ya se usó, reutiliza el que lleve más tiempo sin tocarse, y
   además descarta candidatos cuyo título se parezca demasiado (similitud de
   palabras) a los últimos posts publicados. Así se evita, por ejemplo,
   publicar dos veces "punteros en C" seguidos.
2. Pide a Groq (`llama-3.3-70b-versatile` por defecto) que escriba el
   artículo completo en JSON: título, extracto SEO, HTML del cuerpo y tags,
   pasándole la lista de títulos recientes para que no se repita.
3. Busca en Pexels una imagen de portada relacionada con los tags del post.
4. Genera un slug único y lo guarda en la tabla `blog_posts` de Supabase con
   la Service Role Key (server-only, salta RLS).

Las páginas del blog (`/blog`, `/blog/[slug]`) y el `sitemap.xml` leen de
Supabase con la clave `anon` (solo lectura, vía policy pública). El SEO por
post (`generateMetadata`, Open Graph, Twitter card, JSON-LD `BlogPosting`) ya
estaba montado en el proyecto original; ahora se rellena con los datos
dinámicos en vez del array estático. Cada post enlaza a "Entradas
relacionadas" por tags en común (enlazado interno) y a un filtro por tag en
`/blog?tag=...`.

## Puesta en marcha

1. **Supabase**: crea un proyecto, abre el SQL Editor y ejecuta, en este
   orden, `supabase/schema.sql` y luego `supabase/seed.sql` (este último
   conserva el post original "¡Hola, Mundo!").
2. **Groq**: crea una API key en [console.groq.com](https://console.groq.com).
3. **Pexels**: crea una API key gratuita en
   [pexels.com/api](https://www.pexels.com/api/).
4. **Variables de entorno**: copia `.env.example` a `.env.local` en local, y
   añade las mismas variables en Vercel (Project Settings → Environment
   Variables). `CRON_SECRET` puede ser cualquier cadena aleatoria larga
   (`openssl rand -hex 32`); en cuanto exista como env var, Vercel Cron la
   manda sola como header `Authorization`.
5. **Deploy**: al hacer push, Vercel detecta `vercel.json` y registra el cron
   automáticamente (por defecto a las 08:00 UTC cada día — cámbialo en
   `vercel.json` si quieres otra hora).
6. **Probarlo a mano** antes de esperar al cron:
   ```bash
   curl -H "Authorization: Bearer TU_CRON_SECRET" \
     https://devalvaro.vercel.app/api/cron/generate-post
   ```

## Ampliar el pool de temas

Añade entradas en `TOPIC_POOL` (`src/lib/ai/topic-pool.ts`) con un `topic`
(id único y estable, no lo cambies una vez publicado) y unos `tags`. Cuantos
más temas haya en el pool, más tarda en empezar a repetir.
