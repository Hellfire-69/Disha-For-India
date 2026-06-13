"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerChildren, slideUp } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Quote, ArrowRight, MapPin } from "lucide-react";
import successStoriesData from "@/data/success-stories.json";




// Infer type from the JSON

export default function SuccessStoriesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const featuredStory = successStoriesData.find((story) => story.featured) || successStoriesData[0];
  
  // Extract unique programs for the filter
  const programs = ["All", ...Array.from(new Set(successStoriesData.map((story) => story.program)))];

  const filteredStories = activeFilter === "All" 
    ? successStoriesData 
    : successStoriesData.filter((story) => story.program === activeFilter);

  // Format program names nicely (e.g. "entrepreneurship-bootcamp" -> "Entrepreneurship Bootcamp")
  const formatProgramName = (slug: string) => {
    if (slug === "All") return "All Stories";
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <div className="w-full">
      
      {/* 1. PAGE HERO */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-bg-dark">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&q=80"
            alt="Lives Changed by Disha"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/80 via-bg-dark/60 to-bg-dark" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center mt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="flex flex-col items-center"
          >
            <motion.span variants={slideUp} className="inline-block mb-4 text-primary font-accent font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              Real Impact
            </motion.span>
            <motion.h1 variants={slideUp} className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
              Lives Changed by Disha
            </motion.h1>
            <motion.p variants={slideUp} className="font-body text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Behind every metric is a human story. Read how our programs are empowering individuals to transform their lives and communities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED STORY */}
      <section className="py-12 md:py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="bg-bg-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto">
              <Image
                src={featuredStory.image}
                alt={featuredStory.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent lg:bg-gradient-to-r" />
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10">
                <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-xs font-accent font-bold uppercase tracking-wider rounded-full mb-3">
                  Featured Story
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">{featuredStory.name}</h2>
                <div className="flex items-center text-white/70 font-body text-sm">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {featuredStory.location}
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              <Quote className="absolute top-8 right-8 w-16 h-16 text-white/5" />
              
              <blockquote className="font-display text-2xl md:text-3xl text-white leading-relaxed mb-8 relative z-10 italic">&quot;{featuredStory.quote}&quot;</blockquote>
              
              <p className="font-body text-white/70 text-lg leading-relaxed mb-8">
                {featuredStory.story}
              </p>

              <div className="mt-auto">
                <p className="font-accent text-primary font-bold text-sm uppercase tracking-widest mb-2">The Outcome</p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 inline-block">
                  <p className="font-body font-medium text-white">{featuredStory.outcome}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. STORIES GRID */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-2">More Impact Stories</h2>
              <p className="font-body text-text-muted text-lg">Explore transformation across our different initiatives.</p>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {programs.map((prog) => (
                <button
                  key={prog}
                  onClick={() => setActiveFilter(prog)}
                  className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
                    activeFilter === prog
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-bg text-text-muted hover:bg-bg-dark hover:text-white"
                  }`}
                >
                  {formatProgramName(prog)}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredStories.map((story) => (
                <motion.div
                  key={story.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-bg rounded-3xl p-8 border border-border flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-transparent group-hover:border-primary transition-colors">
                      <Image
                        src={story.image}
                        alt={story.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-text">{story.name}</h3>
                      <div className="flex items-center text-text-muted font-body text-xs mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {story.location}
                      </div>
                    </div>
                  </div>

                  <span className="inline-block px-3 py-1 bg-white text-primary text-xs font-accent font-bold uppercase tracking-wider rounded-full mb-4 self-start border border-primary/10">
                    {formatProgramName(story.program)}
                  </span>

                  <p className="font-body text-text-muted italic mb-6 flex-grow line-clamp-3">&quot;{story.quote}&quot;</p>

                  <div className="bg-primary-light/50 rounded-2xl p-4 mb-6">
                    <p className="font-body text-sm font-semibold text-text-dark">
                      <span className="text-primary font-bold mr-2">Outcome:</span>
                      {story.outcome}
                    </p>
                  </div>

                  <Button variant="ghost" className="w-full justify-between mt-auto group/btn text-primary hover:text-primary-dark hover:bg-primary/5 rounded-2xl">
                    Read Full Story
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 4. SUBMIT YOUR STORY CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            <motion.h2 variants={slideUp} className="font-display font-bold text-3xl md:text-5xl text-white mb-6">
              Were You Impacted by Disha?
            </motion.h2>
            <motion.p variants={slideUp} className="font-body text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Your story has the power to inspire others. Whether you attended a workshop, received a scholarship, or volunteered with us—we want to hear from you.
            </motion.p>
            <motion.div variants={slideUp}>
              <Button size="lg" variant="secondary" className="rounded-3xl px-8 shadow-xl" render={<Link href="/contact" />}>
                Share Your Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
