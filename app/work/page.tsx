import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { services } from "./services";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Services | Max + Rami",
  description: "Hands-on AI workshops, one-on-one sessions, team workflow design, and implementation.",
};

const workExamples = [
  {
    title: "Rehearsing a draft review",
    description: "In a rehearsal for our writing workshop, we read a draft from several angles and asked what readers would take away, which claims needed stronger evidence, and which edits might change the author’s meaning.",
  },
  {
    title: "Reviewing an annual report",
    description: "In a one-on-one session, Max and a researcher reviewed edits to a section of an annual report. They spotted links the report couldn’t include and used last year’s files to draft a checklist for the next cycle.",
  },
  {
    title: "Planning a folder structure",
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
            <h1>What can we <em>help you do?</em></h1>
            <p className="lede">
              Bring a skill your team wants to learn or a task you want to make easier.
              We’ll talk through what would help and where to start.
            </p>
            <nav className={styles.index} aria-label="Jump to a service">
              {services.map((service) => (
                <a className="text-link" key={service.id} href={`#${service.id}`}>{service.indexLabel}</a>
              ))}
            </nav>
          </header>
          <div className={styles.catalog}>
            {services.map((service) => (
              <section className={styles.service} key={service.id} id={service.id} aria-labelledby={`${service.id}-title`} tabIndex={-1}>
                <h2 id={`${service.id}-title`}>{service.title}</h2>
                <div>
                  <p>{service.description}</p>
                  {service.id === "workflow-design" && (
                    <p>If that step holds up, we can <a className={styles.inlineLink} href="#implementation">scope an implementation</a>.</p>
                  )}
                  <Link className="text-link" href={`/contact?service=${service.id}`}>{service.contactLabel}</Link>
                </div>
              </section>
            ))}
          </div>
          <div className={styles.scope}>
            <p>The task, your tools, and the people doing the work shape the format and timing. We’ll agree on what your team should have at the end.</p>
            <Link className="text-link" href="/approach">See how we work</Link>
          </div>
        </div>

        <section className="container" id="examples" aria-labelledby="examples-title">
          <h2 className="section-title work-examples-title" id="examples-title">Examples from our work</h2>
          <div className="service-list">
            {workExamples.map((example) => (
              <div className="work-example" key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.demoTeaser} id="example" aria-labelledby="example-title" tabIndex={-1}>
          <div className="container contact-strip">
            <div>
              <p className="meta">Fictional workflow example</p>
              <h2 id="example-title">The Friday Report</h2>
              <p>See how a team checks the totals and confirms who owns an open request before sending an AI-drafted report.</p>
            </div>
            <Link className="text-link" href="/demos#try-report">Try the source check</Link>
          </div>
        </section>

        <section className="container contact-strip" aria-labelledby="contact-title">
          <h2 id="contact-title">Have a task in mind?</h2>
          <Link className="button" href="/contact">Tell us about a task</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
