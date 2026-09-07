'use client';

import { contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';

const notes = [
  {
    k: 'Location',
    v: 'Jumeirah Lake Towers, Dubai',
  },
  {
    k: 'Free zone',
    v: 'Dubai Multi Commodities Centre',
  },
  {
    k: 'Status',
    v: 'World headquarters',
  },
];

export function DubaiSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-ink text-bone"
      aria-labelledby="dubai-heading"
    >
      {/* Full-bleed backdrop */}
      <Parallax strength={9} className="absolute inset-0">
        <div className="media veil-soft h-full w-full">
          <Picture
            name="dubai-haze"
            alt=""
            decorative
            sizes="100vw"
            focal="50% 55%"
            className="h-full w-full"
          />
        </div>
      </Parallax>

      <div className="shell-wide relative z-10 flex min-h-[42rem] flex-col justify-end py-[clamp(5rem,12vw,10rem)] lg:min-h-[46rem]">
        <div className="grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
              <p className="t-label text-gold">Dubai — DMCC</p>
            </Reveal>

            <h2 id="dubai-heading" className="t-h1 mt-7 max-w-[13ch] text-bone">
              <MaskedLines lines={['A base chosen', 'for its reach.']} />
            </h2>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="t-lead max-w-[42ch] text-bone/75">
                From our world headquarters in the {contact.headquarters}, our
                relationships and partnerships span the globe.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="t-body mt-5 max-w-[44ch] text-bone/50">
                The city sits where the working day meets Asia in the morning and
                Europe and the Americas in the afternoon. What makes it useful is
                not the coordinates but the density of counterparties who are
                actually present.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Facts rail */}
        <Reveal delay={0.2}>
          <dl className="mt-[clamp(2.5rem,6vw,4.5rem)] grid grid-cols-1 gap-px border-t border-bone/15 sm:grid-cols-3">
            {notes.map((n) => (
              <div key={n.k} className="py-6 sm:pr-8">
                <dt className="t-label text-bone/35">{n.k}</dt>
                <dd className="mt-3 max-w-[26ch] font-display text-[1.15rem] leading-snug tracking-tight text-bone">
                  {n.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
