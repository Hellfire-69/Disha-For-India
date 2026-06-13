export default function ProgramLoadingSkeleton() {
  return (
    <div className="w-full bg-bg animate-pulse">
      {/* 1. HERO SKELETON */}
      <section className="w-full h-[60vh] min-h-[500px] bg-bg-dark/20 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex flex-col items-center">
          <div className="w-24 h-6 bg-white/30 rounded-full mb-6" /> {/* Category badge */}
          
          <div className="w-full max-w-2xl h-12 md:h-16 bg-white/30 rounded-2xl mb-6" /> {/* Title */}
          <div className="w-3/4 max-w-xl h-6 bg-white/20 rounded-xl mb-8" /> {/* Subtitle */}

          <div className="flex gap-4">
            <div className="w-32 h-10 bg-white/20 rounded-full" />
            <div className="w-32 h-10 bg-white/20 rounded-full" />
          </div>
        </div>
      </section>

      {/* 2. CONTENT SKELETON */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-4">
                <div className="w-48 h-8 bg-border/80 rounded mb-6" />
                <div className="w-full h-5 bg-border/50 rounded" />
                <div className="w-full h-5 bg-border/50 rounded" />
                <div className="w-11/12 h-5 bg-border/50 rounded" />
              </div>

              {/* Grid Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="h-32 bg-border/30 rounded-3xl" />
                <div className="h-32 bg-border/30 rounded-3xl" />
                <div className="h-32 bg-border/30 rounded-3xl" />
                <div className="h-32 bg-border/30 rounded-3xl" />
              </div>
            </div>

            {/* Right Column (CTA Card Skeleton) */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-8">
                <div className="w-full h-[300px] bg-border/40 rounded-3xl" />
                
                <div className="w-full h-64 bg-primary/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-4">
                  <div className="w-3/4 h-8 bg-primary/20 rounded" />
                  <div className="w-full h-4 bg-primary/10 rounded" />
                  <div className="w-full h-14 bg-primary/30 rounded-full mt-4" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
