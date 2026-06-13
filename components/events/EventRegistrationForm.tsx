"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventRegistrationSchema, type EventRegistrationFormValues } from "@/lib/schemas/eventRegistration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";

interface EventRegistrationFormProps {
  eventId: string;
  eventTitle: string;
}

export default function EventRegistrationForm({ eventId, eventTitle }: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventRegistrationFormValues>({
    resolver: zodResolver(eventRegistrationSchema),
  });

  const onSubmit = async (data: EventRegistrationFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Log exactly as requested
    console.log("=== Event Registration Submitted ===");
    console.log("Event ID:", eventId);
    console.log("Event Title:", eventTitle);
    console.log("Applicant Data:", data);
    console.log("====================================");
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-3xl p-8 md:p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-display font-bold text-2xl text-gray-900 mb-3">
          Registration Successful!
        </h3>
        <p className="font-body text-gray-600 mb-6 max-w-md mx-auto">
          Thank you for registering for {eventTitle}. We have sent a confirmation email with further details.
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          Register Another Person
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
      
      <div className="mb-8 text-center">
        <h3 className="font-display font-bold text-3xl text-text mb-2">Secure Your Spot</h3>
        <p className="font-body text-text-muted">Fill out the form below to register for this event.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            placeholder="John Doe" 
            {...register("name")} 
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500 font-body">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="john@example.com" 
            {...register("email")} 
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500 font-body">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+91 98765 43210" 
            {...register("phone")} 
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-sm text-red-500 font-body">{errors.phone.message}</p>}
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-bg-dark text-white hover:bg-primary transition-colors text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Complete Registration"
          )}
        </Button>
      </form>
    </div>
  );
}
