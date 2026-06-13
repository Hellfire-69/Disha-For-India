import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
import FAQAccordion from "@/components/contact/FAQAccordion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact | Disha for India",
  description: "Get in touch with Disha for India. We&apos;d love to hear from you.",
  openGraph: {
    title: "Contact | Disha for India",
    description: "Get in touch with Disha for India. We&apos;d love to hear from you.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="w-full bg-bg min-h-screen">
      
      {/* 1. PAGE HERO */}
      <section className="relative w-full h-[40vh] min-h-[350px] md:h-[50vh] md:min-h-[450px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80"
            alt="Reach Out"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-bg" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center mt-12 md:mt-24">
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="inline-block mb-4 text-primary font-accent font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              Reach Out
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
              Let&apos;s Connect
            </h1>
          </div>
        </div>
      </section>

      {/* 2. TWO COLUMN LAYOUT */}
      <section className="py-16 md:py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Contact Info */}
            <div className="lg:col-span-5 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">We&apos;re Here to Help</h2>
                <p className="font-body text-text-muted text-lg leading-relaxed">
                  Whether you have a question about our programs, want to volunteer, or are interested in partnering with us, our team is ready to answer all your questions.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-text">Headquarters</h4>
                    <p className="font-body text-text-muted mt-1">123 NGO Street, Sector 4<br />New Delhi, India 110001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-text">Email Us</h4>
                    <a href="mailto:contact@dishaforindia.org" className="font-body text-primary hover:text-primary-dark transition-colors mt-1 inline-block">
                      contact@dishaforindia.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-text">Call Us</h4>
                    <a href="tel:+919876543210" className="font-body text-primary hover:text-primary-dark transition-colors mt-1 inline-block">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-text">Office Hours</h4>
                    <p className="font-body text-text-muted mt-1">Monday - Friday<br />9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-border">
                <h4 className="font-display font-bold text-lg text-text mb-4">Follow Our Journey</h4>
                <div className="flex items-center gap-4">
                  <a href="#" aria-label="Facebook" className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                  </a>
                  <a href="#" aria-label="X (Twitter)" className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="py-16 md:py-24 bg-white border-t border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">Frequently Asked Questions</h2>
            <p className="font-body text-text-muted text-lg max-w-2xl mx-auto">Find quick answers to common queries about our operations, partnerships, and impact.</p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* 4. MAP PLACEHOLDER */}
      <section className="pb-16 md:pb-24 pt-8 bg-bg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative w-full h-[400px] bg-secondary-light rounded-3xl overflow-hidden shadow-inner flex flex-col items-center justify-center border border-secondary/20">
            {/* Map abstract background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, var(--color-secondary) 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
            
            <div className="relative z-10 text-center animate-pulse">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border border-secondary/10">
                <MapPin className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-3xl text-secondary-dark mb-2">Visit Our Office</h3>
              <p className="font-body text-secondary-dark/80 font-medium px-4 py-2 bg-white/50 backdrop-blur-md rounded-full inline-block">
                123 NGO Street, Sector 4, New Delhi, India 110001
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
