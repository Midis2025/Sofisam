'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { HeroFilm } from './HeroFilm';
import { Button } from '@/components/ui/Button';
import { useEnquiryModal } from '@/context/EnquiryModalContext';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * SOFISAM Flagship Hero Section — Global Grid Aligned Edition
 *
 * Integrated into the unified SOFISAM layout system:
 * - Uses the EXACT global `.shell` container and 12-column responsive grid
 * - Left edge of eyebrow, headline, copy, CTAs, and global platform strip
 *   align seamlessly with the header logo and subsequent section headings
 * - Right edge of headquarters block and scroll indicator align with
 *   the header "Get in Touch" CTA and section boundaries
 * - Full-bleed background video with cinematic directional scrims
 * - Upright Newsreader display serif typography with fluid clamp scaling
 */
export function Hero() {
  const reduce = useReducedMotion();
  const { openEnquiryModal } = useEnquiryModal();

  return (
    <section
      data-section="SOFISAM-HERO"
      className="tone-dark relative w-full overflow-hidden flex flex-col justify-between min-h-[88svh] sm:min-h-[90svh] lg:min-h-[92svh] lg:h-[92svh]"
      aria-label="SOFISAM — International Strategic Consulting & Corporate Advisory"
    >
      {/* 1. Full-Bleed Background Dubai Video / Fallback Poster (Edge-to-Edge) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <HeroFilm position="38% 50%" />
      </div>

      {/* 2. Sophisticated Directional & Vignette Overlay Scrims */}
      {/* Left-to-right gradient ensuring high text contrast while keeping Dubai skyline visible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#0f1214]/85 via-[#0f1214]/60 to-[#0f1214]/25 max-md:from-[#0f1214]/90 max-md:via-[#0f1214]/75 max-md:to-[#0f1214]/50"
      />

      {/* Bottom gradient to anchor lower metadata and global reach strip */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 z-[1] bg-gradient-to-t from-[#0f1214]/90 via-[#0f1214]/40 to-transparent"
      />

      {/* Top subtle scrim for transparent header contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 z-[1] bg-gradient-to-b from-[#0f1214]/65 to-transparent"
      />

      {/* 3. Global Page Container (.shell) */}
      <div className="shell relative z-10 flex flex-col justify-between flex-1 w-full pt-[calc(var(--header-h)+1.25rem)] sm:pt-[calc(var(--header-h)+1.75rem)] lg:pt-[calc(var(--header-h)+2.25rem)] pb-6 sm:pb-8 lg:pb-9">
        {/* Main Content Area on Global 12-Column Grid */}
        <div className="my-auto py-6 sm:py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
          {/* Left Column: Eyebrow, Dominant Headline, Paragraph & CTAs */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            {/* Eyebrow */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
              className="flex items-center gap-2.5"
            >
              <span className="h-px w-6 bg-[#C7A46A]" />
              <p className="t-label text-[#C7A46A]">
                DUBAI · GLOBAL ADVISORY
              </p>
            </motion.div>

            {/* Dominant Headline (Newsreader Display Serif, Upright, No Italics) */}
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
              className="hero-headline mt-4 sm:mt-5 font-display text-[clamp(2.85rem,5.2vw,5.75rem)] font-light text-white leading-[0.98] sm:leading-[1.02] tracking-[-0.024em] max-w-[820px]"
            >
              Strategic clarity<br className="hidden sm:inline" /> for a changing world.
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
              className="mt-5 sm:mt-6 text-[clamp(1rem,1.12vw,1.15rem)] text-white/85 leading-relaxed max-w-[560px]"
            >
              SOFISAM provides confidential, unconflicted strategic consulting, corporate advisory and mandate structuring for businesses, investors and decision-makers navigating complex international markets.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.28 }}
              className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4"
            >
              <Button
                variant="primary"
                tone="light"
                onClick={() => openEnquiryModal()}
              >
                START A CONVERSATION
              </Button>

              <Button
                variant="secondary"
                tone="light"
                href="/services"
              >
                EXPLORE SOFISAM
              </Button>
            </motion.div>
          </div>

          {/* Right Column: World Headquarters Block (Aligned with Global Right Grid Edge) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.32 }}
            className="lg:col-span-5 xl:col-span-4 lg:text-right flex flex-col lg:items-end justify-end pb-1 mt-6 lg:mt-0"
          >
            <p className="text-[0.6875rem] font-mono uppercase tracking-[0.22em] text-[#C7A46A]">
              WORLD HEADQUARTERS
            </p>
            <p className="mt-1 text-sm sm:text-base font-light text-white/95">
              Dubai Multi Commodities Centre
            </p>
            <p className="text-xs text-white/60 font-mono mt-0.5">
              Dubai, United Arab Emirates
            </p>
          </motion.div>
        </div>

        {/* 4. Global Platform Strip (Aligned with Global Grid) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.36 }}
          className="pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-[0.6875rem] font-mono uppercase tracking-[0.22em] text-[#C7A46A]">
              GLOBAL PLATFORM:
            </span>
            <span className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white/90">
              DUBAI · MIDDLE EAST · EUROPE · ASIA · AMERICAS
            </span>
          </div>

          {/* Subtle Vertical Scroll Indicator (Aligns with Global Right Edge) */}
          <div className="hidden md:flex items-center gap-1.5 text-[0.6875rem] font-mono uppercase tracking-[0.2em] text-white/50">
            <span>SCROLL</span>
            <span className="inline-block text-[0.65rem] animate-pulse">↓</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
