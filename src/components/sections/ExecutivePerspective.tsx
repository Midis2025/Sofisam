'use client';

import { Picture } from '@/components/ui/Picture';
import { Tilt } from '@/components/ui/Tilt';
import { Reveal } from '@/components/animations/Reveal';
import { SplitText, CurtainReveal } from '@/components/animations/SplitText';

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
 * Executive perspective.
 *
 * Deliberately architectural rather than portrait-led: no photograph on this
 * site represents an actual SOFISAM principal. The statement stands in a
 * column that holds its position while a tall plate runs past it, and the four
 * attributes close the section as an open four-up ledger — dividers rather
 * than boxes.
 */
export function ExecutivePerspective() {
  return (
    <section data-section="Executive Perspective" className="section ground-char" aria-labelledby="executive-heading">
      <div className="shell">
        <div className="grid items-start gap-[clamp(2rem,5vw,6rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(26rem,0.85fr)]">
          {/* Statement */}
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <Reveal kind="label" className="kicker">
              <p className="t-label">Executive Perspective</p>
            </Reveal>

            <h2
              id="executive-heading"
              className="t-h2 mt-[clamp(1.25rem,2.2vw,2rem)] max-w-[15ch] text-ivory lg:max-w-[18ch]"
            >
              <SplitText text="Advice given by people who have held the position." stagger={0.045} />
            </h2>

            <Reveal kind="body" delay={0.12}>
              <p className="t-lead mt-[clamp(1.75rem,2.8vw,2.75rem)] max-w-[50ch] text-ivory">
                Our principals are highly successful business executives and investors
                that bring unique perspectives to all of our mandates and investments.
              </p>
            </Reveal>

            <Reveal kind="body" delay={0.18}>
              <p className="t-body mt-[clamp(1.5rem,2vw,2rem)] max-w-[56ch] text-sage">
                That distinction matters more than it sounds. Someone who has carried a
                decision — its financing, its timing, its consequences for the people
                involved — asks different questions of a proposal than someone who has
                only ever reviewed one.
              </p>
            </Reveal>
          </div>

          {/* Plate — taller than the statement, so the column scrolls past it */}
          <CurtainReveal delay={0.08} direction="left">
            <div className="media aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[3/4.4]">
              <Picture
                name="towers-mono"
                alt="Dense cluster of corporate towers photographed from below in near-monochrome light"
                sizes="(min-width:1024px) 42vw, 100vw"
                focal="50% 40%"
                className="h-full w-full"
              />
            </div>
          </CurtainReveal>
        </div>

        {/* Attributes — four standing cards, all on the same plate. */}
        <dl className="mt-[clamp(2.5rem,4vw,4.5rem)] grid gap-[clamp(0.75rem,1.2vw,1.1rem)] sm:grid-cols-2 lg:grid-cols-4">
          {markers.map((item, i) => {
            return (
              <Reveal key={item.t} kind="card" delay={i * 0.06} className="h-full">
                <Tilt className="h-full">
                  <div
                    className="group surface surface-lift flex h-full flex-col p-[clamp(1.25rem,2vw,1.75rem)]"
                  >
                    <span aria-hidden className="t-num text-[0.78rem] text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <dt className="t-h4 mt-[clamp(1.75rem,3vw,2.75rem)] max-w-[20ch] text-ivory">
                      {item.t}
                    </dt>
                    <dd className="t-small mt-3 max-w-[34ch] text-sage">{item.d}</dd>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
