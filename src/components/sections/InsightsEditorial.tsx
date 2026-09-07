'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { featuredInsight, secondaryInsights } from '@/data/insights';
import { insightsIntro } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, DrawRule, ImageReveal } from '@/components/animations/Reveal';

export function InsightsEditorial() {
  return (
    <section id="insights" className="section bg-bone" aria-labelledby="insights-heading">
      <div className="shell-wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
              <p className="t-label text-gold">{insightsIntro.eyebrow}</p>
            </Reveal>
            <h2 id="insights-heading" className="t-h1 mt-7 text-ink">
              <MaskedLines lines={[insightsIntro.heading]} />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <Reveal delay={0.1}>
              <p className="t-body max-w-[42ch] text-ink/60">
                {insightsIntro.standfirst}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <Link
                href="/insights"
                className="group mt-5 inline-flex items-center gap-2 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-ink"
              >
                <span className="link-underline">All insights</span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="h-3.5 w-3.5 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>
          </div>
        </div>

        <DrawRule className="mt-[clamp(2.5rem,5vw,4rem)]" />

        {/* Featured */}
        <article className="mt-[clamp(2.5rem,5vw,4rem)]">
          <Link href={`/insights/${featuredInsight.slug}`} className="group block">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <ImageReveal className="lg:col-span-7">
                <div className="media media-zoom aspect-[16/10] w-full lg:aspect-[3/2]">
                  <Picture
                    name={featuredInsight.image}
                    alt={featuredInsight.imageAlt}
                    sizes="(min-width:1024px) 56vw, 100vw"
                    focal={featuredInsight.focal}
                    className="h-full w-full"
                  />
                </div>
              </ImageReveal>

              <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
                <Reveal delay={0.1}>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="t-label text-gold">Featured</span>
                    <span aria-hidden className="h-px w-6 bg-ink/20" />
                    <span className="t-label text-ink/40">{featuredInsight.category}</span>
                  </div>

                  <h3 className="t-h2 mt-6 max-w-[16ch] text-ink transition-colors duration-500 group-hover:text-gold">
                    {featuredInsight.title}
                  </h3>

                  <p className="t-body mt-5 max-w-[42ch] text-ink/60">
                    {featuredInsight.summary}
                  </p>

                  <div className="mt-7 flex items-center gap-5 text-[0.75rem] font-light tracking-wide text-ink/40">
                    <time dateTime={featuredInsight.isoDate}>{featuredInsight.date}</time>
                    <span aria-hidden className="h-px w-5 bg-ink/20" />
                    <span>{featuredInsight.readingTime}</span>
                  </div>

                  <span className="link-underline mt-8 inline-block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70">
                    Read the piece
                  </span>
                </Reveal>
              </div>
            </div>
          </Link>
        </article>

        {/* Secondary grid */}
        <ul className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {secondaryInsights.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={i * 0.08}>
              <Link href={`/insights/${item.slug}`} className="group block">
                <div className="media media-zoom aspect-[16/10] w-full">
                  <Picture
                    name={item.image}
                    alt={item.imageAlt}
                    sizes="(min-width:640px) 44vw, 100vw"
                    focal={item.focal}
                    className="h-full w-full"
                  />
                </div>

                <div className="mt-6 flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <span className="t-label text-gold">{item.category}</span>
                    <h3 className="t-h3 mt-4 max-w-[20ch] text-ink transition-colors duration-500 group-hover:text-gold">
                      {item.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden
                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/45 transition-all duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
                  >
                    <ArrowUpRight strokeWidth={1.4} className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-4 max-w-[40ch] text-[0.92rem] font-light leading-relaxed text-ink/55">
                  {item.summary}
                </p>

                <div className="mt-5 flex items-center gap-5 text-[0.74rem] font-light tracking-wide text-ink/40">
                  <time dateTime={item.isoDate}>{item.date}</time>
                  <span aria-hidden className="h-px w-5 bg-ink/20" />
                  <span>{item.readingTime}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

      </div>
    </section>
  );
}
