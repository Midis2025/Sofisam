'use client';

import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal, RowReveal } from '@/components/animations/Reveal';
import { GlobalNetwork } from './GlobalNetwork';

/**
 * Global perspective.
 *
 * Two compositions of the same content. `band` (the homepage) sets it as a
 * network map from the Dubai headquarters (see GlobalNetwork), while `editorial` (the About page) opens it out into a
 * statement, three data columns and a wide lower plate, so the two pages never
 * read as the same section twice.
 *
 * The markers describe how the firm works, not where it has offices — the only
 * location asserted anywhere on the site is the stated Dubai headquarters.
 */
const markers = [
  { k: 'Base', v: 'Dubai' },
  { k: 'Reach', v: 'International Markets' },
  { k: 'Method', v: 'Strategic Relationships' },
];

const LEAD =
  'From our world headquarters in the Dubai Multi Commodities Centre, our relationships and partnerships span the globe.';
const NOTE =
  'Conditions that govern an outcome rarely travel between jurisdictions. We read each on its own terms rather than by regional average.';

export function GlobalPerspective({
  variant = 'band',
}: {
  variant?: 'band' | 'editorial';
}) {
  if (variant === 'editorial') {
    return (
      <section data-section="Global Perspective" className="section ground-char" aria-labelledby="global-heading">
        <div className="shell">
          <Reveal kind="label" className="kicker">
            <p className="t-label">Global Perspective</p>
          </Reveal>

          <h2
            id="global-heading"
            className="t-display mt-[clamp(1.5rem,2.2vw,2rem)] max-w-[68.75rem] text-ivory"
          >
            <MaskedLines lines={['One vantage point.', 'A global field of view.']} />
          </h2>

          <Reveal kind="body" delay={0.12}>
            <p className="t-lead mt-[clamp(2rem,2.6vw,2.5rem)] max-w-[56.25rem] text-sage">
              {LEAD}
            </p>
          </Reveal>

          {/* Three columns off one rule */}
          <dl className="mt-[clamp(3rem,4.5vw,4.5rem)] grid gap-x-[clamp(2.25rem,4vw,4.5rem)] gap-y-[clamp(1.5rem,2vw,2rem)] sm:grid-cols-3">
            {markers.map((m, i) => (
              <RowReveal
                as="div"
                key={m.k}
                delay={i * 0.09}
                className="pt-[clamp(1.5rem,1.9vw,1.75rem)]"
              >
                <dt className="t-label text-sage">{m.k}</dt>
                <dd className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.35rem)] leading-[1.08] tracking-tighter text-ivory">
                  {m.v}
                </dd>
              </RowReveal>
            ))}
          </dl>

          <Reveal kind="body" delay={0.1}>
            <p className="t-small mt-[clamp(2rem,2.6vw,3rem)] max-w-[62ch] text-sage">{NOTE}</p>
          </Reveal>

          <ImageReveal delay={0.08} className="mt-[var(--pad-sm)]">
            <div className="media aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[24/9]">
              <Picture
                name="city-mono"
                alt=""
                decorative
                sizes="(max-width: 767px) 190vw, 100vw"
                focal="50% 45%"
                className="h-full w-full"
              />
            </div>
          </ImageReveal>
        </div>
      </section>
    );
  }

  // The homepage sets the same content as a network map: Dubai and the reach
  // from it, rather than a photograph of a city that is not Dubai.
  return <GlobalNetwork lead={LEAD} note={NOTE} />;
}
