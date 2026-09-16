import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { ServiceIntro } from '@/components/sections/ServiceIntro';
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
        headlineWide={['Counsel formed in the room', 'where decisions are taken.']}
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

      {/* Introduction */}
      <ServiceIntro
        labelledBy="adv-intro"
        label="Introduction"
        heading={
          <h2
            id="adv-intro"
            className="intro-title mt-[clamp(1.25rem,2.4vw,1.75rem)] text-[var(--ink)]"
          >
            Executive decision-making, supported rather than substituted.
          </h2>
        }
        below={
          <>
            <Reveal delay={0.05}>
              <span aria-hidden className="rule my-[clamp(3rem,4vw,4rem)] block" />
            </Reveal>

            <Reveal delay={0.08}>
              <blockquote>
                <p className="t-display max-w-[20ch] text-[var(--ink)]">
                  Built over decades of international business experience.
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <span aria-hidden className="block h-px w-12 bg-[var(--gold)]" />
                  <span className="t-label text-[var(--stone)]">SOFISAM FZCO</span>
                </footer>
              </blockquote>
            </Reveal>
          </>
        }
      >
        <Reveal delay={0.06}>
          <p className="t-lead text-[var(--ink)]">{service.intro.lead}</p>
        </Reveal>

        <div className="intro-body">
          {service.intro.body.map((p, i) => (
            <Reveal key={p} delay={0.08 * (i + 1)}>
              <p className="t-body text-[var(--stone)]">{p}</p>
            </Reveal>
          ))}
        </div>
      </ServiceIntro>

      {/* Governance — plate beside a precise ledger */}
      <section className="section ground-ivory-2" aria-labelledby="adv-governance">
        <div className="shell">
          <div className="grid gap-[var(--gap)] lg:grid-cols-12 lg:items-center lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            <ImageReveal className="lg:col-span-5">
              <div className="media aspect-[4/5] w-full">
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
              <Reveal kind="label" className="kicker">
                <p className="t-label">Corporate Governance</p>
              </Reveal>

              <h2
                id="adv-governance"
                className="t-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[15ch] text-[var(--ink)]"
              >
                <MaskedLines lines={['Governance is a', 'working system,', 'not a document.']} />
              </h2>

              <Reveal delay={0.12}>
                <p className="t-body mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[46ch] text-[var(--stone)]">
                  We consider how authority, oversight and accountability are
                  distributed, and whether that distribution matches the scale of
                  what is being decided.
                </p>
              </Reveal>

              <dl className="mt-[clamp(2rem,3.4vw,3rem)]">
                {governanceNotes.map((g, i) => (
                  <Reveal key={g.t} delay={i * 0.06}>
                    <div className="row grid gap-2 py-[clamp(1.25rem,2vw,1.6rem)] last:border-b last:border-[var(--line)] sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8">
                      <dt className="t-label text-[var(--stone)] sm:pt-1">{g.t}</dt>
                      <dd className="t-small max-w-[44ch] text-[var(--ink)]/80">{g.d}</dd>
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
      <section className="section ground-ivory" aria-labelledby="adv-experience">
        <div className="shell">
          <div className="head">
            <div>
              <Reveal kind="label" className="kicker">
                <p className="t-label">Experience</p>
              </Reveal>
              <h2
                id="adv-experience"
                className="t-h2 head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-[var(--ink)]"
              >
                <MaskedLines lines={['The view of', 'an owner, not', 'an observer.']} />
              </h2>
            </div>
            <div className="lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body head-note text-[var(--stone)]">
                  Our principals are highly successful business executives and
                  investors that bring unique perspectives to all of our mandates
                  and investments.
                </p>
              </Reveal>
            </div>
          </div>

          <ImageReveal className="mt-[var(--pad-sm)]">
            <div className="media aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[21/9]">
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
