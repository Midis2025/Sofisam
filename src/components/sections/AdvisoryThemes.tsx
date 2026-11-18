'use client';

import { Reveal, MaskedLines } from '@/components/animations/Reveal';

type ServiceTheme = { label: string; title: string; body: string };

/**
 * Advisory-specific composition: the four themes as a numbered editorial
 * ledger across the full container. Each row reads numeral, then theme and
 * title, then the description — in three columns from md, stacked beneath
 * the numeral on phones. Every description stays on the page.
 */
export function AdvisoryThemes({ themes }: { themes: ServiceTheme[] }) {
  return (
    <section data-section="Advisory Perspective" className="section ground-void" aria-labelledby="advisory-themes">
      <div className="shell">
        <Reveal kind="label" className="kicker">
          <p className="t-label">Advisory Perspective</p>
        </Reveal>

        <h2 id="advisory-themes" className="t-h2 mt-eyebrow max-w-[20ch] text-ivory">
          <MaskedLines lines={['What the counsel', 'actually covers.']} />
        </h2>

        <ol className="mt-[var(--pad-sm)] border-t border-[var(--line)]">
          {themes.map((t, i) => (
            <Reveal
              as="li"
              key={t.title}
              delay={i * 0.06}
              className="border-b border-[var(--line)]"
            >
              <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 py-[clamp(1.5rem,2.6vw,2.25rem)] sm:grid-cols-[4rem_minmax(0,1fr)] md:grid-cols-[4.5rem_minmax(0,5fr)_minmax(0,6fr)] md:gap-x-[var(--gap)] lg:grid-cols-[6rem_minmax(0,5fr)_minmax(0,6fr)]">
                <span aria-hidden className="pt-[0.15em] font-mono text-sm text-gold tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="t-label text-gold">{t.label}</p>
                  <h3 className="t-h3 mt-3 max-w-[24ch] text-ivory">{t.title}</h3>
                </div>
                <p className="t-small col-start-2 mt-4 max-w-[54ch] text-sage md:col-start-3 md:mt-0 md:pt-[0.15em]">
                  {t.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
