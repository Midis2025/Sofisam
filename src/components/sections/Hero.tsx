'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { heroCopy, contact } from '@/data/site';
import { services } from '@/data/services';
import { HeroVideo } from '@/components/ui/HeroVideo';
import { Picture } from '@/components/ui/Picture';
import { ButtonLink } from '@/components/ui/Button';
import { useIntroDelay } from '@/lib/intro';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The headline is broken differently on phones so no line ever has to wrap
 * inside its own mask. Both copies are decorative; the accessible name comes
 * from the screen-reader span.
 */
const DESKTOP_LINES = heroCopy.headline; // ['A Global Corporate', 'Advisory Platform']
const MOBILE_LINES = ['A Global', 'Corporate', 'Advisory', 'Platform'] as const;
const FULL_HEADLINE = heroCopy.headline.join(' ');

/**
 * The opening frame.
 *
 * Full-screen footage of the city under a weighted scrim, carrying two
 * columns: the statement on the left, and on the right a panel that stands the
 * firm's three disciplines against an architectural plate. The panel advances
 * on its own and yields to the pointer, so the frame is alive before a visitor
 * has done anything and becomes theirs as soon as they touch it.
 *
 * The delays below are set against the preloader: on a first visit the curtain
 * lifts at ~0.95s and the headline begins its reveal as it goes.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const d = useIntroDelay();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink"
      aria-label="Introduction"
    >
      {/* Footage */}
      <motion.div
        className="veil-hero absolute inset-0"
        style={reduce ? undefined : { y: mediaY, scale: mediaScale }}
      >
        <HeroVideo
          poster="hero-video-poster"
          posterAlt="Dubai's Business Bay and Downtown skyline at golden hour"
          focal="50% 58%"
        />
      </motion.div>

      <motion.div
        className="below-header shell-wide relative z-10 flex min-h-[100svh] flex-col justify-end pb-[clamp(1.75rem,6vh,3.5rem)]"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="grid flex-1 items-end gap-[clamp(2.5rem,4vw,4.5rem)] pt-[clamp(1.5rem,5vh,3rem)] lg:grid-cols-12 lg:items-center">
          {/* ---------- Statement ---------- */}
          <div className="w-full max-w-[min(100%,52rem)] lg:col-span-7">
            <motion.div
              className="flex items-center gap-4"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: d }}
            >
              <motion.span
                aria-hidden
                className="hidden h-px w-10 shrink-0 origin-left bg-gold xs:block sm:w-16"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: EASE, delay: d + 0.05 }}
              />
              <p className="t-label text-gold">{heroCopy.eyebrow}</p>
            </motion.div>

            <h1 className="t-hero mt-[clamp(1rem,2.6vw,2rem)] text-ivory">
              <span className="sr-only">{FULL_HEADLINE}</span>
              <span aria-hidden className="block sm:hidden">
                <Lines lines={MOBILE_LINES} reduce={reduce} delay={d + 0.07} />
              </span>
              <span aria-hidden className="hidden sm:block">
                <Lines lines={DESKTOP_LINES} reduce={reduce} delay={d + 0.07} />
              </span>
            </h1>

            <motion.p
              className="t-lead mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[34rem] text-ivory/75 sm:max-w-[40rem]"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: d + 0.39 }}
            >
              {heroCopy.statement}
            </motion.p>

            <motion.div
              className="mt-[clamp(1.5rem,3vw,2.5rem)] flex flex-wrap items-center gap-3"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: d + 0.51 }}
            >
              <ButtonLink href={heroCopy.primaryCta.href} tone="light" variant="solid">
                {heroCopy.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={heroCopy.secondaryCta.href} tone="light" variant="outline">
                {heroCopy.secondaryCta.label}
              </ButtonLink>
            </motion.div>
          </div>

          {/* ---------- The advisory panel ---------- */}
          <motion.div
            className="hidden w-full lg:col-span-4 lg:col-start-9 lg:block"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: d + 0.66 }}
          >
            <AdvisoryPanel reduce={reduce} delay={d + 0.66} />
          </motion.div>
        </div>

        {/* Baseline: the firm's stated location and the scroll cue */}
        <motion.div
          className="mt-[clamp(1.5rem,4vh,2.75rem)] flex items-center justify-between gap-6 border-t border-ivory/15 pt-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: d + 0.85 }}
        >
          <p className="t-label text-ivory/40">{contact.headquarters}</p>

          <a
            href="#welcome"
            className="group flex items-center gap-3 py-1 text-ivory/40 transition-colors duration-500 hover:text-gold"
          >
            <span className="t-label hidden sm:block">Scroll</span>
            <span className="relative block h-9 w-px overflow-hidden bg-ivory/20">
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 block h-3 bg-gold"
                animate={reduce ? undefined : { y: ['-100%', '300%'] }}
                transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
              />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * The three disciplines, standing on an architectural plate.
 *
 * It advances by itself every six seconds so the frame is never static, and
 * stops the moment a pointer enters — from then on the reader is driving. The
 * plate behind it crossfades to the active discipline's own photograph.
 *
 * Every string is the source site's own: the three titles and their navigation
 * descriptions. Nothing is asserted here that is not already on the site.
 */
