import type { Metadata } from "next";
import Link from "next/link";
import { email, SiteFooter, SiteHeader, taskEmail } from "../../components/site-shell";

export const metadata: Metadata = { title: "Contact | Max + Rami" };

export default function ContactPage() {
  return (
    <>
      <SiteHeader activePath="/contact" />
      <main className="container interior" id="main" tabIndex={-1}>
        <header className="page-intro contact-intro">
          <h1>Contact <em>Max and Rami</em></h1>
          <p className="lede">Tell us about a part of the work you’d like to make easier for yourself or your team. A few lines are enough to start.</p>
          <div className="actions">
            <a className="button" href={taskEmail}>Write an email</a>
            <a className="text-link" href={`mailto:${email}`}>{email}</a>
          </div>
        </header>
        <section className="contact-guidance" aria-labelledby="email-title">
          <h2 id="email-title">What to include</h2>
          <div>
            <ul>
              <li>The task you’d like help with</li>
              <li>Who does it today and where they get stuck</li>
              <li>What would make it easier for the people doing it</li>
            </ul>
            <p>Please keep confidential files and personal information out of your first email.</p>
          </div>
        </section>
        <div className="contact-strip">
          <Link className="text-link" href="/workshop">Looking for the Einstein workshops?</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
