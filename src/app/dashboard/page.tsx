
import { FirebaseClientProvider } from '@/firebase';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const DashboardPageClient = dynamic(
  () => import('@/components/dashboard/dashboard-page').then((mod) => mod.DashboardPage),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  }
);

export default function DashboardPage() {
  return (
    <FirebaseClientProvider>
      <DashboardPageClient />
    </FirebaseClientProvider>
  );
}
