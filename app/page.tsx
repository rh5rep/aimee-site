import Image from "next/image";
import Link from "next/link";
import { ReportSample } from "../components/report-sample";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { services } from "./work/services";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="container home-hero" aria-labelledby="hero-title">
          <div>
            <h1 id="hero-title">AI training and implementation</h1>
            <p className="lede">
              We teach people to use AI on their own work and help teams build workflows they can run,
              review, and maintain.
            </p>
            <div className="actions">
              <Link className="button" href="/contact">Discuss a project</Link>
              <Link className="text-link" href="/work">View services</Link>
            </div>
          </div>
          <div className="hero-sample">
            <ReportSample />
            <Link className="text-link" href="/work#example">See how the report was made</Link>
          </div>
        </section>

        <section className="section-rule" aria-labelledby="services-title">
          <div className="container split-section">
            <h2 id="services-title">Services</h2>
            <ul className="service-index">
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

        <section className="founder-band" aria-labelledby="founders-title">
          <div className="container split-section">
            <div>
              <h2 id="founders-title">Max and Rami</h2>
              <Link className="text-link" href="/about">Meet the founders</Link>
            </div>
            <div className="founder-pair">
              <div>
                <Image src="/images/max-portrait.webp" alt="" width={64} height={64} />
                <div><h3>Max Horton</h3><p>Research and teaching</p></div>
              </div>
              <div>
                <Image src="/images/rami-portrait.webp" alt="" width={64} height={64} />
                <div><h3>Rami Hanna</h3><p>Engineering and systems integration</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="container event-strip" aria-labelledby="event-title">
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
