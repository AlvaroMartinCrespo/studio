import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '../ui/button';

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {post.image_url && (
        <div className="aspect-video overflow-hidden">
          <Link href={href} aria-label={post.title}>
            <Image
              src={post.image_url}
              alt={post.image_alt}
              width={800}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>{format(new Date(post.date), "d 'de' MMMM 'de' yyyy", { locale: es })}</time>
        </div>
        <CardTitle className="font-headline text-xl">
          <Link href={href} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="hover:bg-primary/20 transition-colors">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
       <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={href}>
            Leer Más
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
