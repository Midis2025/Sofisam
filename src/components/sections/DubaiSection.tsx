'use client';

import { contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Parallax } from '@/components/animations/Parallax';
import { Reveal } from '@/components/animations/Reveal';
import { SplitText } from '@/components/animations/SplitText';

const notes = [
  { k: 'Location', v: 'Jumeirah Lake Towers, Dubai' },
  { k: 'Free zone', v: 'Dubai Multi Commodities Centre' },
  { k: 'Status', v: 'World headquarters' },
];

/**
 * Dubai — DMCC.
 *
 * A location feature staged as a cinematic passage: the city runs the full
 * width of the page, the statement is held in a band across the foot of the
 * frame, and the three verified facts close it. Nothing is asserted about the
 * city beyond the firm's own stated position.
 *
 * The photograph is the hard case on this site — a hazy, warm, high-key frame
 * of pale sky, white hulls and a lit quay, with no region light type sits on
 * unaided. Three things carry the copy without burying the picture:
 *
 *   1. The crop. The focal point is held low so the calm water, the quietest
 *      band in the frame, lands under the type and the skyline stays above it.
 *   2. The composition. On a wide screen the statement and its two paragraphs
 *      sit side by side rather than stacked, which roughly halves the height
 *      of the copy and leaves the upper third of the frame — the skyline —
 *      with nothing set on it at all.
 *   3. The scrim, built the way the masthead's is: dense across the foot where
 *      the type is, falling away to nothing by the top of the frame.
 *
 * On a phone there is no room to clear to one side, so the copy takes the
 * lower band outright and the image is given a reserved strip above it.
 */
export function DubaiSection() {
  return (
    <section
      data-section="Dubai — DMCC"
      className="band grain relative w-full overflow-hidden bg-void"
      aria-label="Dubai — DMCC"
    >
      <Parallax className="absolute inset-0" strength={8}>
        <Picture
          name="dubai-haze"
          alt=""
          decorative
          sizes="100vw"
          /* Held low so the water, not the hulls, sits under the statement. */
          focal="50% 62%"
          className="h-full w-full object-cover"
        />
      </Parallax>

      {/* The carrying gradient: dense across the foot, clear by the top. The
          phone value stays dense further up the frame because the copy runs
          the full width there. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgba(5,5,5,0.95)_0%,rgba(5,5,5,0.93)_50%,rgba(5,5,5,0.88)_66%,rgba(5,5,5,0.72)_78%,rgba(5,5,5,0.34)_88%,rgba(5,5,5,0.1)_96%,transparent_100%)] lg:bg-[linear-gradient(to_top,rgba(5,5,5,0.95)_0%,rgba(5,5,5,0.92)_32%,rgba(5,5,5,0.85)_50%,rgba(5,5,5,0.55)_64%,rgba(5,5,5,0.22)_78%,rgba(5,5,5,0.05)_90%,transparent_100%)]"
      />

      {/* The pool the copy actually sits in — anchored to the foot of the
          frame so it reads as light falling off rather than as a panel laid
          over the picture. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(125%_88%_at_50%_100%,rgba(5,5,5,0.5)_0%,rgba(5,5,5,0.24)_42%,transparent_74%)]"
      />

      <div className="shell relative z-10 flex min-h-[clamp(32rem,82vh,50rem)] flex-col justify-end pb-[clamp(2.5rem,5vw,4.5rem)] pt-[clamp(12rem,30vh,17rem)] md:pt-[clamp(5rem,14vh,9rem)]">
        <div className="grid gap-x-[clamp(2rem,4vw,5rem)] gap-y-[clamp(1.25rem,2.2vw,1.75rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <Reveal kind="label" className="kicker">
              <p className="t-label text-gold">Dubai — DMCC</p>
            </Reveal>

            <SplitText
              as="h2"
              text="A base chosen for its reach."
              className="t-display mt-[clamp(1rem,2vw,1.6rem)] max-w-[13ch] text-ivory"
              stagger={0.05}
            />
          </div>

          <div className="lg:pb-1">
            <Reveal delay={0.1}>
              <p className="t-lead max-w-[46ch] text-ivory/90">
                From our world headquarters in the {contact.headquarters}, our
                relationships and partnerships span the globe.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="t-small mt-[clamp(0.875rem,1.4vw,1.15rem)] max-w-[52ch] text-ivory/80">
                The city sits where the working day meets Asia in the morning and Europe
                and the Americas in the afternoon. What makes it useful is not the
                coordinates but the density of counterparties who are actually present.
              </p>
            </Reveal>
          </div>
        </div>

        {/* The verified facts, carried on glass over the photograph. The pane
            is built here rather than taken from `.surface-glass`: over a frame
            this bright it has to be considerably more opaque than the same
            pane sitting on a dark ground elsewhere on the site. */}
        <dl className="mt-[clamp(1.75rem,3vw,2.5rem)] grid gap-[clamp(0.625rem,1vw,0.875rem)] sm:grid-cols-3">
          {notes.map((n, i) => (
            <Reveal
              key={n.k}
              kind="card"
              delay={i * 0.08}
              className="rounded-[var(--r-lg)] border border-ivory/12 bg-[rgba(6,6,8,0.76)] p-[clamp(0.9rem,1.4vw,1.2rem)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_6px_rgba(0,0,0,0.45),0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-[22px] backdrop-saturate-150"
            >
              <dt className="t-label text-gold">{n.k}</dt>
              <dd className="t-h4 mt-2.5 max-w-[24ch] text-ivory">{n.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
