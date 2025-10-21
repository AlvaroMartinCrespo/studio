import { ProjectGrid } from '@/components/projects/project-grid';

export const metadata = {
  title: 'Projects | DevFolio',
  description: 'A showcase of projects by Álvaro Martín Crespo, demonstrating skills in frontend development.',
};

export default function ProjectsPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          My Projects
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Here's a collection of my work. Use the filters to explore projects by technology.
        </p>
      </div>
      <ProjectGrid />
    </div>
  );
}
