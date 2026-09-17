'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

import { Picture } from '@/components/ui/Picture';
import { useIntroDelay } from '@/lib/intro';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  /**
   * The name this frame takes in the page index. It defaults to the eyebrow,
   * which on most pages is the page's own name; where the eyebrow is a
   * position in a series ('Service 02') or a category rather than a name, the
   * page passes the name itself.
   */
  sectionLabel?: string;
  /** Line breaks for narrow measures. */
  headline: string[];
  /** Optional longer breaks used from lg, where the measure allows fewer lines. */
  headlineWide?: string[];
  standfirst?: string;
  image: string;
  imageAlt: string;
  focal?: string;
  crumbs?: Crumb[];
  /** Extra content rendered under the standfirst (meta rows, actions). */
  children?: ReactNode;
  /** A deeper frame for the three service pages. */
  size?: 'tall' | 'standard';
}

/**
 * Inner-page hero.
 *
 * One cinematic frame for every page below the homepage: the page's own
 * architectural photograph running edge to edge under a scrim, the trail at
 * the top of the frame and the statement held to the bottom-left of the
 * measure. It shares the homepage's language without repeating its full
 * viewport height, and it never falls into the image-beside-text arrangement
 * the content sections use.
 *
 * The photograph settles out of a slight scale on entry; the headline arrives
 * from behind its own mask, line by line.
 */
export function PageHero({
  eyebrow,
  sectionLabel,
  headline,
  headlineWide,
  standfirst,
  image,
  imageAlt,
  focal,
  crumbs,
  children,
  size = 'standard',
}: PageHeroProps) {
  const reduce = useReducedMotion();
  const d = useIntroDelay(0.55, 0.05);
  const minH = size === 'tall' ? 'min-h-[clamp(34rem,80vh,50rem)]' : 'min-h-[clamp(30rem,68vh,44rem)]';
  const full = (headlineWide ?? headline).join(' ');

  return (
    <section
      data-section={sectionLabel ?? eyebrow}
      className="ground-void veil-bottom grain relative w-full overflow-hidden"
      aria-label={`${headline.join(' ')} — introduction`}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: d }}
      >
        <Picture
          name={image}
          alt={imageAlt}
          sizes="100vw"
          priority
          focal={focal}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* A short band under the header so the fixed navigation and the trail
          always have a ground, whatever the photograph is doing up there. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[calc(var(--header-h)+9rem)] bg-gradient-to-b from-ink/90 via-ink/60 to-transparent"
      />

      <div
        className={`shell relative z-10 flex flex-col pb-[clamp(2.5rem,5vw,4.5rem)] pt-[calc(var(--header-h)+clamp(1.5rem,4vh,2.75rem))] ${minH}`}
      >
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: d + 0.1 }}
          >
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] uppercase tracking-[0.16em] text-ivory/60">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <ChevronRight aria-hidden strokeWidth={1.4} className="h-3 w-3 text-stone" />
                  )}
                  {c.href ? (
                    <Link href={c.href} className="link-underline inline-block py-2 hover:text-ivory">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="inline-block py-2 text-ivory/90">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        {/* Statement — bottom-weighted */}
        <div className="mt-auto w-full max-w-[min(100%,62rem)] pt-[clamp(2rem,6vh,4rem)]">
          <motion.div
            className="kicker"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: d + 0.16 }}
          >
            <p className="t-label text-gold">{eyebrow}</p>
          </motion.div>

          <h1 className="t-display mt-[clamp(1rem,2vw,1.75rem)] max-w-[18ch] text-ivory lg:max-w-[20ch]">
            {headlineWide ? (
              <>
                <span className="sr-only">{full}</span>
                <span aria-hidden className="block lg:hidden">
                  <Lines lines={headline} reduce={reduce} delay={d + 0.22} />
                </span>
                <span aria-hidden className="hidden lg:block">
                  <Lines lines={headlineWide} reduce={reduce} delay={d + 0.22} />
                </span>
              </>
            ) : (
              <Lines lines={headline} reduce={reduce} delay={d + 0.22} />
            )}
          </h1>

          {standfirst && (
            <motion.p
              className="t-lead mt-[clamp(1.25rem,2.2vw,2rem)] max-w-[46rem] text-ivory/75"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: d + 0.5 }}
            >
              {standfirst}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: d + 0.62 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Masked line reveal for the headline. */
function Lines({
  lines,
  reduce,
  delay,
}: {
  lines: string[];
  reduce: boolean | null;
  delay: number;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.07em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: '112%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}
