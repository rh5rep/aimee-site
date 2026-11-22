"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import styles from "./first-project.module.css";
import { services } from "./work/services";

const projects = services.flatMap(({ id, firstProject }) =>
  firstProject ? [{ id, ...firstProject }] : [],
);

function getScrollPosition(track: HTMLDivElement, board: HTMLDivElement) {
  const stickyTop = Number.parseFloat(getComputedStyle(board).top);
  return {
    offset: stickyTop - track.getBoundingClientRect().top,
    step: (track.offsetHeight - board.offsetHeight) / projects.length,
  };
}

export function FirstProject() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const measure = () =>
      setScrollEnabled(motion.matches && board.offsetHeight <= window.innerHeight - 48);

    const resize = new ResizeObserver(measure);
    resize.observe(board);
    window.addEventListener("resize", measure);
    motion.addEventListener("change", measure);

    return () => {
      resize.disconnect();
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", measure);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const board = boardRef.current;
    if (!scrollEnabled || !track || !board) return;

    let frame = 0;
    const syncProject = () => {
      frame = 0;
      const focused = document.activeElement;
      const shouldKeepFocus = focused?.matches(":focus-visible") || focused?.closest('[role="tabpanel"]');
      if (board.contains(focused) && shouldKeepFocus) return;

      const { offset, step } = getScrollPosition(track, board);
      if (step <= 0) return;

      const index = Math.floor(offset / step);
      setActiveIndex(Math.max(0, Math.min(projects.length - 1, index)));
    };
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(syncProject);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollEnabled]);

  function selectProject(index: number) {
    setActiveIndex(index);
    const track = trackRef.current;
    const board = boardRef.current;
    if (!scrollEnabled || !track || !board) return;

    const { offset, step } = getScrollPosition(track, board);
    if (step > 0 && Math.floor(offset / step) !== index) {
      window.scrollTo({ top: window.scrollY - offset + index * step + 2, behavior: "instant" });
    }
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;

    switch (event.key) {
      case "ArrowUp": next = (index - 1 + projects.length) % projects.length; break;
      case "ArrowDown": next = (index + 1) % projects.length; break;
      case "Home": next = 0; break;
      case "End": next = projects.length - 1; break;
      default: return;
    }

    event.preventDefault();
    selectProject(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <section className={`container ${styles.section}`} id="services" aria-labelledby="services-title" tabIndex={-1}>
      <div
        className={styles.track}
        data-scroll={scrollEnabled}
        ref={trackRef}
        style={{ "--project-count": projects.length } as CSSProperties}
      >
        <div className={styles.board} ref={boardRef}>
          <div className={styles.choices}>
            <h2 id="services-title"><span>What would you</span> bring <em>us?</em></h2>
            <p className={styles.hint}>{scrollEnabled ? "Scroll or choose a starting point." : "Choose a starting point."}</p>
            <div className={styles.tabs} role="tablist" aria-orientation="vertical" aria-labelledby="services-title">
              {projects.map(({ id, bring }, index) => (
                <button
                  key={id}
                  ref={(button) => { tabs.current[index] = button; }}
                  type="button"
                  role="tab"
                  id={`project-tab-${id}`}
                  aria-controls={`project-panel-${id}`}
                  aria-selected={activeIndex === index}
                  tabIndex={activeIndex === index ? 0 : -1}
                  onClick={() => selectProject(index)}
                  onKeyDown={(event) => handleTabKey(event, index)}
                >
                  <span>{bring}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.answers}>
            <h2><span>What would <em>we</em></span> bring <em>you?</em></h2>
            <div className={styles.panels}>
              {projects.map(({ id, format, help, takeaway }, index) => (
                <div
                  key={id}
                  className={styles.panel}
                  role="tabpanel"
                  id={`project-panel-${id}`}
                  aria-labelledby={`project-tab-${id}`}
                  tabIndex={activeIndex === index ? 0 : -1}
                  aria-hidden={activeIndex !== index}
                  inert={activeIndex !== index}
                >
                  <div className={styles.response}>
                    <h3>{format}</h3>
                    <p>{help}</p>
                    <div className={styles.takeaway}>
                      <p>You take away</p>
                      <p>{takeaway}</p>
                    </div>
                    <Link className="text-link" href={`/work#${id}`}>Explore this service</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.scrollSpace} aria-hidden="true" />
      </div>
    </section>
  );
}
