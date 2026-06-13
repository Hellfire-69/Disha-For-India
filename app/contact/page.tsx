import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
import FAQAccordion from "@/components/contact/FAQAccordion";
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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
                  <a href="#" className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
                    <Linkedin className="w-5 h-5" />
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
