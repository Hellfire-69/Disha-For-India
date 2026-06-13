import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="max-w-2xl text-center relative z-10 flex flex-col items-center">
        <h1 className="font-display font-bold text-[150px] md:text-[200px] leading-none text-white opacity-20 select-none">
          404
        </h1>
        
        <div className="transform -translate-y-12 md:-translate-y-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6">
            Page Not Found
          </h2>
          <p className="font-body text-white/70 text-lg md:text-xl mb-10 max-w-lg mx-auto">
            The impact you are looking for seems to have moved or doesn&apos;t exist yet. Let&apos;s get you back on the right path.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center bg-primary text-white font-body font-bold text-lg px-8 py-4 rounded-3xl hover:bg-primary-dark hover:scale-[1.02] transition-all shadow-xl border border-primary/20"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
