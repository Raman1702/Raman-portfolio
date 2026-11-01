# City scroll design review — 1 November 2026

## Latest refinement: stable startup, working Both filter and more Work space

The three local fonts are preloaded from the document head. The existing grid draws in while font metrics and the city's first painted frame settle, then the page crossfades in and the wordmark rises through masks. Supporting text follows upward; existing paragraph line reveals now initialize after startup readiness. A reserved scrollbar gutter prevents the frame shifting when the page mounts. Reduced motion skips the draw and text travel. Direct section links are repaired after layout only on fresh navigation; user input, reload and history restoration are respected.

Unready fonts use a committed fallback after three seconds rather than swapping later. Georgia's wider fallback wordmark is fitted to narrow phones. A city chunk arriving after 3.5 seconds leaves the existing static calendar in place, preventing a late scene pop. Initial checks covered thirteen cold/cached, delayed/failed-font, reduced-motion, anchor, interruption and failed-scene cases. Focused follow-ups verified actual draw completion, reduced-motion deep links and exact reload position retention. Four final-build cases cover normal desktop/phone, blocked fonts at 320px and a 4.6-second delayed city. All have stable visible geometry, no positive overflow, zero post-visible layout shift and no collected runtime exceptions. Evidence: `.taste-skill/startup-checks/README.md`.

The activity heading is “My contributions”; “3 months” labels the existing 91-day range. Both was previously a passive legend and is now a native filter button: it shows only dates with both platform counts, colored blue. All retains any active day, and the individual platform filters retain their prior behavior. Five activity tests and eighteen browser states pass, including exact per-cell palette comparisons, range persistence, frame alignment, mobile wrapping, tooltip/keyboard behavior and WebGL fallback. Both shows 111 Year dates / 33 short-range dates, compared with All's 300 / 77. Evidence: `.taste-skill/filter-controls/`.

Work has more space around its toolbar and project cards: 32px above the desktop controls, 28px vertical padding, and 64px before the gallery (24px / 22px / 48–56px on smaller screens). About and Let’s Talk are about 15% smaller, preserving outline contrast and the Contact heading-first order. All ten official images and nine focused Work/About/Contact images were reviewed at 1440, 768 and 390px. No new visual regression was found. The official run on `index-sdTypSIp.js` retains 8 FAIL / 8 WARN; the later fallback/gutter refinements were checked separately on `index-BjG39Y_f.js`. This is not a clean generic audit. Existing project-media/style findings and the Three.js chunk-size warning remain.

Final production build and all nine activity/Sites tests pass. Existing dev/preview/tunnel processes were reused, and the public preview was refreshed to `index-BjG39Y_f.js`. Final layout critique: `.taste-skill/startup-layout-final/critique.md`.

## Latest refinement: aligned Introduction details

The desktop role/location/résumé row now shares the Introduction paragraph's centered 72% width. Both outside edges match exactly, retaining the existing 48px vertical gap. The phone hero details keep their established thirds composition and spacing.

Focused production checks at 1440, 1169, 810 and 390px pass with normal and reduced motion: matching desktop edges, readable résumé, completed/unclipped paragraph reveals, one visible details variant, native reduced-motion text, zero horizontal overflow and zero collected runtime errors. Desktop, narrow desktop and phone captures were opened for visual review. Evidence: `.taste-skill/intro-width-checks/after/`.

Build and all eight existing tests pass. The running dev/preview processes were reused, and the public tab was refreshed to `index-Cm0CYDu4.js`; its paragraph and details row both measure 623.15625px wide at the 1169px viewport with a native scrollbar. This was a focused alignment check, not a new full taste audit. The preceding 8 FAIL / 8 WARN baseline and Three.js chunk-size warning remain documented.

## Latest refinement: heading-first Contact and more mobile hero space

Moved the existing “Let’s Talk” h2 before the contact details and email form in the DOM. The heading now has a 56px bottom gap on desktop and 36px on mobile, replacing its previous overlapping/upper margin. The three-column desktop contact row and stacked phone form remain, with social links afterward. Existing scroll-triggered reveals follow the new geometry; no animation code or form behavior changed.

The user's additional request for more mobile hero space adds 12px above the wordmark, 12px between its shared grid rows and 12px below the details, for 36px more total height below 600px. The established thirds alignment and type sizes remain. The first phone tower now appears around y601 instead of y565 in the 390×844 fold; short phones keep complete readable details and still show the beginning of the city. Desktop/tablet hero dimensions are unchanged. Seven focused layouts were opened in `.taste-skill/mobile-thirds/with-space/`.

Contact checks pass at 1169, 390 and 320px, with motion and reduced motion: heading-first DOM/visual order, exact heading gaps, native keyboard order, required fields, malformed email and short-message validation. Invalid input caused no submit events or navigation. All seven contact screenshots were opened, with zero overflow or runtime exceptions. Evidence: `.taste-skill/contact-heading-checks/README.md`.

