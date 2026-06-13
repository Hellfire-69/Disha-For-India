import { Hero } from "@/components/home/Hero";
import { ImpactCounter } from "@/components/home/ImpactCounter";
import { ProgramsPreview } from "@/components/home/ProgramsPreview";
import { EventsTeaser } from "@/components/home/EventsTeaser";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import { NationalImpactTeaser } from "@/components/home/NationalImpactTeaser";

export const metadata = {
  title: "Disha for India",
  description: "Disha for India empowers communities through education, healthcare, and sustainable livelihood programs.",
  openGraph: {
    title: "Disha for India",
    description: "Disha for India empowers communities through education, healthcare, and sustainable livelihood programs.",
    type: "website",
  },
};


export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <ImpactCounter />
      <NationalImpactTeaser />
      <ProgramsPreview />
      <EventsTeaser />
      <TestimonialCarousel />
      <NewsletterBanner />
    </div>
  );
}
