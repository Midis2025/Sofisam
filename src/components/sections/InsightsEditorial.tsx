'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { insights } from '@/data/insights';
import { insightsIntro } from '@/data/site';
import { Picture } from '@/components/ui/Picture';

const EASE = [0.16, 1, 0.3, 1] as const;

export function InsightsEditorial() {
  const reduce = useReducedMotion();
  const featured = insights[0];
  const secondary = insights.slice(1, 3);

  return (
    <section
      data-section="Insights"
      id="insights"
      className="relative bg-[var(--char)] py-20 lg:py-28 border-b border-[var(--line-soft)]"
      aria-labelledby="insights-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--brass)]" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                {insightsIntro.eyebrow}
              </p>
            </div>
            <h2
              id="insights-heading"
              className="mt-4 font-display text-[clamp(2.1rem,3.2vw,3rem)] font-light tracking-[-0.02em] text-[var(--ivory)]"
            >
              {insightsIntro.heading}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="max-w-[40ch] text-sm leading-relaxed text-[var(--sage)] hidden sm:block">
              {insightsIntro.standfirst}
            </p>
            <Link
              href="/insights"
              className="group inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[var(--ivory)] hover:text-[var(--gold)] transition-colors whitespace-nowrap"
            >
              <span>All Insights</span>
              <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Editorial Layout: Featured Insight (Left 7 Cols) + 2 Secondary Insights (Right 5 Cols) */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Featured Article */}
          {featured && (
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.75, ease: EASE }}
              className="lg:col-span-7 flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)] group"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[var(--graphite)]">
                <Picture
                  name={featured.image}
                  alt={featured.imageAlt}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  focal={featured.focal}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                />
                <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-[var(--r-sm)]">
                  Featured Perspective
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
                <div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[var(--gold)]">
                      {featured.category}
                    </span>
                    <span className="text-[var(--line-strong)]">·</span>
                    <time dateTime={featured.isoDate} className="text-[var(--stone)]">
                      {featured.date}
                    </time>
                    <span className="text-[var(--line-strong)]">·</span>
                    <span className="text-[var(--stone)]">{featured.readingTime}</span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl sm:text-3xl font-light text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                    <Link href={`/insights/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--sage)]">
                    {featured.summary}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="text-xs text-[var(--stone)]">Strategic Advisory Analysis</span>
                  <Link
                    href={`/insights/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          )}

          {/* Secondary Articles Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {secondary.map((item, i) => (
              <motion.article
                key={item.slug}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.15 + i * 0.1 }}
                className="flex flex-col sm:flex-row lg:flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] group transition-all hover:border-[var(--line-strong)]"
              >
                <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/8] sm:w-2/5 lg:w-full overflow-hidden bg-[var(--graphite)]">
                  <Picture
                    name={item.image}
                    alt={item.imageAlt}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    focal={item.focal}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold uppercase tracking-wider text-[var(--gold)]">
                        {item.category}
                      </span>
                      <span className="text-[var(--line-strong)]">·</span>
                      <time dateTime={item.isoDate} className="text-[var(--stone)]">
                        {item.date}
                      </time>
                    </div>

                    <h3 className="mt-3 font-display text-xl font-light text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                      <Link href={`/insights/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-[var(--sage)] line-clamp-2">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[var(--line)] flex items-center justify-between">
                    <span className="text-xs text-[var(--stone)]">{item.readingTime}</span>
                    <Link
                      href={`/insights/${item.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
                    >
                      <span>Read</span>
                      <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
