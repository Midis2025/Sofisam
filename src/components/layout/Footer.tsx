import Link from 'next/link';
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';

import { contact, copyright, site } from '@/data/site';
import { services } from '@/data/services';
import { Logo } from '@/components/ui/Logo';
import { BackToTop } from './BackToTop';

const YEAR = new Date().getFullYear();

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About the Firm', href: '/about' },
  { label: 'Our Expertise', href: '/services' },
  { label: 'Strategic Insights', href: '/insights' },
  { label: 'Contact & Mandates', href: '/contact' },
];

const globalReach = ['Middle East', 'Europe', 'Asia', 'Americas'];

const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${contact.address.line1}, ${contact.address.line2}`,
)}`;

/**
 * SOFISAM Premium Architectural Footer
 *
 * Designed with prestigious editorial layout:
 * - Brand positioning and DMCC headquarters certification
 * - Structured navigation columns with hairline separators
 * - Direct contact channels with interactive hover states
 * - Global presence indicators
 * - Legal statement & smooth return-to-top
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--char)] text-[var(--ivory)] transition-colors duration-500">
      <div className="shell pt-14 pb-10 sm:pt-16 lg:pt-20">
        {/* Top Brand & Headquarters Bar */}
        <div className="grid gap-8 pb-12 border-b border-[var(--line)] lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Link href="/" aria-label="SOFISAM FZCO — Home" className="inline-block">
              <Logo alt="SOFISAM FZCO" className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-[42ch] font-display text-lg text-[var(--ivory)] font-light leading-snug">
              International Strategic Consulting, Advisory and Structuring Firm.
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-[var(--brass)] font-semibold">
              World Headquarters · Dubai Multi Commodities Centre
            </p>
          </div>

          <div className="lg:col-span-6 lg:text-right">
            <p className="text-xs uppercase tracking-wider text-[var(--stone)] font-mono">
              Direct Advisory Inquiries
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4 lg:justify-end">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-[var(--brass)]" />
                <span>{contact.email}</span>
              </a>
              <span className="text-[var(--line-strong)]">|</span>
              <a
                href={`tel:${contact.phoneHref}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[var(--brass)]" />
                <span>{contact.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4-Column Navigation & Details Grid */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 pb-12 border-b border-[var(--line)]">
          {/* Col 1: Overview */}
          <div>
            <h3 className="t-label text-gold">Navigation</h3>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-[var(--sage)] hover:text-[var(--ivory)] transition-colors py-1"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-[var(--gold)] group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Services / Disciplines */}
          <div>
            <h3 className="t-label text-gold">Disciplines</h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group inline-flex items-center gap-1 text-sm text-[var(--sage)] hover:text-[var(--ivory)] transition-colors py-1"
                  >
                    <span>{s.title}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-[var(--gold)] group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="inline-block text-xs uppercase tracking-wider text-[var(--brass)] font-semibold hover:underline pt-2"
                >
                  View All Capabilities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Principles */}
          <div>
            <h3 className="t-label text-gold">Advisory Pillars</h3>
            <ul className="mt-5 space-y-2 text-xs text-[var(--sage)]">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[var(--brass)]" />
                <span>Confidential Engagements</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[var(--brass)]" />
                <span>Unconflicted Advice</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[var(--brass)]" />
                <span>Strategic Mandate Structuring</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[var(--brass)]" />
                <span>Decades of Executive Experience</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[var(--brass)]" />
                <span>Global Cross-Border Relationships</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Registered Location */}
          <div>
            <h3 className="t-label text-gold">World Headquarters</h3>
            <address className="mt-5 not-italic text-sm text-[var(--ivory-2)] space-y-1 leading-relaxed">
              <p className="font-medium text-[var(--ivory)]">SOFISAM FZCO</p>
              <p>{contact.address.line1}</p>
              <p>{contact.address.line2}</p>
            </address>
            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--brass)] hover:text-[var(--ivory)] transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Location in Dubai</span>
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Global Presence Horizon */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 py-4 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--brass)] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[var(--stone)] font-mono">
              International Reach
            </span>
          </div>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs uppercase tracking-wider text-[var(--sage)]">
            <li className="font-semibold text-[var(--gold)]">Dubai Headquarters</li>
            {globalReach.map((region) => (
              <li key={region} className="flex items-center gap-4">
                <span aria-hidden className="text-[var(--line-strong)]">·</span>
                <span>{region}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--stone)]">
          <p>© {YEAR} {copyright}</p>
          <div className="flex items-center gap-6">
            <span>Dubai, United Arab Emirates</span>
            <BackToTop className="text-[var(--ivory-2)] hover:text-[var(--gold)] transition-colors text-xs uppercase tracking-wider font-medium" />
          </div>
        </div>
      </div>
    </footer>
  );
}
