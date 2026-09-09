'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { services } from '@/data/services';
import { servicesIntro } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';

/**
 * 02 — Our Expertise.
 *
 * A modular, deliberately uneven tile grid rather than three matching cards:
 * a large lead tile carrying imagery, a tinted counterpart, a third discipline
 * and one purely visual plate. Every string — index, title, summary and the
 * Explore link — is the source site's own.
 */

/** Shared index line: position in the set, then the section label. */
function TileIndex({ index, arrowTone }: { index: string; arrowTone: 'light' | 'dark' }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-baseline gap-2">
        <span className="rd-num text-[0.95rem] text-[var(--rd-accent-ink)]">{index}</span>
        <span className="rd-meta text-[0.7rem] text-[var(--rd-stone)]">/ 03</span>
        <span className="rd-label ml-1 text-[0.66rem] text-[var(--rd-stone)]">— Expertise</span>
      </div>

      <span
        aria-hidden
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ease-premium ${
          arrowTone === 'dark'
            ? 'border-bone/25 text-bone group-hover:border-[var(--rd-accent)] group-hover:bg-[var(--rd-accent)] group-hover:text-[var(--rd-ink)]'
            : 'border-[var(--rd-line)] text-[var(--rd-stone)] group-hover:border-[var(--rd-accent)] group-hover:bg-[var(--rd-accent)] group-hover:text-[var(--rd-ink)]'
        }`}
      >
        <ArrowUpRight strokeWidth={1.4} className="rd-arrow h-4 w-4" />
      </span>
    </div>
  );
}

export function ExpertiseSequence() {
  const [lead, second, third] = services;

  return (
    <section id="expertise" className="rd-section rd-paper" aria-labelledby="expertise-heading">
      <div className="rd-shell">
        {/* Compact section header: statement and standfirst share a baseline
            rather than sitting in a half-empty band of their own. */}
        <div className="rd-head">
          <div>
            <Reveal kind="label" className="rd-kicker">
              <p className="rd-label">{servicesIntro.eyebrow}</p>
            </Reveal>
            <h2
              id="expertise-heading"
              className="rd-display mt-[clamp(1rem,2vw,1.75rem)] text-[var(--rd-ink)]"
            >
              <MaskedLines lines={[servicesIntro.heading]} />
            </h2>
          </div>

          <Reveal kind="body" delay={0.1} className="lg:pb-3">
            <p className="rd-body rd-head-note text-[var(--rd-stone)]">
              {servicesIntro.standfirst}
            </p>
          </Reveal>
        </div>

        {/* Tile grid */}
        <ul className="mt-[var(--rd-pad-sm)] grid gap-[clamp(0.875rem,1.4vw,1.25rem)] lg:grid-cols-12">
          {/* Lead discipline — the only tile carrying imagery */}
          <Reveal as="li" className="lg:col-span-7">
            <Link
              href={`/services/${lead.slug}`}
              className="group rd-card rd-lift flex h-full flex-col p-[clamp(1.25rem,2.2vw,2rem)]"
            >
              <TileIndex index={lead.index} arrowTone="light" />

              <div className="rd-media rd-media-in rd-media-zoom mt-[clamp(1.25rem,2vw,1.75rem)] aspect-[16/10] w-full">
                <Picture
                  name={lead.hero.image}
                  alt={lead.hero.imageAlt}
                  sizes="(min-width:1024px) 54vw, 100vw"
                  focal={lead.hero.focal}
                  className="h-full w-full"
                />
              </div>

              <h3 className="rd-h2 mt-[clamp(1.25rem,2vw,1.75rem)] text-[var(--rd-ink)] transition-colors duration-500 group-hover:text-[var(--rd-accent-deep)]">
                {lead.title}
              </h3>

              <p className="rd-body mt-4 max-w-[48ch] text-[var(--rd-stone)]">
                {lead.sourceSummary}
              </p>

              <span className="rd-cta mt-auto pt-6 text-[var(--rd-ink)] group-hover:text-[var(--rd-accent-deep)]">
                <span className="link-underline">Explore {lead.title}</span>
              </span>
            </Link>
          </Reveal>

          {/* Second discipline — tinted, typography-led */}
          <Reveal as="li" delay={0.06} className="lg:col-span-5">
            <Link
              href={`/services/${second.slug}`}
              className="group rd-tile rd-lift flex h-full flex-col p-[clamp(1.25rem,2.2vw,2rem)]"
            >
              <TileIndex index={second.index} arrowTone="light" />

              <div className="my-auto py-[clamp(2rem,3.5vw,3.5rem)]">
                <h3 className="rd-h2 text-[var(--rd-ink)] transition-colors duration-500 group-hover:text-[var(--rd-accent-deep)]">
                  {second.title}
                </h3>

                <p className="rd-body mt-4 max-w-[38ch] text-[var(--rd-stone)]">
                  {second.sourceSummary}
                </p>
              </div>

              <span className="rd-cta pt-6 text-[var(--rd-ink)] group-hover:text-[var(--rd-accent-deep)]">
                <span className="link-underline">Explore {second.title}</span>
              </span>
            </Link>
          </Reveal>

          {/* Third discipline */}
          <Reveal as="li" delay={0.1} className="lg:col-span-5">
            <Link
              href={`/services/${third.slug}`}
              className="group rd-card rd-lift flex h-full flex-col p-[clamp(1.25rem,2.2vw,2rem)]"
            >
              <TileIndex index={third.index} arrowTone="light" />

              <div className="my-auto py-[clamp(2rem,3.5vw,3.5rem)]">
                <h3 className="rd-h2 text-[var(--rd-ink)] transition-colors duration-500 group-hover:text-[var(--rd-accent-deep)]">
                  {third.title}
                </h3>

                <p className="rd-body mt-4 max-w-[38ch] text-[var(--rd-stone)]">
                  {third.sourceSummary}
                </p>
              </div>

              <span className="rd-cta pt-6 text-[var(--rd-ink)] group-hover:text-[var(--rd-accent-deep)]">
                <span className="link-underline">Explore {third.title}</span>
              </span>
            </Link>
          </Reveal>

          {/* Visual counterweight — imagery only, no copy of its own */}
          <Reveal as="li" delay={0.14} className="hidden sm:block lg:col-span-7">
            <div className="rd-media h-full min-h-[16rem] w-full">
              <Picture
                name="tower-detail"
                alt=""
                decorative
                sizes="(min-width:1024px) 54vw, 100vw"
                focal="50% 50%"
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
