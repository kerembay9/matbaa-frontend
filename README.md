# Bayramoğlu Matbaa — Frontend

Standalone static frontend for the Bayramoğlu Matbaa print shop (React SPA, no build step).

## Contents

- `index.html` — entry point
- `*.jsx` — React components (loaded via Babel in the browser)
- `*.css` — design system, page styles, hero animation

Cart and checkout use browser `localStorage` (prototype/demo). For live e-commerce with Postgres cart and payment, use the `ecommerce-template` app with `themeId=matbaa`.

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
