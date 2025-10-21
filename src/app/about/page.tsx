import Image from 'next/image';
import { profile, skills } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata = {
  title: 'Sobre mí | DevFolio',
  description: `Conoce más sobre Álvaro Martín Crespo, su trayectoria profesional y sus habilidades técnicas.`,
};

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1 flex flex-col items-center">
            {profile.image && (
              <Image
                src={profile.image.imageUrl}
                alt={profile.image.description}
                width={250}
                height={250}
                className="rounded-full object-cover border-4 border-primary/20 shadow-xl mb-6"
                data-ai-hint={profile.image.imageHint}
              />
            )}
            <Button asChild className="w-full">
              <a href={profile.cvUrl} download>
                Descargar CV <Download className="ml-2" />
              </a>
            </Button>
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" size="icon" asChild>
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin />
                </a>
              </Button>
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="font-headline text-4xl md:text-5xl font-bold mb-6">Sobre mí</h1>
            <div className="prose dark:prose-invert max-w-none space-y-6">
              <p>
                ¡Hola! Soy Álvaro Martín Crespo, un apasionado desarrollador frontend con sede en Madrid. Mi viaje en el desarrollo web comenzó
                con una fascinación por cómo el diseño hermoso y la tecnología potente pueden unirse para crear experiencias de usuario asombrosas.
              </p>
              <p>
                A lo largo de los años, he perfeccionado mis habilidades en tecnologías web modernas, con un enfoque especial en el ecosistema de React. Me encanta resolver problemas complejos
                y construir aplicaciones que no solo son funcionales, sino también rápidas, accesibles y un placer de usar. Creo en escribir
                código limpio y mantenible y en seguir las mejores prácticas para asegurar el éxito de los proyectos a largo plazo.
              </p>
              <p>
                Cuando no estoy programando, me puedes encontrar explorando las últimas tendencias en tecnología, contribuyendo a proyectos de código abierto o disfrutando de una buena taza de café mientras planeo mi próximo proyecto.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-headline text-3xl font-bold text-center mb-10">Habilidades y Experiencia</h2>
          <div className="text-center">
             <p className="text-muted-foreground mb-6">Estas son algunas de las tecnologías en las que soy competente. Para una demostración práctica, echa un vistazo a mi trabajo en la <Link href="/projects" className="text-primary hover:underline">página de proyectos</Link>.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map(skill => (
              <Badge key={skill.name} className="text-base px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
