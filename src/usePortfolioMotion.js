import { useCallback, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import "./paragraphMotion.css";

gsap.registerPlugin(Flip, ScrollTrigger, SplitText, useGSAP);

const motionQuery = "(prefers-reduced-motion: no-preference)";
const clearEntrance = "transform,opacity";

function revealParagraph(paragraph, refreshLayout, delay = 0) {
  // A completed paragraph stays readable if a narrower layout adds more lines.
  let completed = false;
  const accessibleText = paragraph.getAttribute("aria-label") || paragraph.innerText.trim();
  return SplitText.create(paragraph, {
    type: "lines",
    mask: "lines",
    linesClass: "paragraph-line",
    autoSplit: true,
    aria: "auto",
    onSplit(self) {
      // Keep the authored <br> pauses; textContent alone joins adjacent words.
      paragraph.setAttribute("aria-label", accessibleText);
      refreshLayout();
      // SplitText owns and reverts this returned animation on every re-split.
      if (completed) return gsap.set(self.lines, { yPercent: 0 });
      return gsap.fromTo(
        self.lines,
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.11,
          ease: "power3.out",
          delay,
          onComplete: () => { completed = true; },
          scrollTrigger: {
            trigger: paragraph,
            start: "top 83%",
            once: true,
          },
        },
      );
    },
    onRevert: refreshLayout,
  });
}

function revealSequence(trigger, targets, options = {}) {
  if (!trigger || !targets.length) return;
  return gsap.from(targets, {
    y: 22,
    opacity: 0,
    duration: 0.75,
    stagger: 0.08,
    ease: "power3.out",
    clearProps: clearEntrance,
    ...options,
    scrollTrigger: { trigger, start: "top 86%", once: true },
  });
}

function revealProject(project, view, immediate = false) {
  const media = project.querySelector(".media-wrap");
  const caption = [...project.querySelectorAll(".project-caption > *")];
  const timeline = gsap.timeline({
    defaults: { ease: "power3.out", clearProps: clearEntrance },
    ...(immediate
      ? {}
      : { scrollTrigger: { trigger: project, start: "top 90%", once: true } }),
  });

  if (view === "grid" && media) {
    timeline.from(
      media,
      {
        y: immediate ? 16 : 30,
        scale: 1.025,
        opacity: 0,
        duration: immediate ? 0.55 : 0.9,
      },
      0,
    );
  }
  if (caption.length) {
    timeline.from(
      caption,
      {
        x: view === "list" ? 14 : 0,
        y: view === "grid" ? 12 : 0,
        opacity: 0,
        duration: immediate ? 0.4 : 0.6,
        stagger: 0.045,
      },
      view === "grid" ? 0.12 : 0,
    );
  }
  return timeline;
}

