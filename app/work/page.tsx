import type { Metadata } from "next";
import Link from "next/link";
import { ReportSample } from "../../components/report-sample";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { services } from "./services";

export const metadata: Metadata = {
  title: "Services | Max + Rami",
  description: "Hands-on AI workshops, one-on-one sessions, team workflow design, and implementation.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader activePath="/work" />
      <main id="main">
        <div className="container">
          <header className="page-intro">
            <h1>Services</h1>
            <p className="lede">Bring a task your people need to learn or a process your team needs to improve.</p>
          </header>
          <div className="service-list">
            {services.map((service) => (
              <section key={service.id} id={service.id} aria-labelledby={`${service.id}-title`}>
                <h2 id={`${service.id}-title`}>{service.title}</h2>
                <p>{service.description}</p>
              </section>
            ))}
          </div>
        </div>

        <section className="example-band" id="example" aria-labelledby="example-title">
          <div className="container">
            <h2 id="example-title">From team notes to a weekly report</h2>
            <div className="example-grid">
              <div>
                <h3>Before</h3>
                <p>Every Friday, someone starts a new report using a spreadsheet and notes from the team.</p>
                <dl className="example-inputs">
                  <div><dt>Request tracker</dt><dd>20 requests, 18 closed.</dd></div>
                  <div><dt>Team notes</dt><dd>Request 42 still needs an owner.</dd></div>
                </dl>
              </div>
              <div>
                <h3>After</h3>
                <p>AI turns the two sources into a draft in the team’s format and flags the open question.</p>
                <ReportSample />
              </div>
            </div>
            <p className="example-note">
              Before sending, someone checks the totals against the tracker and confirms the owner.
              The team keeps the format and checklist for next week.
            </p>
          </div>
        </section>

        <section className="container contact-strip" aria-labelledby="contact-title">
          <h2 id="contact-title">Have a task in mind?</h2>
          <Link className="button" href="/contact">Discuss a project</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
