'use client';

import { FirebaseClientProvider } from '@/firebase/client-provider';
import { DashboardContent } from '@/components/dashboard/dashboard-content';

export default function DashboardPage() {
    return (
        <FirebaseClientProvider>
            <DashboardContent />
        </FirebaseClientProvider>
    )
}
