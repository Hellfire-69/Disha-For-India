import FilteredBlogGrid from "@/components/blog/FilteredBlogGrid";
import blogData from "@/data/blog.json";
import type { BlogPost } from "@/lib/types";
import Image from "next/image";

export const metadata = {
  title: "Blog | Disha for India",
  description: "Read our latest insights, news, and stories from the field on the Disha for India blog.",
  openGraph: {
    title: "Blog | Disha for India",
    description: "Read our latest insights, news, and stories from the field on the Disha for India blog.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = blogData as BlogPost[];

  return (
    <div className="w-full">
      {/* 1. PAGE HERO */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1600&q=80"
            alt="Blog & Insights"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-bg" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center mt-16">
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="inline-block mb-4 text-primary font-accent font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              Insights
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
              Stories & Updates
            </h1>
            <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              Discover the real-world impact of our programs through the stories of the people we serve, the challenges we face, and the milestones we celebrate.
            </p>
          </div>
        </div>
      </section>

      {/* 2. GRID (Client Component) */}
      <FilteredBlogGrid posts={posts} />
    </div>
  );
}
