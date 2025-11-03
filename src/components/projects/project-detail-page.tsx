'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { projects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Tv, ArrowLeft } from 'lucide-react';
import { useLoading } from '@/components/providers/loading-provider';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { profile } from '@/lib/data';

type ProjectDetailPageClientProps = {
  project: (typeof projects)[0];
};

export function ProjectDetailPageClient({ project }: ProjectDetailPageClientProps) {
  const { setIsPageLoading } = useLoading();
  const pathname = usePathname();
  const contactHref = '/contact';
  const projectsHref = '/projects';

  const handleContactClick = () => {
    if (pathname !== contactHref) {
      setIsPageLoading(true);
    }
  };

  const handleProjectsClick = () => {
    if (pathname !== projectsHref) {
      setIsPageLoading(true);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.description,
    image: `https://devalvaro.vercel.app${project.image?.imageUrl}`,
    author: {
      '@type': 'Person',
      name: profile.name,
      url: 'https://devalvaro.vercel.app',
    },
    publisher: {
      '@type': 'Person',
      name: profile.name,
    },
     mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://devalvaro.vercel.app/projects/${project.slug}`
    }
  };

  return (
    <>
       <Script
        id="json-ld-project"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto mb-8">
          <Button asChild variant="ghost">
            <Link href={projectsHref} onClick={handleProjectsClick}>
              <ArrowLeft className="mr-2" />
              Volver a Proyectos
            </Link>
          </Button>
        </div>
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.techStack.map(tech => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </header>

          {project.image && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border">
              <Image
                src={project.image.imageUrl}
                alt={project.image.description}
                width={1200}
                height={675}
                className="w-full h-auto"
                data-ai-hint={project.image.imageHint}
              />
            </div>
          )}

          <div className="flex gap-4 mb-12">
            {project.liveUrl && project.liveUrl !== '#' && (
              <Button asChild>
                <Link href={project.liveUrl} target="_blank">
                  <Tv className="mr-2" /> Demo en vivo
                </Link>
              </Button>
            )}
            {project.repoUrl && project.repoUrl !== '#' && (
              <Button variant="outline" asChild>
                <Link href={project.repoUrl} target="_blank">
                  <Github className="mr-2" /> Ver Código
                </Link>
              </Button>
            )}
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <div className="mt-12 text-center">
              <Button variant="link" asChild>
                  <Link href={contactHref} onClick={handleContactClick}>
                      Contáctame para más detalles <ExternalLink className="ml-2 h-4 w-4"/>
                  </Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
