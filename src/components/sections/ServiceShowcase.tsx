'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronDown, Layers, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import { services } from '@/data/services';
import { servicesIntro } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';

const EASE = [0.16, 1, 0.3, 1] as const;

const serviceFeatures = [
  ['Unconflicted Judgement', 'Market Discretion', 'Critical Commitments'],
  ['Executive Governance', 'Boardroom Vantage', 'Decades of Leadership'],
  ['Mandate Frameworks', 'Investment Architecture', 'Cross-Border Durability'],
];

const serviceIcons = [Shield, Sparkles, Layers];

/**
 * SOFISAM Services & Expertise Showcase
 *
 * Each discipline has a distinctive visual and functional identity:
 * - 01 Strategic Consulting (Judgement & Confidentiality)
 * - 02 Corporate Advisory (Executive Counsel & Governance)
 * - 03 Structuring (Frameworks & Mandates)
 * - Interactive multi-level selector with smooth crossfading media plates
 * - Mobile accordion with full context disclosure
 */
export function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Services"
      id="expertise"
      className="relative bg-[var(--void)] py-20 sm:py-24 lg:py-28 border-b border-[var(--line-soft)]"
      aria-labelledby="expertise-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <SectionHeader
          ruled
          label={servicesIntro.eyebrow}
          heading={servicesIntro.heading}
          headingId="expertise-heading"
          copy={servicesIntro.standfirst}
        />

        {/* Desktop Interactive Layout (lg+) */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-12 lg:gap-14 items-stretch">
          {/* Services Selector Column (Left 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {services.map((s, i) => {
              const isActive = active === i;
              const Icon = serviceIcons[i] || Shield;
              const tags = serviceFeatures[i] || [];

              return (
                <div
                  key={s.slug}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative p-8 transition-all duration-300 cursor-pointer rounded-[var(--r-lg)] border ${
                    isActive
                      ? 'border-[var(--line-strong)] bg-[var(--plate)] shadow-[var(--shadow-plate)]'
                      : 'border-transparent bg-transparent hover:bg-[var(--plate)]/40 hover:border-[var(--line-soft)]'
                  }`}
                >
                  {/* Gold Left Highlight Marker */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-6 bottom-6 w-[3px] bg-[var(--brass)] transition-all duration-300 rounded-r ${
                      isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
                    }`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        className={`t-card transition-colors duration-300 ${
                          isActive
                            ? 'text-[var(--ivory)] font-medium'
                            : 'text-[var(--sage)] group-hover:text-[var(--ivory)]'
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
                    className={`mt-4 text-sm leading-relaxed transition-colors duration-300 max-w-[54ch] ${
                      isActive ? 'text-[var(--ivory-2)]' : 'text-[var(--sage)]'
                    }`}
                  >
                    {s.sourceSummary}
                  </p>

                  {/* Distinct Thematic Feature Tags */}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.6875rem] uppercase tracking-wider rounded-[var(--r-sm)] border transition-colors ${
                          isActive
                            ? 'border-[var(--line)] bg-[var(--void)] text-[var(--gold)]'
                            : 'border-transparent bg-[var(--line-soft)] text-[var(--stone)]'
                        }`}
                      >
                        <CheckCircle2 className="h-2.5 w-2.5 text-[var(--brass)]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Crossfading Preview Media Plate (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative h-full min-h-[26rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--graphite)] shadow-[var(--shadow-plate)]">
              {services.map((s, i) => {
                const isSelected = active === i;
                return (
                  <div
                    key={s.slug}
                    aria-hidden={!isSelected}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isSelected
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-105 z-0 pointer-events-none'
                    }`}
                  >
                    <Picture
                      name={s.hero.image}
                      alt={s.hero.imageAlt}
                      sizes="45vw"
                      focal={s.hero.focal}
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white z-10">
                      <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-widest text-[#e8c89b] font-mono">
                          Core Discipline
                        </p>
                        <span className="text-xs text-white/60">SOFISAM FZCO</span>
                      </div>
                      <h4 className="mt-2 font-display text-2xl text-white font-light">
                        {s.title}
                      </h4>
                      <p className="mt-2 text-xs text-white/80 leading-relaxed max-w-[34ch]">
                        {s.navDescription}
                      </p>
                      <Button
                        variant="link"
                        tone="light"
                        href={`/services/${s.slug}`}
                        className="mt-5"
                      >
                        Detailed Overview
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Accordion Layout (< lg) */}
        <div className="mt-8 space-y-4 lg:hidden">
          {services.map((s, i) => {
            const isExpanded = mobileExpanded === i;
            const tags = serviceFeatures[i] || [];

            return (
              <div
                key={s.slug}
                className="overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)]"
              >
                <button
                  type="button"
                  onClick={() => setMobileExpanded(isExpanded ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <div>
                    <h3 className="t-card text-[var(--ivory)] font-medium">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-6">
                        <p className="t-small text-[var(--sage)] leading-relaxed">
                          {s.sourceSummary}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 text-[0.625rem] uppercase tracking-wider rounded border border-[var(--line)] text-[var(--stone)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-[var(--line)]">
                          <Button
                            variant="link"
                            href={`/services/${s.slug}`}
                          >
                            Explore {s.title}
                          </Button>
                        </div>
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
