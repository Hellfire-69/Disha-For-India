"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn, slideUp, staggerChildren } from "@/lib/motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full bg-bg-dark pt-32 pb-20 md:pt-40 md:pb-32 mb-12 md:mb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="flex flex-col items-start z-10"
          >
            <motion.div variants={slideUp} className="mb-6">
              <span className="inline-block py-1.5 px-3 rounded-full bg-primary/20 text-primary font-accent font-medium text-sm tracking-widest uppercase border border-primary/30">
                Empowering India
              </span>
            </motion.div>

            <motion.h1 variants={slideUp} className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-text-light leading-[1.1] mb-6">
              Building a brighter future, <span className="text-primary relative inline-block">together<svg className="absolute -bottom-2 left-0 w-full h-3 text-primary" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="none"/></svg></span>
            </motion.h1>

            <motion.p variants={slideUp} className="font-body text-gray-400 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
              Join us in our mission to democratize quality education, provide accessible healthcare, and foster entrepreneurship across India.
            </motion.p>

            <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/volunteer" 
                className="bg-primary text-white rounded-3xl px-8 py-4 text-center font-semibold hover:bg-primary-dark hover:scale-[1.02] transition-all text-lg"
              >
                Volunteer Now
              </Link>
              <Link 
                href="/programs" 
                className="border-2 border-white/20 text-white rounded-3xl px-8 py-4 text-center font-semibold hover:bg-white/10 transition-all text-lg"
              >
                Find Your Program
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden bg-bg-dark"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 to-transparent z-10" />
            <Image
              src="/assets/images/hero.jpg"
              alt="A group of smiling Indian school boys in blue uniforms, clustered tightly together and waving happily."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
