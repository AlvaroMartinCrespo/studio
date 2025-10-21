import Image from 'next/image';
import { profile, skills } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Twitter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata = {
  title: 'About Me | DevFolio',
  description: `Learn more about Álvaro Martín Crespo, his professional journey, and technical skills.`,
};

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-1 flex flex-col items-center">
            {profile.image && (
              <Image
                src={profile.image.imageUrl}
                alt={profile.image.description}
                width={250}
                height={250}
                className="rounded-full object-cover border-4 border-primary/20 shadow-xl mb-6"
                data-ai-hint={profile.image.imageHint}
              />
            )}
            <Button asChild className="w-full">
              <a href={profile.cvUrl} download>
                Download CV <Download className="ml-2" />
              </a>
            </Button>
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" size="icon" asChild>
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                  <Twitter />
                </a>
              </Button>
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="font-headline text-4xl md:text-5xl font-bold mb-6">About Me</h1>
            <div className="prose dark:prose-invert max-w-none space-y-6">
              <p>
                Hello! I'm Álvaro Martín Crespo, a passionate frontend developer based in Madrid. My journey into web development started
                with a fascination for how beautiful design and powerful technology can come together to create amazing user experiences.
              </p>
              <p>
                Over the years, I've honed my skills in modern web technologies, with a special focus on the React ecosystem. I thrive on solving complex
                problems and building applications that are not only functional but also fast, accessible, and a joy to use. I believe in writing
                clean, maintainable code and following best practices to ensure long-term project success.
              </p>
              <p>
                When I'm not coding, you can find me exploring the latest trends in technology, contributing to open-source projects, or enjoying a good cup of coffee while planning my next project.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-headline text-3xl font-bold text-center mb-10">Skills & Expertise</h2>
          <div className="text-center">
             <p className="text-muted-foreground mb-6">Here are some of the technologies I'm proficient in. For a practical demonstration, check out my work on the <Link href="/projects" className="text-primary hover:underline">projects page</Link>.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map(skill => (
              <Badge key={skill.name} className="text-base px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
