import { notFound } from 'next/navigation';
import { blogPosts, profile } from '@/lib/data';
import type { Metadata } from 'next';
import { BlogPostPageClient } from '@/components/blog/blog-post-page';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }
  
  const siteUrl = 'https://devalvaro.vercel.app';

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [profile.name],
      images: [
        {
          url: `${siteUrl}${post.image?.imageUrl}`,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`${siteUrl}${post.image?.imageUrl}`],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPageClient post={post} />;
}
