'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { blogPosts } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { useLoading } from '../providers/loading-provider';
import { usePathname } from 'next/navigation';

type BlogCardProps = {
  post: (typeof blogPosts)[0];
};

export function BlogCard({ post }: BlogCardProps) {
  const { setIsPageLoading } = useLoading();
  const pathname = usePathname();
  const href = `/blog/${post.slug}`;

  const handleClick = () => {
    if (pathname !== href) {
      setIsPageLoading(true);
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {post.image && (
        <div className="aspect-video overflow-hidden">
          <Link href={href} onClick={handleClick} aria-label={post.title}>
            <Image
              src={post.image.imageUrl}
              alt={post.image.description}
              width={800}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={post.image.imageHint}
            />
          </Link>
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
        </div>
        <CardTitle className="font-headline text-xl">
          <Link href={href} onClick={handleClick} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
       <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={href} onClick={handleClick}>
            Leer Más
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
