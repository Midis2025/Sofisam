import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { ServicePanels } from '@/components/sections/ServicePanels';
import { ProcessNarrative } from '@/components/sections/ProcessNarrative';
import { CTASection } from '@/components/sections/CTASection';
import { Reveal, MaskedLines, DrawRule } from '@/components/animations/Reveal';
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

      <ServicePanels />

      {/* Who we advise */}
      <section
        className="relative overflow-hidden bg-ink text-bone"
        aria-labelledby="who-we-advise"
      >
        <div className="shell-wide relative z-10 section">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Who We Advise</p>
              </Reveal>
              <h2 id="who-we-advise" className="t-h2 mt-7 max-w-[16ch] text-bone">
                <MaskedLines lines={['The people who', 'carry the decision.']} />
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body max-w-[40ch] text-bone/55">
                  Engagements are taken on with the person accountable for the
                  outcome, not a layer removed from it.
                </p>
              </Reveal>
            </div>
          </div>

          <DrawRule tone="light" className="mt-[var(--space-section-sm)]" />

          <ul className="mt-[var(--content-gap-md)] grid gap-x-10 md:grid-cols-3">
            {whoWeAdvise.map((w, i) => (
              <Reveal
                as="li"
                key={w.t}
                delay={i * 0.08}
                className="border-b border-bone/12 py-8 md:border-b-0 md:border-t md:pt-8"
              >
                <h3 className="max-w-[20ch] font-display text-[clamp(1.35rem,2.1vw,1.7rem)] leading-snug tracking-tight text-bone">
                  {w.t}
                </h3>
                <p className="mt-4 max-w-[38ch] text-[0.9rem] font-light leading-relaxed text-bone/50">
                  {w.d}
                </p>
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
