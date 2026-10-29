'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { welcomeCopy, contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';

const EASE = [0.16, 1, 0.3, 1] as const;

export function BrandStatement() {
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Welcome"
      id="welcome"
      className="relative bg-[var(--char)] py-16 sm:py-20 lg:py-24 border-b border-[var(--line-soft)]"
      aria-labelledby="welcome-heading"
    >
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-stretch">
          {/* Left Column: Eyebrow, Heading, Content, Pull Quote, CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="kicker"
              >
                <p className="t-label">
                  {welcomeCopy.eyebrow}
                </p>
              </motion.div>

              <motion.h2
                id="welcome-heading"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
                className="mt-eyebrow t-h2 text-[var(--ivory)]"
              >
                A platform, and the relationships behind it.
              </motion.h2>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
                className="mt-6 space-y-4 t-body text-[var(--sage)]"
              >
                <p>{welcomeCopy.paragraphs[0]}</p>
                <p>{welcomeCopy.paragraphs[2]}</p>
              </motion.div>

              {/* Strategic Statement Pull Quote */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.25 }}
                className="mt-6 border-l-2 border-[var(--brass)] bg-[var(--plate)] p-5 shadow-[var(--shadow-pill)]"
              >
                <p className="font-display text-[1.125rem] leading-snug text-[var(--ivory-2)]">
                  &ldquo;{welcomeCopy.paragraphs[1]}&rdquo;
                </p>
                <p className="t-label mt-2 text-gold">
                  The Foundation of Our Mandates
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="mt-8 pt-5 border-t border-[var(--line)] flex items-center gap-6"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
              >
                <span>About the firm</span>
                <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <span className="text-[var(--line-strong)]">|</span>
              <Link
                href="/services"
                className="group inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[var(--sage)] hover:text-[var(--ivory)] transition-colors"
              >
                <span>Our expertise</span>
                <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Premium Dubai Image Plate Aligned with Left Column */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div className="group relative h-full min-h-[22rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)]">
              <Picture
                name="business-bay"
                alt="Dubai Business Bay corporate towers standing across the water"
                sizes="(min-width: 1024px) 50vw, 100vw"
                focal="50% 45%"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-baseline justify-between text-white">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#e8c89b] font-semibold">
                    Dubai Multi Commodities Centre
                  </span>
                  <p className="mt-1 text-xs text-white/90">
                    World headquarters bridging global counterparties
                  </p>
                </div>
                <span className="text-xs text-white/70 hidden sm:block">
                  {contact.address.line2}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
