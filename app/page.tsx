import Image from "next/image";
import Link from "next/link";
import { ReportWalkthrough } from "../components/report-walkthrough";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { WorkflowStory } from "../components/workflow-story";
import styles from "./home.module.css";
import { services } from "./work/services";

const teamServices = services.filter((service) => service.id !== "one-on-one");

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <h1 id="hero-title">Practical AI help <em>for your team</em></h1>
            <p>
              We’re Max and Rami. We help owners and teams at small and midsize tech companies
              take some of the grind out of everyday work. We run hands-on workshops and build
              AI workflows with the people who’ll use them.
            </p>
            <div className="actions">
              <Link className="button" href="#services">See how we can help</Link>
              <Link className="text-link" href="/contact">Talk through a task</Link>
            </div>
          </div>
          <WorkflowStory />
        </section>

        <section className={`container ${styles.services}`} id="services" aria-labelledby="services-title">
          <h2 id="services-title">Ways to work together</h2>
          <ul className={styles.serviceList}>
            {teamServices.map((service) => (
              <li key={service.id}>
                <h3><Link href={`/work#${service.id}`}>{service.title}</Link></h3>
                <p>{service.summary}</p>
              </li>
            ))}
          </ul>
          <Link className="text-link" href="/work#one-on-one">Looking for one-on-one help?</Link>
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
