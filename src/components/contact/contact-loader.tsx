'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const ContactPageClient = dynamic(
  () => import('@/components/contact/contact-page-client').then((mod) => mod.ContactPageClient),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  }
);

export function ContactLoader() {
    return <ContactPageClient />;
}
