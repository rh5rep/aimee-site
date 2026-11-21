import Image from "next/image";
import Link from "next/link";
import { ReportWalkthrough } from "../components/report-walkthrough";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { WorkflowStory } from "../components/workflow-story";
import { FirstProject } from "./first-project";
import { ProjectProcess } from "./project-process";
import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={styles.home} id="main" tabIndex={-1}>
        <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.heroLabel}>AI training and workflow consulting</p>
            <h1 id="hero-title">Hi, we’re <em>Max and Rami.</em></h1>
            <p className={styles.heroLead}>
              Bring us a weekly update your team pieces together from a tracker and handoff notes.
              We’ll help you build a way to draft it, check it, and run it again next week.
            </p>
            <p className={styles.heroFormats}>
              We offer hands-on workshops, one-on-one coaching, and workflow design and implementation for teams.
            </p>
          </div>
          <div className={styles.heroPortraits}>
            <figure>
              <div className={styles.portraitFrame}>
                <Image className={styles.maxPortrait} src="/images/max-portrait.webp" alt="Portrait of Max Horton" width={540} height={540} loading="eager" />
              </div>
              <figcaption>
                <Link href="/about#max">Max Horton</Link>
                <span>Research and teaching</span>
              </figcaption>
            </figure>
            <figure>
              <div className={styles.portraitFrame}>
                <Image className={styles.ramiPortrait} src="/images/rami-portfolio.jpg" alt="Portrait of Rami Hanna" width={768} height={1150} loading="eager" />
              </div>
              <figcaption>
                <Link href="/about#rami">Rami Hanna</Link>
                <span>Engineering and integration</span>
              </figcaption>
            </figure>
          </div>
          <div className={`actions ${styles.heroActions}`}>
            <Link className="button" href="/contact">Tell us about a task</Link>
            <a className="text-link" href="#workflow-example">See the Friday Report</a>
          </div>
        </section>

        <FirstProject />

        <section className={`container ${styles.workProof}`} id="work-in-practice" aria-labelledby="work-in-practice-title" tabIndex={-1}>
          <h2 id="work-in-practice-title" data-home-reveal="text">What we’ve worked on</h2>
          <div data-home-reveal="panel">
            <h3>Updating a section of an annual report</h3>
            <p>
              In a one-on-one session, Max and a researcher used AI to draft an update to
              one part of an annual grant report. They reviewed the suggested edits together
              and used last year’s files to draft a checklist for the next reporting cycle.
            </p>
            <Link className="text-link" href="/work#examples">See more examples from our work</Link>
          </div>
        </section>

        <section className={styles.example} id="workflow-example" aria-labelledby="example-title" tabIndex={-1}>
          <div className={`container ${styles.feature}`}>
            <header className={styles.featureIntro}>
              <div>
                <p className={styles.featureLabel}>Fictional example · 20-second film</p>
                <h2 id="example-title">The Friday Report</h2>
              </div>
              <p>A weekly update is due. The tracker has the totals, but one request still needs an owner.</p>
            </header>
            <WorkflowStory />
            <div className={styles.exercise} id="try-report" role="group" aria-labelledby="try-report-title" tabIndex={-1}>
              <ReportWalkthrough />
            </div>
            <Link className={`text-link ${styles.exampleLink}`} href="/work#example">Read the full reporting example</Link>
          </div>
        </section>

        <section className={`container ${styles.draftReview}`} id="draft-review" aria-labelledby="draft-review-title">
          <header className={styles.exampleIntro} data-home-reveal="text">
            <p className={styles.reviewLabel}>Sample draft review with fictional numbers</p>
            <h2 id="draft-review-title">Make a claim you can back up</h2>
          </header>
          <div className={styles.reviewComparison} data-home-reveal="panel">
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

        <ProjectProcess />

        <section className={`container ${styles.event}`} aria-labelledby="event-title">
          <div data-home-reveal="text">
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
