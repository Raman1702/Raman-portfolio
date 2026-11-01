# Taste and GSAP review — 1 November 2026

Applied design-taste-frontend plus GSAP core, React, ScrollTrigger and performance guidance. The user's Sahor reference takes precedence over generic bans on rules and mixed typography. The later request for plain activity-colored blocks is included.

## ROUND 1
Seen in one second: the oversized raman.dev wordmark.
Idea (one sentence): an editorial engineering portfolio with a daily activity skyline.
Live thing: select a day, filter contribution sources, explore project details.
Layout words by section: hero=statement / activity=landscape / work=staggered gallery / about=split / contact=typographic form.
Scores: design 6.5 · usability 6 · creativity 7 · content 7 → overall 6.0 (capped).
Caps applied: inspector FAILs; no real project pictures; header overlaps content. Requested grid rules and mixed fonts are intentional exceptions to the generic style policy.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Transparent fixed header overlays text and covers in `.taste-skill/before/mobile-page-01.jpg` and `desktop-film-01.jpg`. Return it to the top of the document and remove the custom cursor.
2. Small and faint activity labels in `before/mobile-page-01.jpg`. Raise readable labels to at least 13px and darken secondary city text.
3. Gray gradient-filled introduction in `before/mobile-page-01.jpg`; oversized entrance movements in the film. Use solid ink, shorten entrances, animate transforms instead of the text-fill variable.

## ROUND 2
Seen in one second: the same wordmark, now readable during its entrance.
Idea (one sentence): a quiet typographic portfolio with one interactive landscape.
Live thing: the contribution city and project controls.
Layout words by section: hero=statement / activity=landscape / work=staggered gallery / about=split / contact=typographic form.
Scores: design 6.5 · usability 8 · creativity 7 · content 7 → overall 6.0 (capped; arithmetic 7.1).
Caps applied: strict inspector still flags intentional or heuristic design conflicts; lack of real project media remains a design limitation.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Small windows make the skyline busier than the user's desired minimal treatment, visible in `.taste-skill/after/desktop-page-01.jpg`. Remove window instances and separate roof caps; use four activity-driven green/yellow bands on plain blocks.
2. The enlarged email wraps its final letter in `after/mobile-page-01.jpg`. Add a preferred break before the domain.
3. Typographic covers substitute for actual project media, visible in `after/desktop-page-02.jpg`. Retain honest editorial covers for this scope; approved project screenshots would improve the portfolio's evidence.

## ROUND 3
Seen in one second: the wordmark; the second screen is a clean field of green and yellow blocks.
Idea (one sentence): an editorial engineering portfolio with activity expressed through block height and shade.
Live thing: source filtering and day navigation on real 3D geometry.
Layout words by section: hero=statement / activity=landscape / work=staggered gallery / about=split / contact=typographic form.
Scores: design 6.5 · usability 8 · creativity 7 · content 7 → overall 6.0 (capped; below 7.5).
Caps applied: the final raw inspector retains 8 FAIL and 7 WARN findings, mainly the documented design exceptions and missing real media. It reports zero horizontal overflow, 20 moving DOM elements and no collected console errors at all three widths.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Project media is still typographic illustration, visible in `.taste-skill/final/desktop-page-01.jpg`. Future improvement: use approved actual project images.
2. Work overlays the decorative Selected word in `final/mobile-page-01.jpg`. Retained as part of the requested reference composition; the functional Work heading remains legible.
3. Tablet body copy has a wide measure (machine warning in `final/report.json`). A future editorial pass can narrow it while reconsidering the reference grid; no clipping was measured.

The requested plain-block city and email wrap are resolved in the final desktop/mobile screenshots. Stop after this third review round; do not claim a clean generic taste pass.

## Motion and performance changes

- Hero uses three groups and settles within 0.85 seconds; its initial opacity is 0.65 instead of zero.
- Entrances move 12–32px, generally over 0.65–0.8 seconds. Project lists enter horizontally; grid cards rise slightly.
- Horizontal drift only targets the decorative Selected word, avoiding competing transforms on About and Contact reveals.
- GSAP work is scoped through useGSAP; filter/range changes revert old contexts. Reduced-motion styles keep text readable, and the city explicitly restores full height and requests a render when reduced motion becomes active.
- Three.js loads in a separate asynchronous module. Main JavaScript is about 336kB (115kB gzip); the separate renderer module is about 528kB (132kB gzip). This reduces the initial main bundle, not the total download. Vite still warns about the renderer chunk's size.
- City renders remain on demand. Pointer picking is coalesced to animation frames, and disposal cancels pending work and releases geometry/materials/renderer resources.
- No free orbit/zoom controls were added. The city is real WebGL geometry with an orthographic camera, lighting, raycasting and GSAP scale/rotation animation.

## Validation and remaining limits

The official taste inspector ran at 1440, 768 and 390px, including its reduced-motion first-screen check. The second pass measured zero horizontal overflow and 20 moving DOM elements at each width. It reported 8 FAIL and 7 WARN findings; raw results remain in `.taste-skill/after/report.json` without suppressions.

Remaining flags include the deliberate three-line cover artwork, requested grid rules, mixed fonts, absence of photos/video, the cream/orange cover pairing, and the intentional Work/Selected title overlap. The email-client explanation is misclassified as an eyebrow above the footer title; it stays because it explains the form's real behavior. Type-scale and tablet paragraph-measure warnings remain. This is not an unconditional taste-skill pass or a 7.5+ jury score.

Final production screenshots and machine findings are in `.taste-skill/final/`. The final build passes; both deterministic activity data tests pass. Public-browser checks confirmed the plain city, yellow-only filtering and next-day selection. Reduced-motion first-load coverage is automated; live OS-preference switching of the city was reviewed in code, not interactively emulated.

The shared Cloudflare preview continues to serve the compiled production build. Activity is illustrative seeded data, not real profile statistics.