Production build and all eight existing tests pass; the existing servers were reused and the public tab refreshed to `index-D0faBvBD.js`. The official final inspection opened all ten images and an additional settled phone Introduction, with zero horizontal overflow and collected console errors at 1440, 768 and 390px. Raw counts remain 8 FAIL / 8 WARN, though the generic eyebrow detector now samples preceding résumé/timeline text instead of the desktop email-app note after the reorder. Existing reference-style/media limitations and Three.js chunk-size warning remain. This scoped layout update did not repeat the unchanged scene utility; the preceding full scene review is retained above. Final critique: `.taste-skill/contact-space-final/critique.md`.

## Latest refinement: rule of thirds on phones

Below 600px, the wordmark and supporting details now use the page's actual three-column frame. `raman` spans all three columns; the services occupy the first and the enlarged `.dev` begins at the first interior rule, spanning the last two. The role and résumé use two columns, while location begins at the second interior rule. At 390px, these edges are x16, x135.33, x254.67 and x374. Tablet/desktop retain their existing layouts and details placement.

A small `hero-lockup` wrapper shares grid rows between the wordmark and services through CSS subgrid. The first candidate used bottom alignment against the whole wordmark, which let wrapped labels overlap the name at 320px. Shared rows resolve that collision. Service text scales from 12–13px with an internal 8px gutter; body notes remain 13px. Spacing brings the city into the fold around y565 at 390×844, close to the lower-third boundary. Short phones retain flexible content height instead of forcing text into fixed viewport fractions. No camera, activity data or GSAP behavior changed.

All seven focused final layouts were opened at 320, 390, 430, 599, 768 and 1440px, including a 320×568 phone. Eleven focused checks pass: exact thirds alignment, TechText ink fit, completed paragraph masks, touch/reduced-motion fallbacks, 599/600 and 809/810 breakpoint crossings, and calendar alignment after resizing. All twelve interaction screenshots were reviewed. Evidence: `.taste-skill/mobile-thirds/critique.md` and `.taste-skill/mobile-thirds-checks/README.md`.

Final production build and all eight existing tests pass. The existing dev/preview processes were reused and the public tab refreshed to `index-B1PhEXCv.js` with `index-Rxhi8J0W.css`. All ten official inspector images, three scene sheets and a settled phone Introduction were opened. Final measurements remain 0px overflow and zero collected console errors at 1440, 768 and 390px. The raw inspector is unchanged at 8 FAIL / 8 WARN; the scenes utility retains its two known missing Stage/is-live marker findings for the custom city. Visual progression and reduced-motion content were reviewed directly. Existing generic audit and Three.js chunk-size limitations remain; see `.taste-skill/mobile-thirds-final/critique.md`.

## Latest refinement: static navigation and Work title, phone hero, desktop details

The four main navigation links now contain plain labels, removing the rolling hover/focus animation. Their anchors and magnetic cursor highlight remain functional. Selected and Work stay in place within the Work section during scrolling: the horizontal Selected drift and Work's vertical entrance were removed. The Work TechText pointer effect remains.

Below 600px, the hero now uses a larger two-line wordmark: italic `raman` above a right-aligned `.dev`, with the services to its left. The role/location/résumé notes sit beneath this composition, and the close city enters earlier in the opening screen. Desktop retains its single-line wordmark and three service columns. The latest feedback restores the details beneath the Introduction at 810px and above; they remain in the hero at 809px and below. One variant is visible and accessible at a time, and only that variant receives SplitText animation. This supersedes the previous all-breakpoint move into the hero.

Focused verification caught an existing calendar resize problem: after visiting the desktop endpoint, shrinking to phone could leave a hidden hit grid at the previous 1080px width. The scene now clears stale projected bounds when resizing in the city view, allowing frame-relative CSS fallbacks until the endpoint projects fresh bounds. The camera, zoom, orbit, scroll easing and vertical canvas overflow are unchanged. The original reproduction now has zero horizontal overflow; Year and 13-week endpoints both align exactly at the 16px and 374px frame lines on a 390px phone, including reduced motion and another desktop-to-phone resize.

Main navigation hover/focus and all four anchors pass; Selected/Work keep identical section-relative coordinates through a real wheel scroll. Responsive details pass repeated 809/810px crossings, with no stale masks on hidden content. Eight focused hero captures cover 320–1440px, a short phone, a fine-pointer phone and reduced motion. All ten final official images plus the settled phone Introduction were opened. Fresh 1440, 768 and 390px renders have zero horizontal overflow and no collected console errors. Evidence: `.taste-skill/mobile-hero-polish/`, `.taste-skill/static-heading-checks/` and `.taste-skill/mobile-hero-final/critique.md`.

