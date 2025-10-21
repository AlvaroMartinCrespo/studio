
'use client';

import { FirebaseClientProvider } from '@/firebase/client-provider';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Carga dinámica del componente del dashboard con SSR deshabilitado
const DashboardContent = dynamic(() => import('@/components/dashboard/dashboard-content'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ),
});

export default function DashboardPage() {
  return (
    <FirebaseClientProvider>
      <DashboardContent />
    </FirebaseClientProvider>
  );
}
