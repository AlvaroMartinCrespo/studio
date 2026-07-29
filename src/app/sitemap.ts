import { MetadataRoute } from 'next';
import { projects } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';

const siteUrl = 'https://devalvaro.vercel.app';

export const revalidate = 1800;

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
    images: post.image_url ? [post.image_url] : undefined,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
