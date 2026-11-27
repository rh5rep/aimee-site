import type { Metadata } from "next";
import Link from "next/link";
import { email, SiteHeader, SiteFooter } from "../../components/site-shell";
import { WorkshopSetup } from "./workshop-setup";
import styles from "./workshop.module.css";

const registrationUrl = process.env.NEXT_PUBLIC_WORKSHOP_REGISTRATION_URL?.trim();
const questionUrl = `mailto:${email}?subject=${encodeURIComponent("Question about the Einstein workshops")}`;
const workshopTime = "2–5 p.m.";

export const metadata: Metadata = {
  title: "Practical AI for Research | Max + Rami",
  description: "Hands-on research workshops on experimental planning and scientific writing, December 7 and 8 at Einstein.",
  robots: { index: false, follow: false },
};

const sessions = [
  {
    date: "2026-12-07",
    day: "Monday, December 7",
    title: "Experimental planning",
    audience: "graduate students and postdocs",
    bring: "an experiment idea or a troubleshooting question.",
    description: "Use AI to surface assumptions and compare options. Decide what you’d check before moving forward.",
  },
  {
    date: "2026-12-08",
    day: "Tuesday, December 8",
    title: "Writing and revision",
    audience: "faculty and trainees",
    bring: "a short passage from a draft.",
    description: "Get focused feedback and decide which edits make the argument clearer while preserving its scientific meaning.",
  },
];

export default function WorkshopPage() {
  return (
    <>
      <SiteHeader activePath="/workshop" />
      <main className="container interior" id="main" tabIndex={-1}>
        <header className={styles.intro}>
          <div>
            <h1>Practical AI <em>for Research</em></h1>
            <p className={`lede ${styles.description}`}>Two hands-on workshops at Einstein. Bring an experiment idea or a draft and practice using AI to think it through.</p>
            <div className={`actions ${styles.introActions}`}>
              <a className="text-link" href="#setup">Get ready for the workshop</a>
              <a className="text-link" href="#sessions">Find your session</a>
            </div>
          </div>
          <aside className={styles.visit} id="details" aria-labelledby="details-title">
            <h2 id="details-title">Event details</h2>
            <dl>
              <div><dt>Dates</dt><dd>December 7–8, 2026</dd></div>
              <div><dt>Time</dt><dd>{workshopTime} each day</dd></div>
              <div><dt>Location</dt><dd>Einstein campus <small>Room details to come</small></dd></div>
              <div><dt>Registration</dt><dd>{registrationUrl ? "Open" : "Link pending"}</dd></div>
            </dl>
            {registrationUrl && <a className="button" href={registrationUrl}>Register for a workshop</a>}
          </aside>
        </header>

        <section className={styles.sessions} id="sessions" aria-labelledby="sessions-title">
          <h2 className="section-title" id="sessions-title">Sessions</h2>
          <div className={styles.sessionGrid}>
            {sessions.map((session) => (
              <article key={session.date}>
                <p className={styles.sessionTime}>
                  <time dateTime={session.date}>{session.day}</time>
                  <span>{workshopTime}</span>
                </p>
                <h3>{session.title}</h3>
                <p className={styles.audience}>Designed for {session.audience}.</p>
                <p><strong>Bring</strong> {session.bring}</p>
                <p>{session.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.preparation} aria-labelledby="prepare-title">
          <h2 className="section-title" id="prepare-title">What to expect</h2>
          <div>
            <p>We’ll walk through an example together. Then you’ll give AI context for your own task, check what comes back, and save the instructions you’d use again.</p>
            <p>No prior AI experience is required. Bring something you’re able to share.</p>
            <div className="actions">
              <Link className="text-link" href="/about">About Max and Rami</Link>
              <Link className="text-link" href="/work#workshops">Explore team workshops</Link>
            </div>
          </div>
        </section>

        <WorkshopSetup />

        <section className="contact-strip" aria-labelledby="contact-title">
          <h2 id="contact-title">Questions about the workshops?</h2>
          <a className="text-link" href={questionUrl}>Email Max and Rami</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
