'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

import { heroCopy, contact } from '@/data/site';
import { HeroFilm } from './HeroFilm';

const EASE = [0.16, 1, 0.3, 1] as const;

const credentials = [
  {
    idx: '01',
    title: 'Strategic Consulting',
    desc: 'Confidential, unconflicted advice for critical business decisions.',
    href: '/services/strategic-consulting',
  },
  {
    idx: '02',
    title: 'Corporate Advisory',
    desc: 'Executive perspective built from decades of leadership experience.',
    href: '/services/advisory',
  },
  {
    idx: '03',
    title: 'Structuring',
    desc: 'Tested frameworks for mandates and strategic investments.',
    href: '/services/structuring',
  },
  {
    idx: '04',
    title: 'Global Platform',
    desc: 'World headquarters in Dubai Multi Commodities Centre.',
    href: '/about',
  },
];

/**
 * SOFISAM Flagship Hero
 *
 * Cinematic composition establishing:
 * - Authoritative international advisory presence
 * - Dubai DMCC headquarters badge & live UTC+4 market indicator
 * - Luxury serif typography with staggered word/line reveals
 * - Full-fidelity cinematic film backdrop with gradient scrims
 * - Architectural 4-pillar credentials bar
 */
export function Hero() {
  const reduce = useReducedMotion();
  const [dubaiTime, setDubaiTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Dubai',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setDubaiTime(`${formatted} GST`);
      } catch {
        setDubaiTime('12:00:00 GST');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-section="SOFISAM"
      className="relative bg-[var(--void)] pt-[calc(var(--header-h)+1.25rem)] pb-14 sm:pb-20 lg:pt-[calc(var(--header-h)+2rem)] lg:pb-24 overflow-hidden"
      aria-label="Introduction & Global Advisory Platform"
    >
      <div className="shell">
        {/* Top Meta Status Strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[var(--line-soft)] text-xs"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brass)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--brass)]" />
            </span>
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
              Dubai Multi Commodities Centre (DMCC)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[0.6875rem] uppercase tracking-widest text-[var(--stone)] font-mono">
            {dubaiTime && (
              <span className="flex items-center gap-1.5">
                <Compass className="h-3 w-3 text-[var(--brass)]" />
                <span>Dubai {dubaiTime}</span>
              </span>
            )}
            <span className="hidden sm:inline-block">25.0743° N, 55.1437° E</span>
          </div>
        </motion.div>

        {/* Editorial Eyebrow & Title Spread */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-14 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
              className="kicker"
            >
              <p className="t-label">
                {heroCopy.eyebrow}
              </p>
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
              className="mt-eyebrow t-h1 text-[var(--ivory)] font-light leading-[1.04]"
            >
              A Global Corporate{' '}
              <span className="text-[var(--brass)] font-normal italic font-display">
                Advisory
              </span>{' '}
              Platform
            </motion.h1>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
            className="lg:col-span-4 lg:pb-1"
          >
            <p className="max-w-[44ch] t-body text-[var(--sage)] leading-relaxed">
              {heroCopy.statement}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href={heroCopy.primaryCta.href}
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-none bg-[var(--ivory)] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] shadow-md transition-all duration-300 hover:bg-[var(--brass)] hover:text-white"
              >
                <span>{heroCopy.primaryCta.label}</span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href={heroCopy.secondaryCta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-none border border-[var(--line-strong)] bg-transparent px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--ivory)] transition-all duration-300 hover:border-[var(--ivory)] hover:bg-[var(--line-soft)]"
              >
                <span>{heroCopy.secondaryCta.label}</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Cinematic Architectural Frame */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.28 }}
          className="relative mt-10 sm:mt-12 w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--graphite)] shadow-[var(--shadow-plate)] aspect-[3/2] sm:aspect-[21/9] lg:aspect-[24/10] max-h-[min(46rem,70svh)]"
        >
          <div className="absolute inset-0">
            <HeroFilm position="50% 38%" />
          </div>

          {/* Luxury Scrim Overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30"
          />

          {/* Architectural Framing Accents (Corner Hairlines) */}
          <span aria-hidden className="absolute top-4 left-4 h-4 w-4 border-t border-l border-white/40 pointer-events-none" />
          <span aria-hidden className="absolute top-4 right-4 h-4 w-4 border-t border-r border-white/40 pointer-events-none" />
          <span aria-hidden className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/40 pointer-events-none" />
          <span aria-hidden className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/40 pointer-events-none" />

          {/* Badges on Bottom Bar */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8 text-white z-10">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#e8c89b]" />
                <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-[#e8c89b] font-medium">
                  World Headquarters
                </p>
              </div>
              <p className="mt-1 font-display text-base sm:text-lg font-light text-white/95">
                {contact.headquarters}, {contact.address.locality}
              </p>
            </div>

            <div className="hidden sm:block text-right">
              <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-white/60 font-medium">
                Strategic Scope
              </p>
              <p className="mt-1 text-sm font-light text-white/95">
                Middle East · Europe · Asia · Americas
              </p>
            </div>
          </div>
        </motion.div>

        {/* 4-Pillar Credentials Bar */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.38 }}
          className="mt-8 grid grid-cols-1 divide-y divide-[var(--line)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 rounded-[var(--r-lg)] overflow-hidden"
        >
          {credentials.map((c, i) => (
            <Link
              key={c.idx}
              href={c.href}
              className="group relative p-6 lg:p-7 transition-all duration-300 hover:bg-[var(--void)] hover:-translate-y-0.5 focus:outline-none"
            >
              {/* Gold Top Indicator */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-[var(--stone)] group-hover:text-[var(--brass)] transition-colors">
                  {c.idx}
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-[var(--stone)] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-[var(--gold)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>

              <h3 className="mt-3 t-card text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                {c.title}
              </h3>
              <p className="mt-2 t-small text-[var(--sage)] leading-relaxed">
                {c.desc}
              </p>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
