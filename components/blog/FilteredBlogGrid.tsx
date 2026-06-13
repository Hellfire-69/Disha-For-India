"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/types";

interface FilteredBlogGridProps {
  posts: BlogPost[];
}

const CATEGORIES = ["All", "Education", "Health", "Environment", "Entrepreneurship", "Impact"];

export default function FilteredBlogGrid({ posts }: FilteredBlogGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const featuredPost = posts.find(p => p.featured);
  const remainingPosts = featuredPost ? posts.filter(p => p.id !== featuredPost.id) : posts;

  const filteredPosts = activeFilter === "All"
    ? remainingPosts
    : remainingPosts.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="w-full">
      {/* FEATURED POST */}
      {featuredPost && activeFilter === "All" && (
        <section className="py-12 md:py-24 bg-bg">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-text mb-8">Featured Story</h2>
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-border flex flex-col lg:flex-row group transition-shadow hover:shadow-2xl">
              
              {/* Image (60%) */}
              <div className="relative w-full lg:w-3/5 h-64 sm:h-80 lg:h-auto overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm px-4 py-1.5 rounded-full font-accent text-xs font-bold uppercase tracking-wider text-white shadow-md">
                  {featuredPost.category}
                </div>
              </div>

              {/* Content (40%) */}
              <div className="w-full lg:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm font-body text-text-muted mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime} min read
                  </div>
                </div>

                <h3 className="font-display font-bold text-3xl md:text-4xl text-text mb-4 leading-tight">
                  {featuredPost.title}
                </h3>
                <p className="font-body text-text-muted text-lg mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {featuredPost.authorImage && (
                      <Image 
                        src={featuredPost.authorImage} 
                        alt={featuredPost.author} 
                        width={40} 
                        height={40} 
                        className="rounded-full object-cover"
                      />
                    )}
                    <span className="font-body font-medium text-text">{featuredPost.author}</span>
                  </div>

                  <Link 
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg hover:bg-primary hover:text-white text-primary transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* FILTER & GRID */}
      <section className={`bg-bg pb-24 ${(!featuredPost || activeFilter !== "All") ? 'pt-24' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header & Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <h2 className="font-display font-bold text-3xl text-text">Latest Articles</h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all ${
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
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg border border-border flex flex-col group hover:shadow-xl transition-shadow"
                >
                  {/* Image */}
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-accent text-xs font-bold uppercase tracking-wider text-primary">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-xs font-body text-text-muted mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime} min read
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-xl text-text mb-3 line-clamp-2">
                      <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="font-body text-text-muted text-sm mb-6 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        {post.authorImage && (
                          <Image 
                            src={post.authorImage} 
                            alt={post.author} 
                            width={24} 
                            height={24} 
                            className="rounded-full object-cover"
                          />
                        )}
                        <span className="font-body text-xs font-medium text-text">{post.author}</span>
                      </div>

                      <Link 
                        href={`/blog/${post.id}`}
                        className="text-primary font-body text-sm font-bold flex items-center group/link hover:text-primary-dark transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-text-muted text-lg">No posts found for this category.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
