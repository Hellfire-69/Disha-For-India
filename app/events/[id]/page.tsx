import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import eventsData from "@/data/events.json";
import type { Event } from "@/lib/types";
import { ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react";
import EventRegistrationForm from "@/components/events/EventRegistrationForm";

export async function generateStaticParams() {
  const events = eventsData as Event[];
  return events.map((event) => ({
    id: event.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = (eventsData as Event[]).find((e) => e.id === resolvedParams.id);
  
  if (!event) {
    return {
      title: "Event Not Found | Disha for India",
    };
  }

  return {
    title: `${event.title} | Disha for India`,
    description: event.description,
    openGraph: {
      title: `${event.title} | Disha for India`,
      description: event.description,
      images: [event.image],
      type: "website",
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await params before accessing (Next.js 15 Requirement)
  const resolvedParams = await params;
  const eventId = resolvedParams.id;

  // 2. Fetch event data
  const event = (eventsData as Event[]).find((e) => e.id === eventId);

  if (!event) {
    notFound();
  }

  const isPast = new Date(event.date) <= new Date();

  return (
    <div className="w-full bg-bg">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-end pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-bg-dark/30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Link 
            href="/events" 
            className="inline-flex items-center text-white/70 hover:text-primary transition-colors mb-6 font-body text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-xs font-accent font-bold uppercase tracking-wider rounded-full">
              {event.category}
            </span>
            {isPast && (
              <span className="inline-block px-4 py-1.5 bg-gray-500/50 backdrop-blur-md border border-gray-400/50 text-white text-xs font-accent font-bold uppercase tracking-wider rounded-full">
                Past Event
              </span>
            )}
          </div>
          
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-md">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/90 font-body">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {event.time}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {event.location}, {event.state}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTENT & REGISTRATION FORM */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column: Event Details */}
            <div className="space-y-12">
              <div>
                <h2 className="font-display font-bold text-3xl text-text mb-6">About the Event</h2>
                <div className="prose prose-lg prose-p:font-body prose-p:text-text-muted max-w-none">
                  <p className="text-xl font-medium text-text">{event.description}</p>
                  <p className="mt-4">
                    Join us for an impactful session dedicated to community empowerment. 
                    This event is tailored for individuals eager to make a difference and learn actionable strategies to drive change in their local areas. 
                    Expect an interactive environment, expert speakers, and networking opportunities with like-minded peers.
                  </p>
                </div>
              </div>

              {/* Quick Stats Sidebar (Mobile) / Block (Desktop) */}
              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col sm:flex-row gap-8 justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted font-body">Capacity</div>
                    <div className="font-bold text-text font-display text-xl">{event.capacity} Attendees</div>
                  </div>
                </div>
                {!isPast && event.capacity && (
                  <div className="flex-grow max-w-xs">
                    <div className="flex justify-between text-sm font-body text-text-muted mb-2">
                      <span>Spots Filled</span>
                      <span>{event.registered} / {event.capacity}</span>
                    </div>
                    <div className="w-full bg-bg h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.min(100, Math.round((event.registered || 0) / (event.capacity || 1) * 100))}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Registration Form or Past Event Notice */}
            <div>
              {isPast ? (
                <div className="bg-bg-dark rounded-3xl p-12 text-center shadow-xl border border-border sticky top-8 text-white">
                  <h3 className="font-display font-bold text-3xl mb-4">Event Concluded</h3>
                  <p className="font-body text-white/80 text-lg mb-8">
                    This event has already taken place. Thank you to everyone who participated and made it a success!
                  </p>
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full">
                    <Calendar className="w-10 h-10 text-white/50" />
                  </div>
                </div>
              ) : (
                <div className="sticky top-8">
                  <EventRegistrationForm eventId={event.id} eventTitle={event.title} />
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
