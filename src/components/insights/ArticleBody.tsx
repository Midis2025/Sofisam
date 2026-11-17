import { Reveal } from '@/components/animations/Reveal';
import type { Insight } from '@/data/insights';

/** A stable in-page anchor for a section heading. */
const anchor = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Table of contents and body for every Insight article.
 *
 * From lg the contents sit in a sticky three-column rail beside the text;
 * below lg they stack above it. The text itself is held to a reading measure
 * (`max-w-[46rem]`, about 65 characters of body type), so the pull quote, the
 * headings and the paragraphs share one right edge however wide the page is.
 */
export function ArticleBody({ insight }: { insight: Insight }) {
  const sections = insight.body.filter((b) => b.heading);

  return (
    <article
      data-section="Article"
      aria-labelledby="article-title"
      className="section ground-char border-b border-[var(--line-soft)]"
    >
      <div className="shell">
        <div className="grid gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-12">
          {sections.length > 0 && (
            <nav aria-label="Table of contents" className="lg:col-span-3">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
                <p className="t-label text-gold">Table of Contents</p>
                <ol className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                  {sections.map((b) => (
                    <li key={b.heading}>
                      <a
                        href={`#${anchor(b.heading!)}`}
                        className="block py-3 text-xs leading-snug text-[var(--sage)] transition-colors hover:text-[var(--gold)]"
                      >
                        {b.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          )}

          <div className="min-w-0 max-w-[46rem] lg:col-span-8 lg:col-start-5">
            {insight.body.map((block, bi) => (
              <section
                key={block.heading ?? `block-${bi}`}
                id={block.heading ? anchor(block.heading) : undefined}
                className={`scroll-mt-[calc(var(--header-h)+2rem)] ${bi > 0 ? 'mt-12' : ''}`}
              >
                {block.heading && (
                  <Reveal>
                    <h2 className="t-h3 mb-6 text-[var(--ivory)]">{block.heading}</h2>
                  </Reveal>
                )}
                <div className="space-y-6">
                  {block.paragraphs.map((p, pi) => (
                    <Reveal key={p} delay={pi * 0.04}>
                      <p
                        className={
                          bi === 0 && pi === 0
                            ? 't-lead text-[var(--ivory)] font-light leading-relaxed'
                            : 't-body text-[var(--sage)] leading-relaxed'
                        }
                      >
                        {p}
                      </p>
                    </Reveal>
                  ))}
                </div>

                {insight.pullQuote && bi === 1 && (
                  <Reveal delay={0.1}>
                    <blockquote className="my-12 border-l-2 border-[var(--brass)] bg-[var(--plate)] p-8 sm:p-10 rounded-r-[var(--r-md)] shadow-[var(--shadow-plate)]">
                      <p className="font-display text-xl sm:text-2xl lg:text-3xl font-light text-[var(--ivory)] leading-snug">
                        &ldquo;{insight.pullQuote}&rdquo;
                      </p>
                      <footer className="mt-4 text-xs uppercase tracking-widest text-[var(--gold)] font-mono font-medium">
                        Strategic Takeaway
                      </footer>
                    </blockquote>
                  </Reveal>
                )}
              </section>
            ))}

            <div className="mt-14 pt-8 border-t border-[var(--line)]">
              <p className="text-xs text-[var(--stone)] leading-relaxed max-w-[60ch]">
                This article is provided as general international commentary and does not constitute investment, legal, accounting, or tax advice. Nothing herein describes a specific confidential client mandate of SOFISAM FZCO.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
