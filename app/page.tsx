import Image from "next/image";
import Link from "next/link";
import { reportFollowUp, reportStatus } from "../components/report-example";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { FirstProject } from "./first-project";
import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={styles.home} id="main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <p className={styles.greeting}>
                Hi, we’re <em><span className={styles.maxName}>Max</span>{" "}<span className={styles.ramiName}>and Rami.</span></em>
              </p>
              <h1 id="hero-title">We teach AI and build workflows you can check.</h1>

              <p className={styles.heroLead}>
                Hands-on workshops for teams and one-on-one coaching.
                Bring a draft you’re stuck on or a report you write every week.
              </p>

              <div className={`actions ${styles.heroActions}`}>
                <a className="button" href="#services-title">See how we help</a>
                <Link className="text-link" href="/contact">Tell us about a task</Link>
              </div>
            </div>

            <div className={styles.heroPortraits}>
              <figure>
                <div className={styles.portraitFrame}>
                  <Image className={styles.maxPortrait} src="/images/max-portrait.webp" alt="Portrait of Max Horton" width={540} height={540} loading="eager" />
                </div>
                <figcaption>
                  <Link href="/about#max">Max Horton</Link>
                  <span>Research and AI teaching</span>
                </figcaption>
              </figure>
              <figure>
                <div className={styles.portraitFrame}>
                  <Image className={styles.ramiPortrait} src="/images/rami-portfolio.jpg" alt="Portrait of Rami Hanna" width={768} height={1150} loading="eager" />
                </div>
                <figcaption>
                  <Link href="/about#rami">Rami Hanna</Link>
                  <span>Robotics and applied AI</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className={`container ${styles.examples}`} id="examples-title">
          <section id="work-in-practice" aria-labelledby="work-in-practice-title">
            <p className={styles.exampleLabel}>From a one-on-one session</p>
            <h2 id="work-in-practice-title">Revising an annual report</h2>
            <p>
              Max and a researcher reviewed edits to one section of an annual grant report, caught links
              that couldn’t go in, and used last year’s files to draft a checklist for the next cycle.
            </p>
            <Link className="text-link" href="/work#examples">More examples from our work</Link>
          </section>

          <section className={styles.demo} id="workflow-example" aria-labelledby="example-title" tabIndex={-1}>
            <p className={styles.exampleLabel}>Fictional exercise</p>
            <h2 id="example-title">The Friday Report</h2>
            <dl className={styles.reportExcerpt}>
              <div><dt>AI draft</dt><dd>{reportStatus.line}</dd></div>
              <div><dt>Tracker</dt><dd>{reportStatus.excerpt}</dd></div>
              <div><dt>Handoff</dt><dd>{reportFollowUp.excerpt}</dd></div>
            </dl>
            <Link className="text-link" href="/demos#try-report">Check it against the source</Link>
          </section>
        </div>

        <FirstProject />
      </main>
      <SiteFooter />
    </>
  );
}
