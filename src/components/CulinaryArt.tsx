import React from 'react';
import type { ArtMotif } from '../data/businessData';

interface CulinaryArtProps {
  motif: ArtMotif;
  className?: string;
}

export const CulinaryArt: React.FC<CulinaryArtProps> = ({ motif, className = 'w-14 h-14' }) => {
  switch (motif) {
    case 'milk':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M22 14h20l-2 6v6c3.5 3.2 5 7.4 5 12v14a4 4 0 0 1-4 4H23a4 4 0 0 1-4-4V38c0-4.6 1.5-8.8 5-12v-6l-2-6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M24 20h16" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M19 37c4.5-2.5 8.5 2.5 13 0s8.5-2.5 13 0"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'coffee':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          {/* Traditional South Indian Davara & Tumbler */}
          <path
            d="M21 18h22l-3 22H24l-3-22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M14 40h36c0 7-6 11-18 11s-18-4-18-11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M26 11c0-2 2-3 2-5M33 12c0-2 2-3 2-5M39 11c0-2 2-3 2-5" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 25h20" stroke="#D4AF37" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case 'tea':
    case 'sukku':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M16 24h26v13a13 13 0 0 1-26 0V24Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M42 27h5a5 5 0 0 1 0 10h-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M12 52h34" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
          <path d="M25 14c0-2.5 2-3.5 2-6M33 14c0-2.5 2-3.5 2-6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'badam':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M20 20h24l-2 26a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4l-2-26Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <ellipse cx="32" cy="35" rx="5" ry="7" stroke="#D4AF37" strokeWidth="2" />
          <path d="M21 26h22" stroke="#D4AF37" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case 'palkova':
    case 'peda':
    case 'halwa':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 42h40c-2 6-8 9-20 9s-18-3-20-9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M20 42c0-7 5.4-12 12-12s12 5 12 12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="32" cy="24" r="5" stroke="#D4AF37" strokeWidth="2" />
          <path d="M27 36h10" stroke="#D4AF37" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case 'vadai':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <circle cx="32" cy="32" r="17" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="32" r="6" stroke="#D4AF37" strokeWidth="2" />
          <circle cx="24" cy="24" r="1.2" fill="#D4AF37" />
          <circle cx="41" cy="26" r="1.2" fill="#D4AF37" />
          <circle cx="38" cy="40" r="1.2" fill="#D4AF37" />
        </svg>
      );
    case 'paniyaram':
    case 'seedai':
    case 'laddu':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <circle cx="24" cy="38" r="9" stroke="currentColor" strokeWidth="2" />
          <circle cx="40" cy="38" r="9" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="24" r="9" stroke="#D4AF37" strokeWidth="2" />
          <path d="M12 49h40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'murukku':
    case 'snacks':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M32 32c0-3 3-5 6-4 4 1 6 5 5 9-2 6-8 9-14 8-8-1-13-9-12-17 1-10 10-16 20-15 11 1 18 11 17 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="32" cy="32" r="2.5" stroke="#D4AF37" strokeWidth="2" />
        </svg>
      );
    case 'bakery-puffs':
    case 'bakery-buns':
    case 'bakery-tiffin':
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M14 42h36M18 42c0-10 6-18 14-18s14 8 14 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="20" r="3" stroke="#D4AF37" strokeWidth="2" />
          <path d="M12 47h40" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};
