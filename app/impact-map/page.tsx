import Image from "next/image";
import IndiaMap from "@/components/features/IndiaMap";
import mapData from "@/data/map-data.json";

export const metadata = {
  title: "Impact Map | Disha for India",
  description: "Explore our interactive impact map showcasing active programs and success stories across Indian states.",
  openGraph: {
    title: "Impact Map | Disha for India",
    description: "Explore our interactive impact map showcasing active programs and success stories across Indian states.",
    type: "website",
  },
};

export default function ImpactMapPage() {
  // Compute national totals from JSON
  const totalStates = mapData.length;
  const totalBeneficiaries = mapData.reduce((acc, state) => acc + state.beneficiaries, 0);
  const totalVolunteers = mapData.reduce((acc, state) => acc + state.volunteers, 0);
  const totalProgramsRunning = mapData.reduce((acc, state) => acc + state.programsRunning, 0);

  return (
    <div className="w-full bg-white min-h-screen">
      
      {/* 1. PAGE HERO */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80"
            alt="Disha Across India"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-bg" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center mt-12 md:mt-24">
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="inline-block mb-4 text-primary font-accent font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              Our Reach
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
              Disha Across India
            </h1>
            <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              Click any state to explore our localized grassroots impact and active programs.
            </p>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE MAP SECTION */}
      <section className="relative z-20 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <IndiaMap data={mapData} />
        </div>
      </section>

      {/* 3. NATIONAL STATS STRIP */}
      <section className="py-16 md:py-24 bg-primary-light border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">National Impact Overview</h2>
            <p className="font-body text-text-muted text-lg max-w-2xl mx-auto">
              Together, our network of volunteers and partners is driving measurable change across the nation.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-border">
              <p className="font-display font-bold text-5xl text-primary mb-2">{totalStates}</p>
              <p className="font-body font-semibold text-text uppercase tracking-wider text-sm">Active States</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-border">
              <p className="font-display font-bold text-5xl text-primary mb-2">{(totalBeneficiaries / 1000).toFixed(0)}k+</p>
              <p className="font-body font-semibold text-text uppercase tracking-wider text-sm">Lives Impacted</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-border">
              <p className="font-display font-bold text-5xl text-primary mb-2">{totalVolunteers.toLocaleString()}</p>
              <p className="font-body font-semibold text-text uppercase tracking-wider text-sm">Volunteers</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-border">
              <p className="font-display font-bold text-5xl text-primary mb-2">{totalProgramsRunning}</p>
              <p className="font-body font-semibold text-text uppercase tracking-wider text-sm">Local Programs</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
