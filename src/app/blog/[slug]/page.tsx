import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog';
import { profile } from '@/lib/data';
import type { Metadata } from 'next';
import { BlogPostPageClient } from '@/components/blog/blog-post-page';

export const revalidate = 1800;
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

const siteUrl = 'https://devalvaro.vercel.app';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: profile.name, url: siteUrl }],
    creator: profile.name,
    publisher: profile.name,
    category: post.topic,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.created_at || post.date).toISOString(),
      authors: [profile.name],
      tags: post.tags,
      images: post.image_url
        ? [
            {
              url: post.image_url,
              width: 1200,
              height: 600,
              alt: post.image_alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image_url ? [post.image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);

  // El JSON-LD (BlogPosting + BreadcrumbList) ya se genera dentro de
  // BlogPostPageClient (src/components/blog/blog-post-page.tsx) — no se
  // duplica aquí.
  return <BlogPostPageClient post={post} relatedPosts={relatedPosts} />;
}
