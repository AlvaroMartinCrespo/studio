'use client';

import { Loader2 } from 'lucide-react';

export function PageLoader({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in-0 duration-300">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
