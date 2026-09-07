'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { heroCopy } from '@/data/site';
import { HeroVideo } from '@/components/ui/HeroVideo';
import { ButtonLink } from '@/components/ui/Button';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The headline is broken differently on phones so no line ever has to wrap
 * inside its own mask. Both copies are decorative; the accessible name comes
 * from the screen-reader span.
 */
const DESKTOP_LINES = heroCopy.headline; // ['A Global Corporate', 'Advisory Platform']
const MOBILE_LINES = ['A Global', 'Corporate', 'Advisory', 'Platform'] as const;
const FULL_HEADLINE = heroCopy.headline.join(' ');

function Lines({
  lines,
  reduce,
}: {
  lines: readonly string[];
  reduce: boolean | null;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.26 + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink"
      aria-label="Introduction"
    >
      {/* Cinematic backdrop */}
      <motion.div
        className="veil-hero absolute inset-0"
        style={reduce ? undefined : { y: mediaY }}
      >
        <HeroVideo
          poster="hero-video-poster"
          posterAlt="Dubai's Business Bay and Downtown skyline at golden hour"
          focal="50% 58%"
        />
      </motion.div>

      {/* Content — starts below the header safe area, bottom-weighted */}
      <motion.div
        className="below-header shell-wide relative z-10 flex min-h-[100svh] flex-col justify-end pb-[clamp(1.75rem,6vh,3.5rem)]"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="w-full max-w-[min(100%,66rem)]">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
          >
            <motion.span
              aria-hidden
              className="hidden h-px w-10 shrink-0 origin-left bg-gold xs:block sm:w-16"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
            />
            <p className="t-label text-gold">{heroCopy.eyebrow}</p>
          </motion.div>

          {/* Headline */}
          <h1 className="t-display mt-[clamp(0.875rem,2.4vw,2rem)] text-bone">
            <span className="sr-only">{FULL_HEADLINE}</span>
            <span aria-hidden className="block sm:hidden">
              <Lines lines={MOBILE_LINES} reduce={reduce} />
            </span>
            <span aria-hidden className="hidden sm:block">
              <Lines lines={DESKTOP_LINES} reduce={reduce} />
            </span>
          </h1>

          {/* Statement */}
          <motion.p
            className="t-lead mt-[clamp(1rem,2.2vw,1.75rem)] max-w-[34rem] text-bone/80 sm:max-w-[40rem]"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.44 }}
          >
            {heroCopy.statement}
          </motion.p>

          {/* Actions */}
          <motion.div
            className="mt-[clamp(1.25rem,3vw,2.5rem)] flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.6 }}
          >
            <ButtonLink href={heroCopy.primaryCta.href} tone="light" variant="solid">
              {heroCopy.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={heroCopy.secondaryCta.href} tone="light" variant="outline">
              {heroCopy.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </div>

        {/* Baseline: verified location + scroll cue */}
        <motion.div
          className="mt-[clamp(1.25rem,4.5vh,3rem)] flex items-center justify-between gap-6 border-t border-bone/15 pt-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.92 }}
        >
          <p className="t-label text-bone/45">Dubai — DMCC</p>

          <a
            href="#welcome"
            className="group flex items-center gap-3 py-1 text-bone/45 transition-colors duration-500 hover:text-gold"
          >
            <span className="t-label hidden sm:block">Scroll</span>
            <span className="relative block h-8 w-px overflow-hidden bg-bone/25">
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 block h-3 bg-gold"
                animate={reduce ? undefined : { y: ['-100%', '280%'] }}
                transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
              />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
