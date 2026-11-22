import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../data/businessData';

interface AboutSectionProps {
  onOpenStorefrontModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenStorefrontModal }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F8F3E8] text-[#3B174F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Authentic Storefront Architectural Frame */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <button
              type="button"
              onClick={onOpenStorefrontModal}
              className="group relative w-full h-full min-h-[320px] sm:min-h-[380px] rounded-xl overflow-hidden bg-[#FFFFFF] border border-[#3B174F]/12 shadow-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B174F]"
              aria-label="Inspect full Sri Krishna Pannai Paal exterior storefront photograph"
            >
              {!imgError ? (
                <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] overflow-hidden bg-[#260D35]">
                  <img
                    src={BUSINESS_INFO.exteriorAsset}
                    alt="Sri Krishna Pannai Paal illuminated A-frame storefront and outdoor seating at night in Sattur"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#260D35]/90 via-[#260D35]/55 to-transparent p-5 sm:p-6">
                    <p className="text-xs font-medium text-[#EAD074] tracking-wide">
                      Original Storefront Photography
                    </p>
                    <p className="mt-1 text-sm sm:text-base font-medium text-[#FFFFFF]">
                      Uppathur Vilakku Pavilion · Click to inspect full view
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full min-h-[320px] flex flex-col items-center justify-center p-8 bg-[#3B174F] text-[#F8F3E8] text-center">
                  <p className="font-display text-2xl font-bold">{BUSINESS_INFO.name}</p>
                  <p className="mt-2 text-sm text-[#EAD074]">{BUSINESS_INFO.shortLocation}</p>
                </div>
              )}
            </button>
          </motion.div>

          {/* Right Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#6A4B78] uppercase">
                Our Story &amp; Heritage
              </p>
              <h2
                className="font-display font-bold text-[#3B174F] leading-tight"
                style={{
                  fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
                  textWrap: 'balance',
                }}
              >
                Tradition Meets Taste
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#3B174F]/85 leading-relaxed max-w-2xl">
              <p>
                Sri Krishna Pannai Paal is a destination for dairy lovers, food enthusiasts and
                travellers. We bring together the goodness of rich farm milk, traditional sweets,
                refreshing beverages and delicious local snacks.
              </p>
              <p>
                Whether you are beginning your morning journey or taking a late-night highway
                break, enjoy a welcoming stop filled with authentic flavours and traditional
                goodness.
              </p>
            </div>

            <div className="pt-4 border-t border-[#3B174F]/12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="font-display text-lg font-semibold text-[#3B174F]">
                  Pure Dairy Roots
                </p>
                <p className="mt-1 text-sm text-[#6A4B78]">
                  Thick farm milk and house-crafted milk sweets prepared daily.
                </p>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-[#3B174F]">
                  Round-the-Clock
                </p>
                <p className="mt-1 text-sm text-[#6A4B78]">
                  Welcoming families and travellers 24 hours a day, 7 days a week.
                </p>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-[#3B174F]">
                  Sattur Landmark
                </p>
                <p className="mt-1 text-sm text-[#6A4B78]">
                  Conveniently situated on Uppathur Road (Uppathur Vilakku).
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
