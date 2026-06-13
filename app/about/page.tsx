"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideUp, staggerChildren } from "@/lib/motion";
import teamData from "@/data/team.json";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { TeamMember } from "@/lib/types";



const timeline = [
  {
    year: "Ignite",
    title: "Transforming Education",
    description: "Igniting the fire among academicians to transform education, helping students build a strong foundational future.",
  },
  {
    year: "Wellness",
    title: "Preventive Healthcare",
    description: "Providing emotional wellness and preventive healthcare to build a self-aware, healthy, and happy society.",
  },
  {
    year: "Finance",
    title: "Financial Literacy",
    description: "Equipping communities with essential financial knowledge to foster economic independence and wealthy lives.",
  },
  {
    year: "Startup",
    title: "Entrepreneurship",
    description: "Skilling over 5 lakh youth to be employable and coaching them to become successful entrepreneurs.",
  },
  {
    year: "Green",
    title: "Clean and Green India",
    description: "Driving environmental initiatives and grassroots campaigns for a sustainable, cleaner India.",
  },
];

const partners = [
  "Global Tech Foundation",
  "EduCare Initiative",
  "HealthFirst India",
  "Green Earth Trust",
  "Apex Corporate CSR",
];

const departments = ["All", "Leadership", "Programs", "Operations", "Outreach"];

export default function AboutPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const team = teamData as TeamMember[];
  const featuredTeam = team.filter((member) => member.featured);
  
  const filteredTeam = activeFilter === "All" 
    ? featuredTeam 
    : featuredTeam.filter((m) => m.department.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="w-full">
      {/* 1. PAGE HERO */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&q=80"
            alt="Disha for India Community"
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
              Who We Are
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
              The Story Behind Disha
            </h1>
            <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              We empower and make the difference. Our vision is to improve employability and skill quotient to develop a self-aware Healthy, Happy, and Wealthy Society.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. STORY SECTION */}
      <section className="py-12 md:py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
              className="flex flex-col items-start"
            >
              <motion.h2 variants={slideUp} className="font-display font-bold text-3xl md:text-4xl text-text mb-6">
                Vision & Mission
              </motion.h2>
              <div className="font-body text-text-muted space-y-6 text-lg leading-relaxed">
                <motion.p variants={slideUp}>
                  Disha for India Foundation and Educational Trust is driven by a profound mission: to skill over 5 lakh youth, making them employable, and coaching them to become entrepreneurs.
                </motion.p>
                <motion.p variants={slideUp}>
                  Founded by Indu Aggarwal, who said goodbye to a lucrative corporate career to pursue her passion, Disha operates as a leading light touching the lives of people through Training and Health awareness programs.
                </motion.p>
                <motion.p variants={slideUp}>
                  Our passion is to live by our thoughts and values every day, and to ignite a spark in people to live a Beautiful Life. We aim for a Pan-India presence in the next 5 years, touching and transforming maximum lives.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80"
                alt="Children learning together"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE SECTION */}
      <section className="py-12 md:py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">Our Core Pillars</h2>
            <p className="font-body text-text-muted text-lg">The 5 programmatic areas that define our impact.</p>
          </div>

          <div className="relative border-l-2 border-primary/20 md:border-l-0 md:flex md:flex-col items-center">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-primary/20" />

            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={slideUp}
                  className="relative pl-8 md:pl-0 mb-12 w-full md:w-[800px] flex justify-between items-center group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-primary rounded-full ring-4 ring-primary-light z-10 group-hover:scale-125 transition-transform" />

                  {/* Desktop Layout: Left/Right Alternating */}
                  <div className={`hidden md:block w-[45%] ${isEven ? 'text-right pr-8' : 'text-left pl-8 order-last'}`}>
                    <span className="inline-block font-accent font-bold text-primary text-xl mb-2">{item.year}</span>
                    <h3 className="font-display font-bold text-2xl text-text mb-3">{item.title}</h3>
                    <p className="font-body text-text-muted leading-relaxed">{item.description}</p>
                  </div>
                  
                  {/* Desktop Layout: Empty Space */}
                  <div className={`hidden md:block w-[45%] ${isEven ? 'order-last' : ''}`} />

                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <span className="inline-block font-accent font-bold text-primary text-lg mb-1">{item.year}</span>
                    <h3 className="font-display font-bold text-xl text-text mb-2">{item.title}</h3>
                    <p className="font-body text-text-muted text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3.5 IMPACT MAP BANNER */}
      <section className="py-16 md:py-24 bg-bg relative z-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="bg-secondary-light rounded-3xl p-10 md:p-16 border border-secondary/20 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-secondary" />
            <h2 className="font-display font-bold text-3xl md:text-4xl text-secondary-dark mb-4">Our Growing Nationwide Reach</h2>
            <p className="font-body text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              We are rapidly expanding our grassroots footprint. Explore our interactive map to see active programs and our growing volunteer network across Indian states.
            </p>
            <Link 
              href="/impact-map"
              className="inline-flex items-center justify-center bg-secondary text-white font-body font-bold text-lg px-10 py-4 rounded-3xl hover:bg-secondary-dark hover:scale-[1.02] transition-all shadow-lg"
            >
              Explore Impact Map
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TEAM GRID */}
      <section id="team" className="py-12 md:py-24 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12 flex flex-col items-center">
            <span className="inline-block mb-4 text-primary font-accent font-medium text-sm tracking-widest uppercase">
              Our Team
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-8">
              The People Driving Change
            </h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveFilter(dept)}
                  className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all ${
                    activeFilter === dept
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTeam.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center group hover:bg-white/10 transition-colors"
                >
                  <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-transparent group-hover:border-primary/30 transition-colors">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <span className="inline-block px-3 py-1 bg-white/10 text-gray-300 text-xs font-accent font-medium rounded-full mb-3 uppercase tracking-wider">
                    {member.department}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mb-1">{member.name}</h3>
                  <p className="font-body text-primary text-sm font-medium mb-4">{member.role}</p>
                  
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noreferrer"
                      className="mt-auto w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 5. PARTNERS STRIP */}
      <section className="py-12 md:py-20 bg-bg border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="font-display font-semibold text-xl text-text-muted mb-10">Supported By</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {partners.map((partner) => (
              <div 
                key={partner}
                className="font-display font-bold text-xl md:text-2xl tracking-tight text-text/80 hover:text-primary transition-colors cursor-default"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
