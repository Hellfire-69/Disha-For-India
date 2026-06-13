import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import blogData from "@/data/blog.json";
import type { BlogPost } from "@/lib/types";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  const posts = blogData as BlogPost[];
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = (blogData as BlogPost[]).find((p) => p.id === resolvedParams.id);
  
  if (!post) {
    return {
      title: "Post Not Found | Disha for India",
    };
  }

  return {
    title: `${post.title} | Disha for India`,
    description: post.content.substring(0, 160) + "...",
    openGraph: {
      title: `${post.title} | Disha for India`,
      description: post.content.substring(0, 160) + "...",
      images: [post.image],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await params before accessing (Next.js 15 Requirement)
  const resolvedParams = await params;
  const postId = resolvedParams.id;

  // 2. Fetch post data
  const post = (blogData as BlogPost[]).find((p) => p.id === postId);

  if (!post) {
    notFound();
  }

  // 3. Select related posts natively on server
  const allPosts = blogData as BlogPost[];
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="w-full bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-white/70 hover:text-primary transition-colors mb-8 font-body text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Articles
          </Link>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-xs font-accent font-bold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-8 drop-shadow-md leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 font-body text-sm">
            <div className="flex items-center gap-3">
              {post.authorImage && (
                <Image 
                  src={post.authorImage} 
                  alt={post.author} 
                  width={32} 
                  height={32} 
                  className="rounded-full object-cover"
                />
              )}
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE CONTENT */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="prose prose-lg prose-orange md:prose-xl max-w-none font-body text-text-muted prose-headings:font-display prose-headings:text-text prose-a:text-primary hover:prose-a:text-primary-dark prose-img:rounded-3xl prose-img:shadow-md">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-bg text-text-muted rounded-full text-sm font-body font-medium">
                #{tag}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* 3. RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-bg border-t border-border">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display font-bold text-3xl text-text">More on {post.category}</h2>
              <Link href="/blog" className="text-primary hover:text-primary-dark font-body font-medium flex items-center gap-2">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-border group">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs font-body text-text-muted mb-3">
                      <span>{new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{relatedPost.readTime} min read</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-text mb-2 line-clamp-2">
                      <Link href={`/blog/${relatedPost.id}`} className="hover:text-primary transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
