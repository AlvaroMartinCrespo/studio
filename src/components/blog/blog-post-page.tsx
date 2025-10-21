'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { type blogPosts, profile } from '@/lib/data';
import { Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLoading } from '@/components/providers/loading-provider';
import Script from 'next/script';

type BlogPostPageClientProps = {
  post: (typeof blogPosts)[0];
};

export function BlogPostPageClient({ post }: BlogPostPageClientProps) {
  const { setIsPageLoading } = useLoading();
  const pathname = usePathname();
  const blogHref = '/blog';

  const handleBlogClick = () => {
    if (pathname !== blogHref) {
      setIsPageLoading(true);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://devalvaro.vercel.app${post.image?.imageUrl}`,
    datePublished: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: profile.name,
      url: 'https://devalvaro.vercel.app',
    },
    publisher: {
      '@type': 'Person',
      name: profile.name,
    },
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://devalvaro.vercel.app/blog/${post.slug}`
    }
  };

  return (
    <>
      <Script
        id="json-ld-blog-post"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container py-16 md:py-24">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
              <Button asChild variant="ghost">
                  <Link href={blogHref} onClick={handleBlogClick}>
                      <ArrowLeft className="mr-2" />
                      Volver al Blog
                  </Link>
              </Button>
          </div>
          <header className="mb-12 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{format(new Date(post.date), "d 'de' MMMM 'de' yyyy", { locale: es })}</time>
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
    </>
  );
}
