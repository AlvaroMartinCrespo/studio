import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { profile } from '@/lib/data';
import { Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Script from 'next/script';

const siteUrl = 'https://devalvaro.vercel.app';

type BlogPostPageClientProps = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

export function BlogPostPageClient({ post, relatedPosts }: BlogPostPageClientProps) {
  const blogHref = '/blog';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${siteUrl}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.image_url,
        url: `${siteUrl}/blog/${post.slug}`,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.created_at || post.date).toISOString(),
        keywords: post.tags?.join(', '),
        articleSection: post.topic,
        inLanguage: 'es-ES',
        articleBody: post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
        author: {
          '@id': `${siteUrl}/#person`,
          '@type': 'Person',
          name: profile.name,
          url: siteUrl,
        },
        publisher: {
          '@id': `${siteUrl}/#person`,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}/blog/${post.slug}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="json-ld-blog-post"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="container py-16 md:py-24">
        <article className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={blogHref} className="hover:text-primary">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>
          <div className="mb-8">
              <Button asChild variant="ghost">
                  <Link href={blogHref}>
                      <ArrowLeft className="mr-2" />
                      Volver al Blog
                  </Link>
              </Button>
          </div>
          <header className="mb-12 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{format(new Date(post.date), "d 'de' MMMM 'de' yyyy", { locale: es })}</time>
            </div>
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                    <Badge variant="secondary" className="hover:bg-primary/20 transition-colors">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>

          {post.image_url && (
            <figure className="mb-12">
              <div className="rounded-2xl overflow-hidden shadow-lg border">
                <Image
                  src={post.image_url}
                  alt={post.image_alt}
                  width={1200}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="w-full h-auto"
                  priority
                />
              </div>
              {post.image_credit_name && (
                <figcaption className="text-xs text-muted-foreground mt-2 text-right">
                  Foto de{' '}
                  {post.image_credit_url ? (
                    <a href={post.image_credit_url} target="_blank" rel="noopener noreferrer" className="underline">
                      {post.image_credit_name}
                    </a>
                  ) : (
                    post.image_credit_name
                  )}{' '}
                  en Pexels
                </figcaption>
              )}
            </figure>
          )}

          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {relatedPosts.length > 0 && (
            <aside className="mt-20">
              <h2 className="font-headline text-2xl font-bold mb-6">Entradas relacionadas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((related) => {
                  const relatedHref = `/blog/${related.slug}`;
                  return (
                    <Card key={related.slug} className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <Link href={relatedHref}>
                        <CardHeader>
                          <CardTitle className="font-headline text-base leading-snug">
                            {related.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
                        </CardContent>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </aside>
          )}
        </article>
      </div>
    </>
  );
}
