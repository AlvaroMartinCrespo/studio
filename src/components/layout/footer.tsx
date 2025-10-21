'use client';

import { Github, Linkedin, KeyRound } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLoading } from '../providers/loading-provider';
import { usePathname } from 'next/navigation';

export function Footer({ text, copyright }: { text: string, copyright: string}) {
  const { setIsPageLoading } = useLoading();
  const pathname = usePathname();
  const href = '/login';

  const handleClick = () => {
    if (pathname !== href) {
      setIsPageLoading(true);
    }
  };

  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm">
              {text}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/AlvaroMartinCrespo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.linkedin.com/in/alvaromartincrespo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground flex flex-col justify-between items-center gap-4">
          <span>{copyright}</span>
          <Button variant="link" size="sm" asChild className="text-muted-foreground">
            <Link href={href} onClick={handleClick}>
              <KeyRound className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
