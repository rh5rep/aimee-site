"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

export function StickyHeader({ children }: { children: ReactNode }) {
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = header.current;
    if (!element || !("ResizeObserver" in window)) return;

    const root = document.documentElement;
    const updateOffset = () => {
      root.style.setProperty("--header-offset", `${Math.ceil(element.getBoundingClientRect().height)}px`);
    };
    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(element);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--header-offset");
    };
  }, []);

  return <header className="site-header" ref={header}>{children}</header>;
}

export function Wordmark() {
  return (
    <Link
      className="wordmark"
      href="/"
      aria-label="Max and Rami home"
      onNavigate={(event) => {
        if (window.location.pathname !== "/") return;
        event.preventDefault();
        if (window.location.hash || window.location.search) {
          window.location.assign("/");
          return;
        }
        document.getElementById("main")?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "instant" });
      }}
    >
      Max + Rami
    </Link>
  );
}

export function SkipLink() {
  return (
    <a
      className="skip-link"
      href="#main"
      onClick={(event) => {
        if (event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const main = document.getElementById("main");
        if (!main) return;
        event.preventDefault();
        // The main region can already intersect the viewport while its start is offscreen.
        main.focus({ preventScroll: true });
        main.scrollIntoView({ block: "start", behavior: "instant" });
      }}
    >
      Skip to content
    </a>
  );
}

export function MobileMenu({ children }: { children: ReactNode }) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      const element = menu.current;
      if (element?.open && event.target instanceof Node && !element.contains(event.target)) {
        element.open = false;
      }
    }

    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <details
      className="mobile-menu"
      ref={menu}
      onBlur={({ currentTarget, relatedTarget }) => {
        if (!currentTarget.contains(relatedTarget)) currentTarget.open = false;
      }}
      onClick={({ currentTarget, target }) => {
        if (target instanceof Element && target.closest("a")) currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        const element = event.currentTarget;
        if (event.key !== "Escape" || !element.open) return;
        event.preventDefault();
        element.open = false;
        element.querySelector("summary")?.focus();
      }}
    >
      <summary>Menu</summary>
      <nav className="mobile-nav" aria-label="Main navigation">{children}</nav>
    </details>
  );
}
