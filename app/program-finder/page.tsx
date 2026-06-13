import Image from "next/image";
import ProgramQuiz from "@/components/features/ProgramQuiz";
import programsData from "@/data/programs.json";
import type { Program } from "@/lib/types";

export const metadata = {
  title: "Program Finder | Disha for India",
  description: "Take our quick quiz to find the perfect grassroots program tailored to your needs.",
  openGraph: {
    title: "Program Finder | Disha for India",
    description: "Take our quick quiz to find the perfect grassroots program tailored to your needs.",
    type: "website",
  },
};

export default function ProgramFinderPage() {
  const programs = programsData as Program[];

  return (
    <div className="w-full bg-bg min-h-screen">
      
      {/* 1. PAGE HERO */}
      <section className="relative w-full h-[40vh] min-h-[350px] md:h-[50vh] md:min-h-[450px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&q=80"
            alt="Find Your Path"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-bg" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center mt-12 md:mt-24">
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="inline-block mb-4 text-primary font-accent font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              Find Your Path
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
              Which Disha Program Is Right For You?
            </h1>
            <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              Answer 4 quick questions and we&apos;ll match you to the perfect program.
            </p>
          </div>
        </div>
      </section>

      {/* 2. QUIZ COMPONENT */}
      <section className="relative z-20 -mt-16 md:-mt-24 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white rounded-[2rem] shadow-xl border border-border min-h-[600px] overflow-hidden">
             <ProgramQuiz programs={programs} />
          </div>
        </div>
      </section>

    </div>
  );
}
