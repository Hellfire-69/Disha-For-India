export default function BlogLoadingSkeleton() {
  return (
    <div className="w-full bg-white animate-pulse">
      {/* 1. HERO SKELETON */}
      <section className="w-full h-[60vh] min-h-[500px] bg-bg-dark/20 flex items-end pb-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex flex-col items-center">
          <div className="w-32 h-4 bg-white/20 rounded mb-8" /> {/* Back link */}
          <div className="w-24 h-6 bg-white/30 rounded-full mb-6" /> {/* Category badge */}
          
          <div className="w-full max-w-2xl h-12 md:h-16 bg-white/30 rounded-2xl mb-4" /> {/* Title line 1 */}
          <div className="w-3/4 max-w-xl h-12 md:h-16 bg-white/30 rounded-2xl mb-8" /> {/* Title line 2 */}

          <div className="flex gap-6 mt-4">
            <div className="w-24 h-4 bg-white/20 rounded" />
            <div className="w-24 h-4 bg-white/20 rounded" />
            <div className="w-24 h-4 bg-white/20 rounded" />
          </div>
        </div>
      </section>

      {/* 2. ARTICLE CONTENT SKELETON */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-6">
          <div className="w-full h-6 bg-border/60 rounded" />
          <div className="w-11/12 h-6 bg-border/60 rounded" />
          <div className="w-full h-6 bg-border/60 rounded" />
          <div className="w-4/5 h-6 bg-border/60 rounded mb-8" />

          <div className="w-full h-64 bg-border/60 rounded-3xl mb-8" /> {/* Image placeholder */}

          <div className="w-full h-6 bg-border/60 rounded" />
          <div className="w-full h-6 bg-border/60 rounded" />
          <div className="w-10/12 h-6 bg-border/60 rounded" />
        </div>
      </section>
    </div>
  );
}
