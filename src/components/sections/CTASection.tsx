'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { contact } from '@/data/site';
import { MaskedLines } from '@/components/animations/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared entry viewport — the whole band reveals as one. */
const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const;

interface CTASectionProps {
  eyebrow?: string;
  /**
   * The name this band takes in the page index. It defaults to the eyebrow,
   * which is usually the same thing; the service pages set their eyebrow to
   * the service they close, and give the index the band's own name instead.
   */
  sectionLabel?: string;
  lines?: string[];
  body?: string;
}

/* --------------------------------------------------------------------------
   The contour

   A skyline reduced to the two things a drawing of one actually needs: the
   line where the buildings meet the sky, and the verticals that hold it up.
   It is a section drawing, not a picture — no perspective, no mass, no
   shading — which is what keeps it from reading as a model of a city.

   The numbers are a profile across a 1200-unit frame: x, then the height of
   the block that starts there. The path is built from them so the contour and
   its verticals can never disagree about where a building is.
   -------------------------------------------------------------------------- */

const PROFILE: [number, number][] = [
  [0, 42], [96, 86], [168, 58], [240, 150], [318, 104], [390, 210],
  [472, 128], [548, 268], [640, 176], [726, 330], [812, 214], [892, 126],
  [968, 188], [1048, 96], [1122, 146], [1200, 70],
];

const BASE = 360;

/** The contour itself: along the top of each block, down to the next. */
const contourPath = PROFILE.reduce((d, [x, h], i) => {
  const y = BASE - h;
  if (i === 0) return `M ${x} ${y}`;
  const [, prevH] = PROFILE[i - 1];
  return `${d} L ${x} ${BASE - prevH} L ${x} ${y}`;
}, '');

