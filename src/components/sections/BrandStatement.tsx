'use client';

import { welcomeCopy } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, DrawRule } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';

/**
 * Oversized editorial brand statement — asymmetric, image-anchored.
 * All copy is preserved verbatim from the source site's welcome section.
 */
export function BrandStatement() {
  return (
    <section id="welcome" className="section relative bg-bone" aria-labelledby="welcome-heading">
      <div className="shell-wide">
        {/* Eyebrow row */}
        <Reveal className="flex items-center gap-4">
          <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
          <p className="t-label text-gold">{welcomeCopy.eyebrow}</p>
        </Reveal>

        {/* Oversized positioning line */}
        <h2 id="welcome-heading" className="t-h1 mt-8 max-w-[19ch] text-ink sm:mt-12">
          <MaskedLines
            lines={['International Strategic', 'Consulting, Advisory and', 'Structuring Firm.']}
          />
        </h2>

        <DrawRule className="mt-[var(--content-gap-lg)]" />

        {/* Asymmetric body / image */}
        <div className="mt-[var(--content-gap-lg)] grid gap-[var(--content-gap-lg)] lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:col-start-1">
            <Parallax strength={7} className="media aspect-[4/5] w-full">
              <Picture
                name="business-bay"
                alt="Dubai's Business Bay towers standing in soft morning haze above the water"
                sizes="(min-width:1024px) 40vw, 100vw"
                focal="50% 45%"
                className="h-full w-full"
              />
            </Parallax>

            <Reveal delay={0.15} className="mt-5 flex items-start gap-3">
              <span aria-hidden className="mt-2 block h-px w-6 shrink-0 bg-gold" />
              <p className="max-w-[34ch] text-[0.8rem] font-light leading-relaxed text-ink/45">
                World headquarters — Dubai Multi Commodities Centre, Jumeirah Lake Towers.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-[var(--content-gap-lg)]">
            <Reveal>
              <p className="t-lead max-w-[44ch] text-ink">
                {welcomeCopy.paragraphs[0]}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <blockquote className="relative mt-[var(--content-gap-lg)] border-l border-gold pl-6 sm:pl-9">
                <p className="font-display text-[clamp(1.5rem,2.9vw,2.35rem)] leading-[1.16] tracking-tighter text-ink">
                  {welcomeCopy.paragraphs[1]}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="t-body mt-[var(--content-gap-lg)] max-w-[46ch] text-ink/65">
                {welcomeCopy.paragraphs[2]}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
