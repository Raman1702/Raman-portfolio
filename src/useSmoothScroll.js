import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import "./smoothScroll.css";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll(modalOpen) {
  const instance = useRef(null);
  const locked = useRef(modalOpen);
  locked.current = modalOpen;

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Native document scrolling preserves the city's CSS sticky positioning.
      const lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        anchors: false,
        prevent: node => node.matches?.("dialog, textarea, select, [data-lenis-prevent]"),
      });
      instance.current = lenis;
      if (locked.current) lenis.stop();
      const update = () => ScrollTrigger.update();
      // Share GSAP's frame loop, using real elapsed time without changing its
      // global lag-smoothing settings for the other portfolio animations.
      const tick = () => lenis.raf(performance.now());
      const refresh = () => lenis.resize();
      const stopInertia = () => {
        // Reset even before an anchor's first frame has moved the document.
        // scrollTo(currentY) can otherwise return early with that tween active.
        if (lenis.isStopped) return;
        lenis.stop();
        lenis.start();
      };
      let releaseAnchorFocus = () => {};
      const onKeyDown = event => {
        if (["Tab", "PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp", " "].includes(event.key)) {
          stopInertia();
        }
      };
      const onAnchor = event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target.closest?.("a[href]");
        if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
        let target;
        try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
        if (!target) return;
        event.preventDefault();
        if (location.hash !== url.hash) history.pushState(null, "", url);
        lenis.scrollTo(target, {
          duration: 1.05,
          lerp: undefined,
          easing: t => 1 - Math.pow(1 - t, 3),
          onComplete: () => {
            // Preserve skip-link and keyboard navigation after an eased anchor.
            releaseAnchorFocus();
            const previous = target.getAttribute("tabindex");
            if (previous === null) {
              target.setAttribute("tabindex", "-1");
              const release = () => {
                target.removeEventListener("blur", release);
                releaseAnchorFocus = () => {};
                target.removeAttribute("tabindex");
              };
              target.addEventListener("blur", release, { once: true });
              releaseAnchorFocus = release;
            }
            target.focus({ preventScroll: true });
          },
        });
      };
      lenis.on("scroll", update);
      gsap.ticker.add(tick);
      ScrollTrigger.addEventListener("refresh", refresh);
      document.addEventListener("click", onAnchor);
      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("focusin", stopInertia);
      window.addEventListener("popstate", stopInertia);

      return () => {
        gsap.ticker.remove(tick);
        ScrollTrigger.removeEventListener("refresh", refresh);
        document.removeEventListener("click", onAnchor);
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("focusin", stopInertia);
        window.removeEventListener("popstate", stopInertia);
        releaseAnchorFocus();
        lenis.off("scroll", update);
        lenis.destroy();
        instance.current = null;
      };
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    if (modalOpen) instance.current?.stop();
    else instance.current?.start();
  }, [modalOpen]);
}