Production build and all eight existing tests pass. Existing servers and tunnel were reused, and the public tab was refreshed to `index-BTTnVkLB.js` with `cityScene-CLfVRu9p.js`. The final raw inspector reports 8 FAIL / 8 WARN, including a long-pin sampling warning in addition to the prior 7 WARN result; the documented reference-style and project-media limitations remain. No clean generic audit is claimed. The existing Three.js chunk-size warning remains.

## Latest refinement: hero details, quiet introduction and full wordmark effect

Applied the user's browser comments by moving the complete role/location/résumé block from Introduction into the hero beneath the services. This supersedes the earlier decision to move it out of the hero. Removed About's repeated identity/location/résumé block and placed its short paragraph beside the experience timeline on desktop, stacked on phones. The Introduction now contains only its paragraph: the Explore selected work link and arrow are removed, including their unused CSS and GSAP selectors.

A white gradient covers the Introduction's grid lines behind the text and fades back into the paper/grid at the section edges. The overlay is non-interactive and sits below the content. This gradient is an explicit user request and overrides generic skill prohibitions. All other sections retain their grid rules.

Extended the existing React Bits TechText treatment to `raman`. Font style now propagates from native computed styles through canvas font loading, cache keys, measurement and drawing, preserving Instrument Serif italic. The native inline text continues to own dimensions and accessibility. Focused checks confirm exact native width, height and baseline, clear italic overhang padding, visible hover feedback without layout shifts, sleeping drawing loops, responsive resizing and native touch/reduced-motion/render-failure fallbacks. Existing `.dev` and Work effects continue to work; nine effect screenshots were opened.

Twelve focused layout screenshots were opened at 1440, 768, 390 and 320px, with the final four Introduction shots refreshed on production after removing Explore. Hero notes and résumé remain readable, large phone towers still enter the first viewport, the gradient covers all paragraph text, and About has no duplicate block. Zero horizontal overflow and zero runtime errors were collected. Evidence: `.taste-skill/hero-intro-refinement/`, `.taste-skill/raman-techtext/` and the official final review in `.taste-skill/hero-intro-final/`.

Production build and all eight existing tests pass. Existing dev/preview processes were reused. The public tab was refreshed and serves index-D5NS9Vvm.js. No city camera, calendar data or controls were changed in this pass. The existing Three.js chunk warning and generic audit limitations remain.

The final official inspector reports 8 FAIL / 7 WARN, with 0px horizontal overflow and zero collected console errors at 1440, 768 and 390px. All ten listed images were opened. Its phone sheet caught the last word during the intentional line reveal; the additional settled production screenshot confirms the entire paragraph is visible without clipping. Existing reference-style/media exceptions remain, alongside the explicitly requested white gradient. Final critique: `.taste-skill/hero-intro-final/critique.md`.

## Latest refinement: visible outlines and a close phone city

The user's browser comments identified faint outlined headings and a distant, thin city on phones. About and Let’s Talk now use a 1.5px #686868 outline; Selected uses the same width with a stronger white stroke on black. The first 1.25px pass improved contrast but produced fine broken-looking desktop edges, so the final pass increases the stroke to 1.5px. Typography, hollow letterforms and placement stay the same. Six final production heading captures were opened at 1440 and 390px; text and paragraph reveals are visible with no overflow or runtime errors.

The phone opening previously fitted the entire selected range before applying 1.9× zoom. That made Year especially distant. Below 600px, the opening camera now spans five world units, creating a very close crop with the same building scale for 13 weeks and Year. The existing 30-degree orbit, exponential scroll timing, vertical overflow and final calendar fit remain. Desktop keeps its 2.75× fitted opening; its focused before/after opening screenshots are byte-identical.

Focused camera verification covers the opening, midpoint and endpoint for both phone ranges, desktop, reduced motion and desktop-to-phone resizing. All fifteen after screenshots were opened. Both phone calendars and reduced-motion calendars have 0px left/right error against the page frame; controls switch between inert and interactive at the expected states. No horizontal overflow or runtime errors were collected. Evidence: `.taste-skill/mobile-city-closeup/` and `.taste-skill/outline-contrast/`. Production build and all eight tests pass. Final production assets are index-Dj2CZgfl.js and cityScene-CyxslYNE.js. The complete final-page inspection is saved in `.taste-skill/mobile-contrast-final/`; generic reference-style exceptions remain documented.

Final full-page review opened all twelve inspector images and three scene/reduced-motion sheets. All three viewport widths have 0px horizontal overflow and zero collected console errors. The raw inspector remains at 8 FAIL / 8 WARN; the scenes utility's two expected missing Stage/is-live marker findings remain for the custom city. The rendered transition and reduced-motion calendar were inspected directly. No new actionable clipping or layout regression was found, and no clean generic audit is claimed. The public browser was refreshed to the final bundle, and temporary viewport overrides were reset.

