"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { slideUp, staggerChildren } from "@/lib/motion";
import { ArrowRight, BookOpen, HeartPulse, Lightbulb, Leaf, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // For 3D Tilt Effect on the image container
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation of 8 degrees
    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[90svh] bg-[#041B15] pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden flex flex-col justify-center"
    >
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Static Aurora Glows (No continuous animation to save performance) */}
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-[#FF7A00]/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00ff88]/5 blur-[100px]" />

        {/* Subtle India Map Outline (Simplified SVG Path) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] scale-150 md:scale-100 mix-blend-screen">
          <svg viewBox="0 0 800 800" className="w-full h-full max-w-4xl" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8">
            <path d="M 300 200 C 350 150 450 150 500 200 C 550 250 500 400 450 500 C 400 600 350 700 300 700 C 250 600 200 400 250 250 Z" />
            <path d="M 450 500 C 500 550 550 500 600 450" />
            <path d="M 300 200 C 250 150 200 200 150 250" />
          </svg>
        </div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* --- LEFT COLUMN: CONTENT (Span 5) --- */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="flex flex-col items-start lg:col-span-5"
          >
            {/* Badge */}
            <motion.div variants={slideUp} className="mb-6">
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]"></span>
                </span>
                Empowering Communities Across India
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={slideUp} 
              className="font-display font-bold text-5xl md:text-6xl text-white leading-[1.1] mb-6 tracking-tight"
            >
              Building a brighter future, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#ffaa55]">
                together.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              variants={slideUp} 
              className="font-body text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light"
            >
              Empowering youth through education, healthcare, entrepreneurship, and sustainable development.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <Link 
                href="/volunteer" 
                className="group relative inline-flex items-center justify-center bg-gradient-to-b from-[#FF8F26] to-[#FF7A00] text-white rounded-full px-8 py-4 font-semibold text-lg transition-all duration-500 hover:-translate-y-0.5 shadow-[0_8px_20px_-4px_rgba(255,122,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_12px_30px_-4px_rgba(255,122,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.6)] border border-[#ff9d40]"
              >
                <span className="relative z-10 flex items-center">
                  Volunteer Now
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:scale-110" />
                </span>
                {/* Internal hover glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>
              <Link 
                href="/programs" 
                className="group inline-flex items-center justify-center bg-[#041B15] border border-white/20 text-white rounded-full px-8 py-4 font-semibold text-lg transition-all duration-500 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 shadow-[0_8px_15px_rgba(255,255,255,0.02),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_12px_25px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.2)]"
              >
                Explore Programs
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={slideUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00]" />
                <span>1,200+ Volunteers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00]" />
                <span>150+ Communities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00]" />
                <span>Nationwide Programs</span>
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT COLUMN: VISUALS (Span 7) --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full lg:col-span-7 h-[500px] lg:h-[650px] flex items-center justify-center mt-12 lg:mt-0"
          >
            {/* Organic Blob Container with 3D Tilt */}
            <motion.div 
              style={{ y: y1 }}
              className="relative w-[80%] h-[80%] z-10 perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Layered Glow Behind Image */}
              <div className="absolute inset-0 bg-[#FF7A00]/20 blur-3xl rounded-[40%_60%_70%_30%/40%_50%_60%_50%] scale-105" />
              
              {/* Actual Image Container */}
              <motion.div 
                animate={{ 
                  rotateX, 
                  rotateY
                }}
                transition={{ 
                  rotateX: { type: "spring", stiffness: 100, damping: 20 },
                  rotateY: { type: "spring", stiffness: 100, damping: 20 }
                }}
                className="relative w-full h-full overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-[#041B15] group rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#041B15]/60 via-transparent to-transparent z-10 mix-blend-multiply" />
                <Image
                  src="/assets/images/hero.jpg"
                  alt="A group of smiling Indian school boys in blue uniforms"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-110"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Feature Cards - Floating gently with CSS animation */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Education: Top-Left */}
              <div className="absolute top-[5%] left-[-5%] animate-[gentleFloat_4s_ease-in-out_infinite_alternate]">
                <div className="bg-[#041B15]/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF7A00]/20 flex items-center justify-center text-[#FF7A00]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="pr-2">
                    <p className="text-white text-sm font-bold">Education</p>
                    <p className="text-gray-400 text-xs">Empowering minds</p>
                  </div>
                </div>
              </div>

              {/* Healthcare: Bottom-Left */}
              <div className="absolute bottom-[10%] left-[-2%] animate-[gentleFloat_5s_ease-in-out_infinite_alternate-reverse]">
                <div className="bg-[#041B15]/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div className="pr-2">
                    <p className="text-white text-sm font-bold">Healthcare</p>
                    <p className="text-gray-400 text-xs">Saving lives</p>
                  </div>
                </div>
              </div>

              {/* Entrepreneurship: Top-Right */}
              <div className="absolute top-[15%] right-[-5%] animate-[gentleFloat_6s_ease-in-out_infinite_alternate]">
                <div className="bg-[#041B15]/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div className="pr-2">
                    <p className="text-white text-sm font-bold">Innovation</p>
                    <p className="text-gray-400 text-xs">Building futures</p>
                  </div>
                </div>
              </div>

              {/* Sustainability: Bottom-Right */}
              <div className="absolute bottom-[20%] right-[-10%] animate-[gentleFloat_4.5s_ease-in-out_infinite_alternate-reverse]">
                <div className="bg-[#041B15]/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div className="pr-2">
                    <p className="text-white text-sm font-bold">Sustainability</p>
                    <p className="text-gray-400 text-xs">Greener tomorrow</p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
