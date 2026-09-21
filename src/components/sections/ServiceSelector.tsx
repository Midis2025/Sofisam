'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { services } from '@/data/services';
import { Picture } from '@/components/ui/Picture';
import { Tilt } from '@/components/ui/Tilt';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The three disciplines, browsed rather than scrolled.
 *
 * A standing index on the left; choosing one exchanges the whole panel beside
 * it — the plate, the firm's own summary, the opening statement and the four
 * themes that page carries. Nothing is hidden that the reader cannot reach in
 * one interaction, and the full page is always one link away.
 *
 * Implemented as a real tablist, so arrow keys move between disciplines and
 * the relationship between a tab and its panel is announced.
 *
 * This is deliberately a different interaction from the homepage index, which
 * is hover-led, sits on obsidian and shows only the summary. Here the reader
 * commits to a discipline and gets its substance.
 */
export function ServiceSelector() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = services[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = services.length - 1;
    let next: number | null = null;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;

    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section data-section="Three Disciplines" className="section ground-char" aria-labelledby="disciplines-heading">
      {/* The section indicator is fixed in the right gutter from 768 up, so the
          whole section reserves that much again on its right edge: every row
          here — the heading, the two columns and the themes — stops on one line
          clear of the rail rather than running under it. */}
      <div className="shell md:pr-[calc(var(--gutter)+2rem)]">
        <div className="head">
          <div>
            <Reveal kind="label" className="kicker">
              <p className="t-label">Three Disciplines</p>
            </Reveal>

            <h2
              id="disciplines-heading"
              className="t-h2 head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-ivory"
            >
              <span className="sr-only">One standard of judgement, three forms.</span>
              <span aria-hidden className="block lg:hidden">
                <MaskedLines lines={['One standard', 'of judgement,', 'three forms.']} />
              </span>
              <span aria-hidden className="hidden lg:block">
                <MaskedLines lines={['One standard of judgement,', 'three forms.']} />
              </span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <Reveal delay={0.12}>
              <p className="t-body head-note text-sage">
                Consulting, advisory and structuring are separate practices, but they
                are not separate opinions. Whichever one an engagement begins in, the
                reasoning behind it is the same.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-[var(--pad-sm)] grid gap-[clamp(2rem,4vw,5rem)] lg:grid-cols-12">
          {/* ---------- The index ---------- */}
          <div
            role="tablist"
            aria-label="Disciplines"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="lg:col-span-5"
          >
            {services.map((s, i) => {
              const on = active === i;
              return (
                <button
                  key={s.slug}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`discipline-tab-${s.slug}`}
                  aria-selected={on}
                  aria-controls={`discipline-panel-${s.slug}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') setActive(i);
                  }}
                  className="group relative block w-full border-t border-[var(--line)] py-[clamp(1.5rem,2.6vw,2.25rem)] text-left last:border-b"
                >
                  {/* The active discipline's rule fills in gold. */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-0 top-0 block h-px origin-left bg-gold"
                    initial={false}
                    animate={{ scaleX: on ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                  />

                  <span className="flex items-baseline gap-[clamp(1rem,2vw,2rem)]">
                    <span
                      className={`t-num shrink-0 text-[0.85rem] transition-colors duration-500 ${
                        on ? 'text-gold' : 'text-stone'
                      }`}
                    >
                      {s.index}
                    </span>

                    <span
                      className={`block font-display text-[clamp(1.9rem,3.4vw,3.25rem)] leading-[1.04] tracking-tighter transition-colors duration-[600ms] ease-premium ${
                        on ? 'text-ivory' : 'text-stone group-hover:text-ivory/80'
                      }`}
                    >
                      {s.title}
                    </span>

                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.3}
                      className={`ml-auto h-6 w-6 shrink-0 self-center transition-all duration-[600ms] ease-premium ${
                        on
                          ? 'translate-x-0 text-gold opacity-100'
                          : '-translate-x-3 text-sage opacity-0'
                      }`}
                    />
                  </span>
                </button>
              );
            })}

            {/* The firm's own words for the chosen discipline, under the index. */}
            <div className="mt-[clamp(1.75rem,3vw,2.5rem)] min-h-[7rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.slug}
                  className="t-lead max-w-[44ch] text-ivory"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {current.sourceSummary}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* ---------- The panel ---------- */}
          <div className="lg:col-span-6 lg:col-start-7">
            {services.map((s, i) => (
              <div
                key={s.slug}
                role="tabpanel"
                id={`discipline-panel-${s.slug}`}
                aria-labelledby={`discipline-tab-${s.slug}`}
                hidden={active !== i}
              >
                {active === i && (
                  <>
                    {/* Plate */}
                    <div className="media relative aspect-[16/11] w-full overflow-hidden sm:aspect-[16/9]">
                      <AnimatePresence initial={false}>
                        <motion.span
                          key={s.slug}
                          aria-hidden
                          className="absolute inset-0 block"
                          initial={reduce ? false : { opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
                        >
                          <Picture
                            name={s.hero.image}
                            alt={s.hero.imageAlt}
                            sizes="(min-width:1024px) 50vw, 100vw"
                            focal={s.hero.focal}
                            className="h-full w-full object-cover"
                          />
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
                    >
                      <p className="t-body mt-[clamp(1.5rem,2.4vw,2rem)] max-w-[52ch] text-sage">
                        {s.intro.lead}
                      </p>

                      <Link
                        href={`/services/${s.slug}`}
                        className="group cta mt-[clamp(1.5rem,2.4vw,2rem)] text-ivory hover:text-gold"
                      >
                        <span className="link-underline">Explore {s.title}</span>
                        <ArrowUpRight
                          aria-hidden
                          strokeWidth={1.5}
                          className="arrow h-3.5 w-3.5"
                        />
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* The four themes the chosen discipline's own page carries, given the
            full width so the two columns above stay in balance.

            One grid of equal columns with the same gap on both axes, and the
            plate stretched to the row through every wrapper: a title that runs
            to two lines sets the height for all four rather than dropping its
            own card below the others. */}
        <dl className="mt-[clamp(2.25rem,3.6vw,3.25rem)] grid gap-[clamp(1.5rem,2.6vw,3rem)] sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-4">
          {current.themes.map((t, ti) => (
            <motion.div
              key={`${current.slug}-${t.title}`}
              className="h-full"
              style={{ transformPerspective: 1400 }}
              initial={reduce ? false : { opacity: 0, y: 24, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: ti * 0.06 }}
            >
              <Tilt className="h-full">
                <div className="group surface surface-lift flex h-full flex-col p-[clamp(1.25rem,2vw,1.75rem)]">
                  <dt className="t-label text-gold">{t.label}</dt>
                  <dd className="t-h4 mt-3.5 max-w-[22ch] text-ivory">{t.title}</dd>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
