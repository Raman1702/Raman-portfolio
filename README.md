# Raman Ahalawat — portfolio

A responsive portfolio built with React, Vite, GSAP and Three.js. The visual direction is inspired by [Sahor](https://sahor.work/): oversized typography, a visible three-column grid, a contribution city, and a staggered project gallery.

## Run locally

Use Node.js **22.12 or newer** and npm.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

Open http://127.0.0.1:4173/.

## Production preview

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:4174/. The build produces the web app in `dist/client`, plus `dist/server/index.js` and `dist/.openai/hosting.json` for the existing Sites deployment adapter. Starting a local preview does not publish the site.

## Checks

```sh
node --test tests/activity.test.mjs tests/sites-worker.test.mjs
```

The tests cover deterministic activity, All/Both filter semantics, calendar geometry and the Sites worker. Browser verification and design decisions are recorded in [city-scroll-review.md](city-scroll-review.md).

## Features

- Font preloading, drawn grid lines and a coordinated upward text reveal, with stable slow-load fallbacks.
- A contribution city that scrolls into an interactive calendar, with source filters, 3-month/year ranges, hover/tap details and keyboard navigation.
- Project category filters, grid/list layouts and accessible detail dialogs.
- Responsive typography and layouts, smooth desktop scrolling and reduced-motion fallbacks.
- Downloadable résumé, email copying, social links and a contact form that opens an email draft.

## Content notes

- Contribution data is **deterministic sample data**, not live GitHub or LeetCode activity. The 3-month view uses the existing 91-day window.
- The six project entries comprise three personal projects and three GoKhana engineering initiatives. Covers are original editorial designs, not screenshots of shipped applications.
- The contact form validates input and opens a `mailto:` draft in the visitor's email app. There is no email-delivery backend.
- Fonts and the résumé are served locally from `public/`.

## Project map

| Path | Purpose |
| --- | --- |
| `src/Portfolio.jsx` | Content, project cards, dialogs and contact form |
| `src/portfolio.css` | Layout, typography and responsive styles |
| `src/ContributionCity.jsx`, `src/cityScene.js` | Calendar controls and Three.js renderer |
| `src/activityData.js` | Deterministic activity and source filtering |
| `src/useStartup.js`, `src/usePortfolioMotion.js` | Startup, GSAP reveals and project transitions |
| `src/useSmoothScroll.js` | Desktop scrolling and anchor behavior |
| `public/fonts/` | Local fonts and their license notices |
| `worker/`, `scripts/`, `.openai/` | Existing Sites build/deployment support |
| `tests/` | Activity and worker tests |

## Continuing the design

Read [AGENTS.md](AGENTS.md) and [city-scroll-review.md](city-scroll-review.md) before changing the interface. They preserve the accepted reference style, responsive behavior and verification limitations.

Earlier local notes are retained in [docs/verification-history.md](docs/verification-history.md). Screenshot reports under `.taste-skill/`, local utilities, dependencies and generated builds are intentionally ignored. Historical notes can refer to those local-only artifacts or temporary preview URLs. The existing generic design-audit findings remain documented; this repository does not claim a clean generic audit.

## Third-party notices

The locally served fonts retain their official [SIL Open Font License notices](public/fonts/licenses/). React Bits TechText retains its source attribution and [MIT + Commons Clause license](src/TechText.LICENSE.md). Those terms apply to that component; the repository is not represented as uniformly MIT-licensed.
