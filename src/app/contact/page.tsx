import { ContactForm } from '@/components/contact/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { profile } from '@/lib/data';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Contact | DevFolio',
  description: 'Get in touch with Álvaro Martín Crespo for collaborations or inquiries.',
};

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
              <CardDescription>I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <h3 className="font-headline text-xl font-semibold">Other ways to connect</h3>
          <div className="space-y-4">
            {profile.contactLinks.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <item.icon className="h-5 w-5 text-primary mt-1" />
                  <div>
                    {item.href ? (
                        <Link href={item.href} className="font-medium hover:underline">{item.value}</Link>
                    ) : (
                        <span className="font-medium">{item.value}</span>
                    )}
                  </div>
                </div>
            ))}
          </div>
          <Separator />
           <div>
              <h4 className="font-semibold mb-2">Prefer Calendly?</h4>
              <p className="text-sm text-muted-foreground">
                <Link href="#" className="text-primary hover:underline">Schedule a 30-min call</Link>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
