
import { FirebaseClientProvider } from '@/firebase';
import { DashboardLoader } from '@/components/dashboard/dashboard-loader';

export default function DashboardPage() {
  return (
    <FirebaseClientProvider>
      <DashboardLoader />
    </FirebaseClientProvider>
  );
}
