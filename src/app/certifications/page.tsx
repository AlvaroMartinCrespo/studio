import type { Metadata } from 'next';
import { Award, Building2, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { certifications, profile } from '@/lib/data';

const siteUrl = 'https://devalvaro.vercel.app';

export const metadata: Metadata = {
  title: 'Licencias y certificaciones',
  description:
    'Licencias y certificaciones profesionales de Álvaro Martín Crespo en React, Python, inteligencia artificial, JavaScript, diseño web e inglés.',
  keywords: [
    'certificaciones desarrollo web',
    'certificación React',
    'certificación Python',
    'inteligencia artificial',
    'freeCodeCamp',
    'Udemy',
    'Álvaro Martín Crespo',
  ],
  alternates: {
    canonical: '/certifications',
  },
  openGraph: {
    title: 'Licencias y certificaciones | Álvaro Martín Crespo',
    description:
      'Formación acreditada en desarrollo frontend, Python, inteligencia artificial, JavaScript, diseño web e inglés.',
    url: '/certifications',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Licencias y certificaciones | Álvaro Martín Crespo',
    description:
      'Formación acreditada en desarrollo frontend, Python, inteligencia artificial, JavaScript, diseño web e inglés.',
  },
};

export default function CertificationsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/certifications#webpage`,
        url: `${siteUrl}/certifications`,
        name: 'Licencias y certificaciones de Álvaro Martín Crespo',
        description: metadata.description,
        inLanguage: 'es-ES',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: certifications.length,
          itemListElement: certifications.map((certification, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'EducationalOccupationalCredential',
              name: certification.title,
              credentialCategory: 'Certificado profesional',
              recognizedBy: {
                '@type': 'Organization',
                name: certification.issuer,
              },
              competencyRequired: certification.skills.join(', '),
              about: {
                '@type': 'Person',
                '@id': `${siteUrl}/#person`,
                name: profile.name,
              },
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Licencias y certificaciones',
            item: `${siteUrl}/certifications`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="container py-16 md:py-24">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3 text-primary">
            <Award className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="font-headline text-4xl font-bold md:text-5xl">
            Licencias y certificaciones
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Formación continua acreditada en desarrollo web, programación,
            inteligencia artificial e idiomas.
          </p>
        </header>

        <section aria-labelledby="certifications-heading" className="mx-auto max-w-6xl">
          <h2 id="certifications-heading" className="sr-only">
            Certificados profesionales
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certification) => (
              <Card
                key={`${certification.issuer}-${certification.title}`}
                className="h-full transition-colors hover:border-primary/50"
              >
                <CardHeader>
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    Certificación
                  </div>
                  <CardTitle className="text-xl leading-snug">
                    {certification.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <Building2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                    <p>
                      <span className="sr-only">Empresa: </span>
                      {certification.issuer}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold">Aptitudes</p>
                    <div className="flex flex-wrap gap-2">
                      {certification.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
