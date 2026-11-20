import type { Metadata } from "next";
import { email, SiteHeader, SiteFooter } from "../../components/site-shell";
import styles from "./workshop.module.css";

const registrationUrl = process.env.NEXT_PUBLIC_WORKSHOP_REGISTRATION_URL?.trim();
const questionUrl = `mailto:${email}?subject=${encodeURIComponent("Question about the research workshops")}`;
const workshopTime = "2–5 p.m.";

export const metadata: Metadata = {
  title: "Practical AI for research | Max and Rami",
  description: "Two hands-on research workshops on experimental planning and scientific writing, December 7 and 8 at Einstein.",
  robots: { index: false, follow: false },
};

const sessions = [
  {
    date: "MONDAY · DECEMBER 7, 2026",
    title: "Experimental planning",
    audience: "Graduate students & postdocs",
    body: "Work through an experimental or troubleshooting question, examine assumptions, and decide what to try next.",
  },
  {
    date: "TUESDAY · DECEMBER 8, 2026",
    title: "Writing & revision",
    audience: "Faculty & trainees",
    body: "Review feedback on a short passage, improve clarity, and keep your meaning intact.",
  },
];

const steps = [
  { number: "01", title: "Set the context", text: "Bring a real question or use a provided example. Define what a useful result would look like." },
  { number: "02", title: "Review & refine", text: "Work with AI, examine what it produced, and decide which suggestions hold up." },
  { number: "03", title: "Save & reuse", text: "Keep the useful steps and think about where you would apply them next." },
];

export default function WorkshopPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={styles.page}>
        <div className={styles.shell}>
          <section className={styles.hero} id="workshop" aria-labelledby="title">
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>PRACTICAL AI FOR RESEARCH</p>
              <h1 id="title">Make AI useful in the research you <em>already do.</em></h1>
              <p className={styles.lede}>
                Two hands-on workshops on using AI for experimental planning and scientific writing.
                Work through examples, evaluate the results, and learn a method you can reuse.
              </p>
              <a className={styles.textLink} href="#sessions">See both sessions</a>
            </div>
            <aside className={styles.infoCard} aria-label="Workshop summary">
              <strong>Bring a real question.</strong>
              <p>No prior AI experience is needed. Bring your own task or practice on a provided example.</p>
              <div className={styles.cardRule} />
              <a className={styles.cardStatus} href="#details">
                {registrationUrl ? "Registration open" : "Registration link coming soon"}
              </a>
            </aside>
          </section>
          <section className={styles.sessions} id="sessions" aria-labelledby="sessions-title">
            <div className={styles.sectionHeading}>
              <h2 id="sessions-title">Workshop sessions</h2>
              <p>Both workshops are on the Einstein campus. Each session runs {workshopTime}</p>
            </div>
            <div className={styles.sessionList}>
              {sessions.map((session) => (
                <article className={styles.session} key={session.date}>
                  <div><span className={styles.sessionDate}>{session.date}</span><strong>{workshopTime}</strong></div>
                  <div><h3>{session.title}</h3><p>{session.body}</p></div>
                  <span className={styles.sessionAudience}>ESPECIALLY USEFUL FOR<br /><b>{session.audience}</b></span>
                </article>
              ))}
            </div>
          </section>
          <section className={styles.approach} aria-labelledby="approach-title">
            <div className={styles.sectionHeading}>
              <h2 id="approach-title">What you’ll <em>practice.</em></h2>
            </div>
            <ol className={styles.steps}>
              {steps.map((step) => (
                <li key={step.number}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </section>
          <section className={styles.details} id="details" aria-labelledby="details-title">
            <div className={styles.detailsIntro}>
              <h2 id="details-title">Location and registration</h2>
              <p>{registrationUrl ? "Check back for room details." : "Check back for room details and the organizer’s registration link."}</p>
            </div>
            <div className={styles.detailsCard}>
              <div className={styles.detailRow}><span>Dates</span><strong>December 7–8, 2026</strong></div>
              <div className={styles.detailRow}><span>Time</span><strong>{workshopTime} each day</strong></div>
              <div className={styles.detailRow}><span>Location</span><strong>Einstein campus</strong></div>
              <div className={styles.detailRow}><span>Registration</span><strong>{registrationUrl ? "Open" : "Link coming soon"}</strong></div>
              {registrationUrl && (
                <a className={styles.primaryAction} href={registrationUrl} target="_blank" rel="noopener noreferrer">
                  Open registration
                </a>
              )}
            </div>
          </section>
          <section className={styles.contact} aria-labelledby="contact-title">
            <div><h2 id="contact-title">Questions about the workshops?</h2></div>
            <div>
              <p>Tell us which session you’re considering. Please keep confidential research out of the first email.</p>
              <a href={questionUrl}>Email Max and Rami</a>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
