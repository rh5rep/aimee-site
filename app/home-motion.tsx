"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const main = document.getElementById("main");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!main || !motion.matches || !("IntersectionObserver" in window)) return;

    const pending = new Map<HTMLElement, HTMLElement>();
    const services = main.querySelector("#services");
    const startLink = main.querySelector<HTMLAnchorElement>("[data-home-service-start]");
    const questions = startLink && main.querySelector<HTMLElement>(startLink.hash);
    const startSteps = [...(services?.querySelectorAll<HTMLElement>('[data-home-reveal="exchange"]') ?? [])];
    let startStep = -1;
    let startFrame = 0;
    let startPause = 0;
    let previousScroll = window.scrollY;
    const inset = Math.min(160, Math.round(window.innerHeight * .2));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target.closest<HTMLElement>("[data-home-reveal]");
        if (element) reveal(element, true);
      }
    }, { rootMargin: `0px 0px -${inset}px 0px` });

    function reveal(element: HTMLElement, animate = false) {
      const trigger = pending.get(element);
      if (!trigger) return;
      observer.unobserve(trigger);
      if (animate) {
        element.dataset.homeRevealState = "arriving";
        return;
      }
      pending.delete(element);
      delete element.dataset.homeRevealState;
    }

    function showScrolledPast() {
      const scroll = window.scrollY;
      const distance = Math.abs(scroll - previousScroll);
      previousScroll = scroll;
      if (startStep >= 0) {
        if (startFrame || distance <= 2) return;
        stopStartReveal();
      }
      if (!pending.size) return;
      if (services?.matches(":target") && services.getBoundingClientRect().top >= 0) return;

      // Keep the stagger near the bottom of the screen. Show content as soon as
      // a reader reaches it, or across the viewport after a large scroll jump.
      const height = window.innerHeight;
      const edge = distance >= height * .3 ? height : height * .55;
      for (const [element, trigger] of pending) {
        if (trigger.getBoundingClientRect().top <= edge) reveal(element);
      }
    }

    function showTarget() {
      stopStartReveal();
      const section = main?.querySelector(":target")?.closest<HTMLElement>("[data-home-reveal]");
      if (section) reveal(section);
    }

    function stopStartReveal() {
      if (startStep < 0) return;
      window.cancelAnimationFrame(startFrame);
      window.clearTimeout(startPause);
      if (startFrame) window.scrollTo({ top: window.scrollY, behavior: "instant" });
      startFrame = 0;
      startStep = -1;
      for (const step of startSteps) delete step.dataset.homeStartState;
    }

    function animateStartStep(step: HTMLElement) {
      step.dataset.homeStartState = "playing";
      // Keep all service links usable if the animation never signals completion.
      startPause = window.setTimeout(stopStartReveal, 2400);
    }

    function playStartStep() {
      const step = startSteps[startStep];
      const { top, bottom, height } = step.getBoundingClientRect();
      const { scrollPaddingTop, scrollPaddingBottom } = getComputedStyle(document.documentElement);
      const topInset = parseFloat(scrollPaddingTop) || 0;
      const bottomInset = parseFloat(scrollPaddingBottom) || 0;
      const viewport = window.innerHeight;
      const scroll = window.scrollY;
      const alignTop = startStep === 0 || top < topInset || height > viewport - topInset - bottomInset;
      const distance = alignTop ? top - topInset : Math.max(0, bottom - viewport + bottomInset);
      const limit = document.documentElement.scrollHeight - viewport;
      const destination = Math.max(0, Math.min(scroll + distance, limit));

      if (Math.abs(destination - scroll) <= 2) {
        animateStartStep(step);
        return;
      }

      // Keep the preceding pair in view where possible as the next one arrives.
      window.scrollTo({ top: destination, behavior: "smooth" });
      const deadline = performance.now() + 1000;
      function waitForStep(now: number) {
        if (Math.abs(window.scrollY - destination) <= 2) {
          startFrame = 0;
          animateStartStep(step);
        } else if (now < deadline) {
          startFrame = window.requestAnimationFrame(waitForStep);
        } else {
          stopStartReveal();
        }
      }
      startFrame = window.requestAnimationFrame(waitForStep);
    }

    function startWalkthrough(event: MouseEvent) {
      if (!startLink || !questions || startSteps[0] !== questions || !motion.matches ||
          event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      stopStartReveal();
      if (window.location.hash !== startLink.hash) window.history.pushState(null, "", startLink.hash);
      for (const step of startSteps) {
        reveal(step);
        step.dataset.homeStartState = "waiting";
      }
      startStep = 0;
      questions.focus({ preventScroll: true });
      playStartStep();
    }

    function showFocused(event: FocusEvent) {
      if (event.target !== questions) stopStartReveal();
      const section = (event.target as Element).closest<HTMLElement>("[data-home-reveal]");
      if (section) reveal(section);
    }

    function returnScrollControl(event: KeyboardEvent) {
      const scrollKeys = [" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Escape", "Tab"];
      if (scrollKeys.includes(event.key)) stopStartReveal();
    }

    function finishArrival(event: AnimationEvent) {
      const element = event.target;
      if (!(element instanceof HTMLElement)) return;
      const step = startSteps[startStep];
      if (event.type === "animationend" && step?.dataset.homeStartState === "playing" &&
          element.hasAttribute("data-home-reveal-finish") && step.contains(element)) {
        window.clearTimeout(startPause);
        delete step.dataset.homeStartState;
        if (startStep === startSteps.length - 1) {
          stopStartReveal();
        } else {
          startPause = window.setTimeout(() => {
            startStep += 1;
            playStartStep();
          }, startStep === 0 ? 350 : 1100);
        }
      }
      const arrival = element.closest<HTMLElement>('[data-home-reveal-state="arriving"]');
      if (arrival && (arrival === element || element.hasAttribute("data-home-reveal-finish"))) {
        reveal(arrival);
      }
    }

    for (const element of main.querySelectorAll<HTMLElement>("[data-home-reveal]")) {
      const trigger = element.querySelector<HTMLElement>("[data-home-reveal-trigger]") ?? element;
      if (trigger.getBoundingClientRect().top < window.innerHeight - inset || element.matches(":target, :has(:target), :focus-within")) continue;
      element.dataset.homeRevealState = "waiting";
      pending.set(element, trigger);
      observer.observe(trigger);
    }

    showTarget();
    startLink?.addEventListener("click", startWalkthrough);
    window.addEventListener("scroll", showScrolledPast, { passive: true });
    window.addEventListener("hashchange", showTarget);
    window.addEventListener("popstate", showTarget);
    window.addEventListener("wheel", stopStartReveal, { passive: true });
    window.addEventListener("pointerdown", stopStartReveal, { passive: true });
    window.addEventListener("keydown", returnScrollControl);
    motion.addEventListener("change", stopStartReveal);
    main.addEventListener("focusin", showFocused);
    main.addEventListener("animationend", finishArrival);
    main.addEventListener("animationcancel", finishArrival);
    return () => {
      stopStartReveal();
      observer.disconnect();
      for (const element of pending.keys()) {
        delete element.dataset.homeRevealState;
      }
      startLink?.removeEventListener("click", startWalkthrough);
      window.removeEventListener("scroll", showScrolledPast);
      window.removeEventListener("hashchange", showTarget);
      window.removeEventListener("popstate", showTarget);
      window.removeEventListener("wheel", stopStartReveal);
      window.removeEventListener("pointerdown", stopStartReveal);
      window.removeEventListener("keydown", returnScrollControl);
      motion.removeEventListener("change", stopStartReveal);
      main.removeEventListener("focusin", showFocused);
      main.removeEventListener("animationend", finishArrival);
      main.removeEventListener("animationcancel", finishArrival);
    };
  }, []);

  return null;
}
