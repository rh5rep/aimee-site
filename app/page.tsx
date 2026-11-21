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
            <h1 id="hero-title">Hi, we’re <em>Max and Rami.</em></h1>
            <p>
              Bring us a task your team repeats, like a weekly report or a messy handoff.
              Together, we’ll build an AI workflow your team can check and run again.
            </p>
            <p className={styles.heroFormats}>We also run hands-on workshops and offer one-on-one coaching.</p>
          </div>
          <div className={styles.heroPortraits}>
            <figure>
              <div className={styles.portraitFrame}>
                <Image src="/images/max-portrait.webp" alt="" width={540} height={540} loading="eager" />
              </div>
              <figcaption>
                <Link href="/about#max">Max Horton</Link>
                <span>Research and teaching</span>
              </figcaption>
            </figure>
            <figure>
              <div className={styles.portraitFrame}>
                <Image className={styles.ramiPortrait} src="/images/rami-portfolio.jpg" alt="" width={768} height={1150} loading="eager" />
              </div>
              <figcaption>
                <Link href="/about#rami">Rami Hanna</Link>
                <span>Engineering and integration</span>
              </figcaption>
            </figure>
          </div>
          <div className={`actions ${styles.heroActions}`}>
            <a className="button" href="#services">How we can help</a>
            <a className="text-link" href="#work-in-practice">See our work</a>
          </div>
        </section>

        <FirstProject />

        <section className={`container ${styles.workProof}`} id="work-in-practice" aria-labelledby="work-in-practice-title" tabIndex={-1}>
          <h2 id="work-in-practice-title" data-home-reveal="text">What we’ve worked on</h2>
          <div data-home-reveal="panel">
            <h3>Updating an annual report from newer sources</h3>
            <p>
              In a one-on-one session, Max helped a researcher make a first pass at updating
              an annual report with AI. Together they reviewed the suggested edits and used
              last year’s files to draft a checklist for the next reporting cycle.
            </p>
            <Link className="text-link" href="/work#examples">See more examples from our work</Link>
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

        <section className={styles.example} id="workflow-example" aria-labelledby="example-title">
          <div className="container">
            <header className={styles.exampleIntro} data-home-reveal="text">
              <h2 id="example-title">The Friday Report</h2>
              <p>A Friday update is due, and one detail is missing. Watch the team get it out the door, then try drafting and checking it yourself.</p>
            </header>
            <div className={styles.reportPair}>
              <div data-home-reveal="panel">
                <WorkflowStory />
              </div>
              <div id="try-report" role="group" aria-labelledby="try-report-title" tabIndex={-1} data-home-reveal="panel">
                <ReportWalkthrough />
              </div>
            </div>
            <Link className="text-link" href="/work#example">Read the full reporting example</Link>
          </div>
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
