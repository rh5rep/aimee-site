import Link from "next/link";

export const email = "aimee_workflows@proton.me";
export const taskEmail = `mailto:${email}?subject=${encodeURIComponent("A task to discuss")}&body=${encodeURIComponent("Hi Max and Rami,\n\nThe work I would like to discuss is:\n\nWhat makes it difficult today:\n\n")}`;

export function Arrow({ down = false }: { down?: boolean }) {
  return <svg aria-hidden="true" className="arrow" viewBox="0 0 20 20" fill="none"><path d={down ? "M10 3v13m-5-5 5 5 5-5" : "M4 16 16 4M6 4h10v10"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Wordmark() {
  return <Link className="wordmark" href="/" aria-label="Max and Rami home"><span className="wordmark-symbol" aria-hidden="true"><i /><i /><i /></span>Max <span className="wordmark-plus">+</span> Rami</Link>;
}

export function SiteHeader() {
  return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><div className="container header-inner"><Wordmark /><Link className="mobile-contact" href="/contact">Contact <Arrow /></Link><nav aria-label="Main navigation" className="main-nav"><Link href="/work">What we do</Link><Link href="/approach">Our approach</Link><Link href="/about">About us</Link><Link href="/workshop">Workshop</Link><Link className="nav-contact" href="/contact">Get in touch <Arrow /></Link></nav></div></header></>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-inner"><Wordmark /><span>Practical AI for real work.</span><div><Link href="/workshop">Workshop</Link><Link href="/contact">Contact</Link></div></div></footer>;
}
