import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Newsletter } from '@/components/sections/Newsletter';
import { CTASection } from '@/components/sections/CTASection';
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
        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-bone/15 pt-6">
          <time
            dateTime={insight.isoDate}
            className="t-label tnum text-bone/50"
          >
            {insight.date}
          </time>
          <span aria-hidden className="h-px w-6 bg-bone/20" />
          <span className="t-label text-bone/50">{insight.readingTime}</span>
          <span aria-hidden className="h-px w-6 bg-bone/20" />
          <span className="t-label text-bone/50">{site.shortName}</span>
        </div>
      </PageHero>

      {/* Article body */}
      <article className="rd-section rd-paper">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4vw,4.5rem)]">
            {/* Side rail */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-[8rem]">
                <p className="rd-label text-[var(--rd-accent-ink)]">In this piece</p>
                <ol className="mt-6">
                  {insight.body
                    .filter((b) => b.heading)
                    .map((b, i) => (
                      <li key={b.heading} className="rd-row flex gap-4 py-3.5">
                        <span className="rd-num shrink-0 pt-[0.2rem] text-[0.66rem] text-[var(--rd-stone)]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="rd-small text-[var(--rd-stone)]">{b.heading}</span>
                      </li>
                    ))}
                </ol>

                <Link
                  href="/insights"
                  className="group rd-cta mt-7 text-[var(--rd-stone)] hover:text-[var(--rd-ink)]"
                >
                  <span className="link-underline">All insights</span>
                  <ArrowUpRight aria-hidden strokeWidth={1.5} className="rd-arrow h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>

            {/* Prose */}
            <div className="lg:col-span-8 lg:col-start-5">
              {insight.body.map((block, bi) => (
                <section key={block.heading ?? `block-${bi}`} className={bi > 0 ? 'mt-12' : ''}>
                  {block.heading && (
                    <Reveal>
                      <h2 className="rd-h3 mb-6 max-w-[22ch] text-[var(--rd-ink)]">
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
                              ? 'rd-lead max-w-[58ch] text-[var(--rd-ink)]'
                              : 'rd-body max-w-[62ch] text-[var(--rd-stone)]'
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
                      <blockquote className="my-12 border-l border-[var(--rd-accent)] py-2 pl-6 sm:pl-9">
                        <p className="max-w-[28ch] font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.14] tracking-tighter text-[var(--rd-ink)]">
                          {insight.pullQuote}
                        </p>
                      </blockquote>
                    </Reveal>
                  )}
                </section>
              ))}

              <span aria-hidden className="rd-rule mt-14 block" />

              <Reveal>
                <p className="rd-meta mt-7 max-w-[58ch] text-[var(--rd-stone)]">
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
      <section className="rd-section rd-paper-2" aria-labelledby="related-heading">
        <div className="rd-shell">
          <Reveal className="rd-kicker">
            <h2 id="related-heading" className="rd-label">
              More Insights
            </h2>
          </Reveal>

          <ul className="mt-[var(--rd-pad-sm)] grid gap-x-[clamp(2rem,4vw,4.5rem)] gap-y-[var(--rd-gap)] sm:grid-cols-2">
            {related.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.08}>
                <Link href={`/insights/${item.slug}`} className="group block">
                  <div className="rd-media rd-media-zoom aspect-[16/10] w-full">
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
                      <span className="rd-label text-[var(--rd-accent-ink)]">{item.category}</span>
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
                  <div className="rd-meta mt-4 flex items-center gap-5 text-[var(--rd-stone)]">
                    <time dateTime={item.isoDate}>{item.date}</time>
                    <span aria-hidden className="h-px w-5 bg-[var(--rd-line)]" />
                    <span>{item.readingTime}</span>
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
        lines={['Discuss this', 'further.']}
        body="Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence."
        image="abstract-dark"
        focal="50% 50%"
      />
    </>
  );
}
