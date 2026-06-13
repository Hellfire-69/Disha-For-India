"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerChildren, slideUp } from "@/lib/motion";
import { ArrowRight, Users } from "lucide-react";
import type { Program } from "@/lib/types";
import programsData from "@/data/programs.json";

export function ProgramsPreview() {
  const featuredPrograms = (programsData as Program[]).filter((p) => p.featured);

  return (
    <section className="py-12 md:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="inline-block mb-4 text-primary font-accent font-medium text-sm tracking-widest uppercase">
            WHAT WE DO
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-secondary">
            Programs That Transform Lives
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredPrograms.map((program) => (
            <motion.div
              key={program.id}
              variants={slideUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col border border-gray-100"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 text-secondary rounded-full font-accent text-xs font-bold px-3 py-1.5 uppercase tracking-widest shadow-sm">
                    {program.category}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="font-display font-bold text-2xl text-text mb-3">
                  {program.title}
                </h3>
                <p className="text-text-muted mb-6 flex-grow leading-relaxed">
                  {program.tagline}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500 font-medium">
                    <Users className="w-4 h-4 mr-1.5 text-primary" />
                    {program.beneficiaries.toLocaleString()} beneficiaries
                  </div>
                  
                  <Link 
                    href={`/programs/${program.id}`}
                    className="flex items-center text-primary font-semibold hover:text-primary-dark transition-colors text-sm"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center justify-center bg-secondary text-white rounded-full px-8 py-4 font-semibold hover:bg-secondary-dark hover:scale-[1.02] transition-all text-lg"
          >
            View All Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
