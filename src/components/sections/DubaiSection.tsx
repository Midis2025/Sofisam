'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal, RowReveal } from '@/components/animations/Reveal';
import { SplitText } from '@/components/animations/SplitText';

const EASE = [0.16, 1, 0.3, 1] as const;

/** The three verified facts, unchanged. Nothing here is asserted beyond them. */
const notes = [
  { k: 'Location', v: 'Jumeirah Lake Towers, Dubai' },
  { k: 'Free zone', v: 'Dubai Multi Commodities Centre' },
  { k: 'Status', v: 'World headquarters' },
];

/* --------------------------------------------------------------------------
   The entrance.

   One parent drives the whole right-hand side, so the order is exact rather
   than left to six separate observers firing in whatever order the scroll
   happens to cross them: the mount arrives, the photograph wipes in from the
   left and settles out of a 1.06 scale, the rule draws, the caption rises and
   the marker lands last. Every step is on the site's own easing, which has no
   overshoot in it.
   -------------------------------------------------------------------------- */

const mountV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, delay: 0.12, ease: EASE } },
};

/* The radius lives on the frame, which clips, so the clip-path itself stays
   square and interpolates cleanly. */
const plateV = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.05, delay: 0.2, ease: EASE },
  },
};

const imageV = {
  hidden: { scale: 1.06 },
  visible: { scale: 1, transition: { duration: 1.6, delay: 0.2, ease: EASE } },
};

const ruleV = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, delay: 0.62, ease: EASE } },
};

const captionV = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.82, ease: EASE } },
};

const markerV = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 1.02, ease: EASE } },
};

/**
 * Dubai — DMCC.
 *
 * An editorial spread, not a cinematic passage: a typographic column on the
 * left and the photograph on the right as an independent object rather than
 * as the ground of the section. A hairline runs the height of the composition
 * between them, and that is what gives the spread its structure — the picture
 * is mounted into the page, it is not the page.
 *
 * The photograph is the hard case on this site: a hazy, warm, high-key frame
 * with no region dark enough for type to sit on unaided. Lifting it off the
 * background solves that outright. Nothing is set over the picture except the
 * caption, which carries its own glass, so the crop is free to be chosen for
 * the skyline rather than for the legibility of a paragraph.
 *
 * Depth comes from three planes rather than from a border: a charcoal plate
 * offset down and right, a champagne hairline offset up and left, and the
 * frame between them under a deep shadow. It reads as a print mounted on a
 * wall, which is the opposite of a card.
 *
 * On a wide screen the frame is sized by height rather than by width, so the
 * spread lands at roughly 85vh on any display instead of growing with the
 * column. Below 1024 it stacks — copy, photograph, facts — and the offsets and
 * the vertical rule are dropped: a 10px offset on a phone is not depth, it is
 * a misalignment.
 */
