import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, DrawRule, ImageReveal } from '@/components/animations/Reveal';
import { ScaleOnScroll } from '@/components/animations/Parallax';
import { AdvisoryThemes } from '@/components/sections/AdvisoryThemes';
import { ServicePager } from '@/components/sections/ServicePager';
import { CTASection } from '@/components/sections/CTASection';
import { serviceBySlug } from '@/data/services';

const service = serviceBySlug('advisory')!;

export const metadata: Metadata = {
  title: 'Advisory',
  description: service.metaDescription,
  alternates: { canonical: '/services/advisory' },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: '/services/advisory',
  },
};

const governanceNotes = [
  {
    t: 'Authority',
    d: 'Who is entitled to commit the organisation, to what size, and on whose behalf.',
  },
  {
    t: 'Oversight',
    d: 'What the board actually sees, how often, and whether it is enough to hold a position.',
  },
  {
    t: 'Accountability',
    d: 'Where responsibility lands when an outcome goes the other way, and whether that is understood in advance.',
  },
  {
    t: 'Succession',
    d: 'Whether the structure survives the departure of the people who currently make it work.',
  },
];

export default function AdvisoryPage() {
  return (
    <>
      <PageHero
        eyebrow={service.hero.eyebrow}
        headline={['Counsel formed', 'in the room where', 'decisions are taken.']}
        standfirst={service.hero.standfirst}
        image={service.hero.image}
        imageAlt={service.hero.imageAlt}
        focal={service.hero.focal}
        size="tall"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      {/* Introduction — split with a pull quote */}
      <section className="section bg-bone" aria-labelledby="adv-intro">
        <div className="shell-wide">
          <div className="grid gap-[clamp(2.5rem,6vw,4rem)] lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Introduction</p>
              </Reveal>
              <h2 id="adv-intro" className="t-h3 mt-6 max-w-[16ch] text-ink">
                Executive decision-making, supported rather than substituted.
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <p className="t-lead max-w-[54ch] text-ink">{service.intro.lead}</p>
              </Reveal>

              <div className="mt-7 space-y-6">
                {service.intro.body.map((p, i) => (
                  <Reveal key={p} delay={0.08 * (i + 1)}>
                    <p className="t-body max-w-[56ch] text-ink/60">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <DrawRule className="mt-[clamp(3rem,7vw,5rem)]" />

          {/* Oversized quote drawn from the firm's own language */}
          <Reveal delay={0.05}>
            <blockquote className="mt-[clamp(3rem,7vw,5rem)]">
              <p className="max-w-[20ch] font-display text-[clamp(2rem,5.4vw,4.25rem)] leading-[1.04] tracking-tighter text-ink">
                Built over decades of international business experience.
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span aria-hidden className="block h-px w-12 bg-gold" />
                <span className="t-label text-ink/40">SOFISAM FZCO</span>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Governance — precise ledger over a light lattice image */}
      <section className="relative overflow-hidden bg-bone" aria-labelledby="adv-governance">
        <div className="shell-wide">
          <div className="grid gap-[clamp(2.5rem,6vw,4rem)] lg:grid-cols-12 lg:gap-12">
            <ImageReveal className="lg:col-span-5">
              <ScaleOnScroll className="media aspect-[3/4] w-full" from={1.12} to={1}>
                <Picture
                  name="lattice-white"
                  alt="Pale architectural screen forming a precise repeating lattice"
                  sizes="(min-width:1024px) 40vw, 100vw"
                  focal="50% 50%"
                  className="h-full w-full"
                />
              </ScaleOnScroll>
            </ImageReveal>

            <div className="pb-[var(--section-y)] pt-[var(--section-y)] lg:col-span-6 lg:col-start-7">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Corporate Governance</p>
              </Reveal>

              <h2 id="adv-governance" className="t-h2 mt-7 max-w-[15ch] text-ink">
                <MaskedLines lines={['Governance is a', 'working system,', 'not a document.']} />
              </h2>

              <Reveal delay={0.12}>
                <p className="t-body mt-7 max-w-[46ch] text-ink/60">
                  We consider how authority, oversight and accountability are
                  distributed, and whether that distribution matches the scale of
                  what is being decided.
                </p>
              </Reveal>

              <dl className="mt-10 border-t border-ink/12">
                {governanceNotes.map((g, i) => (
                  <Reveal key={g.t} delay={i * 0.06}>
                    <div className="flex flex-col gap-2 border-b border-ink/12 py-6 sm:flex-row sm:gap-8">
                      <dt className="t-label shrink-0 text-ink/40 sm:w-[8rem] sm:pt-1">
                        {g.t}
                      </dt>
                      <dd className="max-w-[44ch] text-[0.95rem] font-light leading-relaxed text-ink/70">
                        {g.d}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Themes accordion with sticky media */}
      <AdvisoryThemes themes={service.themes} />

      {/* Experience statement */}
      <section className="section bg-bone" aria-labelledby="adv-experience">
        <div className="shell-wide">
          <div className="grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Experience</p>
              </Reveal>
              <h2 id="adv-experience" className="t-h2 mt-7 max-w-[17ch] text-ink">
                <MaskedLines lines={['The view of', 'an owner, not', 'an observer.']} />
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body max-w-[42ch] text-ink/60">
                  Our principals are highly successful business executives and
                  investors that bring unique perspectives to all of our mandates
                  and investments.
                </p>
              </Reveal>
            </div>
          </div>

          <ImageReveal className="mt-[clamp(2.5rem,6vw,4.5rem)]">
            <ScaleOnScroll className="media aspect-[16/9] w-full lg:aspect-[21/9]" from={1.1} to={1}>
              <Picture
                name="tower-dusk"
                alt="Corporate tower facade at dusk with warmly lit interiors behind a vertical fin curtain wall"
                sizes="100vw"
                focal="50% 45%"
                className="h-full w-full"
              />
            </ScaleOnScroll>
          </ImageReveal>
        </div>
      </section>

      <ServicePager current="advisory" />

      <CTASection
        eyebrow="Advisory"
        lines={['Take counsel', 'in confidence.']}
        body="Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence."
        image="lounge-dark"
        focal="50% 50%"
      />
    </>
  );
}
