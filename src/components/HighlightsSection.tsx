import React, { useState } from 'react';
import { Award, Clock, Coffee, Milk, Wheat } from 'lucide-react';
import { SPECIAL_HIGHLIGHTS, type SpecialHighlight } from '../data/businessData';

const HighlightIcon: React.FC<{ iconName: SpecialHighlight['iconName'] }> = ({ iconName }) => {
  const iconClass = 'w-5 h-5 text-[#3B174F]';
  switch (iconName) {
    case 'milk':
      return <Milk className={iconClass} aria-hidden="true" />;
    case 'award':
      return <Award className={iconClass} aria-hidden="true" />;
    case 'coffee':
      return <Coffee className={iconClass} aria-hidden="true" />;
    case 'wheat':
      return <Wheat className={iconClass} aria-hidden="true" />;
    case 'clock':
      return <Clock className={iconClass} aria-hidden="true" />;
  }
};

export const HighlightsSection: React.FC = () => {
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  return (
    <section id="specialities" className="py-16 sm:py-24 bg-[#F8F3E8] text-[#3B174F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#6A4B78] uppercase">
            Our Promise
          </p>
          <h2
            className="font-display font-bold text-[#3B174F] leading-tight"
            style={{
              fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
              textWrap: 'balance',
            }}
          >
            Why Choose Sri Krishna Pannai Paal?
          </h2>
          <p className="text-base text-[#3B174F]/80 leading-relaxed">
            Built around genuine dairy quality, traditional South Indian flavours, and dependable
            hospitality at any hour of the day or night.
          </p>
        </div>

        {/* 3 cards on top row, 2 centered cards below on desktop */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {SPECIAL_HIGHLIGHTS.map((item) => (
            <article
              key={item.id}
              className="group w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] rounded-xl bg-[#FFFFFF] border border-[#3B174F]/12 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Modern 4:3 Photo Header */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FBF8F2] border-b border-[#3B174F]/8">
                {!brokenImages[item.id] ? (
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setBrokenImages((prev) => ({ ...prev, [item.id]: true }))
                    }
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#F8F3E8]">
                    <HighlightIcon iconName={item.iconName} />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#F8F3E8] border border-[#D4AF37]/45 flex items-center justify-center">
                    <HighlightIcon iconName={item.iconName} />
                  </div>
                  <span className="text-xs font-semibold tracking-widest text-[#6A4B78] tabular-nums">
                    {item.number}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#3B174F] leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-[#3B174F]/80 leading-relaxed">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
