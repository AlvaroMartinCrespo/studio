import { Card, CardContent } from '@/components/ui/card';
import { skills } from '@/lib/data';

export function Skills() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Mis Habilidades Técnicas
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Una instantánea de las tecnologías y herramientas con las que trabajo regularmente.
          </p>
        </div>
        
        <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {skills.map((skill) => (
            <Card key={skill.name} className="transition-colors hover:border-primary/50">
              <CardContent className="flex aspect-square flex-col items-center justify-center p-4">
                <img
                  src={skill.logo}
                  alt={`Logotipo de ${skill.name}`}
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 dark:invert"
                />
                <p className="mt-2 text-center text-sm font-medium">{skill.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
