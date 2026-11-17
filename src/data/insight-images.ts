import type { Insight } from './insights';

/**
 * Insight article imagery — the one place an article's photograph is chosen.
 *
 * Used only on the individual article pages: the lead image under the
 * masthead, and the further-reading cards beneath the text. The Insights index
 * and the homepage keep the images set on each entry in `insights.ts`.
 *
 * Every article has its own photograph, chosen for its subject, and each is a
 * wide 3200px source with pre-generated AVIF and WebP widths (640–3200), so the
 * browser fetches a phone-sized file on a phone and a sharp one on a desktop.
 *
 * The lead-image frame is square on phones, 3:2 from sm, 2:1 from lg and 21:9
 * from xl. The positions below were read off each photograph so its subject
 * holds at all four proportions; they are not defaults.
 */

export interface InsightImage {
  /** Base name of the asset in /public/images (see `Picture`). */
  image: string;
  alt: string;
  /** object-position for the lead image from sm up, and for the article's card. */
  position: string;
  /** object-position for the square phone frame, where it needs its own crop. */
  positionMobile?: string;
  /**
   * From this breakpoint the whole photograph is shown, set over a soft wash of
   * itself, rather than cropped. Only for a photograph (a tall portrait, say)
   * that no crop of the wider frame can do justice to.
   */
  contain?: 'sm' | 'lg';
}

export const insightImages: Record<string, InsightImage> = {
  // Lit floors of a financial tower at night: the international business
  // environment the outlook describes, rather than any one city's landmark.
  // The office grid fills the right two-thirds, so the phone crop leans right.
  'global-market-shifts-2026-outlook': {
    image: 'tower-detail',
    alt: 'Illuminated office floors of a financial district tower at night',
    position: '50% 50%',
    positionMobile: '70% 50%',
  },

  // A quiet, private boardroom — the governance table of a family holding.
  // The table and chairs sit low in the frame, so wider crops give up the
  // ceiling and keep the floor line; on a phone the table is centred.
  'family-office-structuring': {
    image: 'lounge-dark',
    alt: 'A private boardroom with a long table, timber columns and floor-to-ceiling windows',
    position: '50% 85%',
    positionMobile: '48% 50%',
  },

  // Downtown Dubai with the Burj Khalifa at its centre. The spire sits near
  // the top of the photograph, so wide crops hold high to keep the whole
  // tower; on a phone the square keeps the full height and centres the tower.
  'corporate-advisory-in-dubai': {
    image: 'business-bay',
    alt: 'Downtown Dubai at dusk, with the Burj Khalifa rising above the business district',
    position: '52% 20%',
    positionMobile: '52% 50%',
  },
};

/**
 * The article-page photograph for an Insight. An article not yet in the map
 * falls back to its own index image, so a new entry renders before it has
 * been art-directed.
 */
export function insightImage(insight: Insight): InsightImage {
  return (
    insightImages[insight.slug] ?? {
      image: insight.image,
      alt: insight.imageAlt,
      position: insight.focal ?? '50% 50%',
    }
  );
}
