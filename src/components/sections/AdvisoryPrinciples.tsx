'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Picture } from '@/components/ui/Picture';
import { Reveal, DrawRule } from '@/components/animations/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The five principles are drawn directly from SOFISAM's own description of its
 * advice: "confidential, unconflicted and strategic advice, built over decades
 * of international business experience".
 */
const principles = [
  {
    word: 'Confidential',
    note: 'Sensitive positions are handled in a closed circle, by the principals who took them on.',
    image: 'lounge-dark',
    focal: '50% 50%',
    alt: 'Darkened executive lounge with slatted timber screens and low, considered lighting',
  },
  {
    word: 'Unconflicted',
    note: 'No product to place and no side to favour. The recommendation reflects the situation, not the adviser.',
    image: 'facade-pale',
    focal: '50% 45%',
    alt: 'Pale minimal tower rising beside a sheer glass facade under a clear sky',
  },
  {
    word: 'Strategic',
    note: 'Advice framed around what a decision commits you to, not only what it promises.',
    image: 'spiral-dark',
    focal: '50% 50%',
    alt: 'Dark spiral stair seen from below, forming a precise geometric spiral',
  },
  {
    word: 'International',
    note: 'Relationships and partnerships that span the globe, read jurisdiction by jurisdiction.',
    image: 'district-dusk',
    focal: '50% 45%',
    alt: 'International financial district towers at dusk under a heavy sky',
  },
  {
    word: 'Experienced',
    note: 'Built over decades of international business experience, and the judgement that comes with it.',
    image: 'tower-detail',
    focal: '50% 50%',
    alt: 'Close detail of a dark corporate tower facade with lit interiors visible through the glass',
  },
] as const;

export function AdvisoryPrinciples() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section
      className="relative overflow-hidden bg-ink text-bone"
      aria-labelledby="principles-heading"
    >
      {/* Backdrop imagery reacting to the active principle */}
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence mode="sync">
          <motion.div
            key={principles[active].word}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Picture
              name={principles[active].image}
              alt=""
              decorative
              sizes="100vw"
              focal={principles[active].focal}
              className="h-full w-full"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-ink/85" />
      </div>

      <div className="shell-wide relative z-10 section">
        <Reveal className="flex items-center gap-4">
          <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
          <p className="t-label text-gold">Advisory Principles</p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="principles-heading" className="t-h2 max-w-[16ch] text-bone lg:col-span-7">
            Five words that decide what we will and will not say.
          </h2>
          <p className="t-body max-w-[38ch] text-bone/55 lg:col-span-5 lg:pb-2">
            The advice SOFISAM provides is described in its own terms:
            confidential, unconflicted and strategic, built over decades of
            international business experience.
          </p>
        </div>

        <DrawRule tone="light" className="mt-[var(--space-section-sm)]" />

        {/* Word list */}
        <ul className="mt-[var(--content-gap-md)]">
          {principles.map((p, i) => {
            const isActive = i === active;
            return (
              <li key={p.word} className="border-b border-bone/12">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className="group flex w-full flex-col gap-3 py-[var(--content-gap-md)] text-left md:flex-row md:items-baseline md:gap-8"
                >
                  <span
                    aria-hidden
                    className={`t-index shrink-0 text-[0.72rem] transition-colors duration-500 ${
                      isActive ? 'text-gold' : 'text-bone/45'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span
                    className={`font-display text-[clamp(2rem,5.4vw,4.25rem)] leading-[0.98] tracking-tighter transition-colors duration-500 md:flex-1 ${
                      isActive ? 'text-bone' : 'text-bone/55'
                    }`}
                  >
                    {p.word}
                  </span>

                  <span
                    className={`max-w-[40ch] text-[0.86rem] font-light leading-relaxed transition-colors duration-500 md:w-[32%] md:shrink-0 ${
                      isActive ? 'text-bone/70' : 'text-bone/45'
                    }`}
                  >
                    {p.note}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
