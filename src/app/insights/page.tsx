import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { ClosingSection } from '@/components/sections/ClosingSection';
import { Reveal, ImageReveal } from '@/components/animations/Reveal';
import { insights, featuredInsight, secondaryInsights } from '@/data/insights';
import { insightsIntro } from '@/data/site';

export const metadata: Metadata = {
  title: 'Strategic Insights & Perspectives',
  description:
    'Perspectives on global markets, corporate governance, and strategic investment structuring from SOFISAM FZCO, Dubai.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Strategic Insights & Perspectives | SOFISAM FZCO',
    description:
      'Perspectives on global markets, corporate governance, and strategic investment structuring.',
    url: '/insights',
  },
};

const categories = Array.from(new Set(insights.map((i) => i.category)));

export default function InsightsPage() {
  return (
    <>
      {/* 01 — Page Masthead */}
      <PageHero
        eyebrow="Intelligence & Analysis"
        sectionLabel="Strategic Insights"
        headline={['Perspectives on global markets,', 'governance, and structuring.']}
        standfirst={insightsIntro.standfirst}
        image="abstract-dark"
        imageAlt="The curved glass fins of a contemporary facade against a pale sky"
        focal="60% 45%"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Strategic Insights' }]}
      />

      {/* 02 — Featured Analysis Spotlight */}
      <section data-section="Featured Analysis" className="section ground-char border-b border-[var(--line-soft)]" aria-labelledby="featured-heading">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pb-8 border-b border-[var(--line)]">
            <div className="kicker">
              <p className="t-label">Lead Editorial</p>
            </div>

            <ul className="flex flex-wrap items-center gap-2">
              <li className="px-3 py-1 rounded-[var(--r-sm)] border border-[var(--brass)] bg-[var(--plate)] text-[0.6875rem] uppercase font-semibold text-[var(--gold)]">
                All Topics
              </li>
              {categories.map((c) => (
                <li
                  key={c}
                  className="px-3 py-1 rounded-[var(--r-sm)] border border-[var(--line-soft)] bg-[var(--plate)]/60 text-[0.6875rem] uppercase font-medium text-[var(--sage)]"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <article className="mt-10">
            <Link
              href={`/insights/${featuredInsight.slug}`}
              className="group relative block overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)] transition-all duration-300 hover:border-[var(--line-strong)]"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-500 ease-out group-hover:scale-x-100"
              />

              <div className="grid lg:grid-cols-12 items-stretch">
                {/* Content (Left Column on Desktop, First on Mobile) */}
                <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10 order-1">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-[var(--stone)] font-mono">
                      <span className="text-[var(--gold)] font-semibold uppercase">{featuredInsight.category}</span>
                      <span>·</span>
                      <time dateTime={featuredInsight.isoDate}>{featuredInsight.date}</time>
                      <span>·</span>
                      <span>{featuredInsight.readingTime}</span>
                    </div>

                    <h2
                      id="featured-heading"
                      className="mt-4 font-display text-2xl sm:text-3xl font-light text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors leading-snug"
                    >
                      {featuredInsight.title}
                    </h2>

                    <p className="mt-3.5 t-body text-[var(--sage)] leading-relaxed">
                      {featuredInsight.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[var(--line)] flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[var(--stone)] font-medium">
                      Executive Analysis
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] group-hover:translate-x-1 transition-transform">
                      <span>Read Perspective</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Media Plate (Right Column on Desktop, Below on Mobile) */}
                <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-[var(--graphite)] order-2">
                  <Picture
                    name={featuredInsight.image}
                    alt={featuredInsight.imageAlt}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    focal={featuredInsight.focal}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                  <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-[var(--r-sm)] border border-white/20">
                    Lead Editorial · {featuredInsight.category}
                  </span>
                </div>
              </div>
            </Link>
          </article>
        </div>
      </section>

      {/* 03 — Additional Strategic Perspectives */}
      <section data-section="All Perspectives" className="section ground-graphite border-b border-[var(--line-soft)]" aria-labelledby="latest-heading">
        <div className="shell">
          <div className="kicker">
            <h2 id="latest-heading" className="t-label">
              Recent Perspectives
            </h2>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {secondaryInsights.map((item, i) => (
              <Reveal as="article" key={item.slug} kind="card" delay={i * 0.08}>
                <Link
                  href={`/insights/${item.slug}`}
                  className="group relative flex flex-col justify-between h-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-plate)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />

                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--graphite)]">
                    <Picture
                      name={item.image}
                      alt={item.imageAlt}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      focal={item.focal}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded font-mono">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                    <div>
                      <div className="flex items-center gap-2.5 text-xs text-[var(--stone)] font-mono">
                        <time dateTime={item.isoDate}>{item.date}</time>
                        <span>·</span>
                        <span>{item.readingTime}</span>
                      </div>

                      <h3 className="mt-3.5 font-display text-2xl text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors font-light leading-snug">
                        {item.title}
                      </h3>

                      <p className="mt-3 t-small text-[var(--sage)] leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between">
                      <span className="text-xs text-[var(--stone)]">Advisory Commentary</span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] group-hover:translate-x-1 transition-transform">
                        <span>Read Piece</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Closing CTA */}
      <ClosingSection
        lines={['Continue the strategic', 'conversation.']}
        body="Reach out to discuss strategic opportunities, cross-border restructuring, or advisory requirements. Every enquiry is handled in strict confidence."
      />
    </>
  );
}
