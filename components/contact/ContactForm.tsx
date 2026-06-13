"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Log exactly as requested
    console.log("=== Contact Form Submitted ===");
    console.log(JSON.stringify(data, null, 2));
    console.log("==============================");
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
      
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-display font-bold text-3xl text-text mb-4">Message Sent!</h3>
            <p className="font-body text-text-muted text-lg mb-8 max-w-sm mx-auto">
              Thank you for reaching out to us. Our team will get back to you shortly.
            </p>
            <Button 
              onClick={() => {
                reset();
                setIsSuccess(false);
              }}
              variant="outline"
              className="rounded-full px-8 font-body"
            >
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div className="mb-8">
              <h3 className="font-display font-bold text-3xl text-text mb-2">Send us a Message</h3>
              <p className="font-body text-text-muted">Fill out the form below and we&apos;ll be in touch.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-name">Full Name</Label>
              <Input 
                id="contact-name" 
                placeholder="John Doe" 
                {...register("name")} 
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              <div aria-live="polite" id="name-error">
                {errors.name && <p className="text-sm text-red-500 font-body mt-1">{errors.name.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Email Address</Label>
              <Input 
                id="contact-email" 
                type="email" 
                placeholder="john@example.com" 
                {...register("email")} 
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              <div aria-live="polite" id="email-error">
                {errors.email && <p className="text-sm text-red-500 font-body mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-subject">Subject</Label>
              <Input 
                id="contact-subject" 
                placeholder="How can we help you?" 
                {...register("subject")} 
                aria-invalid={errors.subject ? "true" : "false"}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={errors.subject ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              <div aria-live="polite" id="subject-error">
                {errors.subject && <p className="text-sm text-red-500 font-body mt-1">{errors.subject.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <textarea 
                id="contact-message" 
                rows={5}
                {...register("message")}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`w-full flex rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.message ? "border-red-500 focus-visible:ring-red-500" : "border-input focus-visible:ring-ring"
                }`}
                placeholder="Tell us more about your inquiry..."
              />
              <div aria-live="polite" id="message-error">
                {errors.message && <p className="text-sm text-red-500 font-body mt-1">{errors.message.message}</p>}
              </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-primary text-white hover:bg-primary-dark transition-colors font-body text-lg group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
