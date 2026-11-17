import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleHeader } from '@/components/insights/ArticleHeader';
import { ArticleBody } from '@/components/insights/ArticleBody';
import { RelatedInsights } from '@/components/insights/RelatedInsights';
import { ClosingSection } from '@/components/sections/ClosingSection';
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

      {/* One template for every Insight: masthead + lead image, body, further reading. */}
      <ArticleHeader insight={insight} />
      <ArticleBody insight={insight} />
      <RelatedInsights currentSlug={insight.slug} />

      {/* 04 — Closing CTA */}
      <ClosingSection
        lines={['Discuss this strategic', 'perspective further.']}
        body="Reach out to discuss strategic opportunities, cross-border restructuring, or advisory requirements. Every enquiry is handled in strict confidence."
      />
    </>
  );
}
