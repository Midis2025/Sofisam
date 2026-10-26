import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

import { contact, copyright, footerCopy, site } from '@/data/site';
import { services } from '@/data/services';
import { Logo } from '@/components/ui/Logo';

const YEAR = new Date().getFullYear();

const pages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

/** A column's name. Nothing in front of it — the grid is the structure. */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="t-label text-gold">{children}</h2>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="link-underline inline-flex py-[0.4rem] text-[0.9375rem] text-ivory-2 transition-colors duration-500 ease-premium hover:text-ivory"
    >
      {children}
    </Link>
  );
}

/**
 * The footer — the last page of the report.
 *
 * Set on the lifted ivory ground with a hairline above it, and nothing behind
 * it: no photograph, no numbering, nothing that moves. The firm and its
 * description, the site's directory, the three disciplines, and how to reach
 * the Dubai headquarters, each in its own column; under them the wordmark
 * set very large and very faint, as a printed report closes on its colophon;
 * then the legal line.
 *
 * It is a server component: it has no state, and nothing in it animates.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-[var(--line)] bg-[var(--char)] text-[var(--ivory)] transition-colors duration-300">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" aria-label={`${site.shortName} — home`} className="inline-block transition-opacity hover:opacity-80">
              <Logo alt={site.shortName} className="h-8 w-auto sm:h-9" />
            </Link>
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-[var(--sage)]">
              {site.positioning}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brass)]" />
              <p className="text-xs tracking-wider uppercase text-[var(--stone)]">
                {contact.headquarters}
              </p>
            </div>
          </div>

          {/* Navigation Column */}
          <nav aria-label="Footer navigation" className="lg:col-span-2 lg:col-start-6">
            <ColumnHeading>Navigation</ColumnHeading>
            <ul className="mt-4 space-y-2.5">
              {pages.map((p) => (
                <li key={p.href}>
                  <FooterLink href={p.href}>{p.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services Column */}
          <nav aria-label="Services" className="lg:col-span-3">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <FooterLink href={`/services/${s.slug}`}>{s.title}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Headquarters Column */}
          <div className="lg:col-span-3">
            <ColumnHeading>Contact &amp; Headquarters</ColumnHeading>
            <div className="mt-4 flex flex-col space-y-2">
              <a
                href={`tel:${contact.phoneHref}`}
                className="text-sm font-medium text-[var(--ivory)] transition-colors hover:text-[var(--gold)]"
              >
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm text-[var(--sage)] transition-colors hover:text-[var(--gold)]"
              >
                {contact.email}
              </a>
            </div>

            <address className="mt-6 border-t border-[var(--line)] pt-5 not-italic">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brass)]">
                Headquarters
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--sage)]">
                Dubai
                <br />
                DMCC Business Centre
                <br />
                Jumeirah Lake Towers, Dubai
                <br />
                United Arab Emirates
              </p>
            </address>
          </div>
        </div>

        {/* Legal Sub-footer */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-8 text-xs text-[var(--stone)] sm:flex-row">
          <p>© {YEAR} {copyright}</p>
          <div className="flex items-center gap-6">
            <span>Dubai, UAE</span>
            <a
              href="#main"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--ivory)]"
            >
              Back to top
              <ArrowUp aria-hidden strokeWidth={1.5} className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
