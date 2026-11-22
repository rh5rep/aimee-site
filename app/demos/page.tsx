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
      <main className="container interior" id="main" tabIndex={-1}>
        <header className={`page-intro ${styles.intro}`}>
          <div>
            <p className={`meta ${styles.filmLabel}`}>Fictional example · 20-second film</p>
            <h1>The <em>Friday Report</em></h1>
          </div>
          <div>
            <p className="lede">It’s Friday. The weekly update is due, and a request still needs an owner. See how the team drafts the update with AI and checks it before sending.</p>
            <a className="text-link" href="#try-report">Jump to the source check</a>
          </div>
        </header>
        <div className={styles.film}>
          <WorkflowStory />
          <Link className={`text-link ${styles.reportingLink}`} href="/work#example">Read the Friday Report walkthrough</Link>
        </div>

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
          <Link className="text-link" href="/review">Try the sample or check your draft</Link>
        </section>
        <section className="contact-strip" aria-labelledby="demo-contact">
          <h2 id="demo-contact">Have a report your team writes every week?</h2>
          <Link className="button" href="/contact?service=workflow-design">Tell us about a task</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
