import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, DrawRule, ImageReveal } from '@/components/animations/Reveal';
import { Parallax, ScaleOnScroll } from '@/components/animations/Parallax';
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
      <PageHero
        eyebrow="About SOFISAM"
        headline={['A firm built', 'around judgement.']}
        standfirst={welcomeCopy.positioning}
        image="difc-gate"
        imageAlt="Dubai's financial district gate building lit at dusk, framed between surrounding towers"
        focal="50% 45%"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Introduction */}
      <section className="section bg-bone" aria-labelledby="about-intro">
        <div className="shell-wide">
          <div className="grid gap-[var(--space-section-sm)] lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">{welcomeCopy.eyebrow}</p>
              </Reveal>
              <h2 id="about-intro" className="t-h2 mt-7 max-w-[14ch] text-ink">
                <MaskedLines lines={['The firm', 'in its own', 'words.']} />
              </h2>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="t-lead max-w-[52ch] text-ink">
                  {welcomeCopy.positioning}
                </p>
              </Reveal>

              <div className="mt-9 space-y-7">
                {welcomeCopy.paragraphs.map((p, i) => (
                  <Reveal key={p} delay={0.08 * i}>
                    <p className="t-body max-w-[58ch] text-ink/65">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <DrawRule className="mt-[var(--space-section-md)]" />

          {/* Editorial media pair */}
          <div className="mt-[var(--space-section-sm)] grid gap-6 sm:grid-cols-12 sm:gap-8">
            <ImageReveal className="sm:col-span-7">
              <ScaleOnScroll className="media aspect-[4/3] w-full" from={1.12} to={1}>
                <Picture
                  name="lattice-white"
                  alt="Pale architectural screen forming a precise repeating lattice across a building facade"
                  sizes="(min-width:640px) 56vw, 100vw"
                  focal="50% 50%"
                  className="h-full w-full"
                />
              </ScaleOnScroll>
            </ImageReveal>

            <ImageReveal delay={0.12} className="sm:col-span-5 sm:pt-[var(--space-section-md)]">
              <div className="media aspect-[3/4] w-full">
                <Picture
                  name="facade-pale"
                  alt="Slender pale tower rising beside a sheer reflective glass facade"
                  sizes="(min-width:640px) 40vw, 100vw"
                  focal="50% 45%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* International perspective — full-bleed statement */}
      <section
        className="relative w-full overflow-hidden bg-ink text-bone"
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

        <div className="shell-wide relative z-10 flex min-h-[32rem] lg:min-h-[36rem] flex-col justify-end py-[var(--space-section-lg)]">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
            <p className="t-label text-gold">International Perspective</p>
          </Reveal>

          <h2 id="about-international" className="t-h1 mt-7 max-w-[17ch] text-bone">
            <MaskedLines lines={['Relationships and', 'partnerships that', 'span the globe.']} />
          </h2>

          <Reveal delay={0.14}>
            <p className="t-lead mt-8 max-w-[48ch] text-bone/65">
              From our world headquarters in the {contact.headquarters}, we work
              with counterparties whose assumptions were formed elsewhere — and
              read each position on its own terms rather than by regional average.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Corporate advisory positioning */}
      <section className="section bg-bone" aria-labelledby="about-positioning">
        <div className="shell-wide">
          <div className="grid gap-[var(--space-section-sm)] lg:grid-cols-12 lg:items-center">
            <ImageReveal className="lg:col-span-5">
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

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Corporate Advisory</p>
              </Reveal>

              <h2 id="about-positioning" className="t-h2 mt-7 max-w-[16ch] text-ink">
                <MaskedLines lines={['Where the', 'decision cannot', 'be delegated.']} />
              </h2>

              <Reveal delay={0.12}>
                <p className="t-body mt-7 max-w-[48ch] text-ink/65">
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

      {/* Confidential / Unconflicted / Strategic */}
      <AdvisoryPrinciples />

      {/* Dubai / DMCC */}
      <section className="section bg-bone" aria-labelledby="about-dmcc">
        <div className="shell-wide">
          <div className="grid gap-[var(--space-section-sm)] lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Dubai — DMCC</p>
              </Reveal>
              <h2 id="about-dmcc" className="t-h2 mt-7 max-w-[15ch] text-ink">
                <MaskedLines lines={['World', 'headquarters.']} />
              </h2>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.1}>
                <p className="t-body max-w-[48ch] text-ink/65">
                  SOFISAM FZCO is based in the {contact.headquarters}, a free
                  zone in Jumeirah Lake Towers that concentrates internationally
                  oriented businesses within a defined and well-understood
                  framework.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <address className="mt-7 not-italic">
                  <p className="font-display text-[1.15rem] leading-relaxed tracking-tight text-ink">
                    {contact.address.line1}
                    <br />
                    {contact.address.line2}
                  </p>
                </address>
              </Reveal>
            </div>
          </div>

          <ImageReveal className="mt-[var(--space-section-sm)]">
            <ScaleOnScroll className="media aspect-[16/9] w-full lg:aspect-[21/9]" from={1.1} to={1}>
              <Picture
                name="dubai-haze"
                alt="Dubai skyline seen across the water in warm morning haze"
                sizes="100vw"
                focal="50% 55%"
                className="h-full w-full"
              />
            </ScaleOnScroll>
          </ImageReveal>
        </div>
      </section>

      {/* Global visual */}
      <GlobalPerspective />

      {/* Operating principles */}
      <section className="section bg-bone" aria-labelledby="about-principles">
        <div className="shell-wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Working Principles</p>
              </Reveal>
              <h2 id="about-principles" className="t-h2 mt-7 max-w-[16ch] text-ink">
                <MaskedLines lines={['How the firm', 'actually operates.']} />
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body max-w-[40ch] text-ink/55">
                  Six commitments that govern how an engagement is taken on and
                  how it is carried.
                </p>
              </Reveal>
            </div>
          </div>

          <DrawRule className="mt-[var(--space-section-sm)]" />

          <ol className="mt-[var(--content-gap-md)] grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {operatingPrinciples.map((p, i) => (
              <Reveal
                as="li"
                key={p.k}
                delay={i * 0.06}
                className="border-b border-ink/12 py-8"
              >
                <span className="t-index block text-[0.72rem] text-gold">{p.k}</span>
                <h3 className="mt-4 max-w-[20ch] font-display text-[1.3rem] leading-snug tracking-tight text-ink">
                  {p.t}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[0.88rem] font-light leading-relaxed text-ink/55">
                  {p.d}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

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
