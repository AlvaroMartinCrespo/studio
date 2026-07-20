import Link from 'next/link';
import { getAllPosts, getPostsByTag, getAllTags } from '@/lib/blog';
import { BlogCard } from '@/components/blog/blog-card';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

export const revalidate = 3600; // 1 hora: se refresca solo sin necesitar redeploy

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Un espacio personal para compartir ideas, reflexiones y proyectos de Álvaro Martín Crespo.',
  alternates: {
    canonical: '/blog',
  },
};

type BlogPageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;
  const [posts, tags] = await Promise.all([
    tag ? getPostsByTag(tag) : getAllPosts(),
    getAllTags(),
  ]);

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Mi Blog Personal
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Ideas, reflexiones y un vistazo a los proyectos que construyo por pasión.
        </p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Link href="/blog">
            <Badge variant={!tag ? 'default' : 'outline'} className="cursor-pointer">
              Todos
            </Badge>
          </Link>
          {tags.map(({ tag: t, count }) => (
            <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`}>
              <Badge variant={tag === t ? 'default' : 'outline'} className="cursor-pointer">
                {t} ({count})
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          {tag ? `Todavía no hay posts con el tag "${tag}".` : 'Todavía no hay posts publicados.'}
        </p>
      )}
    </div>
  );
}
