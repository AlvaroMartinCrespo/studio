import { Github, Instagram, Linkedin, KeyRound } from 'lucide-react';
import { BlueskyIcon } from '@/components/shared/bluesky-icon';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { profile } from '@/lib/data';

export function Footer() {
  const href = '/login';

  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm">
              Desarrollador Frontend especializado en crear experiencias web modernas.
            </p>
          </div>
          <nav aria-label="Social media links">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={profile.socials.bluesky} target="_blank" rel="noopener noreferrer" aria-label="Bluesky">
                  <BlueskyIcon className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground flex flex-col justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Álvaro Martín Crespo. Todos los derechos reservados.</p>
          <Button variant="link" size="sm" asChild className="text-muted-foreground">
            <Link href={href}>
              <KeyRound className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
