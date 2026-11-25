"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const exchanges = document.querySelectorAll<HTMLElement>("#services [data-exchange]");
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-arrived", "");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.25 });

    exchanges.forEach((exchange) => observer.observe(exchange));
    return () => {
      observer.disconnect();
      exchanges.forEach((exchange) => exchange.removeAttribute("data-arrived"));
    };
  }, []);
  return null;
}
