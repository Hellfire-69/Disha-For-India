"use client";

import { useState } from "react";
import { useForm, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { 
 
  volunteerRegistrationSchema,
  type VolunteerFormValues 
} from "@/lib/schemas/volunteer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const INTERESTS = ["Education", "Health", "Environment", "Entrepreneurship", "Events"];
const AVAILABILITY = ["Weekdays", "Weekends", "Both"];
const HOURS = ["2-5", "5-10", "10+"];

export default function VolunteerForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,

    formState: { errors },
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      interests: [],
    }
  });

  const nextStep = async () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = await trigger(["name", "email", "phone", "city"]);
    } else if (step === 2) {
      isValid = await trigger(["interests"]);
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: VolunteerFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("=== Volunteer Application Submitted ===");
    console.log(JSON.stringify(data, null, 2));
    console.log("=======================================");
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-12 text-center shadow-xl border border-border"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-display font-bold text-3xl text-text mb-4">Application Received!</h2>
        <p className="font-body text-text-muted text-lg max-w-md mx-auto mb-8 leading-relaxed">
          Thank you for stepping up to make a difference. Our team will review your application and get back to you within 48 hours.
        </p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline" 
          className="rounded-full px-8"
        >
          Submit Another Application
        </Button>
      </motion.div>
    );
  }

  // Calculate progress
  const progressPercent = ((step - 1) / 2) * 100;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden relative">
      
      {/* Progress Bar Header */}
      <div className="bg-bg p-6 md:p-8 border-b border-border relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display font-bold text-2xl text-text">Volunteer Application</h2>
          <span className="font-accent text-sm font-bold text-text-muted">Step {step} of 3</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="p-6 md:p-10 relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Prevent Layout Pops with relative container and mode="wait" */}
          <div className="relative w-full min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: PERSONAL INFO */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h3 className="font-display font-bold text-xl text-text mb-2">Personal Details</h3>
                    <p className="font-body text-text-muted text-sm">Tell us a bit about yourself so we can get in touch.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" {...register("name")} className={errors.name ? "border-red-500" : ""} />
                      {errors.name && <p className="text-sm text-red-500 font-body">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" {...register("email")} className={errors.email ? "border-red-500" : ""} />
                      {errors.email && <p className="text-sm text-red-500 font-body">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
                      {errors.phone && <p className="text-sm text-red-500 font-body">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City of Residence</Label>
                      <Input id="city" placeholder="Mumbai, Delhi, etc." {...register("city")} className={errors.city ? "border-red-500" : ""} />
                      {errors.city && <p className="text-sm text-red-500 font-body">{errors.city.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: AREAS OF INTEREST */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h3 className="font-display font-bold text-xl text-text mb-2">Areas of Interest</h3>
                    <p className="font-body text-text-muted text-sm">Select one or more areas where you&apos;d like to contribute.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {INTERESTS.map((interest) => (
                      <div key={interest} className="relative">
                        <input
                          type="checkbox"
                          id={`interest-${interest}`}
                          value={interest}
                          {...register("interests")}
                          className="sr-only peer"
                        />
                        <label
                          htmlFor={`interest-${interest}`}
                          className="flex items-center p-4 border border-border rounded-xl cursor-pointer bg-white transition-all hover:bg-gray-50 peer-checked:border-primary peer-checked:bg-primary-light peer-checked:text-primary-dark peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                        >
                          <span className="w-5 h-5 border-2 rounded border-gray-300 mr-3 peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-colors">
                            <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="font-body font-medium">{interest}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.interests && <p className="text-sm text-red-500 font-body">{errors.interests.message}</p>}
                </motion.div>
              )}

              {/* STEP 3: AVAILABILITY */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="mb-4">
                    <h3 className="font-display font-bold text-xl text-text mb-2">Availability & Commitment</h3>
                    <p className="font-body text-text-muted text-sm">Let us know when you can help out.</p>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base">When are you available?</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {AVAILABILITY.map((opt) => (
                        <div key={opt} className="relative">
                          <input
                            type="radio"
                            id={`avail-${opt}`}
                            value={opt}
                            {...register("availability")}
                            className="sr-only peer"
                          />
                          <label
                            htmlFor={`avail-${opt}`}
                            className="flex items-center justify-center p-4 border border-border rounded-xl cursor-pointer bg-white transition-all hover:bg-gray-50 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 font-body font-medium text-center"
                          >
                            {opt}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.availability && <p className="text-sm text-red-500 font-body">{errors.availability.message}</p>}
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base">Hours per week?</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {HOURS.map((opt) => (
                        <div key={opt} className="relative">
                          <input
                            type="radio"
                            id={`hours-${opt}`}
                            value={opt}
                            {...register("hoursPerWeek")}
                            className="sr-only peer"
                          />
                          <label
                            htmlFor={`hours-${opt}`}
                            className="flex items-center justify-center p-3 border border-border rounded-xl cursor-pointer bg-white transition-all hover:bg-gray-50 peer-checked:border-primary peer-checked:bg-primary-light peer-checked:text-primary-dark peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 font-body font-medium text-center"
                          >
                            {opt}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.hoursPerWeek && <p className="text-sm text-red-500 font-body">{errors.hoursPerWeek.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Any message or specific skills? (Optional)</Label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full flex rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="I have experience in graphic design and would love to help with campaigns..."
                      {...register("message")}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Footer */}
          <div className="pt-8 mt-4 border-t border-border flex items-center justify-between">
            {step > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                disabled={isSubmitting}
                className="font-body"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
              <div /> // Spacer
            )}

            {step < 3 ? (
              <Button 
                type="button" 
                onClick={nextStep}
                className="bg-primary text-white hover:bg-primary-dark font-body px-8"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-bg-dark text-white hover:bg-primary transition-colors font-body px-8"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