## Latest refinement: less text after projects

Reduced the three About paragraphs to one short sentence about GoKhana and personal AI projects. The identity block, résumé link and experience/education timeline remain. Contact now has one brief prompt; its duplicate invitation is removed, the visible email aligns with the first row, and the message label is shorter. Existing paragraph reveals adapt to the remaining text. The introduction and project detail content are unchanged.

Production build and all eight existing tests passed. The running dev/preview processes were reused, and the public preview served the rebuilt index-BBORp6XR.js bundle at this step. Desktop/tablet/phone renders and the inspector review are recorded in `.taste-skill/shorter-copy/`: 8 FAIL / 8 WARN, zero horizontal overflow and zero collected runtime errors. Existing reference-style exceptions and the Three.js chunk-size warning remain.

## Latest refinement: supplied magnetic cursor

Adapted the user's pasted MagneticCursor to the existing JavaScript/GSAP project, with simple numeric interpolation instead of an additional vector library. The 24px white exclusion cursor has restrained movement stretch and expands around selected navigation, résumé and contact links. Only inner rolling-label wrappers move slightly; click targets and their entrance transforms remain fixed. Wide social-link grid cells use the visible label's unshifted bounds, preventing oversized highlights and measurement feedback.

The effect is limited to fine mouse pointers with no reduced-motion preference. It starts hidden, sleeps once settled, and returns native cursor behavior for keyboard navigation, touch, text selection or dragging, editable controls, dialogs and the day grid. It retargets during native/Lenis scrolling and resize, and uses delegated events for dynamic links. Simple button/link clicks retain their hover feedback. Contexts, listeners, frame requests and label transforms are cleaned up on media changes or disable.

First focused visual checks caught mismatched corners from GSAP's border-radius shorthand parser during rectangle morphs. Elliptical radius is now assigned directly through CSS while transforms use quick setters. The resting circle resets its visually irrelevant rotation so its measured bounds settle to 24px. Light navigation, dark résumé and social-label screenshots are saved in `.taste-skill/magnetic-cursor/`, alongside native-field/calendar/touch/reduced-motion checks and idle-frame measurements. This is a focused cursor review; the full-page smooth-scroll/paragraph inspection and its existing generic findings are recorded below.

Final focused cursor verification passed 35 checks with zero runtime errors, including two project-dialog open/close cycles, resize under a stationary pointer, viewport leave/blur, and exact label-transform cleanup. Reports: `report.json` and `extra-report.json` in that folder.

## Latest refinement: smooth scrolling and paragraph animation

Added Lenis 1.3.27 to ease native wheel scrolling while keeping the existing CSS sticky city. It shares GSAP's frame loop, updates ScrollTrigger, leaves touch gestures native, and is destroyed for reduced motion. Same-page anchors preserve history, destination focus and scroll padding. Keyboard input interrupts active easing, including before an anchor's first animation frame. The project dialog pauses background motion while its own content remains scrollable.

The first verification exposed a conflict: ScrollTrigger had cached the old CSS smooth-scroll value and restored it inline during refresh. The base scroll behavior is now auto so only Lenis eases navigation. Temporary anchor focusability is retained until blur; immediate removal had blurred the destination. A stop/start reset fixes the pre-frame keyboard-interruption edge case.

Eight primary paragraphs now use GSAP SplitText masked line reveals rather than whole-block fades: the introduction, two role/location notes, three About paragraphs and two Contact paragraphs. They reveal from 105% vertical offset over 0.9 seconds, staggered by 0.11 seconds, starting at 83% of viewport height. Auto-splitting responds to font and width changes; completed text stays visible after resizing. Masks allow a small paint margin for italic glyphs without changing line boxes. Links, fields and dynamic status text stay unsplit, and overlapping parent fades were removed.

Focused checks found exactly 0px width/height difference between the eight completed paragraphs and native reduced-motion text at both 1440 and 390px. Fonts, leading and tracking match. Mid-reveal resize, completed resize and runtime restoration of exact original HTML/ARIA pass. Anchor focus, Back/Forward, early keyboard interruption, native touch and independent dialog scrolling pass. All eight existing tests pass. Twelve final desktop/tablet/phone fold/page/film images were opened; no new clipping or layout regression was found. The generic inspector remains at 8 FAIL / 9 WARN, and the Three.js chunk warning remains.

An existing GSAP limitation was reproduced with the new smooth-scroll hook disabled: changing the system reduced-motion preference while scrolled can return the document to its top during ScrollTrigger's media refresh. Native content and controls remain readable; this pass does not claim to repair that older scroll-position reset.

