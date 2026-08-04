
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
  description: 'Portfolio de Álvaro Martín Crespo, desarrollador frontend en Sevilla especializado en React, LitElement, JavaScript e interfaces web accesibles.',
  applicationName: 'Portfolio de Álvaro Martín Crespo',
  authors: [{ name: 'Álvaro Martín Crespo', url: siteUrl }],
  creator: 'Álvaro Martín Crespo',
  publisher: 'Álvaro Martín Crespo',
  category: 'technology',
  keywords: [
    'Álvaro Martín Crespo',
    'desarrollador frontend',
    'desarrollador web Sevilla',
    'React',
    'LitElement',
    'JavaScript',
    'Python',
    'portfolio desarrollo web',
  ],
  metadataBase: new URL(siteUrl),
  manifest: '/manifest.webmanifest',
  verification: {
    google: 'a67bdaf5c6e96c8a',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/',
      'x-default': '/',
    },
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
    siteName: 'Álvaro Martín Crespo - Portfolio',
    locale: 'es_ES',
    url: siteUrl,
    title: 'Álvaro Martín Crespo - Desarrollador Frontend',
    description: 'Portfolio de Álvaro Martín Crespo, un desarrollador frontend especializado en crear experiencias web modernas y accesibles.',
    images: [
      {
        url: `${siteUrl}/images/og-cover.webp`,
        width: 1200,
        height: 630,
        alt: 'Álvaro Martín Crespo - Desarrollador Frontend',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Álvaro Martín Crespo - Desarrollador Frontend',
    description: 'Portfolio de Álvaro Martín Crespo, un desarrollador frontend especializado en crear experiencias web modernas y accesibles.',
    images: [`${siteUrl}/images/og-cover.webp`],
  },
  other: {
    'google-site-verification': 'a67bdaf5c6e96c8a',
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
    { href: '/certifications', label: 'Certificaciones' },
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
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: profile.name,
        alternateName: 'AMC',
        url: siteUrl,
        image: `${siteUrl}${profile.image?.imageUrl}`,
        jobTitle: profile.title,
        knowsAbout: ['React', 'LitElement', 'JavaScript', 'Python', 'HTML', 'CSS', 'Angular'],
        worksFor: {
          '@type': 'Organization',
          name: 'DSS Network',
        },
        sameAs: [
          profile.socials.github,
          profile.socials.linkedin,
          profile.socials.bluesky,
          profile.socials.instagram,
        ],
        email: profile.contact.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sevilla',
          addressCountry: 'ES'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Álvaro Martín Crespo - Portfolio',
        url: siteUrl,
        inLanguage: 'es-ES',
        publisher: { '@id': `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
          <Script
            id="json-ld-profile"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
          />
          <link rel="alternate" type="application/rss+xml" title="Blog de Álvaro Martín Crespo" href="/feed.xml" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body`}>
        <GlobalProviders>
          <Header navLinks={navLinks} />
          <main>{children}</main>
          <Footer />
          <Toaster />
          <CookieConsent />
        </GlobalProviders>
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
