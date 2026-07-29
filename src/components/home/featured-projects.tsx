import Link from 'next/link';
import { projects } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/projects/project-card';
import { ArrowRight } from 'lucide-react';

export function FeaturedProjects() {
  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 3);
  const href = '/projects';

  return (
    <section className="py-16 md:py-24 bg-secondary/50 dark:bg-secondary/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Proyectos Destacados
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Una selección de mi trabajo. Mira los problemas que he resuelto y la tecnología que he usado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href={href}>
              Ver Todos los Proyectos
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
