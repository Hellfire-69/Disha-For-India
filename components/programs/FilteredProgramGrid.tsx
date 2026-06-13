"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
// Removed unused framer-motion imports
import { Users, Clock, ArrowRight } from "lucide-react";
import type { Program } from "@/lib/types";

interface FilteredProgramGridProps {
  programs: Program[];
}

const CATEGORIES = ["All", "Education", "Health", "Entrepreneurship", "Environment", "Financial Literacy"];

export default function FilteredProgramGrid({ programs }: FilteredProgramGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPrograms = activeFilter === "All"
    ? programs
    : programs.filter((p) => p.category.toLowerCase().replace("-", " ") === activeFilter.toLowerCase());

  return (
    <section className="py-12 md:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md scale-105"
                    : "bg-white text-text-muted border border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Program Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => (
              <motion.div
                key={program.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-border group flex flex-col h-full hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-accent text-xs font-bold uppercase tracking-wider text-primary">
                    {program.category.replace("-", " ")}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="font-display font-bold text-2xl text-text mb-2 line-clamp-2">
                    {program.title}
                  </h3>
                  <p className="font-body text-text-muted text-sm mb-6 flex-grow">
                    {program.tagline}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-text-muted font-body">Beneficiaries</div>
                        <div className="font-bold text-text font-display">{program.beneficiaries.toLocaleString()}+</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-xs text-text-muted font-body">Duration</div>
                        <div className="font-bold text-text font-display">{program.duration}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <Link 
                    href={`/programs/${program.id}`}
                    className="mt-auto flex items-center justify-between w-full py-3 px-6 bg-bg-dark text-white rounded-xl hover:bg-primary transition-colors group/btn"
                  >
                    <span className="font-body font-medium">Learn More</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-text-muted text-lg">No programs found for this category.</p>
          </div>
        )}

      </div>
    </section>
  );
}
