import { notFound } from 'next/navigation';
import { profile, projects } from '@/lib/data';
import type { Metadata } from 'next';
import { ProjectDetailPageClient } from '@/components/projects/project-detail-page';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    };
  }

  const siteUrl = 'https://devalvaro.vercel.app';

  return {
    title: project.title,
    description: project.description,
    keywords: [...project.techStack, 'proyecto desarrollo web', profile.name],
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${siteUrl}/projects/${project.slug}`,
      type: 'website',
      images: project.image
        ? [
            {
              url: `${siteUrl}${project.image.imageUrl}`,
              width: 1200,
              height: 675,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
        card: 'summary_large_image',
        title: project.title,
        description: project.description,
        images: project.image ? [`${siteUrl}${project.image.imageUrl}`] : undefined,
    }
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPageClient project={project} />;
}
