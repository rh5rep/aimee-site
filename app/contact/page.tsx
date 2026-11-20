import type { Metadata } from "next";
import Link from "next/link";
import { email, SiteFooter, SiteHeader, taskEmail } from "../../components/site-shell";

export const metadata: Metadata = { title: "Contact | Max + Rami" };

export default function ContactPage() {
  return (
    <>
      <SiteHeader activePath="/contact" />
      <main className="container interior" id="main">
        <header className="page-intro contact-intro">
          <h1>Contact Max and Rami</h1>
          <p className="lede">Tell us what you’d like to learn, improve, or build with AI.</p>
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
              <li>What you’ve already tried, if anything</li>
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
