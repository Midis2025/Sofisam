'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'figure' | 'article' | 'header';
}

/** Fade + rise on scroll entry. Motion is dropped entirely under reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduce) {
    const Static = as as 'div';
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.95, ease: EASE, delay }}
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
  stagger = 0.11,
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
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
    >
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{ hidden: { y: '112%' }, visible: { y: '0%' } }}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Thin rule that draws itself in from the left. */
export function DrawRule({
  className = '',
  tone = 'dark',
  delay = 0,
}: {
  className?: string;
  tone?: 'dark' | 'light';
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const color = tone === 'dark' ? 'bg-ink/15' : 'bg-bone/20';

  if (reduce) return <span className={`block h-px w-full ${color} ${className}`} />;

  return (
    <motion.span
      className={`block h-px w-full origin-left ${color} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.25, ease: EASE, delay }}
    />
  );
}

/** Image that uncovers itself with a clip-path wipe. */
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
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 1.35, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
