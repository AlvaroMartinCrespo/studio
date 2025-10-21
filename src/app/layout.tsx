import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'DevFolio - Álvaro Martín Crespo, Frontend Developer',
  description: 'El portfolio profesional de Álvaro Martín Crespo, un desarrollador frontend especializado en construir interfaces escalables con Next.js y Tailwind CSS.',
  authors: [{ name: 'Álvaro Martín Crespo' }],
  creator: 'Álvaro Martín Crespo',
  keywords: ['desarrollador frontend', 'next.js', 'react', 'tailwind css', 'portfolio'],
  openGraph: {
    title: 'DevFolio - Álvaro Martín Crespo, Frontend Developer',
    description: 'El portfolio profesional de Álvaro Martín Crespo, un desarrollador frontend especializado en construir interfaces escalables con Next.js y Tailwind CSS.',
    url: 'https://tu-portfolio.com', // Replace with your actual domain
    siteName: 'DevFolio',
    type: 'website',
    images: [
      {
        url: 'https://tu-portfolio.com/og/default.png', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'DevFolio por Álvaro Martín Crespo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevFolio - Álvaro Martín Crespo, Frontend Developer',
    description: 'El portfolio profesional de Álvaro Martín Crespo, un desarrollador frontend especializado en construir interfaces escalables con Next.js y Tailwind CSS.',
    creator: '@tu', // Replace with your Twitter handle
    images: ['https://tu-portfolio.com/og/default.png'], // Replace with your actual OG image URL
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/projects', label: 'Proyectos' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'Sobre mí' },
    { href: '/contact', label: 'Contacto' },
  ];

  const copyrightText = `© ${new Date().getFullYear()} Álvaro Martín Crespo. Todos los derechos reservados.`;
  const builtWithText = "Construido con Next.js, Tailwind CSS y mucho ☕.";

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Álvaro Martín Crespo',
              url: 'https://tu-portfolio.com',
              sameAs: [
                'https://github.com/tu',
                'https://linkedin.com/in/tu',
              ],
              jobTitle: 'Frontend Developer',
            }),
          }}
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <Header navLinks={navLinks} />
            <main className="flex-grow">{children}</main>
            <Footer text={builtWithText} copyright={copyrightText}/>
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
