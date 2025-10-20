import { Hero } from '@/components/home/hero';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { Skills } from '@/components/home/skills';
import { FinalCta } from '@/components/home/final-cta';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Skills />
      <FinalCta />
    </>
  );
}
