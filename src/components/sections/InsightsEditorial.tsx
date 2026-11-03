'use client';

import Link from 'next/link';
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { insights } from '@/data/insights';
import { insightsIntro } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Button } from '@/components/ui/Button';
import { MaskedLines } from '@/components/animations/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * SOFISAM Insights & Strategic Perspectives
 *
 * Editorial magazine layout:
 * - Featured lead analysis with full-spread visual plate and excerpt
 * - Curated secondary perspectives in clean editorial cards
 * - Metadata badges (Category · Reading Time · Date)
 * - Refined hover states with subtle image expansion and gold highlights
 */
export function InsightsEditorial() {
  const reduce = useReducedMotion();
  const featured = insights[0];
  const secondary = insights.slice(1, 3);

  return (
    <section
      data-section="Insights"
      id="insights"
      className="relative bg-[var(--char)] py-20 sm:py-24 lg:py-28 border-b border-[var(--line-soft)]"
      aria-labelledby="insights-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[var(--line)]">
          <div>
            <div className="kicker">
              <p className="t-label">
                {insightsIntro.eyebrow}
              </p>
            </div>
            <h2
              id="insights-heading"
              className="mt-eyebrow t-h2 text-[var(--ivory)] font-light leading-[1.08]"
            >
              <MaskedLines lines={['Perspectives on global markets', 'and governance.']} />
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="max-w-[42ch] t-body text-[var(--sage)] hidden sm:block leading-relaxed">
              {insightsIntro.standfirst}
            </p>
            <Button variant="link" href="/insights" className="whitespace-nowrap">
              All Perspectives
            </Button>
          </div>
        </div>

        {/* Editorial Layout: Featured (Left 7 Cols) + Secondary (Right 5 Cols) */}
        {/* Both columns share one row height on lg: the featured image flexes
            to take what the text leaves, so neither column trails empty. */}
        <div className="mt-12 grid gap-8 xl:grid-cols-12 xl:gap-10 xl:items-stretch">
          {/* Featured Article */}
          {featured && (
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.75, ease: EASE }}
              className="xl:col-span-7 flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)] group transition-all duration-300 hover:border-[var(--line-strong)]"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] xl:aspect-auto xl:flex-1 xl:min-h-[17rem] w-full overflow-hidden bg-[var(--graphite)]">
                <Picture
                  name={featured.image}
                  alt={featured.imageAlt}
                  sizes="(min-width: 1280px) 58vw, 100vw"
                  focal={featured.focal}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                />
                <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-[var(--r-sm)] border border-white/20">
                  Featured Perspective
                </span>
              </div>

              <div className="flex flex-col p-6 sm:p-8 lg:p-9">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[var(--gold)]">
                    {featured.category}
                  </span>
                  <span className="text-[var(--line-strong)]">·</span>
                  <time dateTime={featured.isoDate} className="text-[var(--stone)] font-mono">
                    {featured.date}
                  </time>
                  <span className="text-[var(--line-strong)]">·</span>
                  <span className="text-[var(--stone)] flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {featured.readingTime}
                  </span>
                </div>

                <h3 className="mt-3.5 font-display text-2xl sm:text-3xl font-light text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors leading-snug">
                  <Link href={`/insights/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h3>

                <p className="mt-3 t-body text-[var(--sage)] leading-relaxed">
                  {featured.summary}
                </p>

                {/* Flexible breathing space & Bottom metadata */}
                <div className="mt-6 sm:mt-8 pt-5 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="text-xs text-[var(--stone)] uppercase tracking-wider">
                    Executive Analysis
                  </span>
                  <Button variant="link" href={`/insights/${featured.slug}`}>
                    Read Full Piece
                  </Button>
                </div>
              </div>
            </motion.article>
          )}

          {/* Secondary Articles Column */}
          <div className="xl:col-span-5 grid gap-6 lg:grid-cols-2 xl:flex xl:flex-col">
            {secondary.map((item, i) => (
              <motion.article
                key={item.slug}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.15 + i * 0.1 }}
                className="xl:flex-1 flex flex-col sm:flex-row overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] group transition-all duration-300 hover:border-[var(--line-strong)] hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] sm:aspect-auto sm:w-44 sm:min-h-[10rem] lg:w-40 shrink-0 overflow-hidden bg-[var(--graphite)]">
                  <Picture
                    name={item.image}
                    alt={item.imageAlt}
                    sizes="(min-width: 1280px) 15vw, (min-width: 640px) 25vw, 100vw"
                    focal={item.focal}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:hidden" />
                  <span className="absolute bottom-3 left-3 text-xs uppercase tracking-wider text-white bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded sm:hidden">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[var(--stone)] font-mono">
                      <span className="text-[var(--gold)] font-semibold uppercase hidden sm:inline">{item.category}</span>
                      <span className="hidden sm:inline">·</span>
                      <time dateTime={item.isoDate}>{item.date}</time>
                      <span>·</span>
                      <span>{item.readingTime}</span>
                    </div>

                    <h3 className="mt-2.5 font-display text-lg sm:text-xl font-light text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors leading-snug">
                      <Link href={`/insights/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>

                    <p className="mt-2 t-small text-[var(--sage)] line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs">
                    <span className="text-[0.6875rem] text-[var(--stone)] uppercase tracking-wider">Advisory Reading</span>
                    <Button variant="link" size="sm" href={`/insights/${item.slug}`}>
                      Read
                    </Button>
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
