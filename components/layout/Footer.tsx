import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-bg-dark text-text-light pt-20 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Image 
              src="https://dishaforindia.org/wp-content/themes/dishaforindia/assets/images/logo-dark.png" 
              alt="Disha for India" 
              width={160} 
              height={53} 
              className="h-10 md:h-12 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering the next generation of leaders across India through education, health, and entrepreneurship programs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xl mb-6 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/vision-mission" className="text-gray-400 hover:text-primary transition-colors text-sm">Vision & Mission</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-primary transition-colors text-sm">Events</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-primary transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xl mb-6 text-white">Programs</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/programs" className="text-gray-400 hover:text-primary transition-colors text-sm">Education</Link></li>
              <li><Link href="/programs" className="text-gray-400 hover:text-primary transition-colors text-sm">Health</Link></li>
              <li><Link href="/programs" className="text-gray-400 hover:text-primary transition-colors text-sm">Entrepreneurship</Link></li>
              <li><Link href="/programs" className="text-gray-400 hover:text-primary transition-colors text-sm">Environment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-xl mb-6 text-white">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li>123 NGO Street, New Delhi, India 110001</li>
              <li>contact@dishaforindia.org</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Disha for India. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
