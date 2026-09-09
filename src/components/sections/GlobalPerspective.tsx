'use client';

import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal, RowReveal } from '@/components/animations/Reveal';

/**
 * Global perspective.
 *
 * Two compositions of the same content, both on the site's left edge: `panel`
 * (the homepage) sets it as a plate beside a statement inside a dark band;
 * `editorial` (the About page) opens it out into a statement, three data
 * columns and a wide lower plate, so the two pages never read as the same
 * section twice.
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
  variant = 'panel',
}: {
  variant?: 'panel' | 'editorial';
}) {
  if (variant === 'editorial') {
    return (
      <section className="rd-section rd-paper" aria-labelledby="global-heading">
        <div className="rd-shell">
          <Reveal kind="label" className="rd-kicker">
            <p className="rd-label">Global Perspective</p>
          </Reveal>

          <h2
            id="global-heading"
            className="rd-display mt-[clamp(1.5rem,2.2vw,2rem)] max-w-[68.75rem] text-[var(--rd-ink)]"
          >
            <MaskedLines lines={['One vantage point.', 'A global field of view.']} />
          </h2>

          <Reveal kind="body" delay={0.12}>
            <p className="rd-lead mt-[clamp(2rem,2.6vw,2.5rem)] max-w-[56.25rem] text-[var(--rd-stone)]">
              {LEAD}
            </p>
          </Reveal>

          {/* Three columns off one rule */}
          <dl className="mt-[clamp(3.5rem,4.5vw,4.5rem)] grid gap-x-[clamp(2.25rem,4vw,4.5rem)] gap-y-[clamp(1.5rem,2vw,2rem)] sm:grid-cols-3">
            {markers.map((m, i) => (
              <RowReveal
                as="div"
                key={m.k}
                delay={i * 0.09}
                className="pt-[clamp(1.5rem,1.9vw,1.75rem)]"
              >
                <dt className="rd-label text-[var(--rd-stone)]">{m.k}</dt>
                <dd className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.35rem)] leading-[1.08] tracking-tighter text-[var(--rd-ink)]">
                  {m.v}
                </dd>
              </RowReveal>
            ))}
          </dl>

          <Reveal kind="body" delay={0.1}>
            <p className="rd-small mt-[clamp(2rem,2.6vw,3rem)] max-w-[62ch] text-[var(--rd-stone)]">
              {NOTE}
            </p>
          </Reveal>

          {/* Wide lower plate */}
          <ImageReveal delay={0.08} className="mt-[var(--rd-pad-sm)]">
            <div className="rd-media aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[24/9]">
              <Picture
                name="city-mono"
                alt=""
                decorative
                sizes="100vw"
                focal="50% 45%"
                className="h-full w-full"
              />
            </div>
          </ImageReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="rd-section rd-dark rd-on-dark" aria-labelledby="global-heading">
      <div className="rd-shell">
        <div className="grid gap-[clamp(1.5rem,3vw,3.5rem)] lg:grid-cols-12 lg:items-stretch">
          {/* Image plate */}
          <ImageReveal className="lg:col-span-6">
            <div className="rd-media rd-media-in aspect-[4/3] h-full w-full lg:aspect-auto lg:min-h-[28rem]">
              <Picture
                name="city-mono"
                alt=""
                decorative
                sizes="(min-width:1024px) 48vw, 100vw"
                focal="50% 45%"
                className="h-full w-full"
              />
            </div>
          </ImageReveal>

          {/* Statement */}
          <div className="flex flex-col justify-between lg:col-span-6 lg:py-[clamp(0.5rem,1.5vw,1.5rem)]">
            <div>
              <Reveal kind="label" className="rd-kicker">
                <p className="rd-label">Global Perspective</p>
              </Reveal>

              <h2
                id="global-heading"
                className="rd-h2 mt-[clamp(1rem,2vw,1.5rem)] max-w-[13ch] text-bone lg:max-w-[20ch]"
              >
                <span className="sr-only">One vantage point. A global field of view.</span>
                <span aria-hidden className="block lg:hidden">
                  <MaskedLines lines={['One vantage point.', 'A global field', 'of view.']} />
                </span>
                <span aria-hidden className="hidden lg:block">
                  <MaskedLines lines={['One vantage point.', 'A global field of view.']} />
                </span>
              </h2>

              <Reveal kind="body" delay={0.1}>
                <p className="rd-body mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[46ch] text-bone/75">
                  {LEAD}
                </p>
              </Reveal>

              <Reveal kind="body" delay={0.16}>
                <p className="rd-small mt-4 max-w-[50ch] text-[var(--rd-sage)]">{NOTE}</p>
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
    </section>
  );
}
