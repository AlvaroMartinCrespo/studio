import { ContactForm } from '@/components/contact/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { profile } from '@/lib/data';
import Link from 'next/link';

export const metadata = {
  title: 'Contacto | DevFolio',
  description: 'Ponte en contacto con Álvaro Martín Crespo para colaboraciones o consultas.',
};

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Ponte en contacto
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          ¿Tienes un proyecto en mente, una pregunta o simplemente quieres saludar? Me encantaría saber de ti.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Envíame un mensaje</CardTitle>
              <CardDescription>Te responderé lo antes posible.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <h3 className="font-headline text-xl font-semibold">Otras formas de conectar</h3>
          <div className="space-y-4">
            {profile.contactLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    {item.href ? (
                        <Link href={item.href} className="font-medium hover:underline break-all">{item.value}</Link>
                    ) : (
                        <span className="font-medium">{item.value}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
