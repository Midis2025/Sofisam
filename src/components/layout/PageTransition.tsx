'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Route transition.
 *
 * The outgoing page settles and fades, the incoming one rises into place after
 * it. Deliberately brief and deliberately vertical — it matches the direction
 * everything else on the site enters from, and a long page transition reads as
 * latency rather than polish.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
