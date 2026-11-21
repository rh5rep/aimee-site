"use client";

import { useState } from "react";
import { reportFollowUp, reportStatus } from "./report-example";
import styles from "./report-walkthrough.module.css";

const reportLines = [reportStatus, reportFollowUp];

export function ReportWalkthrough() {
  const [selected, setSelected] = useState<(typeof reportLines)[number] | null>(null);

  return (
    <div className={styles.workspace}>
      <div className={styles.draft}>
        <h3 className={styles.title}>Weekly operations update</h3>
        <p className={styles.instruction}>
          AI drafted this from Friday’s tracker and handoff note.
          Choose a line to see what you can verify before sending.
        </p>
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
            </button>
          ))}
        </div>
      </div>
      <div className={styles.review} id="report-evidence" aria-live="polite" aria-atomic="true">
        {selected ? (
          <div className={styles.original} key={selected.label}>
            <p className={styles.eyebrow}>Original note</p>
            <h3>{selected.source}</h3>
            <blockquote className={styles.excerpt}>{selected.note}</blockquote>
            <p className={styles.eyebrow}>What to check before sending</p>
            <p className={styles.check}>{selected.check}</p>
          </div>
        ) : (
          <>
            <h3>Source check</h3>
            <p className={styles.instruction}>The original note and what to check will appear here.</p>
          </>
        )}
      </div>
    </div>
  );
}
