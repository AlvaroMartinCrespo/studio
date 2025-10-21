
'use client';

import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LoadingProvider } from '@/components/providers/loading-provider';
import { Analytics } from '@vercel/analytics/react';
import { CookieConsent } from '@/components/layout/cookie-consent';
import { profile } from '@/lib/data';
import Script from 'next/script';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { PageLoader } from '@/components/layout/page-loader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const siteUrl = 'https://devalvaro.vercel.app';

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      alternateName: 'AMC',
      url: siteUrl,
      image: `${siteUrl}${profile.image?.imageUrl}`,
      jobTitle: profile.title,
      worksFor: {
        '@type': 'Organization',
        name: 'DSS Network',
      },
      sameAs: [
        profile.socials.github,
        profile.socials.linkedin,
      ],
      email: profile.contact.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sevilla',
        addressCountry: 'ES'
      }
    }
  };


  return (
    <html lang="es" suppressHydrationWarning>
      <head>
          <link rel="preload" href="/images/portada.webp" as="image"/>
          <Script
            id="json-ld-profile"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FirebaseClientProvider>
            <LoadingProvider>
              <Header navLinks={navLinks} />
              <main>{children}</main>
              <Footer />
              <Toaster />
              <CookieConsent />
            </LoadingProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
