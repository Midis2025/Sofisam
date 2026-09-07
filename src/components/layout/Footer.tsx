import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { contact, copyright, footerCopy } from '@/data/site';
import { services } from '@/data/services';
import { insights } from '@/data/insights';
import { Reveal, DrawRule } from '@/components/animations/Reveal';

const YEAR = new Date().getFullYear();

const pages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="t-label text-gold">{children}</h2>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="link-underline inline-block py-[0.7rem] text-[0.92rem] font-light text-bone/60 transition-colors duration-400 hover:text-bone"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div
        aria-hidden
        className="precision-grid precision-grid-fade pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="shell-wide relative z-10">
        {/* Top: statement */}
        <Reveal as="div" className="pt-[clamp(4rem,9vw,7.5rem)]">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="font-display text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.14] tracking-tighter text-bone">
                {footerCopy.statement}
              </p>
              <p className="mt-4 max-w-[38ch] text-[0.98rem] font-light leading-relaxed text-bone/50">
                {footerCopy.location}
              </p>
            </div>

            <div className="lg:col-span-5 lg:pt-2">
              <ColumnHeading>{footerCopy.contactHeading}</ColumnHeading>
              <address className="mt-6 not-italic">
                <p className="text-[0.98rem] font-light leading-relaxed text-bone/60">
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="link-underline inline-flex w-fit py-[0.7rem] text-[0.98rem] font-light text-bone/80 hover:text-gold"
                  >
                    {contact.phone}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="link-underline inline-flex w-fit py-[0.7rem] text-[0.98rem] font-light text-bone/80 hover:text-gold"
                  >
                    {contact.email}
                  </a>
                </div>
              </address>
            </div>
          </div>
        </Reveal>

        <DrawRule tone="light" className="my-[clamp(3rem,6vw,5rem)]" />

        {/* Navigation columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-12 lg:gap-x-10">
          <nav aria-label="Footer pages" className="lg:col-span-3">
            <ColumnHeading>Navigate</ColumnHeading>
            <ul className="mt-5 flex flex-col items-start">
              {pages.map((p) => (
                <li key={p.href}>
                  <FooterLink href={p.href}>{p.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services" className="lg:col-span-3">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="mt-5 flex flex-col items-start">
              {services.map((s) => (
                <li key={s.slug}>
                  <FooterLink href={`/services/${s.slug}`}>{s.title}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer insights" className="col-span-2 md:col-span-2 lg:col-span-4">
            <ColumnHeading>Insights</ColumnHeading>
            <ul className="mt-5 flex flex-col items-start">
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
              className="group/f mt-3 inline-flex items-center gap-2 py-[0.7rem] text-[0.92rem] font-light text-bone/80 transition-colors hover:text-gold"
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

        {/* Oversized wordmark */}
        <div className="mt-[clamp(3.5rem,8vw,7rem)]" aria-hidden>
          <img
            src="/logo.png"
            alt=""
            width={834}
            height={209}
            loading="lazy"
            className="h-auto w-full max-w-none opacity-[0.09]"
          />
        </div>

        <DrawRule tone="light" className="mt-[clamp(2rem,4vw,3rem)]" />

        {/* Legal bar */}
        <div className="flex flex-col gap-3 py-8 text-[0.76rem] font-light tracking-wide text-bone/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {copyright}
          </p>
          <p className="uppercase tracking-[0.2em]">
            Dubai Multi Commodities Centre
          </p>
        </div>
      </div>
    </footer>
  );
}
