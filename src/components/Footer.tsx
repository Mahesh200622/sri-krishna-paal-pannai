import React from 'react';
import { Clock, MapPin, Navigation } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

const POPULAR_PRODUCTS = [
  'Thick Farm Milk',
  'Fresh Filter Coffee',
  'Palkova & Paal Peda',
  'Tirunelveli-Style Halwa',
  'Hot Vadai & Paniyaram',
  'Murukku, Seedai & Kambu Laddu',
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#260D35] text-[#F8F3E8] border-t border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-2xl font-bold text-[#FFFFFF]">
              {BUSINESS_INFO.name}
            </h2>
            <p className="font-display italic text-base text-[#EAD074]">
              &ldquo;{BUSINESS_INFO.tagline}&rdquo;
            </p>
            <p className="text-sm text-[#F8F3E8]/75 leading-relaxed max-w-sm">
              A trusted 24/7 highway dairy and food destination in Sattur offering farm-fresh
              milk, traditional sweets, hot beverages, native snacks, and fresh bakery treats.
            </p>
            <div className="pt-2 inline-flex items-center gap-2 text-xs font-semibold text-[#EAD074]">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>OPEN 24 HOURS / 7 DAYS</span>
            </div>
          </div>

          {/* Popular Products */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#EAD074]">
              Popular Offerings
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F8F3E8]/80">
              {POPULAR_PRODUCTS.map((product) => (
                <li key={product}>
                  <a href="#menu" className="hover:text-[#FFFFFF] transition-colors">
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Address & Directions */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#EAD074]">
              Visit Us
            </h3>
            <div className="flex items-start gap-2.5 text-sm text-[#F8F3E8]/85 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#EAD074] shrink-0 mt-1" aria-hidden="true" />
              <address className="not-italic">
                {BUSINESS_INFO.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div className="pt-1">
              <a
                href={BUSINESS_INFO.googleDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-br from-[#EAD074] via-[#D4AF37] to-[#B89022] text-[#3B174F] text-xs font-semibold hover:from-[#DFC05B] hover:to-[#A67E1B] shadow-md transition-all"
              >
                <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-[#F8F3E8]/12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F3E8]/65">
          <p>© 2026 Sri Krishna Pannai Paal. All Rights Reserved.</p>
          <p>Sattur, Virudhunagar District, Tamil Nadu – 626205</p>
        </div>
      </div>
    </footer>
  );
};
