'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { projects } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { useLoading } from '../providers/loading-provider';
import { usePathname } from 'next/navigation';

type ProjectCardProps = {
  project: (typeof projects)[0];
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { setIsPageLoading } = useLoading();
  const pathname = usePathname();
  const href = `/projects/${project.slug}`;

  const handleClick = () => {
    if (pathname !== href) {
      setIsPageLoading(true);
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {project.image && (
        <div className="aspect-video overflow-hidden">
          <Image
            src={project.image.imageUrl}
            alt={project.image.description}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={project.image.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={href} onClick={handleClick}>
            Ver Detalles
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
