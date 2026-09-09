'use client';

import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';

type ServiceTheme = { label: string; title: string; body: string };

/**
 * Advisory-specific composition: a standing image plate beside the themes set
 * as an open ledger. Every description stays on the page — nothing is folded
 * away behind a toggle.
 */
export function AdvisoryThemes({ themes }: { themes: ServiceTheme[] }) {
  return (
    <section className="rd-section rd-dark" aria-labelledby="advisory-themes">
      <div className="rd-shell">
        <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
          {/* Standing media */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[8rem]">
              <ImageReveal>
                <div className="rd-media aspect-[4/5] w-full">
                  <Picture
                    name="lounge-dark"
                    alt="Darkened executive lounge with slatted timber screens and low, considered lighting"
                    sizes="(min-width:1024px) 42vw, 100vw"
                    focal="50% 50%"
                    className="h-full w-full"
                  />
                </div>
              </ImageReveal>

              <Reveal delay={0.12}>
                <p className="rd-meta mt-5 max-w-[36ch] text-bone/40">
                  Imagery is illustrative. No photograph on this site depicts a
                  principal of the firm.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Themes */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="rd-kicker">
              <p className="rd-label">Advisory Perspective</p>
            </Reveal>

            <h2
              id="advisory-themes"
              className="rd-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[16ch] text-bone"
            >
              <MaskedLines lines={['What the counsel', 'actually covers.']} />
            </h2>

            <ol className="mt-[var(--rd-pad-sm)]">
              {themes.map((t, i) => (
                <Reveal
                  as="li"
                  key={t.title}
                  delay={i * 0.06}
                  className="rd-row-inv last:border-b last:border-[var(--rd-line-inv)]"
                >
                  <div className="py-[clamp(1.5rem,2.6vw,2.25rem)]">
                    <p className="rd-label text-[var(--rd-accent)]">{t.label}</p>
                    <h3 className="rd-h3 mt-4 max-w-[24ch] text-bone">{t.title}</h3>
                    <p className="rd-small mt-4 max-w-[54ch] text-[var(--rd-sage)]">{t.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
