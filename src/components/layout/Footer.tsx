'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { contact, copyright, footerCopy, site } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Logo } from '@/components/ui/Logo';
import { Reveal } from '@/components/animations/Reveal';

const YEAR = new Date().getFullYear();
const EASE = [0.16, 1, 0.3, 1] as const;

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

/**
 * A line in the directory.
 *
 * Three things move as one: a champagne rule opens under the label, an arrow
 * arrives in front of it, and the label travels by exactly the arrow's width.
 * Both are laid out at full size and scaled to nothing, so revealing them
 * reflows nothing.
 */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group/l inline-flex items-center py-[0.6rem] text-[0.98rem] font-light text-ivory/70 transition-colors duration-500 ease-premium hover:text-ivory focus-visible:text-ivory"
    >
      <ArrowRight
        aria-hidden
        strokeWidth={1.5}
        className="h-0 w-0 shrink-0 text-gold opacity-0 transition-[width,height,opacity,margin] duration-500 ease-premium group-hover/l:mr-2 group-hover/l:h-[0.9rem] group-hover/l:w-[0.9rem] group-hover/l:opacity-100 group-focus-visible/l:mr-2 group-focus-visible/l:h-[0.9rem] group-focus-visible/l:w-[0.9rem] group-focus-visible/l:opacity-100"
      />
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 block h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-premium group-hover/l:origin-left group-hover/l:scale-x-100 group-focus-visible/l:origin-left group-focus-visible/l:scale-x-100"
        />
      </span>
    </Link>
  );
}

/* ==========================================================================
   The footer
   ========================================================================== */

/**
 * One photograph, top to bottom.
 *
 * The whole footer is a single frame: the city is the ground the closing
 * statement, the directory and the legal line are all set on, and there is no
 * point at which it stops and a black panel begins. The
 * photograph is laid in as the footer's own background — `absolute inset-0`
 * on a box that grows with its content — so however tall the footer becomes
 * at a given width, the image still reaches the last line of it.
 *
 * It is an elevated view of Downtown Dubai at dusk: towers, the interchange
 * and the city running to the coast, which is the one kind of frame that can
 * take this treatment. An aerial has detail in every part of itself, so the
 * crop that a 1440-wide band takes and the crop a 390-wide column takes both
 * land on the city rather than on empty sky. The object-position shifts
 * between the two so neither is the other's crop.
 *
 * Legibility is carried by gradients rather than by panels. A vertical scrim
 * runs the height of the frame — heavier at the head and the foot, lightest
 * across the band where the skyline should be read — with a left-weighted
 * layer under the statement. The directory adds a veil of its own, thin
 * enough at 0.22 that the towers are still visible through it, which is the
 * difference between separating the type from the city and covering it.
 *
 * In the light theme the same frame is lifted rather than darkened: the scrims
 * are drawn in ivory (`.footer-scrim-*` in `globals.css`) and heavy enough
 * that the charcoal type holds everywhere, and the city is left as a pale
 * print behind it.
 *
 * It moves twice: a settle out of 1.03 on arrival, and about fourteen pixels
 * of travel against the page scroll. Nothing moves while the reader is still.
 */
