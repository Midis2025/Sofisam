import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/animations/Reveal';
import { Picture } from '@/components/ui/Picture';
import type { Insight } from '@/data/insights';

interface InsightCardProps {
  item: Insight;
  delay?: number;
  /** A different photograph for the card (the article pages use their own). */
  media?: { image: string; alt: string; focal?: string };
}

/**
 * The publication's article card — used on the Insights index and under every
 * article as further reading, so the two never drift apart.
 */
export function InsightCard({ item, delay = 0, media }: InsightCardProps) {
  const pic = media ?? { image: item.image, alt: item.imageAlt, focal: item.focal };

  return (
    <Reveal as="article" kind="card" delay={delay}>
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
            name={pic.image}
            alt={pic.alt}
            sizes="(min-width: 640px) 50vw, 100vw"
            focal={pic.focal}
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
  );
}
