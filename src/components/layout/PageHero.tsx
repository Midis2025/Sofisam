'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
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
  /** Shorter hero for article and utility pages. */
  size?: 'tall' | 'standard';
}

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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const minH =
    size === 'tall'
      ? 'min-h-[min(100svh,54rem)]'
      : 'min-h-[min(88svh,46rem)]';

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden bg-ink ${minH}`}
      aria-label={`${headline.join(' ')} — introduction`}
    >
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: mediaY }}>
        <motion.div
          className="media veil-bottom absolute inset-0 h-[116%] w-full"
          initial={reduce ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.7, ease: EASE }}
        >
          <Picture
            name={image}
            alt={imageAlt}
            sizes="100vw"
            priority
            focal={focal}
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>


      <motion.div
        className={`shell-wide relative z-10 flex ${minH} flex-col justify-end pb-[var(--space-section-md)] pt-[7.5rem]`}
        style={reduce ? undefined : { opacity: fade }}
      >
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            className="mb-8"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
          >
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] uppercase tracking-[0.18em] text-bone/45">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <ChevronRight aria-hidden strokeWidth={1.4} className="h-3 w-3 text-bone/25" />
                  )}
                  {c.href ? (
                    <Link href={c.href} className="link-underline inline-block py-2.5 hover:text-bone">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="inline-block py-2.5 text-bone/75">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        <motion.div
          className="flex items-center gap-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.18 }}
        >
          <motion.span
            aria-hidden
            className="block h-px w-10 origin-left bg-gold sm:w-16"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.22 }}
          />
          <p className="t-label text-gold">{eyebrow}</p>
        </motion.div>

        <h1 className="t-h1 mt-6 max-w-[22ch] text-bone sm:mt-8">
          {headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.07em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.88, ease: EASE, delay: 0.26 + i * 0.09 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {standfirst && (
          <motion.p
            className="t-lead mt-7 max-w-[52ch] text-bone/65"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.58 }}
          >
            {standfirst}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.72 }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
