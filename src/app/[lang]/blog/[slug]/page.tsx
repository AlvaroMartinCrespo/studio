import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Blog | DevFolio`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Blog | DevFolio`,
      description: post.excerpt,
      images: [post.image?.imageUrl || ''],
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
    },
  };
}

export function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container py-16 md:py-24">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          </div>
        </header>

        {post.image && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border">
            <Image
              src={post.image.imageUrl}
              alt={post.image.description}
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
              data-ai-hint={post.image.imageHint}
            />
          </div>
        )}

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
