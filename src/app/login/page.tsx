
import { FirebaseClientProvider } from '@/firebase';
import { LoginLoader } from '@/components/login/login-loader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Inicia sesión para acceder al panel de administración.',
};

export default function LoginPage() {
  return (
    <FirebaseClientProvider>
      <LoginLoader />
    </FirebaseClientProvider>
  );
}
