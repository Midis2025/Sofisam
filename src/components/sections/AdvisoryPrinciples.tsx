'use client';

import { Reveal, MaskedLines } from '@/components/animations/Reveal';

/**
 * 05 — Advisory principles.
 *
 * The five principles are drawn directly from SOFISAM's own description of its
 * advice: "confidential, unconflicted and strategic advice, built over decades
 * of international business experience".
 *
 * Set as a manifesto ledger: a standing title column beside five divided rows.
 * Every description stays visible at every breakpoint — nothing is hidden
 * behind a hover or a toggle; the hover only shifts the row a few pixels.
 */
const principles = [
  {
    word: 'Confidential',
    note: 'Sensitive positions are handled in a closed circle, by the principals who took them on.',
  },
  {
    word: 'Unconflicted',
    note: 'No product to place and no side to favour. The recommendation reflects the situation, not the adviser.',
  },
  {
    word: 'Strategic',
    note: 'Advice framed around what a decision commits you to, not only what it promises.',
  },
  {
    word: 'International',
    note: 'Relationships and partnerships that span the globe, read jurisdiction by jurisdiction.',
  },
  {
    word: 'Experienced',
    note: 'Built over decades of international business experience, and the judgement that comes with it.',
  },
] as const;

export function AdvisoryPrinciples() {
  return (
    <section className="rd-section rd-paper-2" aria-labelledby="principles-heading">
      <div className="rd-shell">
        <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
          {/* Standing title */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[8rem]">
              <Reveal className="rd-kicker">
                <p className="rd-label">Advisory Principles</p>
              </Reveal>

              <h2
                id="principles-heading"
                className="rd-h3 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[18ch] text-[var(--rd-ink)]"
              >
                <MaskedLines
                  lines={['Five words that decide', 'what we will and', 'will not say.']}
                />
              </h2>

              <Reveal delay={0.1}>
                <p className="rd-small mt-6 max-w-[38ch] text-[var(--rd-stone)]">
                  The advice SOFISAM provides is described in its own terms:
                  confidential, unconflicted and strategic, built over decades of
                  international business experience.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Principles */}
          <ol className="lg:col-span-7 lg:col-start-6">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.word}
                delay={i * 0.05}
                className="group rd-row last:border-b last:border-[var(--rd-line)]"
              >
                <div className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-[clamp(1.5rem,2.6vw,2.25rem)] transition-transform duration-500 ease-premium group-hover:translate-x-1.5 md:grid-cols-[3.25rem_minmax(0,1fr)_minmax(0,1.15fr)] md:items-baseline md:gap-x-6">
                  <span className="rd-num pt-[0.3rem] text-[0.9rem] text-[var(--rd-accent-ink)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <h3 className="font-display text-[clamp(1.65rem,3.4vw,2.75rem)] leading-[1.02] tracking-tighter text-[var(--rd-ink)]">
                    {p.word}
                  </h3>

                  <p className="rd-small col-start-2 mt-3 max-w-[42ch] text-[var(--rd-stone)] md:col-start-3 md:mt-0">
                    {p.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
