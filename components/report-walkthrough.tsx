"use client";

import { useEffect, useRef, useState } from "react";
import { reportFollowUp, reportStatus } from "./report-example";
import styles from "./report-walkthrough.module.css";

const reportLines = [reportStatus, reportFollowUp];
const steps = ["Notes", "Draft", "Check sources"];

export function ReportWalkthrough() {
  const [included, setIncluded] = useState(reportLines);
  const [draftOpen, setDraftOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof reportLines)[number] | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const focusHeading = useRef(false);

  const step = draftOpen ? (selected ? "Check sources" : "Draft") : "Notes";

  useEffect(() => {
    if (focusHeading.current) {
      heading.current?.focus();
      focusHeading.current = false;
    }
  }, [draftOpen]);

  function showDraft(open: boolean) {
    focusHeading.current = true;
    setSelected(null);
    setDraftOpen(open);
  }

  return (
    <div className={styles.notebook}>
      <p className={styles.sampleLabel} id="try-report-title">Try the first Friday’s report</p>
      <ol className={styles.progress} aria-label="Demo progress">
        {steps.map((label) => (
          <li key={label} aria-current={step === label ? "step" : undefined}><span>{label}</span></li>
        ))}
      </ol>

      {draftOpen ? (
        <>
          <div className={styles.workspace}>
            <div className={styles.draft}>
              <h3 className={styles.title} ref={heading} tabIndex={-1}>Weekly operations update</h3>
              <p className={styles.instruction}>Select a line to check its source.</p>
              <div className={styles.lines}>
                {reportLines.filter((item) => included.includes(item)).map((item) => (
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
              {selected ? (
                <>
                  <p className={styles.eyebrow}>Original note</p>
                  <h3>{selected.source}</h3>
                  <blockquote className={styles.excerpt}>{selected.note}</blockquote>
                  <p className={styles.eyebrow}>What a person checks</p>
                  <p className={styles.check}>{selected.check}</p>
                </>
              ) : (
                <>
                  <h3>Source check</h3>
                  <p className={styles.instruction}>
                    The original note and what to check before sending will appear here.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className={styles.footer}>
            <button className="text-link" type="button" onClick={() => showDraft(false)}>Back to the notes</button>
          </div>
        </>
      ) : (
        <div className={styles.notes}>
          <h3 className={styles.title} ref={heading} tabIndex={-1}>Friday’s notes</h3>
          <p className={styles.instruction}>Choose the notes you want to use in the weekly update.</p>
          <fieldset className={styles.noteGrid}>
            <legend className="sr-only">Notes to include</legend>
            {reportLines.map((item) => (
              <label className={styles.note} key={item.label}>
                <span className={styles.noteHeading}>
                  <input
                    type="checkbox"
                    checked={included.includes(item)}
                    onChange={({ target: { checked } }) => setIncluded((previous) => checked
                      ? [...previous, item]
                      : previous.filter((line) => line !== item))}
                  />
                  <span>{item.source}</span>
                </span>
                <span className={styles.noteText}>{item.note}</span>
              </label>
            ))}
          </fieldset>
          <div className={styles.notesFooter}>
            {included.length === 0 && <p className={styles.instruction}>Select a note to build the draft.</p>}
            <button
              className={`button ${styles.buildButton}`}
              type="button"
              disabled={included.length === 0}
              onClick={() => showDraft(true)}
            >
              Build draft <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
