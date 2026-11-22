"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const main = document.getElementById("main");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!main || !motion.matches || !("IntersectionObserver" in window)) return;

    const waiting = new Map<HTMLElement, HTMLElement>();
    const inset = Math.min(160, Math.round(window.innerHeight * .2));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target.closest<HTMLElement>("[data-home-reveal]");
        if (element) reveal(element, true);
      }
    }, { rootMargin: `0px 0px -${inset}px 0px` });

    function reveal(element: HTMLElement, animate = false) {
      const trigger = waiting.get(element);
      if (trigger) {
        waiting.delete(element);
        observer.unobserve(trigger);
        if (animate) {
          element.dataset.homeRevealState = "arriving";
          return;
        }
      }
      if (!animate) delete element.dataset.homeRevealState;
    }

    function showTarget() {
      const section = main?.querySelector(":target")?.closest<HTMLElement>("[data-home-reveal]");
      if (section) reveal(section);
    }

    function showFocused(event: FocusEvent) {
      const section = (event.target as Element).closest<HTMLElement>("[data-home-reveal]");
      if (section) reveal(section);
    }

    function finishArrival(event: AnimationEvent) {
      const element = event.target;
      if (!(element instanceof HTMLElement)) return;
      const arrival = element.closest<HTMLElement>('[data-home-reveal-state="arriving"]');
      if (arrival && (arrival === element || element.hasAttribute("data-home-reveal-finish"))) {
        delete arrival.dataset.homeRevealState;
      }
    }

    for (const element of main.querySelectorAll<HTMLElement>("[data-home-reveal]")) {
      const trigger = element.querySelector<HTMLElement>("[data-home-reveal-trigger]") ?? element;
      if (trigger.getBoundingClientRect().top < window.innerHeight - inset || element.matches(":target, :has(:target), :focus-within")) continue;
      element.dataset.homeRevealState = "waiting";
      waiting.set(element, trigger);
      observer.observe(trigger);
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
