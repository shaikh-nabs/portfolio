# nabeel.dev

Personal portfolio of **Shaikh Nabeel**, Flutter developer. Single-page site built with React, Vite and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Editing content

Everything on the page (experience, projects, Play Store links, socials, education) lives in `src/data.js`.

### Adding real app icons

Each app shows a coloured monogram tile until you add its icon:

1. Save the icon as a square PNG in `public/apps/`, e.g. `public/apps/propkee.png`.
2. In `src/data.js`, set `icon: '/apps/propkee.png'` on that app.

## Deploy

The build is a static site, so any static host works:

- **Vercel / Netlify:** import the repo. The framework preset is Vite, the build command is `npm run build` and the output directory is `dist`.
- **GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every push to `main`. One-time setup: in the repo go to **Settings → Pages** and set **Source** to **GitHub Actions**. The site is then served at `https://shaikh-nabs.github.io/portfolio/`.
