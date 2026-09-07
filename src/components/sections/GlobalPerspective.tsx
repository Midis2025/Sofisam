'use client';

import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';

/**
 * Global perspective.
 *
 * Full-bleed architecture with a typographic overlay. The labels describe how
 * the firm works, not where it has offices — the only location asserted
 * anywhere on the site is the stated Dubai headquarters.
 */
const markers = [
  { k: 'Base', v: 'Dubai' },
  { k: 'Reach', v: 'International Markets' },
  { k: 'Method', v: 'Strategic Relationships' },
];

export function GlobalPerspective() {
  return (
    <section
      className="relative w-full overflow-hidden bg-ink text-bone"
      aria-labelledby="global-heading"
    >
      <Parallax strength={9} className="absolute inset-0">
        <div className="media veil-editorial h-full w-full">
          <Picture
            name="city-mono"
            alt=""
            decorative
            sizes="100vw"
            focal="50% 45%"
            className="h-full w-full"
          />
        </div>
      </Parallax>

      <div className="shell-wide relative z-10 flex min-h-[30rem] flex-col justify-end py-[var(--space-section-lg)] lg:min-h-[36rem]">
        <div className="grid gap-[var(--content-gap-lg)] lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 shrink-0 bg-gold sm:w-16" />
              <p className="t-label text-gold">Global Perspective</p>
            </Reveal>

            <h2 id="global-heading" className="t-h1 mt-[var(--content-gap-md)] max-w-[13ch] text-bone">
              <MaskedLines lines={['One vantage point.', 'A global field', 'of view.']} />
            </h2>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="t-lead measure-sm text-bone/70">
                From our world headquarters in the Dubai Multi Commodities
                Centre, our relationships and partnerships span the globe.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="t-body measure-sm mt-4 text-bone/70">
                Conditions that govern an outcome rarely travel between
                jurisdictions. We read each on its own terms rather than by
                regional average.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Typographic markers, in place of any map or globe */}
        <Reveal delay={0.2}>
          <dl className="mt-[var(--content-gap-lg)] grid grid-cols-1 border-t border-bone/20 sm:grid-cols-3">
            {markers.map((m) => (
              <div key={m.k} className="border-b border-bone/12 py-5 sm:border-b-0 sm:pr-8">
                <dt className="t-label text-bone/60">{m.k}</dt>
                <dd className="mt-2.5 font-display text-[clamp(1.15rem,1.9vw,1.5rem)] leading-snug tracking-tight text-bone">
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
