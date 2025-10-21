
import { FirebaseClientProvider } from '@/firebase';
import { DashboardLoader } from '@/components/dashboard/dashboard-loader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Acceso al panel de administración.',
};


export default function DashboardPage() {
  return (
    <FirebaseClientProvider>
      <DashboardLoader />
    </FirebaseClientProvider>
  );
}
