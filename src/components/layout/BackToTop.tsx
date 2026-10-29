'use client';

import { ArrowUp } from 'lucide-react';

/**
 * Returns to the top of the page — smoothly, unless the visitor has asked
 * for less motion — and hands keyboard focus back to the top as well, so a
 * keyboard user lands where a pointer user's eye does.
 */
export function BackToTop({ className = '' }: { className?: string }) {
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    const main = document.getElementById('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
  };

  return (
    <button type="button" onClick={toTop} className={`group inline-flex items-center gap-2 ${className}`}>
      <span className="link-underline">Back to top</span>
      <ArrowUp
        aria-hidden
        strokeWidth={1.5}
        className="h-3.5 w-3.5 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5"
      />
    </button>
  );
}
