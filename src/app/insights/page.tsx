import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Newsletter } from '@/components/sections/Newsletter';
import { CTASection } from '@/components/sections/CTASection';
import { Reveal, DrawRule, ImageReveal } from '@/components/animations/Reveal';
import { ScaleOnScroll } from '@/components/animations/Parallax';
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
      <section className="section bg-bone" aria-labelledby="featured-heading">
        <div className="shell-wide">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
              <p className="t-label text-gold">Featured Insight</p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {categories.map((c) => (
                  <li
                    key={c}
                    className="t-label border border-ink/12 px-3 py-2 text-ink/45"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <DrawRule className="mt-8" />

          <article className="mt-[var(--space-section-sm)]">
            <Link href={`/insights/${featuredInsight.slug}`} className="group block">
              <ImageReveal>
                <ScaleOnScroll
                  className="media aspect-[16/10] w-full lg:aspect-[21/9]"
                  from={1.1}
                  to={1}
                >
                  <Picture
                    name={featuredInsight.image}
                    alt={featuredInsight.imageAlt}
                    sizes="100vw"
                    focal={featuredInsight.focal}
                    priority
                    className="h-full w-full"
                  />
                </ScaleOnScroll>
              </ImageReveal>

              <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="t-label text-gold">{featuredInsight.category}</span>
                    <span aria-hidden className="h-px w-6 bg-ink/20" />
                    <time
                      dateTime={featuredInsight.isoDate}
                      className="text-[0.75rem] font-light tracking-wide text-ink/40"
                    >
                      {featuredInsight.date}
                    </time>
                    <span aria-hidden className="h-px w-6 bg-ink/20" />
                    <span className="text-[0.75rem] font-light tracking-wide text-ink/40">
                      {featuredInsight.readingTime}
                    </span>
                  </div>

                  <h2
                    id="featured-heading"
                    className="t-h1 mt-6 max-w-[16ch] text-ink transition-colors duration-500 group-hover:text-gold"
                  >
                    {featuredInsight.title}
                  </h2>
                </div>

                <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-end lg:pb-2">
                  <p className="t-lead max-w-[44ch] text-ink/65">
                    {featuredInsight.summary}
                  </p>
                  <span className="link-underline mt-7 inline-block w-fit text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70">
                    Read the piece
                  </span>
                </div>
              </div>
            </Link>
          </article>
        </div>
      </section>

      {/* Latest */}
      <section className="section bg-bone pt-0" aria-labelledby="latest-heading">
        <div className="shell-wide">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
            <h2 id="latest-heading" className="t-label text-gold">
              Latest
            </h2>
          </Reveal>

          <DrawRule className="mt-8" />

          <ul className="mt-[var(--content-gap-lg)]">
            {secondaryInsights.map((item, i) => (
              <Reveal
                as="li"
                key={item.slug}
                delay={i * 0.07}
                className="border-b border-ink/12"
              >
                <Link
                  href={`/insights/${item.slug}`}
                  className="group grid gap-6 py-[var(--content-gap-lg)] md:grid-cols-12 md:items-center md:gap-10"
                >
                  <div className="media media-zoom aspect-[16/10] w-full md:col-span-4 md:aspect-[4/3]">
                    <Picture
                      name={item.image}
                      alt={item.imageAlt}
                      sizes="(min-width:768px) 32vw, 100vw"
                      focal={item.focal}
                      className="h-full w-full"
                    />
                  </div>

                  <div className="md:col-span-6">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="t-label text-gold">{item.category}</span>
                      <span aria-hidden className="h-px w-5 bg-ink/20" />
                      <time
                        dateTime={item.isoDate}
                        className="text-[0.74rem] font-light tracking-wide text-ink/40"
                      >
                        {item.date}
                      </time>
                      <span aria-hidden className="h-px w-5 bg-ink/20" />
                      <span className="text-[0.74rem] font-light tracking-wide text-ink/40">
                        {item.readingTime}
                      </span>
                    </div>

                    <h3 className="t-h2 mt-4 max-w-[20ch] text-ink transition-colors duration-500 group-hover:text-gold">
                      {item.title}
                    </h3>

                    <p className="t-body mt-4 max-w-[46ch] text-ink/55">
                      {item.summary}
                    </p>
                  </div>

                  <div className="md:col-span-2 md:flex md:justify-end">
                    <span
                      aria-hidden
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink/45 transition-all duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
                    >
                      <ArrowUpRight strokeWidth={1.4} className="h-4 w-4" />
                    </span>
                  </div>
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
