import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { WorkflowStory } from "../../components/workflow-story";
import styles from "./demos.module.css";

export const metadata: Metadata = {
  title: "Demos | Max + Rami",
  description: "Watch the Friday Report and try checking an AI-drafted update against the original notes.",
};

export default function DemosPage() {
  return (
    <>
      <SiteHeader activePath="/demos" />
      <main className={`container ${styles.demos}`} id="main" tabIndex={-1}>
        <header className={styles.intro}>
          <div>
            <p className="meta">Fictional example · 20-second film</p>
            <h1>The Friday Report</h1>
          </div>
          <p>Every Friday, an operations team turns a tracker and handoff notes into an update. Watch AI draft it and see what the team checks before sending.</p>
        </header>
        <WorkflowStory />
        <Link className={`text-link ${styles.reportingLink}`} href="/work#example">Read the full reporting example</Link>

        <section className={styles.draftReview} id="draft-review" aria-labelledby="draft-review-title">
          <header>
            <p className="meta">Writing demo · Fictional numbers</p>
            <h2 id="draft-review-title">Make a claim you can back up</h2>
          </header>
          <div className={styles.reviewComparison}>
            <div className={styles.reviewPage}>
              <h3>Before</h3>
              <blockquote>
                “The new guide helped people finish faster and <mark>make fewer mistakes</mark>.”
              </blockquote>
              <p>
                <strong>What we’d flag</strong>
                The pilot timed the task. A claim about mistakes would need an error count.
              </p>
            </div>
            <div className={styles.reviewPage}>
              <h3>After</h3>
              <blockquote>
                “In the pilot, median completion time fell from 12 to 8 minutes with the new guide.”
              </blockquote>
              <p>
                <strong>Why it helps</strong>
                The reader can see what improved and by how much.
              </p>
            </div>
          </div>
          <Link className="text-link" href="/review">Review your own draft</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
