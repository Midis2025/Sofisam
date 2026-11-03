'use client';

import type { ReactNode } from 'react';

import { Reveal, MaskedLines } from '@/components/animations/Reveal';

export interface SectionHeaderProps {
  /** Small uppercase label set on the brass rule. */
  label: string;
  /** The heading. Written as one string and left to wrap (balanced) on its own. */
  heading: string;
  /** id for the heading, for the section's aria-labelledby. */
  headingId?: string;
  /**
   * Supporting copy, held to the right of the heading from 768px and stacked
   * beneath it on mobile. A string renders as the standard note paragraph;
   * pass nodes when the note needs more than one paragraph or an action.
   */
  copy?: ReactNode;
  /** Draws the hairline rule under the header (most sections that list content beneath). */
  ruled?: boolean;
  className?: string;
}

/**
 * The one header used by every editorial section: label, heading and an
 * optional note on a single shared grid (`.section-header` in globals.css).
 * Sections must not position their headers themselves — spacing, column
 * proportions and the note's alignment to the heading all live in that one
 * rule set, so every header on the site lines up the same way.
 */
export function SectionHeader({
  label,
  heading,
  headingId,
  copy,
  ruled = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <header
      className={['section-header', ruled ? 'section-header--ruled' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="section-header__main">
        <Reveal kind="label" className="kicker">
          <p className="t-label">{label}</p>
        </Reveal>

        <h2 id={headingId} className="section-heading t-h2">
          <MaskedLines lines={[heading]} />
        </h2>
      </div>

      {copy ? (
        <Reveal delay={0.12} className="section-header__copy">
          {typeof copy === 'string' ? (
            <p className="t-body text-[var(--sage)]">{copy}</p>
          ) : (
            copy
          )}
        </Reveal>
      ) : null}
    </header>
  );
}
