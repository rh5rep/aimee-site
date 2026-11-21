import Link from "next/link";

export const email = "aimee_workflows@proton.me";

export function taskEmail(serviceTitle?: string) {
  const subject = serviceTitle ? `${serviceTitle} with Max and Rami` : "Working with Max and Rami";
  const body = "Hi Max and Rami,\n\nThe task or project we’d like help with:\n\nWho does the work and where they get stuck:\n\nWhat would make it easier for them:\n\n";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const navigation = [
  { href: "/work", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/workshop", label: "Events" },
];

function Wordmark() {
  return (
    <Link className="wordmark" href="/" aria-label="Max and Rami home">
      Max + Rami
    </Link>
  );
}

export function SiteHeader({ activePath }: { activePath?: string }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <Wordmark />
          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map(({ href, label }) => (
              <Link key={href} href={href} aria-current={activePath === href ? "page" : undefined}>{label}</Link>
            ))}
            <Link href="/contact" className="nav-contact" aria-current={activePath === "/contact" ? "page" : undefined}>Contact</Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Wordmark />
        <nav aria-label="Footer navigation">
          <Link href="/work">Services</Link>
          <Link href="/workshop">Events</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
