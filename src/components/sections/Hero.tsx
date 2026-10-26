'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { heroCopy, contact } from '@/data/site';
import { HeroFilm } from './HeroFilm';

const EASE = [0.16, 1, 0.3, 1] as const;

const credentials = [
  {
    idx: '01',
    title: 'Strategic Consulting',
    desc: 'Confidential, unconflicted advice for critical business decisions',
  },
  {
    idx: '02',
    title: 'Corporate Advisory',
    desc: 'Executive perspective built from decades of leadership experience',
  },
  {
    idx: '03',
    title: 'Structuring',
    desc: 'Tested frameworks for mandates and strategic investments',
  },
  {
    idx: '04',
    title: 'Global Platform',
    desc: 'World headquarters in Dubai Multi Commodities Centre',
  },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      data-section="SOFISAM"
      className="relative bg-[var(--void)] pt-[calc(var(--header-h)+1.5rem)] pb-14 sm:pb-16 lg:pt-[calc(var(--header-h)+2.5rem)] lg:pb-20 overflow-hidden"
      aria-label="Introduction"
    >
      <div className="shell">
        {/* Editorial Eyebrow & Title Spread */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[var(--brass)]" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                {heroCopy.eyebrow}
              </p>
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="mt-4 max-w-[20ch] font-display text-[clamp(2.4rem,4.5vw,4.25rem)] font-light leading-[1.08] tracking-[-0.025em] text-[var(--ivory)]"
            >
              A Global Corporate <span className="italic text-[var(--brass)] font-normal">Advisory</span> Platform
            </motion.h1>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
            className="lg:col-span-4 lg:pb-1"
          >
            <p className="max-w-[42ch] text-[1rem] leading-relaxed text-[var(--sage)]">
              {heroCopy.statement}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              <Link
                href={heroCopy.primaryCta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-none bg-[var(--ivory)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] transition-all duration-300 hover:bg-[var(--brass)] hover:text-white"
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
                className="group inline-flex items-center justify-center gap-2 rounded-none border border-[var(--line-strong)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--ivory)] transition-all duration-300 hover:border-[var(--ivory)] hover:bg-[var(--line-soft)]"
              >
                <span>{heroCopy.secondaryCta.label}</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Cinematic Architectural Frame */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.25 }}
          className="relative mt-8 sm:mt-10 w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--graphite)] shadow-[var(--shadow-plate)] aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/10] max-h-[32rem]"
        >
          <div className="absolute inset-0">
            <HeroFilm position="50% 38%" />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10"
          />

          {/* Badges on bottom */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-7 text-white">
            <div>
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-[#e8c89b] font-medium">
                World Headquarters
              </p>
              <p className="mt-1 text-sm font-light text-white/95">
                {contact.headquarters}, {contact.address.locality}
              </p>
            </div>

            <div className="hidden sm:block text-right">
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-white/60 font-medium">
                Strategic Reach
              </p>
              <p className="mt-1 text-sm font-light text-white/95">
                Middle East · Europe · Asia · Americas
              </p>
            </div>
          </div>
        </motion.div>

        {/* 4-Pillar Credentials Bar with Subtle Hover Micro-interactions */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.35 }}
          className="mt-6 sm:mt-8 grid grid-cols-1 divide-y divide-[var(--line)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 rounded-[var(--r-lg)] overflow-hidden"
        >
          {credentials.map((c, i) => (
            <motion.div
              key={c.idx}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              className="group relative p-5 lg:p-6 transition-all duration-300 hover:bg-[var(--void)] hover:-translate-y-0.5"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
              />

              <span className="font-mono text-xs font-semibold tracking-wider text-[var(--brass)]">
                {c.idx}
              </span>
              <h3 className="mt-1.5 text-base font-medium tracking-tight text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                {c.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--sage)]">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
