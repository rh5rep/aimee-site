import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/site-shell";

export const metadata: Metadata = { title: "Approach | Max + Rami" };

const steps = [
  { title: "Define the task", detail: "Agree on the inputs you can use, what a useful result looks like, and who will review it." },
  { title: "Make a first pass", detail: "Use the relevant files, examples, and instructions. Keep track of the choices that shape the output." },
  { title: "Check the result", detail: "Compare the output with the sources and the agreed criteria. Try a second example to see where the approach breaks." },
  { title: "Hand it over", detail: "Save the instructions and review steps. For an implementation, document how your team can run, update, and troubleshoot it." },
];

export default function ApproachPage() {
  return (
    <>
      <SiteHeader activePath="/approach" />
      <main className="container interior" id="main">
        <header className="page-intro">
          <h1>How we <em>work</em></h1>
          <p className="lede">We start with one real task and make sure the person doing it can check and repeat the work.</p>
        </header>
        <ol className="method-list">
          {steps.map((step) => (
            <li key={step.title}>
              <h2>{step.title}</h2>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
        <div className="contact-strip">
          <Link className="text-link" href="/work#example">See the sample workflow</Link>
          <Link className="button" href="/contact">Discuss a project</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
