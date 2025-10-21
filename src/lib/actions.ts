'use server';

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { addDocumentNonBlocking }from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';

// Contact Form Schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
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
    return { message: 'Message sent successfully!', status: 'success' };
  }

  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    // This case should ideally be handled by client-side validation,
    // but we keep it for robustness.
    const errorMessage = validatedFields.error.issues.map((issue) => issue.message).join(', ');
    return {
      message: `Invalid data: ${errorMessage}`,
      status: 'error',
    };
  }

  const { firestore } = initializeFirebase();
  const submissionsCollection = collection(firestore, 'contact_form_submissions');
  
  // This function does not block or throw. It handles its own errors
  // by emitting them globally, where they will be caught by FirebaseErrorListener.
  addDocumentNonBlocking(submissionsCollection, {
    ...validatedFields.data,
    submissionDate: new Date().toISOString(),
  });

  // Assume success and let the non-blocking operation complete in the background.
  // Any permission errors will be displayed to the developer via the error overlay.
  return { message: 'Thank you for your message! I will get back to you soon.', status: 'success' };
}
