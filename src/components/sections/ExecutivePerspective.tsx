'use client';

import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';

/** Stat-free credibility markers, drawn only from stated facts. */
const markers = [
  {
    t: 'Decades of experience',
    d: 'International business experience is the foundation of the advice.',
  },
  {
    t: 'Executives and investors',
    d: 'Principals who have operated as both, not one or the other.',
  },
  {
    t: 'Mandates and investments',
    d: 'The same perspective is applied across every engagement.',
  },
  {
    t: 'Unconflicted by design',
    d: 'Independence is a structural condition, not a stated intention.',
  },
];

/**
 * 04 — Executive perspective. Deliberately architectural rather than
 * portrait-led: no photograph here represents an actual SOFISAM principal.
 *
 * The statement takes slightly more than half the row so the heading holds two
 * lines on a desktop, and the plate stretches to the height of the statement
 * beside it rather than running on past it. The four attributes sit beneath as
 * an open four-up ledger — dividers rather than boxes.
 */
export function ExecutivePerspective() {
  return (
    <section className="rd-section rd-paper" aria-labelledby="executive-heading">
      <div className="rd-shell">
        <div className="grid items-stretch gap-[clamp(2rem,5vw,5.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(29rem,0.95fr)]">
          {/* Statement */}
          <div className="flex flex-col">
            <Reveal kind="label" className="rd-kicker">
              <p className="rd-label">Executive Perspective</p>
            </Reveal>

            <h2
              id="executive-heading"
              className="rd-h2 mt-[clamp(1rem,2vw,1.75rem)] max-w-[15ch] text-[var(--rd-ink)] lg:max-w-[51.25rem]"
            >
              <span className="sr-only">
                Advice given by people who have held the position.
              </span>
              <span aria-hidden className="block lg:hidden">
                <MaskedLines
                  lines={['Advice given by', 'people who have', 'held the position.']}
                />
              </span>
              <span aria-hidden className="hidden lg:block">
                <MaskedLines
                  lines={['Advice given by people who', 'have held the position.']}
                />
              </span>
            </h2>

            <Reveal kind="body" delay={0.12}>
              <p className="rd-lead mt-[clamp(1.75rem,2.8vw,2.75rem)] max-w-[50ch] text-[var(--rd-ink)]">
                Our principals are highly successful business executives and
                investors that bring unique perspectives to all of our mandates
                and investments.
              </p>
            </Reveal>

            <Reveal kind="body" delay={0.18}>
              <p className="rd-body mt-[clamp(1.5rem,2vw,2rem)] max-w-[56ch] text-[var(--rd-stone)]">
                That distinction matters more than it sounds. Someone who has
                carried a decision — its financing, its timing, its consequences
                for the people involved — asks different questions of a proposal
                than someone who has only ever reviewed one.
              </p>
            </Reveal>
          </div>

          {/* Plate — matches the height of the statement on a desktop, and
              keeps its own proportion when the row stacks. */}
          <ImageReveal delay={0.08} className="lg:relative lg:h-full lg:min-h-[26rem]">
            <div className="rd-media aspect-[4/3] w-full sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
              <Picture
                name="towers-mono"
                alt="Dense cluster of corporate towers photographed from below in near-monochrome light"
                sizes="(min-width:1024px) 45vw, 100vw"
                focal="50% 40%"
                className="h-full w-full"
              />
            </div>
          </ImageReveal>
        </div>

        {/* Attributes — four-up ledger */}
        <dl className="mt-[clamp(2rem,3.4vw,3.5rem)] grid gap-x-[clamp(1.5rem,2.6vw,3rem)] sm:grid-cols-2 lg:grid-cols-4">
          {markers.map((item, i) => (
            <Reveal
              key={item.t}
              delay={i * 0.06}
              className="rd-row py-[clamp(1.25rem,2.2vw,1.85rem)]"
            >
              <dt className="rd-h4 max-w-[20ch] text-[var(--rd-ink)]">{item.t}</dt>
              <dd className="rd-small mt-3 max-w-[34ch] text-[var(--rd-stone)]">{item.d}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
