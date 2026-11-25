import { useState, type ToggleEvent } from "react";
import { firstFriday, nextFriday, reportFollowUp, reportStatus } from "./report-example";
import styles from "./report-walkthrough.module.css";

const reportLines = [reportStatus, reportFollowUp];

export function ReportWalkthrough({ onSourceOpen }: { onSourceOpen: () => void }) {
  const [decision, setDecision] = useState<"keep" | "update" | null>(null);

  function pauseOnOpen(event: ToggleEvent<HTMLDetailsElement>) {
    if (event.currentTarget.open) onSourceOpen();
  }

  return (
    <section className={styles.exercise} id="try-report" aria-labelledby="try-report-title" tabIndex={-1}>
      <header className={styles.intro}>
        <h2 id="try-report-title">Would you send this update?</h2>
        <p>Open a line from the AI draft to see its source and what you’d check before sending.</p>
      </header>
      <div className={styles.lines}>
        {reportLines.map((item) => (
          <details
            key={item.label}
            className={styles.line}
            onToggle={pauseOnOpen}
          >
            <summary>
              <span className={styles.lineLabel}>{item.label}</span>
              <span>{item.line}</span>
            </summary>
            <div className={styles.evidence}>
              <div>
                <h3>{item.source}</h3>
                <blockquote>{item.note}</blockquote>
              </div>
              <div>
                <h3>What we’d check</h3>
                <p>{item.check}</p>
              </div>
            </div>
          </details>
        ))}
        <details className={styles.line} onToggle={pauseOnOpen}>
          <summary><strong>Try next Friday’s update</strong></summary>
          <div className={styles.practice}>
            <dl className={styles.week}>
              <div><dt>This week’s tracker</dt><dd>{nextFriday.closed} closed · {nextFriday.open} open</dd></div>
              <div><dt>Draft update</dt><dd>{firstFriday.closed} closed · {firstFriday.open} open</dd></div>
            </dl>
            <fieldset className={styles.decision}>
              <legend>Which totals would you send?</legend>
              <label>
                <input type="radio" name="friday-totals" checked={decision === "keep"} onChange={() => setDecision("keep")} />
                Keep the draft totals
              </label>
              <label>
                <input type="radio" name="friday-totals" checked={decision === "update"} onChange={() => setDecision("update")} />
                Use this week’s tracker totals
              </label>
            </fieldset>
            <p className={styles.feedback} role="status">
              {decision === "keep" && "Those counts belong to last Friday. Check the new tracker and try again."}
              {decision === "update" && `Yes. The new tracker supports ${nextFriday.closed} closed and ${nextFriday.open} open. Each week, match the draft to the dated tracker and confirm the owner of any open request before sending.`}
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
