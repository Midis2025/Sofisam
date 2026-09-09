'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { services } from '@/data/services';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';

/**
 * Services landing composition: an editorial header, a compact index, then one
 * modular row per discipline — a large image plate paired with an information
 * card, alternating side. Every string is the source site's own.
 */
export function ServicePanels() {
  return (
    <section className="rd-section rd-paper" aria-labelledby="services-panels">
      <div className="rd-shell">
        {/* Header */}
        <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-end lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
          <div className="lg:col-span-7">
            <Reveal className="rd-kicker">
              <p className="rd-label">Three Disciplines</p>
            </Reveal>

            <h2
              id="services-panels"
              className="rd-h2 mt-[clamp(1.25rem,2.6vw,2rem)] max-w-[13ch] text-[var(--rd-ink)]"
            >
              <MaskedLines lines={['One standard', 'of judgement,', 'three forms.']} />
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <Reveal delay={0.12}>
              <p className="rd-body max-w-[40ch] text-[var(--rd-stone)]">
                Consulting, advisory and structuring are separate practices, but
                they are not separate opinions. Whichever one an engagement
                begins in, the reasoning behind it is the same.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Compact index */}
        <Reveal delay={0.16}>
          <ul className="mt-[var(--rd-pad-sm)] hidden grid-cols-3 gap-[clamp(0.875rem,1.4vw,1.25rem)] lg:grid">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group rd-card rd-lift flex items-baseline justify-between gap-4 px-6 py-5"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="rd-num text-[0.72rem] text-[var(--rd-accent-ink)]">
                      {s.index}
                    </span>
                    <span className="rd-h4 text-[var(--rd-ink)] transition-colors duration-500 group-hover:text-[var(--rd-accent-deep)]">
                      {s.title}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.4}
                    className="rd-arrow h-4 w-4 shrink-0 text-[var(--rd-stone)] transition-colors group-hover:text-[var(--rd-accent-ink)]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Modular rows */}
        <ol className="mt-[clamp(0.875rem,1.4vw,1.25rem)] space-y-[clamp(0.875rem,1.4vw,1.25rem)]">
          {services.map((s, i) => {
            const flipped = i % 2 === 1;
            return (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group block">
                  <div className="grid gap-[clamp(0.875rem,1.4vw,1.25rem)] lg:grid-cols-12 lg:items-stretch">
                    <ImageReveal
                      delay={0.05}
                      className={
                        flipped
                          ? 'lg:col-span-7 lg:col-start-6 lg:row-start-1'
                          : 'lg:col-span-7'
                      }
                    >
                      <div className="rd-media rd-media-zoom aspect-[16/11] h-full w-full sm:aspect-[16/9] lg:aspect-auto lg:min-h-[26rem]">
                        <Picture
                          name={s.hero.image}
                          alt={s.hero.imageAlt}
                          sizes="(min-width:1024px) 58vw, 100vw"
                          focal={s.hero.focal}
                          priority={i === 0}
                          className="h-full w-full"
                        />
                      </div>
                    </ImageReveal>

                    <div
                      className={
                        flipped
                          ? 'lg:col-span-5 lg:col-start-1 lg:row-start-1'
                          : 'lg:col-span-5'
                      }
                    >
                      <Reveal
                        delay={0.08}
                        className={`${
                          flipped ? 'rd-tile' : 'rd-card'
                        } rd-lift flex h-full flex-col p-[clamp(1.25rem,2.2vw,2rem)]`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-baseline gap-3">
                            <span className="rd-num text-[clamp(1.2rem,2vw,1.6rem)] text-[var(--rd-accent-ink)]">
                              {s.index}
                            </span>
                            <span className="rd-label text-[var(--rd-stone)]">Expertise</span>
                          </div>

                          <span
                            aria-hidden
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--rd-line)] text-[var(--rd-stone)] transition-colors duration-500 ease-premium group-hover:border-[var(--rd-accent)] group-hover:bg-[var(--rd-accent)] group-hover:text-[var(--rd-ink)]"
                          >
                            <ArrowUpRight strokeWidth={1.4} className="rd-arrow h-4 w-4" />
                          </span>
                        </div>

                        <h3 className="rd-h2 mt-[clamp(1.5rem,2.6vw,2.5rem)] text-[var(--rd-ink)] transition-colors duration-500 group-hover:text-[var(--rd-accent-deep)]">
                          {s.title}
                        </h3>

                        <p className="rd-lead mt-4 max-w-[40ch] text-[var(--rd-ink)]">
                          {s.sourceSummary}
                        </p>

                        <p className="rd-small mt-4 max-w-[44ch] text-[var(--rd-stone)]">
                          {s.intro.lead}
                        </p>

                        <span className="rd-cta mt-auto pt-6 text-[var(--rd-ink)] group-hover:text-[var(--rd-accent-deep)]">
                          <span className="link-underline">Explore {s.title}</span>
                        </span>
                      </Reveal>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
