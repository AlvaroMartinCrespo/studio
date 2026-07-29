import { Button } from '@/components/ui/button';
import { Download, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { profile } from '@/lib/data';

export function FinalCta() {
    const href = '/contact';
  return (
    <section className="py-16 md:py-24">
      <div className="container text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">
          ¿Listo para construir algo genial?
        </h2>
        <p className="text-lg text-muted-foreground mt-2 mb-8 max-w-2xl mx-auto">
          Actualmente estoy disponible para trabajo freelance y abierto a nuevas oportunidades. ¡Conectemos!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href={href}>
              Ponte en Contacto
              <MessageCircle className="ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">
              Descargar CV
              <Download className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
