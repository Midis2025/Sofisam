'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/** One easing for the whole site. */
const EASE = [0.22, 1, 0.36, 1] as const;

/** Motion language: a label moves least, a heading most. */
const KIND = {
  label: { y: 12, duration: 0.46 },
  heading: { y: 24, duration: 0.64 },
  body: { y: 18, duration: 0.58 },
} as const;

export type RevealKind = keyof typeof KIND;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Overrides the distance implied by `kind`. */
  y?: number;
  /** Overrides the duration implied by `kind`. */
  duration?: number;
  kind?: RevealKind;
  once?: boolean;
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'figure' | 'article' | 'header';
}

/** Fade + rise on scroll entry. Motion is dropped entirely under reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y,
  duration,
  kind = 'body',
  once = true,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  const spec = KIND[kind];

  if (reduce) {
    const Static = as as 'div';
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: y ?? spec.y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px -10% 0px' }}
      transition={{ duration: duration ?? spec.duration, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/**
 * Splits a heading into lines and reveals each from behind a mask.
 * Pass discrete lines — this does not attempt to measure wrapping.
 */
export function MaskedLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.08,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((l) => (
          <span key={l} className={`block ${lineClassName}`}>
            {l}
          </span>
        ))}
      </span>
    );
  }

  // The observer must sit on an element that is NOT clipped: a line masked by
  // an overflow-hidden parent has an empty intersection rect while it is
  // translated out of view, so whileInView placed on it would never fire.
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8% 0px -10% 0px' }}
    >
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{ hidden: { y: '110%' }, visible: { y: '0%' } }}
            transition={{ duration: 0.7, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}


/**
 * A numbered row: the divider grows from the left, the number fades and the
 * content lifts. Used for the principle and process ledgers.
 */
export function RowReveal({
  children,
  className = '',
  delay = 0,
  tone = 'dark',
  as = 'li',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  tone?: 'dark' | 'light';
  as?: 'li' | 'div';
}) {
  const reduce = useReducedMotion();
  const Comp = (as === 'li' ? motion.li : motion.div) as typeof motion.div;
  const line = tone === 'dark' ? 'bg-[var(--line)]' : 'bg-[var(--line-inv)]';

  if (reduce) {
    const Static = as as 'div';
    return (
      <Static className={`relative ${className}`}>
        <span aria-hidden className={`absolute inset-x-0 top-0 block h-px ${line}`} />
        {children}
      </Static>
    );
  }

  return (
    <Comp
      className={`relative ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-6% 0px -8% 0px' }}
    >
      <motion.span
        aria-hidden
        className={`absolute inset-x-0 top-0 block h-px origin-left ${line}`}
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 0.8, ease: EASE, delay }}
      />
      <motion.div
        variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, ease: EASE, delay: delay + 0.08 }}
      >
        {children}
      </motion.div>
    </Comp>
  );
}

/** Image that uncovers itself with a clip-path wipe and a slight settle. */
export function ImageReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, margin: '-6% 0px -8% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
