
import { ContactPageClient } from '@/components/contact/contact-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta con Álvaro Martín Crespo, desarrollador frontend en Sevilla, por email, LinkedIn, GitHub, Bluesky o Instagram.',
  keywords: ['contacto desarrollador frontend', 'desarrollador web Sevilla', 'Álvaro Martín Crespo', 'React', 'LitElement'],
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
  return <ContactPageClient />;
}
