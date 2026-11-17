import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Back-navigation to the Insights index — the one treatment used wherever an
 * article links back to the publication.
 *
 * The arrow and label sit on one line: the arrow in the brass accent, the
 * label in the page's charcoal small capitals. On hover or focus the arrow
 * eases a few pixels left and a hairline of brass draws in under the label,
 * while the label itself holds still.
 *
 * The control has no horizontal padding, so its left edge is the container's
 * left edge and it lines up with the category, title and image beneath it. The
 * tap target is made up vertically (44px tall) rather than by indenting it.
 * Should the label ever wrap, the arrow stays aligned with its first line.
 */
export function BackToInsights({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/insights"
      className={`group inline-flex min-h-11 max-w-full items-center rounded-[var(--r-sm)] py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brass)] ${className}`}
    >
      <span className="flex items-start gap-3">
        <ArrowLeft
          aria-hidden
          strokeWidth={1.5}
          className="mt-px h-3.5 w-3.5 shrink-0 text-[var(--gold)] transition-transform duration-[250ms] ease-out group-hover:-translate-x-1 group-focus-visible:-translate-x-1"
        />
        <span className="relative text-xs font-semibold uppercase leading-4 tracking-[0.12em] text-[var(--ivory)]">
          Return to All Insights
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-[250ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
          />
        </span>
      </span>
    </Link>
  );
}
