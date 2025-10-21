
import { ProjectGrid } from '@/components/projects/project-grid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Un escaparate de proyectos de Álvaro Martín Crespo, que demuestran habilidades en el desarrollo frontend y backend.',
};

export default function ProjectsPage() {
  return (
    <div className="container py-16 md:py-24">
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
