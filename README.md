<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Sri Krishna Pannai Paal

## Run locally

**Prerequisite:** Node.js

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Open `http://localhost:3000`. On Windows, the dev server opens Microsoft Edge automatically.

## Deploy to GitHub and Vercel

1. Push this project to a GitHub repository. Do not commit `.env` files or API keys.
2. In Vercel, choose **Add New → Project** and import the GitHub repository.
3. Keep the project root as the repository root. Vercel uses `npm run build` and the `dist` output directory; API endpoints are served by the function in `api/[...path].ts`.
4. If live Google ratings are needed, add `GOOGLE_MAPS_API_KEY` in the Vercel project’s Environment Variables. Add `VITE_GOOGLE_MAPS_API_KEY` only if the browser-side Google Maps SDK is used. Redeploy after setting variables.

Website feedback is currently stored in `data/website-ratings.json`. Vercel’s serverless filesystem is not persistent, so feedback submissions will not be durable after deployment until a persistent database is connected.