Evidence: `.taste-skill/smooth-paragraph-1/`, `.taste-skill/smooth-paragraph-final/`, and `.taste-skill/paragraph-motion/` (including actual timed reveal strips and native/animated measurements). During final checks the previous dev/preview/tunnel processes were no longer running. They were restarted on the same local ports; the replacement public URL is https://filter-insert-steady-widespread.trycloudflare.com/ and its HTML matches the rebuilt application.

## Latest refinement: compact calendar details and TechText

The user's latest screenshot replaces the large internal gaps around the settled calendar. The title now ends 60px above the cells, the month labels sit 28px above them, and the controls start 18px below. All three positions follow the camera's actual final projection. The opening camera, exponential travel, activity data, source colors, square footprints and introduction order are preserved. The full-width canvas uses the page's actual width, avoiding the horizontal scrollbar caused by `100vw` on browsers with non-overlay scrollbars. Fractional frame measurements keep the outside cell edges aligned with the page rules.

Removed the date slider and separate date-readout row. Transparent day buttons align with the flat cells and open a contained tooltip with date and platform counts. Hover, tap, arrow keys, Home/End, Escape and outside dismissal are supported, with one tab stop for the calendar. Day targets remain inert until the reveal completes. Range changes preserve the settled endpoint; source filters still control the same daily buildings. If WebGL cannot start, the buttons render the colored static calendar, and ScrollTrigger refreshes after the section height changes so later content remains reachable.

Imported the official React Bits TechText component directly into the existing Vite/CSS project. It is used only for `.dev` and the solid Work heading, with font-ready measurements preserving their native dimensions and baseline. Technical labels, guides, sweeping intros, dragging and extra effects are disabled. The effect sleeps after interaction settles and falls back to native text for touch, reduced motion or failed rendering. Full source attribution and the MIT + Commons Clause notice are retained.

Verification: production build and all eight tests passed. Existing dev/production/tunnel processes were reused, and public HTML matches the rebuilt assets. Desktop/tablet/phone inspector renders at 1440, 768 and 390px were visually reviewed; no new clipping or spacing regression was found. Native browser interactions checked day selection, arrow/Home/End/Escape keys, source filtering, both date ranges and reverse scrolling. Reduced-motion desktop/phone and WebGL-disabled fallback checks passed. The official scenes utility still reports generic Stage-marker failures for this custom component; its screenshots, rather than those markers, were used to inspect the city.

Evidence: `.taste-skill/city-hover-1/`, `.taste-skill/city-hover-final/`, `.taste-skill/city-reduced-final/`, and `.taste-skill/tech-text/`. The final inspector still reports 8 FAIL / 9 WARN; the established reference-style and editorial-cover limitations remain, as does Vite's Three.js chunk-size warning. No clean generic audit is claimed.

## Latest refinement: Sahor motion and interaction rhythm

Reviewed the live Sahor page and the existing portfolio before editing. Retained the current implementation, page grid, fonts, hero spacing and contribution-city composition. The reference's rolling navigation labels and curved black transition into Work informed this pass; no new random design direction was drawn.

- Sequenced the name, `.dev`, and individual service labels, then gave introduction details, work headings, project media/captions, about content and contact content their own entrance rhythm. All motion remains scoped to React/GSAP lifecycles and respects reduced motion.
- Added rolling action labels, stable-width filter brackets, FLIP transitions for project categories, brief grid/list transitions, focus/hover feedback, native dialog entrance and clearer form focus. Removed the list-hover typeface swap that caused layout movement. Copy feedback now cancels older timers and ignores stale async requests.
- Restored Selected's centering by animating an inner span rather than the outer centering transform. A background-only ellipse expands into the black Work section without clipping its content.
- Added a two-column staggered gallery for 600–809px widths, tightened the introduction's internal notes spacing, and made phone About typography fluid. The first phone review caught Read project overlays covering cover captions; these now sit below the covers on touch and reduced-motion devices.
- Final interaction checks exposed a city range-change lifecycle edge case: a recreated scene could retain progress zero when the scroll trigger was already at its endpoint. The new driver explicitly synchronizes with measured scroll progress on creation and refresh. Year ↔ 13 weeks remains settled; source filtering and day navigation continue to work. Camera math, colors, grid framing and reveal thresholds are unchanged.

Verification: production build and all eight existing tests passed (four activity, four Sites packaging/worker). Existing dev, production-preview and cloudflared processes were reused. The rebuilt bundle is served by the public tunnel. Desktop/tablet/phone inspector renders at 1440, 768 and 390px show zero horizontal overflow and no collected console errors. Browser interaction checks covered category filters with stable control positions, grid/list switching, dialog Escape/focus return, copy feedback, required-field validation, and city source/range/day controls. The reduced-motion desktop sheet shows the static calendar and fully readable page.