export function DubaiSection() {
  const reduce = useReducedMotion();
  const frame = useRef<HTMLElement>(null);

  // The photograph travels a little slower than the page. The overhang is 5%
  // at each edge against 4% of travel, so the frame is never uncovered.
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section
      data-section="Dubai — DMCC"
      className="section ground-void grain relative overflow-hidden"
      aria-label="Dubai — DMCC"
    >
      {/* Three cells, not two. Stacked, the reading order has to be copy,
          photograph, facts — the facts are a caption to the picture and
          belong after it — while at 1024 the copy and the facts share the
          left column and the photograph spans both rows beside them. Nesting
          the facts inside the copy would fix them above the photograph on a
          phone, which is the one order that does not work. */}
      <div className="shell relative z-10">
        <div className="grid items-start gap-y-[clamp(2.5rem,5vw,3.5rem)] lg:grid-cols-[minmax(0,36fr)_minmax(0,64fr)] lg:grid-rows-[auto_auto]">
          {/* ==================== Left, upper — the statement ============ */}
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end lg:pr-[clamp(1.75rem,3vw,3.5rem)]">
            <Reveal kind="label" className="kicker">
              <p className="t-label text-gold">Dubai — DMCC</p>
            </Reveal>

            {/* Held one step down from the homepage's other headings: this
                column is 36% of the measure, and the display size would put
                'reach.' on a line of its own. */}
            <SplitText
              as="h2"
              text="A base chosen for its reach."
              className="t-h2 mt-[clamp(1rem,1.8vw,1.5rem)] max-w-[12ch] text-ivory"
              delay={0.08}
              stagger={0.05}
            />

            <Reveal delay={0.24}>
              <p className="t-lead mt-[clamp(1.25rem,2.2vw,1.85rem)] max-w-[40ch] text-ivory/85">
                From our world headquarters in the {contact.headquarters}, our
                relationships and partnerships span the globe.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="t-small mt-[clamp(0.875rem,1.4vw,1.15rem)] max-w-[44ch] text-sage">
                The city sits where the working day meets Asia in the morning and Europe
                and the Americas in the afternoon. What makes it useful is not the
                coordinates but the density of counterparties who are actually present.
              </p>
            </Reveal>

          </div>

          {/* ============== Right — the mounted photograph ============== */}
          <motion.div
            className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:border-l lg:border-[var(--line-soft)] lg:pl-[clamp(1.75rem,3vw,3.5rem)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-14% 0px -14% 0px' }}
          >
            <motion.div variants={reduce ? undefined : mountV} className="relative">
              {/* Plane 1 — the charcoal plate, offset down and right. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden translate-x-[clamp(0.5rem,0.9vw,1.05rem)] translate-y-[clamp(0.5rem,0.9vw,1.05rem)] rounded-[var(--r-lg)] border border-ivory/6 bg-char md:block"
              />
              {/* Plane 2 — the champagne hairline, offset the other way.
                  Two edges only. A full rectangle shifted up and left puts its
                  other two edges down inside the frame, where they land across
                  the photograph as a pair of stray lines rather than reading
                  as a mount behind it. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden translate-x-[calc(clamp(0.4rem,0.7vw,0.85rem)*-1)] translate-y-[calc(clamp(0.4rem,0.7vw,0.85rem)*-1)] rounded-tl-[var(--r-lg)] border-l border-t border-[var(--line-gold)] md:block"
              />

              {/* Plane 3 — the frame. Sized by height from 1024 up so the
                  spread holds ~85vh whatever the column measures.

                  The caption and the marker are siblings of the clipping
                  frame rather than children of it: the frame is the thing
                  that crops the photograph, and anything inside it would be
                  cropped with it — which is precisely what must not happen to
                  a caption hung off the corner. */}
              <figure
                ref={frame}
                className="tone-dark group/frame relative aspect-[4/3] w-full lg:aspect-auto lg:h-[clamp(26rem,62vh,44rem)]"
              >
                <div className="media media-graded absolute inset-0 shadow-[var(--depth-2)]">
                  <motion.div
                    variants={reduce ? undefined : plateV}
                    className="absolute inset-0 overflow-hidden"
                  >
                    <motion.div
                      variants={reduce ? undefined : imageV}
                      style={reduce ? undefined : { y, top: '-5%', bottom: '-5%' }}
                      className="absolute inset-x-0 transition-[filter] duration-700 ease-premium [filter:saturate(0.84)_contrast(1.05)_brightness(0.88)] group-hover/frame:[filter:saturate(0.88)_contrast(1.05)_brightness(0.97)]"
                    >
                      <Picture
                        name="dubai-haze"
                        alt=""
                        decorative
                        sizes="(min-width: 1024px) 60vw, 92vw"
                        /* Held low: the quay and the water, not the pale sky. */
                        focal="50% 62%"
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* The marker. Everything it says is already set in the caption
                    and the ledger, so it is hidden from the accessibility tree
                    — and held back below 768, where there is no hover to
                    reveal it with and it would only be a target to mis-tap. */}
                {/* Held over the mid-rise band rather than the skyline: gold
                    on a hazy pale sky is the one place on this photograph
                    where it disappears. The dark halo does the rest of the
                    work, so the point reads wherever the crop puts it. */}
                <span
                  aria-hidden
                  className="group/pin absolute left-[46%] top-[57%] z-20 hidden md:block"
                >
                  <motion.span variants={reduce ? undefined : markerV} className="relative block">
                    {!reduce && (
                      <span className="absolute -inset-[0.4rem] animate-pulse-node rounded-full border border-gold/55" />
                    )}
                    <span className="relative block h-2.5 w-2.5 rounded-full border border-ink/40 bg-gold shadow-[0_0_0_4px_rgba(6,6,8,0.45),0_0_14px_2px_rgba(201,169,124,0.5)] transition-transform duration-500 ease-premium group-hover/pin:scale-[1.55]" />
                    <span className="pointer-events-none absolute bottom-[calc(100%+0.85rem)] left-1/2 block -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[var(--r-sm)] border border-[var(--line-gold)] bg-[rgba(6,6,8,0.82)] px-2.5 py-1.5 opacity-0 backdrop-blur-md transition-all duration-500 ease-premium group-hover/pin:translate-y-0 group-hover/pin:opacity-100">
                      <span className="t-label block text-gold">SOFISAM</span>
                      <span className="t-label mt-1 block text-ivory">Headquarters</span>
                    </span>
                  </motion.span>
                </span>

                {/* The caption. Held inside the frame below 1024, where
                    overhanging would push it into the gutter; hung off the
                    lower-left corner above that. */}
                <motion.figcaption
                  variants={reduce ? undefined : captionV}
                  className="absolute bottom-[clamp(0.875rem,2vw,1.5rem)] left-[clamp(0.875rem,2vw,1.5rem)] z-20 max-w-[min(20rem,78%)] rounded-[var(--r-md)] border border-[var(--line-gold)] bg-[rgba(6,6,8,0.62)] px-[clamp(0.9rem,1.3vw,1.15rem)] py-[clamp(0.7rem,1vw,0.9rem)] shadow-[var(--shadow-caption)] backdrop-blur-[18px] backdrop-saturate-150 transition-transform duration-700 ease-premium group-hover/frame:-translate-y-1 lg:bottom-[calc(clamp(1rem,2.2vw,2.25rem)*-1)] lg:left-[calc(clamp(1rem,2.2vw,2.5rem)*-1)]"
                >
                  <span className="t-label block text-gold">World headquarters</span>
                  <span className="t-h4 mt-2 block text-ivory">Jumeirah Lake Towers, Dubai.</span>
                </motion.figcaption>
              </figure>
            </motion.div>

            {/* The rule that closes the spread, champagne segment leading. */}
            <div
              aria-hidden
              className="relative mt-[clamp(2.5rem,4vw,3.5rem)] hidden h-px md:block"
            >
              <motion.span
                variants={reduce ? undefined : ruleV}
                className="absolute inset-0 block origin-left bg-[var(--line-soft)]"
              />
              <motion.span
                variants={reduce ? undefined : ruleV}
                className="absolute inset-y-0 left-0 block w-[clamp(2.5rem,5vw,4.5rem)] origin-left bg-[var(--line-gold)]"
              />
            </div>
          </motion.div>

          {/* ==================== Left, lower — the facts ================ */}
          {/* A ledger: the hairline grows across each row and the pair lifts
              behind it. No panel and no glass — on a ground this dark the rule
              alone holds them. The pair stacks until there is a measure wide
              enough to set the name beside the value without wrapping it. */}
          <dl className="border-b border-[var(--line)] lg:col-start-1 lg:row-start-2 lg:self-start lg:pr-[clamp(1.75rem,3vw,3.5rem)]">
            {notes.map((n, i) => (
              <RowReveal
                as="div"
                key={n.k}
                delay={0.4 + i * 0.08}
                className="py-[clamp(0.7rem,1.1vw,0.95rem)]"
              >
                <div className="xl:grid xl:grid-cols-[7.5rem_minmax(0,1fr)] xl:items-baseline xl:gap-x-[clamp(1rem,1.6vw,2rem)]">
                  <dt className="t-label text-stone">{n.k}</dt>
                  <dd className="t-h4 mt-1.5 text-ivory xl:mt-0">{n.v}</dd>
                </div>
              </RowReveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
