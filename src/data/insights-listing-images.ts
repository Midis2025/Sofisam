/**
 * Photography for the cards on the Insights index (/insights) — that page only.
 *
 * The homepage keeps the images set on each entry in `insights.ts`, and the
 * article pages keep theirs in `insight-images.ts`; nothing here reaches either.
 *
 * Sources — all free to use under the Unsplash License (https://unsplash.com/license),
 * ingested with `node scripts/images.mjs` into the 640–3200 WebP/AVIF ladder:
 *
 *   insights-global-markets-2026        Val Vesa           unsplash.com/photos/u64sw37eHZY   5828×4371
 *   insights-family-office-structuring  Pavel Gromov       unsplash.com/photos/wEi2LkDF8LY   3648×4560, cut to a
 *                                                          3:2 landscape (top 1186px) around the table and the view
 *   insights-corporate-advisory-dubai   Fabien Bellanger   unsplash.com/photos/WyfXOHgI49s   7883×5604
 *
 * `focal` is the object-position for the card frames, read off each photograph:
 * the featured card is 16:10 on phones, 16:9 from sm and roughly 2:1 from lg;
 * the other cards are 16:9 throughout.
 */

export interface ListingImage {
  image: string;
  alt: string;
  focal: string;
}

export const insightsListingImages: Record<string, ListingImage> = {
  // Skyline across the lower middle of a 4:3 frame under a band of dusk light;
  // holding a little low keeps the light, the towers and a strip of water.
  'global-market-shifts-2026-outlook': {
    image: 'insights-global-markets-2026',
    alt: 'City skyline at dusk across the water, representing international financial markets',
    focal: '50% 55%',
  },

  // Table in the lower half, horizon and city view above it.
  'family-office-structuring': {
    image: 'insights-family-office-structuring',
    alt: 'A quiet executive boardroom overlooking the city at dusk, representing family office governance',
    focal: '50% 40%',
  },

  // The Burj Khalifa's spire sits near the top of the frame; holding high keeps
  // the whole tower and the business district below it.
  'corporate-advisory-in-dubai': {
    image: 'insights-corporate-advisory-dubai',
    alt: 'Downtown Dubai at blue hour, with the Burj Khalifa above the business district',
    focal: '50% 10%',
  },
};

/** The /insights card photograph for an article, if one has been set. */
export const listingImage = (slug: string): ListingImage | undefined =>
  insightsListingImages[slug];
