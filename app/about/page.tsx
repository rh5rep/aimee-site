import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import styles from "./about.module.css";

export const metadata: Metadata = { title: "About | Max + Rami" };

export default function AboutPage() {
  return (
    <>
      <SiteHeader activePath="/about" />
      <main className="container interior" id="main" tabIndex={-1}>
        <header className="page-intro">
          <h1>Meet <em>Rami and Max.</em></h1>
          <p className="lede">We build AI workflows and teach people how to use them. Here’s what each of us brings to the work.</p>
        </header>
        <div className={styles.founders}>
          <article className={styles.profile} id="rami" aria-labelledby="rami-name">
            <div className={styles.portrait}>
              <Image className={styles.ramiPortrait} src="/images/rami-portfolio.jpg" alt="Portrait of Rami Hanna" width={768} height={1150} />
            </div>
            <div className={styles.bio}>
              <h2 id="rami-name">Rami Hanna</h2>
              <p className={styles.role}>Robotics and applied AI</p>
              <p>I studied autonomous systems at the Technical University of Denmark. My work spans computer vision, machine learning, and transformer-based language models. At PerPlant, I built tools to sort thermal crop images and select examples for model evaluation.</p>
              <p>When we build a workflow together, I want your team to know what goes in, where it can go wrong, and what to check before trusting the output.</p>
              <div className="actions">
                <a className="text-link" href="https://www.rami-hanna.com/work">Rami’s projects</a>
                <a className="text-link" href="https://www.linkedin.com/in/ramiihanna/">LinkedIn</a>
              </div>
            </div>
          </article>
          <article className={styles.profile} id="max" aria-labelledby="max-name">
            <div className={styles.portrait}>
              <Image src="/images/max-portrait.webp" alt="Portrait of Max Horton" width={540} height={540} />
            </div>
            <div className={styles.bio}>
              <h2 id="max-name">Max Horton</h2>
              <p className={styles.role}>Research and AI teaching</p>
              <p>I’m a PhD student at Albert Einstein College of Medicine, where I study how the liver changes with age. I use AI in my research and teach practical ways to use it in lectures, workshops, and one-on-one sessions.</p>
              <p>If you bring a draft or a research question, we can work through a first pass together and check it against the source material.</p>
              <div className="actions">
                <a className="text-link" href="https://maxwellhorton.substack.com/archive">Max’s writing</a>
                <a className="text-link" href="https://www.youtube.com/@Maxwell-Horton">Max on YouTube</a>
                <Link className="text-link" href="/workshop">Einstein workshops</Link>
              </div>
            </div>
          </article>
        </div>
        <figure className={styles.teaching}>
          <Image src="/images/max-presenting.webp" alt="Max Horton at the front of a classroom with a research slide on screen" width={1200} height={1600} />
          <figcaption>Max presenting his liver aging research at Einstein.</figcaption>
        </figure>
        <div className="contact-strip">
          <h2>What are you working on?</h2>
          <Link className="button" href="/contact">Tell us about a task</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
