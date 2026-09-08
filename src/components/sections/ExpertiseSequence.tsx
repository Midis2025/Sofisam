'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { services } from '@/data/services';
import { servicesIntro } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, DrawRule } from '@/components/animations/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

export function ExpertiseSequence() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  // Track which panel occupies the middle band of the viewport.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="expertise" className="section bg-bone" aria-labelledby="expertise-heading">
      <div className="shell-wide">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
              <p className="t-label text-gold">{servicesIntro.eyebrow}</p>
            </Reveal>
            <h2 id="expertise-heading" className="t-h1 mt-7 text-ink">
              <MaskedLines lines={[servicesIntro.heading]} />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <Reveal delay={0.1}>
              <p className="t-body max-w-[42ch] text-ink/60">
                {servicesIntro.standfirst}
              </p>
            </Reveal>
          </div>
        </div>

        <DrawRule className="mt-[var(--content-gap-lg)]" />

        {/* Sequence */}
        <div className="mt-[var(--content-gap-lg)] lg:grid lg:grid-cols-12 lg:gap-14">
          {/* Sticky media — desktop only */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[7.5rem]">
              <div className="media relative aspect-[4/5] w-full">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={services[active].slug}
                    className="absolute inset-0"
                    initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.95, ease: EASE }}
                  >
                    <Picture
                      name={services[active].hero.image}
                      alt={services[active].hero.imageAlt}
                      sizes="40vw"
                      focal={services[active].hero.focal}
                      className="h-full w-full"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Index marker */}
                <div className="absolute bottom-0 left-0 z-10 flex items-end gap-3 bg-bone px-5 pt-4">
                  <span className="t-index text-[clamp(2.5rem,4vw,3.75rem)] text-ink">
                    {services[active].index}
                  </span>
                  <span className="pb-2 text-[0.68rem] uppercase tracking-[0.22em] text-ink/40">
                    / 03
                  </span>
                </div>
              </div>

              {/* Progress rail */}
              <div className="mt-6 flex gap-2" aria-hidden>
                {services.map((s, i) => (
                  <span
                    key={s.slug}
                    className={`h-px flex-1 origin-left transition-colors duration-700 ${
                      i <= active ? 'bg-gold' : 'bg-ink/12'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Panels */}
          <ol className="lg:col-span-7">
            {services.map((s, i) => (
              <li
                key={s.slug}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="border-t border-ink/12 first:border-t-0 lg:first:border-t lg:border-t"
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group block py-[var(--content-gap-lg)] sm:py-[var(--space-section-sm)]"
                >
                  {/* Mobile media */}
                  <div className="media media-zoom relative mb-7 aspect-[16/10] w-full lg:hidden">
                    <Picture
                      name={s.hero.image}
                      alt={s.hero.imageAlt}
                      sizes="100vw"
                      focal={s.hero.focal}
                      className="h-full w-full"
                    />
                    <span className="absolute bottom-0 left-0 z-10 bg-bone px-4 pt-3 t-index text-[2.25rem] text-ink">
                      {s.index}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <span className="t-label hidden text-gold lg:block">
                        {s.index} — Expertise
                      </span>
                      <h3 className="t-h2 mt-0 text-ink transition-colors duration-500 group-hover:text-gold lg:mt-4">
                        {s.title}
                      </h3>
                    </div>
                    <span
                      aria-hidden
                      className="mt-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition-all duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-ink lg:mt-6"
                    >
                      <ArrowUpRight strokeWidth={1.4} className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="t-body mt-5 max-w-[48ch] text-ink/60">
                    {s.sourceSummary}
                  </p>

                  <span className="link-underline mt-7 inline-block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70">
                    Explore {s.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
