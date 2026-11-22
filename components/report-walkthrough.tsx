import { reportFollowUp, reportStatus } from "./report-example";
import styles from "./report-walkthrough.module.css";

const reportLines = [reportStatus, reportFollowUp];

export function ReportWalkthrough({ onSourceOpen }: { onSourceOpen: () => void }) {
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
            onToggle={(event) => {
              if (event.currentTarget.open) onSourceOpen();
            }}
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
      </div>
    </section>
  );
}
