'use client';

import type { ReactNode } from 'react';

import { Reveal } from '@/components/animations/Reveal';

interface ServiceIntroProps {
  /** id of the heading this section is labelled by. */
  labelledBy: string;
  /** The small section label — "Introduction" and the like. */
  label: string;
  /** The heading, rendered under the label. Pages that have no visible
   *  statement pass a screen-reader-only one. */
  heading: ReactNode;
  /** The intro copy: the right-hand column. */
  children: ReactNode;
  /** Anything that continues inside the same section, below the grid. */
  below?: ReactNode;
}

/**
 * The section that opens a service page.
 *
 * Each page keeps its own words and its own statement, but they all sit on one
 * foundation: the site container, the label over the heading in a 0.9fr
 * column, the copy in a 1.1fr column beside it, and a single spacing rhythm —
 * so the three service pages read as one system rather than three layouts.
 */
export function ServiceIntro({
  labelledBy,
  label,
  heading,
  children,
  below,
}: ServiceIntroProps) {
  return (
    <section data-section={label} className="section ground-char" aria-labelledby={labelledBy}>
      <div className="shell">
        <div className="intro">
          <div>
            <Reveal kind="label" className="kicker">
              <p className="t-label">{label}</p>
            </Reveal>
            {heading}
          </div>

          <div className="intro-copy">{children}</div>
        </div>

        {below}
      </div>
    </section>
  );
}
