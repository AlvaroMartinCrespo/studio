import { getAllPosts } from '@/lib/blog';
import { projects, profile } from '@/lib/data';

export const revalidate = 3600;

const siteUrl = 'https://devalvaro.vercel.app';

export async function GET() {
  const posts = await getAllPosts();

  const body = `# ${profile.name} — devalvaro.vercel.app

> ${profile.bio}

Blog personal con artículos técnicos sobre desarrollo web frontend, publicados
diariamente. Contenido en español de España, dirigido a desarrolladores.

## Páginas

- [Inicio](${siteUrl}): presentación y resumen del perfil.
- [Sobre mí](${siteUrl}/about): trayectoria y stack técnico.
- [Proyectos](${siteUrl}/projects): proyectos personales y profesionales.
- [Blog](${siteUrl}/blog): listado completo de artículos.
- [Licencias y certificaciones](${siteUrl}/certifications): formación acreditada en desarrollo web, programación, IA e idiomas.
- [Contacto](${siteUrl}/contact)

## Proyectos

${projects
  .map((p) => `- [${p.title}](${siteUrl}/projects/${p.slug})`)
  .join('\n')}

## Posts recientes del blog

${posts
  .slice(0, 50)
  .map(
    (p) =>
      `- [${p.title}](${siteUrl}/blog/${p.slug}): ${p.excerpt} (tags: ${p.tags.join(', ')})`
  )
  .join('\n')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
