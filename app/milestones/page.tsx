import type { Metadata } from "next";
import Link from "next/link";
import { MilestoneTimeline } from "./timeline";
import styles from "./milestones.module.css";

export const metadata: Metadata = {
  title: "Milestones | AImee",
  description: "A small founder timeline for AImee's proposed goals.",
  robots: { index: false, follow: false },
};

export default function MilestonesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/" className={styles.brand} aria-label="AImee home">AImee<span>.</span></Link>
          <span className={styles.headerLabel}>A little founder corner</span>
        </header>

        <section className={styles.hero} aria-labelledby="milestones-title">
          <p className={styles.eyebrow}>THE ROAD WE ARE ON · UPDATED OCTOBER 20, 2026</p>
          <h1 id="milestones-title">A few big steps.<br /><em>Still taking them.</em></h1>
          <p>Three proposed markers for AImee, from useful early work to the first dollar and beyond. Drag the marker to explore the path. The dated progress below reflects only what has been recorded.</p>
        </section>

        <MilestoneTimeline />

        <footer className={styles.footer}>
          <p>This is a public working snapshot, shared for fun. Dates and goals may change as Max and Rami learn.</p>
          <Link href="/">Back to AImee <span aria-hidden="true">↗</span></Link>
        </footer>
      </div>
    </main>
  );
}
