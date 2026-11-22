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
              We teach AI in hands-on workshops and one‑on‑one coaching.
              We help teams build workflows they can run and check.
            </p>
            <div className={`actions ${styles.heroActions}`}>
              <Link className="button" href="/contact">Tell us about a task</Link>
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
                <span>Research and AI teaching</span>
              </figcaption>
            </figure>
            <figure>
              <div className={styles.portraitFrame}>
                <Image className={styles.ramiPortrait} src="/images/rami-portfolio.jpg" alt="Portrait of Rami Hanna" width={768} height={1150} loading="eager" />
              </div>
              <figcaption>
                <Link href="/about#rami">Rami Hanna</Link>
                <span>Robotics engineering</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <FirstProject />

        <div className={`container ${styles.examples}`}>
          <section id="work-in-practice" aria-labelledby="work-in-practice-title">
            <p className={styles.exampleLabel}>From a one-on-one session</p>
            <h2 id="work-in-practice-title">Revising part of an annual report</h2>
            <p>
              Max and a researcher reviewed proposed edits to one section of an annual grant report
              and spotted links that couldn’t go in it. They used last year’s files to draft a
              checklist for the next reporting cycle.
            </p>
            <Link className="text-link" href="/work#examples">More examples from our work</Link>
          </section>

          <section className={styles.demo} id="workflow-example" aria-labelledby="example-title" tabIndex={-1}>
            <p className={styles.exampleLabel}>Fictional example · 20-second film</p>
            <h2 id="example-title">The Friday Report</h2>
            <p>See what a team checks before sending an AI-drafted update based on a tracker and handoff notes.</p>
            <Link className="text-link" href="/demos">Watch the film and try the exercise</Link>
          </section>
        </div>

        <section className={`container contact-strip ${styles.contact}`} aria-labelledby="home-contact-title">
          <h2 id="home-contact-title">What’s one task you’d like to make easier?</h2>
          <Link className="button" href="/contact">Talk with Max and Rami</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
