import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Shield, Users, Layers } from 'lucide-react';

import { PageHero } from '@/components/layout/PageHero';
import { ServiceSelector } from '@/components/sections/ServiceSelector';
import { ProcessNarrative } from '@/components/sections/ProcessNarrative';
import { Tilt } from '@/components/ui/Tilt';
import { Reveal, MaskedLines } from '@/components/animations/Reveal';
import { servicesIntro } from '@/data/site';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Our Practice Areas & Capabilities',
  description:
    'Strategic Consulting, Corporate Advisory and Structuring — comprehensive strategic solutions tailored to complex global markets and corporate governance needs.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Our Practice Areas & Capabilities | SOFISAM FZCO',
    description:
      'Strategic Consulting, Corporate Advisory and Structuring from SOFISAM FZCO, Dubai.',
    url: '/services',
  },
};

const whoWeAdvise = [
  {
    t: 'Boards & Leadership Teams',
    subtitle: 'Consequential Commitments',
    d: 'Where a position has to be held publicly and defended internally at the same time, under partial information and external market scrutiny.',
    icon: Shield,
  },
  {
    t: 'Principals & Family Offices',
    subtitle: 'Long-Horizon Capital',
    d: 'Where the capital at stake is the decision-maker’s own, the horizon is multi-generational, and the requirement is absolute discretion.',
    icon: Users,
  },
  {
    t: 'International Operating Groups',
    subtitle: 'Cross-Border Complexity',
    d: 'Where a strategy must remain resilient across multiple jurisdictions that do not share the same commercial, legal, or fiscal rules.',
    icon: Layers,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* 01 — Page Masthead */}
      <PageHero
        eyebrow="Practice Areas"
        sectionLabel="Our Expertise"
        headline={['Strategic solutions tailored to', 'complex global markets.']}
        standfirst={servicesIntro.standfirst}
        image="hero-dubai"
        imageAlt="Dubai's skyline at night, its towers reflected in the water"
        focal="50% 55%"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Expertise' }]}
      />

      {/* 02 — 3 Disciplines Quick Matrix */}
      <section className="section ground-void border-b border-[var(--line-soft)]" aria-label="Practice Areas Matrix">
        <div className="shell">
          <div className="grid gap-6 sm:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative flex flex-col justify-between p-8 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-plate)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="t-label text-[var(--gold)]">
                      Core Discipline
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--stone)] group-hover:text-[var(--gold)] transition-colors" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors font-light">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs text-[var(--sage)] leading-relaxed line-clamp-2">
                    {s.navDescription}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--line-soft)] text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
                  Explore Practice →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Interactive 3-Disciplines Tabbed Selector */}
      <ServiceSelector />

      {/* 04 — Who We Advise */}
      <section data-section="Who We Advise" className="section ground-void border-b border-[var(--line-soft)]" aria-labelledby="who-we-advise">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[var(--line)]">
            <div>
              <div className="kicker">
                <p className="t-label">Counterparties</p>
              </div>
              <h2
                id="who-we-advise"
                className="mt-eyebrow t-h2 text-[var(--ivory)] font-light leading-[1.08]"
              >
                <MaskedLines lines={['The people who carry', 'the final decision.']} />
              </h2>
            </div>
            <p className="t-body text-[var(--sage)] max-w-[42ch] leading-relaxed">
              Engagements are accepted directly with the executives and owners accountable for the outcome, never a layer removed.
            </p>
          </div>

          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {whoWeAdvise.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal as="li" key={w.t} kind="card" delay={i * 0.08} className="h-full">
                  <Tilt className="h-full">
                    <div className="group relative flex h-full flex-col justify-between p-8 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]">
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                      />
                      <div>
                        <div className="flex items-center justify-between">
                          <Icon className="h-5 w-5 text-[var(--brass)]" />
                          <span className="text-[0.6875rem] font-mono text-[var(--stone)] uppercase">
                            Client Profile 0{i + 1}
                          </span>
                        </div>
                        <h3 className="mt-5 font-display text-2xl text-[var(--ivory)] font-light">
                          {w.t}
                        </h3>
                        <p className="mt-1 text-xs uppercase tracking-wider text-[var(--gold)] font-medium">
                          {w.subtitle}
                        </p>
                        <p className="mt-4 t-small text-[var(--sage)] leading-relaxed">
                          {w.d}
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-[var(--line-soft)] flex items-center justify-between text-xs text-[var(--stone)]">
                        <span>Advisory Scope</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--brass)]" />
                      </div>
                    </div>
                  </Tilt>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 05 — Disciplined Five-Stage Advisory Sequence */}
      <ProcessNarrative />
    </>
  );
}
