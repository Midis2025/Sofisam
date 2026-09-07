'use client';

import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { ScaleOnScroll } from '@/components/animations/Parallax';

/**
 * Executive perspective. Deliberately architectural rather than portrait-led:
 * no photograph here represents an actual SOFISAM principal.
 */
export function ExecutivePerspective() {
  return (
    <section className="section bg-bone" aria-labelledby="executive-heading">
      <div className="shell-wide">
        <div className="grid gap-[clamp(2.5rem,6vw,4.5rem)] lg:grid-cols-12">
          {/* Statement */}
          <div className="lg:col-span-6 lg:pt-[clamp(2rem,6vw,6rem)]">
            <Reveal className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
              <p className="t-label text-gold">Executive Perspective</p>
            </Reveal>

            <h2 id="executive-heading" className="t-h2 mt-7 max-w-[16ch] text-ink">
              <MaskedLines
                lines={['Advice given by', 'people who have', 'held the position.']}
              />
            </h2>

            <Reveal delay={0.12}>
              <p className="t-lead mt-8 max-w-[44ch] text-ink/75">
                Our principals are highly successful business executives and
                investors that bring unique perspectives to all of our mandates
                and investments.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="t-body mt-6 max-w-[46ch] text-ink/55">
                That distinction matters more than it sounds. Someone who has
                carried a decision — its financing, its timing, its consequences
                for the people involved — asks different questions of a proposal
                than someone who has only ever reviewed one.
              </p>
            </Reveal>

            {/* Stat-free credibility markers, drawn only from stated facts */}
            <Reveal delay={0.24}>
              <dl className="mt-[clamp(2.5rem,5vw,3.5rem)] grid grid-cols-1 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2">
                {[
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
                ].map((item) => (
                  <div key={item.t} className="bg-bone p-6 sm:p-7">
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

          {/* Media stack */}
          <div className="lg:col-span-5 lg:col-start-8">
            <ImageReveal>
              <ScaleOnScroll className="media aspect-[3/4] w-full" from={1.14} to={1}>
                <Picture
                  name="towers-mono"
                  alt="Dense cluster of corporate towers photographed from below in near-monochrome light"
                  sizes="(min-width:1024px) 42vw, 100vw"
                  focal="50% 40%"
                  className="h-full w-full"
                />
              </ScaleOnScroll>
            </ImageReveal>

            <ImageReveal delay={0.12} className="mt-6 lg:-ml-[18%] lg:mt-10">
              <div className="media aspect-[4/3] w-full">
                <Picture
                  name="abstract-dark"
                  alt="Abstract dark architectural form with sharp folded planes catching low light"
                  sizes="(min-width:1024px) 34vw, 100vw"
                  focal="50% 50%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
