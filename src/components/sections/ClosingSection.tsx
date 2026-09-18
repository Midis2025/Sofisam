'use client';

import Link from 'next/link';
import { useId } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Loader2 } from 'lucide-react';

import { contact, newsletterCopy } from '@/data/site';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';
import { useNewsletter } from './Newsletter';

const EASE = [0.22, 1, 0.36, 1] as const;

/** One observer margin for the whole plate, so it arrives as one object. */
const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const;

/** The enquiries half follows the newsletter half by this much. */
const LAG = 0.3;

interface ClosingSectionProps {
  /** The enquiries statement. Pages that close on a different line pass it. */
  lines?: string[];
  body?: string;
}

/** The four corners of the plate, and which two edges each mark draws. */
const CORNERS = [
  { pos: 'left-0 top-0', edges: 'border-l border-t', origin: 'origin-top-left' },
  { pos: 'right-0 top-0', edges: 'border-r border-t', origin: 'origin-top-right' },
  { pos: 'left-0 bottom-0', edges: 'border-l border-b', origin: 'origin-bottom-left' },
  { pos: 'right-0 bottom-0', edges: 'border-r border-b', origin: 'origin-bottom-right' },
] as const;

/**
 * The closing band — the newsletter and the enquiry on one plate.
 *
 * A single pane of the site's glass holds both actions, the way a drawing
 * sheet holds two views of one building: a faint blueprint grid runs under the
 * whole plate, champagne crop marks sit just off its four corners, and one
 * hairline divides the sheet with a small node at its middle where the two
 * halves meet. The enquiry half carries a low champagne wash, so the sheet
 * reads as one object with a warmer side rather than as two cards.
 *
 * From 1024 the halves share their rows (a subgrid): eyebrows, headings,
 * standfirsts, the two actions and the two footnotes each sit on one line
 * whatever either heading does. Below that the sheet stacks — the newsletter,
 * the divider turned horizontal, the enquiry.
 *
 * Every string is unchanged; the subscription is the same hook the standalone
 * newsletter uses, so validation and submission are identical.
 */
