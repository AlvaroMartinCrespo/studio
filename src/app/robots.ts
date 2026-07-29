import type { MetadataRoute } from 'next';

const siteUrl = 'https://devalvaro.vercel.app';

export const revalidate = 1800;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/login', '/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}