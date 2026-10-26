'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { Picture } from '@/components/ui/Picture';

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    step: '01',
    title: 'Understand',
    desc: 'What is actually being decided, who carries it, and what the real constraints are — as opposed to how they were described.',
    image: 'council-session',
    imageAlt: 'Senior executives working through strategic papers together at a conference table',
  },
  {
    step: '02',
    title: 'Evaluate',
    desc: 'The position tested objectively from the outside: what has to be true, what the downside costs, and which elements become difficult to reverse.',
    image: 'process-evaluate',
    imageAlt: 'A market chart and structural analysis being evaluated',
  },
  {
    step: '03',
    title: 'Structure',
    desc: 'Intent expressed in a resilient form that behaves predictably: authority, oversight, and terms that remain legible under stress.',
    image: 'process-understand',
    imageAlt: 'Parties reviewing and signing documents across a table',
  },
  {
    step: '04',
    title: 'Advise',
    desc: 'A definitive, confidential recommendation with the full reasoning and trade-offs attached, free from conflicting product placement.',
    image: 'process-advise',
    imageAlt: 'Confidential advisory counsel in an executive office',
  },
  {
    step: '05',
    title: 'Support',
    desc: 'Remaining actively engaged as the decision is executed, because the most consequential questions rarely arrive on the day terms are agreed.',
    image: 'tower-dusk',
    imageAlt: 'Office tower floors lit into dusk representing ongoing institutional support',
  },
];

export function ProcessNarrative() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Way of Working"
      id="process"
      className="relative bg-[var(--char)] py-16 sm:py-20 lg:py-24 border-b border-[var(--line-soft)]"
      aria-labelledby="process-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--brass)]" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                Way of Working
              </p>
            </div>
            <h2
              id="process-heading"
              className="mt-3 font-display text-[clamp(2.1rem,3.2vw,3rem)] font-light tracking-[-0.02em] text-[var(--ivory)]"
            >
              A disciplined sequence, not a methodology.
            </h2>
          </div>
          <p className="max-w-[42ch] text-sm leading-relaxed text-[var(--sage)]">
            Every corporate engagement is unique. The structured order in which we evaluate and execute on one rarely is.
          </p>
        </div>

        {/* 5-Step Horizontal Progression Selector (Desktop) */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-5 gap-3 border-b border-[var(--line)] pb-5">
          {steps.map((s, i) => {
            const isCurrent = active === i;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`text-left group p-3 rounded-[var(--r-md)] transition-all duration-300 focus:outline-none ${
                  isCurrent ? 'bg-[var(--plate)] shadow-[var(--shadow-pill)]' : 'hover:bg-[var(--plate)]/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`font-mono text-xs font-semibold transition-colors duration-300 ${
                      isCurrent ? 'text-[var(--brass)]' : 'text-[var(--stone)]'
                    }`}
                  >
                    {s.step}
                  </span>
                  <span
                    className={`h-[2px] flex-1 transition-all duration-300 ${
                      isCurrent ? 'bg-[var(--brass)]' : 'bg-[var(--line)] group-hover:bg-[var(--line-strong)]'
                    }`}
                  />
                </div>
                <p
                  className={`mt-2 font-display text-base transition-colors duration-300 ${
                    isCurrent
                      ? 'text-[var(--ivory)] font-medium'
                      : 'text-[var(--sage)] group-hover:text-[var(--ivory)]'
                  }`}
                >
                  {s.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase (Desktop) */}
        <div className="mt-8 hidden lg:grid lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)]">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--brass)]">
                  Phase {steps[active].step} of 05
                </span>
                <span className="text-xs text-[var(--stone)]">Advisory Progression</span>
              </div>
              <h3 className="mt-5 font-display text-3xl font-light text-[var(--ivory)]">
                {steps[active].title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--sage)]">
                {steps[active].desc}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--stone)]">
              <span>Executive Advisory Framework</span>
              <span className="text-[var(--brass)] font-mono">SOFISAM FZCO</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative h-full min-h-[22rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--graphite)] shadow-[var(--shadow-plate)]">
              {steps.map((s, i) => {
                const isSelected = active === i;
                return (
                  <div
                    key={s.step}
                    aria-hidden={!isSelected}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${
                      isSelected
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-[1.02] z-0 pointer-events-none'
                    }`}
                  >
                    <Picture
                      name={s.image}
                      alt={s.imageAlt}
                      sizes="55vw"
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <span className="text-xs uppercase tracking-widest text-[#e8c89b] font-medium">
                        Stage {s.step} — {s.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Vertical Progression (< lg) */}
        <div className="mt-8 space-y-5 lg:hidden">
          {steps.map((s) => (
            <div
              key={s.step}
              className="p-6 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)]"
            >
              <div className="relative aspect-[16/9] w-full mb-4 overflow-hidden rounded-[var(--r-md)]">
                <Picture
                  name={s.image}
                  alt={s.imageAlt}
                  sizes="100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-semibold text-[var(--brass)]">
                  {s.step}
                </span>
                <span className="h-px w-5 bg-[var(--brass)]" />
                <h3 className="font-display text-xl text-[var(--ivory)] font-medium">
                  {s.title}
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[var(--sage)]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
