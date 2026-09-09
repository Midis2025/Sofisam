'use client';

import { Reveal, MaskedLines } from '@/components/animations/Reveal';

/**
 * 07 — Way of working. Wording is kept deliberately generic to the advisory
 * process itself — it does not claim any service, permission or capability
 * beyond what SOFISAM states about strategic consulting, advisory and
 * structuring.
 *
 * Five steps in sequence: a hairline rail with a mark per step on desktop,
 * two columns on tablet, a compact vertical timeline on phones. Every
 * description stays visible — nothing depends on hover or a click.
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
  return (
    <section className="rd-section rd-paper" aria-labelledby="process-heading">
      <div className="rd-shell">
        <div className="rd-head">
          <div>
            <Reveal kind="label" className="rd-kicker">
              <p className="rd-label">Way of Working</p>
            </Reveal>
            <h2
              id="process-heading"
              className="rd-h2 rd-head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-[var(--rd-ink)]"
            >
              <MaskedLines lines={['A sequence, not', 'a methodology.']} />
            </h2>
          </div>
          <div className="lg:pb-2">
            <Reveal delay={0.1}>
              <p className="rd-body rd-head-note text-[var(--rd-stone)]">
                Every engagement is different. The order in which we think about
                one rarely is.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-[var(--rd-pad-sm)] grid gap-x-[clamp(1.5rem,2.4vw,2.5rem)] gap-y-8 border-l border-[var(--rd-line)] pl-6 sm:grid-cols-2 sm:gap-y-10 sm:border-l-0 sm:pl-0 lg:grid-cols-5 lg:gap-y-0">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.k}
              delay={i * 0.06}
              className="group relative transition-colors duration-500 sm:border-t sm:border-[var(--rd-line)] sm:pt-6 sm:last:col-span-2 sm:hover:border-[var(--rd-accent)] lg:last:col-span-1"
            >
              {/* Mark on the rail */}
              <span
                aria-hidden
                className="absolute -left-[1.6rem] top-[0.4rem] block h-[0.4rem] w-[0.4rem] rounded-full bg-[var(--rd-accent)] sm:-top-[0.2rem] sm:left-0"
              />

              <div className="transition-transform duration-500 ease-premium group-hover:translate-y-[-2px]">
                <span className="rd-num block text-[0.85rem] text-[var(--rd-accent-ink)]">
                  {s.k}
                </span>
                <h3 className="rd-h4 mt-3 text-[var(--rd-ink)]">{s.title}</h3>
                <p className="rd-small mt-3 max-w-[34ch] text-[var(--rd-stone)]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
