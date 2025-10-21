'use client';

import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { submitContactForm } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
  honeypot: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, { message: '', status: 'idle' });
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    // We only react to the 'success' state from the server action.
    // Errors are now handled by the global FirebaseErrorListener, so we don't need to show a toast for them here.
    if (state.status === 'success' && state.message) {
      toast({
        title: '¡Mensaje Enviado!',
        description: state.message,
      });
      form.reset(); // Reset form fields on successful submission
    }
    // A specific error message from the server action (e.g. validation) can still be shown if needed,
    // but Firestore permission errors are now handled globally.
    if (state.status === 'error' && state.message) {
       toast({
        variant: "destructive",
        title: 'Error al enviar',
        description: state.message,
      });
    }

  }, [state, toast, form]);

  return (
    <Form {...form}>
      <form
        // We pass the formAction to the form's action attribute.
        action={formAction}
        // We use the form's handleSubmit to trigger client-side validation before the action.
        onSubmit={form.handleSubmit(() => {
          // The actual form submission is handled by the 'action' prop.
          // We can still use the `formAction` function directly if we needed to pass more complex data
          // than what a standard form submission provides.
          const formData = new FormData(form.control.formValuesRef.current as unknown as HTMLFormElement);
          formAction(formData);
        })}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="tu.email@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea placeholder="¿En qué puedo ayudarte?" rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Honeypot field */}
        <FormField
          control={form.control}
          name="honeypot"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : 'Enviar Mensaje'}
        </Button>
      </form>
    </Form>
  );
}
