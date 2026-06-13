"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { SuccessStory, Program } from "@/lib/types";
import successStoriesData from "@/data/success-stories.json";
import programsData from "@/data/programs.json";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function TestimonialCarousel() {
  const featuredStories = (successStoriesData as SuccessStory[]).filter((s) => s.featured);
  const programs = programsData as Program[];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredStories.length);
  }, [featuredStories.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredStories.length) % featuredStories.length);
  }, [featuredStories.length]);

  useEffect(() => {
    if (isHovered || featuredStories.length <= 1) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide, featuredStories.length]);

  if (featuredStories.length === 0) return null;

  const currentStory = featuredStories[currentIndex];
  const programTitle = programs.find((p) => p.id === currentStory.program)?.title || currentStory.program;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-12 md:py-24 bg-bg overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="inline-block mb-4 text-primary font-accent font-medium text-sm tracking-widest uppercase">
            REAL IMPACT
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-secondary">
            Stories That Inspire
          </h2>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-[480px] md:h-[400px] w-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    nextSlide();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prevSlide();
                  }
                }}
                className="absolute w-full px-4 md:px-16 cursor-grab active:cursor-grabbing"
              >
                <div className="flex flex-col items-center text-center">
                  <Quote className="w-12 h-12 text-primary/40 mb-6" />
                  
                  <blockquote className="font-body italic text-xl md:text-3xl text-text leading-relaxed mb-8">
                    &quot;{currentStory.quote}&quot;
                  </blockquote>
                  
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md shrink-0">
                    <Image
                      src={currentStory.image}
                      alt={currentStory.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  
                  <h3 className="font-display font-bold text-2xl text-secondary mb-1">
                    {currentStory.name}
                  </h3>
                  <p className="text-gray-500 font-medium mb-4">
                    {currentStory.location} • {programTitle}
                  </p>
                  
                  <span className="bg-secondary/10 text-secondary rounded-full font-accent text-xs font-semibold px-4 py-1.5 uppercase tracking-wider inline-block">
                    {currentStory.outcome}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {featuredStories.length > 1 && (
            <>
              {/* Prev/Next Buttons (Desktop) */}
              <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 pointer-events-none">
                <button 
                  onClick={prevSlide}
                  className="absolute -left-4 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-secondary hover:text-primary hover:scale-105 transition-all pointer-events-auto border border-gray-100"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute -right-4 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-secondary hover:text-primary hover:scale-105 transition-all pointer-events-auto border border-gray-100"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-3 mt-8 relative z-20">
                {featuredStories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentIndex 
                        ? "bg-primary w-8" 
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