export function ClosingSection({
  lines = ['Start a', 'conversation.'],
  body = 'Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence.',
}: ClosingSectionProps) {
  const reduce = useReducedMotion();
  const uid = useId();
  const nl = useNewsletter();
  const loading = nl.state === 'loading';

  return (
    <section
      data-rail-end
      className="section ground-char grain relative w-full overflow-hidden !pb-0"
      aria-label="Newsletter and enquiries"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_45%,transparent_46%,var(--vignette-edge)_100%)]"
      />

      <div className="shell relative z-10">
        {/* ==================== The plate ==================== */}
        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 1, ease: EASE }}
        >
          {/* Crop marks, just off the corners. */}
          {CORNERS.map((c, i) => (
            <motion.span
              key={c.pos}
              aria-hidden
              className={`pointer-events-none absolute z-10 hidden h-5 w-5 border-[var(--line-gold)] sm:block ${c.pos} ${c.edges} ${c.origin} ${
                c.pos.includes('left') ? '-ml-[0.9rem]' : '-mr-[0.9rem]'
              } ${c.pos.includes('top') ? '-mt-[0.9rem]' : '-mb-[0.9rem]'}`}
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 + i * 0.08 }}
            />
          ))}

          <div className="relative isolate overflow-hidden rounded-[var(--r-lg)] border border-[var(--g-line)] bg-[var(--g-bg)] shadow-[var(--depth-1),var(--g-rim)] backdrop-blur-[12px]">
            {/* The blueprint grid, strongest at the centre of the sheet and
                gone before the edges. */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--line-soft)_1px,transparent_1px),linear-gradient(to_bottom,var(--line-soft)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(70%_80%_at_50%_50%,#000_0%,transparent_100%)]"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
            />
            {/* The warmer side of the sheet: a wash centred on the enquiry
                half, with no edge of its own. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 hidden bg-[radial-gradient(60%_85%_at_78%_40%,rgb(var(--gold-rgb)/0.08)_0%,rgb(var(--gold-rgb)/0.025)_50%,transparent_80%)] lg:block"
            />

            <div className="grid lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:grid-rows-[repeat(5,auto)]">
              {/* ==================== Newsletter ==================== */}
              <div className="flex flex-col p-[clamp(1.5rem,4vw,4rem)] lg:col-start-1 lg:row-span-5 lg:row-start-1 lg:grid lg:grid-rows-subgrid">
                <Reveal kind="label" delay={0.2} className="kicker">
                  <p className="t-label">Newsletter</p>
                </Reveal>

                <h2
                  id={`${uid}-nl`}
                  className="t-h2 mt-[clamp(1rem,1.8vw,1.5rem)] text-ivory lg:self-end"
                >
                  <MaskedLines lines={[newsletterCopy.heading]} delay={0.3} />
                </h2>

                <Reveal delay={0.42}>
                  <p className="t-body mt-[clamp(1rem,1.6vw,1.4rem)] max-w-[42ch] text-sage">
                    {newsletterCopy.standfirst}
                  </p>
                </Reveal>

                {/* The field: a label that lifts, a line that draws gold, and
                    the arrow at the end of the line as the submit. */}
                <Reveal delay={0.54} className="mt-[clamp(1.75rem,2.8vw,2.5rem)] lg:self-end">
                  <form
                    onSubmit={nl.onSubmit}
                    noValidate
                    className="group/nl relative max-w-[30rem]"
                    aria-labelledby={`${uid}-nl`}
                  >
                    <span className="field">
                      <input
                        id={`${nl.id}-email`}
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={nl.email}
                        onChange={nl.onChange}
                        aria-invalid={nl.invalid}
                        aria-describedby={`${nl.id}-msg`}
                        disabled={loading}
                        placeholder=" "
                        className="field-input pr-14 disabled:opacity-60"
                      />
                      <label htmlFor={`${nl.id}-email`} className="field-label">
                        {newsletterCopy.fieldLabel}
                      </label>
                      <span aria-hidden className="field-line" />
                    </span>

                    <button
                      type="submit"
                      disabled={loading}
                      aria-label={newsletterCopy.submitLabel}
                      className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-end text-sage transition-colors duration-500 ease-premium hover:text-gold focus-visible:text-gold disabled:opacity-60 group-focus-within/nl:text-gold"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {loading ? (
                          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Loader2 aria-hidden className="h-[1.1rem] w-[1.1rem] animate-spin" strokeWidth={1.5} />
                          </motion.span>
                        ) : nl.state === 'success' ? (
                          <motion.span
                            key="done"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Check aria-hidden className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.5} />
                          </motion.span>
                        ) : (
                          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <ArrowRight
                              aria-hidden
                              strokeWidth={1.5}
                              className="h-[1.1rem] w-[1.1rem] transition-transform duration-500 ease-premium group-hover/nl:translate-x-0.5 group-focus-within/nl:translate-x-1"
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </form>
                </Reveal>

                <Reveal delay={0.62} className="mt-4 min-h-[2.75rem]">
                  <AnimatePresence mode="wait">
                    {nl.message ? (
                      <motion.p
                        key={nl.message}
                        id={`${nl.id}-msg`}
                        role={nl.invalid ? 'alert' : 'status'}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className={`t-small max-w-[30rem] ${nl.invalid ? 'text-gold' : 'text-ivory/70'}`}
                      >
                        {nl.message}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="privacy"
                        id={`${nl.id}-msg`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="t-meta text-stone"
                      >
                        {newsletterCopy.privacyNote}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </Reveal>
              </div>

              {/* ==================== The divider ====================
                  Vertical from 1024, horizontal below it, with the node where
                  the two halves meet. */}
              <div
                aria-hidden
                className="relative mx-[clamp(1.5rem,4vw,4rem)] h-px lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:mx-0 lg:my-[clamp(2rem,3vw,3rem)] lg:h-auto lg:w-px"
              >
                <motion.span
                  className="absolute inset-0 block origin-left bg-[var(--line)] lg:origin-top"
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
                />
                {/* Positioned by the outer span and turned by the inner one, so
                    the entrance's own transform cannot displace either. */}
                <span className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
                  >
                    <span className="block h-[7px] w-[7px] rotate-45 border border-gold bg-[var(--char)]" />
                  </motion.span>
                </span>
              </div>

              {/* ==================== Enquiries ==================== */}
              <div className="flex flex-col p-[clamp(1.5rem,4vw,4rem)] lg:col-start-3 lg:row-span-5 lg:row-start-1 lg:grid lg:grid-rows-subgrid">
                <Reveal kind="label" delay={0.2 + LAG} className="kicker">
                  <p className="t-label">Enquiries</p>
                </Reveal>

                <h2 className="t-h2 mt-[clamp(1rem,1.8vw,1.5rem)] text-ivory lg:self-end">
                  <MaskedLines lines={lines} delay={0.3 + LAG} stagger={0.1} />
                </h2>

                <Reveal delay={0.42 + LAG}>
                  <p className="t-body mt-[clamp(1rem,1.6vw,1.4rem)] max-w-[42ch] text-sage">{body}</p>
                </Reveal>

                {/* The action: a champagne-edged pane, its arrow travelling on
                    hover. */}
                <motion.div
                  className="mt-[clamp(1.75rem,2.8vw,2.5rem)] w-full max-w-[30rem] lg:self-end"
                  initial={reduce ? false : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.56 + LAG }}
                >
                  <Link
                    href="/contact"
                    className="group/c flex items-center justify-between gap-6 rounded-[var(--r-md)] border border-[var(--line-gold)] bg-[var(--g-bg)] px-[clamp(1.1rem,1.8vw,1.5rem)] py-[0.95rem] shadow-[var(--g-rim)] transition-[border-color,background-color,box-shadow] duration-500 ease-premium hover:border-gold hover:bg-[var(--g-bg-hi)] hover:shadow-[var(--depth-1),var(--g-rim)] focus-visible:border-gold focus-visible:bg-[var(--g-bg-hi)]"
                  >
                    <span className="cta text-ivory transition-colors duration-500 ease-premium group-hover/c:text-gold-hi">
                      Get in Touch
                    </span>
                    <ArrowRight
                      aria-hidden
                      strokeWidth={1.5}
                      className="h-[1.05rem] w-[1.05rem] shrink-0 text-gold transition-transform duration-500 ease-premium group-hover/c:translate-x-1 group-focus-visible/c:translate-x-1"
                    />
                  </Link>
                </motion.div>

                <Reveal delay={0.66 + LAG} className="mt-4 min-h-[2.75rem]">
                  <a
                    href={`mailto:${contact.email}`}
                    className="group/m inline-flex items-center gap-2.5 py-1"
                  >
                    <span className="t-label link-underline break-all text-ivory/80 transition-colors duration-500 ease-premium group-hover/m:text-gold-hi">
                      {contact.email}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.5}
                      className="h-[0.95rem] w-[0.95rem] shrink-0 text-sage transition-[transform,color] duration-500 ease-premium group-hover/m:-translate-y-0.5 group-hover/m:translate-x-0.5 group-hover/m:text-gold"
                    />
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ---------------- The hand-over ----------------
          The ground settling into the footer's own, so the photograph below
          starts on a clean edge. */}
      <div
        aria-hidden
        className="mt-[clamp(1.5rem,3vw,2.5rem)] h-[clamp(2rem,4vw,3.5rem)] w-full bg-[linear-gradient(to_bottom,transparent_0%,rgb(var(--scrim-rgb)/0.55)_58%,var(--void)_100%)]"
      />
    </section>
  );
}
