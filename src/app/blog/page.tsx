import Link from 'next/link';
import { getAllPosts, getPostsByTag, getAllTags } from '@/lib/blog';
import { BlogPostList } from '@/components/blog/blog-post-list';
import { BlogCard } from '@/components/blog/blog-card';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

export const revalidate = 1800;

const siteUrl = 'https://devalvaro.vercel.app';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos sobre desarrollo frontend, React, JavaScript, inteligencia artificial, rendimiento web y programación escritos por Álvaro Martín Crespo.',
  keywords: ['blog desarrollo web', 'React', 'JavaScript', 'frontend', 'inteligencia artificial', 'programación'],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog de desarrollo web | Álvaro Martín Crespo',
    description: 'Artículos sobre frontend, React, JavaScript, IA, rendimiento web y programación.',
    url: '/blog',
    type: 'website',
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${siteUrl}/blog#blog`,
        url: `${siteUrl}/blog`,
        name: 'Blog de Álvaro Martín Crespo',
        description: metadata.description,
        inLanguage: 'es-ES',
        author: { '@id': `${siteUrl}/#person` },
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          url: `${siteUrl}/blog/${post.slug}`,
          datePublished: new Date(post.date).toISOString(),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
        ],
      },
    ],
  };

  return (
    <div className="container py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
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
        <BlogPostList>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </BlogPostList>
      ) : (
        <p className="text-center text-muted-foreground">
          {tag ? `Todavía no hay posts con el tag "${tag}".` : 'Todavía no hay posts publicados.'}
        </p>
      )}
    </div>
  );
}
