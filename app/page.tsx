import Image from "next/image";
import Link from "next/link";
import { ReportWalkthrough } from "../components/report-walkthrough";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { WorkflowStory } from "../components/workflow-story";
import { FirstProject } from "./first-project";
import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <h1 id="hero-title">Practical AI help <em>for your team</em></h1>
            <p>
              We’re Max and Rami. We help teams get comfortable with today’s AI tools and put
              them to work. We run hands-on workshops and build repeatable workflows that make
              everyday work easier.
            </p>
            <div className="actions">
              <Link className="button" href="#services">See how we can help</Link>
              <Link className="text-link" href="/contact">Talk through a task</Link>
            </div>
          </div>
          <WorkflowStory />
        </section>

        <FirstProject />

        <section className={`container ${styles.draftReview}`} id="draft-review" aria-labelledby="draft-review-title">
          <header className={styles.exampleIntro}>
            <p className={styles.reviewLabel}>Sample draft review</p>
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

        <section className={styles.example} id="workflow-example" aria-labelledby="example-title">
          <div className="container">
            <header className={styles.exampleIntro}>
              <h2 id="example-title">From messy notes to a weekly report</h2>
              <p>
                Try a short workflow your team could use to write and check its weekly updates.
              </p>
            </header>
            <ReportWalkthrough />
            <Link className="text-link" href="/work#example">Read the full reporting example</Link>
          </div>
        </section>

        <section className={`container ${styles.people}`} aria-labelledby="people-title">
          <div>
            <h2 id="people-title">Meet Max and Rami</h2>
            <p>Max brings research and teaching. Rami brings engineering and systems integration.</p>
            <Link className="text-link" href="/about">About us</Link>
          </div>
          <div className={styles.peoplePhotos}>
            <figure>
              <Image src="/images/max-portrait.webp" alt="" width={180} height={180} />
              <figcaption><Link href="/about#max">Max Horton</Link></figcaption>
            </figure>
            <figure>
              <Image src="/images/rami-portfolio.jpg" alt="" width={768} height={1150} />
              <figcaption><Link href="/about#rami">Rami Hanna</Link></figcaption>
            </figure>
          </div>
        </section>

        <section className={`container ${styles.event}`} aria-labelledby="event-title">
          <div>
            <p className="meta">December 7–8, 2026 · Einstein campus</p>
            <h2 id="event-title">Practical AI for Research</h2>
          </div>
          <Link className="text-link" href="/workshop">Workshop details</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
