import { blogPosts } from '@/lib/data';
import { BlogCard } from '@/components/blog/blog-card';

export const metadata = {
  title: 'Blog | AMC',
  description: 'Un espacio personal para compartir ideas, reflexiones y proyectos de Álvaro Martín Crespo.',
};

export default function BlogPage() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
