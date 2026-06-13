"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerChildren, slideUp } from "@/lib/motion";
import { MapPin, ArrowRight } from "lucide-react";
import type { Event } from "@/lib/types";
import eventsData from "@/data/events.json";

export function EventsTeaser() {
  const allEvents = eventsData as Event[];
  
  // Compute upcoming events
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingEvents = allEvents
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  if (upcomingEvents.length === 0) return null;

  return (
    <section className="py-12 md:py-24 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="inline-block mb-4 text-primary font-accent font-medium text-sm tracking-widest uppercase">
            WHAT&apos;S HAPPENING
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text-light">
            Upcoming Events
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="flex flex-col gap-6"
        >
          {upcomingEvents.map((event) => {
            const eventDate = new Date(event.date);
            const month = eventDate.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
            const day = eventDate.getUTCDate().toString().padStart(2, '0');
            
            return (
              <motion.div
                key={event.id}
                variants={slideUp}
                className="group flex flex-col md:flex-row bg-secondary-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white flex flex-col items-center justify-center rounded-xl w-16 h-16 shadow-lg">
                    <span className="font-accent font-bold text-2xl leading-none">{day}</span>
                    <span className="font-accent font-medium text-xs uppercase tracking-wider mt-1">{month}</span>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-center grow">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full font-accent text-xs font-semibold uppercase tracking-wider">
                      {event.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm font-medium">
                      <MapPin className="w-4 h-4 mr-1.5 text-primary" />
                      {event.location}, {event.state}
                    </div>
                  </div>
                  
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="mt-auto flex justify-start">
                    <Link
                      href={event.registrationUrl || `/events/${event.id}`}
                      className="inline-flex items-center text-primary font-semibold hover:text-white transition-colors"
                    >
                      Register Now <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-16 text-center">
          <Link
            href="/events"
            className="inline-flex items-center justify-center border-2 border-white/20 text-white rounded-full px-8 py-4 font-semibold hover:bg-white/10 transition-all text-lg"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
