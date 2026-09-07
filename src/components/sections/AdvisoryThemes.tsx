'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Accordion } from '@/components/ui/Accordion';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';

type ServiceTheme = { label: string; title: string; body: string };

const EASE = [0.16, 1, 0.3, 1] as const;

const media = [
  {
    name: 'lounge-dark',
    alt: 'Darkened executive lounge with slatted timber screens and low, considered lighting',
    focal: '50% 50%',
  },
  {
    name: 'tower-detail',
    alt: 'Close detail of a dark corporate tower facade with lit interiors visible through the glass',
    focal: '50% 50%',
  },
  {
    name: 'towers-mono',
    alt: 'Dense cluster of corporate towers photographed from below in near-monochrome light',
    focal: '50% 40%',
  },
  {
    name: 'district-dusk',
    alt: 'International financial district towers standing against a heavy dusk sky',
    focal: '50% 45%',
  },
];

/** Advisory-specific composition: sticky image following an accordion. */
export function AdvisoryThemes({ themes }: { themes: ServiceTheme[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const m = media[active % media.length];

  return (
    <section
      className="relative overflow-hidden bg-ink text-bone"
      aria-labelledby="advisory-themes"
    >
      <div
        aria-hidden
        className="precision-grid precision-grid-fade pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="shell-wide relative z-10 section">
        <div className="grid gap-[clamp(2.5rem,6vw,4rem)] lg:grid-cols-12 lg:gap-12">
          {/* Sticky media */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[8rem]">
              <Reveal>
                <div className="media relative aspect-[4/5] w-full">
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={m.name}
                      className="absolute inset-0"
                      initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.95, ease: EASE }}
                    >
                      <Picture
                        name={m.name}
                        alt={m.alt}
                        sizes="(min-width:1024px) 40vw, 100vw"
                        focal={m.focal}
                        className="h-full w-full"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-5 max-w-[36ch] text-[0.78rem] font-light leading-relaxed text-bone/35">
                  Imagery is illustrative. No photograph on this site depicts a
                  principal of the firm.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
              <p className="t-label text-gold">Advisory Perspective</p>
            </Reveal>

            <h2 id="advisory-themes" className="t-h2 mt-7 max-w-[16ch] text-bone">
              <MaskedLines lines={['What the counsel', 'actually covers.']} />
            </h2>

            <div className="mt-[clamp(2rem,4vw,3rem)]">
              <Accordion
                items={themes.map((t) => ({
                  label: t.label,
                  title: t.title,
                  body: t.body,
                }))}
                tone="dark"
                onChange={setActive}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
