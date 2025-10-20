'use client';

import { useState } from 'react';
import { projects } from '@/lib/data';
import { ProjectCard } from './project-card';
import { Button } from '@/components/ui/button';

export function ProjectGrid() {
  const allTechs = Array.from(new Set(projects.flatMap(p => p.techStack)));
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilter = (tech: string | null) => {
    if (tech === null) {
      setFilteredProjects(projects);
      setActiveFilter(null);
    } else {
      setFilteredProjects(projects.filter(p => p.techStack.includes(tech)));
      setActiveFilter(tech);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button
          variant={activeFilter === null ? 'default' : 'outline'}
          onClick={() => handleFilter(null)}
        >
          All
        </Button>
        {allTechs.map(tech => (
          <Button
            key={tech}
            variant={activeFilter === tech ? 'default' : 'outline'}
            onClick={() => handleFilter(tech)}
          >
            {tech}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
