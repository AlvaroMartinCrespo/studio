import { FeedbackForm } from "@/components/feedback/feedback-form";
import { Lightbulb } from "lucide-react";

export const metadata = {
  title: 'AI Profile Feedback | DevFolio',
  description: 'Leverage AI to get feedback and improve your developer profile and project descriptions.',
};

export default function FeedbackPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <Lightbulb className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          AI-Powered Profile Feedback
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          This tool uses generative AI to analyze your profile and project descriptions. It acts as a career coach to help you better highlight your skills and experience to potential employers.
        </p>
      </div>

      <FeedbackForm />
    </div>
  );
}
