'use client';

import { welcomeCopy, contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Tilt } from '@/components/ui/Tilt';
import { Parallax } from '@/components/animations/Parallax';
import { Reveal, ImageReveal } from '@/components/animations/Reveal';
import { SplitText, FocusIn } from '@/components/animations/SplitText';
import { Marquee } from '@/components/animations/Marquee';

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
    <section data-section="Welcome" id="welcome" className="ground-char" aria-labelledby="welcome-heading">
      {/* 1 — The statement */}
      <div className="shell pb-[var(--pad-sm)] pt-[var(--pad)]">
        <Reveal kind="label" className="kicker">
          <p className="t-label">{welcomeCopy.eyebrow}</p>
        </Reveal>

        {/* The positioning line assembles itself word by word. */}
        <SplitText
          as="h2"
          text={welcomeCopy.positioning}
          className="t-display mt-[clamp(1.5rem,3vw,2.75rem)] max-w-[17ch] text-ivory md:max-w-[26ch] lg:max-w-[88%]"
          stagger={0.045}
        />
      </div>

      {/* A band of the firm's own disciplines, travelling with the scroll. */}
      <div className="border-y border-[var(--line)] py-[clamp(1rem,1.8vw,1.75rem)]">
        <Marquee speed={2.5}>
          {['Strategic Consulting', 'Advisory', 'Structuring'].map((word) => (
            <span key={word} className="flex items-center">
              <span className="px-[clamp(1.5rem,3vw,3rem)] font-display text-[clamp(1.75rem,3.4vw,3.25rem)] leading-none tracking-tighter text-ivory/75">
                {word}
              </span>
              <span
                aria-hidden
                className="block h-[0.45rem] w-[0.45rem] shrink-0 rounded-full bg-gold"
              />
            </span>
          ))}
        </Marquee>
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
            kind="card"
            delay={0.12}
            className="-mt-[clamp(2.5rem,6vw,5rem)] sm:max-w-[30rem] lg:max-w-[34rem]"
          >
            <Tilt>
              <div className="surface surface-lift flex items-start gap-4 p-[clamp(1.25rem,2.2vw,1.9rem)]">
                <span
                  aria-hidden
                  className="mt-[0.6rem] block h-px w-6 shrink-0 bg-gold sm:w-9"
                />
                <div>
                  <p className="t-label text-gold">World headquarters</p>
                  <p className="t-small mt-3 max-w-[32ch] text-sage">
                    {contact.headquarters}, Jumeirah Lake Towers, Dubai.
                  </p>
                </div>
              </div>
            </Tilt>
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
                <p className="t-h3 max-w-[16ch] text-ivory">
                  A platform, and the relationships behind it.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="surface-tint surface-lift mt-8 p-[clamp(1.1rem,1.8vw,1.5rem)]">
                  <p className="t-label text-gold">Positioning</p>
                  <p className="t-small mt-3 max-w-[30ch] text-sage">
                    {welcomeCopy.positioning}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* The paragraphs, on their own rules */}
          <div className="lg:col-span-7 lg:col-start-6">
            <FocusIn>
              <p className="t-lead max-w-[52ch] text-ivory">{welcomeCopy.paragraphs[0]}</p>
            </FocusIn>

            <Reveal delay={0.08}>
              <span aria-hidden className="rule my-[clamp(1.75rem,3vw,2.75rem)]" />
            </Reveal>

            <SplitText
              as="p"
              text={welcomeCopy.paragraphs[1]}
              className="max-w-[24ch] font-display text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[1.12] tracking-tighter text-ivory"
              delay={0.05}
              stagger={0.03}
            />

            <Reveal delay={0.18}>
              <span aria-hidden className="rule my-[clamp(1.75rem,3vw,2.75rem)]" />
            </Reveal>

            <FocusIn delay={0.1}>
              <p className="t-body max-w-[56ch] text-sage">{welcomeCopy.paragraphs[2]}</p>
            </FocusIn>
          </div>
        </div>
      </div>
    </section>
  );
}
