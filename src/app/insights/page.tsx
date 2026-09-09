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
      <section className="rd-section rd-paper" aria-labelledby="featured-heading">
        <div className="rd-shell">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
            <Reveal kind="label" className="rd-kicker">
              <p className="rd-label">Featured Insight</p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="flex flex-wrap items-center gap-2.5">
                {categories.map((c) => (
                  <li
                    key={c}
                    className="rd-label rounded-full border border-[var(--rd-line)] px-4 py-2.5 text-[var(--rd-stone)]"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <article className="mt-[var(--rd-pad-sm)]">
            <Link
              href={`/insights/${featuredInsight.slug}`}
              className="group rd-card rd-lift block p-[clamp(1.25rem,2.2vw,2rem)]"
            >
              <ImageReveal>
                <div className="rd-media rd-media-in rd-media-zoom aspect-[16/10] w-full lg:aspect-[21/9]">
                  <Picture
                    name={featuredInsight.image}
                    alt={featuredInsight.imageAlt}
                    sizes="100vw"
                    focal={featuredInsight.focal}
                    className="h-full w-full"
                  />
                </div>
              </ImageReveal>

              <div className="mt-[var(--rd-gap)] grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4vw,4.5rem)]">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="rd-label text-[var(--rd-accent-ink)]">
                      {featuredInsight.category}
                    </span>
                    <span aria-hidden className="h-px w-6 bg-[var(--rd-line)]" />
                    <time
                      dateTime={featuredInsight.isoDate}
                      className="rd-meta text-[var(--rd-stone)]"
                    >
                      {featuredInsight.date}
                    </time>
                    <span aria-hidden className="h-px w-6 bg-[var(--rd-line)]" />
                    <span className="rd-meta text-[var(--rd-stone)]">
                      {featuredInsight.readingTime}
                    </span>
                  </div>

                  <h2
                    id="featured-heading"
                    className="rd-display mt-6 max-w-[16ch] text-[var(--rd-ink)] transition-colors duration-500 group-hover:text-[var(--rd-accent-deep)]"
                  >
                    {featuredInsight.title}
                  </h2>
                </div>

                <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-end lg:pb-2">
                  <p className="rd-lead max-w-[44ch] text-[var(--rd-stone)]">
                    {featuredInsight.summary}
                  </p>
                  <span className="rd-cta mt-6 w-fit text-[var(--rd-ink)] group-hover:text-[var(--rd-accent-deep)]">
                    <span className="link-underline">Read the piece</span>
                    <ArrowUpRight aria-hidden strokeWidth={1.5} className="rd-arrow h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        </div>
      </section>

      {/* Latest */}
      <section className="rd-section rd-paper-2" aria-labelledby="latest-heading">
        <div className="rd-shell">
          <Reveal kind="label" className="rd-kicker">
            <h2 id="latest-heading" className="rd-label">
              Latest
            </h2>
          </Reveal>

          <ul className="mt-[var(--rd-pad-sm)] grid gap-[clamp(0.875rem,1.4vw,1.25rem)] sm:grid-cols-2">
            {secondaryInsights.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.07}>
                <Link
                  href={`/insights/${item.slug}`}
                  className="group rd-card rd-lift flex h-full flex-col p-[clamp(1.25rem,2vw,1.75rem)]"
                >
                  <div className="rd-media rd-media-in rd-media-zoom aspect-[16/10] w-full">
                    <Picture
                      name={item.image}
                      alt={item.imageAlt}
                      sizes="(min-width:640px) 46vw, 100vw"
                      focal={item.focal}
                      className="h-full w-full"
                    />
                  </div>

                  <div className="mt-6 flex items-start justify-between gap-5">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="rd-label text-[var(--rd-accent-ink)]">{item.category}</span>
                        <span aria-hidden className="h-px w-5 bg-[var(--rd-line)]" />
                        <time dateTime={item.isoDate} className="rd-meta text-[var(--rd-stone)]">
                          {item.date}
                        </time>
                        <span aria-hidden className="h-px w-5 bg-[var(--rd-line)]" />
                        <span className="rd-meta text-[var(--rd-stone)]">{item.readingTime}</span>
                      </div>

                      <h3 className="rd-h3 mt-4 max-w-[22ch] text-[var(--rd-ink)] transition-colors duration-500 group-hover:text-[var(--rd-accent-deep)]">
                        {item.title}
                      </h3>
                    </div>

                    <span
                      aria-hidden
                      className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--rd-line)] text-[var(--rd-stone)] transition-colors duration-500 ease-premium group-hover:border-[var(--rd-accent)] group-hover:bg-[var(--rd-accent)] group-hover:text-[var(--rd-ink)] sm:flex"
                    >
                      <ArrowUpRight strokeWidth={1.4} className="rd-arrow h-4 w-4" />
                    </span>
                  </div>

                  <p className="rd-small mt-4 max-w-[44ch] text-[var(--rd-stone)]">
                    {item.summary}
                  </p>
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
