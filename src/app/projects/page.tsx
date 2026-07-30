
import { ProjectGrid } from '@/components/projects/project-grid';
import type { Metadata } from 'next';
import { projects } from '@/lib/data';

const siteUrl = 'https://devalvaro.vercel.app';

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Un escaparate de proyectos de Álvaro Martín Crespo, que demuestran habilidades en el desarrollo frontend y backend.',
  keywords: ['proyectos desarrollo web', 'portfolio frontend', 'React', 'Firebase', 'Laravel', 'Tailwind CSS'],
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Proyectos | Álvaro Martín Crespo',
    description: 'Un escaparate de proyectos de Álvaro Martín Crespo, que demuestran habilidades en el desarrollo frontend y backend.',
    url: '/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyectos | Álvaro Martín Crespo',
    description: 'Un escaparate de proyectos de Álvaro Martín Crespo, que demuestran habilidades en el desarrollo frontend y backend.',
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/projects#webpage`,
        url: `${siteUrl}/projects`,
        name: 'Proyectos de Álvaro Martín Crespo',
        description: metadata.description,
        inLanguage: 'es-ES',
        mainEntity: { '@id': `${siteUrl}/projects#itemlist` },
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/projects#itemlist`,
        name: 'Proyectos de desarrollo web',
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${siteUrl}/projects/${project.slug}`,
          name: project.title,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Proyectos', item: `${siteUrl}/projects` },
        ],
      },
    ],
  };

  return (
    <div className="container py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Mis Proyectos
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Aquí tienes una colección de mi trabajo. Usa los filtros para explorar proyectos por tecnología.
        </p>
      </div>
      <ProjectGrid />
    </div>
  );
}
