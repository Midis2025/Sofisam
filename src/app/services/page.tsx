import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { ServiceSelector } from '@/components/sections/ServiceSelector';
import { ProcessNarrative } from '@/components/sections/ProcessNarrative';
import { CTASection } from '@/components/sections/CTASection';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';
import { servicesIntro } from '@/data/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Strategic Consulting, Advisory and Structuring — comprehensive strategic solutions tailored to complex global markets and corporate governance needs.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | SOFISAM FZCO',
    description:
      'Strategic Consulting, Advisory and Structuring from SOFISAM FZCO, Dubai.',
    url: '/services',
  },
};

const whoWeAdvise = [
  {
    t: 'Boards and leadership teams',
    d: 'Where a position has to be held publicly and defended internally at the same time.',
  },
  {
    t: 'Principals and owners',
    d: 'Where the capital at stake is the decision-maker’s own and the horizon is long.',
  },
  {
    t: 'International groups',
    d: 'Where a decision has to work across jurisdictions that do not behave alike.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesIntro.eyebrow}
        headline={[servicesIntro.heading]}
        standfirst={servicesIntro.standfirst}
        image="structure-grid"
        imageAlt="Dark modular architectural facade composed of a precise repeating grid of panels"
        focal="50% 50%"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      <ServiceSelector />

      {/* Who we advise */}
      <section className="section ground-dark" aria-labelledby="who-we-advise">
        <div className="shell">
          <div className="head">
            <div>
              <Reveal kind="label" className="kicker">
                <p className="t-label">Who We Advise</p>
              </Reveal>
              <h2
                id="who-we-advise"
                className="t-h2 head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-ivory"
              >
                <MaskedLines lines={['The people who', 'carry the decision.']} />
              </h2>
            </div>
            <div className="lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body head-note text-[var(--sage)]">
                  Engagements are taken on with the person accountable for the
                  outcome, not a layer removed from it.
                </p>
              </Reveal>
            </div>
          </div>

          <ul className="mt-[var(--pad-sm)] grid gap-[clamp(0.875rem,1.4vw,1.25rem)] md:grid-cols-3">
            {whoWeAdvise.map((w, i) => (
              <Reveal
                as="li"
                key={w.t}
                delay={i * 0.08}
                className="surface-inv flex h-full flex-col"
              >
                <span
                  aria-hidden
                  className="block h-px w-8 bg-[var(--gold)]"
                />
                <h3 className="t-h4 mt-5 max-w-[20ch] text-ivory">{w.t}</h3>
                <p className="t-small mt-3 max-w-[38ch] text-[var(--sage)]">{w.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ProcessNarrative />

      <CTASection
        eyebrow="Engagements"
        lines={['Discuss a', 'mandate.']}
        body="Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence."
        image="difc-gate"
        focal="50% 40%"
      />
    </>
  );
}
