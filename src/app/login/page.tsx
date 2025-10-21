
'use client';

import { FirebaseClientProvider } from '@/firebase/client-provider';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Carga dinámica del componente de login con SSR deshabilitado
const LoginContent = dynamic(() => import('@/components/login/login-content'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ),
});

export default function LoginPage() {
  return (
    <FirebaseClientProvider>
      <LoginContent />
    </FirebaseClientProvider>
  );
}
