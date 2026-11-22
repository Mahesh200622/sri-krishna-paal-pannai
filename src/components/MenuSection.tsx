import React, { useEffect, useMemo, useState } from 'react';
import { X, ArrowUpRight, Search } from 'lucide-react';
import {
  BUSINESS_INFO,
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuCategoryId,
  type MenuItem,
} from '../data/businessData';
import { CulinaryArt } from './CulinaryArt';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FFFFFF] text-[#3B174F] border-y border-[#3B174F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#3B174F]/12">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#6A4B78] uppercase">
              Freshly Prepared Round the Clock
            </p>
            <h2
              className="font-display font-bold text-[#3B174F] leading-tight"
              style={{
                fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
                textWrap: 'balance',
              }}
            >
              Our Menu &amp; Specialities
            </h2>
            <p className="text-base text-[#3B174F]/75 leading-relaxed">
              Explore our farm-fresh dairy beverages, traditional milk sweets, crunchy native
              savouries, and freshly baked items available at our Sattur counter.
            </p>
          </div>

          {/* Search Filter */}
          <div className="w-full lg:w-72 shrink-0">
            <label htmlFor="menu-search" className="sr-only">
              Search menu items
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#6A4B78] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="menu-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search milk, palkova, vadai..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#F8F3E8] border border-[#3B174F]/15 text-sm text-[#3B174F] placeholder:text-[#6A4B78]/65 focus:outline-none focus:ring-2 focus:ring-[#3B174F]"
              />
            </div>
          </div>
        </div>

        {/* Interactive Category Navigation */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#F8F3E8] border border-[#3B174F]/10"
          >
            {MENU_CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B174F] ${
                    isActive
                      ? 'bg-[#3B174F] text-[#FFFFFF] shadow-sm'
                      : 'text-[#3B174F]/80 hover:text-[#3B174F] hover:bg-[#FFFFFF]/70'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs sm:text-sm text-[#6A4B78] tabular-nums shrink-0">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'offering' : 'offerings'}
          </p>
        </div>

        {/* Product Grid */}
        {filteredItems.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col justify-between rounded-xl bg-[#FBF8F2] border border-[#3B174F]/12 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  {/* Product Photo Band (4:3) */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8F3E8] border-b border-[#3B174F]/8">
                    {!brokenImages[item.id] ? (
                      <img
                        src={item.imageSrc}
                        alt={item.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setBrokenImages((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#F8F3E8] text-[#3B174F]">
                        <CulinaryArt motif={item.motif} className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#6A4B78]">
                      <span>{item.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.servingNote}</span>
                      {item.signature && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-[#3B174F]">House Speciality</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#3B174F] leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-sm text-[#3B174F]/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-6 pb-5 pt-2 flex items-center justify-between border-t border-[#3B174F]/6 mt-auto">
                  <span className="text-xs font-medium text-[#6A4B78]">
                    Available in-store 24/7
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B174F] hover:text-[#6A4B78] transition-colors whitespace-nowrap shrink-0 py-1.5 px-2 -mr-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B174F]"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-[#3B174F]/12 bg-[#F8F3E8] p-10 text-center space-y-3">
            <p className="font-display text-xl font-semibold text-[#3B174F]">
              No menu items match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-sm text-[#6A4B78]">
              Try clearing your search or switching back to all offerings.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#3B174F] text-[#FFFFFF] text-sm font-medium hover:bg-[#260D35] transition-colors"
            >
              Reset Menu Filter
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-item-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#260D35]/75 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-[#F8F3E8] text-[#3B174F] border border-[#D4AF37]/40 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {!brokenImages[selectedItem.id] && (
              <div className="relative aspect-[4/3] w-full bg-[#3B174F]/5 overflow-hidden border-b border-[#3B174F]/10">
                <img
                  src={selectedItem.imageSrc}
                  alt={selectedItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#6A4B78]">
                    {selectedItem.categoryLabel} · {selectedItem.servingNote}
                  </p>
                  <h3
                    id="menu-item-modal-title"
                    className="font-display text-2xl font-bold text-[#3B174F] mt-0.5"
                  >
                    {selectedItem.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close item details"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#3B174F]/70 hover:text-[#3B174F] hover:bg-[#3B174F]/10 transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-base text-[#3B174F]/85 leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="rounded-xl bg-[#FFFFFF] border border-[#3B174F]/10 p-4 space-y-1.5 text-sm">
                <p className="font-semibold text-[#3B174F]">Available In-Store</p>
                <p className="text-[#6A4B78]">
                  Prepared fresh at Sri Krishna Pannai Paal, Uppathur Vilakku, Sattur. Open 24
                  Hours / 7 Days.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2.5 rounded-lg border border-[#3B174F]/20 text-sm font-medium text-[#3B174F] hover:bg-[#3B174F]/5 transition-colors"
                >
                  Close
                </button>
                <a
                  href={BUSINESS_INFO.googleDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#3B174F] text-[#FFFFFF] text-sm font-semibold hover:bg-[#260D35] transition-colors"
                >
                  <span>Visit Store for Fresh Serving</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
