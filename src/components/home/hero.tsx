'use client';

import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useLoading } from '../providers/loading-provider';
import { usePathname } from 'next/navigation';

export function Hero() {
  const { setIsPageLoading } = useLoading();
  const pathname = usePathname();
  const projectsHref = '/projects';

  const handleClick = () => {
    if (pathname !== projectsHref) {
      setIsPageLoading(true);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
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
              <Link href={projectsHref} onClick={handleClick}>
                Ver Mi Trabajo
                <Send className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Image
            src="/images/portada.webp"
            alt="Imagen de portada del portfolio de Álvaro Martín Crespo"
            width={600}
            height={400}
            priority
            className="rounded-2xl shadow-xl object-cover w-full h-auto"
            data-ai-hint="developer workspace"
          />
        </div>
      </div>
    </section>
  );
}
