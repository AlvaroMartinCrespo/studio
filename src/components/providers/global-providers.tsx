
'use client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { LoadingProvider } from '@/components/providers/loading-provider';

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </ThemeProvider>
  );
}
