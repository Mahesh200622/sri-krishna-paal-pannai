import React, { useState } from 'react';
import {
  Accessibility,
  Car,
  Check,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  MapPin,
  Navigation,
  ParkingSquare,
} from 'lucide-react';
import { BUSINESS_INFO, FACILITIES } from '../data/businessData';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_INFO.fullAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback if clipboard API is unavailable
      setCopied(false);
    }
  };

  return (
    <section
      id="location"
      className="py-16 sm:py-24 bg-[#FFFFFF] text-[#3B174F] border-t border-[#3B174F]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Heading */}
        <div className="max-w-2xl space-y-3">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#6A4B78] uppercase">
            Visit Us Any Time
          </p>
          <h2
            className="font-display font-bold text-[#3B174F] leading-tight"
            style={{
              fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
              textWrap: 'balance',
            }}
          >
            Find Your Way to Us
          </h2>
          <p className="text-base text-[#3B174F]/80 leading-relaxed">
            Conveniently located along Uppathur Road (Uppathur Vilakku) in Sattur, welcoming
            travellers and families 24 hours a day.
          </p>
        </div>

        {/* Main 2-Column Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Location Information Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#F8F3E8] border border-[#3B174F]/12 p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Address Block */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#6A4B78]">
                  <MapPin className="w-4 h-4 text-[#3B174F]" aria-hidden="true" />
                  <span>Storefront Address</span>
                </div>
                <address className="not-italic text-base text-[#3B174F] leading-relaxed font-medium">
                  {BUSINESS_INFO.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              {/* Opening Hours */}
              <div className="pt-5 border-t border-[#3B174F]/12 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#6A4B78]">
                  <Clock className="w-4 h-4 text-[#3B174F]" aria-hidden="true" />
                  <span>Opening Hours</span>
                </div>
                <p className="font-display text-lg font-bold text-[#3B174F] tracking-wide">
                  OPEN 24 HOURS / 7 DAYS
                </p>
                <p className="text-sm text-[#6A4B78]">
                  Serving fresh farm milk, filter coffee, sweets, snacks, and bakery items round
                  the clock.
                </p>
              </div>

              {/* Facilities List */}
              <div className="pt-5 border-t border-[#3B174F]/12 space-y-3">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#6A4B78]">
                  On-Site Facilities
                </p>
                <ul className="space-y-3">
                  {FACILITIES.map((facility, index) => (
                    <li key={facility.title} className="flex items-start gap-3">
                      <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#FFFFFF] border border-[#3B174F]/12 flex items-center justify-center shrink-0 text-[#3B174F]">
                        {index === 0 && <ParkingSquare className="w-4 h-4" aria-hidden="true" />}
                        {index === 1 && <Car className="w-4 h-4" aria-hidden="true" />}
                        {index === 2 && <Accessibility className="w-4 h-4" aria-hidden="true" />}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#3B174F]">{facility.title}</p>
                        <p className="text-xs text-[#6A4B78] leading-relaxed">
                          {facility.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#3B174F]/12 flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS_INFO.googleDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#3B174F] text-[#FFFFFF] text-sm font-semibold hover:bg-[#260D35] transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                <span>Get Directions</span>
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#FFFFFF] border border-[#3B174F]/20 text-[#3B174F] text-sm font-medium hover:bg-[#FBF8F2] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#3B174F]" aria-hidden="true" />
                    <span>Address Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#6A4B78]" aria-hidden="true" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Map Integration Column */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="relative flex-1 min-h-[360px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-[#3B174F]/12 bg-[#F8F3E8]">
              <iframe
                title="Google Maps location for Sri Krishna Pannai Paal, Sattur"
                src={BUSINESS_INFO.googleEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[360px] sm:min-h-[420px] border-0"
              />
            </div>

            {/* Map Provider Actions & Honest Mappls Status */}
            <div className="rounded-xl bg-[#FBF8F2] border border-[#3B174F]/12 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#3B174F]">
                  <Compass className="w-4 h-4 text-[#6A4B78]" aria-hidden="true" />
                  <span>Navigation &amp; Map Integrations</span>
                </div>
                <p className="text-xs text-[#6A4B78] leading-relaxed">
                  Google Maps is linked using the verified street address. Mappls pin integration
                  will be linked as soon as the exact Mappls pin or URL is supplied.
                </p>
              </div>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#3B174F]/20 text-xs sm:text-sm font-semibold text-[#3B174F] whitespace-nowrap shrink-0 hover:border-[#3B174F] transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#6A4B78]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact & In-Store Hospitality Strip (#contact anchor) */}
        <div
          id="contact"
          className="rounded-2xl bg-[#3B174F] text-[#F8F3E8] p-7 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
        >
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#EAD074]">
              In-Store Assistance &amp; Walk-Ins
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Stop By Anytime — Day or Night
            </h3>
            <p className="text-sm sm:text-base text-[#F8F3E8]/85 leading-relaxed">
              Visit us directly at Peddureddipatti, Uppathur Road (Uppathur Vilakku), Mulliseval,
              Sattur for fresh farm milk, traditional sweets, native snacks, and bakery takeaways.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[#F8F3E8]/30 text-[#F8F3E8] text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#F8F3E8]/10 transition-colors"
            >
              <span>Browse Menu</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
