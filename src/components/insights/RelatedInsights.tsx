import Link from 'next/link';

import { insightImage } from '@/data/insight-images';
import { insights } from '@/data/insights';

import { InsightCard } from './InsightCard';

/** Further reading under an article, on the same card as the Insights index. */
export function RelatedInsights({ currentSlug }: { currentSlug: string }) {
  const related = insights.filter((i) => i.slug !== currentSlug);
  if (related.length === 0) return null;

  return (
    <section
      data-section="Related Perspectives"
      className="section ground-graphite border-b border-[var(--line-soft)]"
      aria-labelledby="related-heading"
    >
      <div className="shell">
        <div className="flex items-center justify-between gap-4 pb-8 border-b border-[var(--line)]">
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
          {related.map((item, i) => {
            const art = insightImage(item);
            return (
              <InsightCard
                key={item.slug}
                item={item}
                delay={i * 0.08}
                media={{ image: art.image, alt: art.alt, focal: art.position }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
