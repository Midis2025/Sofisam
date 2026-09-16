import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Newsletter } from '@/components/sections/Newsletter';
import { CTASection } from '@/components/sections/CTASection';
import { Reveal, ImageReveal } from '@/components/animations/Reveal';
import { insights, featuredInsight, secondaryInsights } from '@/data/insights';
import { insightsIntro } from '@/data/site';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Perspectives on global markets, corporate governance, and strategic investment structuring from SOFISAM FZCO.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Insights | SOFISAM FZCO',
    description:
      'Perspectives on global markets, corporate governance, and strategic investment structuring.',
    url: '/insights',
  },
};

const categories = Array.from(new Set(insights.map((i) => i.category)));

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow={insightsIntro.eyebrow}
        headline={[insightsIntro.heading]}
        standfirst={insightsIntro.standfirst}
        image="city-blue-night"
        imageAlt="Aerial view of a dense international city at night, its financial district lit against the dark"
        focal="50% 55%"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Insights' }]}
      />

      {/* Featured */}
      <section className="section ground-ivory" aria-labelledby="featured-heading">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
            <Reveal kind="label" className="kicker">
              <p className="t-label">Featured Insight</p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="flex flex-wrap items-center gap-2.5">
                {categories.map((c) => (
                  <li
                    key={c}
                    className="chip"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <article className="mt-[var(--pad-sm)]">
            <Link
              href={`/insights/${featuredInsight.slug}`}
              className="group surface surface-lift block p-[clamp(0.875rem,1.4vw,1.25rem)]"
            >
              <ImageReveal>
                <div className="media media-in media-zoom aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[21/9]">
                  <Picture
                    name={featuredInsight.image}
                    alt={featuredInsight.imageAlt}
                    sizes="100vw"
                    focal={featuredInsight.focal}
                    className="h-full w-full"
                  />
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

                  <h2
                    id="featured-heading"
                    className="t-display mt-5 max-w-[16ch] text-ink transition-colors duration-500 group-hover:text-gold-ink"
                  >
                    {featuredInsight.title}
                  </h2>
                </div>

                <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-end lg:pb-1">
                  <p className="t-lead max-w-[44ch] text-stone">{featuredInsight.summary}</p>
                  <span className="mt-7 flex items-center gap-4">
                    <span aria-hidden className="badge badge-lg">
                      <ArrowUpRight strokeWidth={1.3} className="h-5 w-5" />
                    </span>
                    <span className="cta text-ink group-hover:text-gold-ink">
                      <span className="link-underline">Read the piece</span>
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </article>
        </div>
      </section>

      {/* Latest — a catalogue of surfaces */}
      <section className="section ground-ivory-2" aria-labelledby="latest-heading">
        <div className="shell">
          <Reveal kind="label" className="kicker">
            <h2 id="latest-heading" className="t-label">
              Latest
            </h2>
          </Reveal>

          <ul className="mt-[var(--pad-sm)] grid gap-[clamp(0.75rem,1.2vw,1.1rem)]">
            {secondaryInsights.map((item, i) => (
              <Reveal as="li" key={item.slug} kind="card" delay={i * 0.07}>
                <Link
                  href={`/insights/${item.slug}`}
                  className="group surface surface-lift grid items-center gap-x-[clamp(1.25rem,2.6vw,3.5rem)] gap-y-5 p-[clamp(0.875rem,1.4vw,1.25rem)] sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_minmax(0,0.85fr)_auto]"
                >
                  <span className="media media-in media-zoom block aspect-[16/10] w-full sm:aspect-[4/3]">
                    <Picture
                      name={item.image}
                      alt=""
                      decorative
                      sizes="(min-width:1024px) 16rem, (min-width:640px) 10rem, 100vw"
                      focal={item.focal}
                      className="h-full w-full"
                    />
                  </span>

                  <span className="min-w-0">
                    <Meta
                      category={item.category}
                      date={item.date}
                      isoDate={item.isoDate}
                      readingTime={item.readingTime}
                    />
                    <span className="t-h3 mt-4 block max-w-[22ch] text-ink transition-colors duration-500 group-hover:text-gold-ink">
                      {item.title}
                    </span>
                  </span>

                  <span className="t-small max-w-[46ch] text-stone sm:col-span-2 lg:col-span-1">
                    {item.summary}
                  </span>

                  <span
                    aria-hidden
                    className="badge mr-2 hidden justify-self-end lg:inline-flex"
                  >
                    <ArrowUpRight strokeWidth={1.3} className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Newsletter />

      <CTASection
        eyebrow="Enquiries"
        lines={['Continue the', 'conversation.']}
        body="Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence."
        image="towers-mono"
        focal="50% 40%"
      />
    </>
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
      <span className="t-label text-gold-ink">{category}</span>
      <span aria-hidden className="h-px w-5 bg-[var(--line)]" />
      <time dateTime={isoDate} className="t-meta text-stone">
        {date}
      </time>
      <span aria-hidden className="h-px w-5 bg-[var(--line)]" />
      <span className="t-meta text-stone">{readingTime}</span>
    </span>
  );
}
