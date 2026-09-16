'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/** Hairline reading-progress indicator pinned to the top of the viewport. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 40,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[105] h-px origin-left bg-gold"
    />
  );
}
