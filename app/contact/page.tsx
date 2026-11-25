import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { email, SiteFooter, SiteHeader, taskEmail } from "../../components/site-shell";
import { ProjectEmailLink } from "./project-email-link";
import styles from "./contact.module.css";

export const metadata: Metadata = { title: "Contact | Max + Rami" };

export default function ContactPage() {
  return (
    <>
      <SiteHeader activePath="/contact" />
      <main className="container interior" id="main" tabIndex={-1}>
        <header className="page-intro">
          <h1>Tell us what you’re <em>working on.</em></h1>
          <p className="lede">A few lines about one task are enough. In the first conversation, we’ll work out where it gets stuck, who needs to be involved, and what would make a useful first pass.</p>
        </header>
        <div className={styles.exchange}>
          <section aria-labelledby="email-title">
            <h2 id="email-title">Start with an email</h2>
            <Suspense fallback={
              <>
                <a className="button" href={taskEmail()}>Write an email</a>
                <a className={`text-link ${styles.address}`} href={`mailto:${email}`}>{email}</a>
              </>
            }>
              <ProjectEmailLink />
            </Suspense>
          </section>
          <section className={styles.guidance} aria-labelledby="include-title">
            <h2 id="include-title">What to include</h2>
            <ul>
              <li>What task would you like help with?</li>
              <li>Who does it today, and where do they get stuck?</li>
              <li>What would make the task easier?</li>
            </ul>
            <p>Please keep confidential files and personal information out of your first email.</p>
          </section>
        </div>
        <div className="contact-strip">
          <Link className="text-link" href="/workshop">Looking for the Einstein workshops?</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
