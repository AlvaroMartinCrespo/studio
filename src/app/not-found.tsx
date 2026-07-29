import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold tracking-tighter text-primary sm:text-8xl">404</h1>
          <p className="text-2xl font-medium tracking-tight text-foreground">
            ¡Vaya! Página no encontrada
          </p>
        </div>
        <p className="max-w-md text-muted-foreground">
          Parece que has tomado un camino equivocado. La página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2" />
              Ir a la página de inicio
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">
              <Search className="mr-2" />
              Explorar proyectos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
