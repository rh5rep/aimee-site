import Link from "next/link";
import { MobileMenu, SkipLink, StickyHeader, Wordmark } from "./site-navigation";

export const email = "aimee_workflows@proton.me";

export function taskEmail(serviceTitle?: string) {
  const subject = serviceTitle ? `${serviceTitle} with Max and Rami` : "Working with Max and Rami";
  const body = "Hi Max and Rami,\n\nThe task or project we’d like help with:\n\nWho does the work and where they get stuck:\n\nWhat would make it easier for them:\n\n";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const navigation = [
  { href: "/work", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/demos", label: "Demos" },
  { href: "/about", label: "About" },
  { href: "/workshop", label: "Einstein workshops" },
];

function NavigationLinks({ activePath }: { activePath?: string }) {
  return navigation.map(({ href, label }) => (
    <Link key={href} href={href} aria-current={activePath === href ? "page" : undefined}>{label}</Link>
  ));
}

function ContactLink({ activePath }: { activePath?: string }) {
  return (
    <Link href="/contact" className="nav-contact" aria-current={activePath === "/contact" ? "page" : undefined}>Contact</Link>
  );
}

export function SiteHeader({ activePath }: { activePath?: string }) {
  return (
    <StickyHeader>
      <SkipLink />
      <div className="container header-inner">
        <Wordmark />
        <nav className="main-nav" aria-label="Main navigation">
          <NavigationLinks activePath={activePath} />
          <ContactLink activePath={activePath} />
        </nav>
        <div className="mobile-tools">
          <ContactLink activePath={activePath} />
          <MobileMenu><NavigationLinks activePath={activePath} /></MobileMenu>
        </div>
      </div>
    </StickyHeader>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Wordmark />
        <nav aria-label="Footer navigation">
          <Link href="/work">Services</Link>
          <Link href="/workshop">Einstein workshops</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
