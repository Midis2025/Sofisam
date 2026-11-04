import imageMeta from '@/data/image-meta.json';

interface Meta {
  w: number;
  h: number;
  /** Actual generated widths, in ascending order. */
  variants: number[];
  blur: string;
  /** An AVIF sibling exists for every rung (scripts/avif.mjs). */
  avif?: boolean;
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

function srcFor(name: string, width: number, ext: 'webp' | 'avif' = 'webp') {
  return `/images/${name}-${width}.${ext}`;
}

/**
 * Responsive image backed by pre-generated AVIF and WebP variants.
 *
 * Variants are produced ahead of time into /public/images as
 * `${name}-${width}.webp`, so no runtime optimisation pass is required. The
 * widths differ per asset — very tall crops are capped on their long edge —
 * so the srcset descriptors come from the generated manifest rather than a
 * fixed ladder.
 *
 * Where the AVIF set is meaningfully lighter it is offered first through a
 * <source>; a browser without AVIF skips it and takes the WebP. The <picture>
 * is `display: contents`, so the <img> is laid out against the same parent as
 * it would be on its own — every class and selector aimed at it still holds.
 *
 * The 20px placeholder is painted as the image's own background, so the frame
 * shows a soft impression of the photograph from the first paint, and the
 * full image replaces it in one step once decoded. The intrinsic width and
 * height reserve the box before any byte arrives.
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
  const avifSet = m.avif ? m.variants.map((w) => `${srcFor(name, w, 'avif')} ${w}w`).join(', ') : null;
  // Prefer a mid-ladder variant as the non-srcset fallback.
  const fallbackWidth = m.variants[Math.min(2, m.variants.length - 1)];
  const src = srcFor(name, fallbackWidth);

  // A priority image is loaded eagerly at high fetch priority, but no preload
  // hint is emitted: the <img> is already in the initial HTML, so the hint buys
  // almost nothing, and route prefetching carried those hints onto pages that
  // never render the image — which the browser reports as an unused preload.

  const img = (
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

  if (!avifSet) return img;

  return (
    <picture style={{ display: 'contents' }}>
      <source type="image/avif" srcSet={avifSet} sizes={sizes} />
      {img}
    </picture>
  );
}
