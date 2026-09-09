import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
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

      {/* Introduction — split, closing on an oversized statement */}
      <section className="rd-section rd-paper" aria-labelledby="adv-intro">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4vw,4.5rem)]">
            <div className="lg:col-span-4">
              <Reveal className="rd-kicker">
                <p className="rd-label">Introduction</p>
              </Reveal>
              <h2
                id="adv-intro"
                className="rd-h3 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[16ch] text-[var(--rd-ink)]"
              >
                Executive decision-making, supported rather than substituted.
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <p className="rd-lead max-w-[54ch] text-[var(--rd-ink)]">{service.intro.lead}</p>
              </Reveal>

              <div className="mt-7 space-y-6">
                {service.intro.body.map((p, i) => (
                  <Reveal key={p} delay={0.08 * (i + 1)}>
                    <p className="rd-body max-w-[56ch] text-[var(--rd-stone)]">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <Reveal delay={0.05}>
            <span aria-hidden className="rd-rule my-[var(--rd-pad-sm)] block" />
          </Reveal>

          <Reveal delay={0.08}>
            <blockquote>
              <p className="rd-display max-w-[20ch] text-[var(--rd-ink)]">
                Built over decades of international business experience.
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span aria-hidden className="block h-px w-12 bg-[var(--rd-accent)]" />
                <span className="rd-label text-[var(--rd-stone)]">SOFISAM FZCO</span>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Governance — plate beside a precise ledger */}
      <section className="rd-section rd-paper-2" aria-labelledby="adv-governance">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-center lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            <ImageReveal className="lg:col-span-5">
              <div className="rd-media aspect-[4/5] w-full">
                <Picture
                  name="lattice-white"
                  alt="Pale architectural screen forming a precise repeating lattice"
                  sizes="(min-width:1024px) 42vw, 100vw"
                  focal="50% 50%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal className="rd-kicker">
                <p className="rd-label">Corporate Governance</p>
              </Reveal>

              <h2
                id="adv-governance"
                className="rd-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[15ch] text-[var(--rd-ink)]"
              >
                <MaskedLines lines={['Governance is a', 'working system,', 'not a document.']} />
              </h2>

              <Reveal delay={0.12}>
                <p className="rd-body mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[46ch] text-[var(--rd-stone)]">
                  We consider how authority, oversight and accountability are
                  distributed, and whether that distribution matches the scale of
                  what is being decided.
                </p>
              </Reveal>

              <dl className="mt-[clamp(2rem,3.4vw,3rem)]">
                {governanceNotes.map((g, i) => (
                  <Reveal key={g.t} delay={i * 0.06}>
                    <div className="rd-row grid gap-2 py-[clamp(1.25rem,2vw,1.6rem)] last:border-b last:border-[var(--rd-line)] sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8">
                      <dt className="rd-label text-[var(--rd-stone)] sm:pt-1">{g.t}</dt>
                      <dd className="rd-small max-w-[44ch] text-[var(--rd-ink)]/80">{g.d}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Themes */}
      <AdvisoryThemes themes={service.themes} />

      {/* Experience statement */}
      <section className="rd-section rd-paper" aria-labelledby="adv-experience">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal className="rd-kicker">
                <p className="rd-label">Experience</p>
              </Reveal>
              <h2
                id="adv-experience"
                className="rd-h2 mt-[clamp(1.25rem,2.6vw,2rem)] max-w-[17ch] text-[var(--rd-ink)]"
              >
                <MaskedLines lines={['The view of', 'an owner, not', 'an observer.']} />
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="rd-body max-w-[42ch] text-[var(--rd-stone)]">
                  Our principals are highly successful business executives and
                  investors that bring unique perspectives to all of our mandates
                  and investments.
                </p>
              </Reveal>
            </div>
          </div>

          <ImageReveal className="mt-[var(--rd-pad-sm)]">
            <div className="rd-media aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[21/9]">
              <Picture
                name="tower-dusk"
                alt="Corporate tower facade at dusk with warmly lit interiors behind a vertical fin curtain wall"
                sizes="100vw"
                focal="50% 45%"
                className="h-full w-full"
              />
            </div>
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
