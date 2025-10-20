import { Button } from '@/components/ui/button';
import { Download, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function FinalCta() {
  return (
    <section className="py-16 md:py-24">
      <div className="container text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">
          Ready to build something great?
        </h2>
        <p className="text-lg text-muted-foreground mt-2 mb-8 max-w-2xl mx-auto">
          I'm currently available for freelance work and open to new opportunities. Let's connect!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">
              Get in Touch
              <MessageCircle className="ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/placeholder-cv.pdf" download>
              Download CV
              <Download className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
