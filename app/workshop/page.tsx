import type { Metadata } from "next";
import { email, SiteHeader, SiteFooter } from "../../components/site-shell";
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
    description: "Bring an experiment idea or troubleshooting question. Use AI to surface assumptions, compare options, and decide what you’d check before moving forward.",
  },
  {
    date: "2026-12-08",
    day: "Tuesday, December 8",
    title: "Writing and revision",
    audience: "faculty and trainees",
    description: "Bring a short passage. Get focused feedback and decide which edits make the argument clearer while preserving its scientific meaning.",
  },
];

export default function WorkshopPage() {
  return (
    <>
      <SiteHeader activePath="/workshop" />
      <main className="container interior" id="main">
        <header className={styles.intro}>
          <div>
            <h1>Practical AI for Research</h1>
            <p className={`lede ${styles.description}`}>Two hands-on workshops on experimental planning and scientific writing.</p>
            <a className="text-link" href="#sessions">View the sessions</a>
          </div>
          <aside className={styles.visit} id="details" aria-labelledby="details-title">
            <h2 id="details-title">Event details</h2>
            <dl>
              <div><dt>Dates</dt><dd>December 7–8, 2026</dd></div>
              <div><dt>Time</dt><dd>{workshopTime} each day</dd></div>
              <div><dt>Location</dt><dd>Einstein campus <small>Room details to come</small></dd></div>
              <div><dt>Registration</dt><dd>{registrationUrl ? "Open" : "Link coming soon"}</dd></div>
            </dl>
            {registrationUrl && <a className="button" href={registrationUrl}>Register for a workshop</a>}
          </aside>
        </header>

        <section className={styles.sessions} id="sessions" aria-labelledby="sessions-title">
          <h2 id="sessions-title">Sessions</h2>
          {sessions.map((session) => (
            <article key={session.date}>
              <div className={styles.sessionTime}>
                <time dateTime={session.date}>{session.day}</time>
                <span>{workshopTime}</span>
              </div>
              <div>
                <h3>{session.title}</h3>
                <p>{session.description}</p>
                <p className={styles.audience}>Designed for {session.audience}.</p>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.preparation} aria-labelledby="prepare-title">
          <h2 id="prepare-title">What to bring</h2>
          <div>
            <p>No prior AI experience is required. Bring a question or passage you’re able to share, or use one of the examples provided.</p>
            <p>In each session, you’ll give AI relevant context, review its suggestions, and save the instructions you want to use again.</p>
          </div>
        </section>

        <section className="contact-strip" aria-labelledby="contact-title">
          <h2 id="contact-title">Questions about the workshops?</h2>
          <a className="text-link" href={questionUrl}>Email Max and Rami</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
