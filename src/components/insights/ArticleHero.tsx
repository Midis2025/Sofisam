'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';

import { Picture, pictureBlur } from '@/components/ui/Picture';
import type { InsightImage } from '@/data/insight-images';
import { useIntroDelay } from '@/lib/intro';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Classes for each `contain` breakpoint, written out in full so Tailwind sees
 * them. From that breakpoint the image is fitted rather than cropped, its own
 * placeholder is dropped, and the wash behind it is shown instead.
 */
const CONTAIN = {
  sm: { img: 'sm:object-contain sm:!bg-none', wash: 'hidden sm:block' },
  lg: { img: 'lg:object-contain lg:!bg-none', wash: 'hidden lg:block' },
} as const;

/**
 * Rendered width of a fitted portrait image, for `sizes`: at 2:1 and 21:9 a
 * 3:4 or 2:3 photograph shown whole is about a third of the frame's width.
 */
const SIZES = {
  cover: '(min-width: 1600px) 1600px, 100vw',
  sm: '(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw',
  lg: '(min-width: 1024px) 40vw, 100vw',
} as const;

interface ArticleHeroProps {
  art: InsightImage;
  className?: string;
}

/**
 * The article's lead image.
 *
 * One frame for every article — square on phones, 3:2 from sm, 2:1 from lg,
 * 21:9 from xl — so the proportions are the same across the publication and
 * the box is reserved before a byte of the image arrives. What changes per
 * article is the art direction in `insight-images.ts`: where to hold the crop and,
 * for a photograph no crop of the wider frame can do justice to, the
 * breakpoint from which it is shown whole over a soft wash of itself.
 *
 * The frame never scales or shifts its image, so a fitted photograph stays
 * whole and a cropped one stays exactly where it was framed.
 */
export function ArticleHero({ art, className = '' }: ArticleHeroProps) {
  const { image, alt } = art;
  const reduce = useReducedMotion();
  const d = useIntroDelay(0.55, 0.05);
  const contain = art.contain ? CONTAIN[art.contain] : null;
  const wash = contain ? pictureBlur(image) : undefined;

  const style = {
    '--pos': art.position,
    '--pos-m': art.positionMobile ?? art.position,
  } as CSSProperties;

  return (
    <motion.figure
      className={`relative aspect-square w-full overflow-hidden rounded-[var(--r-lg)] bg-graphite sm:aspect-[3/2] lg:aspect-[2/1] xl:aspect-[21/9] ${className}`}
      style={style}
      initial={{ opacity: 0, clipPath: 'inset(8% 0% 0% 0% round 6px)' }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 6px)' }}
      transition={reduce ? { duration: 0 } : { duration: 1.3, ease: EASE, delay: d + 0.2 }}
    >
      {contain && wash && (
        <div aria-hidden className={`${contain.wash} absolute inset-0`}>
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
            style={{ backgroundImage: `url(${wash})` }}
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      )}

      <Picture
        name={image}
        alt={alt}
        sizes={SIZES[art.contain ?? 'cover']}
        priority
        className={`relative h-full w-full object-cover [object-position:var(--pos-m)] sm:[object-position:var(--pos)] ${contain?.img ?? ''}`}
      />
    </motion.figure>
  );
}
