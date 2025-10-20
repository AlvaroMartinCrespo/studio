'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';

import { getProfileFeedback } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader, Terminal } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  profile: z.string().min(50, 'Profile text must be at least 50 characters.'),
  projects: z.string().min(50, 'Projects description must be at least 50 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export function FeedbackForm() {
  const [state, formAction] = useFormState(getProfileFeedback, { status: 'idle' });
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile: "I am a frontend developer with 3 years of experience in React and Next.js. I like building user interfaces.",
      projects: "Project 1: A blog built with Next.js. Project 2: A simple to-do list app with React.",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('profile', data.profile);
    formData.append('projects', data.projects);
    formAction(formData);
  };
  
  useEffect(() => {
    if (state.status !== 'idle') {
      setIsLoading(false);
    }
  }, [state]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Card>
        <CardHeader>
          <CardTitle>Get AI Feedback</CardTitle>
          <CardDescription>
            Enter your profile summary and project descriptions below. The AI will provide suggestions for improvement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Profile Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., I'm a frontend developer specializing in..." rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Project Descriptions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Project A: Built an e-commerce site that..." rows={8} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <><Loader className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : 'Get Feedback'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-primary"/> AI Suggestions
          </CardTitle>
          <CardDescription>
            Feedback from the career coach will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-full mt-4" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          )}
          {state.status === 'error' && (
             <Alert variant="destructive">
               <Terminal className="h-4 w-4" />
               <AlertTitle>Analysis Error</AlertTitle>
               <AlertDescription>{state.message}</AlertDescription>
             </Alert>
          )}
          {state.status === 'success' && state.feedback && (
             <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {state.feedback}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
