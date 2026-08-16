import { Hero } from '@/components/home/hero';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { Skills } from '@/components/home/skills';
import { FinalCta } from '@/components/home/final-cta';
import type { Metadata } from 'next';

const siteUrl = 'https://devalvaro.vercel.app';

export const metadata: Metadata = {
  title: 'Desarrollador Frontend en Sevilla | React, LitElement y JavaScript',
  description:
    'Portfolio de Álvaro Martín Crespo, desarrollador frontend en Sevilla especializado en React, LitElement y JavaScript. Interfaces web accesibles y modernas.',
  alternates: { canonical: '/' },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/#webpage`,
    url: siteUrl,
    name: 'Álvaro Martín Crespo - Desarrollador Frontend',
    description: metadata.description,
    inLanguage: 'es-ES',
    about: { '@id': `${siteUrl}/#person` },
    isPartOf: { '@id': `${siteUrl}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Hero />
      <FeaturedProjects />
      <Skills />
      <FinalCta />
    </>
  );
}
