import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./magneticCursor.css";

gsap.registerPlugin(useGSAP);

const pointerQuery = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const nativeSelector = "input, textarea, select, [contenteditable]:not([contenteditable='false']), dialog, [role='dialog'], .city-hit-grid, [data-cursor-native]";
const activeClass = "magnetic-cursor-active";
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/** A delegated magnetic cursor. Mark small, stable hit areas with data-magnetic. */
export default function MagneticCursor({
  children,
  disabled = false,
  magneticFactor = 0.2,
  lerpAmount = 0.16,
  hoverPadding = 8,
  hoverAttribute = "data-magnetic",
  cursorSize = 24,
  cursorColor = "white",
  blendMode = "exclusion",
  cursorClassName = "",
  shape = "circle",
  speedMultiplier = 0.012,
  maxScaleX = 0.28,
  maxScaleY = 0.1,
  contrastBoost = 1,
}) {
  const cursorRef = useRef(null);
  const surfaceRef = useRef(null);
  const size = Math.max(1, cursorSize);
  const restingRadius = shape === "circle" ? size / 2 : shape === "square" ? 0 : 8;

  useGSAP(() => {
    if (disabled) return;
    const cursor = cursorRef.current;
    const surface = surfaceRef.current;
    if (!cursor || !surface) return;

    const media = gsap.matchMedia();
    media.add(pointerQuery, () => {
      const root = document.documentElement;
      const selector = /^[a-zA-Z][\w:-]*$/.test(hoverAttribute)
        ? `[${hoverAttribute}]`
        : "[data-magnetic]";
      const labels = new Map();
      const point = { x: 0, y: 0 };
      const current = { x: 0, y: 0, width: size, height: size, radius: restingRadius, scaleX: 1, scaleY: 1 };
      let target = null;
      let targetRadius = 0;
      let frame = 0;
      let lastTime = 0;
      let ready = false;
      let visible = false;
      let pressed = false;
      let interactivePress = false;
      let pressPoint = null;
      let alive = true;

      gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
      gsap.set(surface, { transformOrigin: "50% 50%", scaleX: 1, scaleY: 1, borderRadius: restingRadius });
      const placeCursor = gsap.quickSetter(cursor, "css");
      const shapeCursor = gsap.quickSetter(surface, "css");

      function moveLabel(element, x, y) {
        const label = element?.querySelector(".roll-label");
        if (!label) return;
        let controller = labels.get(label);
        if (!controller) {
          let xTo;
          let yTo;
          // This local context also captures labels inserted after mount. The track
          // inside the label retains its independent CSS rolling transform.
          const context = gsap.context(() => {
            xTo = gsap.quickTo(label, "x", { duration: 0.38, ease: "power3.out" });
            yTo = gsap.quickTo(label, "y", { duration: 0.38, ease: "power3.out" });
          }, label);
          controller = { context, xTo, yTo, x: null, y: null };
          labels.set(label, controller);
        }
        if (controller.x !== x) controller.xTo(x);
        if (controller.y !== y) controller.yTo(y);
        controller.x = x;
        controller.y = y;
      }

      function releaseTarget() {
        if (target) moveLabel(target, 0, 0);
        target = null;
      }

      function suspend() {
        ready = false;
        visible = false;
        lastTime = 0;
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        root.classList.remove(activeClass);
        cursor.style.opacity = "0";
        releaseTarget();
      }

      function usesNativeCursor(element) {
        return !(element instanceof Element)
          || Boolean(element.closest(nativeSelector))
          || Boolean(document.querySelector("dialog[open], [role='dialog'][aria-modal='true']"));
      }

      function requestFrame() {
        if (alive && ready && !frame) frame = window.requestAnimationFrame(update);
      }

      function update(time) {
        frame = 0;
        if (!alive || !ready) return;
        // Re-hit-test during settling and on native/Lenis scroll, resize or DOM
        // changes. A stationary pointer cannot keep a highlight on an old link.
        const element = document.elementFromPoint(point.x, point.y);
        if (usesNativeCursor(element)) {
          suspend();
          return;
        }
        let nextTarget = element.closest(selector);
        if (nextTarget?.matches(":disabled, [aria-disabled='true'], [inert]")) nextTarget = null;
        let bounds = nextTarget?.getBoundingClientRect();
        const label = nextTarget?.querySelector(".roll-label");
        if (label && (bounds.width > 200 || nextTarget.dataset.magneticBounds === "label")) {
          const labelBounds = label.getBoundingClientRect();
          // Grid links can have wide hit areas. Follow their visible label,
          // subtracting our own translation so the measurement cannot drift.
          bounds = { left: labelBounds.left - (Number(gsap.getProperty(label, "x")) || 0),
            top: labelBounds.top - (Number(gsap.getProperty(label, "y")) || 0),
            width: labelBounds.width, height: labelBounds.height };
        }
        if (bounds && (!bounds.width || !bounds.height)) nextTarget = null;
        if (nextTarget !== target) {
          releaseTarget();
          target = nextTarget;
          if (target) {
            const radius = window.getComputedStyle(target).borderTopLeftRadius;
            targetRadius = radius.endsWith("%")
              ? Math.min(bounds.width, bounds.height) * parseFloat(radius) / 100
              : parseFloat(radius) || 0;
          }
        }

        const desired = target
          ? { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2,
            width: bounds.width + hoverPadding * 2, height: bounds.height + hoverPadding * 2,
            radius: targetRadius }
          : { x: point.x, y: point.y, width: size, height: size, radius: restingRadius };
        if (target) {
          moveLabel(target,
            clamp((point.x - desired.x) * magneticFactor, -4, 4),
            clamp((point.y - desired.y) * magneticFactor, -3, 3));
        }

        const elapsed = lastTime ? clamp(time - lastTime, 1, 64) : 16.67;
        const amount = 1 - Math.pow(1 - clamp(lerpAmount, 0.01, 1), elapsed / 16.67);
        lastTime = time;
        const oldX = current.x;
        const oldY = current.y;
        for (const key of ["x", "y", "width", "height", "radius"]) {
          current[key] += (desired[key] - current[key]) * amount;
        }
        const dx = current.x - oldX;
        const dy = current.y - oldY;
        // Keep the rectangle level while attaching/detaching. Only the small free
        // circle stretches, and the fixed link/button hitbox never moves.
        const free = !target && Math.abs(current.width - size) + Math.abs(current.height - size) < 0.5;
        const speed = free ? Math.hypot(dx, dy) * speedMultiplier * 16.67 / elapsed : 0;
        const desiredScaleX = 1 + Math.min(speed, Math.max(0, maxScaleX));
        const desiredScaleY = 1 - Math.min(speed, clamp(maxScaleY, 0, 0.5));
        current.scaleX += (desiredScaleX - current.scaleX) * amount;
        current.scaleY += (desiredScaleY - current.scaleY) * amount;
        const scaleX = current.width / size * current.scaleX;
        const scaleY = current.height / size * current.scaleY;
        placeCursor({ x: current.x, y: current.y,
          rotation: free && Math.hypot(dx, dy) > 0.01 ? Math.atan2(dy, dx) * 180 / Math.PI : 0 });
        shapeCursor({ scaleX, scaleY });
        // Set the elliptical shorthand directly: parsing it as a GSAP CSS tween
        // can leave different corner radii when its two axes change together.
        surface.style.borderRadius = `${current.radius / scaleX}px / ${current.radius / scaleY}px`;

        const settling = ["x", "y", "width", "height", "radius"].some(key => Math.abs(desired[key] - current[key]) > 0.03)
          || Math.abs(current.scaleX - 1) + Math.abs(current.scaleY - 1) > 0.002;
        if (settling) requestFrame();
        else lastTime = 0;
      }

      function onPointerMove(event) {
        const dragging = pressed && (!interactivePress || !pressPoint
          || Math.hypot(event.clientX - pressPoint.x, event.clientY - pressPoint.y) > 4);
        if (dragging) interactivePress = false;
        if (event.pointerType !== "mouse" || dragging || (event.buttons && !interactivePress)
          || event.clientX < 0 || event.clientY < 0
          || event.clientX >= window.innerWidth || event.clientY >= window.innerHeight
          || usesNativeCursor(event.target)) {
          suspend();
          return;
        }
        point.x = event.clientX;
        point.y = event.clientY;
        ready = true;
        if (!visible) {
          current.x = point.x;
          current.y = point.y;
          current.width = current.height = size;
          current.radius = restingRadius;
          current.scaleX = current.scaleY = 1;
          placeCursor({ x: point.x, y: point.y, rotation: 0 });
          shapeCursor({ scaleX: 1, scaleY: 1 });
          surface.style.borderRadius = `${restingRadius}px`;
          cursor.style.opacity = "1";
          root.classList.add(activeClass);
          visible = true;
        }
        requestFrame();
      }

      const onPointerDown = (event) => {
        pressed = true;
        pressPoint = { x: event.clientX, y: event.clientY };
        interactivePress = event.pointerType === "mouse" && event.button === 0
          && !usesNativeCursor(event.target)
          && Boolean(event.target.closest?.("a[href], button, [role='button']"));
        // A click retains its hover feedback. A text press or subsequent drag
        // immediately returns the native pointer for accurate selection.
        if (!interactivePress) suspend();
      };
      const onPointerUp = () => { pressed = false; interactivePress = false; pressPoint = null; };
      const onBlur = () => { onPointerUp(); suspend(); };
      const onDragStart = () => { interactivePress = false; suspend(); };
      const onVisibility = () => { if (document.hidden) onBlur(); };
      const onPointerOut = (event) => { if (!event.relatedTarget) onBlur(); };
      const onLayout = () => { if (ready) requestFrame(); };
      const observer = new MutationObserver(onLayout);

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("pointerup", onPointerUp, { passive: true });
      window.addEventListener("pointercancel", onBlur, { passive: true });
      window.addEventListener("dragstart", onDragStart);
      window.addEventListener("dragend", onPointerUp);
      window.addEventListener("pointerout", onPointerOut, { passive: true });
      window.addEventListener("blur", onBlur);
      window.addEventListener("keydown", suspend);
      window.addEventListener("resize", onLayout, { passive: true });
      document.addEventListener("scroll", onLayout, { passive: true, capture: true });
      document.addEventListener("visibilitychange", onVisibility);
      root.addEventListener("pointerleave", onBlur, { passive: true });
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        alive = false;
        suspend();
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onBlur);
        window.removeEventListener("dragstart", onDragStart);
        window.removeEventListener("dragend", onPointerUp);
        window.removeEventListener("pointerout", onPointerOut);
        window.removeEventListener("blur", onBlur);
        window.removeEventListener("keydown", suspend);
        window.removeEventListener("resize", onLayout);
        document.removeEventListener("scroll", onLayout, true);
        document.removeEventListener("visibilitychange", onVisibility);
        root.removeEventListener("pointerleave", onBlur);
        for (const { context } of labels.values()) context.revert();
        labels.clear();
      };
    });
    return () => media.revert();
  }, { scope: cursorRef, dependencies: [disabled, magneticFactor, lerpAmount, hoverPadding, hoverAttribute, size, restingRadius, speedMultiplier, maxScaleX, maxScaleY], revertOnUpdate: true });

  return (
    <>
      <div ref={cursorRef} aria-hidden="true" className={`magnetic-cursor ${cursorClassName}`}
        style={{ width: size, height: size, mixBlendMode: blendMode }}>
        <div ref={surfaceRef} className="magnetic-cursor-surface" style={{ backgroundColor: cursorColor,
          borderRadius: restingRadius,
          backdropFilter: contrastBoost === 1 ? "none" : `contrast(${contrastBoost})`,
          WebkitBackdropFilter: contrastBoost === 1 ? "none" : `contrast(${contrastBoost})` }} />
      </div>
      {children}
    </>
  );
}
