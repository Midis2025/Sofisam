'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';

const EASE = [0.16, 1, 0.3, 1] as const;

const facts = [
  { label: 'Location', value: 'Jumeirah Lake Towers, Dubai' },
  { label: 'Free Zone', value: 'Dubai Multi Commodities Centre' },
  { label: 'Status', value: 'World Headquarters' },
  { label: 'Market Access', value: 'Middle East, Asia, Europe, Americas' },
];

export function DubaiSection() {
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Dubai — DMCC"
      id="dubai"
      className="relative bg-[var(--char)] py-20 lg:py-28 border-b border-[var(--line-soft)]"
      aria-label="Dubai — DMCC"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Headquarters Narrative & Verified Facts */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--brass)]" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                Dubai — DMCC
              </p>
            </div>

            <h2 className="mt-4 font-display text-[clamp(2.1rem,3.4vw,3.25rem)] font-light leading-[1.14] tracking-[-0.02em] text-[var(--ivory)]">
              A base chosen for its global reach.
            </h2>

            <p className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--ivory-2)]">
              From our world headquarters in the {contact.headquarters}, our relationships and strategic partnerships span the globe.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[var(--sage)]">
              Dubai sits strategically where the working day connects Asia in the morning and Europe and the Americas in the afternoon. What makes it essential is the density of global counterparties, sovereign entities, and institutional capital actively present.
            </p>

            {/* Verified Facts Ledger */}
            <dl className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {facts.map((f) => (
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
          </div>

          {/* Right Column: High-Resolution DMCC / Dubai Architectural Plate */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--graphite)] shadow-[var(--shadow-plate)]">
              <Picture
                name="dubai-haze"
                alt="Dubai DMCC towers rising into the atmospheric horizon"
                sizes="(min-width: 1024px) 58vw, 100vw"
                focal="50% 45%"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#e8c89b]">
                    World Headquarters
                  </p>
                  <p className="mt-1 font-display text-lg text-white">
                    Dubai Multi Commodities Centre (DMCC)
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-white/80">JLT, Dubai, UAE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