Evidence: `.taste-skill/continuation-baseline/`, `.taste-skill/motion-refinement-1/`, `.taste-skill/motion-refinement-final/`, and `.taste-skill/motion-refinement-reduced/reduced-desktop.jpg`. The final two-round critique is `.taste-skill/motion-refinement-final/critique.md`. The scenes utility was used for its reduced-motion page render; the custom city is reviewed in the inspector films and interactive browser, not certified by that utility's bundled-stage detector.

The generic inspector still reports 8 FAIL / 9 WARN; static lint retains the requested rules/grid and Inter findings. Strict critique remains capped at 6.0, and the existing Three.js bundle-size warning remains. Activity is illustrative deterministic data; covers remain original editorial typography rather than shipped-product screenshots. No clean generic audit is claimed.

## Latest refinement: rounded cells and 30-degree opening

The supplied GitHub reference changes the activity scale to dark green for low activity and bright green for high activity. LeetCode follows a corresponding ochre-to-yellow progression. Cells now have a rounded extruded footprint and wider gaps (0.78 units on a 1.04-unit pitch). Both-source view retains paired green/yellow cells; selecting one source produces full square day cells. The page keeps its existing light ground rather than copying the reference's dark panel.

ROUND 1 — reference colors and geometry
Seen in one second: wordmark above a rotated field of contribution blocks.
Idea (one sentence): retain the same daily geometry while moving from a dimensional opening to a GitHub-like grid.
Live thing: scroll-driven camera and source/day controls.
Layout words by section: hero=wordmark / city=landscape / introduction=statement / work=gallery / about=split / contact=form.
Scores: design 6.5 · usability 7 · creativity 7 · content 7 → overall 6.0 (strict cap).
Caps applied: existing style-policy and project-media limitations.
Top three problems and fixes:
1. `.taste-skill/rounded-city/desktop-fold.jpg`: literal camera-Z roll made the buildings lean. Use a 30-degree orbit about the reference's upright axis (Y-up in Three.js) to preserve upright buildings and reveal their side faces.
2. Initial directional lighting overbrightened the new palette. Reduce its intensity while retaining normalized, flat palette colors at the calendar endpoint.
3. Existing style-policy findings remain outside this component change; retain the user's requested type and frame.

ROUND 2 — final isometric-style view
Seen in one second: the personal wordmark and upright, dimensional green/yellow towers.
Idea (one sentence): the city opens on a 30-degree oblique orbit and unwinds to an aligned calendar.
Live thing: reversible perspective change and interactive day cells.
Layout words by section: hero=wordmark / city=landscape / introduction=statement / work=gallery / about=split / contact=form.
Scores: design 6.5 · usability 8 · creativity 7.5 · content 7 → overall 6.0 (strict cap).
Caps applied: 8 FAIL / 7 WARN generic inspector findings; no clean strict taste pass claimed.
Top three observations:
1. `.taste-skill/isometric-city/desktop-fold.jpg`: upright towers with visible sides, a close crop, and revised green/yellow bands; the unwanted leaning is resolved.
2. `isometric-city/desktop-page-01.jpg`: the endpoint returns to zero azimuth with aligned month labels and spaced rounded cells. Paired-source cells intentionally differ from the reference's single-source squares.
3. `isometric-city/mobile-fold.jpg`: phone composition retains the crop and typography without horizontal page overflow.

Validation: production build passed; final assets confirmed at the Cloudflare URL. Inspector screenshots/films at 1440, 768 and 390px report zero horizontal overflow and no collected console errors. The rounded geometry is instanced and disposed using the existing scene lifecycle. The separate Three.js geometry module remains above Vite's 500kB warning threshold.

## Latest refinement: horizontal opening

The user removed the opening city heading and asked for a closer skyline running left to right beneath the wordmark. The visible city heading and its metadata block are removed; the accessible section label and sample-data disclosure remain. Role/location/resume notes moved into the introduction. The hero now ends just after its services row, and the city canvas spans the viewport. The camera starts straight across the skyline with increased zoom, then retains the existing overhead/calendar transition.

Verification: production build passed; the updated bundle is served by the Cloudflare URL. New screenshots and scroll films are in `.taste-skill/horizontal-city/`. At 1440, 768 and 390px, the inspector measured zero horizontal overflow and collected no console errors. The opening is intentionally cropped at its left/right edges to give the close-up scale; the complete calendar fits at the endpoint. Existing generic taste-policy exceptions remain, so this is not a clean strict taste pass.

