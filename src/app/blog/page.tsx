import { blogPosts } from '@/lib/data';
import { BlogCard } from '@/components/blog/blog-card';

export const metadata = {
  title: 'Blog | DevFolio',
  description: 'Artículos técnicos y guías sobre desarrollo web por Álvaro Martín Crespo.',
};

export default function BlogPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Blog Técnico
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Guías, análisis post-mortem y reflexiones sobre desarrollo web, rendimiento y diseño.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
