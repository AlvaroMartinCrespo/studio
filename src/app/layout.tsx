import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { LoadingProvider } from '@/components/providers/loading-provider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const siteUrl = 'https://devalvaro.vercel.app';
const siteTitle = 'AMC - Álvaro Martín Crespo, Desarrollador Frontend';
const siteDescription = 'Portfolio de Álvaro Martín Crespo, un desarrollador frontend apasionado por crear experiencias web modernas y accesibles. Descubre mis proyectos, habilidades y contacta conmigo.';

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/images/portada.webp`,
        width: 1200,
        height: 630,
        alt: 'Imagen de portada del portfolio de Álvaro Martín Crespo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/images/portada.webp`],
  },
};

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Sobre mí' },
    { href: '/projects', label: 'Proyectos' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contacto' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FirebaseClientProvider>
            <LoadingProvider>
              <Header navLinks={navLinks} />
              <main>{children}</main>
              <Footer 
                text="Desarrollador Frontend especializado en crear experiencias web modernas."
                copyright="© 2025 Álvaro Martín Crespo. Todos los derechos reservados."
              />
              <Toaster />
            </LoadingProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
