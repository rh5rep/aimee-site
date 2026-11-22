import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { FirstProject } from "./first-project";
import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.introduction}>Hi, we’re Max and Rami.</p>
            <h1 id="hero-title">AI for the work <em>you already do.</em></h1>
            <p className={styles.heroLead}>
              We teach AI through hands-on workshops and coaching. We help teams build
              workflows they can run and check.
            </p>
            <div className={`actions ${styles.heroActions}`}>
              <Link className="button" href="/contact">Tell us what you need</Link>
              <a className="text-link" href="#services">See how we help</a>
            </div>
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
        </section>

        <FirstProject />

        <div className={`container ${styles.examples}`}>
          <section className={styles.workProof} id="work-in-practice" aria-labelledby="work-in-practice-title">
            <h2 id="work-in-practice-title">Revising part of an annual report</h2>
            <p>
              In a one-on-one session, Max and a researcher reviewed a draft update to one section
              of an annual grant report and used last year’s files to draft a checklist for
              the next reporting cycle.
            </p>
            <Link className="text-link" href="/work#examples">More examples from our work</Link>
          </section>

          <section className={styles.demo} id="workflow-example" aria-labelledby="example-title" tabIndex={-1}>
            <div className={styles.demoCopy}>
              <h2 id="example-title">The Friday Report</h2>
              <p>See how a team turns a tracker and handoff notes into a report they can check.</p>
              <Link className="text-link" href="/demos">Watch the 20-second demo</Link>
            </div>
            <div className={styles.demoImage}>
              <Image src="/images/friday-workflow-stage.jpg" alt="" fill sizes="(max-width: 400px) 90vw, 170px" />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
