"use client";

import { motion } from "framer-motion";
import { slideUp, staggerChildren, fadeIn } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

export function NationalImpactTeaser() {
  return (
    <section className="py-16 md:py-24 bg-bg overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (5 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <motion.span 
              variants={slideUp}
              className="inline-block mb-4 text-primary font-accent font-semibold text-sm tracking-widest uppercase"
            >
              National Footprint
            </motion.span>
            
            <motion.h2 
              variants={slideUp}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-text mb-6 leading-tight"
            >
              Tracking Transformation Across India
            </motion.h2>
            
            <motion.p 
              variants={slideUp}
              className="font-body text-text-muted text-lg leading-relaxed mb-8"
            >
              From remote rural classrooms to dynamic urban skill centers, our regional field chapters are rapidly expanding. We are building a pan-India network of dedicated volunteers, partners, and educators to drive measurable, grassroots change.
            </motion.p>
            
            <motion.div variants={slideUp}>
              <Button size="lg" className="rounded-3xl px-8 shadow-lg bg-primary hover:bg-primary-dark text-white font-body font-bold text-base h-14" render={<Link href="/impact-map" />}>
                Explore Live Interactive Map
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Teaser (7 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-border relative group">
              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl z-0" />
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl z-0" />
              
              {/* Graphic Container */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden z-10 bg-bg-dark border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
                  alt="Map of India Impact Preview"
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                
                {/* Floating Overlay Pins */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white/90 backdrop-blur-md rounded-3xl px-6 py-4 shadow-2xl flex items-center gap-4 transform -translate-y-8"
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-xl text-text leading-none">28+</p>
                      <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mt-1">Active States</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
