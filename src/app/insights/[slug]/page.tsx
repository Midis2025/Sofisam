import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

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

      <PageHero
        eyebrow={insight.category}
        sectionLabel="Insight"
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
        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ivory/15 pt-6">
          <time
            dateTime={insight.isoDate}
            className="t-label tnum text-ivory/50"
          >
            {insight.date}
          </time>
          <span aria-hidden className="h-px w-6 bg-ivory/20" />
          <span className="t-label text-ivory/50">{insight.readingTime}</span>
          <span aria-hidden className="h-px w-6 bg-ivory/20" />
          <span className="t-label text-ivory/50">{site.shortName}</span>
        </div>
      </PageHero>

      {/* Article body */}
      <article data-section="Article" className="section ground-char">
        <div className="shell">
          <div className="grid gap-[var(--gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4vw,4.5rem)]">
            {/* Side rail */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
                <p className="t-label text-gold">In this piece</p>
                <ol className="mt-6">
                  {insight.body
                    .filter((b) => b.heading)
                    .map((b, i) => (
                      <li key={b.heading} className="row flex gap-4 py-3.5">
                        <span className="t-num shrink-0 pt-[0.2rem] text-[0.66rem] text-sage">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="t-small text-sage">{b.heading}</span>
                      </li>
                    ))}
                </ol>

                <Link
                  href="/insights"
                  className="group cta mt-7 text-sage hover:text-ivory"
                >
                  <span className="link-underline">All insights</span>
                  <ArrowUpRight aria-hidden strokeWidth={1.5} className="arrow h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>

            {/* Prose */}
            <div className="lg:col-span-8 lg:col-start-5">
              {insight.body.map((block, bi) => (
                <section key={block.heading ?? `block-${bi}`} className={bi > 0 ? 'mt-12' : ''}>
                  {block.heading && (
                    <Reveal>
                      <h2 className="t-h3 mb-6 max-w-[22ch] text-ivory">
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
                              ? 't-lead max-w-[58ch] text-ivory'
                              : 't-body max-w-[62ch] text-sage'
                          }
                        >
                          {p}
                        </p>
                      </Reveal>
                    ))}
                  </div>

                  {/* Pull quote inserted after the second block */}
                  {insight.pullQuote && bi === 1 && (
                    <Reveal delay={0.1}>
                      <blockquote className="my-12 border-l border-gold py-2 pl-6 sm:pl-9">
                        <p className="max-w-[28ch] font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.14] tracking-tighter text-ivory">
                          {insight.pullQuote}
                        </p>
                      </blockquote>
                    </Reveal>
                  )}
                </section>
              ))}

              <span aria-hidden className="rule mt-14 block" />

              <Reveal>
                <p className="t-meta mt-7 max-w-[58ch] text-sage">
                  This piece is general commentary and does not constitute
                  investment, legal or tax advice, or an offer of any service.
                  Nothing in it describes a specific engagement of SOFISAM FZCO.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </article>

      {/* More insights */}
      <section data-section="More Insights" className="section ground-graphite" aria-labelledby="related-heading">
        <div className="shell">
          <Reveal kind="label" className="kicker">
            <h2 id="related-heading" className="t-label">
              More Insights
            </h2>
          </Reveal>

          <ul className="mt-[var(--pad-sm)] grid gap-x-[clamp(2rem,4vw,4.5rem)] gap-y-[var(--gap)] sm:grid-cols-2">
            {related.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.08}>
                <Link href={`/insights/${item.slug}`} className="group block">
                  <div className="media media-zoom aspect-[16/10] w-full">
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
                      <span className="t-label text-gold">{item.category}</span>
                      <h3 className="t-h3 mt-4 max-w-[22ch] text-ivory transition-colors duration-500 group-hover:text-gold-hi">
                        {item.title}
                      </h3>
                    </div>
                    <span
                      aria-hidden
                      className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-sage transition-colors duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-paper sm:flex"
                    >
                      <ArrowUpRight strokeWidth={1.4} className="arrow h-4 w-4" />
                    </span>
                  </div>
                  <div className="t-meta mt-4 flex items-center gap-5 text-sage">
                    <time dateTime={item.isoDate}>{item.date}</time>
                    <span aria-hidden className="h-px w-5 bg-[var(--line)]" />
                    <span>{item.readingTime}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ClosingSection
        lines={['Discuss this', 'further.']}
        body="Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence."
      />
    </>
  );
}
