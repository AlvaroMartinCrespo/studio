
import { FirebaseClientProvider } from '@/firebase';
import { ContactLoader } from '@/components/contact/contact-loader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: '¿Tienes un proyecto, una pregunta o quieres saludar? Ponte en contacto con Álvaro Martín Crespo.',
};

export default function ContactPage() {
  return (
    <FirebaseClientProvider>
      <ContactLoader />
    </FirebaseClientProvider>
  );
}
