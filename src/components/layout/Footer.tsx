import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { contact, copyright } from '@/data/site';
import { services } from '@/data/services';
import { Reveal } from '@/components/animations/Reveal';
import { BackToTop } from './BackToTop';

const YEAR = new Date().getFullYear();

const pages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

const reach = ['Middle East', 'Europe', 'Asia', 'Americas'];

const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${contact.address.line1}, ${contact.address.line2}`,
)}`;

/**
 * A column. Every column opens with the same heading and the same gap
 * beneath it, so the four headings share one baseline and so do the first
 * lines under them — alignment is a property of the grid, not of margins
 * tuned per column.
 */
function Column({
  title,
  children,
  delay = 0,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal as="div" kind="body" delay={delay} className={className}>
      <h2 className="t-label text-gold">{title}</h2>
      <div className="mt-5">{children}</div>
    </Reveal>
  );
}

/** A directory link: one line of body type, its underline drawn on hover. */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-[2.75rem] items-center text-[0.9375rem] text-ivory-2 transition-colors duration-500 ease-premium hover:text-ivory md:min-h-0 md:py-[0.3125rem]"
    >
      <span className="link-underline">{children}</span>
    </Link>
  );
}

/** A small caption over a value — Telephone, Email. */
function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-stone">{children}</p>;
}

/**
 * The footer.
 *
 * A directory set on the lifted ivory ground, read left to right: the site,
 * the three disciplines, how to reach the firm and where it is. One grid
 * carries all four columns — four across on a desktop, two on a tablet, one
 * on a phone — inside the same container as every section above it, so
 * the footer's edges are the page's edges.
 *
 * Beneath it, between two hairlines, the firm's reach as a single line of
 * small capitals; then the legal line on one baseline.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--char)] text-[var(--ivory)]">
      <div className="shell pt-12 md:pt-16 lg:pt-[5.25rem]">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12 lg:grid-cols-[1fr_1fr_1.3fr_1.3fr] lg:gap-x-10">
          <Column title="Explore">
            <nav aria-label="Footer">
              <ul>
                {pages.map((p) => (
                  <li key={p.href}>
                    <FooterLink href={p.href}>{p.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Column>

          <Column title="Services" delay={0.05}>
            <nav aria-label="Services">
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <FooterLink href={`/services/${s.slug}`}>{s.title}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Column>

          <Column title="Connect" delay={0.1}>
            <div className="space-y-5">
              <div>
                <Caption>Telephone</Caption>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="mt-1 inline-flex min-h-[2.75rem] items-center text-base font-medium text-ivory transition-colors duration-500 hover:text-gold md:min-h-0"
                >
                  <span className="link-underline">{contact.phone}</span>
                </a>
              </div>
              <div>
                <Caption>Email</Caption>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 inline-flex min-h-[2.75rem] items-center text-base font-medium text-ivory transition-colors duration-500 hover:text-gold md:min-h-0"
                >
                  <span className="link-underline">{contact.email}</span>
                </a>
              </div>
            </div>
          </Column>

          <Column title="World Headquarters" delay={0.15}>
            <address className="not-italic">
              <p className="text-[0.9375rem] font-semibold uppercase leading-[1.6] tracking-[0.12em] text-ivory">
                Dubai
              </p>
              <p className="mt-1 text-[0.9375rem] leading-[1.7] text-ivory-2">
                DMCC Business Centre
                <br />
                Jumeirah Lake Towers
                <br />
                Dubai, United Arab Emirates
              </p>
            </address>
            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex min-h-[2.75rem] items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:text-gold md:min-h-0"
            >
              <span className="link-underline">View location</span>
              <ArrowRight aria-hidden strokeWidth={1.5} className="arrow-right h-3.5 w-3.5 text-[var(--brass)]" />
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
          </Column>
        </div>

        {/* Reach */}
        <div className="mt-12 border-y border-[var(--line)] py-4 md:mt-14 lg:mt-16">
          <ul
            aria-label="Global presence"
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-stone"
          >
            <li className="text-gold">Dubai</li>
            {reach.map((r) => (
              <li key={r} className="flex items-center gap-x-3">
                <span aria-hidden className="h-[3px] w-[3px] rounded-full bg-[var(--brass)] opacity-80" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-2 py-6 text-[0.8125rem] text-stone md:flex-row md:items-center md:justify-between md:gap-6">
          <p>
            © {YEAR} {copyright}
          </p>
          <div className="flex items-center justify-between gap-8 md:justify-end">
            <span>Dubai, UAE</span>
            <BackToTop className="min-h-[2.75rem] text-ivory-2 transition-colors duration-500 hover:text-ivory md:min-h-0" />
          </div>
        </div>
      </div>
    </footer>
  );
}
