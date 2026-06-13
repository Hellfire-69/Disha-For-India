import VolunteerForm from "@/components/volunteer/VolunteerForm";
import Image from "next/image";
import { HeartHandshake, Zap, Users } from "lucide-react";

export const metadata = {
  title: "Volunteer | Disha for India",
  description: "Join our network of changemakers. Volunteer your time and skills to make a real difference.",
  openGraph: {
    title: "Volunteer | Disha for India",
    description: "Join our network of changemakers. Volunteer your time and skills to make a real difference.",
    type: "website",
  },
};

const benefits = [
  {
    icon: HeartHandshake,
    title: "Make a Real Impact",
    description: "Your time directly translates into changing lives and building stronger communities at the grassroots level."
  },
  {
    icon: Zap,
    title: "Build Your Skills",
    description: "Gain hands-on experience, develop leadership qualities, and learn how to manage community-driven projects."
  },
  {
    icon: Users,
    title: "Join a Community",
    description: "Connect with a passionate network of like-minded individuals, mentors, and social changemakers."
  }
];

export default function VolunteerPage() {
  return (
    <div className="w-full bg-bg min-h-screen">
      {/* 1. PAGE HERO */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80"
            alt="Get Involved"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-bg" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center -mt-12 md:-mt-24">
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="inline-block mb-4 text-primary font-accent font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              Get Involved
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
              Be The Change
            </h1>
            <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              Whether you have a few hours a week or want to dive deep into a long-term project, your contribution matters. Join our volunteer network today.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHY VOLUNTEER STRIP */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-32 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-primary-light rounded-3xl p-8 shadow-lg border border-primary/10 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-text mb-3">{benefit.title}</h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MULTI-STEP FORM */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <VolunteerForm />
        </div>
      </section>
    </div>
  );
}
