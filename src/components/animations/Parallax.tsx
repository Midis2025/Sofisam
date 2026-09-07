'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/**
 * Subtle vertical parallax for full-bleed media.
 * `strength` is expressed as a percentage of the element's own height.
 */
export function Parallax({
  children,
  className = '',
  strength = 12,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      <motion.div style={{ y }} className="h-[calc(100%+var(--par,26%))] w-full">
        {children}
      </motion.div>
    </div>
  );
}

/** Scales media down slightly as it scrolls through the viewport. */
export function ScaleOnScroll({
  children,
  className = '',
  from = 1.16,
  to = 1,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      <motion.div style={{ scale }} className="h-full w-full origin-center">
        {children}
      </motion.div>
    </div>
  );
}
