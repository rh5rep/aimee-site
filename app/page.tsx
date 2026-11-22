import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { FirstProject } from "./first-project";
import { HomeMotion } from "./home-motion";
import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={styles.home} id="main" tabIndex={-1}>
        <HomeMotion />
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <h1 id="hero-title">
                <span>Hi, we’re</span>{" "}
                <em>Max and Rami.</em>
              </h1>
              <div className={styles.heroDetails}>
                <p className={styles.heroLead}>
                  We teach AI in hands-on workshops and one‑on‑one coaching.
                  We help teams build workflows they can run and check.
                </p>
                <div className={`actions ${styles.heroActions}`}>
                  <a className="button" href="#services">See how we help</a>
                  <Link className="text-link" href="/contact">Tell us about a task</Link>
                </div>
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
          </div>
        </section>

        <FirstProject />

        <section className={`container ${styles.examples}`} aria-labelledby="examples-title" data-home-reveal>
          <h2 id="examples-title">A look at the work</h2>
          <div className={styles.examplePair}>
            <section id="work-in-practice" aria-labelledby="work-in-practice-title">
              <p className={styles.exampleLabel}>From a one-on-one session</p>
              <h3 id="work-in-practice-title">Revising an annual report</h3>
              <p>
                Max and a researcher reviewed edits to one section of an annual grant report, caught links
                that couldn’t go in, and used last year’s files to draft a checklist for the next cycle.
              </p>
              <Link className="text-link" href="/work#examples">More examples from our work</Link>
            </section>

            <section className={styles.demo} id="workflow-example" aria-labelledby="example-title" tabIndex={-1}>
              <p className={styles.exampleLabel}>Fictional example · 20-second film</p>
              <h3 id="example-title">The Friday Report</h3>
              <p>See what a team checks before sending an AI-drafted update based on a tracker and handoff notes.</p>
              <Link className="text-link" href="/demos">Watch the film and try the exercise</Link>
            </section>
          </div>
        </section>

        <section className={`container ${styles.contact}`} aria-labelledby="home-contact-title" data-home-reveal>
          <h2 id="home-contact-title">Have a task in mind?</h2>
          <Link className="button" href="/contact">Talk with Max and Rami</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
