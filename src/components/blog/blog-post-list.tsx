'use client';

import { Children, type ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const POSTS_PER_PAGE = 6;

type BlogPostListProps = {
  children: ReactNode;
};

export function BlogPostList({ children }: BlogPostListProps) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const posts = Children.toArray(children);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < posts.length;

  const loadMorePosts = () => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + POSTS_PER_PAGE, posts.length)
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts}
      </div>

      <p className="sr-only" aria-live="polite">
        Mostrando {visiblePosts.length} de {posts.length} artículos.
      </p>

      {hasMorePosts && (
        <div className="mt-12 flex justify-center">
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={loadMorePosts}
            aria-label={`Cargar 6 artículos más. Actualmente se muestran ${visiblePosts.length} de ${posts.length}`}
          >
            <Plus className="mr-2 h-5 w-5" aria-hidden="true" />
            Cargar más
          </Button>
        </div>
      )}
    </>
  );
}
