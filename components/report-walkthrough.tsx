"use client";

import { useState } from "react";
import { reportFollowUp, reportStatus } from "./report-example";
import styles from "./report-walkthrough.module.css";

const reportLines = [reportStatus, reportFollowUp];

export function ReportWalkthrough() {
  const [selected, setSelected] = useState(reportStatus);

  return (
    <div className={styles.notebook}>
      <div className={styles.draft}>
        <p className={styles.eyebrow}>Sample report draft</p>
        <h3>Weekly operations update</h3>
        <p className={styles.instruction}>Select a line to see where it came from.</p>
        <div className={styles.lines}>
          {reportLines.map((item) => (
            <button
              key={item.label}
              type="button"
              className={styles.line}
              aria-pressed={selected === item}
              aria-controls="report-evidence"
              onClick={() => setSelected(item)}
            >
              <span className={styles.lineLabel}>{item.label}</span>
              <span>{item.line}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.review} id="report-evidence" aria-live="polite" aria-atomic="true">
        <p className={styles.eyebrow}>Where it came from</p>
        <h3>{selected.source}</h3>
        <blockquote className={styles.excerpt}>{selected.excerpt}</blockquote>
        <p className={styles.eyebrow}>What a person checks</p>
        <p className={styles.check}>{selected.check}</p>
      </div>
    </div>
  );
}
