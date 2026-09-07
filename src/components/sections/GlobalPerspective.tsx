'use client';

import dynamic from 'next/dynamic';

import { Reveal, MaskedLines, DrawRule } from '@/components/animations/Reveal';

const Globe = dynamic(() => import('@/components/ui/Globe').then((m) => m.Globe), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

const facets = [
  {
    k: '01',
    title: 'Relationships without borders',
    body: 'From our world headquarters in the Dubai Multi Commodities Centre, our relationships and partnerships span the globe.',
  },
  {
    k: '02',
    title: 'Decisions read locally',
    body: 'Conditions that govern an outcome rarely travel between jurisdictions. We read each on its own terms rather than by regional average.',
  },
  {
    k: '03',
    title: 'A single standard of judgement',
    body: 'The market changes. What we are willing to recommend, and the independence behind it, does not.',
  },
];

export function GlobalPerspective() {
  return (
    <section
      className="relative overflow-hidden bg-ink text-bone"
      aria-labelledby="global-heading"
    >
      <div
        aria-hidden
        className="precision-grid precision-grid-fade pointer-events-none absolute inset-0 opacity-50"
      />

      <div className="shell-wide relative z-10 section">
        <div className="grid gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-12 lg:items-center">
          {/* Copy */}
          <div className="lg:col-span-5">
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
              <p className="t-label text-gold">Global Perspective</p>
            </Reveal>

            <h2 id="global-heading" className="t-h2 mt-7 max-w-[15ch] text-bone">
              <MaskedLines lines={['One vantage', 'point. A global', 'field of view.']} />
            </h2>

            <Reveal delay={0.12}>
              <p className="t-body mt-7 max-w-[42ch] text-bone/60">
                Dubai anchors the practice. The perspective it produces is
                deliberately wider than the city that houses it.
              </p>
            </Reveal>

            <DrawRule tone="light" className="mt-10" />

            <ul className="mt-10 space-y-8">
              {facets.map((f, i) => (
                <Reveal as="li" key={f.k} delay={0.08 * i} className="flex gap-5">
                  <span className="t-index shrink-0 pt-1 text-[0.72rem] text-gold">
                    {f.k}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.2rem] leading-snug tracking-tight text-bone">
                      {f.title}
                    </h3>
                    <p className="mt-2 max-w-[44ch] text-[0.9rem] font-light leading-relaxed text-bone/50">
                      {f.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Globe */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative mx-auto aspect-square w-full max-w-[30rem] sm:max-w-[34rem] lg:max-w-[38rem] xl:max-w-[42rem]">
                <Globe className="absolute inset-0" />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mx-auto mt-6 flex max-w-[30rem] sm:max-w-[34rem] flex-col gap-3 sm:flex-row sm:items-start sm:justify-between lg:max-w-[42rem]">
                <p className="t-label tnum text-bone/35">
                  Dubai&nbsp;&nbsp;25.0693°&nbsp;N&nbsp;/&nbsp;55.1400°&nbsp;E
                </p>
                <p className="max-w-[46ch] text-[0.74rem] font-light leading-relaxed text-bone/35 sm:text-right">
                  Illustrative. The connecting lines represent international
                  relationships and perspective, not office locations.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
