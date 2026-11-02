'use client';

import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
    <Button
      variant="link"
      arrow="none"
      onClick={toTop}
      className={className}
    >
      <span>Back to top</span>
      <ArrowUp
        aria-hidden
        strokeWidth={1.5}
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </Button>
  );
}
