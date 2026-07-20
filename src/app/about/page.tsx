import Image from 'next/image';
import { profile, skills } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Briefcase, Code, Coffee } from 'lucide-react';
import { BlueskyIcon } from '@/components/shared/bluesky-icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre mí',
  description: 'Conoce más sobre la trayectoria profesional, habilidades y filosofía de desarrollo de Álvaro Martín Crespo.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Sobre mí | Álvaro Martín Crespo',
    description: 'Conoce más sobre la trayectoria profesional, habilidades y filosofía de desarrollo de Álvaro Martín Crespo.',
    url: '/about',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre mí | Álvaro Martín Crespo',
    description: 'Conoce más sobre la trayectoria profesional, habilidades y filosofía de desarrollo de Álvaro Martín Crespo.',
  },
};


export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Sobre mí</h1>
          <p className="text-lg text-muted-foreground mt-2">Un vistazo a mi trayectoria, mis habilidades y mi pasión por el desarrollo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Columna Izquierda (Imagen y Enlaces) */}
          <div className="md:col-span-1 flex flex-col items-center md:sticky md:top-24 order-2 md:order-1">
            {profile.image && (
              <Image
                src={profile.image.imageUrl}
                alt={profile.image.description}
                width={200}
                height={200}
                className="rounded-full object-cover border-4 border-primary/20 shadow-xl mb-6"
                data-ai-hint={profile.image.imageHint}
              />
            )}
             <div className="flex space-x-2 mb-4">
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
              <Button variant="outline" size="icon" asChild>
                <a href={profile.socials.bluesky} target="_blank" rel="noopener noreferrer" aria-label="Bluesky">
                  <BlueskyIcon className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <Button asChild className="w-full">
              <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">
                Descargar CV <Download className="ml-2" />
              </a>
            </Button>
          </div>

          {/* Columna Derecha (Contenido de Texto) */}
          <div className="md:col-span-2 space-y-10 order-1 md:order-2">
            <Card>
              <CardHeader className="flex-row items-center gap-4">
                <Briefcase className="w-8 h-8 text-primary" />
                <CardTitle>Mi historia</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Mi viaje en el desarrollo web comenzó con una fascinación por cómo el diseño y la tecnología pueden unirse para crear experiencias de usuario asombrosas. Tras completar mi formación, me he dedicado a construir aplicaciones web modernas, funcionales y accesibles.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex-row items-center gap-4">
                <Code className="w-8 h-8 text-primary" />
                <CardTitle>Mi filosofía</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Creo en el código limpio, las buenas prácticas y la mejora continua. Me encanta resolver problemas complejos y colaborar en equipo para llevar los proyectos al siguiente nivel, asegurando siempre un producto final robusto y mantenible.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center gap-4">
                <Coffee className="w-8 h-8 text-primary" />
                 <CardTitle>Fuera del código</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                 <p>
                  Cuando no estoy programando, me encontrarás explorando las últimas tendencias en tecnología, contribuyendo a proyectos open-source, o simplemente disfrutando de una buena taza de café mientras planeo mi próximo desafío creativo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sección de Habilidades */}
        <div className="mt-20">
          <h2 className="font-headline text-3xl font-bold text-center mb-10">Mis Herramientas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {skills.map(skill => (
               <Card key={skill.name} className="flex flex-col items-center justify-center p-4 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-10 mb-2 dark:invert"
                />
                <span className="text-sm font-medium text-muted-foreground">{skill.name}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
