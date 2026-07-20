-- Esquema para el blog automático de devalvaro.vercel.app
-- Ejecutar en el SQL editor de Supabase (proyecto nuevo o existente).

create extension if not exists "pgcrypto";

create table if not exists blog_posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  excerpt     text not null,
  content     text not null,          -- HTML, igual que los posts actuales
  image_url   text not null,
  image_alt   text not null,
  image_credit_name text,             -- autor de la foto en Pexels (crédito, buena práctica)
  image_credit_url  text,
  topic       text not null,          -- identificador del tema elegido del pool (control anti-repetición)
  tags        text[] not null default '{}',
  date        date not null default current_date,
  created_at  timestamptz not null default now()
);

create index if not exists blog_posts_date_idx on blog_posts (date desc);
create index if not exists blog_posts_tags_idx on blog_posts using gin (tags);
create index if not exists blog_posts_topic_idx on blog_posts (topic);
-- Nota: `topic` NO es único a propósito: cuando el pool de temas se agota,
-- el generador puede reutilizar un `topic` antiguo (ver src/lib/ai/generate-post.ts).

alter table blog_posts enable row level security;

-- Lectura pública (la web la consulta con la clave anon)
drop policy if exists "Public can read blog posts" on blog_posts;
create policy "Public can read blog posts"
  on blog_posts for select
  using (true);

-- No se crea policy de insert/update para el rol anon:
-- el cron escribe con la Service Role Key desde el servidor, que salta RLS.
