import { Github, Linkedin, Twitter, KeyRound } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Footer({ text, copyright }: { text: string, copyright: string}) {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <Logo />
            <p className="text-sm text-muted-foreground">
              {text}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/tu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com/in/tu" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://x.com/tu" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground flex justify-between items-center">
          <span>{copyright}</span>
          <Button variant="link" size="sm" asChild className="text-muted-foreground">
            <Link href="/login">
              <KeyRound className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
