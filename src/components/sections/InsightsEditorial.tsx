'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { featuredInsight, secondaryInsights } from '@/data/insights';
import { insightsIntro } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal, ImageReveal } from '@/components/animations/Reveal';
import { SplitText } from '@/components/animations/SplitText';

/**
 * Insights.
 *
 * An institutional research index rather than a row of cards: one dominant
 * piece carried on a wide plate, then the remainder set as an open catalogue
 * with a plate, a meta line and a title on each row. Hover brings the image
 * forward and pulls the row toward the rule.
 *
 * Titles, categories, dates, reading times and summaries are the source site's,
 * unchanged.
 */
export function InsightsEditorial() {
  return (
    <section data-section="Insights" id="insights" className="section ground-graphite" aria-labelledby="insights-heading">
      <div className="shell">
        <div className="head">
          <div>
            <Reveal kind="label" className="kicker">
              <p className="t-label">{insightsIntro.eyebrow}</p>
            </Reveal>
            <SplitText
              as="h2"
              text={insightsIntro.heading}
              className="t-display head-title mt-[clamp(1.25rem,2.6vw,2.25rem)] text-ivory"
              stagger={0.06}
            />
          </div>

          <div className="lg:pb-2">
            <Reveal delay={0.1}>
              <p className="t-body head-note text-sage">{insightsIntro.standfirst}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <Link href="/insights" className="group cta mt-6 text-ivory hover:text-gold">
                <span className="link-underline">All insights</span>
                <ArrowUpRight aria-hidden strokeWidth={1.5} className="arrow h-3.5 w-3.5" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* The featured piece, on a raised surface */}
        <article className="mt-[var(--pad-sm)]">
          <Link
            href={`/insights/${featuredInsight.slug}`}
            className="group surface surface-lift block p-[clamp(0.875rem,1.4vw,1.25rem)]"
          >
            <ImageReveal>
              <div className="media media-in media-zoom relative aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[24/9]">
                <Picture
                  name={featuredInsight.image}
                  alt={featuredInsight.imageAlt}
                  sizes="100vw"
                  focal={featuredInsight.focal}
                  className="h-full w-full"
                />
                <span className="absolute left-5 top-5 z-10">
                  <span className="chip chip-gold bg-void/70 backdrop-blur-xl">
                    Featured
                  </span>
                </span>
              </div>
            </ImageReveal>

            <div className="grid gap-[clamp(1.5rem,3vw,4rem)] p-[clamp(1rem,1.8vw,1.75rem)] pt-[clamp(1.5rem,2.4vw,2rem)] lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Meta
                  category={featuredInsight.category}
                  date={featuredInsight.date}
                  isoDate={featuredInsight.isoDate}
                  readingTime={featuredInsight.readingTime}
                />
                <h3 className="t-h2 mt-5 max-w-[18ch] text-ivory transition-colors duration-500 group-hover:text-gold">
                  {featuredInsight.title}
                </h3>
              </div>

              <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-end lg:pb-1">
                <p className="t-body max-w-[46ch] text-sage">{featuredInsight.summary}</p>
                <span className="mt-7 flex items-center gap-4">
                  <span aria-hidden className="badge badge-lg">
                    <ArrowUpRight strokeWidth={1.3} className="h-5 w-5" />
                  </span>
                  <span className="cta text-ivory group-hover:text-gold">
                    <span className="link-underline">Read the piece</span>
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </article>

        {/* The remainder, as a catalogue of surfaces */}
        <ul className="mt-[clamp(1rem,1.6vw,1.5rem)] grid gap-[clamp(0.75rem,1.2vw,1.1rem)]">
          {secondaryInsights.map((item, i) => (
            <Reveal as="li" key={item.slug} kind="card" delay={i * 0.07}>
              <Link
                href={`/insights/${item.slug}`}
                className="group surface surface-lift grid items-center gap-x-[clamp(1.25rem,2.6vw,3rem)] gap-y-4 p-[clamp(0.875rem,1.4vw,1.25rem)] sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,0.85fr)_auto]"
              >
                <span className="media media-in media-zoom block aspect-[16/10] w-full sm:aspect-[4/3]">
                  <Picture
                    name={item.image}
                    alt=""
                    decorative
                    sizes="(min-width:1024px) 15rem, (min-width:640px) 10rem, 100vw"
                    focal={item.focal}
                    className="h-full w-full"
                  />
                </span>

                <span className="min-w-0 py-2">
                  <Meta
                    category={item.category}
                    date={item.date}
                    isoDate={item.isoDate}
                    readingTime={item.readingTime}
                  />
                  <span className="t-h3 mt-3.5 block max-w-[22ch] text-ivory transition-colors duration-500 group-hover:text-gold">
                    {item.title}
                  </span>
                </span>

                <span className="t-small max-w-[46ch] text-sage sm:col-span-2 lg:col-span-1">
                  {item.summary}
                </span>

                <span aria-hidden className="badge mr-2 hidden justify-self-end lg:inline-flex">
                  <ArrowUpRight strokeWidth={1.3} className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Category / date / reading time, on one hairline-separated line. */
function Meta({
  category,
  date,
  isoDate,
  readingTime,
}: {
  category: string;
  date: string;
  isoDate: string;
  readingTime: string;
}) {
  return (
    <span className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
      <span className="t-label text-gold">{category}</span>
      <span aria-hidden className="h-px w-5 bg-[var(--line)]" />
      <time dateTime={isoDate} className="t-meta text-sage">
        {date}
      </time>
      <span aria-hidden className="h-px w-5 bg-[var(--line)]" />
      <span className="t-meta text-sage">{readingTime}</span>
    </span>
  );
}
