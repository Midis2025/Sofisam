import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal, RowReveal } from '@/components/animations/Reveal';
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

/** Six working principles, in order — one grid lays them out. */
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
      {/* 01 — Hero: the shared inner-page hero, so About sits in the same
             family as Services, Insights and the service pages — one grid,
             one container, statement left and the page's own plate right. */}
      <PageHero
        eyebrow="About SOFISAM"
        headline={['A firm built', 'around judgement.']}
        standfirst={welcomeCopy.positioning}
        image="difc-gate"
        imageAlt="Dubai's financial district gate building lit at dusk, framed between surrounding towers"
        focal="50% 45%"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* 02 — The firm in its own words: one composition. The label sits
             directly over the statement on the container edge, the heading,
             statement and left supporting column share that edge, and the
             plate is taken out of the height calculation so it runs the exact
             height of the text beside it. */}
      <section className="rd-section rd-paper" aria-labelledby="about-intro">
        <div className="rd-shell">
          <Reveal kind="label" className="rd-kicker">
            <p className="rd-label">{welcomeCopy.eyebrow}</p>
          </Reveal>

          <div className="mt-[clamp(1.5rem,2.2vw,2rem)] grid items-stretch gap-[clamp(2rem,4vw,4.5rem)] lg:grid-cols-12">
            {/* Statement and supporting columns */}
            <div className="lg:col-span-7">
              <h2 id="about-intro" className="rd-display max-w-[14ch] text-[var(--rd-ink)]">
                <MaskedLines lines={['The firm in', 'its own words']} />
              </h2>

              <Reveal kind="body" delay={0.12}>
                <p className="mt-[clamp(2.25rem,3vw,3rem)] max-w-[24ch] font-display text-[clamp(1.65rem,2.8vw,2.6rem)] leading-[1.12] tracking-tighter text-[var(--rd-ink)]">
                  {welcomeCopy.paragraphs[1]}
                </p>
              </Reveal>

              <div className="mt-[clamp(2.75rem,3.6vw,3.75rem)] grid gap-x-[clamp(2.5rem,4vw,4.5rem)] gap-y-[clamp(1.5rem,2vw,2rem)] sm:grid-cols-2">
                <RowReveal as="div" className="pt-[clamp(1.5rem,1.9vw,1.75rem)]">
                  <p className="rd-lead max-w-[30ch] text-[var(--rd-ink)]">
                    {welcomeCopy.positioning}
                  </p>
                </RowReveal>

                <RowReveal as="div" delay={0.1} className="pt-[clamp(1.5rem,1.9vw,1.75rem)]">
                  <p className="rd-body rd-head-note text-[var(--rd-stone)]">
                    {welcomeCopy.paragraphs[0]}
                  </p>
                  <p className="rd-body mt-5 max-w-[38ch] text-[var(--rd-stone)]">
                    {welcomeCopy.paragraphs[2]}
                  </p>
                </RowReveal>
              </div>
            </div>

            {/* Plate — the full height of the text block beside it */}
            <ImageReveal
              delay={0.1}
              className="lg:col-span-5 lg:relative lg:h-full lg:min-h-[26rem]"
            >
              <div className="rd-media aspect-[4/5] w-full sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
                <Picture
                  name="facade-pale"
                  alt="Slender pale tower rising beside a sheer reflective glass facade"
                  sizes="(min-width:1024px) 40vw, 100vw"
                  focal="62% 40%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 03 — International perspective: image-led, the statement carried on a
             card that overlaps the plate from sm upward. */}
      <section className="rd-section rd-paper-2" aria-labelledby="about-international">
          <div className="relative">
            <ImageReveal>
              <div className="rd-media rd-media-flat aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
                <Picture
                  name="city-mono"
                  alt=""
                  decorative
                  sizes="100vw"
                  focal="50% 45%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>

            <div className="rd-shell sm:absolute sm:inset-x-0 sm:bottom-[clamp(1rem,2.5vw,2.5rem)]">
            <Reveal
              delay={0.12}
              className="mt-[clamp(1rem,2vw,1.5rem)] sm:mt-0 sm:max-w-[34rem]"
            >
              <div className="rd-card p-[clamp(1.25rem,2.2vw,2rem)]">
                <div className="rd-kicker">
                  <p className="rd-label">International Perspective</p>
                </div>

                <h2
                  id="about-international"
                  className="rd-h3 mt-[clamp(0.875rem,1.6vw,1.25rem)] max-w-[18ch] text-[var(--rd-ink)]"
                >
                  Relationships and partnerships that span the globe.
                </h2>

                <p className="rd-small mt-4 max-w-[52ch] text-[var(--rd-stone)]">
                  From our world headquarters in the {contact.headquarters}, we work
                  with counterparties whose assumptions were formed elsewhere — and
                  read each position on its own terms rather than by regional average.
                </p>
              </div>
            </Reveal>
            </div>
          </div>
      </section>

      {/* 04 — Corporate advisory: the page's dark passage. Statement and
             plate share one row, the plate out of the height calculation so
             the two start and finish together. */}
      <section className="rd-section rd-dark rd-on-dark" aria-labelledby="about-positioning">
        <div className="rd-shell">
          <div className="grid items-stretch gap-[clamp(2rem,6vw,6.25rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(26.25rem,0.92fr)]">
            <div className="flex flex-col justify-center">
              <Reveal kind="label" className="rd-kicker">
                <p className="rd-label">Corporate Advisory</p>
              </Reveal>

              <h2
                id="about-positioning"
                className="rd-display mt-[clamp(1.5rem,2.2vw,2rem)] max-w-[47.5rem] text-bone"
              >
                <MaskedLines lines={['Where the', 'decision cannot', 'be delegated.']} />
              </h2>

              <Reveal kind="body" delay={0.12}>
                <p className="rd-body mt-[clamp(2rem,2.8vw,2.75rem)] max-w-[54ch] text-bone/75">
                  The matters we are brought into tend to sit above the level at
                  which an organisation can resolve them internally: what a
                  leadership team should do next, how a board should hold a
                  position, whether a structure is carrying more weight than it
                  was designed for.
                </p>
              </Reveal>

              <Reveal kind="body" delay={0.18}>
                <p className="rd-body mt-5 max-w-[54ch] text-[var(--rd-sage)]">
                  Our principals are highly successful business executives and
                  investors that bring unique perspectives to all of our mandates
                  and investments. That is the vantage point the advice is given
                  from.
                </p>
              </Reveal>
            </div>

            <ImageReveal delay={0.1} className="lg:relative lg:h-full lg:min-h-[32.5rem] lg:max-h-[43.75rem]">
              <div className="rd-media aspect-[4/3] w-full sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
                <Picture
                  name="lounge-dark"
                  alt="Darkened executive lounge with slatted screens and low, considered lighting"
                  sizes="(min-width:1024px) 44vw, 100vw"
                  focal="50% 50%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 05 — Confidential / Unconflicted / Strategic / International / Experienced */}
      <AdvisoryPrinciples />

      {/* 06 — Working principles: one grid, two columns, three aligned rows.
             Every item shares the same internal structure so the numbers,
             titles, descriptions and rules all line up, and the six enter in
             order. The DOM order is 01–06, so a phone stacks them correctly. */}
      <section className="rd-section rd-paper" aria-labelledby="about-principles">
        <div className="rd-shell">
          <div className="rd-head">
            <div>
              <Reveal kind="label" className="rd-kicker">
                <p className="rd-label">Working Principles</p>
              </Reveal>

              <h2
                id="about-principles"
                className="rd-display mt-[clamp(1.75rem,2.4vw,2.25rem)] max-w-[14ch] text-[var(--rd-ink)]"
              >
                <MaskedLines lines={['How the firm', 'actually operates.']} />
              </h2>
            </div>

            <Reveal kind="body" delay={0.1} className="lg:pb-2">
              <p className="rd-body rd-head-note text-[var(--rd-stone)]">
                Six commitments that govern how an engagement is taken on and
                how it is carried.
              </p>
            </Reveal>
          </div>

          <ol className="mt-[clamp(3.5rem,4.5vw,4.5rem)] grid grid-cols-1 gap-x-[clamp(3.5rem,6vw,6.875rem)] md:grid-cols-2">
            {operatingPrinciples.map((p, i) => (
              <RowReveal
                key={p.k}
                delay={i * 0.08}
                className="group pb-[clamp(2rem,2.6vw,2.5rem)] pt-[clamp(1.75rem,2.4vw,2.125rem)]"
              >
                <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 sm:gap-x-4">
                  <span className="rd-num pt-[0.3rem] text-[0.85rem] text-[var(--rd-accent-ink)]">
                    {p.k}
                  </span>

                  <div>
                    <h3 className="font-display text-[clamp(1.25rem,1.45vw,1.6rem)] leading-[1.15] tracking-tight text-[var(--rd-ink)] transition-transform duration-500 ease-premium group-hover:translate-x-1">
                      {p.t}
                    </h3>
                    <p className="mt-3 max-w-[46ch] text-[0.9375rem] font-light leading-[1.55] text-[var(--rd-stone)]">
                      {p.d}
                    </p>
                  </div>
                </div>
              </RowReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 07 — World headquarters: a cinematic plate against structured detail. */}
      <section className="rd-section rd-paper-2" aria-labelledby="about-dmcc">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.8fr)] lg:items-center lg:gap-[clamp(2rem,4vw,4.5rem)]">
            <ImageReveal>
              <div className="rd-media aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[5/4]">
                <Picture
                  name="dubai-haze"
                  alt="Dubai skyline seen across the water in warm morning haze"
                  sizes="(min-width:1024px) 58vw, 100vw"
                  focal="50% 55%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>

            <div>
              <Reveal kind="label" className="rd-kicker">
                <p className="rd-label">Dubai — DMCC</p>
              </Reveal>

              <h2
                id="about-dmcc"
                className="rd-h2 mt-[clamp(1rem,2vw,1.5rem)] max-w-[12ch] text-[var(--rd-ink)]"
              >
                <MaskedLines lines={['World', 'headquarters.']} />
              </h2>

              <Reveal kind="body" delay={0.12}>
                <p className="rd-body mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[44ch] text-[var(--rd-stone)]">
                  SOFISAM FZCO is based in the {contact.headquarters}, a free
                  zone in Jumeirah Lake Towers that concentrates internationally
                  oriented businesses within a defined and well-understood
                  framework.
                </p>
              </Reveal>

              <RowReveal as="div" delay={0.16} className="mt-[clamp(1.75rem,3vw,2.5rem)] pt-5">
                <p className="rd-label text-[var(--rd-stone)]">Address</p>
                <address className="mt-3 not-italic">
                  <p className="rd-h4 leading-relaxed text-[var(--rd-ink)]">
                    {contact.address.line1}
                    <br />
                    {contact.address.line2}
                  </p>
                </address>
              </RowReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — Global perspective, opened out rather than panelled */}
      <GlobalPerspective variant="editorial" />

      {/* 09 — Enquiries */}
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
