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
                Hi, we’re <em>Max and Rami.</em>
              </p>
              <h1 id="hero-title">Bring us one task your team repeats.</h1>

              <p className={styles.heroLead}>
                We teach AI in hands-on workshops and one-on-one sessions. We also help teams build
                workflows they can check, from a first draft to a weekly report.
              </p>

              <div className={`actions ${styles.heroActions}`}>
                <Link className="button" href="/contact">Tell us about a task</Link>
                <a className="text-link" href="#workflow-example">See the Friday Report</a>
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
          <section className={styles.demo} id="workflow-example" aria-labelledby="example-title" tabIndex={-1}>
            <p className={styles.exampleLabel}>Fictional exercise</p>
            <h2 id="example-title">The Friday Report</h2>
            <dl className={styles.reportExcerpt}>
              <div><dt>AI draft</dt><dd>{reportStatus.line}</dd></div>
              <div><dt>Tracker</dt><dd>{reportStatus.excerpt}</dd></div>
              <div className={styles.ownerCheck}><dt>Handoff</dt><dd>{reportFollowUp.excerpt}</dd></div>
            </dl>
            <Link className="text-link" href="/demos#try-report">Check it against the source</Link>
          </section>

          <section id="work-in-practice" aria-labelledby="work-in-practice-title">
            <p className={styles.exampleLabel}>From a one-on-one session</p>
            <h2 id="work-in-practice-title">Revising an annual report</h2>
            <p>
              Max and a researcher reviewed edits to one section of an annual grant report, caught links
              that couldn’t go in, and used last year’s files to draft a checklist for the next cycle.
            </p>
            <Link className="text-link" href="/work#examples">More examples from our work</Link>
          </section>
        </div>

        <FirstProject />
      </main>
      <SiteFooter />
    </>
  );
}
