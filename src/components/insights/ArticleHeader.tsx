'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { insightImage } from '@/data/insight-images';
import type { Insight } from '@/data/insights';
import { useIntroDelay } from '@/lib/intro';

import { ArticleHero } from './ArticleHero';
import { BackToInsights } from './BackToInsights';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The opening of every Insight article.
 *
 *   ← RETURN TO ALL INSIGHTS
 *   CATEGORY
 *   TITLE                         DESCRIPTION
 *                                 DATE · READ TIME · SOURCE
 *   ─────────────── LEAD IMAGE ───────────────
 *
 * Everything sits on the one `.shell` container and a single 12-column grid
 * from lg, so the back link, the category, the title, the description and the
 * image share a left edge on every article. Below lg the two columns become
 * one vertical flow. The title is the site's H1 step and wraps on its own —
 * no manual breaks — so a long title reflows rather than clipping.
 */
export function ArticleHeader({ insight }: { insight: Insight }) {
  const reduce = useReducedMotion();
  const d = useIntroDelay(0.55, 0.05);

  // The server cannot know the visitor's motion preference, so the starting
  // state is the same either way and reduced motion simply skips the travel —
  // the markup always matches and hydration never has to throw it away.
  const tx = (duration: number, delay: number) =>
    reduce ? { duration: 0 } : { duration, ease: EASE, delay: d + delay };

  const fade = (delay: number, y = 0) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: tx(0.7, delay),
  });

  return (
    <section
      data-section="Article Masthead"
      className="ground-void relative w-full"
      aria-labelledby="article-title"
    >
      <div className="shell pt-[calc(var(--header-h)+clamp(1.25rem,4vh,2.5rem))]">
        <motion.div {...fade(0.05)}>
          <BackToInsights />
        </motion.div>

        <div className="grid gap-y-[clamp(1.25rem,3vw,2rem)] pt-[clamp(1.5rem,4vh,2.75rem)] lg:grid-cols-12 lg:items-end lg:gap-x-[clamp(2rem,4vw,5rem)]">
          <div className="min-w-0 lg:col-span-7">
            <motion.div className="kicker" {...fade(0.12)}>
              <p className="t-label text-gold">{insight.category}</p>
            </motion.div>

            <h1
              id="article-title"
              className="t-display mt-eyebrow max-w-[20ch] text-balance break-words text-ivory"
            >
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={tx(0.9, 0.18)}
                >
                  {insight.title}
                </motion.span>
              </span>
            </h1>
          </div>

          <motion.div className="min-w-0 lg:col-span-5 lg:pb-[0.4rem]" {...fade(0.42, 14)}>
            <p className="t-lead max-w-[42ch] text-sage">{insight.standfirst}</p>

            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[var(--line-soft)] pt-5 font-mono text-xs uppercase tracking-wider text-[var(--stone)]">
              <time dateTime={insight.isoDate} className="font-medium text-[var(--gold)]">
                {insight.date}
              </time>
              <span aria-hidden>·</span>
              <span>{insight.readingTime}</span>
              <span aria-hidden>·</span>
              <span>SOFISAM Intelligence</span>
            </p>
          </motion.div>
        </div>

        <ArticleHero art={insightImage(insight)} className="mt-[clamp(2rem,4vw,3.5rem)]" />
      </div>
    </section>
  );
}
