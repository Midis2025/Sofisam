import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Share2 } from 'lucide-react';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { ClosingSection } from '@/components/sections/ClosingSection';
import { Reveal } from '@/components/animations/Reveal';
import { insights, insightBySlug } from '@/data/insights';
import { site } from '@/data/site';

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = insightBySlug(slug);
  if (!insight) return {};

  return {
    title: insight.title,
    description: insight.summary,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: 'article',
      title: `${insight.title} | SOFISAM FZCO`,
      description: insight.summary,
      url: `/insights/${insight.slug}`,
      publishedTime: insight.isoDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${insight.title} | SOFISAM FZCO`,
      description: insight.summary,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = insightBySlug(slug);
  if (!insight) notFound();

  const related = insights.filter((i) => i.slug !== insight.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.summary,
    datePublished: insight.isoDate,
    articleSection: insight.category,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/insights/${insight.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* 01 — Article Masthead */}
      <PageHero
        eyebrow={`Perspective · ${insight.category}`}
        sectionLabel="Strategic Analysis"
        headline={[insight.title]}
        standfirst={insight.standfirst}
        image={insight.image}
        imageAlt={insight.imageAlt}
        focal={insight.focal}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Insights', href: '/insights' },
          { label: insight.title },
        ]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--line-soft)] pt-5 text-xs text-[var(--stone)] font-mono">
          <time dateTime={insight.isoDate} className="text-[var(--gold)] font-medium">
            {insight.date}
          </time>
          <span>·</span>
          <span>{insight.readingTime}</span>
          <span>·</span>
          <span>SOFISAM Intelligence</span>
        </div>
      </PageHero>

      {/* 02 — Editorial Article Body & Sticky Rail */}
      <article data-section="Article" className="section ground-char border-b border-[var(--line-soft)]">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Sticky Editorial Rail (Desktop lg+) */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] space-y-8">
                <div>
                  <p className="t-label text-gold">Table of Contents</p>
                  <ol className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                    {insight.body
                      .filter((b) => b.heading)
                      .map((b) => (
                        <li key={b.heading} className="py-3">
                          <span className="text-xs text-[var(--sage)] leading-snug block">
                            {b.heading}
                          </span>
                        </li>
                      ))}
                  </ol>
                </div>

                <div className="pt-2">
                  <Link
                    href="/insights"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold)] hover:text-[var(--ivory)] transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Return to All Insights</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Editorial Text Body */}
            <div className="lg:col-span-8 lg:col-start-5">
              {insight.body.map((block, bi) => (
                <section key={block.heading ?? `block-${bi}`} className={bi > 0 ? 'mt-12' : ''}>
                  {block.heading && (
                    <Reveal>
                      <h2 className="font-display text-2xl sm:text-3xl text-[var(--ivory)] font-light mb-6 leading-snug">
                        {block.heading}
                      </h2>
                    </Reveal>
                  )}
                  <div className="space-y-6">
                    {block.paragraphs.map((p, pi) => (
                      <Reveal key={p} delay={pi * 0.04}>
                        <p
                          className={
                            bi === 0 && pi === 0
                              ? 't-lead text-[var(--ivory)] font-light leading-relaxed max-w-[62ch]'
                              : 't-body text-[var(--sage)] leading-relaxed max-w-[64ch]'
                          }
                        >
                          {p}
                        </p>
                      </Reveal>
                    ))}
                  </div>

                  {/* Pull Quote Spotlight */}
                  {insight.pullQuote && bi === 1 && (
                    <Reveal delay={0.1}>
                      <blockquote className="my-12 border-l-2 border-[var(--brass)] bg-[var(--plate)] p-8 sm:p-10 rounded-r-[var(--r-md)] shadow-[var(--shadow-plate)]">
                        <p className="font-display text-xl sm:text-2xl lg:text-3xl font-light text-[var(--ivory)] italic leading-snug">
                          &ldquo;{insight.pullQuote}&rdquo;
                        </p>
                        <footer className="mt-4 text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-medium">
                          Strategic Takeaway
                        </footer>
                      </blockquote>
                    </Reveal>
                  )}
                </section>
              ))}

              {/* Disclaimer */}
              <div className="mt-14 pt-8 border-t border-[var(--line)]">
                <p className="text-xs text-[var(--stone)] leading-relaxed max-w-[60ch]">
                  This article is provided as general international commentary and does not constitute investment, legal, accounting, or tax advice. Nothing herein describes a specific confidential client mandate of SOFISAM FZCO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* 03 — Related Insights */}
      <section data-section="Related Perspectives" className="section ground-graphite border-b border-[var(--line-soft)]" aria-labelledby="related-heading">
        <div className="shell">
          <div className="flex items-center justify-between pb-8 border-b border-[var(--line)]">
            <div className="kicker">
              <h2 id="related-heading" className="t-label">
                Further Reading
              </h2>
            </div>
            <Link
              href="/insights"
              className="text-xs font-semibold uppercase tracking-wider text-[var(--gold)] hover:underline"
            >
              All Articles →
            </Link>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {related.map((item, i) => (
              <Reveal as="article" key={item.slug} delay={i * 0.08}>
                <Link
                  href={`/insights/${item.slug}`}
                  className="group relative flex flex-col justify-between h-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--graphite)]">
                    <Picture
                      name={item.image}
                      alt={item.imageAlt}
                      sizes="(min-width:640px) 50vw, 100vw"
                      focal={item.focal}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  <div className="p-7 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="text-xs text-[var(--stone)] font-mono flex items-center gap-2">
                        <span className="text-[var(--gold)] uppercase font-semibold">{item.category}</span>
                        <span>·</span>
                        <time dateTime={item.isoDate}>{item.date}</time>
                      </div>

                      <h3 className="mt-3 font-display text-2xl text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors font-light leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-[var(--sage)] line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--line-soft)] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
                      <span>Read Perspective</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
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
        lines={['Discuss this strategic', 'perspective further.']}
        body="Reach out to discuss strategic opportunities, cross-border restructuring, or advisory requirements. Every enquiry is handled in strict confidence."
      />
    </>
  );
}
