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
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const pending = root.dataset.preload === 'pending';

    if (!pending) {
      setVisible(false);
      return;
    }

    const finish = () => {
      setVisible(false);
      root.dataset.preload = 'done';
      try {
        sessionStorage.setItem('sofisam:intro', '1');
      } catch {
        /* Private browsing — the sequence simply plays again. */
      }
    };

    const t = setTimeout(finish, reduce ? 200 : 1850);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden
          data-preloader
          data-tone-ignore
          className="fixed inset-0 z-[200] flex items-center justify-center bg-void"
          initial={false}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.2 } }
              : {
                  clipPath: 'inset(0% 0% 100% 0%)',
                  transition: { duration: 0.95, ease: EASE, delay: 0.05 },
                }
          }
        >
          <div className="flex flex-col items-center px-8">
            {/* Wordmark */}
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              <Logo alt="" className="h-[2.1rem] w-auto sm:h-[2.6rem]" />
            </motion.span>

            {/* The rule draws across, then the label settles under it. */}
            <motion.span
              className="mt-7 block h-px w-[clamp(7rem,26vw,13rem)] origin-left bg-gold"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, ease: EASE, delay: 0.42 }}
            />

            <motion.p
              className="t-label mt-6 text-center text-stone"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
            >
              Dubai — DMCC
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Runs before first paint. Kept as a string so it can be inlined into the
 * document head without a hydration boundary.
 */
export const preloadInitScript = `(function(){var d=document.documentElement;try{d.dataset.preload=sessionStorage.getItem('sofisam:intro')?'done':'pending';}catch(e){d.dataset.preload='pending';}if(d.dataset.preload==='pending'){setTimeout(function(){if(d.dataset.preload==='pending'){d.dataset.preload='done';d.classList.add('preload-timeout');}},4000);}})();`;
