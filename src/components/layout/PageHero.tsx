'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

import { Picture } from '@/components/ui/Picture';

const EASE = [0.16, 1, 0.3, 1] as const;

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow: string;
  /** Discrete display lines — controls the masked reveal, so break them yourself. */
  headline: string[];
  standfirst?: string;
  image: string;
  imageAlt: string;
  focal?: string;
  crumbs?: Crumb[];
  /** Extra content rendered under the standfirst (meta rows, actions). */
  children?: ReactNode;
  /** Slightly more presence for the three service pages. */
  size?: 'tall' | 'standard';
}

/**
 * Internal-page hero.
 *
 * A contained editorial band rather than a full-screen plate: the statement
 * sits beside a rounded image, and the section is only as tall as its content.
 * The ground stays dark because the fixed header sits over it before any
 * scroll, and the header's light wordmark has to stay legible.
 */
export function PageHero({
  eyebrow,
  headline,
  standfirst,
  image,
  imageAlt,
  focal,
  crumbs,
  children,
  size = 'standard',
}: PageHeroProps) {
  const reduce = useReducedMotion();

  const plate =
    size === 'tall'
      ? 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]'
      : 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3]';

  return (
    <section
      className="rd-dark relative w-full"
      aria-label={`${headline.join(' ')} — introduction`}
    >
      <div className="rd-shell below-header pb-[var(--rd-pad-sm)]">
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            className="mb-[clamp(1.5rem,2.6vw,2.5rem)]"
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

        <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-center lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
          {/* Statement */}
          <div className="lg:col-span-7">
            <motion.div
              className="rd-kicker"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.16 }}
            >
              <p className="rd-label">{eyebrow}</p>
            </motion.div>

            <h1 className="rd-display mt-[clamp(1.25rem,2.6vw,2rem)] max-w-[18ch] text-bone">
              {headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.07em]">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: '112%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.88, ease: EASE, delay: 0.24 + i * 0.09 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {standfirst && (
              <motion.p
                className="rd-lead mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[50ch] text-bone/70"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              >
                {standfirst}
              </motion.p>
            )}

            {children && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.62 }}
              >
                {children}
              </motion.div>
            )}
          </div>

          {/* Plate */}
          <motion.div
            className="lg:col-span-5"
            initial={reduce ? false : { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          >
            <div className={`rd-media w-full ${plate}`}>
              <Picture
                name={image}
                alt={imageAlt}
                sizes="(min-width:1024px) 42vw, 100vw"
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
