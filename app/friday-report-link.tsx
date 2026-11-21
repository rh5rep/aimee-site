"use client";

import type { MouseEvent } from "react";

const href = "#workflow-example";

export function FridayReportLink() {
  function goToReport(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const report = document.getElementById("workflow-example");
    if (!report) return;

    event.preventDefault();
    if (window.location.hash !== href) window.history.pushState(null, "", href);
    report.focus({ preventScroll: true });
    report.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: no-preference)").matches ? "smooth" : "instant",
      block: "start",
    });
  }

  return <a className="text-link" href={href} onClick={goToReport}>See the Friday Report</a>;
}
