"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "/about",
      dropdown: [
        { name: "Our Story", href: "/about" },
        { name: "Team", href: "/about#team" }, // Team is on about page
        { name: "Impact Map", href: "/impact-map" },
        { name: "Success Stories", href: "/success-stories" },
      ],
    },
    {
      name: "Programs",
      href: "/programs",
      dropdown: [
        { name: "All Programs", href: "/programs" },
        { name: "Program Finder Quiz", href: "/program-finder" },
      ],
    },
    {
      name: "Media & Insights",
      href: "#",
      dropdown: [
        { name: "Blog", href: "/blog" },
        { name: "Events", href: "/events" },
        { name: "Gallery", href: "/gallery" },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image 
            src="https://dishaforindia.org/wp-content/themes/dishaforindia/assets/images/logo-dark.png" 
            alt="Disha for India" 
            width={120} 
            height={40} 
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* DESKTOP NAV (Hidden on < lg) */}
        <nav className="hidden lg:flex items-center gap-8 ml-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href || item.dropdown?.some(d => pathname === d.href);
            
            if (item.dropdown) {
              return (
                <div key={item.name} className="relative group py-6">
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                      isActive ? "text-primary" : "text-text hover:text-primary"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 w-56 bg-white border border-border shadow-lg rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
                    <div className="flex flex-col py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`px-4 py-2.5 text-sm font-medium transition-colors hover:bg-bg hover:text-primary ${
                            pathname === subItem.href ? "text-primary bg-primary-light/30" : "text-text-muted"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold transition-colors py-6 ${
                  isActive ? "text-primary" : "text-text hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP CTA BUTTONS */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <Link
            href="/program-finder"
            className="border-2 border-primary text-primary rounded-full px-5 py-2 text-sm font-bold hover:bg-primary/5 hover:scale-[1.02] transition-all"
          >
            Find Your Path
          </Link>
          <Link
            href="/volunteer"
            className="bg-primary text-white rounded-full px-6 py-2.5 text-sm font-bold hover:bg-primary-dark hover:scale-[1.02] transition-all shadow-md"
          >
            Get Involved
          </Link>
        </div>

        {/* MOBILE NAV DRAWER (Hidden on >= lg) */}
        <div className="lg:hidden flex items-center shrink-0">
          <Sheet>
            <SheetTrigger className="p-2 -mr-2" aria-label="Menu">
              <Menu className="w-7 h-7 text-text" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-white w-[300px] sm:w-[400px] border-l border-border overflow-y-auto">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col mt-8 pb-12">
                
                {/* Mobile Links */}
                <div className="flex flex-col gap-2 mb-8">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    
                    if (item.dropdown) {
                      return (
                        <div key={item.name} className="flex flex-col border-b border-border/50 py-3">
                          <span className="text-lg font-bold text-text mb-2 px-2">{item.name}</span>
                          <div className="flex flex-col pl-4 border-l-2 border-primary/20 ml-2 space-y-2">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`text-base font-medium py-1.5 transition-colors ${
                                  pathname === subItem.href ? "text-primary" : "text-text-muted hover:text-text"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`text-lg font-bold py-3 px-2 border-b border-border/50 transition-colors ${
                          isActive ? "text-primary" : "text-text hover:text-primary"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile CTAs */}
                <div className="flex flex-col gap-3 mt-auto">
                  <Link
                    href="/program-finder"
                    className="w-full border-2 border-primary text-primary rounded-full px-6 py-3.5 text-center font-bold text-lg hover:bg-primary/5 transition-all"
                  >
                    Find Your Path
                  </Link>
                  <Link
                    href="/volunteer"
                    className="w-full bg-primary text-white rounded-full px-6 py-3.5 text-center font-bold text-lg shadow-md hover:bg-primary-dark transition-all"
                  >
                    Get Involved
                  </Link>
                </div>
                
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
      </div>
    </header>
  );
}
