import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Shield, Users } from 'lucide-react';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { ServiceIntro } from '@/components/sections/ServiceIntro';
import { AdvisoryThemes } from '@/components/sections/AdvisoryThemes';
import { ServicePager } from '@/components/sections/ServicePager';
import { serviceBySlug } from '@/data/services';
import { SectionHeader } from '@/components/ui/SectionHeader';

const service = serviceBySlug('advisory')!;

export const metadata: Metadata = {
  title: 'Corporate Advisory',
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
    d: 'Who is entitled to commit the organisation, up to what financial magnitude, and on whose explicit behalf.',
  },
  {
    t: 'Oversight',
    d: 'What information the board actually reviews, how frequently, and whether it is sufficient to hold a legally defensible position.',
  },
  {
    t: 'Accountability',
    d: 'Where commercial and legal responsibility lands when an outcome reverses, and whether that distribution is settled in advance.',
  },
  {
    t: 'Succession & Continuity',
    d: 'Whether the operational governance and decision frameworks survive the departure of the individuals who created them.',
  },
];

export default function AdvisoryPage() {
  return (
    <>
      {/* 01 — Page Hero */}
      <PageHero
        eyebrow={service.hero.eyebrow}
        sectionLabel={service.title}
        headline={['Counsel formed in the room', 'where decisions are taken.']}
        headlineWide={['Counsel formed in the room', 'where decisions are taken.']}
        standfirst={service.hero.standfirst}
        image={service.hero.image}
        imageAlt={service.hero.imageAlt}
        focal={service.hero.focal}
        size="tall"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Expertise', href: '/services' },
          { label: service.title },
        ]}
      />

      {/* 02 — Introduction */}
      <ServiceIntro
        labelledBy="adv-intro"
        label="Executive Counsel"
        heading={
          <h2
            id="adv-intro"
            className="font-display text-2xl sm:text-3xl mt-4 text-[var(--ivory)] font-light leading-snug"
          >
            Executive decision-making, supported rather than substituted.
          </h2>
        }
        below={
          <div className="mt-12 pt-8 border-t border-[var(--line)]">
            <Reveal delay={0.08}>
              <blockquote className="max-w-[48rem]">
                <p className="font-display text-xl sm:text-2xl text-[var(--ivory)] font-light leading-snug">
                  &ldquo;Built over decades of international business experience, advising boards and executive teams across consequential matters.&rdquo;
                </p>
                <footer className="mt-4 flex items-center gap-3">
                  <span aria-hidden className="block h-px w-8 bg-[var(--brass)]" />
                  <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">SOFISAM FZCO</span>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        }
      >
        <Reveal delay={0.06}>
          <p className="t-lead text-[var(--ivory)] leading-relaxed">{service.intro.lead}</p>
        </Reveal>

        <div className="intro-body space-y-4 pt-2">
          {service.intro.body.map((p, i) => (
            <Reveal key={p} delay={0.08 * (i + 1)}>
              <p className="t-body text-[var(--sage)] leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </ServiceIntro>

      {/* 03 — Governance Architecture Ledger */}
      <section data-section="Corporate Governance" className="section ground-graphite border-b border-[var(--line-soft)]" aria-labelledby="adv-governance">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-16">
            {/* Content (Left Column on Desktop, First on Mobile) */}
            <div className="lg:col-span-7 order-1">
              <div className="kicker">
                <p className="t-label">Corporate Governance</p>
              </div>

              <h2
                id="adv-governance"
                className="t-h2 mt-eyebrow text-[var(--ivory)] font-light leading-[1.08]"
              >
                <MaskedLines lines={['Governance is a working', 'system, not a document.']} />
              </h2>

              <Reveal delay={0.12}>
                <p className="t-body mt-5 text-[var(--sage)] leading-relaxed">
                  We consider how authority, oversight, and accountability are actually distributed in practice, and whether that distribution matches the scale of the strategic decisions being made.
                </p>
              </Reveal>

              <dl className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {governanceNotes.map((g, i) => (
                  <Reveal key={g.t} delay={i * 0.06}>
                    <div className="py-4 grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6 items-baseline">
                      <dt className="text-xs uppercase tracking-wider text-[var(--gold)] font-mono font-medium">{g.t}</dt>
                      <dd className="t-small text-[var(--ivory-2)] leading-relaxed">{g.d}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>

            {/* Media Plate (Right Column on Desktop, Below on Mobile) */}
            <ImageReveal className="lg:col-span-5 order-2">
              <div className="media aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[24rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] shadow-[var(--shadow-plate)] group">
                <Picture
                  name="dubai-burj-khalifa-reflection"
                  alt="Burj Khalifa soaring vertically with symmetrical architectural reflection in Downtown Dubai"
                  sizes="(min-width:1024px) 42vw, 100vw"
                  focal="50% 40%"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10">
                  <span className="text-xs uppercase tracking-widest text-[#e8c89b] font-mono">
                    Governance Structure
                  </span>
                  <p className="text-sm font-light text-white/95 mt-1">
                    Defensible frameworks designed for high-stakes decisions
                  </p>
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 04 — Advisory Perspective Themes */}
      <AdvisoryThemes themes={service.themes} />

      {/* 05 — Experience & Vantage Feature */}
      <section data-section="Experience" className="section ground-char border-b border-[var(--line-soft)]" aria-labelledby="adv-experience">
        <div className="shell">
          <SectionHeader
            ruled
            label="Direct Ownership"
            heading="The view of an owner, not a bystander."
            headingId="adv-experience"
            copy="Our principals bring unique perspectives to all of our mandates and investments — grounded in capital deployed and operating leadership."
          />

          <ImageReveal className="mt-12">
            <div className="media aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[24/9] overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] shadow-[var(--shadow-plate)] group">
              <Picture
                name="dubai-burj-al-arab-gulf"
                alt="Panoramic view of Burj Al Arab along the Dubai coastline over the Arabian Gulf"
                sizes="100vw"
                focal="50% 50%"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white z-10 flex items-end justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#e8c89b] font-mono">
                    Principal Executive Standard
                  </span>
                  <p className="mt-1 font-display text-2xl text-white font-light">
                    Confidential Strategic Advisory
                  </p>
                </div>
                <span className="text-xs font-mono text-white/70 hidden sm:block">
                  Dubai Multi Commodities Centre
                </span>
              </div>
            </div>
          </ImageReveal>
        </div>
      </section>

      {/* 06 — Service Pager */}
      <ServicePager current="advisory" />
    </>
  );
}
