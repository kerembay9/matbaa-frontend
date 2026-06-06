# Simge Matbaa — Frontend

Standalone static frontend for the Simge Matbaa print shop (React SPA, no build step).

## Contents

- `index.html` — entry point
- `*.jsx` — React components (loaded via Babel in the browser)
- `*.css` — design system, page styles, hero animation

Connected to the shared backend at `webdeploy.horizonzeta.com` (tenant: `simge-matbaa`). Cart, catalog, and checkout use REST APIs with `x-tenant-id` + `x-cart-session` headers.

Hardcoded in `config.js`:
- `API_BASE`: `https://webdeploy.horizonzeta.com`
- `TENANT_ID`: `simge-matbaa`
- Frontend URL: `https://simge-matbaa.netlify.app` (allowed CORS origin on backend)

## Local preview

```bash
npx serve .
# or
python3 -m http.server 8080
```

Open `http://localhost:8080` (or the port shown).

## Deploy

Upload all files in this folder to any static host (Netlify, Vercel, nginx, S3, etc.). No build required — serve `index.html` at the site root.

Netlify: drag-and-drop this folder, or connect this repo with publish directory `.`.
