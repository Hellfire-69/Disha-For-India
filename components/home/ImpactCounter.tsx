"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { staggerChildren, fadeIn } from "@/lib/motion";
import { GraduationCap, Users, MapPin, BookOpen } from "lucide-react";
import type { Stat } from "@/lib/types";
import statsData from "@/data/stats.json";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Users,
  MapPin,
  BookOpen,
};

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = Math.floor(v).toLocaleString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return <span ref={ref}>0</span>;
}

export function ImpactCounter() {
  const stats: Stat[] = statsData;

  return (
    <section className="py-12 md:py-24 bg-bg-dark border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        
        <div className="mb-16 flex flex-col items-center">
          <span className="inline-block mb-4 text-primary font-accent font-medium text-sm tracking-widest uppercase">
            OUR IMPACT
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text-light">
            Numbers That Speak
          </h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10"
        >
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon];
            
            return (
              <motion.div 
                key={stat.id} 
                variants={fadeIn}
                className="flex flex-col items-center p-6 md:p-8 rounded-2xl bg-secondary-dark/40 border border-white/5"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  {Icon && <Icon className="w-8 h-8" />}
                </div>
                
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-accent font-bold text-4xl md:text-5xl lg:text-[56px] text-white leading-none">
                    <AnimatedNumber value={stat.value} />
                  </span>
                  {stat.suffix && (
                    <span className="font-accent font-bold text-2xl md:text-4xl text-primary leading-none">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                
                <span className="font-display text-gray-300 text-lg md:text-xl font-medium tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}
