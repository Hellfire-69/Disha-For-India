"use client";

import { motion } from "framer-motion";
import { fadeIn, slideUp, staggerChildren, scaleIn } from "@/lib/motion";
import { Eye, Target, ShieldCheck, Zap, Users, Lightbulb, BadgeCheck, HeartHandshake } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";



const coreValues = [
  {
    name: "Integrity",
    description: "We uphold the highest standards of transparency and honesty in all our actions and partnerships.",
    icon: ShieldCheck,
  },
  {
    name: "Empowerment",
    description: "We equip individuals with the tools, skills, and confidence to take control of their own destinies.",
    icon: Zap,
  },
  {
    name: "Inclusivity",
    description: "We believe every individual, regardless of their background, deserves equal access to opportunities.",
    icon: Users,
  },
  {
    name: "Innovation",
    description: "We continuously seek creative, scalable solutions to solve deep-rooted social challenges.",
    icon: Lightbulb,
  },
  {
    name: "Community",
    description: "We build strong, localized networks that foster mutual support, collaboration, and collective growth.",
    icon: HeartHandshake,
  },
  {
    name: "Accountability",
    description: "We hold ourselves responsible for delivering measurable impact and sustainable results.",
    icon: BadgeCheck,
  },
];

export default function VisionMissionPage() {
  return (
    <div className="w-full">
      {/* 1. PAGE HERO */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&q=80"
            alt="Our Purpose"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bg" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center mt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col items-center"
          >
            <span className="inline-block mb-4 text-primary font-accent font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              Our Purpose
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-lg">
              Why Disha Exists
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. VISION & MISSION SPLIT */}
      <section className="py-12 md:py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Vision Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="bg-secondary-dark text-white p-10 md:p-14 rounded-3xl h-full flex flex-col justify-center relative overflow-hidden group shadow-xl"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                <Eye className="w-48 h-48 text-white" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-sm">
                  <Eye className="w-8 h-8 text-primary-light" />
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">Our Vision</h2>
                <p className="font-body text-white/90 text-xl leading-relaxed">
                  To improve employability quotient, skill quotient for improving society, to develop self aware Healthy, Happy and Wealthy Society.
                </p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="bg-primary-light text-text p-10 md:p-14 rounded-3xl h-full flex flex-col justify-center relative overflow-hidden group shadow-xl"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                <Target className="w-48 h-48 text-text" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/50 flex items-center justify-center mb-8 backdrop-blur-sm shadow-sm">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">Our Mission</h2>
                <p className="font-body text-text-muted text-xl leading-relaxed">
                  Skill over 5 lakh youth to be employable and coach them to become Entrepreneurs. Ignite fire among academicians to transform education and empower academicians and students to live healthy, happy and wealthy lives.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="py-12 md:py-24 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-block mb-4 text-primary font-accent font-semibold text-sm tracking-widest uppercase">
              What We Stand For
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text">
              Our Core Values
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.name}
                  variants={slideUp}
                  className="bg-bg border border-border rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-text mb-3">
                    {value.name}
                  </h3>
                  <p className="font-body text-text-muted leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. MANIFESTO SECTION */}
      <section className="py-24 md:py-32 bg-bg-dark relative overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              &quot;Live by our thoughts and values everyday and to ignite spark in people to live a{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">Beautiful</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>{" "}
              Life.&quot;             </h2>
            <p className="mt-8 font-accent text-primary uppercase tracking-widest text-sm font-bold">
              — Indu Aggarwal, Founder
            </p>
          </motion.div>
        </div>
        {/* Subtle grid background */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </section>

      {/* 5. CTA STRIP */}
      <section className="py-16 bg-primary text-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-8">
            Ready to be part of the change?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" render={<Link href="/volunteer" />} className="w-full sm:w-auto">
              Volunteer Now
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary" render={<Link href="/programs" />}>
              Explore Programs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
