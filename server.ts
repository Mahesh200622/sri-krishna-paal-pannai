import 'dotenv/config';
import { spawn } from 'node:child_process';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const RATINGS_DIR = path.join(__dirname, 'data');
const RATINGS_FILE = path.join(RATINGS_DIR, 'website-ratings.json');

interface WebsiteRatingEntry {
  id: string;
  rating: number;
  authorName: string;
  comment: string;
  createdAt: string;
}

interface RatingsStore {
  entries: WebsiteRatingEntry[];
}

interface GoogleAuthorAttribution {
  displayName?: string;
  uri?: string;
  photoUri?: string;
}

interface GooglePlaceReview {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string; languageCode?: string };
  originalText?: { text?: string; languageCode?: string };
  authorAttribution?: GoogleAuthorAttribution;
  googleMapsUri?: string;
  publishTime?: string;
}

interface GooglePlaceResponseItem {
  id?: string;
  displayName?: { text?: string; languageCode?: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  googleMapsLinks?: {
    placeUri?: string;
    directionsUri?: string;
    writeAReviewUri?: string;
    reviewsUri?: string;
    photosUri?: string;
  };
  reviews?: GooglePlaceReview[];
}

interface NormalizedGoogleReview {
  id: string;
  rating: number;
  text: string;
  relativeTime: string;
  googleMapsUri: string;
  authorName: string;
  authorUri: string;
  authorPhotoUri: string;
}

interface GoogleRatingPayload {
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
  reviews: NormalizedGoogleReview[];
  fetchedAt: string;
  message?: string;
}

// Short-lived in-memory response guard (60s) to avoid hammering demo quota on rapid page loads;
// never persisted to disk in compliance with Google Maps Platform Terms of Service.
let memoryCache: { expiresAt: number; payload: GoogleRatingPayload } | null = null;

function getMapsApiKey(): string {
  return (
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.VITE_GOOGLE_MAPS_API_KEY ||
    process.env.MAPS_API_KEY ||
    ''
  ).trim();
}

async function readWebsiteRatings(): Promise<RatingsStore> {
  try {
    const raw = await fs.readFile(RATINGS_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<RatingsStore>;
    const entries = Array.isArray(parsed.entries) ? parsed.entries : [];
    return { entries };
  } catch {
    return { entries: [] };
  }
}

async function writeWebsiteRatings(store: RatingsStore): Promise<void> {
  await fs.mkdir(RATINGS_DIR, { recursive: true });
  const tempPath = `${RATINGS_FILE}.${Date.now()}.tmp`;
  await fs.writeFile(tempPath, JSON.stringify(store, null, 2), 'utf-8');
  await fs.rename(tempPath, RATINGS_FILE);
}

function summarizeWebsiteRatings(entries: WebsiteRatingEntry[]) {
  const totalCount = entries.length;
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  let sum = 0;
  for (const entry of entries) {
    const star = Math.min(5, Math.max(1, Math.round(entry.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[star] += 1;
    sum += star;
  }

  const averageRating = totalCount > 0 ? Number((sum / totalCount).toFixed(1)) : null;

  return {
    averageRating,
    totalCount,
    distribution,
    entries: [...entries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 12),
  };
}

async function queryPlacesSearchText(textQuery: string, apiKey: string) {
  const endpoint = 'https://places.googleapis.com/v1/places:searchText';
  const fieldMask = [
    'places.id',
    'places.displayName',
    'places.formattedAddress',
    'places.rating',
    'places.userRatingCount',
    'places.googleMapsUri',
    'places.googleMapsLinks',
    'places.reviews',
  ].join(',');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fieldMask,
      'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio',
    },
    body: JSON.stringify({
      textQuery,
      regionCode: 'IN',
      languageCode: 'en',
      pageSize: 3,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    let parsedError: { error?: { status?: string; message?: string } } | null = null;
    try {
      parsedError = JSON.parse(text);
    } catch {
      parsedError = null;
    }

    const statusCode = response.status;
    const apiStatus = parsedError?.error?.status || '';
    const message = parsedError?.error?.message || text || `HTTP ${statusCode}`;

    const err = new Error(message) as Error & {
      statusCode?: number;
      apiStatus?: string;
    };
    err.statusCode = statusCode;
    err.apiStatus = apiStatus;
    throw err;
  }

  const data = (await response.json()) as { places?: GooglePlaceResponseItem[] };
  return Array.isArray(data.places) ? data.places : [];
}

function pickBestMatchingPlace(places: GooglePlaceResponseItem[]): GooglePlaceResponseItem | null {
  if (places.length === 0) return null;
  const preferred = places.find((p) => {
    const name = (p.displayName?.text || '').toLowerCase();
    return name.includes('krishna') && (name.includes('pannai') || name.includes('paal'));
  });
  return preferred || places[0];
}

export async function createApp() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/maps-config', (_req: Request, res: Response) => {
    const clientApiKey = (process.env.VITE_GOOGLE_MAPS_API_KEY || '').trim();
    const serverApiKey = getMapsApiKey();
    res.json({
      mapsEnabled: Boolean(serverApiKey),
      hasClientSdkKey: Boolean(clientApiKey),
    });
  });

  app.get('/api/google-rating', async (req: Request, res: Response) => {
    const forceRefresh = req.query.refresh === '1';
    const apiKey = getMapsApiKey();

    if (!apiKey) {
      res.json({
        available: false,
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
        message: 'Google Maps API key is not configured yet.',
      } satisfies GoogleRatingPayload);
      return;
    }

    if (!forceRefresh && memoryCache && memoryCache.expiresAt > Date.now()) {
      res.json(memoryCache.payload);
      return;
    }

    try {
      const queries = [
        'Sri Krishna Pannai Paal, Peddureddipatti, Uppathur Road, Mulliseval, Sattur, Tamil Nadu 626205',
        'Sri Krishna Paal Pannai, Sattur, Tamil Nadu',
      ];

      let matchedPlace: GooglePlaceResponseItem | null = null;
      for (const query of queries) {
        const candidates = await queryPlacesSearchText(query, apiKey);
        matchedPlace = pickBestMatchingPlace(candidates);
        if (matchedPlace) break;
      }

      if (!matchedPlace) {
        const notFoundPayload: GoogleRatingPayload = {
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
        };
        res.json(notFoundPayload);
        return;
      }

      const placeId = matchedPlace.id || null;
      const writeAReviewUri =
        matchedPlace.googleMapsLinks?.writeAReviewUri ||
        (placeId
          ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`
          : null);

      const reviews: NormalizedGoogleReview[] = (matchedPlace.reviews || [])
        .slice(0, 4)
        .map((review, index) => ({
          id: review.name || `review-${index}`,
          rating: typeof review.rating === 'number' ? review.rating : 0,
          text: review.text?.text || review.originalText?.text || '',
          relativeTime: review.relativePublishTimeDescription || '',
          googleMapsUri: review.googleMapsUri || matchedPlace?.googleMapsUri || '',
          authorName: review.authorAttribution?.displayName || 'Google Reviewer',
          authorUri: review.authorAttribution?.uri || '',
          authorPhotoUri: review.authorAttribution?.photoUri || '',
        }))
        .filter((item) => item.rating > 0 || item.text.length > 0);

      const payload: GoogleRatingPayload = {
        available: true,
        found: true,
        placeId,
        displayName: matchedPlace.displayName?.text || null,
        formattedAddress: matchedPlace.formattedAddress || null,
        rating: typeof matchedPlace.rating === 'number' ? matchedPlace.rating : null,
        userRatingCount:
          typeof matchedPlace.userRatingCount === 'number' ? matchedPlace.userRatingCount : null,
        googleMapsUri:
          matchedPlace.googleMapsLinks?.placeUri || matchedPlace.googleMapsUri || null,
        reviewsUri:
          matchedPlace.googleMapsLinks?.reviewsUri || matchedPlace.googleMapsUri || null,
        writeAReviewUri,
        reviews,
        fetchedAt: new Date().toISOString(),
      };

      memoryCache = {
        expiresAt: Date.now() + 60_000,
        payload,
      };

      res.json(payload);
    } catch (err) {
      const errorObj = err as Error & { statusCode?: number; apiStatus?: string };
      const isQuota =
        errorObj.statusCode === 429 || errorObj.apiStatus === 'RESOURCE_EXHAUSTED';

      if (isQuota) {
        res.status(429).json({
          quotaExceeded: true,
          errorStatus: 'RESOURCE_EXHAUSTED',
          message: 'Google Places API quota reached.',
        });
        return;
      }

      res.status(errorObj.statusCode && errorObj.statusCode >= 400 ? errorObj.statusCode : 500).json({
        quotaExceeded: false,
        errorStatus: errorObj.apiStatus || 'PLACES_ERROR',
        message: errorObj.message || 'Unable to load live Google rating.',
      });
    }
  });

  app.get('/api/website-ratings', async (_req: Request, res: Response) => {
    const store = await readWebsiteRatings();
    res.json(summarizeWebsiteRatings(store.entries));
  });

  app.post('/api/website-ratings', async (req: Request, res: Response) => {
    const body = req.body as {
      rating?: unknown;
      authorName?: unknown;
      comment?: unknown;
    };

    const numericRating = Number(body?.rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      res.status(400).json({ error: 'Please select a star rating from 1 to 5.' });
      return;
    }

    const rawName = typeof body?.authorName === 'string' ? body.authorName.trim() : '';
    const authorName = rawName.slice(0, 60) || 'Verified Site Visitor';
    const rawComment = typeof body?.comment === 'string' ? body.comment.trim() : '';
    const comment = rawComment.slice(0, 400);

    const store = await readWebsiteRatings();
    const newEntry: WebsiteRatingEntry = {
      id: `site-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      rating: numericRating,
      authorName,
      comment,
      createdAt: new Date().toISOString(),
    };

    store.entries.push(newEntry);
    await writeWebsiteRatings(store);

    res.status(201).json({
      submitted: newEntry,
      summary: summarizeWebsiteRatings(store.entries),
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  return app;
}

async function startServer() {
  const app = await createApp();
  app.listen(PORT, '0.0.0.0', () => {
    const url = `http://localhost:${PORT}`;
    console.log(`Server listening on ${url}`);

    if (process.platform === 'win32' && process.env.npm_lifecycle_event === 'dev') {
      const browser = spawn('cmd.exe', ['/c', 'start', '', 'msedge', url], {
        detached: true,
        stdio: 'ignore',
        windowsHide: true,
      });
      browser.on('error', (error) => {
        console.warn('Could not open Microsoft Edge automatically:', error.message);
      });
      browser.unref();
    }
  });
}

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
