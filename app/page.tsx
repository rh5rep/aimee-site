import Image from "next/image";
import Link from "next/link";
import { ReportSample } from "../components/report-sample";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import styles from "./home.module.css";
import { services } from "./work/services";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`container ${styles.heroLayout}`}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>AI training &amp; implementation</p>
              <h1 id="hero-title">Make AI <em>earn its keep.</em></h1>
              <p className={styles.intro}>
                We run hands-on workshops and build AI workflows with teams. Bring a task that’s slow,
                messy, or a pain to hand off.
              </p>
              <div className={`actions ${styles.heroActions}`}>
                <Link className="button" href="/contact">Tell us about your work</Link>
                <Link className="text-link" href="#services">Explore services</Link>
              </div>
            </div>

            <div className={styles.portraits}>
              <figure>
                <div className={`${styles.portrait} ${styles.maxPortrait}`}>
                  <Image
                    src="/images/max-presenting.webp"
                    alt="Max Horton presenting at Einstein"
                    fill
                    priority
                    sizes="(max-width: 760px) 46vw, 22vw"
                  />
                </div>
                <figcaption><Link href="/about#max">Max Horton</Link><span>Research &amp; teaching</span></figcaption>
              </figure>
              <figure>
                <div className={`${styles.portrait} ${styles.ramiPortrait}`}>
                  <Image
                    src="/images/rami-portfolio.jpg"
                    alt="Rami Hanna standing in a stairwell"
                    fill
                    priority
                    sizes="(max-width: 760px) 46vw, 22vw"
                  />
                </div>
                <figcaption><Link href="/about#rami">Rami Hanna</Link><span>Engineering &amp; systems</span></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className={styles.services} id="services" aria-labelledby="services-title">
          <div className={`container ${styles.servicesLayout}`}>
            <h2 id="services-title">Work with us</h2>
            <ul className={styles.serviceList}>
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/work#${service.id}`}>
                    <strong>{service.title}</strong>
                    <span>{service.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.example} aria-labelledby="example-title">
          <div className={`container ${styles.exampleLayout}`}>
            <div>
              <h2 id="example-title">A weekly report you can <em>actually check.</em></h2>
              <p>
                Start with a tracker and team notes. End with a draft that shows where the numbers
                came from and what someone still needs to check.
              </p>
              <Link className="text-link" href="/work#example">See the before and after</Link>
            </div>
            <ReportSample />
          </div>
        </section>

        <section className={`container ${styles.event}`} aria-labelledby="event-title">
          <p className={styles.eventDate}><span>Dec</span><strong>7–8</strong><span>2026</span></p>
          <div>
            <p className="meta">Einstein campus</p>
            <h2 id="event-title">Practical AI for Research</h2>
          </div>
          <Link className="text-link" href="/workshop">Workshop details</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
