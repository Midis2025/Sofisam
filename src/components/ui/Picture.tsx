import imageMeta from '@/data/image-meta.json';

interface Meta {
  w: number;
  h: number;
  /** Actual generated widths, in ascending order. */
  variants: number[];
  blur: string;
}

const meta = imageMeta as Record<string, Meta>;

export interface PictureProps {
  /** Base name of the asset in /public/images (without size suffix). */
  name: string;
  alt: string;
  /** `sizes` attribute — always provide a realistic value. */
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** object-position value, e.g. "50% 30%" */
  focal?: string;
  /** Eager-load and preload. Use only for above-the-fold hero media. */
  priority?: boolean;
  /** Render as decorative (empty alt + aria-hidden). */
  decorative?: boolean;
}

function srcFor(name: string, width: number) {
  return `/images/${name}-${width}.webp`;
}

/**
 * Responsive image backed by pre-generated WebP variants.
 *
 * Variants are produced ahead of time into /public/images as
 * `${name}-${width}.webp`, so no runtime optimisation pass is required. The
 * widths differ per asset — very tall crops are capped on their long edge —
 * so the srcset descriptors come from the generated manifest rather than a
 * fixed ladder.
 */
export function Picture({
  name,
  alt,
  sizes = '100vw',
  className = '',
  imgClassName = '',
  focal,
  priority = false,
  decorative = false,
}: PictureProps) {
  const m = meta[name];

  if (!m) {
    // A missing manifest entry is a build-time authoring error, not a runtime
    // state to design around — fail loudly in development rather than silently
    // rendering a broken image.
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`Picture: no generated variants for image "${name}"`);
    }
    return null;
  }

  const srcSet = m.variants.map((w) => `${srcFor(name, w)} ${w}w`).join(', ');
  // Prefer a mid-ladder variant as the non-srcset fallback.
  const fallbackWidth = m.variants[Math.min(2, m.variants.length - 1)];
  const src = srcFor(name, fallbackWidth);

  // A priority image is loaded eagerly at high fetch priority, but no preload
  // hint is emitted: the <img> is already in the initial HTML, so the hint buys
  // almost nothing, and route prefetching carried those hints onto pages that
  // never render the image — which the browser reports as an unused preload.

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={decorative ? '' : alt}
      aria-hidden={decorative || undefined}
      width={m.w}
      height={m.h}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={`${className} ${imgClassName}`.trim()}
      style={{
        objectPosition: focal,
        backgroundImage: `url(${m.blur})`,
        backgroundSize: 'cover',
        backgroundPosition: focal ?? 'center',
      }}
    />
  );
}

export function getImageMeta(name: string) {
  return meta[name];
}
