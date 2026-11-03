'use client';

import Link from 'next/link';
import { ArrowUpRight, Building, Check, Globe2, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Button } from '@/components/ui/Button';
import { MaskedLines } from '@/components/animations/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

const verifiedFacts = [
  { label: 'Free Zone Jurisdiction', value: 'Dubai Multi Commodities Centre (DMCC)' },
  { label: 'World Headquarters', value: 'Jewellery & Gemplex 3, JLT, Dubai' },
  { label: 'Strategic Position', value: 'Crossroads of Asian, European & American Markets' },
  { label: 'Operating Status', value: 'Confidential Global Corporate Advisory' },
];

/**
 * SOFISAM Dubai Headquarters & Global Hub
 *
 * Establishes the authoritative physical and regulatory foundation of the firm:
 * - Dubai Multi Commodities Centre (DMCC) world headquarters
 * - Strategic time zone intersection connecting worldwide capital markets
 * - Verified regulatory and geographical facts ledger
 * - Architectural photography with precision framing
 */
export function DubaiSection() {
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Dubai — DMCC"
      id="dubai"
      className="relative bg-[var(--char)] py-20 sm:py-24 lg:py-28 border-b border-[var(--line-soft)]"
      aria-label="Dubai World Headquarters"
    >
      <div className="shell">
        <div className="grid gap-12 xl:grid-cols-12 xl:gap-16 xl:items-stretch">
          {/* Left Column: Headquarters Narrative & Verified Facts */}
          <div className="xl:col-span-5">
            <div className="kicker">
              <p className="t-label">
                Dubai — DMCC
              </p>
            </div>

            <h2 className="mt-eyebrow t-h2 text-[var(--ivory)] font-light leading-[1.08]">
              <MaskedLines lines={['A world base chosen', 'for global reach.']} />
            </h2>

            <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--ivory-2)] font-light">
              From our world headquarters in the {contact.headquarters}, our relationships and strategic partnerships span the globe.
            </p>

            <p className="mt-4 t-body text-[var(--sage)] leading-relaxed">
              Dubai represents a pivotal international hub where working hours overlap seamlessly with Asia in the morning and Europe and the Americas in the afternoon. What distinguishes the center is the density of global counterparties, family offices, and sovereign capital physically accessible.
            </p>

            {/* Verified Facts Ledger */}
            <dl className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {verifiedFacts.map((f) => (
                <div key={f.label} className="py-3.5 flex items-baseline justify-between gap-4">
                  <dt className="text-xs uppercase tracking-wider text-[var(--stone)] font-mono">
                    {f.label}
                  </dt>
                  <dd className="text-sm font-medium text-[var(--ivory)] text-right">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 pt-4 flex items-center gap-6">
              <Button variant="link" href="/about">
                Read About Our Dubai Hub
              </Button>
            </div>
          </div>

          {/* Right Column: High-Resolution DMCC / Dubai Architectural Plate */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="xl:col-span-7"
          >
            {/* Matches the headquarters narrative and facts ledger beside it
                rather than floating mid-column at a fixed ratio. */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] xl:aspect-auto xl:h-full xl:min-h-[28rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--graphite)] shadow-[var(--shadow-plate)] group">
              <Picture
                name="dubai-haze"
                alt="Dubai DMCC towers rising into the atmospheric horizon"
                sizes="(min-width: 1280px) 58vw, 100vw"
                focal="55% 50%"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
              />

              {/* Verified Location Stamp */}
              <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-[var(--r-sm)] border border-white/20 text-white flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#e8c89b]" />
                <span className="text-[0.6875rem] uppercase tracking-wider font-mono">
                  JLT, Dubai · 500001
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8 flex items-end justify-between text-white z-10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#e8c89b] font-medium">
                    World Headquarters
                  </p>
                  <p className="mt-1 font-display text-xl text-white font-light">
                    Dubai Multi Commodities Centre
                  </p>
                  <p className="mt-1 text-xs text-white/80">
                    Jewellery &amp; Gemplex 3 · Jumeirah Lake Towers
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-mono text-white/70">
                    SOFISAM FZCO
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
