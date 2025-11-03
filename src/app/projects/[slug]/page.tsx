import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import type { Metadata } from 'next';
import { ProjectDetailPageClient } from '@/components/projects/project-detail-page';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    };
  }

  const siteUrl = 'https://devalvaro.vercel.app';

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${siteUrl}/projects/${project.slug}`,
      type: 'website',
      images: [
        {
          url: `${siteUrl}${project.image?.imageUrl}`,
          width: 1200,
          height: 675,
          alt: project.title,
        },
      ],
    },
    twitter: {
        card: 'summary_large_image',
        title: project.title,
        description: project.description,
        images: [`${siteUrl}${project.image?.imageUrl}`],
    }
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPageClient project={project} />;
}
