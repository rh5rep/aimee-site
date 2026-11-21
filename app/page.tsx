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
            <h1 id="hero-title">Hi, we’re <em>Max and Rami.</em></h1>
            <p className={styles.heroLead}>
              We teach people to use AI on their own work and help teams build workflows
              they can run and check themselves.
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
          <div className={styles.heroActions}>
            <Link className="button" href="/contact">Tell us what you need</Link>
          </div>
        </section>

        <FirstProject />

        <section className={`container ${styles.workProof}`} id="work-in-practice" aria-labelledby="work-in-practice-title">
          <h2 id="work-in-practice-title">A first revision and a checklist</h2>
          <div>
            <p>
              In a one-on-one session, Max and a researcher reviewed a draft update to one section
              of an annual grant report and used last year’s files to draft a checklist for
              the next reporting cycle.
            </p>
            <Link className="text-link" href="/work#examples">More examples from our work</Link>
          </div>
        </section>

        <section className={styles.demo} id="workflow-example" aria-labelledby="example-title" tabIndex={-1}>
          <div className={`container ${styles.demoInner}`}>
            <div>
              <h2 id="example-title">The Friday Report</h2>
              <p>See how a team turns a tracker and handoff notes into an update they can check.</p>
            </div>
            <Link className="button" href="/demos">Watch the 20-second demo</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
