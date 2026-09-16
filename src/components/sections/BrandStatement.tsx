'use client';

import { welcomeCopy, contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Parallax } from '@/components/animations/Parallax';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';

/**
 * Welcome to SOFISAM — the page's first statement.
 *
 * The positioning line is set at full display scale across the measure, then
 * the page opens to a full-bleed architectural plate that drifts as it passes,
 * and the firm's own three paragraphs are set beneath it against a standing
 * title. Nothing here is a card and nothing repeats the image-beside-text
 * arrangement the rest of the page would otherwise fall into.
 *
 * All copy is preserved verbatim from the source site.
 */
export function BrandStatement() {
  return (
    <section id="welcome" className="ground-ivory" aria-labelledby="welcome-heading">
      {/* 1 — The statement */}
      <div className="shell pb-[var(--pad-sm)] pt-[var(--pad)]">
        <Reveal kind="label" className="kicker">
          <p className="t-label">{welcomeCopy.eyebrow}</p>
        </Reveal>

        <h2
          id="welcome-heading"
          className="t-display mt-[clamp(1.5rem,3vw,2.75rem)] max-w-[17ch] text-ink md:max-w-[26ch] lg:max-w-[88%]"
        >
          {/* One sentence, broken for the viewport rather than by a tag: three
              lines where the measure is narrow, two on a desktop. The reader
              and the screen reader both get the same sentence. */}
          <span className="sr-only">{welcomeCopy.positioning}</span>
          <span aria-hidden className="block lg:hidden">
            <MaskedLines
              lines={['International Strategic', 'Consulting, Advisory and', 'Structuring Firm.']}
            />
          </span>
          <span aria-hidden className="hidden lg:block">
            <MaskedLines
              lines={['International Strategic Consulting,', 'Advisory and Structuring Firm.']}
            />
          </span>
        </h2>
      </div>

      {/* 2 — The city, edge to edge, with the firm's stated location carried
             on a card that overlaps the plate from its lower edge. */}
      <div className="relative">
        <ImageReveal>
          <Parallax
            className="media media-flat h-[58vw] max-h-[44rem] min-h-[18rem] w-full sm:h-[46vw]"
            strength={9}
          >
            <Picture
              name="business-bay"
              alt="Dubai's Business Bay towers standing in soft morning haze above the water"
              sizes="100vw"
              focal="50% 45%"
              className="h-full w-full object-cover"
            />
          </Parallax>
        </ImageReveal>

        <div className="shell relative">
          <Reveal
            delay={0.12}
            className="-mt-[clamp(2.5rem,6vw,5rem)] sm:max-w-[30rem] lg:max-w-[34rem]"
          >
            <div className="surface flex items-start gap-4 p-[clamp(1.25rem,2.2vw,1.9rem)]">
              <span
                aria-hidden
                className="mt-[0.6rem] block h-px w-6 shrink-0 bg-gold sm:w-9"
              />
              <div>
                <p className="t-label text-gold-ink">World headquarters</p>
                <p className="t-small mt-3 max-w-[32ch] text-stone">
                  {contact.headquarters}, Jumeirah Lake Towers, Dubai.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* 3 — The firm in its own words */}
      <div className="shell pb-[var(--pad)] pt-[var(--pad)]">
        <div className="grid gap-[clamp(2rem,4vw,5rem)] lg:grid-cols-12">
          {/* Standing title */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <Reveal>
                <p className="t-h3 max-w-[16ch] text-ink">
                  A platform, and the relationships behind it.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="surface-tint mt-8 p-[clamp(1.1rem,1.8vw,1.5rem)]">
                  <p className="t-label text-gold-ink">Positioning</p>
                  <p className="t-small mt-3 max-w-[30ch] text-stone">
                    {welcomeCopy.positioning}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* The paragraphs, on their own rules */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="t-lead max-w-[52ch] text-ink">{welcomeCopy.paragraphs[0]}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <span aria-hidden className="rule my-[clamp(1.75rem,3vw,2.75rem)]" />
            </Reveal>

            <Reveal delay={0.12}>
              <p className="max-w-[24ch] font-display text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[1.12] tracking-tighter text-ink">
                {welcomeCopy.paragraphs[1]}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <span aria-hidden className="rule my-[clamp(1.75rem,3vw,2.75rem)]" />
            </Reveal>

            <Reveal delay={0.22}>
              <p className="t-body max-w-[56ch] text-stone">{welcomeCopy.paragraphs[2]}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
