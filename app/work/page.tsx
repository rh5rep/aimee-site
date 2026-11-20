import type { Metadata } from "next";
import Link from "next/link";
import { reportFollowUp, reportStatus } from "../../components/report-example";
import { ReportSample } from "../../components/report-sample";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { services } from "./services";

export const metadata: Metadata = {
  title: "Services | Max + Rami",
  description: "Hands-on AI workshops, one-on-one sessions, team workflow design, and implementation.",
};

const workExamples = [
  {
    title: "Give a draft a second set of eyes",
    description: "In a writing workshop demo, we read a draft from several angles and asked what readers would take away, which claims needed stronger evidence, and which edits might change the author’s meaning.",
  },
  {
    title: "Make the next report easier to hand over",
    description: "In a working session, we made a first pass at updating an annual report from newer sources. We reviewed the proposed changes with the author and used last year’s files to draft a checklist for the next reporting cycle.",
  },
  {
    title: "Make project files easier to find",
    description: "We reviewed a proposed structure for older project files, using a folder that already worked for the person as a guide.",
  },
];

export default function WorkPage() {
  return (
    <>
      <SiteHeader activePath="/work" />
      <main id="main" tabIndex={-1}>
        <div className="container">
          <header className="page-intro">
            <h1>Services</h1>
            <p className="lede">
              Bring a draft, a pile of source material, or a task your team does often.
              We’ll talk through where the work gets stuck and what would make it easier.
            </p>
            <p className="scope-note">
              The task, your tools, and the people doing the work shape the format and timing.
              Before we start, we’ll agree on who needs to be involved and what your team should have at the end.
            </p>
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

        <section className="container" id="examples" aria-labelledby="examples-title">
          <h2 className="work-examples-title" id="examples-title">Examples from our work</h2>
          <div className="service-list">
            {workExamples.map((example) => (
              <div className="work-example" key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="example-band" id="example" aria-labelledby="example-title">
          <div className="container">
            <h2 id="example-title">From team notes to a weekly report</h2>
            <div className="example-grid">
              <div>
                <h3>Before</h3>
                <p>Every Friday, someone starts a new report using a spreadsheet and notes from the team.</p>
                <dl className="example-inputs">
                  <div><dt>Request tracker</dt><dd>{reportStatus.excerpt}</dd></div>
                  <div><dt>Team notes</dt><dd>{reportFollowUp.excerpt}</dd></div>
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
          <Link className="button" href="/contact">Talk through a task</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
