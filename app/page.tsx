import Image from "next/image";
import Link from "next/link";
import { ReportSample } from "../components/report-sample";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import styles from "./home.module.css";
import { services } from "./work/services";

const teamServices = services.filter((service) => service.id !== "one-on-one");

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <h1 id="hero-title">Practical AI help <em>for your team</em></h1>
            <p>
              We’re Max and Rami. We run hands-on workshops and work alongside teams to design
              and build AI workflows they can review and run.
            </p>
            <div className="actions">
              <Link className="button" href="#services">See how we can help</Link>
              <Link className="text-link" href="/contact">Talk with us</Link>
            </div>
          </div>
          <Image
            className={styles.heroPhoto}
            src="/images/worktable.jpg"
            alt="Illustration of a sunlit worktable with an open notebook, pencil, and laptop"
            width={1440}
            height={960}
            priority
            sizes="(max-width: 720px) 92vw, (max-width: 1250px) 46vw, 610px"
          />
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

        <section className={styles.example} aria-labelledby="example-title">
          <div className={`container ${styles.exampleLayout}`}>
            <div>
              <h2 id="example-title">What a workflow looks like</h2>
              <p>
                A weekly report starts with scattered updates. See how a team can turn those
                inputs into a draft with source notes and a question to resolve before sending.
              </p>
              <Link className="text-link" href="/work#example">See the reporting example</Link>
            </div>
            <ReportSample />
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
