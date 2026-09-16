'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/**
 * Subtle vertical parallax for full-bleed media.
 *
 * The child is laid out overhanging the frame by `strength` percent at the top
 * and the bottom, and then travels by exactly that overhang as the frame
 * crosses the viewport — so the frame is fully covered at both extremes and
 * never reveals a gap.
 *
 * The element this is applied to must establish a containing block: pass a
 * class that positions it (`absolute inset-0`, or the site's own `.media`,
 * which is relative).
 */
export function Parallax({
  children,
  className = '',
  strength = 10,
}: {
  children: ReactNode;
  className?: string;
  /** Overhang and travel, as a percentage of the frame's height. */
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // `y` is a percentage of the CHILD's height, and the child is taller than
  // the frame by 2 × strength. Converting keeps the travel equal to the
  // overhang rather than overshooting it.
  const travel = (strength / (1 + (2 * strength) / 100)).toFixed(3);
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  if (reduce) {
    return (
      <div ref={ref} className={`${className} overflow-hidden`}>
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      <motion.div
        style={{ y, top: `-${strength}%`, bottom: `-${strength}%` }}
        className="absolute inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
