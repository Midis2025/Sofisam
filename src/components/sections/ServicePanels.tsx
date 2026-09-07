'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { services } from '@/data/services';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { ScaleOnScroll } from '@/components/animations/Parallax';

/**
 * Services landing composition: a sticky editorial heading beside large
 * vertical service panels that reveal their imagery on scroll.
 */
export function ServicePanels() {
  return (
    <section className="section bg-bone" aria-labelledby="services-panels">
      <div className="shell-wide lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Sticky heading */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[8rem]">
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
              <p className="t-label text-gold">Three Disciplines</p>
            </Reveal>

            <h2 id="services-panels" className="t-h2 mt-7 max-w-[13ch] text-ink">
              <MaskedLines lines={['One standard', 'of judgement,', 'three forms.']} />
            </h2>

            <Reveal delay={0.12}>
              <p className="t-body mt-7 max-w-[36ch] text-ink/60">
                Consulting, advisory and structuring are separate practices, but
                they are not separate opinions. Whichever one an engagement
                begins in, the reasoning behind it is the same.
              </p>
            </Reveal>

            {/* Index rail */}
            <Reveal delay={0.18}>
              <ul className="mt-10 hidden border-t border-ink/12 lg:block">
                {services.map((s) => (
                  <li key={s.slug} className="border-b border-ink/12">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="t-index text-[0.7rem] text-gold">{s.index}</span>
                        <span className="text-[0.95rem] font-light tracking-tight text-ink/70 transition-colors duration-400 group-hover:text-ink">
                          {s.title}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        strokeWidth={1.4}
                        className="h-4 w-4 shrink-0 text-ink/30 transition-all duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Panels */}
        <div className="mt-[var(--space-section-md)] lg:col-span-8 lg:mt-0">
          <ol className="space-y-[var(--space-section-md)]">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group block">
                  <ImageReveal delay={0.05}>
                    <ScaleOnScroll
                      className="media aspect-[16/11] w-full sm:aspect-[16/10]"
                      from={1.12}
                      to={1}
                    >
                      <Picture
                        name={s.hero.image}
                        alt={s.hero.imageAlt}
                        sizes="(min-width:1024px) 62vw, 100vw"
                        focal={s.hero.focal}
                        priority={i === 0}
                        className="h-full w-full"
                      />
                    </ScaleOnScroll>
                  </ImageReveal>

                  <div className="mt-7 flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div className="flex items-center gap-4">
                        <span className="t-index text-[clamp(1.6rem,3vw,2.4rem)] text-gold">
                          {s.index}
                        </span>
                        <span aria-hidden className="h-px w-8 bg-ink/20" />
                        <span className="t-label text-ink/40">Expertise</span>
                      </div>

                      <h3 className="t-h2 mt-5 text-ink transition-colors duration-500 group-hover:text-gold">
                        {s.title}
                      </h3>
                    </div>

                    <span
                      aria-hidden
                      className="mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition-all duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
                    >
                      <ArrowUpRight strokeWidth={1.4} className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="t-lead mt-6 max-w-[52ch] text-ink/70">
                    {s.sourceSummary}
                  </p>

                  <p className="t-body mt-4 max-w-[54ch] text-ink/50">
                    {s.intro.lead}
                  </p>

                  <span className="link-underline mt-8 inline-block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70">
                    Explore {s.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
