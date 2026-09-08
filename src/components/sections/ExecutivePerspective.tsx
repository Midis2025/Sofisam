'use client';

import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { ScaleOnScroll } from '@/components/animations/Parallax';

/** Stat-free credibility markers, drawn only from stated facts. */
const markers = [
  {
    t: 'Decades of experience',
    d: 'International business experience is the foundation of the advice.',
  },
  {
    t: 'Executives and investors',
    d: 'Principals who have operated as both, not one or the other.',
  },
  {
    t: 'Mandates and investments',
    d: 'The same perspective is applied across every engagement.',
  },
  {
    t: 'Unconflicted by design',
    d: 'Independence is a structural condition, not a stated intention.',
  },
];

/**
 * Executive perspective. Deliberately architectural rather than portrait-led:
 * no photograph here represents an actual SOFISAM principal.
 *
 * Two even columns, each sized by its own content. The image fills the column
 * height rather than carrying a fixed crop, so both sides finish together and
 * the section ends where its content does.
 */
export function ExecutivePerspective() {
  return (
    <section className="section-md bg-bone" aria-labelledby="executive-heading">
      <div className="shell-wide">
        <div className="grid gap-[var(--content-gap-lg)] lg:grid-cols-2 lg:gap-12">
          {/* Copy + markers */}
          <div>
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 shrink-0 bg-gold sm:w-16" />
              <p className="t-label text-gold">Executive Perspective</p>
            </Reveal>

            <h2
              id="executive-heading"
              className="t-h2 mt-[var(--content-gap-md)] max-w-[16ch] text-ink"
            >
              <MaskedLines
                lines={['Advice given by', 'people who have', 'held the position.']}
              />
            </h2>

            <Reveal delay={0.12}>
              <p className="t-lead mt-[var(--content-gap-md)] max-w-[44ch] text-ink/75">
                Our principals are highly successful business executives and
                investors that bring unique perspectives to all of our mandates
                and investments.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="t-body mt-5 max-w-[46ch] text-ink/55">
                That distinction matters more than it sounds. Someone who has
                carried a decision — its financing, its timing, its consequences
                for the people involved — asks different questions of a proposal
                than someone who has only ever reviewed one.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-[var(--content-gap-lg)] grid grid-cols-1 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2">
                {markers.map((item) => (
                  <div key={item.t} className="bg-bone p-5 sm:p-6 lg:p-7">
                    <dt className="font-display text-[1.1rem] leading-snug tracking-tight text-ink">
                      {item.t}
                    </dt>
                    <dd className="mt-2 text-[0.85rem] font-light leading-relaxed text-ink/50">
                      {item.d}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* One architectural image. On desktop it is taken out of flow so its
              intrinsic height cannot drive the row — the copy column sets the
              height and the image fills it. */}
          <div className="relative lg:h-full lg:min-h-[26rem]">
            <ImageReveal className="lg:absolute lg:inset-0">
              <ScaleOnScroll
                className="media aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full"
                from={1.14}
                to={1}
              >
                <Picture
                  name="towers-mono"
                  alt="Dense cluster of corporate towers photographed from below in near-monochrome light"
                  sizes="(min-width:1024px) 48vw, 100vw"
                  focal="50% 40%"
                  className="h-full w-full"
                />
              </ScaleOnScroll>
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
