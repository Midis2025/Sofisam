'use client';

import Link from 'next/link';
import { ArrowUpRight, Award, Building2, Globe } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { welcomeCopy, contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Button } from '@/components/ui/Button';
import { FocusIn } from '@/components/animations/SplitText';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * SOFISAM Brand Statement & Introduction
 *
 * Distinct Editorial Layout featuring:
 * - FocusIn blur-to-focus typography transition (unique to this section)
 * - Large pull quote highlighting unconflicted advice
 * - 3 Strategic credentials metrics
 * - High-resolution architectural plate of Dubai Business Bay with custom framing
 */
export function BrandStatement() {
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Introduction"
      id="welcome"
      className="relative bg-[var(--char)] py-20 sm:py-24 lg:py-28 border-b border-[var(--line-soft)]"
      aria-labelledby="welcome-heading"
    >
      <div className="shell">
        {/* Top Eyebrow */}
        <div className="kicker">
          <p className="t-label">
            {welcomeCopy.eyebrow}
          </p>
        </div>

        {/* Asymmetric Editorial Header */}
        <div className="mt-eyebrow grid gap-8 lg:grid-cols-12 lg:gap-14 items-baseline">
          <div className="lg:col-span-7">
            <FocusIn delay={0.05}>
              <h2
                id="welcome-heading"
                className="t-h2 text-[var(--ivory)] font-light leading-[1.08]"
              >
                An international advisory platform, and the relationships behind it.
              </h2>
            </FocusIn>
          </div>

          <div className="lg:col-span-5">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.15 }}
              className="t-lead text-[var(--sage)] leading-relaxed"
            >
              {welcomeCopy.positioning}
            </motion.p>
          </div>
        </div>

        {/* Main Content Split: Editorial Narrative & Architectural Plate */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14 items-stretch">
          {/* Left Column: Pull Quote, Narrative & Verification */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Highlighted Pull Quote with Gold Hairline */}
              <motion.blockquote
                initial={reduce ? false : { opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.85, ease: EASE, delay: 0.18 }}
                className="relative border-l-2 border-[var(--brass)] bg-[var(--plate)] p-6 sm:p-8 rounded-r-[var(--r-md)] shadow-[var(--shadow-plate)]"
              >
                <p className="font-display text-[1.25rem] sm:text-[1.375rem] font-light leading-snug text-[var(--ivory)]">
                  &ldquo;{welcomeCopy.paragraphs[1]}&rdquo;
                </p>
                <footer className="mt-4 flex items-center justify-between text-xs text-[var(--stone)] uppercase tracking-wider">
                  <span className="font-semibold text-[var(--gold)]">Foundational Principle</span>
                  <span>Unconflicted Advisory</span>
                </footer>
              </motion.blockquote>

              {/* Verified Editorial Narrative Paragraphs */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.25 }}
                className="space-y-4 t-body text-[var(--sage)] leading-relaxed pt-2"
              >
                <p>{welcomeCopy.paragraphs[0]}</p>
                <p>{welcomeCopy.paragraphs[2]}</p>
              </motion.div>
            </div>

            {/* Micro Highlights Bar & CTAs */}
            <div className="mt-10 pt-6 border-t border-[var(--line)]">
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-[var(--line-soft)]">
                <div className="flex items-center gap-2.5">
                  <Building2 className="h-4 w-4 text-[var(--brass)] shrink-0" />
                  <span className="text-xs text-[var(--ivory-2)] font-medium">DMCC Headquarters</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4 text-[var(--brass)] shrink-0" />
                  <span className="text-xs text-[var(--ivory-2)] font-medium">Cross-Border Reach</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <Button variant="link" href="/about">
                  About the Firm
                </Button>
                <span className="text-[var(--line-strong)]">|</span>
                <Button variant="link" href="/services">
                  Our Practice Areas
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Plate with Interactive Reveal */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.22 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div className="group relative h-full min-h-[24rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)]">
              <Picture
                name="business-bay"
                alt="Dubai Business Bay corporate towers standing across the water"
                sizes="(min-width: 1024px) 50vw, 100vw"
                focal="50% 45%"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-7 flex items-baseline justify-between text-white z-10">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#e8c89b] font-semibold">
                    Dubai Multi Commodities Centre
                  </span>
                  <p className="mt-1 font-display text-base text-white/95">
                    Strategic vantage point bridging global counterparties
                  </p>
                </div>
                <span className="text-xs text-white/70 hidden sm:block font-mono">
                  {contact.address.locality}, UAE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
