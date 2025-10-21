'use client';

import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLoading } from '../providers/loading-provider';
import { usePathname } from 'next/navigation';

export function Hero() {
  const coverImage = PlaceHolderImages.find(img => img.id === 'portada');
  const { setIsPageLoading } = useLoading();
  const pathname = usePathname();
  const projectsHref = '/projects';

  const handleClick = () => {
    if (pathname !== projectsHref) {
      setIsPageLoading(true);
    }
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white overflow-hidden">
      {coverImage && (
        <Image
          src={coverImage.imageUrl}
          alt={coverImage.description}
          fill
          priority
          className="object-cover z-0"
          data-ai-hint={coverImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="container relative z-20 flex flex-col items-center">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 text-shadow-lg">
          {profile.name}
        </h1>
        <p className="text-lg md:text-xl text-primary font-medium mb-6 text-shadow">
          {profile.title}
        </p>
        <p className="max-w-2xl text-gray-200 mb-8 text-shadow">
          {profile.bio}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href={projectsHref} onClick={handleClick}>
              Ver Mi Trabajo
              <Send className="ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
            <a href={profile.cvUrl} download>
              Descargar CV
              <Download className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
