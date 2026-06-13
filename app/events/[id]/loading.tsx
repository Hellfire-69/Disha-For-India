export default function EventLoadingSkeleton() {
  return (
    <div className="w-full bg-bg animate-pulse">
      {/* 1. HERO SKELETON */}
      <section className="w-full h-[50vh] min-h-[400px] bg-bg-dark/20 flex items-end pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex flex-col items-start">
          <div className="w-32 h-4 bg-white/20 rounded mb-6" /> {/* Back link */}
          <div className="w-24 h-6 bg-white/30 rounded-full mb-4" /> {/* Category badge */}
          
          <div className="w-3/4 max-w-2xl h-12 md:h-16 bg-white/30 rounded-2xl mb-6" /> {/* Title */}

          <div className="flex gap-6 mt-4">
            <div className="w-32 h-5 bg-white/20 rounded" />
            <div className="w-24 h-5 bg-white/20 rounded" />
            <div className="w-48 h-5 bg-white/20 rounded" />
          </div>
        </div>
      </section>

      {/* 2. CONTENT SKELETON */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column */}
            <div className="space-y-8">
              <div className="w-48 h-8 bg-border/80 rounded mb-6" /> {/* Heading */}
              
              <div className="space-y-4">
                <div className="w-full h-5 bg-border/50 rounded" />
                <div className="w-full h-5 bg-border/50 rounded" />
                <div className="w-11/12 h-5 bg-border/50 rounded" />
                <div className="w-10/12 h-5 bg-border/50 rounded" />
              </div>

              {/* Stats Block */}
              <div className="w-full h-24 bg-border/30 rounded-3xl mt-8" />
            </div>

            {/* Right Column (Form Skeleton) */}
            <div>
              <div className="w-full h-[400px] bg-white rounded-3xl border border-border shadow-sm p-8 flex flex-col gap-6">
                <div className="w-1/2 h-8 bg-border/80 rounded mb-4" />
                <div className="w-full h-12 bg-bg rounded-xl" />
                <div className="w-full h-12 bg-bg rounded-xl" />
                <div className="w-full h-12 bg-bg rounded-xl" />
                <div className="w-full h-14 bg-primary/20 rounded-full mt-4" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
