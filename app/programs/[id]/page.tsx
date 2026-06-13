import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import programsData from "@/data/programs.json";
import type { Program } from "@/lib/types";
import { Users, CheckCircle2, Clock, ArrowLeft, } from "lucide-react";

export async function generateStaticParams() {
  const programs = programsData as Program[];
  return programs.map((program) => ({
    id: program.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const program = (programsData as Program[]).find((p) => p.id === resolvedParams.id);
  
  if (!program) {
    return {
      title: "Program Not Found | Disha for India",
    };
  }

  return {
    title: `${program.title} | Disha for India`,
    description: program.description,
    openGraph: {
      title: `${program.title} | Disha for India`,
      description: program.description,
      images: [program.image],
      type: "website",
    },
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await params before accessing (Next.js 15 Requirement)
  const resolvedParams = await params;
  const programId = resolvedParams.id;

  // 2. Fetch program data
  const program = (programsData as Program[]).find((p) => p.id === programId);

  if (!program) {
    notFound();
  }

  return (
    <div className="w-full bg-bg">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-end pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={program.image}
            alt={program.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/70 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Link 
            href="/programs" 
            className="inline-flex items-center text-white/70 hover:text-primary transition-colors mb-6 font-body text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-xs font-accent font-bold uppercase tracking-wider rounded-full">
              {program.category.replace("-", " ")}
            </span>
            {program.featured && (
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-accent font-bold uppercase tracking-wider rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-4 drop-shadow-md">
            {program.title}
          </h1>
          <p className="font-body text-white/90 text-xl max-w-3xl drop-shadow-sm">
            {program.tagline}
          </p>
        </div>
      </section>

      {/* 2. CONTENT & SIDEBAR */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Left Column: Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-display font-bold text-3xl text-text mb-6">About the Program</h2>
                <div className="prose prose-lg prose-p:font-body prose-p:text-text-muted max-w-none">
                  <p>{program.description}</p>
                  <p>
                    This initiative is carefully designed to address the specific needs of our target demographic. 
                    By combining theoretical knowledge with practical, on-the-ground execution, we ensure that every participant 
                    walks away with actionable skills and long-lasting benefits.
                  </p>
                </div>
              </div>

              {/* Outcomes List */}
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-border shadow-sm">
                <h3 className="font-display font-bold text-2xl text-text mb-6">Key Outcomes</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {program.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                      <span className="font-body text-text-muted font-medium">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="space-y-8">
              
              {/* Quick Stats */}
              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                <h3 className="font-display font-bold text-xl text-text mb-6">Program Snapshot</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-text-muted font-body">Impact</div>
                      <div className="font-bold text-text font-display text-lg">{program.beneficiaries.toLocaleString()}+ Beneficiaries</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-text-muted font-body">Duration</div>
                      <div className="font-bold text-text font-display text-lg">{program.duration}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <div className="bg-bg-dark text-white rounded-3xl p-8 shadow-xl">
                <h3 className="font-display font-bold text-xl mb-6">Who Can Apply?</h3>
                <ul className="space-y-4 mb-8">
                  {program.eligibility.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="font-body text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <Button size="lg" className="w-full bg-primary text-white hover:bg-primary-dark" render={<Link href="/volunteer" />}>
                    Apply Now
                  </Button>
                  <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-bg-dark" render={<Link href="/program-finder" />}>
                    Find Your Program
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
