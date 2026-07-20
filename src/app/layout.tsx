
import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Analytics } from '@vercel/analytics/react';
import { CookieConsent } from '@/components/layout/cookie-consent';
import { profile } from '@/lib/data';
import Script from 'next/script';
import { GlobalProviders } from '@/components/providers/global-providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const siteUrl = 'https://devalvaro.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'Álvaro Martín Crespo - Desarrollador Frontend',
    template: '%s | Álvaro Martín Crespo',
  },
  description: 'Portfolio de Álvaro Martín Crespo, un desarrollador frontend especializado en crear experiencias web modernas y accesibles.',
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    title: 'Álvaro Martín Crespo - Desarrollador Frontend',
    description: 'Portfolio de Álvaro Martín Crespo, un desarrollador frontend especializado en crear experiencias web modernas y accesibles.',
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
    title: 'Álvaro Martín Crespo - Desarrollador Frontend',
    description: 'Portfolio de Álvaro Martín Crespo, un desarrollador frontend especializado en crear experiencias web modernas y accesibles.',
    images: [`${siteUrl}/images/portada.webp`],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F5F5' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
            profile.socials.bluesky,
          ],
          email: profile.contact.email,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Sevilla',
            addressCountry: 'ES'
          }
        },
      },
      {
        '@type': 'WebSite',
        name: 'Álvaro Martín Crespo - Portfolio',
        url: siteUrl,
        inLanguage: 'es-ES',
      },
    ],
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
          <Script
            id="json-ld-profile"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body`}>
        <GlobalProviders>
          <Header navLinks={navLinks} />
          <main>{children}</main>
          <Footer />
          <Toaster />
          <CookieConsent />
        </GlobalProviders>
        <Analytics />
      </body>
    </html>
  );
}
