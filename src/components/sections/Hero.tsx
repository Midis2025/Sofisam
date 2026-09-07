'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { heroCopy } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { ButtonLink } from '@/components/ui/Button';
import { MeridianField } from '@/components/ui/MeridianField';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen-safe w-full overflow-hidden bg-ink"
      aria-label="Introduction"
    >
      {/* Cinematic backdrop */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: mediaY }}
      >
        <motion.div
          className="media veil-bottom absolute inset-0 h-[114%] w-full"
          initial={reduce ? false : { scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <Picture
            name="hero-dubai"
            alt="Aerial view of Dubai's dense commercial district in warm evening light"
            sizes="100vw"
            priority
            focal="50% 42%"
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>

      {/* Precision motif */}
      <div
        aria-hidden
        className="precision-grid precision-grid-fade pointer-events-none absolute inset-0 opacity-70"
      />
      <MeridianField className="pointer-events-none absolute -right-[18%] top-1/2 hidden h-[46rem] w-[46rem] -translate-y-1/2 opacity-[0.32] lg:block xl:-right-[8%]" />

      {/* Content */}
      <motion.div
        className="shell-wide relative z-10 flex h-full flex-col justify-end pb-[clamp(3.5rem,9vh,7rem)] pt-24"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-[min(100%,60rem)]">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
          >
            <motion.span
              aria-hidden
              className="block h-px w-10 origin-left bg-gold sm:w-16"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
            />
            <p className="t-label text-gold">{heroCopy.eyebrow}</p>
          </motion.div>

          {/* Headline */}
          <h1 className="t-display mt-6 text-bone sm:mt-8">
            {heroCopy.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.26 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Statement */}
          <motion.p
            className="t-lead mt-7 max-w-[46ch] text-bone/70 sm:mt-9"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.44 }}
          >
            {heroCopy.statement}
          </motion.p>

          {/* Actions */}
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4 sm:mt-11"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.6 }}
          >
            <ButtonLink href={heroCopy.primaryCta.href} tone="light" variant="solid">
              {heroCopy.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={heroCopy.secondaryCta.href}
              tone="light"
              variant="outline"
            >
              {heroCopy.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </div>

        {/* Baseline: coordinates + scroll cue */}
        <motion.div
          className="mt-12 flex items-end justify-between gap-6 border-t border-bone/12 pt-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.92 }}
        >
          <p className="t-label tnum text-bone/40">
            25.0693°&nbsp;N&nbsp;&nbsp;/&nbsp;&nbsp;55.1400°&nbsp;E
          </p>

          <a
            href="#welcome"
            className="group flex items-center gap-3 text-bone/50 transition-colors duration-500 hover:text-gold"
          >
            <span className="t-label hidden sm:block">Scroll</span>
            <span className="relative block h-10 w-px overflow-hidden bg-bone/20">
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 block h-4 bg-gold"
                animate={reduce ? undefined : { y: ['-100%', '260%'] }}
                transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
              />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
