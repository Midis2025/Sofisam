import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Award, Building, CheckCircle2, Globe, Shield, Users } from 'lucide-react';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Button } from '@/components/ui/Button';
import { Parallax } from '@/components/animations/Parallax';
import { Reveal, MaskedLines, ImageReveal, RowReveal } from '@/components/animations/Reveal';
import { GlobalPerspective } from '@/components/sections/GlobalPerspective';
import { AdvisoryPrinciples } from '@/components/sections/AdvisoryPrinciples';
import { welcomeCopy, contact, site } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'About the Firm',
  description:
    'SOFISAM FZCO is an International Strategic Consulting, Advisory and Structuring Firm with world headquarters in the Dubai Multi Commodities Centre.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About the Firm | SOFISAM FZCO',
    description:
      'International Strategic Consulting, Advisory and Structuring Firm, headquartered in the Dubai Multi Commodities Centre.',
    url: '/about',
  },
};

/** Six working commitments governing client engagements */
const operatingPrinciples = [
  {
    k: '01',
    t: 'Independence is structural',
    d: 'We hold no product to place and no side to favour. That is a condition of how the firm is built, not a decorative intention.',
  },
  {
    k: '02',
    t: 'Discretion is the default',
    d: 'Engagements are handled exclusively in a closed circle by senior principals. Confidentiality is a working condition.',
  },
  {
    k: '03',
    t: 'Judgement over volume',
    d: 'A selective number of mandates, evaluated deeply by the principals who carry direct responsibility for the outcome.',
  },
  {
    k: '04',
    t: 'Definitive counsel',
    d: 'Where we hold a view, we deliver it plainly — with complete commercial reasoning, trade-offs, and downside risks identified.',
  },
  {
    k: '05',
    t: 'Local market reality',
    d: 'Conditions rarely travel identically across borders. We evaluate each market and jurisdiction on its actual structural terms.',
  },
  {
    k: '06',
    t: 'Ongoing commitment',
    d: 'The most consequential governance and execution questions rarely arrive on the day terms are agreed.',
  },
];

const credentialsList = [
  { label: 'Headquarters', value: 'Dubai Multi Commodities Centre (DMCC)' },
  { label: 'Nature of Firm', value: 'International Strategic Consulting & Structuring' },
  { label: 'Leadership Vantage', value: 'Principals with Direct Executive Experience' },
  { label: 'Core Scope', value: 'Strategic Mandates, Corporate Advisory, Governance' },
];

