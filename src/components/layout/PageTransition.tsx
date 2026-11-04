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

  // The same element is rendered whether or not motion is reduced, and only
  // its motion is switched off. The server cannot know the preference, so a
  // different tree for reduced motion failed hydration on every page: React
  // threw the server HTML away and rebuilt the whole page on the client.
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -10 }}
        transition={reduce ? { duration: 0 } : { duration: 0.55, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
