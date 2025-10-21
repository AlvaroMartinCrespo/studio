
import { FirebaseClientProvider } from '@/firebase';
import { ContactLoader } from '@/components/contact/contact-loader';

export default function ContactPage() {
  return (
    <FirebaseClientProvider>
      <ContactLoader />
    </FirebaseClientProvider>
  );
}
