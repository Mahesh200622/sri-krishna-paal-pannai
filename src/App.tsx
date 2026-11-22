/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { X } from 'lucide-react';
import { BUSINESS_INFO } from './data/businessData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { HighlightsSection } from './components/HighlightsSection';
import { FeedbackSection } from './components/FeedbackSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';

const CLIENT_MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '').trim();

function MapsProviderWrapper({ children }: { children: ReactNode }) {
  if (!CLIENT_MAPS_API_KEY) {
    return <>{children}</>;
  }

  return (
    <APIProvider
      apiKey={CLIENT_MAPS_API_KEY}
      language="en"
      region="IN"
    >
      {children}
    </APIProvider>
  );
}

export default function App() {
  const [storefrontModalOpen, setStorefrontModalOpen] = useState(false);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const onQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  useEffect(() => {
    if (!storefrontModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setStorefrontModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [storefrontModalOpen]);

  return (
    <MapsProviderWrapper>
      <div className="min-h-screen flex flex-col bg-[#F8F3E8] text-[#3B174F]">
        {mapsQuotaExceeded && (
          <div className="bg-[#FBF5DC] border-b border-[#D4AF37]/45 text-[#3B174F] px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-[#3B174F] hover:text-[#6A4B78]"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        <Navbar />

        <main className="flex-1">
          <Hero />
          <AboutSection onOpenStorefrontModal={() => setStorefrontModalOpen(true)} />
          <MenuSection />
          <HighlightsSection />
          <FeedbackSection />
          <LocationSection />
        </main>

        <Footer />

        {/* Storefront Emblem Full-View Modal */}
        {storefrontModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="storefront-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#260D35]/90 backdrop-blur-sm"
            onClick={() => setStorefrontModalOpen(false)}
          >
            <div
              className="relative w-full max-w-2xl rounded-2xl bg-[#F8F3E8] text-[#3B174F] border border-[#D4AF37]/40 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 bg-[#FFFFFF] border-b border-[#3B174F]/12">
                <div>
                  <p className="text-xs font-medium text-[#6A4B78]">
                    Exterior Storefront Photography
                  </p>
                  <h3 id="storefront-modal-title" className="font-display text-lg font-bold">
                    {BUSINESS_INFO.name} — Sattur
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setStorefrontModalOpen(false)}
                  aria-label="Close storefront image modal"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[#3B174F] hover:bg-[#3B174F]/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-6 bg-[#260D35] flex items-center justify-center">
                <img
                  src={BUSINESS_INFO.exteriorAsset}
                  alt="Sri Krishna Pannai Paal illuminated night storefront exterior in Sattur"
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[68vh] object-contain rounded-lg"
                />
              </div>
              <div className="px-6 py-4 bg-[#F8F3E8] border-t border-[#3B174F]/12 text-sm text-[#3B174F]/80">
                Uppathur Road (Uppathur Vilakku), Mulliseval, Sattur — Open 24 Hours / 7 Days.
              </div>
            </div>
          </div>
        )}
      </div>
    </MapsProviderWrapper>
  );
}
