import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import styles from "./approach.module.css";

export const metadata: Metadata = { title: "Approach | Max + Rami" };

const steps = [
  { title: "Start with one task", detail: "Walk us through how you do it today and where it gets stuck. Together we agree on what a useful result would look like and which inputs we can use." },
  { title: "Make a first pass", detail: "We try it together with your files, examples, and instructions. We note the choices that affect the result." },
  { title: "Check it together", detail: "We compare the result with the sources and agree on what needs a person’s judgment. We try a fresh example to see where the approach breaks." },
  { title: "Make it repeatable", detail: "We write down the instructions and checks you’ll need next time. When we build a workflow, we document how your team can run and maintain it." },
];

export default function ApproachPage() {
  return (
    <>
      <SiteHeader activePath="/approach" />
      <main className="container interior" id="main" tabIndex={-1}>
        <header className="page-intro">
          <h1>How we <em>work together.</em></h1>
          <p className="lede">Bring a task you already do. We’ll work through it with you and make sure you know what to check when you try it again.</p>
        </header>
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.title}>
              <h2>{step.title}</h2>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
        <section className="contact-strip" aria-labelledby="approach-next">
          <div>
            <h2 id="approach-next">What does a source check look like?</h2>
            <Link className="text-link" href="/demos#try-report">Try the Friday Report source check</Link>
          </div>
          <Link className="button" href="/contact">Tell us about a task</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
