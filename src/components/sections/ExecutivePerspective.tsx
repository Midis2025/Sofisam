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
 * Two levels: a statement against a tall plate, then the four attributes as an
 * open four-up ledger — dividers rather than boxes. On a phone the order is
 * statement, attributes, image.
 */
export function ExecutivePerspective() {
  return (
    <section className="rd-section rd-paper" aria-labelledby="executive-heading">
      <div className="rd-shell">
        <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-center lg:gap-x-[clamp(2.5rem,4.5vw,5rem)]">
          {/* Statement */}
          <div className="lg:col-span-7 lg:row-start-1">
            <Reveal kind="label" className="rd-kicker">
              <p className="rd-label">Executive Perspective</p>
            </Reveal>

            <h2
              id="executive-heading"
              className="rd-h2 mt-[clamp(1.25rem,2.6vw,2rem)] max-w-[15ch] text-[var(--rd-ink)]"
            >
              <MaskedLines
                lines={['Advice given by', 'people who have', 'held the position.']}
              />
            </h2>

            <Reveal delay={0.12}>
              <p className="rd-lead mt-[clamp(1.5rem,2.6vw,2.25rem)] max-w-[50ch] text-[var(--rd-ink)]">
                Our principals are highly successful business executives and
                investors that bring unique perspectives to all of our mandates
                and investments.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="rd-body mt-5 max-w-[56ch] text-[var(--rd-stone)]">
                That distinction matters more than it sounds. Someone who has
                carried a decision — its financing, its timing, its consequences
                for the people involved — asks different questions of a proposal
                than someone who has only ever reviewed one.
              </p>
            </Reveal>
          </div>

          {/* Attributes — four-up ledger */}
          <dl className="grid gap-x-[clamp(1.5rem,2.6vw,3rem)] sm:grid-cols-2 lg:col-span-12 lg:row-start-2 lg:mt-[clamp(1rem,2.5vw,3rem)] lg:grid-cols-4">
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

          {/* Tall plate — sits beside the statement from lg, below it on phones */}
          <ImageReveal className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <div className="rd-media aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/5]">
              <Picture
                name="towers-mono"
                alt="Dense cluster of corporate towers photographed from below in near-monochrome light"
                sizes="(min-width:1024px) 40vw, 100vw"
                focal="50% 40%"
                className="h-full w-full"
              />
            </div>
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
