'use client';

import { welcomeCopy } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';

/**
 * 01 — Welcome to SOFISAM.
 *
 * Editorial opening: label, oversized positioning statement, then a large
 * image plate carrying a floating location card, with the existing paragraphs
 * set beside it. All copy is preserved verbatim from the source site.
 */
export function BrandStatement() {
  return (
    <section
      id="welcome"
      className="rd-section rd-paper relative"
      aria-labelledby="welcome-heading"
    >
      <div className="rd-shell">
        <Reveal className="rd-kicker">
          <p className="rd-label">{welcomeCopy.eyebrow}</p>
        </Reveal>

        <h2
          id="welcome-heading"
          className="rd-display mt-[clamp(1.5rem,3vw,2.75rem)] max-w-[16ch] text-[var(--rd-ink)] md:max-w-[26ch] lg:max-w-[72%]"
        >
          <MaskedLines
            lines={['International Strategic', 'Consulting, Advisory and', 'Structuring Firm.']}
          />
        </h2>

        <div className="mt-[var(--rd-pad-sm)] grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
          {/* Image plate with a floating location card */}
          <div className="lg:col-span-7">
            <div className="relative">
              <ImageReveal>
                <div className="rd-media aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[5/4]">
                  <Picture
                    name="business-bay"
                    alt="Dubai's Business Bay towers standing in soft morning haze above the water"
                    sizes="(min-width:1024px) 58vw, 100vw"
                    focal="50% 45%"
                    className="h-full w-full"
                  />
                </div>
              </ImageReveal>

              {/* Overlaps the plate from sm upward; simply follows it on phones. */}
              <Reveal
                delay={0.12}
                className="mt-4 sm:absolute sm:bottom-[clamp(1rem,2vw,1.75rem)] sm:left-[clamp(1rem,2vw,1.75rem)] sm:mt-0 sm:max-w-[24rem]"
              >
                <div className="rd-card flex items-start gap-3 px-[clamp(1.1rem,1.8vw,1.6rem)] py-[clamp(0.9rem,1.5vw,1.25rem)]">
                  <span
                    aria-hidden
                    className="mt-[0.6rem] block h-px w-5 shrink-0 bg-[var(--rd-accent)]"
                  />
                  <p className="rd-small text-[var(--rd-ink)]">
                    World headquarters — Dubai Multi Commodities Centre, Jumeirah Lake Towers.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Statement */}
          <div className="lg:col-span-5 lg:pt-[clamp(0.5rem,2vw,2.5rem)]">
            <Reveal>
              <p className="rd-lead max-w-[42ch] text-[var(--rd-ink)]">
                {welcomeCopy.paragraphs[0]}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <span aria-hidden className="rd-rule my-[var(--rd-gap)] block" />
            </Reveal>

            <Reveal delay={0.12}>
              <p className="font-display text-[clamp(1.5rem,2.4vw,2.35rem)] leading-[1.16] tracking-tighter text-[var(--rd-ink)]">
                {welcomeCopy.paragraphs[1]}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <span aria-hidden className="rd-rule my-[var(--rd-gap)] block" />
            </Reveal>

            <Reveal delay={0.22}>
              <p className="rd-body max-w-[46ch] text-[var(--rd-stone)]">
                {welcomeCopy.paragraphs[2]}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
