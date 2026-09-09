'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

import { Picture } from '@/components/ui/Picture';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
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
  /** A slightly deeper minimum for the three service pages. */
  size?: 'tall' | 'standard';
}

/**
 * Internal-page hero — one alignment system for every inner page.
 *
 * The statement and the plate share a single grid: the statement takes a little
 * over half, and the plate is taken out of the row's height calculation so it
 * starts and finishes with the text beside it rather than towering past it. The
 * row therefore sizes itself from the content, which keeps these heroes in the
 * 520–720px range instead of becoming full-screen banners.
 *
 * The ground stays dark because the fixed header sits over it before any
 * scroll, and the header's wordmark is the light one.
 */
export function PageHero({
  eyebrow,
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
  const minH = size === 'tall' ? 'lg:min-h-[26rem]' : 'lg:min-h-[24rem]';
  const full = (headlineWide ?? headline).join(' ');

  return (
    <section
      className="rd-dark relative w-full"
      aria-label={`${headline.join(' ')} — introduction`}
    >
      <div className="rd-shell pb-[clamp(3rem,5vw,6rem)] pt-[calc(var(--header-h)+clamp(2.5rem,6vh,4.5rem))]">
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            className="mb-[clamp(2rem,3.4vw,4rem)]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] uppercase tracking-[0.16em] text-bone/45">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <ChevronRight aria-hidden strokeWidth={1.4} className="h-3 w-3 text-bone/25" />
                  )}
                  {c.href ? (
                    <Link href={c.href} className="link-underline inline-block py-2 hover:text-bone">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="inline-block py-2 text-bone/75">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        <div
          className={`grid items-stretch gap-[clamp(2rem,6vw,6.875rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(26.25rem,0.95fr)]`}
        >
          {/* Statement */}
          <div className="flex flex-col justify-center">
            <motion.div
              className="rd-kicker"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
            >
              <p className="rd-label">{eyebrow}</p>
            </motion.div>

            <h1 className="rd-display mt-[clamp(1rem,2vw,1.75rem)] max-w-[18ch] text-bone lg:max-w-[56.25rem]">
              {headlineWide ? (
                <>
                  <span className="sr-only">{full}</span>
                  <span aria-hidden className="block lg:hidden">
                    <Lines lines={headline} reduce={reduce} />
                  </span>
                  <span aria-hidden className="hidden lg:block">
                    <Lines lines={headlineWide} reduce={reduce} />
                  </span>
                </>
              ) : (
                <Lines lines={headline} reduce={reduce} />
              )}
            </h1>

            {standfirst && (
              <motion.p
                className="rd-lead mt-[clamp(1.5rem,2.4vw,2.75rem)] max-w-[45rem] text-bone/70"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
              >
                {standfirst}
              </motion.p>
            )}

            {children && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.62 }}
              >
                {children}
              </motion.div>
            )}
          </div>

          {/* Plate — out of the height calculation from lg, so the row is sized
              by the statement and the two finish together. */}
          <motion.div
            className={`lg:relative lg:h-full lg:max-h-[42.5rem] ${minH}`}
            initial={reduce ? false : { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1, ease: EASE, delay: 0.28 }}
          >
            <div className="rd-media aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
              <Picture
                name={image}
                alt={imageAlt}
                sizes="(min-width:1024px) 46vw, 100vw"
                priority
                focal={focal}
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Masked line reveal for the headline. */
function Lines({ lines, reduce }: { lines: string[]; reduce: boolean | null }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.07em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.24 + i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}
