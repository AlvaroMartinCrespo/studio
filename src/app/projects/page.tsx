import { ProjectGrid } from '@/components/projects/project-grid';

export const metadata = {
  title: 'Proyectos | DevFolio',
  description: 'Un escaparate de proyectos de Álvaro Martín Crespo, que demuestran habilidades en el desarrollo frontend.',
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
