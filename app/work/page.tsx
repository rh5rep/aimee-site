import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { services } from "./services";

export const metadata: Metadata = {
  title: "What we do | Max + Rami",
  description: "Hands-on AI workshops, one-on-one sessions, team workflow design, and implementation.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="page-hero" aria-labelledby="title">
          <div className="container page-hero-grid">
            <div>
              <p className="eyebrow">WHAT WE DO</p>
              <h1 id="title">AI training and <em>workflow support.</em></h1>
            </div>
            <p>
              Learn a method on your own work, design a better process with your team,
              or bring us in to help build it.
            </p>
          </div>
        </section>

        <section className="format-section offer-section section-pad" aria-labelledby="services-title">
          <div className="container format-layout">
            <div>
              <h2 id="services-title">Ways to work <em>with us.</em></h2>
              <p>Start with a task you have in mind. We can help you choose a useful scope and a way to check the result.</p>
            </div>
            <div className="format-items">
              {services.map((service) => (
                <article key={service.id} id={service.id}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="workflow-example section-pad" id="example" aria-labelledby="example-title">
          <div className="container">
            <p className="eyebrow">ILLUSTRATIVE EXAMPLE</p>
            <h2 id="example-title">From scattered updates to a <em>weekly report.</em></h2>
            <div className="workflow-comparison">
              <div className="workflow-panel">
                <h3>Before</h3>
                <p>
                  Each Friday, someone combines updates from team notes and a spreadsheet.
                  The draft gets written from scratch, and missing updates surface during review.
                </p>
              </div>
              <div className="workflow-panel">
                <h3>After</h3>
                <ol>
                  <li>Use this week’s notes and the approved spreadsheet.</li>
                  <li>Have AI draft the report in the team’s format and flag missing updates.</li>
                  <li>Compare totals with the spreadsheet and resolve discrepancies before sending.</li>
                </ol>
              </div>
            </div>
            <p className="workflow-caption">
              The team saves the report template and checklist, then tries them on another week’s inputs.
              A person reviews the draft before it goes out.
            </p>
            <Link className="text-link" href="/approach">Read how we test and hand off workflows</Link>
          </div>
        </section>

        <section className="next-section section-pad" aria-labelledby="contact-title">
          <div className="container next-layout">
            <h2 id="contact-title">What part of your work <em>could be easier?</em></h2>
            <div>
              <p>Tell us what you want to improve, who does the work, and where they get stuck.</p>
              <Link className="button button-primary" href="/contact">Start a conversation</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
