import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { activity, formatDay, calendarLayout, buildingForDay, activityColors } from "./activityData";
import "./city.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContributionCity({ onReady }) {
  const root = useRef(null),
    host = useRef(null),
    api = useRef(null);
  const tooltip = useRef(null);
  const interactionMode = useRef("hover");
  const pointerType = useRef("mouse");
  const [range, setRange] = useState(() =>
    window.innerWidth < 810 ? 91 : 365,
  );
  const [source, setSource] = useState("all");
  const [selected, setSelected] = useState(350);
  const [inspected, setInspected] = useState(null);
  const [calendarReady, setCalendarReady] = useState(false);
  const [error, setError] = useState(false);
  const [sceneFactory, setSceneFactory] = useState(null);
  useEffect(() => {
    let active = true;
    // Keep the static calendar if the optional 3D chunk misses startup's
    // deadline; a late module must not pop a new scene into the visible page.
    const deadline = setTimeout(() => {
      active = false;
      setError(true);
    }, 3500);
    import("./cityScene").then(({ makeScene }) => {
      clearTimeout(deadline);
      if (active) setSceneFactory(() => makeScene);
    }).catch(() => {
      clearTimeout(deadline);
      if (active) setError(true);
    });
    return () => { active = false; clearTimeout(deadline); };
  }, []);
  const rows = useMemo(() => activity.slice(-range), [range]);
  const calendar = useMemo(() => calendarLayout(rows), [rows]);
  const startIndex = activity.length - range;
  const day = inspected === null ? null : activity[inspected];
  const ready = error || calendarReady;
  useEffect(() => {
    // A renderer fallback changes the section's height and later reveal positions.
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (error) onReady?.();
    });
    return () => cancelAnimationFrame(frame);
  }, [error, onReady]);
  const totals = useMemo(
    () =>
      rows.reduce(
        (a, d) => ({
          github: a.github + d.github,
          leetcode: a.leetcode + d.leetcode,
          active: a.active + Number(d.github + d.leetcode > 0),
        }),
        { github: 0, leetcode: 0, active: 0 },
      ),
    [rows],
  );
  useGSAP(
    () => {
      if (!sceneFactory) return;
      let scene;
      try {
        scene = sceneFactory(host.current, rows, root.current.querySelectorAll(".city-month"), onReady);
        setError(false);
      } catch {
        setError(true);
        return;
      }
      api.current = scene;
      scene.filter(source);
      const media = gsap.matchMedia();
      const controls = root.current.querySelector(".city-calendar-ui");
      const cue = root.current.querySelector(".city-scroll-cue");
      const months = root.current.querySelector(".city-months");
      const heading = root.current.querySelector(".city-heading");
      const progress = { value: 0 };
      let wasReady;
      const paint = () => {
        // Finish the camera before labels appear, leaving a short reading pause.
        const travel = gsap.utils.clamp(0, 1, (progress.value - 0.06) / 0.72);
        // Exponential acceleration: a gentle opening, with most travel near the end.
        const cameraProgress = Math.expm1(3 * travel) / Math.expm1(3);
        scene.setProgress(cameraProgress);
        const reveal = gsap.utils.clamp(0, 1, (progress.value - 0.78) / 0.12);
        const isReady = reveal >= 0.95;
        if (isReady !== wasReady) {
          wasReady = isReady;
          setCalendarReady(isReady);
          if (!isReady) setInspected(null);
        }
        controls.style.opacity = reveal;
        controls.inert = reveal < 0.95;
        months.style.opacity = reveal;
        months.setAttribute("aria-hidden", reveal < 0.95 ? "true" : "false");
        heading.style.opacity = reveal;
        heading.style.transform = `translateY(${(1 - reveal) * 16}px)`;
        heading.setAttribute("aria-hidden", reveal < 0.95 ? "true" : "false");
        cue.style.opacity = 1 - gsap.utils.clamp(0, 1, progress.value / 0.2);
        root.current.dataset.view = cameraProgress === 1 ? "calendar" : "city";
      };
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const syncToScroll = (trigger) => {
          // A rebuilt scene can mount after the trigger has already finished.
          // Align both the playhead and driver after fromTo/refresh initialization.
          trigger.animation?.totalProgress(trigger.progress, true);
          progress.value = trigger.progress;
          paint();
        };
        const animation = gsap.fromTo(progress, { value: 0 }, {
          value: 1,
          ease: "none",
          onUpdate: paint,
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
            invalidateOnRefresh: true,
            onRefresh: syncToScroll,
          },
        });
        syncToScroll(animation.scrollTrigger);
      });
      media.add("(prefers-reduced-motion: reduce)", () => {
        progress.value = 1;
        paint();
      });
      ScrollTrigger.refresh();
      return () => {
        media.revert();
        controls.style.opacity = "";
        controls.inert = false;
        months.style.opacity = "";
        heading.style.opacity = "";
        heading.style.transform = "";
        cue.style.opacity = "";
        scene.dispose();
        api.current = null;
      };
    },
    { scope: root, dependencies: [range, sceneFactory], revertOnUpdate: true },
  );
  useEffect(() => {
    api.current?.select(ready ? inspected : null);
  }, [inspected, ready]);
  useEffect(() => {
    api.current?.filter(source);
  }, [source]);
  function changeRange(value) {
    setInspected(null);
    setRange(value);
    setSelected((index) => Math.max(activity.length - value, index));
  }
  function inspect(index, mode) {
    interactionMode.current = mode;
    setSelected(index);
    setInspected(index);
  }
  function navigateDay(event, index) {
    if (event.key === "Escape") {
      setInspected(null);
      return;
    }
    const steps = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
    let next;
    if (event.key === "Home") next = startIndex;
    else if (event.key === "End") next = activity.length - 1;
    else if (event.key in steps) next = Math.min(activity.length - 1, Math.max(startIndex, index + steps[event.key]));
    else return;
    event.preventDefault();
    inspect(next, "keyboard");
    root.current.querySelector(`[data-day="${next}"]`)?.focus({ preventScroll: true });
  }
  useEffect(() => {
    const dismissOutside = event => {
      if (!event.target.closest?.(".city-hit-grid")) setInspected(null);
    };
    const dismissOnScroll = () => {
      if (interactionMode.current !== "keyboard") setInspected(null);
    };
    window.addEventListener("pointerdown", dismissOutside);
    window.addEventListener("scroll", dismissOnScroll, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", dismissOutside);
      window.removeEventListener("scroll", dismissOnScroll);
    };
  }, []);
  useLayoutEffect(() => {
    if (inspected === null || !ready || !tooltip.current) return;
    const container = root.current.querySelector(".container");
    const cell = root.current.querySelector(`[data-day="${inspected}"]`);
    let frame;
    const position = () => {
      const target = cell.getBoundingClientRect();
      const bounds = container.getBoundingClientRect();
      const bubble = tooltip.current.getBoundingClientRect();
      const x = Math.min(Math.max(0, bounds.width - bubble.width), Math.max(0, target.left - bounds.left + target.width / 2 - bubble.width / 2));
      const above = target.top - bubble.height - 12;
      const y = (above >= 12 ? above : target.bottom + 12) - bounds.top;
      tooltip.current.style.left = `${x}px`;
      tooltip.current.style.top = `${y}px`;
    };
    const resize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(position);
    };
    position();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    observer.observe(tooltip.current);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [inspected, ready, range]);
  return (
    <section
      ref={root}
      className="activity-section"
      data-loading={!sceneFactory && !error ? "true" : undefined}
      data-error={error ? "true" : undefined}
      id="activity"
      aria-label="My contributions"
    >
      <div className="city-sticky grid-paper">
      <div className="container">
        <div className="city-heading" aria-hidden={!ready}>
          <h2>My contributions</h2>
        </div>
        <div className="city-visual">
        <div
          className="city-stage"
          ref={host}
          role="img"
          aria-label={`3D city of ${range} days of sample activity. Green for GitHub only, yellow for LeetCode only, blue for both. Scroll to reveal the interactive calendar.`}
        >
          {error && (
            <p className="city-fallback">
              Explore the sample calendar below.
            </p>
          )}
        </div>
        <div className="city-months" aria-label="Calendar months">
          {calendar.months.map((month) => (
            <span className="city-month" key={month.key} data-column={month.column}>{month.label}</span>
          ))}
        </div>
        </div>
        <div
          className="city-hit-grid"
          role="group"
          aria-label="Daily activity calendar"
          aria-describedby="city-interaction-hint"
          aria-hidden={!ready}
          inert={!ready}
          onPointerLeave={() => { if (interactionMode.current === "hover") setInspected(null); }}
          onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInspected(null); }}
        >
          {calendar.cells.map(cell => {
            const building = buildingForDay(cell, source);
            return (
              <button
                key={cell.date}
                className="city-day"
                data-day={cell.index}
                data-active={inspected === cell.index ? "true" : undefined}
                tabIndex={selected === cell.index ? 0 : -1}
                aria-label={`${formatDay(cell.date)}: ${cell.github} GitHub contributions, ${cell.leetcode} LeetCode problems`}
                aria-describedby={inspected === cell.index ? "city-day-tooltip" : undefined}
                style={{
                  left: `${cell.column * 1.04 / ((calendar.columns - 1) * 1.04 + 0.78) * 100}%`,
                  top: `${cell.row * 1.04 / 7.02 * 100}%`,
                  width: `${0.78 / ((calendar.columns - 1) * 1.04 + 0.78) * 100}%`,
                  height: `${0.78 / 7.02 * 100}%`,
                  "--day-color": building ? activityColors[building.source][building.level] : "#dfe3de",
                }}
                onPointerDown={event => { pointerType.current = event.pointerType; }}
                onPointerEnter={event => { if (event.pointerType !== "touch") inspect(cell.index, "hover"); }}
                onFocus={event => { if (event.currentTarget.matches(":focus-visible")) inspect(cell.index, "keyboard"); }}
                onClick={event => inspect(cell.index, event.detail === 0 ? "keyboard" : pointerType.current === "touch" ? "touch" : "hover")}
                onKeyDown={event => navigateDay(event, cell.index)}
              />
            );
          })}
        </div>
        {ready && day && (
          <div className="city-tooltip" id="city-day-tooltip" ref={tooltip} role="tooltip">
            <time dateTime={day.date}>{formatDay(day.date)}</time>
            <span><span className="source-dot github" aria-hidden="true" />{day.github} GitHub {day.github === 1 ? "contribution" : "contributions"}</span>
            <span><span className="source-dot leetcode" aria-hidden="true" />{day.leetcode} LeetCode {day.leetcode === 1 ? "problem" : "problems"}</span>
          </div>
        )}
        <div className="city-calendar-ui" inert={!ready} aria-hidden={!ready}>
        <div className="city-toolbar">
          <div className="city-sources" aria-label="Contribution source">
            {["all", "github", "leetcode", "both"].map((value) => (
              <button
                key={value}
                aria-pressed={source === value}
                onClick={() => setSource(value)}
              >
                {value !== "all" && (
                  <span className={`source-dot ${value}`} aria-hidden="true" />
                )}
                {source === value ? "( " : ""}
                {value === "github"
                  ? "GitHub"
                  : value === "leetcode"
                    ? "LeetCode"
                    : value === "both"
                      ? "Both"
                      : "All"}
                {source === value ? " )" : ""}
              </button>
            ))}
          </div>
          <div className="city-range" aria-label="Activity date range">
            <button aria-pressed={range === 91} onClick={() => changeRange(91)}>
              {range === 91 ? "( 3 months )" : "3 months"}
            </button>
            <button
              aria-pressed={range === 365}
              onClick={() => changeRange(365)}
            >
              {range === 365 ? "( Year )" : "Year"}
            </button>
          </div>
        </div>
        <div className="city-footer">
          <span className="city-interaction-hint" id="city-interaction-hint">Hover or tap a day. Use arrow keys when focused.</span>
          <div>
            <span>
              <strong>{totals.github.toLocaleString()}</strong> GitHub
            </span>
            <span>
              <strong>{totals.leetcode.toLocaleString()}</strong> LeetCode
            </span>
            <span>
              <strong>{totals.active}</strong> active days
            </span>
          </div>
          <span className="sample-note">
            Illustrative data, not live profile stats.
          </span>
        </div>
        </div>
        <span className="city-scroll-cue" aria-hidden="true">Scroll to see the year <span>↓</span></span>
      </div>
      </div>
    </section>
  );
}
