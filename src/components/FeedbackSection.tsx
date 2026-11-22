import React, { useCallback, useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import {
  Check,
  CheckCircle2,
  ExternalLink,
  Info,
  RefreshCw,
  Send,
  Star,
} from 'lucide-react';
import { BUSINESS_INFO, TRAVELLER_HIGHLIGHTS } from '../data/businessData';

interface GoogleReviewItem {
  id: string;
  rating: number;
  text: string;
  relativeTime: string;
  googleMapsUri: string;
  authorName: string;
  authorUri: string;
  authorPhotoUri: string;
}

interface GoogleRatingState {
  available: boolean;
  found: boolean;
  placeId: string | null;
  displayName: string | null;
  formattedAddress: string | null;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUri: string | null;
  reviewsUri: string | null;
  writeAReviewUri: string | null;
  reviews: GoogleReviewItem[];
  fetchedAt: string | null;
  message?: string;
}

interface WebsiteRatingEntry {
  id: string;
  rating: number;
  authorName: string;
  comment: string;
  createdAt: string;
}

interface WebsiteRatingsSummary {
  averageRating: number | null;
  totalCount: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  entries: WebsiteRatingEntry[];
}

const HAS_CLIENT_SDK_KEY = Boolean((import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '').trim());

const ClientPlacesSdkBridge: React.FC<{
  shouldFetch: boolean;
  refreshToken: number;
  onResult: (data: GoogleRatingState) => void;
  onError: (msg: string) => void;
}> = ({ shouldFetch, refreshToken, onResult, onError }) => {
  const placesLib = useMapsLibrary('places');

  useEffect(() => {
    if (!shouldFetch || !placesLib) return;
    let cancelled = false;

    const runLookup = async () => {
      try {
        const { places } = await placesLib.Place.searchByText({
          textQuery:
            'Sri Krishna Pannai Paal, Peddureddipatti, Uppathur Road, Mulliseval, Sattur, Tamil Nadu 626205',
          fields: [
            'id',
            'displayName',
            'formattedAddress',
            'rating',
            'userRatingCount',
            'googleMapsURI',
            'reviews',
          ],
          region: 'IN',
          language: 'en',
          maxResultCount: 3,
        });

        if (cancelled) return;

        const match =
          places.find((p: google.maps.places.Place) => {
            const name = (p.displayName || '').toLowerCase();
            return name.includes('krishna') && (name.includes('pannai') || name.includes('paal'));
          }) || places[0];

        if (!match) {
          onResult({
            available: true,
            found: false,
            placeId: null,
            displayName: null,
            formattedAddress: null,
            rating: null,
            userRatingCount: null,
            googleMapsUri: null,
            reviewsUri: null,
            writeAReviewUri: null,
            reviews: [],
            fetchedAt: new Date().toISOString(),
            message: 'No matching Google Maps listing found yet for this address.',
          });
          return;
        }

        const placeId = match.id || null;
        const reviews: GoogleReviewItem[] = (match.reviews || [])
          .slice(0, 4)
          .map((rev: google.maps.places.Review, idx: number) => ({
            id: `sdk-review-${idx}`,
            rating: typeof rev.rating === 'number' ? rev.rating : 0,
            text: rev.text || rev.originalText || '',
            relativeTime: rev.relativePublishTimeDescription || '',
            googleMapsUri: rev.googleMapsURI || match.googleMapsURI || '',
            authorName: rev.authorAttribution?.displayName || 'Google Reviewer',
            authorUri: rev.authorAttribution?.uri || '',
            authorPhotoUri: rev.authorAttribution?.photoURI || '',
          }))
          .filter((item: GoogleReviewItem) => item.rating > 0 || item.text.length > 0);

        onResult({
          available: true,
          found: true,
          placeId,
          displayName: match.displayName || null,
          formattedAddress: match.formattedAddress || null,
          rating: typeof match.rating === 'number' ? match.rating : null,
          userRatingCount:
            typeof match.userRatingCount === 'number' ? match.userRatingCount : null,
          googleMapsUri: match.googleMapsURI || null,
          reviewsUri: match.googleMapsURI || null,
          writeAReviewUri: placeId
            ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
            : match.googleMapsURI || null,
          reviews,
          fetchedAt: new Date().toISOString(),
        });
      } catch (err) {
        if (cancelled) return;
        const errText = err instanceof Error ? err.message : String(err);
        if (
          errText.includes('RESOURCE_EXHAUSTED') ||
          errText.includes('OVER_QUERY_LIMIT') ||
          errText.includes('Quota') ||
          errText.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        onError('Unable to sync live Google Maps rating right now.');
      }
    };

    void runLookup();
    return () => {
      cancelled = true;
    };
  }, [placesLib, shouldFetch, refreshToken, onResult, onError]);

  return null;
};

function renderStaticStars(score: number, darkBg: boolean) {
  const rounded = Math.round(score * 2) / 2;
  return (
    <div className="flex items-center gap-1" aria-label={`${score.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const filled = starIndex <= Math.round(rounded);
        return (
          <Star
            key={starIndex}
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              filled
                ? 'fill-[#D4AF37] text-[#D4AF37]'
                : darkBg
                  ? 'text-[#F8F3E8]/30'
                  : 'text-[#3B174F]/20'
            }`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

export const FeedbackSection: React.FC = () => {
  const [googleState, setGoogleState] = useState<GoogleRatingState | null>(null);
  const [googleLoading, setGoogleLoading] = useState<boolean>(true);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [useClientSdkFallback, setUseClientSdkFallback] = useState<boolean>(false);
  const [sdkRefreshToken, setSdkRefreshToken] = useState<number>(0);

  const [siteSummary, setSiteSummary] = useState<WebsiteRatingsSummary>({
    averageRating: null,
    totalCount: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    entries: [],
  });
  const [siteLoading, setSiteLoading] = useState<boolean>(true);

  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [hoverStars, setHoverStars] = useState<number>(0);
  const [authorName, setAuthorName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState<{
    rating: number;
    comment: string;
  } | null>(null);
  const [copiedAndOpened, setCopiedAndOpened] = useState<boolean>(false);

  const fetchGoogleRating = useCallback(async (forceRefresh = false) => {
    setGoogleLoading(true);
    setGoogleError(null);

    try {
      const res = await fetch(`/api/google-rating${forceRefresh ? '?refresh=1' : ''}`);
      if (res.status === 429) {
        window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        setGoogleError('Google Places daily quota limit reached.');
        setGoogleLoading(false);
        return;
      }

      const data = (await res.json()) as GoogleRatingState & {
        quotaExceeded?: boolean;
        errorStatus?: string;
        message?: string;
      };

      if (!res.ok || data.quotaExceeded || data.errorStatus === 'RESOURCE_EXHAUSTED') {
        if (data.quotaExceeded || data.errorStatus === 'RESOURCE_EXHAUSTED') {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        setGoogleError(data.message || 'Unable to sync live Google rating.');
        setGoogleLoading(false);
        return;
      }

      if (!data.available && HAS_CLIENT_SDK_KEY) {
        setUseClientSdkFallback(true);
        setSdkRefreshToken((n) => n + 1);
        return;
      }

      setUseClientSdkFallback(false);
      setGoogleState(data);
    } catch {
      if (HAS_CLIENT_SDK_KEY) {
        setUseClientSdkFallback(true);
        setSdkRefreshToken((n) => n + 1);
      } else {
        setGoogleError('Unable to reach Google rating sync service.');
      }
    } finally {
      setGoogleLoading(false);
    }
  }, []);

  const fetchWebsiteRatings = useCallback(async () => {
    setSiteLoading(true);
    try {
      const res = await fetch('/api/website-ratings');
      if (!res.ok) return;
      const data = (await res.json()) as WebsiteRatingsSummary;
      setSiteSummary(data);
    } catch {
      // Keep current state on network blip
    } finally {
      setSiteLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchGoogleRating(false);
    void fetchWebsiteRatings();
  }, [fetchGoogleRating, fetchWebsiteRatings]);

  const handleSdkResult = useCallback((data: GoogleRatingState) => {
    setGoogleState(data);
    setGoogleError(null);
    setGoogleLoading(false);
  }, []);

  const handleSdkError = useCallback((msg: string) => {
    setGoogleError(msg);
    setGoogleLoading(false);
  }, []);

  const handleWebsiteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStars < 1 || selectedStars > 5) {
      setSubmitError('Please tap 1 to 5 stars before submitting.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/website-ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: selectedStars,
          authorName,
          comment,
        }),
      });

      const data = (await res.json()) as {
        error?: string;
        summary?: WebsiteRatingsSummary;
      };

      if (!res.ok) {
        setSubmitError(data.error || 'Could not save your website rating.');
        return;
      }

      if (data.summary) {
        setSiteSummary(data.summary);
      }

      setJustSubmitted({ rating: selectedStars, comment: comment.trim() });
      setCopiedAndOpened(false);
      setSelectedStars(0);
      setHoverStars(0);
      setAuthorName('');
      setComment('');
    } catch {
      setSubmitError('Network error while saving your website rating.');
    } finally {
      setSubmitting(false);
    }
  };

  const googleWriteReviewUrl =
    googleState?.writeAReviewUri ||
    googleState?.googleMapsUri ||
    BUSINESS_INFO.googleMapsUrl;

  const googleViewReviewsUrl =
    googleState?.reviewsUri || googleState?.googleMapsUri || BUSINESS_INFO.googleMapsUrl;

  const handleCopyAndOpenGoogle = async () => {
    if (justSubmitted?.comment) {
      try {
        await navigator.clipboard.writeText(justSubmitted.comment);
        setCopiedAndOpened(true);
      } catch {
        setCopiedAndOpened(false);
      }
    }
    window.open(googleWriteReviewUrl, '_blank', 'noopener,noreferrer');
  };

  const activeStars = hoverStars || selectedStars;

  return (
    <section
      id="ratings"
      className="py-16 sm:py-24 bg-[#F8F3E8] text-[#3B174F] border-t border-[#3B174F]/10"
    >
      {HAS_CLIENT_SDK_KEY && (
        <ClientPlacesSdkBridge
          shouldFetch={useClientSdkFallback}
          refreshToken={sdkRefreshToken}
          onResult={handleSdkResult}
          onError={handleSdkError}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#6A4B78] uppercase">
            Live Google &amp; Website Ratings
          </p>
          <h2
            className="font-display font-bold text-[#3B174F] leading-tight"
            style={{
              fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
              textWrap: 'balance',
            }}
          >
            Loved by Travellers
          </h2>
          <p className="text-base text-[#3B174F]/80 leading-relaxed">
            View live Google Maps ratings synced directly to this page, or share your visit rating
            here and post straight to Google Maps.
          </p>
        </div>

        {/* Two-Column Sync Hub: Google -> Website & Website -> Google */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Card: Live Google Maps Rating (Google -> Website) */}
          <div className="lg:col-span-6 rounded-2xl bg-[#3B174F] text-[#F8F3E8] p-7 sm:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-wider text-[#EAD074] uppercase">
                    Google Maps Live Sync
                  </p>
                  <h3 className="font-display text-2xl font-bold text-[#FFFFFF]">
                    {googleState?.displayName || BUSINESS_INFO.name}
                  </h3>
                  {googleState?.formattedAddress && (
                    <p className="text-xs text-[#F8F3E8]/70 leading-relaxed">
                      {googleState.formattedAddress}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => void fetchGoogleRating(true)}
                  disabled={googleLoading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#260D35] border border-[#F8F3E8]/20 text-xs font-semibold text-[#F8F3E8] whitespace-nowrap shrink-0 hover:border-[#D4AF37] disabled:opacity-60 transition-colors"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 text-[#EAD074] ${googleLoading ? 'animate-spin' : ''}`}
                    aria-hidden="true"
                  />
                  <span>{googleLoading ? 'Syncing...' : 'Sync from Google'}</span>
                </button>
              </div>

              {/* Live Score Display */}
              <div className="pt-5 border-t border-[#F8F3E8]/15 space-y-3">
                {googleLoading && !googleState ? (
                  <p className="text-sm text-[#F8F3E8]/80">
                    Fetching live rating from Google Places...
                  </p>
                ) : googleState?.found && googleState.rating !== null ? (
                  <>
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-5xl font-bold text-[#FFFFFF] tabular-nums">
                        {googleState.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-[#F8F3E8]/75 tabular-nums">/ 5.0</span>
                      {typeof googleState.userRatingCount === 'number' && (
                        <span className="text-sm text-[#EAD074] font-medium tabular-nums">
                          · {googleState.userRatingCount.toLocaleString()} Google reviews
                        </span>
                      )}
                    </div>
                    {renderStaticStars(googleState.rating, true)}
                    <p className="text-sm text-[#F8F3E8]/85 leading-relaxed">
                      Synced directly from Google Maps. New reviews submitted on Google appear here
                      upon refresh.
                    </p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <p className="font-display text-xl font-bold text-[#FFFFFF]">
                      {googleError
                        ? 'Live Google Sync Temporarily Unavailable'
                        : 'Google Listing Ready to Link'}
                    </p>
                    <p className="text-sm text-[#F8F3E8]/80 leading-relaxed">
                      {googleError ||
                        googleState?.message ||
                        'Tap below to open our Google Maps listing or submit your rating on Google.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Recent Google Reviews (with mandatory Google authorAttribution) */}
              {googleState?.reviews && googleState.reviews.length > 0 && (
                <div className="pt-5 border-t border-[#F8F3E8]/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold tracking-wider uppercase text-[#EAD074]">
                      Recent Google Reviews
                    </p>
                    <span className="text-[11px] text-[#F8F3E8]/65">Source: Google Maps</span>
                  </div>
                  <div className="space-y-3">
                    {googleState.reviews.slice(0, 2).map((review) => (
                      <div
                        key={review.id}
                        className="rounded-xl bg-[#260D35]/70 border border-[#F8F3E8]/12 p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {review.authorPhotoUri ? (
                              <img
                                src={review.authorPhotoUri}
                                alt={review.authorName}
                                referrerPolicy="no-referrer"
                                className="w-7 h-7 rounded-full object-cover shrink-0"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 text-[#EAD074] text-xs font-bold flex items-center justify-center shrink-0">
                                {review.authorName.slice(0, 1).toUpperCase()}
                              </div>
                            )}
                            <div className="min-w-0">
                              {review.authorUri ? (
                                <a
                                  href={review.authorUri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-semibold text-[#FFFFFF] hover:text-[#EAD074] truncate block underline-offset-2 hover:underline"
                                >
                                  {review.authorName}
                                </a>
                              ) : (
                                <p className="text-xs font-semibold text-[#FFFFFF] truncate">
                                  {review.authorName}
                                </p>
                              )}
                              {review.relativeTime && (
                                <p className="text-[11px] text-[#F8F3E8]/60">
                                  {review.relativeTime}
                                </p>
                              )}
                            </div>
                          </div>
                          {review.rating > 0 && (
                            <span className="text-xs font-semibold text-[#EAD074] tabular-nums shrink-0">
                              {review.rating.toFixed(1)} ★
                            </span>
                          )}
                        </div>
                        {review.text && (
                          <p className="text-xs text-[#F8F3E8]/85 leading-relaxed line-clamp-3">
                            {review.text}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Google Rating CTAs & Attribution */}
            <div className="pt-5 border-t border-[#F8F3E8]/15 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={googleWriteReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-br from-[#EAD074] via-[#D4AF37] to-[#B89022] text-[#3B174F] text-sm font-semibold whitespace-nowrap shrink-0 hover:from-[#DFC05B] hover:to-[#A67E1B] shadow-md transition-all"
                >
                  <Star className="w-4 h-4 fill-[#3B174F]" aria-hidden="true" />
                  <span>Rate Us on Google</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>

                <a
                  href={googleViewReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg border border-[#F8F3E8]/25 text-[#F8F3E8] text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#F8F3E8]/10 transition-colors"
                >
                  <span>All Google Reviews</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#EAD074]" aria-hidden="true" />
                </a>
              </div>

              <div className="flex items-start gap-2 text-xs text-[#F8F3E8]/70 leading-relaxed">
                <Info className="w-4 h-4 text-[#EAD074] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Powered by Google Maps Platform. Ratings posted on Google update this card
                  automatically when synced.
                </span>
              </div>
            </div>
          </div>

          {/* Right Card: Interactive Website Rating + Direct Publish to Google (Website -> Google) */}
          <div className="lg:col-span-6 rounded-2xl bg-[#FFFFFF] border border-[#3B174F]/12 p-7 sm:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Website Rating Summary Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#3B174F]/12">
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-wider text-[#6A4B78] uppercase">
                    Website Visitor Rating
                  </p>
                  <h3 className="font-display text-2xl font-bold text-[#3B174F]">
                    Rate Your Stopover Here
                  </h3>
                </div>

                <div className="text-right">
                  {siteLoading ? (
                    <span className="text-xs text-[#6A4B78]">Loading...</span>
                  ) : siteSummary.averageRating !== null ? (
                    <div className="space-y-0.5">
                      <div className="flex items-baseline justify-end gap-1.5">
                        <span className="font-display text-3xl font-bold text-[#3B174F] tabular-nums">
                          {siteSummary.averageRating.toFixed(1)}
                        </span>
                        <span className="text-xs text-[#6A4B78] tabular-nums">/ 5.0</span>
                      </div>
                      <p className="text-xs text-[#6A4B78] tabular-nums">
                        {siteSummary.totalCount}{' '}
                        {siteSummary.totalCount === 1 ? 'website rating' : 'website ratings'}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs font-medium text-[#6A4B78]">
                      Be the first to rate on site
                    </p>
                  )}
                </div>
              </div>

              {/* Post-Submission Honest Google Sync Prompt */}
              {justSubmitted && (
                <div className="rounded-xl bg-[#F8F3E8] border border-[#D4AF37]/50 p-5 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-5 h-5 text-[#3B174F] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-[#3B174F]">
                        Saved {justSubmitted.rating} / 5 stars on this website!
                      </p>
                      <p className="text-xs text-[#3B174F]/80 leading-relaxed">
                        Google requires visitors to sign in directly on Google Maps to publish
                        public Google ratings (websites cannot alter Google scores automatically).
                        Tap below to publish your {justSubmitted.rating}-star rating on Google too:
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {justSubmitted.comment ? (
                      <button
                        type="button"
                        onClick={() => void handleCopyAndOpenGoogle()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3B174F] text-[#FFFFFF] text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#260D35] transition-colors"
                      >
                        {copiedAndOpened ? (
                          <>
                            <Check className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                            <span>Review Copied · Open Google</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                            <span>Copy Review &amp; Post on Google</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <a
                        href={googleWriteReviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3B174F] text-[#FFFFFF] text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#260D35] transition-colors"
                      >
                        <span>Post This Rating on Google</span>
                        <ExternalLink className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => void fetchGoogleRating(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#3B174F]/20 text-xs font-semibold text-[#3B174F] whitespace-nowrap shrink-0 hover:border-[#3B174F] transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Re-Sync Google Card</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Interactive Rating Form */}
              <form onSubmit={handleWebsiteSubmit} className="space-y-4">
                <div className="space-y-2">
                  <span className="block text-sm font-semibold text-[#3B174F]">
                    Tap to Rate Your Experience
                  </span>
                  <div
                    className="flex items-center gap-2"
                    onMouseLeave={() => setHoverStars(0)}
                  >
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const isActive = starValue <= activeStars;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onMouseEnter={() => setHoverStars(starValue)}
                          onClick={() => {
                            setSelectedStars(starValue);
                            setSubmitError(null);
                          }}
                          aria-label={`Rate ${starValue} out of 5 stars`}
                          className="p-1.5 rounded-lg hover:bg-[#F8F3E8] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-colors"
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                              isActive
                                ? 'fill-[#D4AF37] text-[#D4AF37]'
                                : 'text-[#3B174F]/25'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      );
                    })}
                    {selectedStars > 0 && (
                      <span className="ml-2 text-sm font-semibold text-[#6A4B78] tabular-nums">
                        {selectedStars} / 5
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <label className="block">
                    <span className="sr-only">Your name (optional)</span>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      maxLength={60}
                      placeholder="Your name (optional)"
                      className="w-full rounded-lg border border-[#3B174F]/20 bg-[#FBF8F2] px-3.5 py-2.5 text-sm text-[#3B174F] placeholder:text-[#6A4B78]/65 focus:outline-none focus:border-[#3B174F]"
                    />
                  </label>

                  <label className="block">
                    <span className="sr-only">Share your feedback (optional)</span>
                    <textarea
                      rows={2}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      maxLength={400}
                      placeholder="Share what you enjoyed — farm milk, filter coffee, palkova, or highway stop..."
                      className="w-full rounded-lg border border-[#3B174F]/20 bg-[#FBF8F2] px-3.5 py-2.5 text-sm text-[#3B174F] placeholder:text-[#6A4B78]/65 focus:outline-none focus:border-[#3B174F] resize-none"
                    />
                  </label>
                </div>

                {submitError && (
                  <p className="text-xs font-medium text-red-700" role="alert">
                    {submitError}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#3B174F] text-[#FFFFFF] text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#260D35] disabled:opacity-60 transition-colors"
                  >
                    <Send className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                    <span>{submitting ? 'Saving...' : 'Submit Rating'}</span>
                  </button>

                  <span className="text-xs text-[#6A4B78]">
                    Updates website rating right away
                  </span>
                </div>
              </form>
            </div>

            {/* Recent Website Visitor Ratings */}
            {siteSummary.entries.length > 0 && (
              <div className="pt-5 border-t border-[#3B174F]/12 space-y-3">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#6A4B78]">
                  Recent Website Visitor Ratings
                </p>
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {siteSummary.entries.slice(0, 4).map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-lg bg-[#FBF8F2] border border-[#3B174F]/10 px-4 py-3 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-[#3B174F]">
                          {entry.authorName}
                        </span>
                        <span className="text-xs font-semibold text-[#6A4B78] tabular-nums">
                          {entry.rating}.0 ★
                        </span>
                      </div>
                      {entry.comment && (
                        <p className="text-xs text-[#3B174F]/80 leading-relaxed">
                          {entry.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Highlighted Appreciation Points Strip */}
        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold text-[#3B174F]">
              What Visitors Appreciate Most
            </h3>
            <p className="text-base text-[#3B174F]/80 leading-relaxed max-w-2xl">
              From early-morning commuters to late-night highway travellers passing through Sattur,
              these four strengths define the Sri Krishna Pannai Paal stopover.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRAVELLER_HIGHLIGHTS.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-xl bg-[#FFFFFF] border border-[#3B174F]/12 p-6 space-y-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2
                    className="w-5 h-5 text-[#3B174F] shrink-0"
                    aria-hidden="true"
                  />
                  <h4 className="font-display text-lg font-bold text-[#3B174F]">
                    {highlight.title}
                  </h4>
                </div>
                <p className="text-sm text-[#3B174F]/80 leading-relaxed">{highlight.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
