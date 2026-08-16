'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type TagCount = { tag: string; count: number };

const PAGE_SIZE = 10;

export function BlogTagFilter({
  tags,
  activeTag,
}: {
  tags: TagCount[];
  activeTag?: string;
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleTags = tags.slice(0, visibleCount);
  const hasMore = visibleCount < tags.length;
  const isExpanded = visibleCount > PAGE_SIZE;

  return (
    <div className="flex flex-col items-center gap-4 mb-12">
      <div className="flex flex-wrap justify-center gap-2">
        <Link href="/blog">
          <Badge variant={!activeTag ? 'default' : 'outline'} className="cursor-pointer">
            Todos
          </Badge>
        </Link>
        {visibleTags.map(({ tag: t, count }) => (
          <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`}>
            <Badge variant={activeTag === t ? 'default' : 'outline'} className="cursor-pointer">
              {t} ({count})
            </Badge>
          </Link>
        ))}
      </div>

      {(hasMore || isExpanded) && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={() =>
            setVisibleCount((prev) =>
              hasMore ? prev + PAGE_SIZE : PAGE_SIZE
            )
          }
        >
          {hasMore ? (
            <>
              Mostrar más etiquetas
              <ChevronDown />
            </>
          ) : (
            <>
              Mostrar menos
              <ChevronUp />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