export function Footer() {
  const reduce = useReducedMotion();
  const frame = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ['start end', 'end end'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-14, 0]);

  return (
    <footer ref={frame} className="relative isolate overflow-hidden bg-void">
      {/* ---------- The photograph, behind the whole footer ---------- */}
      <motion.div
        aria-hidden
        className="absolute inset-[-2%] -z-10"
        style={reduce ? undefined : { y }}
        initial={reduce ? false : { opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-6% 0px -6% 0px' }}
        transition={{ duration: 1.5, ease: EASE }}
      >
        <div className="footer-photo h-full w-full">
          <Picture
            name="abstract-dark"
            alt=""
            decorative
            sizes="(max-width: 767px) 190vw, 100vw"
            className="h-full w-full object-cover object-[50%_48%] lg:object-[50%_42%]"
          />
        </div>
      </motion.div>

      {/* ---------- The scrims, also across the whole footer ----------
          Heaviest at the head and the foot, lightest across the band between
          the statement and the directory: that band is where the skyline is
          actually read, and nothing is set on it. */}
      <span
        aria-hidden
        className="footer-scrim-v absolute inset-0 -z-10"
      />
      <span
        aria-hidden
        className="footer-scrim-h absolute inset-0 -z-10"
      />
      <span
        aria-hidden
        className="footer-scrim-r absolute inset-0 -z-10"
      />
      <span aria-hidden className="grain absolute inset-0" />

      {/* ==================== The invitation ==================== */}
      <div className="shell relative z-[4] pb-[clamp(3rem,6vw,5rem)] pt-[clamp(6rem,15vh,10rem)]">
        <div className="grid items-end gap-[clamp(2.25rem,4vw,4rem)] lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-[44rem]">
            <Reveal kind="label" className="kicker">
              <p className="t-label text-gold">Let&rsquo;s talk</p>
            </Reveal>

            <Reveal kind="heading" delay={0.12}>
              <p className="t-h2 mt-[clamp(1.25rem,2.4vw,1.85rem)] max-w-[17ch] text-ivory">
                {footerCopy.statement}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="t-lead mt-[clamp(1rem,1.6vw,1.4rem)] max-w-[38ch] text-ivory/80">
                {footerCopy.location}
              </p>
            </Reveal>

            {/* Still until it is pointed at: it fills champagne and the type
                inverts to ink. */}
            <Reveal delay={0.32}>
              <Link
                href="/contact"
                className="group/b btn mt-[clamp(1.75rem,3vw,2.5rem)] border-[var(--line-gold)] bg-[rgb(var(--scrim-rgb)/0.35)] text-ivory backdrop-blur-[10px] hover:border-gold hover:bg-gold hover:text-ink focus-visible:border-gold focus-visible:bg-gold focus-visible:text-ink"
              >
                <span>Get in Touch</span>
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="h-[0.95rem] w-[0.95rem] transition-transform duration-500 ease-premium group-hover/b:translate-x-1 group-focus-visible/b:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          {/* The place. Set on the frame itself, not on a panel over it. */}
          <Reveal delay={0.44} className="lg:max-w-[22rem] lg:justify-self-end lg:text-right">
            <span
              aria-hidden
              className="block h-px w-[clamp(3rem,6vw,4.5rem)] bg-[var(--line-gold)] lg:ml-auto"
            />
            <p className="t-label mt-4 text-gold">World headquarters</p>
            <p className="t-h3 mt-3 text-ivory">{contact.address.locality}</p>
            <p className="t-small mt-3 text-ivory/75 lg:ml-auto lg:max-w-[28ch]">
              {contact.address.line1}
              <br />
              {contact.address.line2}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ==================== The directory ====================
          A veil rather than a panel: at 0.3 over a blur the towers are still
          visible through it, and its only edge is the hairline at the top. */}
      <div className="relative z-[4] border-t border-ivory/12 footer-directory backdrop-blur-[8px]">
        {/* No oversized wordmark ghosted behind the directory. The city is
            the only thing in this half of the frame; a second mark spread
            across it was competing with the photograph rather than signing
            it. The mark appears once here, at its proper size, in the column
            below. */}
        <div className="shell relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            <Reveal
              as="div"
              className="border-b border-ivory/10 py-[clamp(2rem,3.2vw,2.75rem)] pr-[clamp(1.5rem,3vw,3rem)] sm:border-b-0"
            >
              <Logo alt={site.shortName} loading="lazy" className="h-[2.2rem] w-auto lg:h-[2.6rem]" />
              <p className="t-body mt-[clamp(1.25rem,2vw,1.75rem)] max-w-[28ch] text-ivory/70">
                {footerCopy.statement}
              </p>
            </Reveal>

            <nav
              aria-label="Footer navigation"
              className="border-b border-ivory/10 py-[clamp(2rem,3.2vw,2.75rem)] sm:border-b-0 sm:border-l sm:border-l-ivory/10 sm:pl-[clamp(1.5rem,3vw,3rem)]"
            >
              <Reveal delay={0.07}>
                <ColumnHeading>Navigation</ColumnHeading>
                <ul className="mt-4 flex flex-col items-start">
                  {pages.map((p) => (
                    <li key={p.href}>
                      <NavLink href={p.href}>{p.label}</NavLink>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </nav>

            <div className="border-b border-ivory/10 py-[clamp(2rem,3.2vw,2.75rem)] pr-[clamp(1.5rem,3vw,3rem)] sm:border-t sm:border-t-ivory/10 lg:border-b-0 lg:border-l lg:border-l-ivory/10 lg:border-t-0 lg:pl-[clamp(1.5rem,3vw,3rem)]">
              <Reveal delay={0.14}>
                <ColumnHeading>{footerCopy.contactHeading}</ColumnHeading>
                <div className="mt-4 flex flex-col items-start">
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="link-underline inline-flex py-[0.55rem] text-[1.0625rem] font-light text-ivory/90 transition-colors duration-500 ease-premium hover:text-gold"
                  >
                    {contact.phone}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="link-underline inline-flex py-[0.55rem] text-[1.0625rem] font-light text-ivory/90 transition-colors duration-500 ease-premium hover:text-gold"
                  >
                    {contact.email}
                  </a>
                </div>
              </Reveal>
            </div>

            <address className="py-[clamp(2rem,3.2vw,2.75rem)] not-italic sm:border-l sm:border-l-ivory/10 sm:border-t sm:border-t-ivory/10 sm:pl-[clamp(1.5rem,3vw,3rem)] lg:border-t-0">
              <Reveal delay={0.21}>
                <ColumnHeading>Headquarters</ColumnHeading>
                <p className="t-h3 mt-4 text-ivory">{contact.address.locality}</p>
                <p className="t-small mt-3 max-w-[28ch] text-ivory/70">
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                </p>
                <p className="t-small mt-3 max-w-[28ch] text-stone">{contact.headquarters}</p>
              </Reveal>
            </address>
          </div>

          {/* ---------- Legal. The same ground, one hairline above it. ------- */}
          <div className="t-meta flex flex-col gap-2 border-t border-ivory/10 py-6 text-stone sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {YEAR} {copyright}
            </p>
            <p className="t-label text-stone">{contact.address.countryName}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