export default function AboutPage() {
  return (
    <>
      {/* 01 — Distinctive Editorial Masthead */}
      <PageHero
        eyebrow="About SOFISAM"
        sectionLabel="About the Firm"
        headline={['A firm built around', 'unconflicted judgement.']}
        standfirst={welcomeCopy.positioning}
        image="difc-gate"
        imageAlt="Dubai's financial district gate building lit at dusk, framed between surrounding towers"
        focal="50% 45%"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About the Firm' }]}
      />

      {/* 02 — The Firm in its Own Words */}
      <section data-section="Firm Overview" className="section ground-char" aria-labelledby="about-intro">
        <div className="shell">
          <div className="flex items-center gap-3 kicker">
            <p className="t-label">{welcomeCopy.eyebrow}</p>
          </div>

          <div className="mt-eyebrow grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-stretch">
            <div className="lg:col-span-7">
              <h2 id="about-intro" className="t-h2 text-[var(--ivory)] font-light leading-[1.08]">
                <MaskedLines lines={['Uncompromised perspective,', 'built over decades.']} />
              </h2>

              <Reveal kind="body" delay={0.12}>
                <blockquote className="mt-8 border-l-2 border-[var(--brass)] bg-[var(--plate)] p-6 sm:p-8 rounded-r-[var(--r-md)] shadow-[var(--shadow-plate)]">
                  <p className="font-display text-xl sm:text-2xl text-[var(--ivory)] font-light leading-snug">
                    &ldquo;{welcomeCopy.paragraphs[1]}&rdquo;
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-[var(--gold)] font-medium">
                    Corporate Foundation Statement
                  </p>
                </blockquote>
              </Reveal>

              <div className="mt-8 space-y-5 t-body text-[var(--sage)] leading-relaxed">
                <Reveal delay={0.18}>
                  <p>{welcomeCopy.paragraphs[0]}</p>
                </Reveal>
                <Reveal delay={0.24}>
                  <p>{welcomeCopy.paragraphs[2]}</p>
                </Reveal>
              </div>

              {/* Verified Firm Facts */}
              <div className="mt-10 pt-6 border-t border-[var(--line)]">
                <dl className="grid gap-4 sm:grid-cols-2">
                  {credentialsList.map((c) => (
                    <div key={c.label} className="p-4 rounded-[var(--r-md)] border border-[var(--line-soft)] bg-[var(--plate)]">
                      <dt className="text-[0.6875rem] uppercase tracking-wider text-[var(--stone)] font-mono">
                        {c.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-[var(--ivory)]">
                        {c.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Standing Architectural Image Plate */}
            <div className="lg:col-span-5">
              <ImageReveal delay={0.1} className="lg:h-full">
                <div className="media aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[26rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] shadow-[var(--shadow-plate)] group">
                  <Picture
                    name="dubai-frame-day"
                    alt="The Dubai Frame architectural landmark towering under clear blue skies"
                    sizes="(min-width:1024px) 40vw, 100vw"
                    focal="50% 35%"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10">
                    <span className="text-xs uppercase tracking-widest text-[#e8c89b] font-mono">
                      Institutional Rigour
                    </span>
                    <p className="mt-1 text-sm text-white/95 font-light">
                      Built to withstand cross-border complexity
                    </p>
                  </div>
                </div>
              </ImageReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Full-Bleed Parallax Passage: International Field of View */}
      <section
        data-section="International Perspective"
        className="band tone-dark veil-bottom grain relative w-full overflow-hidden bg-void"
        aria-labelledby="about-international"
      >
        <Parallax className="absolute inset-0" strength={8}>
          <Picture
            name="city-blue-night"
            alt="Illuminated towers of the Dubai financial district at night"
            decorative
            sizes="100vw"
            focal="50% 45%"
            className="h-full w-full object-cover"
          />
        </Parallax>

        <div className="shell relative z-10 flex min-h-[clamp(28rem,65vh,42rem)] flex-col justify-end py-20 sm:py-24">
          <div className="max-w-[46rem]">
            <div className="kicker">
              <p className="t-label text-gold">Global Presence</p>
            </div>

            <h2
              id="about-international"
              className="t-h2 mt-eyebrow text-white font-light leading-[1.08]"
            >
              <MaskedLines lines={['Relationships and partnerships', 'that span the globe.']} />
            </h2>

            <Reveal delay={0.12}>
              <p className="t-body mt-5 text-white/85 leading-relaxed max-w-[54ch]">
                From our world headquarters in the {contact.headquarters}, our relationships connect counterparties across the Middle East, Europe, Asia, and the Americas — reading each position on its own merits rather than a generic average.
              </p>
            </Reveal>

            <div className="mt-8 flex items-center gap-6">
              <Button variant="primary" tone="light" href="/services">
                Explore Capabilities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Executive Vantage: Where Decisions Cannot Be Delegated */}
      <section data-section="Corporate Advisory" className="section ground-void" aria-labelledby="about-positioning">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="kicker">
                <p className="t-label">Advisory Vantage</p>
              </div>

              <h2
                id="about-positioning"
                className="t-h2 mt-eyebrow text-[var(--ivory)] font-light leading-[1.08]"
              >
                <MaskedLines lines={['Where the decision', 'cannot be delegated.']} />
              </h2>

              <Reveal kind="body" delay={0.12}>
                <p className="t-body mt-6 text-[var(--sage)] leading-relaxed max-w-[54ch]">
                  The matters we are brought into tend to sit above the level at which an organisation can resolve them internally: what a leadership team should commit to next, how a board should hold a contested position, or whether an existing corporate structure is carrying more strain than it was designed to withstand.
                </p>
              </Reveal>

              <Reveal kind="body" delay={0.18}>
                <p className="t-body mt-4 text-[var(--sage)] leading-relaxed max-w-[54ch]">
                  Our principals are highly successful business executives and investors that bring unique perspectives to all of our mandates and investments. That direct ownership mindset is the vantage point our advice is delivered from.
                </p>
              </Reveal>

              <div className="mt-8 pt-6 border-t border-[var(--line)] flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8">
                <div>
                  <p className="font-display text-2xl text-[var(--ivory)] font-light">100%</p>
                  <p className="text-xs uppercase tracking-wider text-[var(--stone)] mt-0.5">Unconflicted</p>
                </div>
                <div aria-hidden className="hidden h-8 w-px bg-[var(--line)] sm:block" />
                <div>
                  <p className="font-display text-2xl text-[var(--ivory)] font-light">DMCC</p>
                  <p className="text-xs uppercase tracking-wider text-[var(--stone)] mt-0.5">World Headquarters</p>
                </div>
                <div aria-hidden className="hidden h-8 w-px bg-[var(--line)] sm:block" />
                <div>
                  <p className="font-display text-2xl text-[var(--ivory)] font-light">Global</p>
                  <p className="text-xs uppercase tracking-wider text-[var(--stone)] mt-0.5">Cross-Border Reach</p>
                </div>
              </div>
            </div>

            <ImageReveal delay={0.1} className="lg:col-span-6">
              <div className="media aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[24rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] shadow-[var(--shadow-plate)] group">
                <Picture
                  name="exec-courtyard-dusk"
                  alt="Modern glass corporate office courtyard in Dubai at dusk"
                  sizes="(min-width:1024px) 50vw, 100vw"
                  focal="50% 50%"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#e8c89b] font-mono">
                      Confidential Dialogue
                    </span>
                    <p className="text-sm font-light text-white/95">
                      Closed-circle advisory with executive principals
                    </p>
                  </div>
                  <Users className="h-4 w-4 text-[#e8c89b]" />
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 05 — 5 Core Advisory Principles */}
      <AdvisoryPrinciples />

      {/* 06 — 6 Operating Principles Grid */}
      <section data-section="Operating Principles" className="section ground-char" aria-labelledby="about-principles">
        <div className="shell">
          <SectionHeader
            ruled
            label="Operating Commitments"
            heading="How the firm actually operates."
            headingId="about-principles"
            copy="Six commitments that govern how every advisory engagement is taken on, framed, and carried through to completion."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {operatingPrinciples.map((p, i) => (
              <RowReveal
                key={p.k}
                delay={i * 0.08}
                className="group relative flex flex-col justify-between p-7 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-plate)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                />

                <div>
                  <span className="t-label text-[var(--gold)]">
                    Commitment
                  </span>
                  <h3 className="mt-3 t-card text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                    {p.t}
                  </h3>
                  <p className="mt-2.5 t-small text-[var(--sage)] leading-relaxed">
                    {p.d}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[var(--line-soft)] flex items-center justify-between text-[0.6875rem] uppercase tracking-wider text-[var(--stone)]">
                  <span>Operating Standard</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--brass)] opacity-60 group-hover:opacity-100" />
                </div>
              </RowReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — World Headquarters: Dubai DMCC Feature */}
      <section data-section="Dubai — DMCC" className="section ground-graphite" aria-labelledby="about-dmcc">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-16">
            {/* Content (Left Column on Desktop, First on Mobile) */}
            <div className="lg:col-span-5 order-1">
              <div className="kicker">
                <p className="t-label">Dubai — DMCC</p>
              </div>

              <h2 id="about-dmcc" className="t-h2 mt-eyebrow text-[var(--ivory)] font-light leading-[1.08]">
                <MaskedLines lines={['World headquarters,', 'global reach.']} />
              </h2>

              <p className="t-body mt-5 text-[var(--sage)] leading-relaxed">
                SOFISAM FZCO is based in the {contact.headquarters}, a free zone in Jumeirah Lake Towers that concentrates internationally oriented businesses within a defined and well-understood international framework.
              </p>

              <div className="mt-8 p-6 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--plate)]">
                <p className="text-xs uppercase tracking-wider text-[var(--stone)] font-mono">
                  Registered Address
                </p>
                <address className="mt-2 not-italic text-sm text-[var(--ivory)] font-medium leading-relaxed">
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                </address>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <Button variant="link" href="/contact">
                  Inquire with Headquarters
                </Button>
              </div>
            </div>

            {/* Image Plate (Right Column on Desktop, Below on Mobile) */}
            <ImageReveal className="lg:col-span-7 order-2">
              <div className="media aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[24rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] shadow-[var(--shadow-plate)] group">
                <Picture
                  name="hero-dubai"
                  alt="Panoramic Dubai financial district skyline and DMCC towers illuminated at dusk"
                  sizes="(min-width:1024px) 58vw, 100vw"
                  focal="50% 55%"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#e8c89b] font-mono">
                      World Headquarters
                    </span>
                    <p className="text-sm font-light text-white/95">
                      Dubai Multi Commodities Centre, JLT
                    </p>
                  </div>
                  <Building className="h-4 w-4 text-[#e8c89b]" />
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 08 — Global Perspective Editorial Variant */}
      <GlobalPerspective variant="editorial" />
    </>
  );
}
