import type { Metadata } from "next";
import Link from "next/link";
import styles from "./workshop.module.css";

const email = "aimee_workflows@proton.me";
const registrationUrl = process.env.NEXT_PUBLIC_WORKSHOP_REGISTRATION_URL?.trim();
const questionUrl = `mailto:${email}?subject=${encodeURIComponent("Question about the hands-on AI workshop")}`;

export const metadata: Metadata = {
  title: "Hands-on AI workshop | Max and Rami",
  description:
    "A practical workshop in development for people doing research work. Workshop details and registration will be posted here when confirmed.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    number: "01",
    title: "Start with a task",
    text: "Work from a manageable research-related example and decide what a useful result would look like.",
  },
  {
    number: "02",
    title: "Try a first approach",
    text: "See how AI can support the work, with the choices behind the result made visible.",
  },
  {
    number: "03",
    title: "Review and reuse",
    text: "Check what the result can and cannot support, then capture a method to try again.",
  },
];

export default function WorkshopPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#workshop">Skip to workshop information</a>
      <div className={styles.shell}>
        <header className={styles.header}>
          <span className={styles.wordmark}>Max <span>+</span> Rami</span>
          <span className={styles.headerTag}>WORKSHOP INFORMATION</span>
        </header>

        <section className={styles.hero} id="workshop" aria-labelledby="title">
          <div className={styles.heroText}>
            <p className={styles.eyebrow}><span className={styles.eyebrowLine} /> A PRACTICAL WORKSHOP IN DEVELOPMENT</p>
            <h1 id="title">Hands-on AI for <em>research work.</em></h1>
            <p className={styles.lede}>Explore a research-related task, make a useful first pass with AI, and learn how to review and reuse the method. The workshop is being shaped around practical work and human judgment.</p>
            <a className={styles.textLink} href="#details">See workshop details <span aria-hidden="true">↓</span></a>
          </div>
          <aside className={styles.infoCard} aria-label="Workshop status">
            <span className={styles.cardIndex}>THE QUICK VERSION</span>
            <strong>Learn by doing.</strong>
            <p>A guided first approach, a closer look at the output, and a method you can try on a fresh task.</p>
            <div className={styles.cardRule} />
            <span className={styles.cardStatus}><span aria-hidden="true" /> Details being finalized</span>
          </aside>
        </section>

        <section className={styles.approach} aria-labelledby="approach-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>WHAT WE PLAN TO PRACTICE</p><h2 id="approach-title">A result you can <em>understand.</em></h2></div>
            <p>The exact exercise and prerequisites will be confirmed with the workshop information.</p>
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
            <p className={styles.eyebrow}>PLAN YOUR VISIT</p>
            <h2 id="details-title">Details will live here.</h2>
            <p>This is the stable page for workshop information. We&apos;ll add the confirmed date, location, audience, prerequisites, and registration link as they become available.</p>
          </div>
          <div className={styles.detailsCard}>
            <div className={styles.detailRow}><span>Date and location</span><strong>To be confirmed</strong></div>
            <div className={styles.detailRow}><span>Audience and preparation</span><strong>To be confirmed</strong></div>
            <div className={styles.detailRow}><span>Registration</span><strong>{registrationUrl ? "Open" : "Link coming soon"}</strong></div>
            {registrationUrl ? (
              <a className={styles.primaryAction} href={registrationUrl} target="_blank" rel="noopener noreferrer">Open registration <span aria-hidden="true">↗</span></a>
            ) : (
              <p className={styles.pendingNote}>Please check this page again for the organizer&apos;s registration link.</p>
            )}
          </div>
        </section>

        <section className={styles.contact} aria-labelledby="contact-title">
          <div><p className={styles.eyebrow}>A QUESTION BEFORE THEN?</p><h2 id="contact-title">Start a conversation.</h2></div>
          <div><p>Tell us what you&apos;re curious about. Please keep an initial email free of confidential research material.</p><a href={questionUrl}>Email Max and Rami <span aria-hidden="true">↗</span></a></div>
        </section>

        <footer className={styles.footer}>
          <span>Max + Rami · Practical AI for real work</span>
          <Link href="/">More about our work <span aria-hidden="true">↗</span></Link>
        </footer>
      </div>
    </main>
  );
}
