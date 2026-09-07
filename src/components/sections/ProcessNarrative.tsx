'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { Reveal, MaskedLines } from '@/components/animations/Reveal';

/**
 * How we work. Wording is kept deliberately generic to the advisory process
 * itself — it does not claim any service, permission or capability beyond what
 * SOFISAM states about strategic consulting, advisory and structuring.
 */
const steps = [
  {
    k: '01',
    title: 'Understand',
    body: 'What is actually being decided, who carries it, and what the constraints really are — as opposed to how they were described.',
  },
  {
    k: '02',
    title: 'Evaluate',
    body: 'The position tested from the outside. What has to be true, what it costs if it is not, and which parts become difficult to reverse.',
  },
  {
    k: '03',
    title: 'Structure',
    body: 'Intent expressed in a form that behaves predictably: authority, accountability and terms that remain legible at the edges.',
  },
  {
    k: '04',
    title: 'Advise',
    body: 'A clear recommendation with the reasoning attached, given confidentially and without a competing interest behind it.',
  },
  {
    k: '05',
    title: 'Support',
    body: 'Remaining available while the decision is carried out, because the difficult questions rarely arrive on the day it is made.',
  },
];

export function ProcessNarrative() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 55%'],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section bg-bone" aria-labelledby="process-heading">
      <div className="shell-wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
              <p className="t-label text-gold">Way of Working</p>
            </Reveal>
            <h2 id="process-heading" className="t-h2 mt-7 max-w-[15ch] text-ink">
              <MaskedLines lines={['A sequence, not', 'a methodology.']} />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <Reveal delay={0.1}>
              <p className="t-body max-w-[40ch] text-ink/55">
                Every engagement is different. The order in which we think about
                one rarely is.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Steps */}
        <div ref={ref} className="relative mt-[var(--space-section-md)]">
          {/* Progress rail — vertical on mobile, horizontal on desktop */}
          <div
            aria-hidden
            className="absolute left-[0.68rem] top-2 h-[calc(100%-1rem)] w-px bg-ink/10 lg:left-0 lg:top-0 lg:h-px lg:w-full"
          >
            <motion.div
              className="h-full w-full origin-top bg-gold lg:origin-left"
              style={
                reduce
                  ? { transform: 'scale(1)' }
                  : { scaleY: railScale, scaleX: railScale }
              }
            />
          </div>

          <ol className="grid gap-y-9 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0 lg:pt-10">
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.k}
                delay={i * 0.07}
                className="relative pl-10 lg:pl-0 lg:pr-5"
              >
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.35rem] block h-[1.35rem] w-[1.35rem] rounded-full border border-gold bg-bone lg:-top-[3.2rem] lg:left-0"
                >
                  <span className="absolute inset-[0.36rem] rounded-full bg-gold" />
                </span>

                <span className="t-index block text-[0.72rem] text-gold">{s.k}</span>
                <h3 className="mt-3 font-display text-[clamp(1.45rem,2.2vw,1.85rem)] leading-tight tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[0.88rem] font-light leading-relaxed text-ink/55">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
