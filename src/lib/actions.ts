'use server';

import { z } from 'zod';
import { profileFeedback, type ProfileFeedbackInput } from '@/ai/flows/profile-feedback-flow';

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
    // Here you would typically send an email, save to a database, etc.
    // For this example, we'll just log it to the console.
    console.log('New contact form submission:');
    console.log(validatedFields.data);
    
    return { message: 'Thank you for your message! I will get back to you soon.', status: 'success' };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { message: 'An unexpected error occurred. Please try again later.', status: 'error' };
  }
}


// Profile Feedback Schema
const profileFeedbackSchema = z.object({
  profile: z.string().min(50, 'Profile text must be at least 50 characters.'),
  projects: z.string().min(50, 'Projects description must be at least 50 characters.'),
});

export type ProfileFeedbackState = {
  feedback?: string;
  message?: string;
  status: 'success' | 'error' | 'idle';
}

export async function getProfileFeedback(
  prevState: ProfileFeedbackState,
  formData: FormData
): Promise<ProfileFeedbackState> {
  const validatedFields = profileFeedbackSchema.safeParse({
    profile: formData.get('profile'),
    projects: formData.get('projects'),
  });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors.map(e => e.message).join(' ');
    return {
      message: errorMessages,
      status: 'error'
    };
  }

  try {
    const input: ProfileFeedbackInput = validatedFields.data;
    const result = await profileFeedback(input);
    return { feedback: result.feedback, status: 'success' };
  } catch(error) {
    console.error("AI Feedback Error:", error);
    return { message: 'Failed to get feedback from AI. Please try again later.', status: 'error' };
  }
}
