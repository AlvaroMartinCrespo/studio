import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';

export function Hero() {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            {profile.name}
          </h1>
          <p className="text-lg md:text-xl text-primary font-medium mb-6">
            {profile.title}
          </p>
          <p className="max-w-lg text-muted-foreground mb-8">
            {profile.bio}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/projects">
                Ver Mi Trabajo
                <Send className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={profile.cvUrl} download>
                Descargar CV
                <Download className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto md:mx-0">
          {profile.image && (
            <Image
              src={profile.image.imageUrl}
              alt={profile.image.description}
              width={400}
              height={400}
              priority
              className="rounded-full object-cover border-4 border-primary/10 shadow-2xl"
              data-ai-hint={profile.image.imageHint}
            />
          )}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-full opacity-20 -z-10" />
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary rounded-full opacity-20 -z-10" />
        </div>
      </div>
    </section>
  );
}
