import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/site-shell";

export const metadata: Metadata = { title: "About | Max + Rami" };

export default function AboutPage() {
  return (
    <>
      <SiteHeader activePath="/about" />
      <main className="container interior" id="main" tabIndex={-1}>
        <header className="page-intro">
          <h1>About <em>Max and Rami</em></h1>
          <p className="lede">Max teaches people to use AI in their work. Rami builds and integrates technical systems.</p>
        </header>
        <div className="bio-list">
          <article id="max">
            <Image src="/images/max-portrait.webp" alt="Max Horton" width={160} height={160} />
            <div>
              <h2>Max Horton</h2>
              <p>Max is a graduate student at Albert Einstein College of Medicine studying liver aging. He has used AI in his academic work since late 2022 and has given lectures, led workshops, and worked one-on-one with researchers. He writes on Substack about AI in knowledge work.</p>
            </div>
          </article>
          <article id="rami">
            <Image src="/images/rami-portfolio.jpg" alt="Rami Hanna" width={768} height={1150} />
            <div>
              <h2>Rami Hanna</h2>
              <p>Rami is a robotics engineer with a master’s degree in autonomous systems engineering. His work spans sensing, computer vision, systems integration, and ML-based tools.</p>
              <div className="actions">
                <a className="text-link" href="https://www.rami-hanna.com/">Personal website</a>
                <a className="text-link" href="https://www.linkedin.com/in/ramiihanna/">LinkedIn</a>
              </div>
            </div>
          </article>
        </div>
        <figure className="teaching-photo">
          <Image src="/images/max-presenting.webp" alt="Max Horton at the front of a classroom with a research slide on screen" width={1200} height={1600} />
          <figcaption>Max presenting his liver aging research at Einstein.</figcaption>
        </figure>
        <div className="contact-strip">
          <Link className="text-link" href="/work">View services</Link>
          <Link className="button" href="/contact">Discuss a project</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
