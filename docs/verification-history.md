# Raman Ahalawat — portfolio

A responsive React/Vite portfolio using the extracted Sahor design language and Raman's résumé content.

## Preview

`npm install`

`npm run dev -- --host 127.0.0.1 --port 4173 --strictPort`

Production build: `npm run build`.

## Design and content

- Source direction: https://sahor.work/ — large Instrument Serif/Bricolage wordmark, three-column guide lines, small Inter labels, dark asymmetric work gallery, outlined headings, and contact composition.
- Structure: hero, contribution city, introduction, selected work, about, contact, footer.
- Macintosh, grass, phone artwork, and their long scroll scenes are intentionally omitted.
- Content source: `C:\Users\samee\Downloads\Raman_Ahalawat_Resume.pdf`.
- Six entries comprise three personal projects and three engineering initiatives at GoKhana. The detail panels identify which is which.
- Project covers are original editorial typography. They are not screenshots of shipped products. Replace them with approved real project media when available.
- Fonts and résumé are served locally. No reference-site assets are hotlinked.

## Features

- Category filters and grid/list views, persisted in URL query parameters.
- Project dialogs with native modal focus management, Escape dismissal, and focus return.
- Responsive layout with a simplified mobile header and work controls.
- Résumé download, LinkedIn/LeetCode links, email copying, and contact draft creation.
- Contact form validates input and opens a prefilled mailto draft in the visitor's email client. It does not send email through a server.
- Reduced-motion CSS and readable content without entrance-animation completion.
- Three.js contribution city with one square building per active day: GitHub-only green, LeetCode-only yellow, both blue. The settled calendar groups its heading, labels, filters and totals closely around the cells. Day details appear on hover or tap, with roving keyboard focus, arrow keys, Home/End and Escape; there is no day slider. Source filtering and 13-week/year ranges remain available.
- Seeded random sample activity, clearly labeled and not connected to real profile APIs.
- GSAP/ScrollTrigger city-to-calendar motion, sequenced typography, a curved transition into Work, project reveals, and animated filters. Main navigation labels are static; rolling labels remain on other actions. Selected and Work stay stationary within their section during scroll, while Work retains its pointer effect. Keyboard focus feedback, touch-visible project actions, and reduced-motion fallbacks accompany the layout. Scene renders are requested only on updates, not in a perpetual animation loop.
- React Bits TechText adds a letter-level hover treatment to italic `raman`, `.dev` and Work, while native text retains layout and accessible semantics. Canvas font-style propagation preserves Instrument Serif italic. Touch, reduced-motion and rendering-failure cases keep native text. Source and the full MIT + Commons Clause notice are retained in `src/TechText.jsx` and `src/TechText.LICENSE.md`; local integration notes are in `.taste-skill/tech-text/integration.md`.
- Lenis smooths native wheel scrolling in GSAP's frame loop, preserving the sticky city and native touch input. Anchor navigation keeps history and focus, keyboard input interrupts easing, and project dialogs scroll independently. Main paragraphs use responsive GSAP SplitText line reveals with exact native typography and reduced-motion restoration.
- The supplied magnetic cursor is adapted to JavaScript without the vector-library dependency. It follows the mouse and expands around selected links, preserving their hitboxes. Touch, reduced motion, text selection, fields, dialogs and calendar days retain native cursor behavior. It sleeps when settled.
- The post-project close is concise: one About sentence, the experience/education timeline, then “Let’s Talk” above the Contact prompt, direct email and form. Social links follow the form.
- Outlined section headings have stronger 1.5px strokes. The phone city opens on a close crop with consistent building scale in both date ranges, then resolves into the same frame-aligned calendar.
- Below 600px, the hero follows the page's thirds: large italic `raman` spans the frame, services fill the first column and `.dev` fills the last two. The role/résumé span two columns, with location in the third. Flexible rows preserve readability on short phones, while the close city enters near the lower-third boundary on typical tall phones. Role/location/résumé notes sit in the hero at 809px and below, and beneath the Introduction paragraph at 810px and above. Only the visible variant receives paragraph reveals or appears in the accessibility tree. The Introduction's white gradient hides the grid behind its text; it has no Explore link. About contains only its short paragraph and timeline, without the repeated identity block.

## Cloudflare preview

Current temporary URL: https://filter-insert-steady-widespread.trycloudflare.com

The tunnel points to the production Vite preview on `127.0.0.1:4174`. The development server remains on port 4173. Only the compiled `dist/client` application is served by the preview.

This quick tunnel remains available while the local preview and cloudflared processes are running. Its address is temporary and will normally change on restart.

Cloudflared was downloaded from the official Cloudflare GitHub release to `.tools/cloudflared.exe` (ignored by Git). To recreate the preview after stopping it, build, run `npm run preview`, and run `.tools/cloudflared.exe tunnel --url http://127.0.0.1:4174 --no-autoupdate`.

Activity data checks: `node --test tests/activity.test.mjs`.

## Editing

`src/Portfolio.jsx` holds content, project data, interactions, and typographic covers.

`src/portfolio.css` holds the design tokens and responsive layouts.

`public/Raman_Ahalawat_Resume.pdf` is the downloadable résumé. `public/fonts/` contains the three font files.

## Validation

Latest startup/filter/spacing refinement: `.taste-skill/startup-checks/`, `.taste-skill/filter-controls/` and `.taste-skill/startup-layout-final/`. Font preloading and a grid-draw/text-rise sequence prevent visible font reflow; slow font/scene fallbacks remain stable. Both is a working shared-activity filter, the short range reads “3 months,” Work has more space, and About/Let’s Talk are smaller. Final build and all nine tests pass. Browser checks cover slow/failing loads, anchors, reduced motion, mobile, filter colors, keyboard access and exact calendar alignment. The official generic audit still reports 8 FAIL / 8 WARN; the subsequent fallback fixes have separate focused confirmation.

