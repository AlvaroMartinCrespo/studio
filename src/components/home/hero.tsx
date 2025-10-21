'use client';

import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import { useLoading } from '../providers/loading-provider';
import { usePathname } from 'next/navigation';

export function Hero() {
  const { setIsPageLoading } = useLoading();
  const pathname = usePathname();
  const projectsHref = '/projects';

  const handleProjectsClick = () => {
    if (pathname !== projectsHref) {
      setIsPageLoading(true);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-lg md:text-xl text-primary font-medium mb-4">
            {profile.title}
          </p>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            {profile.name}
          </h1>
          <p className="max-w-xl text-muted-foreground mb-8">
            {profile.bio}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href={projectsHref} onClick={handleProjectsClick}>
                Ver Mi Trabajo
                <Send className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={profile.cvUrl} download>
                Descargar CV
                <Download className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
        <div className="relative flex justify-center items-center">
            <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>
            <div className="absolute top-8 left-20 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10 animate-blob animation-delay-4000"></div>
            {profile.image && (
            <Image
                src={profile.image.imageUrl}
                alt={profile.image.description}
                width={400}
                height={500}
                priority
                className="rounded-[50%/35%] shadow-xl object-cover w-64 h-96 md:w-80 border-8 border-background"
                data-ai-hint={profile.image.imageHint}
            />
            )}
        </div>
      </div>
    </section>
  );
}
