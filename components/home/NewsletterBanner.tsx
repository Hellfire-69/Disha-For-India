"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { fadeIn } from "@/lib/motion";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof formSchema>;

export function NewsletterBanner() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async () => {
    // Simulate network delay for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSuccess(true);
  };

  return (
    <section className="py-12 md:py-24 bg-primary relative overflow-hidden">
      {/* Decorative radial gradient to add depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="flex flex-col items-center"
        >
          <span className="inline-block mb-4 text-white font-accent font-semibold text-sm tracking-widest uppercase shadow-sm">
            STAY CONNECTED
          </span>
          
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6">
            Join the Disha Movement
          </h2>
          
          <p className="font-body text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Get updates on programs, events, and impact stories delivered to your inbox.
          </p>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-center gap-4 text-white shadow-lg"
            >
              <CheckCircle2 className="w-10 h-10 text-white shrink-0" />
              <div className="text-left">
                <p className="font-display font-bold text-2xl mb-1">You&apos;re in!</p>
                <p className="font-body text-white/90">Welcome to the Disha family.</p>
              </div>
            </motion.div>
          ) : (
            <div className="w-full max-w-lg mx-auto">
              <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="flex flex-col md:flex-row gap-3 md:gap-2 w-full items-start"
              >
                <div className="relative w-full">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-white text-text rounded-full px-6 py-4 outline-none focus:ring-4 focus:ring-white/30 transition-all placeholder:text-gray-400 font-body shadow-md"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <span className="absolute left-4 top-[105%] text-white text-sm font-medium drop-shadow-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-bg-dark text-white rounded-full px-8 py-4 font-semibold hover:bg-secondary transition-colors font-body whitespace-nowrap shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              
              <p className="mt-8 text-white/70 font-body text-sm font-medium">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