Latest Introduction alignment refinement: `.taste-skill/intro-width-checks/after/`. The desktop paragraph and details row share matching outer edges and a 48px gap at 1440, 1169 and 810px. The 390px phone hero remains unchanged. Normal/reduced-motion, text wrapping, reveal masks and overflow checks pass, as do the build and all eight existing tests. This focused check does not replace the documented full-audit findings below.

Latest Contact/spacing refinement: `.taste-skill/contact-heading-checks/`, `.taste-skill/contact-space-final/` and `.taste-skill/mobile-thirds/with-space/`. The Contact heading precedes the details/form in DOM and visual order at desktop and phone widths, including reduced motion. Keyboard navigation and invalid-form validation pass without launching email. The phone hero has 36px more vertical breathing room while retaining the thirds grid. Build and all eight tests pass; final generic audit counts remain 8 FAIL / 8 WARN, with zero measured overflow or collected errors. The eyebrow detector's sampled text changes after the reorder; details remain in the final critique.

Latest phone thirds refinement: `.taste-skill/mobile-thirds/`, `.taste-skill/mobile-thirds-checks/` and `.taste-skill/mobile-thirds-final/`. Seven focused layout captures and eleven interaction checks cover the thirds grid, narrow/short phones, heading ink, paragraph masks, breakpoint changes, native fallbacks and calendar alignment after resizing. Build and all eight tests pass. The official inspector remains at 8 FAIL / 8 WARN with zero measured overflow and zero collected errors; the custom city retains the scenes tool's two known marker findings. Final visual review includes every inspector image and the scene/reduced-motion sheets.

Latest navigation/mobile-hero refinement: `.taste-skill/mobile-hero-final/`, `.taste-skill/mobile-hero-polish/` and `.taste-skill/static-heading-checks/`. Main navigation labels are static and all anchors work; Selected/Work remain stationary within their section during scroll. Repeated 809/810px changes preserve one visible, correctly animated details block. Desktop-calendar-to-phone resizing no longer leaves an oversized hidden hit grid; both ranges align exactly with the phone frame, including reduced motion. Build and all eight tests pass. Final raw inspector: 8 FAIL / 8 WARN, with zero fresh-viewport overflow and zero collected console errors. Existing reference-style/media limitations remain.

Latest hero/introduction refinement: `.taste-skill/hero-intro-final/`, `.taste-skill/hero-intro-refinement/` and `.taste-skill/raman-techtext/`. Layout was checked at 1440, 768, 390 and 320px. The italic effect preserves native dimensions/baseline and clear glyph padding; hover, resize, idle sleep and native fallbacks were verified. The user-requested white gradient is an explicit design-policy exception.

Latest phone/contrast refinement: `.taste-skill/mobile-city-closeup/`, `.taste-skill/outline-contrast/` and `.taste-skill/mobile-contrast-final/`. Both phone range endpoints align exactly with the frame; reduced motion and desktop-to-phone resizing pass. The desktop opening is unchanged. Final heading renders preserve fonts and completed paragraph reveals.

Latest copy reduction: `.taste-skill/shorter-copy/` and `city-scroll-review.md`. About and Contact text is shorter; résumé, timeline, contact controls and paragraph reveals remain. Supplied-cursor verification is in `.taste-skill/magnetic-cursor/`, with 35 checks passing and no runtime errors.

Latest smooth-scrolling and paragraph pass: `.taste-skill/smooth-paragraph-final/`, `.taste-skill/paragraph-motion/`, and `city-scroll-review.md`. Native/animated paragraph dimensions match at 1440 and 390px. Resize, reduced-motion restoration, dialog scrolling, anchor focus/history and keyboard interruption were checked. All twelve final desktop/tablet/phone images were reviewed; existing generic 8 FAIL / 9 WARN findings remain.

Latest calendar/heading refinement: `city-scroll-review.md` and `.taste-skill/city-hover-final/critique.md`. Production renders at 1440, 768 and 390px, reduced-motion desktop/phone checks and a renderer-disabled static fallback are saved in `.taste-skill/city-hover-final/` and `.taste-skill/city-reduced-final/`. Build and all eight tests pass. The generic inspector retains 8 FAIL / 9 WARN findings; this is not a clean generic audit.

Latest motion and spacing refinement: `city-scroll-review.md` and `.taste-skill/motion-refinement-final/critique.md`. Browser renders at 1440, 768 and 390px, plus a static reduced-motion desktop review, are saved beside the critique and in `.taste-skill/motion-refinement-reduced/`. The tablet gallery uses two staggered columns. The generic inspector still reports 8 FAIL / 9 WARN findings; this is not a clean generic audit.

Latest section and camera update: `city-scroll-review.md`. The page now opens with hero → scroll-driven city/calendar → introduction. Month labels appear at the top-down endpoint; reduced motion opens directly on the flat calendar.

Earlier review: `taste-motion-review.md` documents previous motion decisions; its cursor-removal advice is superseded by the user's supplied magnetic cursor request. The city now uses plain blocks with four fixed activity bands per source. `src/cityScene.js` owns the asynchronously loaded WebGL renderer; `src/ContributionCity.jsx` owns its controls and GSAP lifecycle.

See `design-qa.md`. Browser checks covered desktop, tablet, mobile, filter/list combinations, dialogs, focus return, copy feedback, and form validation. The final production build passes. Mail-client launch and actual delivery depend on the visitor's device and were not exercised with a real message.

The generic taste-skill lint flags the requested rules, grid lines, Inter, outlined/mixed typography, and text treatment. These design-policy flags are intentionally superseded by the user's explicit Sahor reference; this project does not claim a clean generic taste-skill lint run.