function Contour({ reduce }: { reduce: boolean | null }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 1200 ${BASE}`}
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      className="h-full w-full"
    >
      <motion.g
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        /* A drift of twelve units over forty seconds. At this scale that is
           roughly one pixel every three seconds: present, never noticed. */
        animate={reduce ? undefined : { x: [0, -12, 0] }}
        transition={
          reduce ? undefined : { duration: 40, repeat: Infinity, ease: 'linear' }
        }
      >
        {/* The verticals, behind the contour and fainter than it. */}
        <g opacity={0.5}>
          {PROFILE.map(([x, h], i) => (
            <motion.line
              key={`v-${x}`}
              x1={x}
              y1={BASE - h}
              x2={x}
              y2={BASE}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.1, ease: EASE, delay: 0.9 + i * 0.045 }}
            />
          ))}
        </g>

        {/* Two datum lines, the way a section drawing carries its levels. */}
        {[0.42, 0.72].map((t, i) => (
          <motion.line
            key={`d-${t}`}
            x1={0}
            y1={BASE * t}
            x2={1200}
            y2={BASE * t}
            opacity={0.35}
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1.6, ease: EASE, delay: 0.7 + i * 0.12 }}
          />
        ))}

        <motion.path
          d={contourPath}
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 2.2, ease: EASE, delay: 0.75 }}
        />
      </motion.g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Enquiries — the closing band on every page that carries this section.
 *
 * It sits directly above a footer that is one large photograph, so it carries
 * none of its own: two photographic bands back to back read as one long band
 * with a seam in it, and the footer stops being a new chapter. This one is
 * drawn instead — a thin architectural contour, at an opacity where it is
 * texture rather than subject — and the band closes on a rule and a fade into
 * the footer's ground, so the photograph below begins cleanly.
 *
 * The statement holds the left of the measure; the two ways of reaching the
 * firm are a single pane on the right, one above the other, each its own row
 * of the same object rather than two buttons floating side by side.
 */
export function CTASection({
  eyebrow = 'Enquiries',
  sectionLabel,
  lines = ['Start a', 'conversation.'],
  body = 'Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence.',
}: CTASectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      data-section={sectionLabel ?? eyebrow}
      className="ground-char grain relative w-full overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Ground: one low champagne wash off the right shoulder, where the
          pane sits, and a vignette closing the rest. No photograph. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_78%_38%,rgba(201,169,124,0.08)_0%,rgba(201,169,124,0.025)_42%,transparent_74%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_45%,transparent_46%,rgba(5,5,5,0.5)_100%)]"
      />

      {/* The drawing, held to the lower right and faded out before it reaches
          the copy. Hidden below 768, where it would only sit under the type. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 hidden h-[62%] w-[72%] text-gold/[0.16] md:block"
        style={{
          maskImage:
            'linear-gradient(to left, #000 0%, #000 44%, transparent 92%), linear-gradient(to top, #000 0%, #000 56%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to left, #000 0%, #000 44%, transparent 92%), linear-gradient(to top, #000 0%, #000 56%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <Contour reduce={reduce} />
      </div>

      <div className="shell relative z-10 flex min-h-[clamp(24rem,46vh,32rem)] items-center py-[clamp(3rem,5.5vw,5rem)]">
        {/* The pane closes on the same baseline as the copy. Centred against
            a taller column it floats above the paragraph instead, and the two
            halves of the band stop reading as one composition. */}
        <div className="grid w-full items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-end">
          {/* ---------------- The statement ---------------- */}
          <div className="max-w-[34rem]">
            {/* The rule draws itself, then the word arrives. */}
            <div className="flex items-center gap-[0.875rem]">
              <motion.span
                aria-hidden
                className="block h-px w-[clamp(1.75rem,3.2vw,2.75rem)] shrink-0 origin-left bg-gold"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              />
              <motion.p
                className="t-label text-gold"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
              >
                {eyebrow}
              </motion.p>
            </div>

            <h2
              id="cta-heading"
              className="t-display mt-[clamp(1.25rem,1.9vw,1.75rem)] max-w-[9ch] text-ivory"
            >
              <MaskedLines lines={lines} delay={0.46} stagger={0.08} />
            </h2>

            <motion.p
              className="t-body mt-[clamp(1.5rem,2.2vw,2rem)] max-w-[34rem] text-sage"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.65, ease: EASE, delay: 0.8 }}
            >
              {body}
            </motion.p>
          </div>

          {/* ---------------- The pane ----------------
              Two rows of one object, divided by a hairline, rather than two
              buttons stacked. Each row lights its own ground on hover; the
              pane's border lifts with whichever row is under the pointer. */}
          <motion.div
            className="group/pane w-full sm:max-w-[30rem] lg:max-w-[32rem] lg:justify-self-end"
            initial={reduce ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          >
            <div className="overflow-hidden rounded-[var(--r-lg)] border border-ivory/[0.14] bg-white/[0.04] shadow-[var(--depth-1)] backdrop-blur-[12px] transition-colors duration-700 ease-premium group-hover/pane:border-ivory/25">
              <Link
                href="/contact"
                className="group/r flex items-center justify-between gap-6 px-[clamp(1.25rem,2vw,1.85rem)] py-[clamp(1.35rem,2.1vw,1.85rem)] transition-colors duration-500 ease-premium hover:bg-white/[0.055] focus-visible:bg-white/[0.055]"
              >
                <span className="t-h4 text-ivory transition-colors duration-500 ease-premium group-hover/r:text-gold-hi">
                  Get in Touch
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line-gold)] transition-[border-color,background-color] duration-500 ease-premium group-hover/r:border-gold group-hover/r:bg-gold/[0.09]">
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.5}
                    className="h-[1rem] w-[1rem] text-gold transition-transform duration-500 ease-premium group-hover/r:translate-x-1"
                  />
                </span>
              </Link>

              <span aria-hidden className="block h-px bg-ivory/[0.12]" />

              <a
                href={`mailto:${contact.email}`}
                className="group/r flex items-center justify-between gap-6 px-[clamp(1.25rem,2vw,1.85rem)] py-[clamp(1.35rem,2.1vw,1.85rem)] transition-colors duration-500 ease-premium hover:bg-white/[0.055] focus-visible:bg-white/[0.055]"
              >
                <span className="t-label break-all text-ivory/80 transition-colors duration-500 ease-premium group-hover/r:text-gold-hi">
                  {contact.email}
                </span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="h-[1.05rem] w-[1.05rem] shrink-0 text-sage transition-[transform,color] duration-500 ease-premium group-hover/r:-translate-y-0.5 group-hover/r:translate-x-0.5 group-hover/r:text-gold"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------------- The hand-over ----------------
          A rule, then the ground darkening into the footer's own, so the
          photograph below starts on a clean edge rather than against this
          band's charcoal. */}
      <div className="shell relative z-10">
        <motion.span
          aria-hidden
          className="block h-px origin-left bg-[var(--line)]"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1, ease: EASE, delay: 1.05 }}
        />
      </div>
      <div
        aria-hidden
        className="h-[clamp(2.5rem,5vw,4.5rem)] w-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(5,5,5,0.55)_58%,var(--void)_100%)]"
      />
    </section>
  );
}
