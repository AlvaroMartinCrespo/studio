'use client';

import { notFound, usePathname } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLoading } from '@/components/providers/loading-provider';

type Props = {
  params: { slug: string };
};

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug);
  const { setIsPageLoading } = useLoading();
  const pathname = usePathname();
  const blogHref = '/blog';

  const handleBlogClick = () => {
    if (pathname !== blogHref) {
      setIsPageLoading(true);
    }
  };

  if (!post) {
    notFound();
  }

  return (
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
  );
}
