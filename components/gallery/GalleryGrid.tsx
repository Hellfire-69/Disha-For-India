"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/lib/types";
import { scaleIn } from "@/lib/motion";

interface GalleryGridProps {
  images: GalleryImage[];
}

const CATEGORIES = ["All", "Events", "Programs", "Volunteers", "Community"];

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [mounted, setMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Hydration fix for portals
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const filteredImages = activeFilter === "All"
    ? images
    : images.filter((img) => img.category.toLowerCase() === activeFilter.toLowerCase());

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft" && lightboxIndex > 0) setLightboxIndex(prev => prev! - 1);
      if (e.key === "ArrowRight" && lightboxIndex < filteredImages.length - 1) setLightboxIndex(prev => prev! + 1);
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex, filteredImages.length]);

  return (
    <section className="py-12 md:py-24 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setLightboxIndex(null); // reset lightbox on filter change
                }}
                className={`px-6 py-2.5 rounded-full font-body text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md scale-105"
                    : "bg-white text-text-muted border border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Native CSS Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={scaleIn}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative break-inside-avoid group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
                onClick={() => setLightboxIndex(index)}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-4 py-1.5 bg-primary rounded-full font-accent text-xs font-bold uppercase tracking-wider text-white mb-2">
                      {image.category}
                    </span>
                    <p className="font-display font-medium text-white px-4 text-sm md:text-base">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="font-body text-text-muted text-lg">No images found for this category.</p>
          </div>
        )}

      </div>

      {/* Lightbox Portal */}
      {mounted && lightboxIndex !== null && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev Button */}
            <button
              onClick={() => lightboxIndex > 0 && setLightboxIndex(lightboxIndex - 1)}
              disabled={lightboxIndex === 0}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-50"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Main Image Container */}
            <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-16 md:mx-24 px-4 flex flex-col items-center justify-center">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={filteredImages[lightboxIndex].url}
                  alt={filteredImages[lightboxIndex].alt}
                  width={filteredImages[lightboxIndex].width}
                  height={filteredImages[lightboxIndex].height}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                  quality={100}
                />
              </motion.div>
              
              {/* Caption */}
              <div className="absolute bottom-0 translate-y-16 text-center w-full">
                <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/30 rounded-full font-accent text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  {filteredImages[lightboxIndex].category}
                </span>
                <p className="font-body text-white/90 text-lg">
                  {filteredImages[lightboxIndex].alt}
                </p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => lightboxIndex < filteredImages.length - 1 && setLightboxIndex(lightboxIndex + 1)}
              disabled={lightboxIndex === filteredImages.length - 1}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-50"
              aria-label="Next Image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
