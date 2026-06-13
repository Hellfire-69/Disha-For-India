import FilteredProgramGrid from "@/components/programs/FilteredProgramGrid";
import programsData from "@/data/programs.json";
import type { Program } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export const metadata = {
  title: "Programs | Disha for India",
  description: "Explore our comprehensive range of programs in education, health, entrepreneurship, and environment.",
  openGraph: {
    title: "Programs | Disha for India",
    description: "Explore our comprehensive range of programs in education, health, entrepreneurship, and environment.",
    type: "website",
  },
};

export default function ProgramsPage() {
  const programs = programsData as Program[];

  return (
    <div className="w-full">
      {/* 1. PAGE HERO */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=1600&q=80"
            alt="Programs That Transform Lives"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bg" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center mt-16">
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="inline-block mb-4 text-primary font-accent font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              What We Do
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
              Programs That Transform Lives
            </h1>
            <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              From equipping rural youth with entrepreneurial skills to delivering essential healthcare, our programs are localized, sustainable, and impact-driven.
            </p>
          </div>
        </div>
      </section>

      {/* 1.5 FINDER BANNER */}
      <section className="py-12 bg-bg relative z-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-secondary-light rounded-3xl p-8 md:p-10 border border-secondary/20 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-secondary/10">
                <Compass className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-secondary-dark mb-2">Not sure where to start?</h2>
                <p className="font-body text-secondary-dark/80 text-lg">Take our quick 4-question quiz and we&apos;ll match you with the perfect grassroots initiative.</p>
              </div>
            </div>
            <Link 
              href="/program-finder"
              className="w-full md:w-auto shrink-0 bg-secondary text-white font-body font-bold text-lg px-8 py-4 rounded-3xl hover:bg-secondary-dark hover:scale-[1.02] transition-all flex items-center justify-center shadow-lg"
            >
              Take the Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FILTER + GRID (Client Component) */}
      <FilteredProgramGrid programs={programs} />
    </div>
  );
}
