'use server';

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
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
    return { message: 'Spam detected.', status: 'error' };
  }

  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check your entries.',
      status: 'error',
    };
  }

  try {
    const { firestore } = initializeFirebase();
    const submissionsCollection = collection(firestore, 'contact_form_submissions');
    
    await addDocumentNonBlocking(submissionsCollection, {
      ...validatedFields.data,
      submissionDate: new Date().toISOString(),
    });

    return { message: 'Thank you for your message! I will get back to you soon.', status: 'success' };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { message: 'An unexpected error occurred. Please try again later.', status: 'error' };
  }
}
