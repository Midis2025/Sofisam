'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Award, Compass, EyeOff, Globe2, ShieldCheck } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const principles = [
  {
    num: '01',
    word: 'Confidential',
    subtitle: 'Absolute Discretion',
    note: 'Sensitive positions and consequential mandates are handled strictly in a closed circle by the principals who took them on.',
    icon: EyeOff,
  },
  {
    num: '02',
    word: 'Unconflicted',
    subtitle: 'Structural Independence',
    note: 'No products to place, no underwriting interests, and no side to favour. Recommendations reflect the merits of the situation alone.',
    icon: ShieldCheck,
  },
  {
    num: '03',
    word: 'Strategic',
    subtitle: 'Downside Stress-Testing',
    note: 'Advice framed around what a decision commits you to, testing the structural downside rather than only what an opportunity promises.',
    icon: Compass,
  },
  {
    num: '04',
    word: 'International',
    subtitle: 'Cross-Border Reach',
    note: 'Relationships and cross-border capabilities spanning the globe, evaluated jurisdiction by jurisdiction rather than regional average.',
    icon: Globe2,
  },
  {
    num: '05',
    word: 'Experienced',
    subtitle: 'Decades of Leadership',
    note: 'Built over decades of international business experience and informed by the perspective of executives who have held positions.',
    icon: Award,
  },
] as const;

/**
 * SOFISAM Advisory Principles
 *
 * 5 Core Ethical & Operational Foundations:
 * - Confidential · Unconflicted · Strategic · International · Experienced
 * - Progressive staggered card reveal
 * - Interactive hover reactions with metallic gold accents
 */
export function AdvisoryPrinciples() {
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Advisory Principles"
      id="principles"
      className="relative bg-[var(--void)] py-20 sm:py-24 lg:py-28 border-b border-[var(--line-soft)]"
      aria-labelledby="principles-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <div className="max-w-[50rem]">
          <div className="kicker">
            <p className="t-label">
              Advisory Principles
            </p>
          </div>

          <h2
            id="principles-heading"
            className="mt-eyebrow t-h2 text-[var(--ivory)] font-light leading-[1.08]"
          >
            Five principles that decide what we will and will not say.
          </h2>

          <p className="mt-4 t-body text-[var(--sage)] leading-relaxed max-w-[54ch]">
            The advice SOFISAM provides is described in its own terms: confidential, unconflicted, and strategic, built over decades of international business experience.
          </p>
        </div>

        {/* 5-Column Editorial Card Grid with Progressive Reveal */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.word}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
                className="group relative flex flex-col justify-between p-7 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-plate)]"
              >
                {/* Thin gold top accent rule extending on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[var(--brass)]">
                      {p.num}
                    </span>
                    <Icon className="h-4 w-4 text-[var(--stone)] group-hover:text-[var(--gold)] transition-colors" />
                  </div>

                  <h3 className="mt-4 t-card text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                    {p.word}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[var(--stone)] font-medium">
                    {p.subtitle}
                  </p>
                  <p className="mt-3 t-small text-[var(--sage)] leading-relaxed">
                    {p.note}
                  </p>
                </div>

                <div className="mt-8 pt-3.5 border-t border-[var(--line-soft)] flex items-center justify-between text-[0.6875rem] uppercase tracking-wider text-[var(--stone)]">
                  <span>Pillar {p.num}</span>
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[var(--brass)] transition-transform duration-300 group-hover:scale-150"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
