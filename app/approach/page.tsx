import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, SiteFooter, SiteHeader } from "../../components/site-shell";

export const metadata: Metadata = { title: "Our approach | Max + Rami" };
const steps = [
  { number: "01", title: "Start with real work", body: "Choose a task you recognize and define what a useful result would look like." },
  { number: "02", title: "Try an approach", body: "Build a first pass with AI. Make the inputs and decisions visible." },
  { number: "03", title: "Review the result", body: "Check the important details, limitations, and places where your judgment matters." },
  { number: "04", title: "Keep what works", body: "Save the useful steps and try them again on a fresh example." },
];
export default function ApproachPage() {
  return <><SiteHeader /><main id="main"><section className="page-hero" aria-labelledby="title"><div className="container page-hero-grid"><div><p className="eyebrow">OUR APPROACH</p><h1 id="title">A useful answer is only <em>the beginning.</em></h1></div><p>We want people to know how they got a result, when to trust it, and how to adapt the method for the next task. Human judgment runs through the process.</p></div></section>
    <section className="method-section section-pad" aria-labelledby="method-title"><div className="container method-layout"><div className="method-intro"><p className="eyebrow">THE WORKING METHOD</p><h2 id="method-title">Try it. Check it. <em>Make it yours.</em></h2><p>The best starting point is small enough to inspect and useful enough to matter. We teach the choices behind the work, then look for a chance to test the method again.</p></div><ol className="method-list">{steps.map((step) => <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol></div></section>
    <section className="principle-section section-pad" aria-labelledby="principle-title"><div className="container principle-layout"><div><p className="eyebrow">WHAT GUIDES US</p><h2 id="principle-title">Useful, understandable, <em>human-led.</em></h2></div><div className="principle-grid"><article><span>01</span><h3>Begin with the person.</h3><p>Starting familiarity and the real task matter more than labels such as beginner or advanced.</p></article><article><span>02</span><h3>Show the choices.</h3><p>A result becomes more valuable when the person can see the context, tradeoffs, and checks behind it.</p></article><article><span>03</span><h3>Keep judgment visible.</h3><p>AI can help produce a first pass. People decide what is accurate, useful, and appropriate for the work.</p></article></div></div></section>
    <section className="next-section section-pad"><div className="container next-layout"><div><p className="eyebrow">PUT IT INTO PRACTICE</p><h2>Bring a question <em>worth exploring.</em></h2></div><div><p>Tell us a little about the work and we can find a sensible place to begin.</p><Link className="button button-primary" href="/contact">Start a conversation <Arrow /></Link></div></div></section>
  </main><SiteFooter /></>;
}
