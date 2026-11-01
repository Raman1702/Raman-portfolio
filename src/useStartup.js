import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const faces = [
  { font: '400 16px Inter', token: '--body', fallback: 'Arial, sans-serif' },
  { font: '400 16px Bricolage', token: '--heading', fallback: 'Arial, sans-serif' },
  { font: 'italic 400 16px Instrument', token: '--display', fallback: 'Georgia, serif' },
];
let fontPreparation;

function prepareFonts() {
  // Shared across StrictMode mounts. A slow/failed face stays on its fallback
  // for this visit, so it cannot cause a second layout jump after release.
  if (!fontPreparation) fontPreparation = (async () => {
    if (!document.fonts) return;
    let timeout;
    await Promise.race([
      Promise.allSettled(faces.map(({ font }) => document.fonts.load(font))),
      new Promise(resolve => { timeout = setTimeout(resolve, 3000); }),
    ]);
    clearTimeout(timeout);
    let fallback = false;
    for (const face of faces) {
      if (!document.fonts.check(face.font)) {
        document.documentElement.style.setProperty(face.token, face.fallback);
        if (face.token === '--display') document.documentElement.dataset.fallbackDisplay = "true";
        fallback = true;
      }
    }
    document.documentElement.dataset.fonts = fallback ? "fallback" : "ready";
  })();
  return fontPreparation;
}

export function useStartup(scope) {
  const [fontsReady, setFontsReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [ready, setReady] = useState(false);
  const interacted = useRef(false);
  const onSceneReady = useCallback(() => setSceneReady(true), []);

  useEffect(() => {
    let active = true;
    prepareFonts().then(() => { if (active) setFontsReady(true); });
    // WebGL is enhancement: a slow renderer must never hold the page closed.
    const deadline = setTimeout(onSceneReady, 3500);
    const markInput = () => { interacted.current = true; };
    for (const event of ["wheel", "touchstart", "keydown"]) {
      window.addEventListener(event, markInput, { passive: true });
    }
    return () => {
      active = false;
      clearTimeout(deadline);
      for (const event of ["wheel", "touchstart", "keydown"]) window.removeEventListener(event, markInput);
    };
  }, [onSceneReady]);

  useEffect(() => {
    if (!fontsReady || !sceneReady) return;
    let active = true;
    let frame;
    // Wait for the actual draw, not a navigation-relative timer. A completed
    // draw or reduced-motion load adds no delay after the fonts arrive.
    const drawings = [...document.querySelectorAll(".startup-grid > i")]
      .flatMap(line => line.getAnimations()).map(animation => animation.finished);
    Promise.allSettled(drawings).then(() => {
      if (!active) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => { if (active) setReady(true); });
      });
    });
    return () => { active = false; cancelAnimationFrame(frame); };
  }, [fontsReady, sceneReady]);

  useGSAP(() => {
    if (!ready) return;
    const html = document.documentElement;
    const app = scope.current.closest("#root");
    const screen = document.getElementById("startup-screen");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      html.dataset.startup = "ready";
      screen.hidden = true;
    };
    html.dataset.startup = "revealing";
    app.inert = false;
    app.removeAttribute("aria-busy");
    gsap.timeline({ onComplete: finish })
      // A timeline callback also runs when reduced-motion duration is zero.
      .call(() => {
        ScrollTrigger.refresh();
        // Restore a direct section link only if the visitor hasn't started
        // navigating. Never force a reload or an interrupted visit to the top.
        const navigation = performance.getEntriesByType("navigation")[0];
        if (location.hash && !interacted.current && navigation?.type === "navigate") {
          try {
            document.getElementById(decodeURIComponent(location.hash.slice(1)))
              ?.scrollIntoView({ behavior: "instant", block: "start" });
            ScrollTrigger.update();
          } catch { /* A malformed fragment should not block the page. */ }
        }
      }, [], 0)
      .fromTo(app, { opacity: 0 }, { opacity: 1, duration: reduced ? 0 : 0.35, clearProps: "opacity" }, 0)
      .to(screen, { opacity: 0, duration: reduced ? 0 : 0.35 }, 0);
    return () => {
      finish();
      app.inert = false;
      app.removeAttribute("aria-busy");
    };
  }, { scope, dependencies: [ready], revertOnUpdate: true });

  return { ready, onSceneReady };
}
