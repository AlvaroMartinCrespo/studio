
import { FirebaseClientProvider } from '@/firebase';
import { ContactLoader } from '@/components/contact/contact-loader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: '¿Tienes un proyecto, una pregunta o quieres saludar? Ponte en contacto con Álvaro Martín Crespo.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contacto | Álvaro Martín Crespo',
    description: '¿Tienes un proyecto, una pregunta o quieres saludar? Ponte en contacto con Álvaro Martín Crespo.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Álvaro Martín Crespo',
    description: '¿Tienes un proyecto, una pregunta o quieres saludar? Ponte en contacto con Álvaro Martín Crespo.',
  },
};

export default function ContactPage() {
  return (
    <FirebaseClientProvider>
      <ContactLoader />
    </FirebaseClientProvider>
  );
}
