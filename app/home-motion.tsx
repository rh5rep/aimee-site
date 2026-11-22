"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const main = document.getElementById("main");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!main || !motion.matches || !("IntersectionObserver" in window)) return;

    const waiting = new Set<HTMLElement>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement, true);
      }
    }, { rootMargin: "0px 0px -48px 0px" });

    function reveal(element: HTMLElement, animate = false) {
      if (waiting.delete(element)) {
        observer.unobserve(element);
        if (animate) {
          element.dataset.homeRevealState = "arriving";
          return;
        }
      }
      if (!animate) delete element.dataset.homeRevealState;
    }

    function showTarget() {
      const target = main?.querySelector(":target");
      const section = target?.closest<HTMLElement>("[data-home-reveal]")
        ?? target?.querySelector<HTMLElement>("[data-home-reveal]");
      if (section) reveal(section);
    }

    function showFocused(event: FocusEvent) {
      const section = (event.target as Element).closest<HTMLElement>("[data-home-reveal]");
      if (section) reveal(section);
    }

    function finishArrival(event: AnimationEvent) {
      const element = event.target;
      if (element instanceof HTMLElement && element.dataset.homeRevealState === "arriving") {
        delete element.dataset.homeRevealState;
      }
    }

    for (const element of main.querySelectorAll<HTMLElement>("[data-home-reveal]")) {
      if (element.getBoundingClientRect().top < window.innerHeight || element.matches(":target, :has(:target), :focus-within")) continue;
      element.dataset.homeRevealState = "waiting";
      waiting.add(element);
      observer.observe(element);
    }

    showTarget();
    window.addEventListener("hashchange", showTarget);
    main.addEventListener("focusin", showFocused);
    main.addEventListener("animationend", finishArrival);
    main.addEventListener("animationcancel", finishArrival);
    return () => {
      observer.disconnect();
      for (const element of main.querySelectorAll<HTMLElement>("[data-home-reveal-state]")) {
        delete element.dataset.homeRevealState;
      }
      window.removeEventListener("hashchange", showTarget);
      main.removeEventListener("focusin", showFocused);
      main.removeEventListener("animationend", finishArrival);
      main.removeEventListener("animationcancel", finishArrival);
    };
  }, []);

  return null;
}
