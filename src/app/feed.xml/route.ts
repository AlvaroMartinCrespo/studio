import { getAllPosts } from '@/lib/blog';

const siteUrl = 'https://devalvaro.vercel.app';

export const revalidate = 1800;

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getAllPosts();
  const lastBuildDate = posts[0]?.created_at || posts[0]?.date || new Date().toISOString();

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${encodeURIComponent(post.slug)}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${encodeURIComponent(post.slug)}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('')}
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog de Álvaro Martín Crespo</title>
    <link>${siteUrl}/blog</link>
    <description>Artículos sobre desarrollo frontend, React, JavaScript, inteligencia artificial y programación.</description>
    <language>es-ES</language>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
    },
  });
}
