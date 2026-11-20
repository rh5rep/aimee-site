import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { services } from "./work/services";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="hero home-hero" aria-labelledby="hero-title">
          <div className="container hero-content">
            <div className="hero-main">
              <h1 id="hero-title">Make AI useful in the work <em>you already do.</em></h1>
              <p className="hero-lede">
                We help individuals and teams learn to use AI, improve recurring tasks,
                and build workflows they can run and review.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/contact">Tell us about your work</Link>
                <Link className="button button-secondary" href="/work">Explore services</Link>
              </div>
            </div>
            <aside className="hero-aside hero-example" aria-labelledby="hero-example-title">
              <span className="eyebrow">ILLUSTRATIVE EXAMPLE</span>
              <h2 id="hero-example-title">A better way to prepare a weekly report.</h2>
              <p>Turn team notes and a spreadsheet into a draft with checks your team can repeat.</p>
              <Link className="text-link" href="/work#example">See the before and after</Link>
            </aside>
          </div>
        </section>

        <section className="home-links section-pad" aria-labelledby="services-title">
          <div className="container">
            <h2 id="services-title">How we can <em>help.</em></h2>
            <ul className="service-links">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/work#${service.id}`}>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="home-event" aria-labelledby="event-title">
          <div className="container home-event-inner">
            <div>
              <p className="eyebrow">DECEMBER 7–8, 2026 · EINSTEIN CAMPUS</p>
              <h2 id="event-title">Practical AI for Research</h2>
              <p>Two hands-on sessions on experimental planning and scientific writing.</p>
            </div>
            <Link className="button button-secondary" href="/workshop">See workshop details</Link>
          </div>
        </section>

        <section className="home-contact section-pad" aria-labelledby="contact-title">
          <div className="container home-contact-row">
            <h2 id="contact-title">What would you like to <em>make easier?</em></h2>
            <Link className="button button-light" href="/contact">Start a conversation</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
