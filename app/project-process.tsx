import Link from "next/link";
import styles from "./project-process.module.css";

const steps = [
  {
    title: "Show us how you do it today.",
    detail: "Walk us through the tools you use and where the work gets stuck. A recent report or handoff is enough to start the conversation.",
  },
  {
    title: "Pick one step to make easier.",
    detail: "We agree on what a useful result looks like, build a first pass with your team, and decide who will check it.",
  },
  {
    title: "Try it on the next one.",
    detail: "Run the workflow on a fresh example together. If it helps, we write down the steps and checks so your team can use them again.",
  },
];

export function ProjectProcess() {
  return (
    <section className={`container ${styles.section}`} id="first-project-process" aria-labelledby="first-project-process-title">
      <div data-home-reveal="text">
        <h2 id="first-project-process-title">Start with <em>one real task.</em></h2>
        <Link className="text-link" href="/contact">Tell us about a task</Link>
      </div>
      <ol className={styles.steps}>
        {steps.map(({ title, detail }) => (
          <li className={styles.step} key={title}>
            <div data-home-reveal="text">
              <h3>{title}</h3>
              <p>{detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
