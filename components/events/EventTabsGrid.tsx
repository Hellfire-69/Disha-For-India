"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { Event } from "@/lib/types";

interface EventTabsGridProps {
  events: Event[];
}

export default function EventTabsGrid({ events }: EventTabsGridProps) {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");

  const currentDate = new Date();
  
  const upcomingEvents = events.filter(e => new Date(e.date) > currentDate);
  const pastEvents = events.filter(e => new Date(e.date) <= currentDate);

  const displayedEvents = activeTab === "Upcoming" ? upcomingEvents : pastEvents;

  return (
    <section className="py-12 md:py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-white border border-border p-1 rounded-full inline-flex shadow-sm">
            <button
              onClick={() => setActiveTab("Upcoming")}
              className={`px-8 py-3 rounded-full font-body text-sm font-bold transition-all ${
                activeTab === "Upcoming"
                  ? "bg-primary text-white shadow-md"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab("Past")}
              className={`px-8 py-3 rounded-full font-body text-sm font-bold transition-all ${
                activeTab === "Past"
                  ? "bg-primary text-white shadow-md"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedEvents.map((event) => {
              const capacityPercent = Math.min(100, Math.round((event.registered || 0) / (event.capacity || 1) * 100));
              const isPast = activeTab === "Past";
              
              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-3xl overflow-hidden shadow-lg border border-border flex flex-col group ${isPast ? 'opacity-80 grayscale-[30%]' : 'hover:shadow-xl transition-shadow'}`}
                >
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover ${!isPast && 'group-hover:scale-105 transition-transform duration-700'}`}
                    />
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl text-center shadow-md">
                      <div className="font-accent font-bold text-primary text-sm uppercase">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="font-display font-bold text-text text-2xl leading-none mt-1">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                    {/* Category Tag */}
                    <div className="absolute top-4 right-4 bg-bg-dark/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="font-accent text-xs font-bold uppercase tracking-wider text-white">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-display font-bold text-2xl text-text mb-3">
                      {event.title}
                    </h3>
                    
                    <div className="flex flex-col gap-2 mb-6">
                      <div className="flex items-center text-text-muted font-body text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        {event.location}, {event.state}
                      </div>
                      <div className="flex items-center text-text-muted font-body text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {event.time}
                      </div>
                    </div>

                    {!isPast && event.capacity && (
                      <div className="mb-8">
                        <div className="flex justify-between text-xs font-body text-text-muted mb-2">
                          <span className="font-medium">Registration Capacity</span>
                          <span>{event.registered} / {event.capacity} filled</span>
                        </div>
                        <div className="w-full bg-bg h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${capacityPercent >= 90 ? 'bg-red-500' : 'bg-primary'}`}
                            style={{ width: `${capacityPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-4">
                      <Link 
                        href={`/events/${event.id}`}
                        className={`flex items-center justify-center w-full py-3 px-6 rounded-xl font-body font-bold transition-all group/btn ${
                          isPast 
                            ? "bg-bg text-text hover:bg-gray-200" 
                            : "bg-primary text-white hover:bg-primary-dark"
                        }`}
                      >
                        {isPast ? "View Recap" : "Register Now"}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {displayedEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-text-muted text-lg">No events found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
}
