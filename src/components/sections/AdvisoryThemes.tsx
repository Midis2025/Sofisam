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
    <section data-section="Advisory Perspective" className="section ground-void" aria-labelledby="advisory-themes">
      <div className="shell">
        <div className="grid gap-[var(--gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
          {/* Standing media */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <ImageReveal>
                <div className="media aspect-[4/5] w-full">
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
                <p className="t-meta mt-5 max-w-[36ch] text-stone">
                  Imagery is illustrative. No photograph on this site depicts a
                  principal of the firm.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Themes */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal kind="label" className="kicker">
              <p className="t-label">Advisory Perspective</p>
            </Reveal>

            <h2
              id="advisory-themes"
              className="t-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[16ch] text-ivory"
            >
              <MaskedLines lines={['What the counsel', 'actually covers.']} />
            </h2>

            <ol className="mt-[var(--pad-sm)]">
              {themes.map((t, i) => (
                <Reveal
                  as="li"
                  key={t.title}
                  delay={i * 0.06}
                  className="row last:border-b last:border-[var(--line)]"
                >
                  <div className="py-[clamp(1.5rem,2.6vw,2.25rem)]">
                    <p className="t-label text-gold">{t.label}</p>
                    <h3 className="t-h3 mt-4 max-w-[24ch] text-ivory">{t.title}</h3>
                    <p className="t-small mt-4 max-w-[54ch] text-sage">{t.body}</p>
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