function AdvisoryPanel({
  reduce,
  delay,
}: {
  reduce: boolean | null;
  delay: number;
}) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (reduce || held) return;
    const t = setInterval(() => setActive((i) => (i + 1) % services.length), 6000);
    return () => clearInterval(t);
  }, [reduce, held]);

  return (
    <div
      className="relative overflow-hidden rounded-[var(--r-lg)] border border-ivory/15 bg-ink/45 backdrop-blur-2xl"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setHeld(true);
      }}
      onPointerLeave={() => setHeld(false)}
    >
      {/* The plate. It sits behind the panel rather than beside it, so the
          whole block reads as one object. */}
      <div aria-hidden className="absolute inset-0">
        {services.map((s, i) => (
          <motion.span
            key={s.slug}
            className="absolute inset-0 block"
            initial={false}
            animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }}
            transition={{ duration: reduce ? 0 : 1.1, ease: EASE }}
          >
            <Picture
              name={s.hero.image}
              alt=""
              decorative
              sizes="(min-width:1024px) 30vw, 100vw"
              focal={s.hero.focal}
              className="h-full w-full object-cover"
            />
          </motion.span>
        ))}
        <span className="absolute inset-0 bg-gradient-to-b from-ink/[0.84] via-ink/[0.90] to-ink/[0.96]" />
      </div>

      <div className="relative p-[clamp(1.25rem,2vw,1.75rem)]">
        <div className="flex items-center justify-between gap-4">
          <p className="t-label text-gold">Our Expertise</p>
          <span className="t-num text-[0.78rem] text-ivory/45">
            {services[active].index} / {String(services.length).padStart(2, '0')}
          </span>
        </div>

        <ul className="mt-[clamp(1.25rem,2vw,1.75rem)]">
          {services.map((s, i) => {
            const on = active === i;
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') setActive(i);
                  }}
                  onFocus={() => {
                    setHeld(true);
                    setActive(i);
                  }}
                  onBlur={() => setHeld(false)}
                  className="group row-inv block py-[clamp(0.85rem,1.3vw,1.1rem)] last:border-b last:border-[var(--line-inv)]"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span
                      className={`font-display text-[clamp(1.15rem,1.5vw,1.45rem)] leading-tight tracking-tight transition-colors duration-500 ${
                        on ? 'text-gold' : 'text-ivory/70'
                      }`}
                    >
                      {s.title}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.4}
                      className={`h-4 w-4 shrink-0 transition-all duration-500 ease-premium ${
                        on
                          ? 'translate-x-0 text-gold opacity-100'
                          : '-translate-x-2 text-ivory/30 opacity-0'
                      }`}
                    />
                  </span>

                  {/* The description belongs to the active discipline only. */}
                  <motion.span
                    className="block overflow-hidden"
                    initial={false}
                    animate={{ height: on ? 'auto' : 0, opacity: on ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                  >
                    <span className="block max-w-[34ch] pt-2 text-[0.84rem] font-light leading-relaxed text-ivory/55">
                      {s.navDescription}
                    </span>
                  </motion.span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Progress. Three segments, the active one filling over its dwell —
            a quiet indication that the panel is moving on its own. */}
        <div aria-hidden className="mt-[clamp(1.25rem,2vw,1.75rem)] flex gap-1.5">
          {services.map((s, i) => (
            <span key={s.slug} className="relative h-px flex-1 overflow-hidden bg-ivory/15">
              <motion.span
                className="absolute inset-y-0 left-0 block origin-left bg-gold"
                initial={false}
                animate={{ scaleX: active === i ? 1 : 0 }}
                transition={{
                  duration: reduce || held ? 0.4 : active === i ? 6 : 0.4,
                  ease: active === i && !held && !reduce ? 'linear' : EASE,
                }}
                style={{ width: '100%' }}
              />
            </span>
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: delay + 0.3 }}
        >
          <Link
            href="/services"
            className="group cta mt-[clamp(1rem,1.6vw,1.35rem)] text-ivory/70 hover:text-gold"
          >
            <span className="link-underline">All services</span>
            <ArrowUpRight aria-hidden strokeWidth={1.5} className="arrow h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function Lines({
  lines,
  reduce,
  delay,
}: {
  lines: readonly string[];
  reduce: boolean | null;
  delay: number;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: '112%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.1 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}
