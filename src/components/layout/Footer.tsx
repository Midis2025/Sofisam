import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { contact, copyright, footerCopy } from '@/data/site';
import { services } from '@/data/services';
import { insights } from '@/data/insights';
import { Reveal } from '@/components/animations/Reveal';

const YEAR = new Date().getFullYear();

const pages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="rd-label text-[var(--rd-accent)]">{children}</h2>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="link-underline inline-block py-[0.7rem] text-[0.95rem] font-light text-bone/60 transition-colors duration-400 hover:text-bone"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="rd-dark rd-on-dark relative overflow-hidden">
      <div className="rd-shell relative z-10 pt-[var(--rd-pad-sm)]">
        {/* Statement and contact */}
        <Reveal as="div">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            <div className="lg:col-span-7">
              <p className="rd-h2 max-w-[20ch] text-bone">{footerCopy.statement}</p>
              <p className="rd-body mt-5 max-w-[38ch] text-[var(--rd-sage)]">
                {footerCopy.location}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rd-block-inv h-full">
                <ColumnHeading>{footerCopy.contactHeading}</ColumnHeading>
                <address className="mt-5 not-italic">
                  <p className="rd-small text-bone/60">
                    {contact.address.line1}
                    <br />
                    {contact.address.line2}
                  </p>
                  <div className="mt-4 flex flex-col items-start">
                    <a
                      href={`tel:${contact.phoneHref}`}
                      className="link-underline inline-flex py-[0.6rem] text-[1.0625rem] font-light text-bone/85 hover:text-[var(--rd-accent)]"
                    >
                      {contact.phone}
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="link-underline inline-flex py-[0.6rem] text-[1.0625rem] font-light text-bone/85 hover:text-[var(--rd-accent)]"
                    >
                      {contact.email}
                    </a>
                  </div>
                </address>
              </div>
            </div>
          </div>
        </Reveal>

        <span aria-hidden className="rd-rule-inv my-[var(--rd-pad-sm)]" />

        {/* Directory */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 lg:grid-cols-12 lg:gap-x-[clamp(1.5rem,2.6vw,3rem)]">
          <nav aria-label="Footer pages" className="lg:col-span-3">
            <ColumnHeading>Navigate</ColumnHeading>
            <ul className="mt-4 flex flex-col items-start">
              {pages.map((p) => (
                <li key={p.href}>
                  <FooterLink href={p.href}>{p.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services" className="lg:col-span-3">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="mt-4 flex flex-col items-start">
              {services.map((s) => (
                <li key={s.slug}>
                  <FooterLink href={`/services/${s.slug}`}>{s.title}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer insights" className="col-span-2 md:col-span-2 lg:col-span-4">
            <ColumnHeading>Insights</ColumnHeading>
            <ul className="mt-4 flex flex-col items-start">
              {insights.map((i) => (
                <li key={i.slug} className="max-w-[34ch]">
                  <FooterLink href={`/insights/${i.slug}`}>{i.title}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <ColumnHeading>Enquiries</ColumnHeading>
            <Link
              href="/contact"
              className="group/f mt-3 inline-flex items-center gap-2 py-[0.7rem] text-[0.95rem] font-light text-bone/80 transition-colors hover:text-[var(--rd-accent)]"
            >
              <span className="link-underline">Start a conversation</span>
              <ArrowUpRight
                aria-hidden
                strokeWidth={1.5}
                className="h-4 w-4 transition-transform duration-500 ease-premium group-hover/f:translate-x-0.5 group-hover/f:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Wordmark */}
        <div className="mt-[var(--rd-pad-sm)] overflow-hidden" aria-hidden>
          <img
            src="/logo.png"
            alt=""
            width={834}
            height={209}
            loading="lazy"
            className="h-auto max-h-[9rem] w-full max-w-none object-contain opacity-[0.07] lg:max-h-[11rem]"
          />
        </div>

        <span aria-hidden className="rd-rule-inv mt-[clamp(1.5rem,2.4vw,2rem)]" />

        {/* Legal */}
        <div className="rd-meta flex flex-col gap-3 py-7 text-bone/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {copyright}
          </p>
          <p className="rd-label text-bone/35">Dubai Multi Commodities Centre</p>
        </div>
      </div>
    </footer>
  );
}