export function usePortfolioMotion(scope, category, view, ready = true) {
  const pendingLayout = useRef(null);

  // Capture before React changes the filter or layout. Flip owns the buttons;
  // their entrance and hover effects use separate children.
  const captureProjects = useCallback(() => {
    if (!scope.current || !window.matchMedia(motionQuery).matches) {
      pendingLayout.current = null;
      return;
    }
    const elements = [...scope.current.querySelectorAll(".project")];
    Flip.killFlipsOf(elements, true);
    pendingLayout.current = {
      state: Flip.getState(elements),
      elements: new Set(elements),
      view,
    };
  }, [scope, view]);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !ready) return;
      const select = (selector) => [...root.querySelectorAll(selector)];
      const media = gsap.matchMedia();
      let active = true;
      let refreshFrame = 0;
      const refreshLayout = () => {
        if (!active || refreshFrame) return;
        refreshFrame = window.requestAnimationFrame(() => {
          refreshFrame = 0;
          if (active) ScrollTrigger.refresh();
        });
      };

      media.add(motionQuery, () => {
        const masks = select(".name-part, .dev-part");
        gsap.set(masks, { clipPath: "inset(-25% -25% 0% -25%)" });
        const entrance = gsap.timeline({
          defaults: { ease: "power4.out", clearProps: clearEntrance },
          onComplete: () => masks.forEach(mask => mask.style.removeProperty("clip-path")),
        });
        entrance
          .from(".name-part > .tech-heading", { yPercent: 105, opacity: 0, duration: 1 }, 0.08)
          .from(".dev-part > .tech-heading", { yPercent: 105, opacity: 0, duration: 1 }, 0.18)
          .from(
            ".services > span",
            { y: 22, opacity: 0, duration: 0.7, stagger: 0.075 },
            0.42,
          )
          .from(".city-stage", { opacity: 0, duration: 0.8 }, 0.2);

        for (const paragraph of select(".intro-block > p")) {
          revealParagraph(paragraph, refreshLayout);
        }

        const aperture = root.querySelector(".work-aperture > span");
        if (aperture) {
          gsap.fromTo(
            aperture,
            { scaleX: 1, scaleY: 1 },
            {
              scaleX: 2.4,
              scaleY: 2,
              ease: "none",
              scrollTrigger: {
                trigger: root.querySelector(".work-section"),
                start: "top 90%",
                end: "top 28%",
                scrub: 0.55,
              },
            },
          );
        }
        revealSequence(
          root.querySelector(".work-toolbar"),
          select(".work-toolbar > *"),
          { y: 12, duration: 0.6, stagger: 0.06 },
        );

        revealSequence(
          root.querySelector(".about-heading"),
          select(".about-heading > h2"),
          { y: 34, duration: 1 },
        );
        for (const paragraph of select(".about-copy > p")) {
          revealParagraph(paragraph, refreshLayout);
        }
        revealSequence(
          root.querySelector(".experience"),
          select(".experience > div"),
          { y: 16, stagger: 0.1 },
        );
        for (const paragraph of select(".contact-aside > p, .contact-message > p")) {
          revealParagraph(paragraph, refreshLayout);
        }
        // Keep the paragraph parents stationary so their line reveals do not
        // inherit a second fade/translation; interactive text stays unsplit.
        revealSequence(
          root.querySelector(".contact-top"),
          select(".contact-aside > a, .contact-aside > button, .contact-message > a, .contact-top > form"),
          { y: 24, stagger: 0.1, duration: 0.85 },
        );
        revealSequence(
          root.querySelector(".contact-title"),
          select(".contact-title"),
          { y: 32, duration: 1 },
        );
        revealSequence(
          root.querySelector(".socials"),
          select(".socials > *"),
          { y: 10, duration: 0.55, stagger: 0.06 },
        );
      });

      // Only split the visible copy; switching breakpoints reverts the old
      // instance before animating the new one, without duplicate reading text.
      media.add({
        motion: motionQuery,
        mobile: "(max-width: 809px)",
        desktop: "(min-width: 810px)",
      }, ({ conditions }) => {
        if (!conditions.motion) return;
        const note = root.querySelector(`.hero-note--${conditions.mobile ? "mobile" : "desktop"}`);
        if (!note) return;
        for (const paragraph of note.querySelectorAll(":scope > p")) {
          revealParagraph(paragraph, refreshLayout, conditions.mobile ? 0.45 : 0);
        }
        revealSequence(note, [...note.querySelectorAll(":scope > a")], { y: 18, stagger: 0.1 });
      });

      document.fonts.ready.then(refreshLayout);
      return () => {
        active = false;
        window.cancelAnimationFrame(refreshFrame);
        media.revert();
      };
    },
    { scope, dependencies: [ready], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !ready) return;
      const projects = [...root.querySelectorAll(".project")];
      let snapshot = pendingLayout.current;
      pendingLayout.current = null;
      let active = true;
      let flipping = false;
      const media = gsap.matchMedia();

      media.add(motionQuery, () => {
        const previous = snapshot;
        snapshot = null;
        // Sequence grid/list changes instead of stretching a card into a row.
        if (previous && previous.view === view) {
          flipping = true;
          Flip.from(previous.state, {
            targets: projects,
            scale: true,
            absolute: false,
            prune: true,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => {
              if (active) ScrollTrigger.refresh();
            },
          });
          for (const project of projects) {
            if (!previous.elements.has(project)) revealProject(project, view, true);
          }
        } else {
          for (const project of projects) {
            revealProject(project, view, Boolean(previous));
          }
        }
      });

      if (!flipping) ScrollTrigger.refresh();
      return () => {
        active = false;
        media.revert();
      };
    },
    { scope, dependencies: [category, view, ready], revertOnUpdate: true },
  );

  return { captureProjects };
}
