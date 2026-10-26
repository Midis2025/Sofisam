'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import { services } from '@/data/services';
import { servicesIntro } from '@/data/site';
import { Picture } from '@/components/ui/Picture';

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Services"
      id="expertise"
      className="relative bg-[var(--void)] py-16 sm:py-20 lg:py-24 border-b border-[var(--line-soft)]"
      aria-labelledby="expertise-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--brass)]" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                {servicesIntro.eyebrow}
              </p>
            </div>
            <h2
              id="expertise-heading"
              className="mt-3 font-display text-[clamp(2.1rem,3.2vw,3rem)] font-light tracking-[-0.02em] text-[var(--ivory)]"
            >
              {servicesIntro.heading}
            </h2>
          </div>
          <p className="max-w-[42ch] text-sm leading-relaxed text-[var(--sage)]">
            {servicesIntro.standfirst}
          </p>
        </div>

        {/* Desktop Interactive Layout (lg+) */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-12 lg:gap-12 items-stretch">
          {/* Services List Column */}
          <div className="lg:col-span-7 flex flex-col justify-between divide-y divide-[var(--line)]">
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <div
                  key={s.slug}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative p-7 transition-all duration-300 cursor-pointer rounded-[var(--r-md)] ${
                    isActive
                      ? 'bg-[var(--plate)] shadow-[var(--shadow-pill)]'
                      : 'hover:bg-[var(--plate)]/40'
                  }`}
                >
                  {/* Subtle Gold Indicator Line */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--brass)] transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
                    }`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-semibold text-[var(--brass)]">
                        {s.index}
                      </span>
                      <h3
                        className={`font-display text-2xl tracking-tight transition-colors duration-300 ${
                          isActive
                            ? 'font-normal text-[var(--ivory)]'
                            : 'font-light text-[var(--sage)] group-hover:text-[var(--ivory)]'
                        }`}
                      >
                        {s.title}
                      </h3>
                    </div>

                    <Link
                      href={`/services/${s.slug}`}
                      aria-label={`Explore ${s.title}`}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                        isActive
                          ? 'text-[var(--gold)] translate-x-0'
                          : 'text-[var(--stone)] group-hover:text-[var(--ivory)] -translate-x-1 opacity-70 group-hover:opacity-100'
                      }`}
                    >
                      <span>Explore</span>
                      <ArrowUpRight
                        aria-hidden
                        strokeWidth={1.5}
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>

                  <p
                    className={`mt-3.5 text-sm leading-relaxed transition-colors duration-300 max-w-[54ch] ${
                      isActive ? 'text-[var(--ivory-2)]' : 'text-[var(--sage)]'
                    }`}
                  >
                    {s.sourceSummary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Smoothly Crossfading Plate with Slight Scale */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative h-full min-h-[24rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--graphite)] shadow-[var(--shadow-plate)]">
              {services.map((s, i) => {
                const isSelected = active === i;
                return (
                  <div
                    key={s.slug}
                    aria-hidden={!isSelected}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${
                      isSelected
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-[1.02] z-0 pointer-events-none'
                    }`}
                  >
                    <Picture
                      name={s.hero.image}
                      alt={s.hero.imageAlt}
                      sizes="40vw"
                      focal={s.hero.focal}
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                      <p className="text-xs uppercase tracking-widest text-[#e8c89b] font-medium">
                        Service {s.index} · Practice Area
                      </p>
                      <h4 className="mt-1 font-display text-2xl text-white font-light">
                        {s.title}
                      </h4>
                      <p className="mt-2 text-xs text-white/80 line-clamp-2 leading-relaxed">
                        {s.navDescription}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Accordion (< lg) */}
        <div className="mt-8 space-y-4 lg:hidden">
          {services.map((s, i) => {
            const isExpanded = mobileExpanded === i;
            return (
              <div
                key={s.slug}
                className="overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)]"
              >
                <button
                  type="button"
                  onClick={() => setMobileExpanded(isExpanded ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-[var(--brass)]">
                      {s.index}
                    </span>
                    <h3 className="font-display text-lg text-[var(--ivory)] font-medium">
                      {s.title}
                    </h3>
                  </div>
                  <ChevronDown
                    aria-hidden
                    className={`h-4 w-4 text-[var(--stone)] transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-[var(--brass)]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden border-t border-[var(--line)]"
                    >
                      <div className="relative aspect-[16/9] w-full bg-[var(--graphite)]">
                        <Picture
                          name={s.hero.image}
                          alt={s.hero.imageAlt}
                          sizes="100vw"
                          focal={s.hero.focal}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-xs leading-relaxed text-[var(--sage)]">
                          {s.sourceSummary}
                        </p>
                        <Link
                          href={`/services/${s.slug}`}
                          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] hover:underline"
                        >
                          <span>Explore {s.title}</span>
                          <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
