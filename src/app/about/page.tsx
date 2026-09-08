import type { Metadata } from 'next';

import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, DrawRule, ImageReveal } from '@/components/animations/Reveal';
import { Parallax, ScaleOnScroll } from '@/components/animations/Parallax';
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
      {/* Hero — the shared internal-page hero, same size step as Services and
          Insights: full-bleed architecture, dark veil, bottom-anchored copy. */}
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
      <section className="section bg-bone" aria-labelledby="about-intro">
        <div className="shell-wide">
          <div className="flex items-center gap-4">
            <span aria-hidden className="block h-px w-10 shrink-0 bg-gold sm:w-16" />
            <p className="t-label text-gold">{welcomeCopy.eyebrow}</p>
          </div>

          <h2 id="about-intro" className="sr-only">
            The firm in its own words
          </h2>

          <div className="mt-[var(--content-gap-lg)] grid gap-[var(--content-gap-lg)] lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="font-display text-[clamp(1.8rem,4vw,3.3rem)] leading-[1.07] tracking-tighter text-ink">
                  {welcomeCopy.paragraphs[1]}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-2">
              <Reveal delay={0.1}>
                <p className="t-lead text-ink">{welcomeCopy.positioning}</p>
              </Reveal>

              <DrawRule className="my-[var(--content-gap-md)]" />

              <div className="space-y-5">
                <Reveal delay={0.16}>
                  <p className="t-body text-ink/65">{welcomeCopy.paragraphs[0]}</p>
                </Reveal>
                <Reveal delay={0.22}>
                  <p className="t-body text-ink/65">{welcomeCopy.paragraphs[2]}</p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Layered composition: one dominant plate, one inset */}
      <section className="section-md bg-bone" aria-label="Architectural composition">
        <div className="shell-wide">
          <div className="relative">
            <ImageReveal className="hidden sm:block">
              <ScaleOnScroll
                className="media aspect-[16/9] w-full lg:aspect-[21/9]"
                from={1.12}
                to={1}
              >
                <Picture
                  name="lattice-white"
                  alt="Pale architectural screen forming a precise repeating lattice across a building facade"
                  sizes="100vw"
                  focal="50% 50%"
                  className="h-full w-full"
                />
              </ScaleOnScroll>
            </ImageReveal>

            {/* Inset plate. Overlaps the band from sm upward and simply sits
                beneath it on phones, so nothing is cropped or pushed off-canvas. */}
            <ImageReveal
              delay={0.14}
              className="w-full sm:absolute sm:-bottom-[10%] sm:right-0 sm:w-[30%] lg:w-[25%]"
            >
              <div className="media aspect-[4/5] w-full sm:aspect-[3/4] sm:border-[10px] sm:border-bone">
                <Picture
                  name="facade-pale"
                  alt="Slender pale tower rising beside a sheer reflective glass facade"
                  sizes="(min-width:640px) 30vw, 100vw"
                  focal="62% 40%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>
          </div>

          {/* Clears the overlap only where the inset actually overlaps */}
          <div aria-hidden className="hidden sm:block sm:h-[7vw] lg:h-[5vw]" />
        </div>
      </section>

      {/* 04 — Dark full-bleed statement */}
      <section
        className="panel relative w-full overflow-hidden bg-ink text-bone"
        aria-labelledby="about-international"
      >
        <Parallax strength={9} className="absolute inset-0">
          <div className="media veil-editorial h-full w-full">
            <Picture
              name="city-mono"
              alt=""
              decorative
              sizes="100vw"
              focal="50% 45%"
              className="h-full w-full"
            />
          </div>
        </Parallax>

        <div className="panel-inner shell-wide relative z-10 flex min-h-[28rem] flex-col justify-end py-[var(--space-section-lg)] lg:min-h-[32rem]">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden className="block h-px w-10 shrink-0 bg-gold sm:w-16" />
            <p className="t-label text-gold">International Perspective</p>
          </Reveal>

          <h2
            id="about-international"
            className="t-h1 mt-[var(--content-gap-md)] max-w-[17ch] text-bone"
          >
            <MaskedLines
              lines={['Relationships and', 'partnerships that', 'span the globe.']}
            />
          </h2>

          <Reveal delay={0.14}>
            <p className="t-lead mt-[var(--content-gap-md)] max-w-[48ch] text-bone/70">
              From our world headquarters in the {contact.headquarters}, we work
              with counterparties whose assumptions were formed elsewhere — and
              read each position on its own terms rather than by regional average.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 05 — Corporate advisory: sticky plate, scrolling copy */}
      <section className="section bg-bone" aria-labelledby="about-positioning">
        <div className="shell-wide">
          <div className="grid gap-[var(--content-gap-lg)] lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[7.5rem]">
                <ImageReveal>
                  <div className="media aspect-[4/5] w-full">
                    <Picture
                      name="lounge-dark"
                      alt="Darkened executive lounge with slatted screens and low, considered lighting"
                      sizes="(min-width:1024px) 40vw, 100vw"
                      focal="50% 50%"
                      className="h-full w-full"
                    />
                  </div>
                </ImageReveal>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 lg:pt-[var(--content-gap-lg)]">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 shrink-0 bg-gold sm:w-16" />
                <p className="t-label text-gold">Corporate Advisory</p>
              </Reveal>

              <h2
                id="about-positioning"
                className="t-h2 mt-[var(--content-gap-md)] max-w-[16ch] text-ink"
              >
                <MaskedLines lines={['Where the', 'decision cannot', 'be delegated.']} />
              </h2>

              <Reveal delay={0.12}>
                <p className="t-body mt-[var(--content-gap-md)] max-w-[48ch] text-ink/65">
                  The matters we are brought into tend to sit above the level at
                  which an organisation can resolve them internally: what a
                  leadership team should do next, how a board should hold a
                  position, whether a structure is carrying more weight than it
                  was designed for.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="t-body mt-5 max-w-[48ch] text-ink/65">
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
      <section className="section bg-bone" aria-labelledby="about-principles">
        <div className="shell-wide">
          <div className="grid gap-[var(--content-gap-lg)] lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[7.5rem]">
                <Reveal className="flex items-center gap-4">
                  <span aria-hidden className="block h-px w-10 shrink-0 bg-gold sm:w-16" />
                  <p className="t-label text-gold">Working Principles</p>
                </Reveal>

                <h2
                  id="about-principles"
                  className="t-h2 mt-[var(--content-gap-md)] max-w-[13ch] text-ink"
                >
                  <MaskedLines lines={['How the firm', 'actually operates.']} />
                </h2>

                <Reveal delay={0.1}>
                  <p className="t-body mt-6 max-w-[34ch] text-ink/55">
                    Six commitments that govern how an engagement is taken on and
                    how it is carried.
                  </p>
                </Reveal>
              </div>
            </div>

            <ol className="border-t border-ink/12 lg:col-span-7 lg:col-start-6">
              {operatingPrinciples.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.k}
                  delay={i * 0.05}
                  className="group grid grid-cols-[auto_1fr] gap-x-5 border-b border-ink/12 py-6 sm:gap-x-8 sm:py-7"
                >
                  <span className="t-index pt-[0.35rem] text-[0.8rem] text-gold">{p.k}</span>
                  <div>
                    <h3 className="max-w-[24ch] font-display text-[clamp(1.2rem,2vw,1.6rem)] leading-snug tracking-tight text-ink transition-colors duration-500 group-hover:text-gold">
                      {p.t}
                    </h3>
                    <p className="mt-2.5 max-w-[46ch] text-[0.9rem] font-light leading-relaxed text-ink/55">
                      {p.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 08 — Dubai / DMCC: editorial header, then a full-bleed band */}
      <section className="section-md bg-bone" aria-labelledby="about-dmcc">
        <div className="shell-wide">
          <div className="grid gap-[var(--content-gap-lg)] lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 shrink-0 bg-gold sm:w-16" />
                <p className="t-label text-gold">Dubai — DMCC</p>
              </Reveal>
              <h2
                id="about-dmcc"
                className="t-h2 mt-[var(--content-gap-md)] max-w-[15ch] text-ink"
              >
                <MaskedLines lines={['World', 'headquarters.']} />
              </h2>
            </div>

            <div className="lg:col-span-4">
              <Reveal delay={0.1}>
                <p className="t-body max-w-[44ch] text-ink/65">
                  SOFISAM FZCO is based in the {contact.headquarters}, a free
                  zone in Jumeirah Lake Towers that concentrates internationally
                  oriented businesses within a defined and well-understood
                  framework.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-3">
              <Reveal delay={0.16}>
                <p className="t-label text-ink/40">Address</p>
                <address className="mt-3 not-italic">
                  <p className="font-display text-[1.1rem] leading-relaxed tracking-tight text-ink">
                    {contact.address.line1}
                    <br />
                    {contact.address.line2}
                  </p>
                </address>
              </Reveal>
            </div>
          </div>
        </div>

        <ImageReveal className="mt-[var(--content-gap-lg)]">
          <ScaleOnScroll
            className="media aspect-[16/9] w-full lg:aspect-[24/9]"
            from={1.1}
            to={1}
          >
            <Picture
              name="dubai-haze"
              alt="Dubai skyline seen across the water in warm morning haze"
              sizes="100vw"
              focal="50% 55%"
              className="h-full w-full"
            />
          </ScaleOnScroll>
        </ImageReveal>
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
