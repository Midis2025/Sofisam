'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const principles = [
  {
    num: '01',
    word: 'Confidential',
    note: 'Sensitive positions and consequential mandates are handled strictly in a closed circle by the principals who took them on.',
  },
  {
    num: '02',
    word: 'Unconflicted',
    note: 'No products to place, no underwriting interests, and no side to favour. Recommendations reflect the merits of the situation alone.',
  },
  {
    num: '03',
    word: 'Strategic',
    note: 'Advice framed around what a decision commits you to, testing the structural downside rather than only what an opportunity promises.',
  },
  {
    num: '04',
    word: 'International',
    note: 'Relationships and cross-border capabilities spanning the globe, evaluated jurisdiction by jurisdiction rather than regional average.',
  },
  {
    num: '05',
    word: 'Experienced',
    note: 'Built over decades of international business experience and informed by the perspective of executives who have held positions.',
  },
] as const;

export function AdvisoryPrinciples() {
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Advisory Principles"
      id="principles"
      className="relative bg-[var(--void)] py-16 sm:py-20 lg:py-24 border-b border-[var(--line-soft)]"
      aria-labelledby="principles-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <div className="max-w-[48rem]">
          <div className="kicker">
            <p className="t-label">
              Advisory Principles
            </p>
          </div>

          <h2
            id="principles-heading"
            className="mt-eyebrow t-h2 text-[var(--ivory)]"
          >
            Five principles that decide what we will and will not say.
          </h2>

          <p className="mt-3.5 t-body text-[var(--sage)]">
            The advice SOFISAM provides is described in its own terms: confidential, unconflicted, and strategic, built over decades of international business experience.
          </p>
        </div>

        {/* 5-Column Editorial Card Grid with Staggered Entrance & Hover Lift */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
          {principles.map((p, i) => (
            <motion.div
              key={p.word}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between p-6 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-plate)]"
            >
              {/* Thin gold top accent rule extending on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
              />

              <div>
                {/* Numeral and visual indicator */}
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <span className="font-mono text-xs font-semibold text-[var(--brass)]">
                    {p.num}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brass)] transition-transform duration-300 group-hover:scale-125" />
                </div>

                <h3 className="mt-4 t-card text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                  {p.word}
                </h3>
                <p className="mt-2.5 t-small text-[var(--sage)]">
                  {p.note}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[var(--line-soft)] flex items-center justify-between text-[0.6875rem] uppercase tracking-wider text-[var(--stone)]">
                <span>Core Pillar</span>
                <span className="text-[var(--brass)] font-mono">{p.num}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
