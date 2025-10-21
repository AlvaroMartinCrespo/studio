'use server';

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

// Contact Form Schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
  honeypot: z.string().optional(), // Honeypot field
});

export type ContactFormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot check
  if (formData.get('honeypot')) {
    // Silently fail for bots
    return { message: '¡Mensaje enviado con éxito!', status: 'success' };
  }

  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.issues.map((issue) => issue.message).join(', ');
    return {
      message: `Datos inválidos: ${errorMessage}`,
      status: 'error',
    };
  }

  try {
    const { firestore } = initializeFirebase();
    const submissionsCollection = collection(firestore, 'contact_form_submissions');
    
    await addDoc(submissionsCollection, {
      ...validatedFields.data,
      submissionDate: new Date().toISOString(),
    });

    return { message: '¡Gracias por tu mensaje! Te responderé pronto.', status: 'success' };
  } catch (error) {
    console.error('Error submitting form:', error);
    // In a real app, you'd want to log this error to a monitoring service.
    // For this prototype, we'll return a generic error message.
    // The detailed error will be visible in the server logs.
    return { message: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.', status: 'error' };
  }
}
