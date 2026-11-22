import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#3B174F] text-[#F8F3E8]"
    >
      {/* Subtle atmospheric architectural texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 82% 28%, rgba(212, 175, 55, 0.24) 0%, transparent 48%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm font-medium text-[#EAD074] tracking-wide">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Open 24 Hours</span>
              </span>
              <span aria-hidden="true" className="text-[#F8F3E8]/35">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#F8F3E8]/90">
                <MapPin className="w-4 h-4 text-[#EAD074] shrink-0" aria-hidden="true" />
                <span>Sattur, Tamil Nadu</span>
              </span>
            </div>

            <div className="space-y-4">
              <h1
                className="font-display font-bold tracking-tight text-[#FFFFFF] leading-[1.08]"
                style={{
                  fontSize: 'clamp(2.35rem, 4.4vw, 4.1rem)',
                  textWrap: 'balance',
                }}
              >
                Sri Krishna Pannai Paal
              </h1>

              <p className="font-display italic text-xl sm:text-2xl text-[#EAD074] leading-snug max-w-xl">
                &ldquo;{BUSINESS_INFO.tagline}&rdquo;
              </p>

              <p className="text-base sm:text-lg text-[#F8F3E8]/85 leading-relaxed max-w-xl">
                {BUSINESS_INFO.heroSubtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-br from-[#EAD074] via-[#D4AF37] to-[#B89022] text-[#3B174F] text-sm font-semibold whitespace-nowrap shrink-0 hover:from-[#DFC05B] hover:to-[#A67E1B] shadow-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF]"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[#F8F3E8]/30 text-[#F8F3E8] text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#F8F3E8]/10 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <span>Discover Our Story</span>
              </a>
            </div>
          </motion.div>

          {/* Right Authentic Exterior & Brand Emblem Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-[#FFFFFF] p-4 sm:p-5 rounded-xl shadow-2xl border border-[#D4AF37]/25 max-w-md mx-auto lg:ml-auto">
              <div className="relative overflow-hidden rounded-lg bg-[#F8F3E8] aspect-square">
                {!imgError ? (
                  <img
                    src={BUSINESS_INFO.primaryAsset}
                    alt="Sri Krishna Pannai Paal official brand emblem showcasing the modern A-frame wood and glass storefront in Sattur"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain bg-[#FFFFFF]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#3B174F] text-[#F8F3E8]">
                    <span className="font-display text-2xl font-bold">
                      {BUSINESS_INFO.name}
                    </span>
                    <span className="mt-2 text-sm text-[#D4AF37]">
                      {BUSINESS_INFO.tamilTitle}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#3B174F]/10 flex items-center justify-between gap-3 text-xs text-[#6A4B78]">
                <span className="font-semibold text-[#3B174F]">
                  Uppathur Vilakku, Sattur
                </span>
                <span className="tabular-nums">Open 24 / 7</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Key Storefront Fact Strip */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-[#F8F3E8]/15 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <p className="font-display text-xl sm:text-2xl font-bold text-[#FFFFFF] tabular-nums">
              24 Hours
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[#F8F3E8]/75">
              Open every day of the week
            </p>
          </div>
          <div>
            <p className="font-display text-xl sm:text-2xl font-bold text-[#FFFFFF]">
              Farm Fresh
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[#F8F3E8]/75">
              Thick milk, palkova &amp; filter coffee
            </p>
          </div>
          <div>
            <p className="font-display text-xl sm:text-2xl font-bold text-[#FFFFFF]">
              Native Craft
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[#F8F3E8]/75">
              Traditional sweets &amp; hot savouries
            </p>
          </div>
          <div>
            <p className="font-display text-xl sm:text-2xl font-bold text-[#FFFFFF]">
              Easy Parking
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[#F8F3E8]/75">
              Roadside, in-car &amp; accessible entry
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
