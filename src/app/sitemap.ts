import { MetadataRoute } from 'next';
import { projects } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';

const siteUrl = 'https://devalvaro.vercel.app';

export const revalidate = 1800;

/**
 * Next.js no escapa entidades XML (&, <, >, etc.) al serializar el
 * sitemap generado desde `MetadataRoute.Sitemap` (bug conocido:
 * https://github.com/vercel/next.js/issues/77340). Las URLs de imagen
 * de Pexels llevan query params con "&" sin codificar (p. ej.
 * "?auto=compress&cs=tinysrgb&h=650&w=940"), lo que rompe el XML
 * ("EntityRef: expecting ';'"). Escapamos aquí manualmente como
 * workaround mientras Next no lo arregle.
 */
function escapeXml(value: string): string {
  return value.replace(/[&<>'"]/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return char;
    }
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllPosts();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/certifications`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const projectPages = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.created_at || post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    images: post.image_url ? [escapeXml(post.image_url)] : undefined,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
