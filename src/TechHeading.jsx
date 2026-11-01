import { useCallback, useEffect, useRef, useState } from "react";
import TechText from "./TechText";

const interactiveQuery =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// The native text owns the heading's width, baseline, and accessible name.
// Canvas only replaces its visible ink after a successful, font-ready paint.
export default function TechHeading({ text }) {
  const root = useRef(null);
  const nativeText = useRef(null);
  const baseline = useRef(null);
  const signature = useRef("");
  const [enabled, setEnabled] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia(interactiveQuery);
    const syncPreference = () => {
      setEnabled(preference.matches);
      setReady(false);
      setFailed(false);
    };
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    signature.current = "";
    if (!enabled) {
      setMetrics(null);
      return;
    }
    const probe = document.createElement("canvas").getContext("2d");
    if (!probe || !("letterSpacing" in probe)) {
      setFailed(true);
      return;
    }

    let active = true;
    let frame = 0;
    let fontsReady = !document.fonts;
    const measure = () => {
      frame = 0;
      if (!active || !fontsReady || !root.current) return;
      const bounds = root.current.getBoundingClientRect();
      const baselineBounds = baseline.current.getBoundingClientRect();
      const style = getComputedStyle(nativeText.current);
      const fontSize = Number.parseFloat(style.fontSize);
      if (!fontSize || !bounds.width || !bounds.height) return;
      // Leave drawing room for glyph overhang and the dashed outline. This is
      // outside the normal inline box and contributes no layout dimensions.
      const padding = fontSize * 0.16;
      const next = {
        fontFamily: style.fontFamily,
        fontStyle: style.fontStyle,
        fontWeight: style.fontWeight,
        fontSize,
        letterSpacing: (Number.parseFloat(style.letterSpacing) || 0) / fontSize,
        inlineLayout: {
          x: padding,
          baseline: baselineBounds.top - bounds.top + padding,
          width: bounds.width,
          height: bounds.height,
        },
        padding,
        reach: Math.max(36, fontSize * 0.65),
      };
      const key = JSON.stringify([next, bounds.width, bounds.height]);
      if (key === signature.current) return;
      signature.current = key;
      setReady(false);
      setMetrics(next);
    };
    const scheduleMeasure = () => {
      if (!frame && active) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(root.current);
    const loaded = () => {
      fontsReady = true;
      scheduleMeasure();
    };
    if (document.fonts) {
      document.fonts.ready.then(loaded, loaded);
      document.fonts.addEventListener("loadingdone", loaded);
    } else {
      loaded();
    }
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.fonts?.removeEventListener("loadingdone", loaded);
    };
  }, [enabled, text]);

  const showCanvas = useCallback(() => setReady(true), []);
  const showFallback = useCallback(() => {
    setReady(false);
    setFailed(true);
  }, []);

  return (
    <span ref={root} className="tech-heading" data-tech-ready={enabled && ready && !failed ? "true" : undefined}>
      <span ref={nativeText} className="tech-heading-text">{text}</span>
      <span ref={baseline} className="tech-heading-baseline" aria-hidden="true" />
      {enabled && metrics && !failed && (
        <span className="tech-heading-effect" style={{ inset: -metrics.padding }} aria-hidden="true">
          <TechText
            text={text}
            fontFamily={metrics.fontFamily}
            fontStyle={metrics.fontStyle}
            fontWeight={metrics.fontWeight}
            fontSize={metrics.fontSize}
            letterSpacing={metrics.letterSpacing}
            inlineLayout={metrics.inlineLayout}
            reach={metrics.reach}
            reveal="letter"
            sweep={false}
            intro="none"
            selection={false}
            labels={false}
            guides={false}
            draggable={false}
            clickKick={false}
            specks={0}
            onReady={showCanvas}
            onError={showFallback}
          />
        </span>
      )}
    </span>
  );
}
