import EventTabsGrid from "@/components/events/EventTabsGrid";
import eventsData from "@/data/events.json";
import type { Event } from "@/lib/types";
import Image from "next/image";

export const metadata = {
  title: "Events | Disha for India",
  description: "Join our upcoming events, workshops, and community gatherings across India.",
  openGraph: {
    title: "Events | Disha for India",
    description: "Join our upcoming events, workshops, and community gatherings across India.",
    type: "website",
  },
};

export default function EventsPage() {
  const events = eventsData as Event[];

  return (
    <div className="w-full">
      {/* 1. PAGE HERO */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80"
            alt="Events & Programs"
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
              What&apos;s Happening
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
              Events & Programs
            </h1>
            <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              Join us on the ground. From educational bootcamps to community health drives, find out where we are making an impact next.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TABS & GRID (Client Component) */}
      <EventTabsGrid events={events} />
    </div>
  );
}
