'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { services } from '@/data/services';
import { servicesIntro } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal } from '@/components/animations/Reveal';
import { SplitText } from '@/components/animations/SplitText';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Our Expertise.
 *
 * Not three cards. On a desktop the disciplines are three full-width rows and
 * the imagery is not in a column at all — a plate follows the pointer across
 * the list, carrying the photograph of whichever discipline is under it. The
 * section is therefore browsed rather than scanned, and the type keeps the
 * whole measure to itself.
 *
 * On a phone the same content unfolds in sequence, each discipline with its
 * own plate — an intentional layout rather than the desktop one compressed.
 *
 * Every string is the source site's own: the titles, the summaries, the
 * navigation descriptions and the section standfirst.
 */
export function ServiceShowcase() {
  const reduce = useReducedMotion();
  const list = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // The plate trails the pointer rather than pinning to it — a spring gives it
  // the weight of an object being carried rather than a cursor decoration.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 140, damping: 20, mass: 0.6 });
  const y = useSpring(py, { stiffness: 140, damping: 20, mass: 0.6 });

  const track = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || reduce) return;
    const rect = list.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(e.clientX - rect.left);
    py.set(e.clientY - rect.top);
  };

  return (
    <section
      id="expertise"
      className="section ground-dark on-dark"
      aria-labelledby="expertise-heading"
    >
      <div className="shell">
        {/* Header */}
        <div className="head">
          <div>
            <Reveal kind="label" className="kicker">
              <p className="t-label">{servicesIntro.eyebrow}</p>
            </Reveal>
            <SplitText
              as="h2"
              text={servicesIntro.heading}
              className="t-display head-title mt-[clamp(1.25rem,2.4vw,2rem)] text-ivory"
              stagger={0.06}
            />
          </div>

          <Reveal kind="body" delay={0.1} className="lg:pb-3">
            <p className="t-body head-note text-sage">{servicesIntro.standfirst}</p>
          </Reveal>
        </div>

        {/* ---------- Desktop: full-width rows under a travelling plate ---------- */}
        <div className="mt-[var(--pad-sm)] hidden lg:block">
          <ul
            ref={list}
            className="relative"
            onPointerMove={track}
            onPointerLeave={() => setActive(null)}
          >
            {/* The plate. It sits above the rows but never takes the pointer,
                so the whole list stays clickable through it. */}
            <AnimatePresence>
              {active !== null && !reduce && (
                <motion.span
                  key="plate"
                  aria-hidden
                  style={{ x, y }}
                  className="pointer-events-none absolute left-0 top-0 z-10 -ml-[13rem] -mt-[8.5rem] block h-[17rem] w-[26rem] xl:-ml-[15rem] xl:-mt-[9.5rem] xl:h-[19rem] xl:w-[30rem]"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <span className="media block h-full w-full">
                    {services.map((s, i) => (
                      <motion.span
                        key={s.slug}
                        className="absolute inset-0 block"
                        initial={false}
                        animate={{ opacity: active === i ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        <Picture
                          name={s.hero.image}
                          alt=""
                          decorative
                          sizes="30rem"
                          focal={s.hero.focal}
                          className="h-full w-full object-cover"
                        />
                      </motion.span>
                    ))}
                    <span className="absolute inset-0 bg-ink/20" />
                  </span>
                </motion.span>
              )}
            </AnimatePresence>

            {services.map((s, i) => {
              const on = active === i;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    onPointerEnter={(e) => {
                      if (e.pointerType === 'mouse') setActive(i);
                    }}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="group row-inv grid grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,20rem)_4rem] items-center gap-x-[clamp(1.5rem,3vw,3rem)] py-[clamp(2rem,3.4vw,3rem)] last:border-b last:border-[var(--line-inv)]"
                  >
                    <span
                      className={`t-num text-[0.85rem] transition-colors duration-500 ${
                        on ? 'text-gold' : 'text-ivory/30'
                      }`}
                    >
                      {s.index}
                    </span>

                    <span
                      className={`block font-display text-[clamp(2.25rem,4vw,4rem)] leading-[1.02] tracking-tighter transition-all duration-[600ms] ease-premium ${
                        on ? 'translate-x-2 text-ivory' : 'text-ivory/35'
                      }`}
                    >
                      {s.title}
                    </span>

                    <span
                      className={`t-small max-w-[30ch] transition-colors duration-500 ${
                        on ? 'text-sage' : 'text-ivory/25'
                      }`}
                    >
                      {s.navDescription}
                    </span>

                    <span
                      aria-hidden
                      className={`flex h-14 w-14 items-center justify-center justify-self-end rounded-full border transition-all duration-[600ms] ease-premium ${
                        on
                          ? 'border-gold bg-gold text-ink'
                          : 'border-ivory/20 text-ivory/40'
                      }`}
                    >
                      <ArrowUpRight strokeWidth={1.3} className="h-5 w-5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* The firm's own summary for whichever discipline is under the
              pointer, held on one line below the list. */}
          <div className="mt-[clamp(1.75rem,3vw,2.5rem)] min-h-[3.5rem]">
            <AnimatePresence mode="wait">
              {active !== null && (
                <motion.p
                  key={services[active].slug}
                  className="t-lead max-w-[60ch] text-ivory/80"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {services[active].sourceSummary}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ---------- Phone and tablet: one discipline at a time ---------- */}
        <ol className="mt-[var(--pad-sm)] lg:hidden">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.slug}
              delay={i * 0.06}
              className="pb-[clamp(2.5rem,6vw,3.5rem)]"
            >
              <Link href={`/services/${s.slug}`} className="group block">
                <div className="media media-zoom aspect-[16/11] w-full sm:aspect-[16/9]">
                  <Picture
                    name={s.hero.image}
                    alt={s.hero.imageAlt}
                    sizes="100vw"
                    focal={s.hero.focal}
                    className="h-full w-full"
                  />
                </div>

                <div className="mt-6 flex items-baseline gap-4">
                  <span className="t-num text-[0.78rem] text-gold">{s.index}</span>
                  <h3 className="font-display text-[clamp(1.9rem,7vw,2.75rem)] leading-[1.03] tracking-tighter text-ivory">
                    {s.title}
                  </h3>
                </div>

                <p className="t-body mt-4 max-w-[46ch] text-sage">{s.sourceSummary}</p>

                <span className="cta mt-6 text-ivory">
                  <span className="link-underline">Explore {s.title}</span>
                  <ArrowUpRight aria-hidden strokeWidth={1.5} className="arrow h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
