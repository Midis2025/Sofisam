import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Newsletter } from '@/components/sections/Newsletter';
import { CTASection } from '@/components/sections/CTASection';
import { Reveal, DrawRule } from '@/components/animations/Reveal';
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
      <article className="section bg-bone">
        <div className="shell-wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Side rail */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-[8rem]">
                <p className="t-label text-gold">In this piece</p>
                <ol className="mt-5 space-y-3">
                  {insight.body
                    .filter((b) => b.heading)
                    .map((b, i) => (
                      <li key={b.heading} className="flex gap-3">
                        <span className="t-index shrink-0 pt-[0.2rem] text-[0.66rem] text-ink/30">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[0.86rem] font-light leading-snug text-ink/55">
                          {b.heading}
                        </span>
                      </li>
                    ))}
                </ol>

                <DrawRule className="my-7" />

                <Link
                  href="/insights"
                  className="group inline-flex items-center gap-2 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/60 hover:text-ink"
                >
                  <span className="link-underline">All insights</span>
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.5}
                    className="h-3.5 w-3.5 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </aside>

            {/* Prose */}
            <div className="lg:col-span-8 lg:col-start-5">
              {insight.body.map((block, bi) => (
                <section key={block.heading ?? `block-${bi}`} className={bi > 0 ? 'mt-12' : ''}>
                  {block.heading && (
                    <Reveal>
                      <h2 className="t-h3 mb-6 max-w-[22ch] text-ink">{block.heading}</h2>
                    </Reveal>
                  )}
                  <div className="space-y-6">
                    {block.paragraphs.map((p, pi) => (
                      <Reveal key={p} delay={pi * 0.04}>
                        <p
                          className={
                            bi === 0 && pi === 0
                              ? 'max-w-[58ch] text-[clamp(1.15rem,1.75vw,1.5rem)] font-light leading-[1.6] tracking-[-0.006em] text-ink'
                              : 'max-w-[62ch] text-[clamp(1rem,1.1vw,1.0625rem)] font-light leading-[1.8] text-ink/70'
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
                        <p className="max-w-[26ch] font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.14] tracking-tighter text-ink">
                          {insight.pullQuote}
                        </p>
                      </blockquote>
                    </Reveal>
                  )}
                </section>
              ))}

              <DrawRule className="mt-14" />

              <Reveal>
                <p className="mt-7 max-w-[58ch] text-[0.82rem] font-light leading-relaxed text-ink/45">
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
      <section className="section bg-bone pt-0" aria-labelledby="related-heading">
        <div className="shell-wide">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
            <h2 id="related-heading" className="t-label text-gold">
              More Insights
            </h2>
          </Reveal>

          <DrawRule className="mt-8" />

          <ul className="mt-[clamp(2rem,4vw,3rem)] grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {related.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.08}>
                <Link href={`/insights/${item.slug}`} className="group block">
                  <div className="media media-zoom aspect-[16/10] w-full">
                    <Picture
                      name={item.image}
                      alt={item.imageAlt}
                      sizes="(min-width:640px) 44vw, 100vw"
                      focal={item.focal}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-5">
                    <div className="min-w-0">
                      <span className="t-label text-gold">{item.category}</span>
                      <h3 className="t-h3 mt-4 max-w-[20ch] text-ink transition-colors duration-500 group-hover:text-gold">
                        {item.title}
                      </h3>
                    </div>
                    <span
                      aria-hidden
                      className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/45 transition-all duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
                    >
                      <ArrowUpRight strokeWidth={1.4} className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-5 text-[0.74rem] font-light tracking-wide text-ink/40">
                    <time dateTime={item.isoDate}>{item.date}</time>
                    <span aria-hidden className="h-px w-5 bg-ink/20" />
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