ROUND 1 — horizontal refinement
Seen in one second: the wordmark with a wide green/yellow skyline directly below.
Idea (one sentence): the daily contribution skyline forms the base of the personal wordmark, then resolves into its calendar.
Live thing: reversible camera movement and calendar source/day controls.
Layout words by section: hero=wordmark / city=full-width landscape / introduction=statement / work=staggered gallery / about=split / contact=typographic form.
Scores: design 6.5 · usability 8 · creativity 7.5 · content 7 → overall 6.0 (strict cap).
Caps applied: remaining reference-style and project-media inspector findings.
Top three observations, with evidence and disposition:
1. `.taste-skill/horizontal-city/desktop-fold.jpg`: skyline opens beneath the services without a second heading; requested change is resolved.
2. `horizontal-city/mobile-fold.jpg`: the closer crop spans the phone width with no horizontal page overflow; deliberate opening crop retained.
3. `horizontal-city/desktop-page-01.jpg`: the full flat calendar and month labels fit, followed by the introduction and relocated notes. No new actionable layout issue found in this scoped refinement.

Applied design-taste-frontend and GSAP ScrollTrigger/React guidance. This is a component and section-order refinement of the user's selected Sahor direction, so no new random direction was drawn. The user explicitly requested generous negative space, the existing typography and grid, a close-up city second, and a separate introduction third.

## Composition and motion

The opening wordmark retains a large paper-gray field. Section two holds a viewport-sized city scene while native scrolling advances a GSAP-controlled camera. It starts close and oblique, pulls back, turns overhead and flattens the buildings. Month labels and the calendar controls appear after the camera finishes; the final part of the scroll gives the grid a short reading pause. Scrolling back reverses the sequence.

The introduction is its own third section, centered within the established frame with generous space above and below. Selected work follows it. The visual idea is daily engineering activity becoming a calendar: the same geometry supplies both views, not a swapped image.

Week columns now use UTC weekdays, including partial weeks. Months anchor to their actual projected columns. Both-source mode shows green and yellow halves; a single-source filter fills each occupied day with a square. Fixed activity bands keep colors consistent between date ranges. Smaller screens open on the latest 13 weeks; the year control remains available. Where year labels would collide on a narrow screen, labels are thinned rather than overlapped.

## ROUND 1
Seen in one second: the raman.dev wordmark, followed by a close-up field of plain blocks.
Idea (one sentence): daily building becomes a readable calendar as the viewer changes perspective.
Live thing: scroll between 3D and 2D, inspect a day, filter sources and ranges.
Layout words by section: hero=wordmark / city=held landscape / introduction=statement / work=staggered gallery / about=split / contact=typographic form.
Scores: design 6.5 · usability 8 · creativity 7.5 · content 7 → overall 6.0 (strict cap; arithmetic 7.2).
Caps applied: raw taste-policy FAILs; existing illustrative covers rather than real project media. User-requested grid, type mixing and negative space are intentional exceptions.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Overhead lighting washes out the color bands in `.taste-skill/city-scroll-1/mobile-page-01.jpg`. Fade directional lighting and normalize ambient illumination so the flat view uses the intended palette.
2. The introduction is too large relative to its word count in `city-scroll-1/desktop-film-01.jpg`. Set it at 36px maximum with a quieter italic treatment, maintaining its generous surrounding space.
3. The opening close-up deliberately crops outer buildings in `city-scroll-1/desktop-page-01.jpg`. Keep that close-up, but ensure the completed calendar fits fully; reduce the opening zoom on phones.

## ROUND 2
Seen in one second: a large personal wordmark; the city is the next visual focus.
Idea (one sentence): one year's daily activity changes from a skyline into a calm, legible grid.
Live thing: a reversible scroll transformation and functional calendar controls.
Layout words by section: hero=wordmark / city=held landscape / introduction=statement / work=staggered gallery / about=split / contact=typographic form.
Scores: design 6.5 · usability 8 · creativity 7.5 · content 7 → overall 6.0 (strict cap; arithmetic 7.2).
Caps applied: remaining generic inspector FAILs are retained in the report; this is not an unconditional generic taste pass. Real project media remains a content/design improvement outside this change.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Editorial project covers still replace actual work screenshots (`.taste-skill/city-scroll-final/desktop-page-02.jpg`). Future content improvement: add approved real project media.
2. The selected reference overlaps Work and the decorative Selected word (`city-scroll-final/mobile-page-01.jpg`). Retained intentionally; functional title remains legible.
3. The mobile year view cannot display all month names at readable size. Use the 13-week default and avoid collisions when the user chooses Year; complete desktop-year labels remain visible.

## Verification

### Merged daily buildings and grid alignment

Replaced the two source-specific towers with one .78-square building per active date. GitHub-only dates are green, LeetCode-only dates yellow, and dates with both blue; total activity controls combined height and fixed blue intensity bands. In source filters the same daily building reflects the selected platform's count and palette. The default filter is labeled All, with a blue Both legend. Empty dates remain neutral tiles.

