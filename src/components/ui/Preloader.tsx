'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Logo } from '@/components/ui/Logo';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The opening sequence.
 *
 * A curtain in the theme's own ground carrying the wordmark, a gold rule that draws itself
 * across beneath it, and then a lift to reveal the page. It plays once per
 * browser session: an inline script in the document head sets
 * `data-preload="pending"` on <html> before first paint, and this component
 * clears it when the sequence finishes.
 *
 * The curtain is part of the server-rendered HTML, so there is never a frame
 * of unveiled page before hydration. On a return navigation within the session
 * the attribute is already `done` and the whole thing is skipped.
 */
export function Preloader() {
  return null;
}

/**
 * Runs before first paint. Kept as a string so it can be inlined into the
 * document head without a hydration boundary.
 */
export const preloadInitScript = `(function(){var d=document.documentElement;try{d.dataset.preload=sessionStorage.getItem('sofisam:intro')?'done':'pending';}catch(e){d.dataset.preload='pending';}if(d.dataset.preload==='pending'){setTimeout(function(){if(d.dataset.preload==='pending'){d.dataset.preload='done';d.classList.add('preload-timeout');}},4000);}})();`;
