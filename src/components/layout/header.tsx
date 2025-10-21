'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLoading } from '../providers/loading-provider';

type NavLinkData = {
  href: string;
  label: string;
};

export function Header({
  navLinks,
}: {
  navLinks: NavLinkData[];
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsPageLoading } = useLoading();

  // Strip language prefix from pathname for active link checking
  const activePathname = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
  
  useEffect(() => {
    setIsPageLoading(false);
  }, [pathname, setIsPageLoading]);


  const NavLink = ({
    href,
    label,
    className,
  }: {
    href: string;
    label: string;
    className?: string;
  }) => {
    // Check if the current path is the exact href or a sub-route for active state
    const isActive = href === '/' ? activePathname === href : activePathname.startsWith(href);
    
    const handleClick = () => {
      if (pathname !== href) {
        setIsPageLoading(true);
      }
      setIsMobileMenuOpen(false);
    };

    return (
      <Link
        href={href}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          isActive ? 'text-primary' : 'text-muted-foreground',
          className
        )}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Desktop Logo */}
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        
        {/* Mobile Menu & Logo */}
        <div className="md:hidden flex-1 flex justify-start">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Abrir menú de navegación">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-4">
                <Logo />
              </div>
              <nav>
                <div className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <NavLink key={link.href} {...link} className="text-lg" />
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="md:hidden flex-1 flex justify-center">
          <Logo />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex md:items-center md:gap-6" aria-label="Navegación principal">
            {navLinks.map(link => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
