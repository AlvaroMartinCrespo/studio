'use server';

/**
 * @fileOverview Provides AI-powered feedback on developer profiles and project descriptions.
 *
 * - profileFeedback - A function that provides feedback on a profile and project descriptions.
 * - ProfileFeedbackInput - The input type for the profileFeedback function, including profile and projects data.
 * - ProfileFeedbackOutput - The return type for the profileFeedback function, providing AI-generated feedback.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileFeedbackInputSchema = z.object({
  profile: z.string().describe('The developer profile text to analyze.'),
  projects: z.string().describe('The developer projects descriptions to analyze.'),
});
export type ProfileFeedbackInput = z.infer<typeof ProfileFeedbackInputSchema>;

const ProfileFeedbackOutputSchema = z.object({
  feedback: z.string().describe('AI-generated feedback on the profile and projects.'),
});
export type ProfileFeedbackOutput = z.infer<typeof ProfileFeedbackOutputSchema>;

export async function profileFeedback(input: ProfileFeedbackInput): Promise<ProfileFeedbackOutput> {
  return profileFeedbackFlow(input);
}

const profileFeedbackPrompt = ai.definePrompt({
  name: 'profileFeedbackPrompt',
  input: {schema: ProfileFeedbackInputSchema},
  output: {schema: ProfileFeedbackOutputSchema},
  prompt: `You are an AI career coach specializing in developer profiles. Analyze the provided developer profile and project descriptions, then provide feedback on how to improve them to better highlight the developer's skills and experience to potential employers.

Profile: {{{profile}}}

Projects: {{{projects}}}

Focus on clarity, impact, and quantifiable results. Suggest specific improvements to the language and presentation.
`,
});

const profileFeedbackFlow = ai.defineFlow(
  {
    name: 'profileFeedbackFlow',
    inputSchema: ProfileFeedbackInputSchema,
    outputSchema: ProfileFeedbackOutputSchema,
  },
  async input => {
    const {output} = await profileFeedbackPrompt(input);
    return output!;
  }
);
