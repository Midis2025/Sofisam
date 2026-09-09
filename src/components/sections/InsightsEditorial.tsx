'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { featuredInsight, secondaryInsights } from '@/data/insights';
import { insightsIntro } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';

/**
 * 08 — Insights.
 *
 * A catalogue composition: one dominant featured card beside two supporting
 * cards. Titles, categories, dates, reading times and summaries are the source
 * site's, unchanged.
 */
export function InsightsEditorial() {
  return (
    <section id="insights" className="rd-section rd-paper" aria-labelledby="insights-heading">
      <div className="rd-shell">
        <div className="rd-head">
          <div>
            <Reveal kind="label" className="rd-kicker">
              <p className="rd-label">{insightsIntro.eyebrow}</p>
            </Reveal>
            <h2
              id="insights-heading"
              className="rd-display rd-head-title mt-[clamp(1.25rem,2.6vw,2.25rem)] text-[var(--rd-ink)]"
            >
              <MaskedLines lines={[insightsIntro.heading]} />
            </h2>
          </div>

          <div className="lg:pb-2">
            <Reveal delay={0.1}>
              <p className="rd-body rd-head-note text-[var(--rd-stone)]">
                {insightsIntro.standfirst}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <Link
                href="/insights"
                className="group rd-cta mt-5 text-[var(--rd-ink)] hover:text-[var(--rd-accent-deep)]"
              >
                <span className="link-underline">All insights</span>
                <ArrowUpRight aria-hidden strokeWidth={1.5} className="rd-arrow h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="mt-[var(--rd-pad-sm)] grid gap-[clamp(0.875rem,1.4vw,1.25rem)] lg:grid-cols-12">
          {/* Featured */}
          <Reveal as="article" className="lg:col-span-7">
            <Link
              href={`/insights/${featuredInsight.slug}`}
              className="group rd-card rd-lift flex h-full flex-col p-[clamp(1.25rem,2.2vw,2rem)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="rd-label text-[var(--rd-accent-ink)]">Featured</span>
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--rd-line)] text-[var(--rd-stone)] transition-colors duration-500 ease-premium group-hover:border-[var(--rd-accent)] group-hover:bg-[var(--rd-accent)] group-hover:text-[var(--rd-ink)]"
                >
                  <ArrowUpRight strokeWidth={1.4} className="rd-arrow h-4 w-4" />
                </span>
              </div>

              <div className="rd-media rd-media-in rd-media-zoom mt-[clamp(1.25rem,2vw,1.75rem)] aspect-[16/10] w-full lg:aspect-[4/3]">
                <Picture
                  name={featuredInsight.image}
                  alt={featuredInsight.imageAlt}
                  sizes="(min-width:1024px) 54vw, 100vw"
                  focal={featuredInsight.focal}
                  className="h-full w-full"
                />
              </div>

              <div className="rd-slash rd-meta mt-[clamp(1.25rem,2vw,1.75rem)] text-[var(--rd-stone)]">
                <span className="rd-label text-[var(--rd-accent-ink)]">
                  {featuredInsight.category}
                </span>
                <time dateTime={featuredInsight.isoDate}>{featuredInsight.date}</time>
                <span>{featuredInsight.readingTime}</span>
              </div>

              <h3 className="rd-h2 mt-4 max-w-[18ch] text-[var(--rd-ink)] transition-colors duration-500 group-hover:text-[var(--rd-accent-deep)]">
                {featuredInsight.title}
              </h3>

              <p className="rd-body mt-4 max-w-[46ch] text-[var(--rd-stone)]">
                {featuredInsight.summary}
              </p>

              <span className="rd-cta mt-auto pt-6 text-[var(--rd-ink)] group-hover:text-[var(--rd-accent-deep)]">
                <span className="link-underline">Read the piece</span>
              </span>
            </Link>
          </Reveal>

          {/* Supporting */}
          <div className="grid gap-[clamp(0.875rem,1.4vw,1.25rem)] lg:col-span-5">
            {secondaryInsights.map((item, i) => (
              <Reveal as="article" key={item.slug} delay={0.06 + i * 0.06}>
                <Link
                  href={`/insights/${item.slug}`}
                  className="group rd-tile rd-lift flex h-full flex-col p-[clamp(1rem,1.6vw,1.35rem)] sm:flex-row sm:items-center sm:gap-[clamp(1rem,1.6vw,1.5rem)] lg:flex-col lg:items-stretch"
                >
                  <div className="rd-media rd-media-in rd-media-zoom aspect-[16/10] w-full shrink-0 sm:aspect-square sm:w-[10rem] lg:aspect-[16/9] lg:w-full">
                    <Picture
                      name={item.image}
                      alt={item.imageAlt}
                      sizes="(min-width:1024px) 34vw, (min-width:640px) 10rem, 100vw"
                      focal={item.focal}
                      className="h-full w-full"
                    />
                  </div>

                  <div className="mt-4 min-w-0 sm:mt-0 lg:mt-[clamp(1rem,1.6vw,1.35rem)]">
                    <div className="rd-slash rd-meta text-[var(--rd-stone)]">
                      <span className="rd-label text-[var(--rd-accent-ink)]">{item.category}</span>
                      <time dateTime={item.isoDate}>{item.date}</time>
                      <span>{item.readingTime}</span>
                    </div>

                    <h3 className="rd-h3 mt-3 max-w-[24ch] text-[var(--rd-ink)] transition-colors duration-500 group-hover:text-[var(--rd-accent-deep)]">
                      {item.title}
                    </h3>

                    <p className="rd-small mt-3 max-w-[46ch] text-[var(--rd-stone)]">
                      {item.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
