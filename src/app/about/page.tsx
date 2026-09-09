import type { Metadata } from 'next';

import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { PageHero } from '@/components/layout/PageHero';
import { GlobalPerspective } from '@/components/sections/GlobalPerspective';
import { AdvisoryPrinciples } from '@/components/sections/AdvisoryPrinciples';
import { CTASection } from '@/components/sections/CTASection';
import { welcomeCopy, contact } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'SOFISAM FZCO is an International Strategic Consulting, Advisory and Structuring Firm with world headquarters in the Dubai Multi Commodities Centre.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | SOFISAM FZCO',
    description:
      'International Strategic Consulting, Advisory and Structuring Firm, headquartered in the Dubai Multi Commodities Centre.',
    url: '/about',
  },
};

const operatingPrinciples = [
  {
    k: '01',
    t: 'Independence is structural',
    d: 'We hold no product to place and no side to favour. That is a condition of how the firm is set up, not an intention it announces.',
  },
  {
    k: '02',
    t: 'Discretion is the default',
    d: 'Engagements are handled in a closed circle and remain there. Confidentiality is a working condition rather than a clause.',
  },
  {
    k: '03',
    t: 'Judgement over volume',
    d: 'A small number of matters, taken seriously, by the principals who accepted them.',
  },
  {
    k: '04',
    t: 'A plain recommendation',
    d: 'Where we have a view, we give it — with the reasoning attached and the downside stated.',
  },
  {
    k: '05',
    t: 'Read each market on its terms',
    d: 'Conditions rarely travel between jurisdictions. Neither should the assumptions built on them.',
  },
  {
    k: '06',
    t: 'Availability after the decision',
    d: 'The difficult questions rarely arrive on the day a decision is taken.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — the shared internal-page hero, unchanged */}
      <PageHero
        eyebrow="About SOFISAM"
        headline={['A firm built', 'around judgement.']}
        standfirst={welcomeCopy.positioning}
        image="difc-gate"
        imageAlt="Dubai's financial district gate building lit at dusk, framed between surrounding towers"
        focal="50% 45%"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* 02 — Editorial intro: oversized statement against a narrow body column */}
      <section className="rd-section rd-paper" aria-labelledby="about-intro">
        <div className="rd-shell">
          <Reveal className="rd-kicker">
            <p className="rd-label">{welcomeCopy.eyebrow}</p>
          </Reveal>

          <h2 id="about-intro" className="sr-only">
            The firm in its own words
          </h2>

          <div className="mt-[clamp(1.5rem,3vw,2.75rem)] grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="rd-display max-w-[18ch] text-[var(--rd-ink)]">
                  {welcomeCopy.paragraphs[1]}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
              <Reveal delay={0.1}>
                <p className="rd-lead text-[var(--rd-ink)]">{welcomeCopy.positioning}</p>
              </Reveal>

              <Reveal delay={0.14}>
                <span aria-hidden className="rd-rule my-[var(--rd-gap)] block" />
              </Reveal>

              <div className="space-y-6">
                <Reveal delay={0.16}>
                  <p className="rd-body text-[var(--rd-stone)]">{welcomeCopy.paragraphs[0]}</p>
                </Reveal>
                <Reveal delay={0.22}>
                  <p className="rd-body text-[var(--rd-stone)]">{welcomeCopy.paragraphs[2]}</p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Architectural pair: two plates at different weights */}
      <section className="rd-section-sm rd-paper" aria-label="Architectural composition">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap-sm)] sm:grid-cols-12 sm:gap-[clamp(1rem,2vw,1.75rem)]">
            <ImageReveal className="sm:col-span-8">
              <div className="rd-media aspect-[16/10] w-full lg:aspect-[16/9]">
                <Picture
                  name="lattice-white"
                  alt="Pale architectural screen forming a precise repeating lattice across a building facade"
                  sizes="(min-width:640px) 64vw, 100vw"
                  focal="50% 50%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>

            <ImageReveal delay={0.12} className="sm:col-span-4 sm:pt-[clamp(2rem,5vw,5rem)]">
              <div className="rd-media aspect-[4/5] w-full sm:aspect-[3/4]">
                <Picture
                  name="facade-pale"
                  alt="Slender pale tower rising beside a sheer reflective glass facade"
                  sizes="(min-width:640px) 32vw, 100vw"
                  focal="62% 40%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 04 — Dark statement panel */}
      <section className="rd-section-sm rd-paper" aria-labelledby="about-international">
        <div className="rd-shell">
          <div className="rd-panel rd-on-dark relative overflow-hidden bg-ink">
            <div className="media veil-editorial absolute inset-0">
              <Picture
                name="city-mono"
                alt=""
                decorative
                sizes="100vw"
                focal="50% 45%"
                className="h-full w-full"
              />
            </div>

            <div className="relative z-10 flex min-h-[24rem] flex-col justify-end px-[clamp(1.5rem,4vw,4.5rem)] py-[clamp(2.5rem,5vw,4.5rem)] lg:min-h-[30rem]">
              <Reveal className="rd-kicker">
                <p className="rd-label">International Perspective</p>
              </Reveal>

              <h2
                id="about-international"
                className="rd-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[17ch] text-bone"
              >
                <MaskedLines
                  lines={['Relationships and', 'partnerships that', 'span the globe.']}
                />
              </h2>

              <Reveal delay={0.14}>
                <p className="rd-lead mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[48ch] text-bone/75">
                  From our world headquarters in the {contact.headquarters}, we work
                  with counterparties whose assumptions were formed elsewhere — and
                  read each position on its own terms rather than by regional average.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Corporate advisory: plate beside scrolling copy */}
      <section className="rd-section rd-paper" aria-labelledby="about-positioning">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[8rem]">
                <ImageReveal>
                  <div className="rd-media aspect-[4/5] w-full">
                    <Picture
                      name="lounge-dark"
                      alt="Darkened executive lounge with slatted screens and low, considered lighting"
                      sizes="(min-width:1024px) 42vw, 100vw"
                      focal="50% 50%"
                      className="h-full w-full"
                    />
                  </div>
                </ImageReveal>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 lg:pt-[clamp(1rem,3vw,3rem)]">
              <Reveal className="rd-kicker">
                <p className="rd-label">Corporate Advisory</p>
              </Reveal>

              <h2
                id="about-positioning"
                className="rd-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[16ch] text-[var(--rd-ink)]"
              >
                <MaskedLines lines={['Where the', 'decision cannot', 'be delegated.']} />
              </h2>

              <Reveal delay={0.12}>
                <p className="rd-body mt-[clamp(1.5rem,2.6vw,2.25rem)] max-w-[48ch] text-[var(--rd-stone)]">
                  The matters we are brought into tend to sit above the level at
                  which an organisation can resolve them internally: what a
                  leadership team should do next, how a board should hold a
                  position, whether a structure is carrying more weight than it
                  was designed for.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="rd-body mt-5 max-w-[48ch] text-[var(--rd-stone)]">
                  Our principals are highly successful business executives and
                  investors that bring unique perspectives to all of our mandates
                  and investments. That is the vantage point the advice is given
                  from.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — Confidential / Unconflicted / Strategic / International / Experienced */}
      <AdvisoryPrinciples />

      {/* 07 — Working principles as an editorial ledger, not a card grid */}
      <section className="rd-section rd-paper-2" aria-labelledby="about-principles">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[8rem]">
                <Reveal className="rd-kicker">
                  <p className="rd-label">Working Principles</p>
                </Reveal>

                <h2
                  id="about-principles"
                  className="rd-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[13ch] text-[var(--rd-ink)]"
                >
                  <MaskedLines lines={['How the firm', 'actually operates.']} />
                </h2>

                <Reveal delay={0.1}>
                  <p className="rd-small mt-6 max-w-[34ch] text-[var(--rd-stone)]">
                    Six commitments that govern how an engagement is taken on and
                    how it is carried.
                  </p>
                </Reveal>
              </div>
            </div>

            <ol className="lg:col-span-7 lg:col-start-6">
              {operatingPrinciples.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.k}
                  delay={i * 0.05}
                  className="rd-row rd-row-hover last:border-b last:border-[var(--rd-line)]"
                >
                  <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 px-1 py-[clamp(1.5rem,2.4vw,2rem)] sm:gap-x-8">
                    <span className="rd-num pt-[0.3rem] text-[0.9rem] text-[var(--rd-accent-ink)]">
                      {p.k}
                    </span>
                    <div>
                      <h3 className="rd-h4 max-w-[26ch] text-[var(--rd-ink)]">{p.t}</h3>
                      <p className="rd-small mt-3 max-w-[48ch] text-[var(--rd-stone)]">{p.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 08 — Dubai / DMCC: editorial header, then a wide plate */}
      <section className="rd-section rd-paper" aria-labelledby="about-dmcc">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-end lg:gap-[clamp(2rem,3.5vw,4rem)]">
            <div className="lg:col-span-4">
              <Reveal className="rd-kicker">
                <p className="rd-label">Dubai — DMCC</p>
              </Reveal>
              <h2
                id="about-dmcc"
                className="rd-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[12ch] text-[var(--rd-ink)]"
              >
                <MaskedLines lines={['World', 'headquarters.']} />
              </h2>
            </div>

            <div className="lg:col-span-4">
              <Reveal delay={0.1}>
                <p className="rd-body max-w-[44ch] text-[var(--rd-stone)]">
                  SOFISAM FZCO is based in the {contact.headquarters}, a free
                  zone in Jumeirah Lake Towers that concentrates internationally
                  oriented businesses within a defined and well-understood
                  framework.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-3 lg:col-start-10">
              <Reveal delay={0.16}>
                <p className="rd-label text-[var(--rd-stone)]">Address</p>
                <address className="mt-4 not-italic">
                  <p className="rd-h4 leading-relaxed text-[var(--rd-ink)]">
                    {contact.address.line1}
                    <br />
                    {contact.address.line2}
                  </p>
                </address>
              </Reveal>
            </div>
          </div>

          <ImageReveal className="mt-[var(--rd-pad-sm)]">
            <div className="rd-media aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[24/9]">
              <Picture
                name="dubai-haze"
                alt="Dubai skyline seen across the water in warm morning haze"
                sizes="100vw"
                focal="50% 55%"
                className="h-full w-full"
              />
            </div>
          </ImageReveal>
        </div>
      </section>

      {/* 09 — Global perspective */}
      <GlobalPerspective />

      {/* 10 — Enquiries */}
      <CTASection
        eyebrow="Enquiries"
        lines={['Speak with', 'the firm.']}
        body="Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence."
        image="tower-dusk"
        focal="50% 45%"
      />
    </>
  );
}
