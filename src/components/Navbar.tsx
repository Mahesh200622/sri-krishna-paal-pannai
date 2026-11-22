import React, { useEffect, useState } from 'react';
import { Menu, X, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Specialities', href: '#specialities' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F3E8]/95 backdrop-blur-md border-b border-[#3B174F]/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#3B174F] whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B174F] rounded-sm"
        >
          {BUSINESS_INFO.name}
        </a>

        {/* Zone 2: Clean single-line typography navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#3B174F]/80"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#3B174F] transition-colors duration-150 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-[#D4AF37] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B174F] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Highlighted primary action + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={BUSINESS_INFO.googleDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3B174F] text-[#F8F3E8] text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#260D35] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span>Get Directions</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#3B174F]/15 text-[#3B174F] hover:bg-[#3B174F]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B174F]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#F8F3E8] border-t border-[#3B174F]/10 px-4 py-5 shadow-lg"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-3 text-base font-medium text-[#3B174F] rounded-lg hover:bg-[#3B174F]/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-[#3B174F]/10">
            <a
              href={BUSINESS_INFO.googleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#3B174F] text-[#F8F3E8] text-sm font-semibold hover:bg-[#260D35] transition-colors"
            >
              <Navigation className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
