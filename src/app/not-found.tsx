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
            Oops! Page Not Found
          </p>
        </div>
        <p className="max-w-md text-muted-foreground">
          It seems you've taken a wrong turn. The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2" />
              Go to Homepage
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">
              <Search className="mr-2" />
              Browse Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
