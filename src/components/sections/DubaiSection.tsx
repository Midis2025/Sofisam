'use client';

import { contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Parallax } from '@/components/animations/Parallax';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';

const notes = [
  { k: 'Location', v: 'Jumeirah Lake Towers, Dubai' },
  { k: 'Free zone', v: 'Dubai Multi Commodities Centre' },
  { k: 'Status', v: 'World headquarters' },
];

/**
 * Dubai — DMCC.
 *
 * A location feature staged as a cinematic passage: the city runs the full
 * width of the page under a scrim, the statement sits in the lower half of the
 * frame, and the three verified facts close it as a hairline row. Nothing is
 * asserted about the city beyond the firm's own stated position.
 */
export function DubaiSection() {
  return (
    <section
      className="band veil-bottom relative w-full overflow-hidden bg-ink"
      aria-labelledby="dubai-heading"
    >
      <Parallax className="absolute inset-0" strength={8}>
        <Picture
          name="dubai-haze"
          alt=""
          decorative
          sizes="100vw"
          focal="50% 52%"
          className="h-full w-full object-cover"
        />
      </Parallax>

      <div className="shell relative z-10 flex min-h-[clamp(34rem,84vh,50rem)] flex-col justify-end py-[clamp(3.5rem,7vw,6rem)]">
        <div className="max-w-[46rem]">
          <Reveal kind="label" className="kicker">
            <p className="t-label text-gold">Dubai — DMCC</p>
          </Reveal>

          <h2
            id="dubai-heading"
            className="t-display mt-[clamp(1.25rem,2.4vw,2rem)] max-w-[13ch] text-ivory"
          >
            <MaskedLines lines={['A base chosen', 'for its reach.']} />
          </h2>

          <Reveal delay={0.1}>
            <p className="t-lead mt-[clamp(1.25rem,2.2vw,2rem)] max-w-[48ch] text-ivory/80">
              From our world headquarters in the {contact.headquarters}, our
              relationships and partnerships span the globe.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="t-small mt-5 max-w-[56ch] text-ivory/65">
              The city sits where the working day meets Asia in the morning and Europe
              and the Americas in the afternoon. What makes it useful is not the
              coordinates but the density of counterparties who are actually present.
            </p>
          </Reveal>
        </div>

        {/* The verified facts, carried on glass over the photograph */}
        <dl className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[clamp(0.75rem,1.2vw,1.1rem)] sm:grid-cols-3">
          {notes.map((n, i) => (
            <Reveal
              key={n.k}
              delay={i * 0.08}
              className="surface-inv border-ivory/15 bg-ink/40 backdrop-blur-xl"
            >
              <dt className="t-label text-gold">{n.k}</dt>
              <dd className="t-h4 mt-3.5 max-w-[24ch] text-ivory">{n.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
