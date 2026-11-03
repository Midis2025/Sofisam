'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

import { Picture } from '@/components/ui/Picture';
import { SectionHeader } from '@/components/ui/SectionHeader';

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    step: '01',
    title: 'Understand',
    tagline: 'Objective Problem Framing',
    desc: 'What is actually being decided, who carries the accountability, and what the real commercial and structural constraints are — as opposed to how they were initially presented.',
    image: 'council-session',
    imageAlt: 'Senior executives working through strategic papers together at a conference table',
  },
  {
    step: '02',
    title: 'Evaluate',
    tagline: 'Rigorous Stress-Testing',
    desc: 'The position tested objectively from the outside: what has to be true for success, what the downside costs in capital and time, and which commitments become irreversible.',
    image: 'process-evaluate',
    imageAlt: 'A market chart and structural analysis being evaluated by partners',
  },
  {
    step: '03',
    title: 'Structure',
    tagline: 'Resilient Framework Design',
    desc: 'Intent expressed in a resilient form that behaves predictably: authority, governance, oversight, and terms that remain legible and enforceable under stress.',
    image: 'process-understand',
    imageAlt: 'Parties reviewing and signing documents across an advisory table',
  },
  {
    step: '04',
    title: 'Advise',
    tagline: 'Definitive Independent Recommendation',
    desc: 'A definitive, confidential recommendation with the complete reasoning, trade-offs, and risk mitigations attached, completely free from product placement or underwriting conflicts.',
    image: 'process-advise',
    imageAlt: 'Confidential advisory counsel in an executive office',
  },
  {
    step: '05',
    title: 'Support',
    tagline: 'Execution & Ongoing Counsel',
    desc: 'Remaining actively engaged as the decision is executed across counterparties and jurisdictions, because the most consequential questions rarely arrive on the day terms are agreed.',
    image: 'tower-dusk',
    imageAlt: 'Office tower floors lit into dusk representing ongoing institutional support',
  },
];

/**
 * SOFISAM Advisory Process
 *
 * Visually connected five-stage advisory sequence:
 * - 01 Understand -> 02 Evaluate -> 03 Structure -> 04 Advise -> 05 Support
 * - Connected linear track with active stage indicators
 * - Split showcase connecting stage rationale with contextual photographic media
 * - Intuitive responsive layout for mobile and tablet
 */
export function ProcessNarrative() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Way of Working"
      id="process"
      className="relative bg-[var(--char)] py-20 sm:py-24 lg:py-28 border-b border-[var(--line-soft)]"
      aria-labelledby="process-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <SectionHeader
          ruled
          label="Way of Working"
          heading="A disciplined sequence, not a methodology."
          headingId="process-heading"
          copy="Every corporate engagement is unique. The structured order in which we evaluate, structure, and execute on one rarely is."
        />

        {/* 5-Step Horizontal Progression Track (Desktop lg+) */}
        <div className="mt-12 hidden lg:block">
          <div className="grid grid-cols-5 gap-4">
            {steps.map((s, i) => {
              const isCurrent = active === i;

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`text-left group relative z-10 p-5 rounded-[var(--r-md)] transition-all duration-300 focus:outline-none ${
                    isCurrent
                      ? 'bg-[var(--plate)] shadow-[var(--shadow-plate)] border border-[var(--line-strong)]'
                      : 'hover:bg-[var(--plate)]/50 border border-[var(--line-soft)] bg-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-[var(--line-soft)] pb-2.5">
                    <span
                      className={`t-label transition-colors ${
                        isCurrent ? 'text-[var(--gold)]' : 'text-[var(--stone)]'
                      }`}
                    >
                      Stage
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        isCurrent ? 'bg-[var(--brass)] scale-125' : 'bg-[var(--line-strong)]'
                      }`}
                    />
                  </div>

                  <p
                    className={`mt-3 font-display text-lg transition-colors duration-300 ${
                      isCurrent
                        ? 'text-[var(--ivory)] font-medium'
                        : 'text-[var(--sage)] group-hover:text-[var(--ivory)]'
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="mt-1 text-xs text-[var(--stone)]">
                    {s.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Showcase (Desktop lg+) */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between p-10 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)]">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[var(--line)] pb-4">
                <span className="t-label text-[var(--brass)]">
                  Advisory Framework Stage
                </span>
                <span className="text-xs text-[var(--stone)]">Progressive Sequence</span>
              </div>

              <h3 className="mt-6 font-display text-3xl text-[var(--ivory)] font-light">
                {steps[active].title}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-widest text-[var(--gold)] font-medium">
                {steps[active].tagline}
              </p>

              <p className="mt-5 t-body text-[var(--sage)] leading-relaxed">
                {steps[active].desc}
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--stone)]">
              <span>Executive Advisory Framework</span>
              <span className="text-[var(--brass)] font-mono font-semibold">SOFISAM FZCO</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative h-full min-h-[26rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--graphite)] shadow-[var(--shadow-plate)]">
              {steps.map((s, i) => {
                const isSelected = active === i;
                return (
                  <div
                    key={s.step}
                    aria-hidden={!isSelected}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isSelected
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-105 z-0 pointer-events-none'
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
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white z-10 flex items-end justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-[#e8c89b] font-mono">
                          {s.tagline}
                        </span>
                        <h4 className="mt-1 font-display text-2xl text-white font-light">
                          {s.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Vertical Stepper (< lg) */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:hidden">
          {steps.map((s) => (
            <div
              key={s.step}
              className="group p-6 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] sm:last:odd:col-span-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="t-label text-[var(--gold)]">
                    Advisory Stage
                  </span>
                  <span className="text-[0.6875rem] uppercase tracking-wider text-[var(--stone)]">Sequence</span>
                </div>
                <h3 className="t-card text-[var(--ivory)] font-medium">
                  {s.title}
                </h3>
                <p className="mt-1 text-xs text-[var(--gold)] font-medium">
                  {s.tagline}
                </p>
                <p className="mt-2.5 t-small text-[var(--sage)] leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Image below text */}
              <div className="relative aspect-[16/9] w-full mt-5 overflow-hidden rounded-[var(--r-md)]">
                <Picture
                  name={s.image}
                  alt={s.imageAlt}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
