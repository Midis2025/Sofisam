'use client';

import { contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';

const notes = [
  {
    k: 'Location',
    v: 'Jumeirah Lake Towers, Dubai',
    wide: true,
  },
  {
    k: 'Free zone',
    v: 'Dubai Multi Commodities Centre',
    wide: false,
  },
  {
    k: 'Status',
    v: 'World headquarters',
    wide: false,
  },
];

/**
 * 06 — Dubai / DMCC.
 *
 * A location feature: one dominant image plate against an information panel,
 * with the three facts set as label-over-value blocks. Nothing is asserted
 * about the city beyond the firm's own stated position.
 */
export function DubaiSection() {
  return (
    <section className="rd-section rd-paper" aria-labelledby="dubai-heading">
      <div className="rd-shell">
        <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-stretch lg:gap-[clamp(1.5rem,2.6vw,2.5rem)]">
          {/* Image plate */}
          <ImageReveal className="lg:col-span-7">
            <div className="rd-media aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[34rem]">
              <Picture
                name="dubai-haze"
                alt="Dubai skyline seen across the water in warm morning haze"
                sizes="(min-width:1024px) 58vw, 100vw"
                focal="50% 55%"
                className="h-full w-full"
              />
            </div>
          </ImageReveal>

          {/* Information panel */}
          <div className="lg:col-span-5">
            <Reveal className="rd-kicker">
              <p className="rd-label">Dubai — DMCC</p>
            </Reveal>

            <h2
              id="dubai-heading"
              className="rd-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[13ch] text-[var(--rd-ink)]"
            >
              <MaskedLines lines={['A base chosen', 'for its reach.']} />
            </h2>

            <Reveal delay={0.1}>
              <p className="rd-lead mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[42ch] text-[var(--rd-ink)]">
                From our world headquarters in the {contact.headquarters}, our
                relationships and partnerships span the globe.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="rd-small mt-5 max-w-[44ch] text-[var(--rd-stone)]">
                The city sits where the working day meets Asia in the morning and
                Europe and the Americas in the afternoon. What makes it useful is
                not the coordinates but the density of counterparties who are
                actually present.
              </p>
            </Reveal>

            {/* Facts */}
            <Reveal delay={0.2}>
              <div className="rd-card mt-[clamp(1.75rem,3vw,2.5rem)] p-[clamp(0.75rem,1.2vw,1rem)]">
                <dl className="grid gap-[clamp(0.5rem,0.9vw,0.75rem)] sm:grid-cols-2">
                  {notes.map((n) => (
                    <div key={n.k} className={`rd-block ${n.wide ? 'sm:col-span-2' : ''}`}>
                      <dt className="rd-label text-[var(--rd-stone)]">{n.k}</dt>
                      <dd className="rd-h4 mt-2.5 max-w-[24ch] text-[var(--rd-ink)]">{n.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