The final orthographic width now derives from the actual container width and the calendar's outside cell edges. It interpolates from the overflowing opening to align with the page's left and right rules. Month labels stay within those edges. Scroll now updates the camera and group flattening without rebuilding per-building matrices or colors; those update only when the source changes.

All four activity tests passed, including inactive/exclusive/combined days and source filtering. Production build passed and its asset was confirmed through the Cloudflare tunnel. Desktop scroll sheet, tablet opening and mobile scroll sheet were reviewed in `.taste-skill/merged-city/`; the calendar aligns with the title/control grid, the blue legend fits on phones, and all three inspector widths report zero horizontal overflow. The inspector retains 8 unrelated style FAILs and 9 WARNs; this is not a generic taste pass. Data remains illustrative.

### Accelerating camera and lower calendar landing

Camera progress now follows the normalized exponential curve `(exp(3t) - 1) / (exp(3) - 1)`: 6%, 18%, and 45% of movement at 25%, 50%, and 75% of the transition. Rotation, zoom, flattening and the landing offset share this progress; title/month reveal remains after the camera finishes, with the existing reading pause and reduced-motion fallback.

The calendar lands 14% of the canvas layout height lower (capped at 110px on desktop), with a smaller 10%/56px limit on phones. The title remains above it and appears only in calendar view. First screenshot review caught an inverted camera offset; corrected before the final build. Final desktop scroll sheet `.taste-skill/city-ease-final/desktop-page-01.jpg` confirms separated title, month labels, grid and controls. Build and public asset verification passed. Existing unrelated taste findings remain.

### City overflow

Removed the sticky stage's clipping and expanded the transparent WebGL canvas vertically. The camera frustum expands by the same world-units-per-pixel amount, preserving the model's apparent scale and the calendar projection. Month label positions account for the extra canvas area; raycasting uses the actual canvas rectangle. Calendar controls and hero text sit above the transparent drawing surface.

The build passed and the public tunnel served the new asset. Inspector screenshots in `.taste-skill/city-overflow/` show the lower buildings continuing past the former horizontal cutoff, with zero horizontal page overflow at 1440, 768 and 390px. The inspector flags transparent canvas bounds as text coverage, although the inspected screenshots show readable text; hero stacking was subsequently raised to prevent the canvas intercepting that text. Existing generic design findings remain.

### Square calendar and returning heading

Corrected the earlier incomplete footprint fix: the same computed dimension now sets both X and Z at every animation progress and source filter. Both mode ends with paired .35-square buildings; single-source mode ends with .78-square buildings. No rectangular stretch remains. The Contribution city heading fades in above the flat calendar alongside month labels, reverses on scroll back, and appears immediately under reduced motion. Its positioning does not change the canvas framing.

Production build passed; desktop, tablet, and phone inspector renders are in `.taste-skill/square-calendar/`. The desktop scroll sheet confirms the heading reveal and square overhead marks. Existing unrelated template/style findings remain.

### Square-footprint refinement

The previous paired towers measured .35 by .78, giving them slab-shaped roofs. Their opening footprints now measure .35 by .35; activity still determines height. Depth interpolates back to .78 near the flat calendar endpoint. Opening zoom increased from 2.05 to 2.75 on desktop and 1.5 to 1.9 on phones. The 30-degree orbit and endpoint framing remain intact.

Build passed and the new production asset was confirmed through the public tunnel. The final inspector ran at all three widths; opening screenshots and the desktop scroll contact sheet were reviewed in `.taste-skill/square-city/`. The existing 8 generic style failures and 7 warnings remain outside this component correction. The closer crop and square roofs are visible; the flat calendar continues to fit. Activity heights intentionally produce towers of different heights, rather than identical cubes.

- Production build passed. Three activity tests passed, including new checks for weekday rows, partial week columns and month boundaries in both ranges.
- The official inspector ran twice at 1440, 768 and 390px, with scroll films and its reduced-motion first-screen check. Final measurements show zero horizontal overflow, no collected console errors, and 35/26/26 moving DOM elements respectively.
- Final screenshots and raw findings: `.taste-skill/city-scroll-final/`. The strict inspector retains 8 FAIL and 8 WARN findings, largely the previously documented reference-style conflicts. Static lint retains grid-line/style flags; none are silently suppressed.
- Public-browser checks confirmed the close-up, overhead calendar, label reveal, source filtering, range changes and reverse scroll. Existing day slider and previous/next controls remain available at the calendar state.
- Reduced motion uses the finished calendar immediately and removes the extended scroll section. Its city behavior was reviewed in code; live operating-system preference toggling was not emulated.
- The scene uses on-demand rendering, a cached viewport size, instanced geometry and a scoped GSAP lifecycle. No permanent render loop or scroll hijacking was added. Vite still reports the separate Three.js module above its 500kB warning threshold.
- The public Cloudflare preview was rebuilt and verified. Data remains clearly marked as a random sample.
