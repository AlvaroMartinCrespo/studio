
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { profile } from '@/lib/data';
import { Github, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { BlueskyIcon } from '@/components/shared/bluesky-icon';

const socialLinks = [
  { name: 'GitHub', href: profile.socials.github, icon: Github },
  { name: 'LinkedIn', href: profile.socials.linkedin, icon: Linkedin },
  { name: 'Bluesky', href: profile.socials.bluesky, icon: BlueskyIcon },
  { name: 'Instagram', href: profile.socials.instagram, icon: Instagram },
];

export function ContactPageClient() {

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        'url': 'https://devalvaro.vercel.app/contact',
        'name': 'Ponte en contacto con Álvaro Martín Crespo',
        'description': 'Página de contacto para proyectos, consultas o saludos.',
        'mainEntity': {
            '@type': 'Person',
            'name': profile.name,
            'email': profile.contact.email,
            'url': 'https://devalvaro.vercel.app'
        }
    };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            Ponte en contacto
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente, buscas un desarrollador frontend o quieres conectar? Puedes encontrarme en cualquiera de estos canales.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="md:col-span-2 overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background">
            <CardHeader>
              <CardTitle className="text-2xl">Contacto directo</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${profile.contact.email}`}
                className="flex items-center gap-4 rounded-xl border bg-background/80 p-4 transition-colors hover:border-primary"
              >
                <Mail className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <span className="break-all font-medium">{profile.contact.email}</span>
              </a>
              <div className="flex items-center gap-4 rounded-xl border bg-background/80 p-4">
                <MapPin className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <span className="font-medium">{profile.contact.address}</span>
              </div>
            </CardContent>
          </Card>

          {socialLinks.map(({ name, href, icon: Icon }) => (
            <a key={name} href={href} target="_blank" rel="me noopener noreferrer" className="group">
              <Card className="h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary group-hover:shadow-lg">
                <CardContent className="flex items-center gap-5 p-6">
                  <span className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-headline text-xl font-semibold">{name}</p>
                    <p className="text-sm text-muted-foreground">Conectar en {name}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-muted-foreground">
            Disponible para colaborar en proyectos de React, LitElement, JavaScript, Python y desarrollo web frontend.
          </p>
          </div>
      </div>
    </>
  );
}
