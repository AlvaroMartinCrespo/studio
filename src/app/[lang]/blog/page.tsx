import { blogPosts } from '@/lib/data';
import { BlogCard } from '@/components/blog/blog-card';

export const metadata = {
  title: 'Blog | DevFolio',
  description: 'Technical articles and guides on web development by Álvaro Martín Crespo.',
};

export default function BlogPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Technical Blog
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Guides, postmortems, and thoughts on web development, performance, and design.
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
