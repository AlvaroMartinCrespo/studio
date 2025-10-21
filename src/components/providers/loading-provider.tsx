'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import { PageLoader } from '@/components/layout/page-loader';

type LoadingContextType = {
  isPageLoading: boolean;
  setIsPageLoading: (isLoading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isPageLoading, setIsPageLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isPageLoading, setIsPageLoading }}>
      {children}
      <PageLoader isLoading={isPageLoading} />
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
