# Design QA

Latest taste/GSAP audit and updated limitations: see `taste-motion-review.md`. It supersedes the historical checks below.

final result: passed

## Contribution city and GSAP update — 1 November 2026

- Added the user-requested activity city directly after the hero/introduction. The reference's isometric building concept is adapted to the existing paper background, fine grid, small labels, and mixed typography.
- Genuine Three.js orthographic 3D geometry uses instanced towers, colored roofs, and small windows. Each date has separate GitHub and LeetCode lanes; green/yellow source colors remain distinct. Mobile defaults to 13 weeks for legibility; a full year remains available.
- Sample data is generated from a reproducible seed. The sample year contains 365 consecutive unique UTC dates ending November 1, 2026. Tests cover date continuity, independent nonnegative integer series, repeatability, and changed seeds. Both tests pass.
- Desktop and 390px phone screenshots reviewed. City stays within its container. Canvas count stays at one when switching year/13-week ranges. Obsolete renderers and GPU resources are disposed on range change/unmount.
- Tested next-day and Home keyboard navigation and the selected date readout. Verified LeetCode-only view renders yellow towers. Range buttons update both the canvas and accessible description. No browser console errors observed during these tests.
- GSAP owns entrance transforms; the earlier CSS/IntersectionObserver animation path was removed. ScrollTrigger is refreshed after fonts/layout and project-filter changes. React-scoped contexts and matchMedia clean up animations. Reduced-motion users get the complete static city and content.
- Build passes. Vite reports a nonblocking large-chunk warning due to the bundled Three.js and GSAP runtime (approximately 248 KB gzipped JS).
- Public production preview verified through https://rom-creating-eligibility-parallel.trycloudflare.com with HTTP 200 and browser-rendered content, fonts, controls, and 3D canvas. The tunnel serves port 4174; it does not expose the development server on 4173.
- Direct pointer picking verified on the public city: selecting a visible tower changed the selected day from October 18 to March 13, 2026 and updated both source counts.
- Remaining limitation: activity is intentionally sample data, not live GitHub/LeetCode data. Cloudflare quick-tunnel availability depends on this machine and both local processes staying running.

## Source and comparison scope

- Visual source: https://sahor.work/.
- Measured specification: `C:/Users/samee/.codex/visualizations/2026/11/01/01a195e4-6aeb-7061-b973-687d184d090c/sahor-analysis/design-language.md`.
- Implementation: http://127.0.0.1:4173/.
- Source and implementation screenshots were captured and inspected through the in-app browser in this conversation. Hero images were supplied together in one comparison call. Screenshots are inline tool evidence; no filesystem screenshot export was provided by the browser API used here.
- Desktop comparison used the normal approximately 1280×720 browser viewport. Additional implementation checks used 1440×1000, 768×1024, and 390×844 CSS viewports. Captures were reviewed at their returned browser scale, without external resampling. Browser scrollbars account for the difference between viewport and content widths.
- Inspected states: top/hero, work grid, list, category-filtered grid/list, project detail dialog, about, contact, and mobile full-page flow. Focused screenshots covered project-detail text and contact controls.

This is a personal-content adaptation. The user explicitly requested the source design system and section structure without 3D artwork. Pixel identity of the removed scenes, original portfolio artwork, and original text is not the acceptance criterion.

## Findings resolved

1. **P2 — Guide lines did not align to the content thirds.** The initial repeating background position offset the internal lines. Replaced it with a container-aligned pseudo-element. Subsequent desktop hero/work screenshots show aligned column starts.
2. **P2 — Filtered list inherited gallery stagger.** Systems + List gave the second entry a 140px top margin. Restricted the offset rules to `.projects-grid.filtered`. Retest returned 0px margins on all three filtered list rows.
3. **P2 — Mobile wordmark extended beyond the frame.** Reduced mobile type from 25vw to 23vw. Subsequent mobile screenshots show the complete name without truncation.
4. **P2 — UClone cover and dialog horizontal overflow.** Aspect ratio plus minimum height produced an implicit width wider than its container. Set explicit 100% width/min-width:0 and a sufficient minimum height. Post-fix mobile dialog client/scroll width both measured 337px; its cover client/scroll width both measured 293px. No horizontal scrollbar remains in the inspected dialog.

## Five fidelity surfaces

- **Typography:** Locally loaded Instrument Serif italic, Bricolage Grotesque, and Inter preserve the display/heading/interface relationship. Wordmark fits mobile; section headings and metadata preserve the large/small contrast. Original outline typography is retained.
- **Layout:** Broad desktop margins, three guide columns, staggered project sizes, compact captions, and the contact columns are retained. Hero length is intentionally reduced after removing artwork. Mobile work becomes a single reading sequence with modest alternating insets.
- **Colors:** Light paper/ink interface and dark work field match the extracted direction. Individual typographic covers supply restrained color; they replace unavailable personal project media rather than pretending to reproduce the source projects.
- **Media:** No Macintosh, hill, or phone imagery. Typography-based covers remain sharp at all inspected widths and have no final measured overflow. Real project screenshots remain a possible content upgrade, not a missing functional state.
- **Content:** Professional facts, project descriptions, and 30%/40% outcomes are taken from the supplied résumé. GoKhana initiatives are identified as employment work. No fabricated repository, demo, booking, or testimonial links.

## Functional verification

- Main Work and Contact anchors navigate to their sections; back-to-top works.
- All → six entries; AI → one; Full stack → two; Systems → three.
- List/grid switches preserve the selected category and update the query string.
- Combined Systems/List state retested after its spacing fix.
- Project details open with meaningful content. Escape closes the dialog and returns focus to the triggering project button.
- Copy email displays `(Copied)` after activation.
- Empty contact submission focuses the required email field and is rejected by native validation.
- The résumé URL returned HTTP 200, application/pdf, and bytes matching the original copied PDF.
- LinkedIn, LeetCode, and mailto targets match the résumé or its contact details.
- Browser console error query returned no errors during final interaction checks.
- No cover overflow was measured at the final inspected phone, tablet, and wide-desktop states.

## Intentional differences and limits

- New personal text and original typographic project covers replace Sahor's work.
- Detail content uses accessible local dialogs instead of building separate CMS case-study routes; the requested deliverable is a landing page.
- Simple hover/entrance/text-reveal effects replace source-specific canvas and shader scenes.
- Contact creates an email draft; no backend delivery is implied. A real message was not sent during testing.
- Reduced-motion behavior is implemented in CSS and the intro handler; OS-level reduced-motion emulation was not part of this browser run.
- Generic taste-skill lint reports design-policy conflicts with the explicitly requested reference (hairlines, grid/text gradients, Inter, and the availability mark). These are documented user-directed exceptions. The separate browser inspector was not run because browser control was performed through the approved in-app browser tools.

## Final checklist

- [x] Requested section order and visual vocabulary retained.
- [x] Decorative 3D imagery omitted.
- [x] Personal content and working controls present.
- [x] Desktop/tablet/mobile reviewed; identified P2 issues corrected and retested.
- [x] Local fonts and résumé served successfully.
- [x] Production build passes.

No remaining actionable P0/P1/P2 finding in the inspected scope. Optional follow-up: substitute real, approved project screenshots for the editorial covers.
