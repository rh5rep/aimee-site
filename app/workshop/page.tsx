import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "../../components/site-shell";
import styles from "./workshop.module.css";

const email = "aimee_workflows@proton.me";
const registrationUrl = process.env.NEXT_PUBLIC_WORKSHOP_REGISTRATION_URL?.trim();
const questionUrl = `mailto:${email}?subject=${encodeURIComponent("Question about the research workshops")}`;

export const metadata: Metadata = {
  title: "Practical AI for research | Max and Rami",
  description: "Two hands-on research workshops on experimental planning and scientific writing, December 7 and 8 at Einstein.",
  robots: { index: false, follow: false },
};

const sessions = [
  { date: "MONDAY · DECEMBER 7, 2026", title: "Experimental planning", audience: "Graduate students & postdocs", body: "Work through an experimental or troubleshooting question, examine assumptions, and decide what to try next." },
  { date: "TUESDAY · DECEMBER 8, 2026", title: "Writing & revision", audience: "Faculty & trainees", body: "Review feedback on a short passage, improve clarity, and keep your meaning intact." },
];
const steps = [
  { number: "01", title: "Set the context", text: "Bring a real question or use a provided example. Define what a useful result would look like." },
  { number: "02", title: "Review & refine", text: "Work with AI, examine what it produced, and decide which suggestions hold up." },
  { number: "03", title: "Save & reuse", text: "Keep the useful steps and think about where you would apply them next." },
];

export default function WorkshopPage() {
  return <><SiteHeader /><main id="main" className={styles.page}>
    <div className={styles.shell}>
      <section className={styles.hero} id="workshop" aria-labelledby="title"><div className={styles.heroText}><p className={styles.eyebrow}><span className={styles.eyebrowLine} /> PRACTICAL AI FOR RESEARCH</p><h1 id="title">Make AI useful in the research you <em>already do.</em></h1><p className={styles.lede}>Two hands-on workshops on using AI for experimental planning and scientific writing. Work through examples, evaluate the results, and learn a method you can reuse.</p><a className={styles.textLink} href="#sessions">Choose a workshop <span aria-hidden="true">↓</span></a></div><aside className={styles.infoCard} aria-label="Workshop summary"><span className={styles.cardIndex}>THE QUICK VERSION</span><strong>Bring a real question.</strong><p>We will work on it together. No prior AI experience is needed; examples will be provided.</p><div className={styles.cardRule} /><span className={styles.cardStatus}><span aria-hidden="true" /> Registration details coming soon</span></aside></section>
      <section className={styles.sessions} id="sessions" aria-labelledby="sessions-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>TWO WORKSHOPS · CHOOSE ONE</p><h2 id="sessions-title">Find the session for your work.</h2></div><p>Both workshops run from 2–5 p.m. on the Einstein campus. The room and registration link will be added here.</p></div><div className={styles.sessionList}>{sessions.map((session) => <article className={styles.session} key={session.date}><div><span className={styles.sessionDate}>{session.date}</span><strong>2–5 p.m.</strong></div><div><h3>{session.title}</h3><p>{session.body}</p></div><span className={styles.sessionAudience}>FOR<br /><b>{session.audience}</b></span></article>)}</div></section>
      <section className={styles.approach} aria-labelledby="approach-title"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>ONE METHOD, USEFUL BEYOND THE WORKSHOP</p><h2 id="approach-title">A result you can <em>understand.</em></h2></div><p>Human judgment belongs in the process. We will practice how to inspect a result and decide what is useful.</p></div><ol className={styles.steps}>{steps.map((step) => <li key={step.number}><span className={styles.stepNumber}>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></section>
      <section className={styles.details} id="details" aria-labelledby="details-title"><div className={styles.detailsIntro}><p className={styles.eyebrow}>PLAN YOUR VISIT</p><h2 id="details-title">The practical details.</h2><p>These details reflect the current workshop flyer. Please return here for the room and organizer&apos;s registration link before attending.</p></div><div className={styles.detailsCard}><div className={styles.detailRow}><span>Dates</span><strong>Dec 7 or Dec 8, 2026</strong></div><div className={styles.detailRow}><span>Time</span><strong>2–5 p.m.</strong></div><div className={styles.detailRow}><span>Location</span><strong>Einstein campus · room TBA</strong></div><div className={styles.detailRow}><span>Preparation</span><strong>No prior AI experience needed</strong></div><div className={styles.detailRow}><span>Registration</span><strong>{registrationUrl ? "Open" : "Link coming soon"}</strong></div>{registrationUrl ? <a className={styles.primaryAction} href={registrationUrl} target="_blank" rel="noopener noreferrer">Open registration <span aria-hidden="true">→</span></a> : <p className={styles.pendingNote}>Registration is managed by the organizer. We&apos;ll add the link here when it is available.</p>}</div></section>
      <section className={styles.contact} aria-labelledby="contact-title"><div><p className={styles.eyebrow}>A QUESTION BEFORE THEN?</p><h2 id="contact-title">Ask us about the workshop.</h2></div><div><p>Tell us which session you are considering. Please keep an initial email free of confidential research material.</p><a href={questionUrl}>Email Max and Rami <span aria-hidden="true">→</span></a></div></section>
    </div>
  </main><SiteFooter /></>;
}
