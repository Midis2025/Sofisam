'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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
   * The section's own name, for the `data-section` hook. It defaults to the
   * eyebrow, which on most pages is the page's own name; where the eyebrow is
   * a position in a series ('Service 02') the page passes the name itself.
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
 * The homepage's opening in a shorter form, so every page begins the same
 * way: the trail, the statement and its standfirst set on the ivory page, and
 * the page's own photograph under them in a single framed plate. The plate
 * settles out of a slight scale on entry and then travels a few per cent
 * against the scroll; the headline arrives from behind its own mask, line by
 * line.
 *
 * Nothing here is set over the photograph, so nothing here needs a scrim —
 * the type is charcoal on ivory in the light theme and follows the page in
 * the dark one.
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
  const full = (headlineWide ?? headline).join(' ');
  const plate = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: plate, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  const plateH =
    size === 'tall' ? 'h-[clamp(18rem,56vh,40rem)]' : 'h-[clamp(16rem,46vh,34rem)]';

  return (
    <section
      data-section={sectionLabel ?? eyebrow}
      className="ground-void relative w-full"
      aria-label={`${headline.join(' ')} — introduction`}
    >
      <div className="shell pt-[calc(var(--header-h)+clamp(1.25rem,4vh,2.5rem))]">
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: d + 0.05 }}
          >
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-stone">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight aria-hidden strokeWidth={1.4} className="h-3 w-3" />}
                  {c.href ? (
                    <Link href={c.href} className="link-underline inline-block py-2 hover:text-ivory">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="inline-block py-2 text-ivory-2">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        <div className="grid gap-x-[var(--gap)] gap-y-[clamp(1.5rem,3vw,2.5rem)] pb-[clamp(2.25rem,5vw,3.75rem)] pt-[clamp(1.75rem,5vh,3.5rem)] lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div
              className="kicker"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: d + 0.12 }}
            >
              <p className="t-label text-gold">{eyebrow}</p>
            </motion.div>

            <h1 className="t-display mt-[clamp(1rem,2vw,1.5rem)] max-w-[18ch] text-ivory lg:max-w-[20ch]">
              {headlineWide ? (
                <>
                  <span className="sr-only">{full}</span>
                  <span aria-hidden className="block lg:hidden">
                    <Lines lines={headline} reduce={reduce} delay={d + 0.18} />
                  </span>
                  <span aria-hidden className="hidden lg:block">
                    <Lines lines={headlineWide} reduce={reduce} delay={d + 0.18} />
                  </span>
                </>
              ) : (
                <Lines lines={headline} reduce={reduce} delay={d + 0.18} />
              )}
            </h1>
          </div>

          {(standfirst || children) && (
            <motion.div
              className="lg:col-span-4 lg:pb-[0.4rem]"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: d + 0.42 }}
            >
              {standfirst && <p className="t-lead max-w-[42ch] text-sage">{standfirst}</p>}
              {children}
            </motion.div>
          )}
        </div>

        <motion.div
          ref={plate}
          className={`relative w-full overflow-hidden rounded-[var(--r-lg)] bg-graphite ${plateH}`}
          initial={reduce ? false : { opacity: 0, clipPath: 'inset(8% 0% 0% 0% round 6px)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 6px)' }}
          transition={{ duration: 1.3, ease: EASE, delay: d + 0.2 }}
        >
          <motion.div className="absolute inset-x-0 -inset-y-[6%]" style={reduce ? undefined : { y }}>
            <Picture
              name={image}
              alt={imageAlt}
              sizes="(min-width: 1600px) 1600px, 100vw"
              priority
              focal={focal}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
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
        <span key={line} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: '110%' }}
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
