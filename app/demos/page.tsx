import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { WorkflowStory } from "../../components/workflow-story";
import { sampleInput } from "../../lib/draft-review";
import styles from "./demos.module.css";

export const metadata: Metadata = {
  title: "Examples | Max + Rami",
  description: "Follow the Friday Report from tracker to handoff, try the source check, or open a marked-up writing sample.",
};

export default function DemosPage() {
  return (
    <>
      <SiteHeader activePath="/demos" />
      <main className="container interior" id="main" tabIndex={-1}>
        <header className={`page-intro ${styles.intro}`}>
          <div>
            <p className={`meta ${styles.filmLabel}`}>Fictional workflow example</p>
            <h1>The <em>Friday Report</em></h1>
          </div>
          <div>
            <p className="lede">It’s 4:45 on Friday. You’re ready to close your laptop. One thing left: tell the team what got done and who’s picking up the rest on Monday.</p>
            <p className={styles.setup}>Here’s how we’d turn a tracker and a week of handoff notes into a first draft you can check and send.</p>
          </div>
        </header>
        <div className={styles.film}>
          <WorkflowStory />
          <section className="contact-strip" aria-labelledby="demo-contact">
            <h2 id="demo-contact">What recurring task would you bring us?</h2>
            <Link className="button" href="/contact?service=workflow-design">Tell us about a task</Link>
          </section>
        </div>

        <section className={styles.draftReview} id="draft-review" aria-labelledby="draft-review-title">
          <header>
            <p className="meta">Writing example · Fictional numbers</p>
            <h2 id="draft-review-title">Make a claim you can back up</h2>
          </header>
          <div className={styles.reviewComparison}>
            <div className={styles.reviewPage}>
              <h3>Before</h3>
              <blockquote>
                “The new guide helped people finish faster and <mark>make fewer mistakes</mark>.”
              </blockquote>
              <p>
                <strong>Fictional pilot notes</strong>
                {sampleInput.sources}
              </p>
            </div>
            <div className={styles.reviewPage}>
              <h3>After</h3>
              <blockquote>
                “In the pilot, median completion time fell from 12 to 8 minutes with the new guide.”
              </blockquote>
              <p>
                <strong>Why this edit</strong>
                The timing supports the revised sentence. A claim about mistakes would need an error count.
              </p>
            </div>
          </div>
          <Link className="text-link" href="/review?sample=writing#review-result-title">Open the marked-up sample</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
