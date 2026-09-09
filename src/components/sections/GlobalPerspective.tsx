'use client';

import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';

/**
 * 03 — Global perspective.
 *
 * One dark editorial panel: a large image plate against a statement column,
 * with the markers set as data rows. They describe how the firm works, not
 * where it has offices — the only location asserted anywhere on the site is
 * the stated Dubai headquarters.
 */
const markers = [
  { k: 'Base', v: 'Dubai' },
  { k: 'Reach', v: 'International Markets' },
  { k: 'Method', v: 'Strategic Relationships' },
];

export function GlobalPerspective() {
  return (
    <section className="rd-section-sm rd-paper" aria-labelledby="global-heading">
      <div className="rd-shell">
        <div className="rd-tile-dark rd-on-dark p-[clamp(1rem,1.8vw,1.5rem)]">
          <div className="grid gap-[clamp(1.25rem,2.4vw,2.5rem)] lg:grid-cols-12 lg:items-stretch">
            {/* Image plate — the dominant element */}
            <ImageReveal className="lg:col-span-7">
              <div className="rd-media rd-media-in aspect-[4/3] h-full w-full lg:aspect-auto lg:min-h-[30rem]">
                <Picture
                  name="city-mono"
                  alt=""
                  decorative
                  sizes="(min-width:1024px) 56vw, 100vw"
                  focal="50% 45%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>

            {/* Statement */}
            <div className="flex flex-col justify-between p-[clamp(0.5rem,1.4vw,1.5rem)] lg:col-span-5">
              <div>
                <Reveal className="rd-kicker">
                  <p className="rd-label">Global Perspective</p>
                </Reveal>

                <h2
                  id="global-heading"
                  className="rd-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[13ch] text-bone"
                >
                  <MaskedLines lines={['One vantage point.', 'A global field', 'of view.']} />
                </h2>

                <Reveal delay={0.1}>
                  <p className="rd-body mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[40ch] text-bone/75">
                    From our world headquarters in the Dubai Multi Commodities
                    Centre, our relationships and partnerships span the globe.
                  </p>
                </Reveal>

                <Reveal delay={0.16}>
                  <p className="rd-small mt-4 max-w-[42ch] text-[var(--rd-sage)]">
                    Conditions that govern an outcome rarely travel between
                    jurisdictions. We read each on its own terms rather than by
                    regional average.
                  </p>
                </Reveal>
              </div>

              {/* Markers, in place of any map or globe */}
              <Reveal delay={0.2}>
                <dl className="mt-[clamp(2rem,3.4vw,3rem)]">
                  {markers.map((m) => (
                    <div
                      key={m.k}
                      className="rd-row-inv flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-[clamp(0.875rem,1.5vw,1.15rem)] last:border-b last:border-[var(--rd-line-inv)]"
                    >
                      <dt className="rd-label text-[var(--rd-sage)]">{m.k}</dt>
                      <dd className="rd-h4 text-bone">{m.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
