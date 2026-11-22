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
    let startFrame = 0;
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
      if (!pending.size || questions?.dataset.homeStartState) return;
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
      window.cancelAnimationFrame(startFrame);
      if (questions) delete questions.dataset.homeStartState;
    }

    function scrollToQuestions(event: MouseEvent) {
      if (!startLink || !questions || !motion.matches || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      stopStartReveal();
      if (window.location.hash !== startLink.hash) window.history.pushState(null, "", startLink.hash);
      reveal(questions);
      questions.focus({ preventScroll: true });
      questions.dataset.homeStartState = "scrolling";
      questions.scrollIntoView({ behavior: "smooth", block: "start" });

      // Start the conversation once the smooth scroll has reached the heading.
      const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const deadline = performance.now() + 1000;
      function waitForHeading(now: number) {
        if (!questions) return;
        if (Math.abs(questions.getBoundingClientRect().top - scrollPadding) <= 2) {
          questions.dataset.homeStartState = "playing";
        } else if (now < deadline) {
          startFrame = window.requestAnimationFrame(waitForHeading);
        } else {
          stopStartReveal();
        }
      }
      startFrame = window.requestAnimationFrame(waitForHeading);
    }

    function showFocused(event: FocusEvent) {
      if (event.target !== questions) stopStartReveal();
      const section = (event.target as Element).closest<HTMLElement>("[data-home-reveal]");
      if (section) reveal(section);
    }

    function returnScrollControl(event: KeyboardEvent) {
      const scrollKeys = [" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Escape"];
      if (scrollKeys.includes(event.key)) stopStartReveal();
    }

    function finishArrival(event: AnimationEvent) {
      const element = event.target;
      if (!(element instanceof HTMLElement)) return;
      if (event.type === "animationend" && questions?.dataset.homeStartState === "playing" &&
          questions.contains(element) && element.hasAttribute("data-home-reveal-finish")) {
        stopStartReveal();
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
    startLink?.addEventListener("click", scrollToQuestions);
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
      startLink?.removeEventListener("click", scrollToQuestions);
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
