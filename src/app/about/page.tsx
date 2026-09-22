import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Parallax } from '@/components/animations/Parallax';
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
      {/* 01 — The cinematic opening, shared with every other inner page. */}
      <PageHero
        eyebrow="About SOFISAM"
        headline={['A firm built', 'around judgement.']}
        standfirst={welcomeCopy.positioning}
        image="difc-gate"
        imageAlt="Dubai's financial district gate building lit at dusk, framed between surrounding towers"
        focal="50% 45%"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* 02 — The firm in its own words. The statement holds the container
             edge, its supporting columns sit beneath it on one rule, and the
             plate runs the full height of the text beside it. */}
      <section data-section="Welcome" className="section ground-char" aria-labelledby="about-intro">
        <div className="shell">
          <Reveal kind="label" className="kicker">
            <p className="t-label">{welcomeCopy.eyebrow}</p>
          </Reveal>

          <div className="mt-[clamp(1.5rem,2.2vw,2rem)] grid items-stretch gap-[clamp(2rem,4vw,4.5rem)] lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 id="about-intro" className="t-display max-w-[14ch] text-ivory">
                <MaskedLines lines={['The firm in', 'its own words']} />
              </h2>

              <Reveal kind="body" delay={0.12}>
                <p className="mt-[clamp(2.25rem,3vw,3rem)] max-w-[24ch] font-display text-[clamp(1.65rem,2.8vw,2.6rem)] leading-[1.12] tracking-tighter text-ivory">
                  {welcomeCopy.paragraphs[1]}
                </p>
              </Reveal>

              <div className="mt-[clamp(2.75rem,3.6vw,3.75rem)] grid gap-x-[clamp(2.5rem,4vw,4.5rem)] gap-y-[clamp(1.5rem,2vw,2rem)] sm:grid-cols-2">
                <RowReveal as="div" className="pt-[clamp(1.5rem,1.9vw,1.75rem)]">
                  <p className="t-lead max-w-[30ch] text-ivory">{welcomeCopy.positioning}</p>
                </RowReveal>

                <RowReveal as="div" delay={0.1} className="pt-[clamp(1.5rem,1.9vw,1.75rem)]">
                  <p className="t-body head-note text-sage">{welcomeCopy.paragraphs[0]}</p>
                  <p className="t-body mt-5 max-w-[38ch] text-sage">
                    {welcomeCopy.paragraphs[2]}
                  </p>
                </RowReveal>
              </div>
            </div>

            <ImageReveal delay={0.1} className="lg:relative lg:col-span-5 lg:h-full lg:min-h-[26rem]">
              <div className="media aspect-[4/5] w-full sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
                <Picture
                  name="facade-pale"
                  alt="Close view of a pale building facade, its windows set deep into the wall"
                  sizes="(min-width:1024px) 40vw, 100vw"
                  focal="62% 40%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 03 — International perspective: a full-bleed passage with the
             statement set over the lower half of the frame. */}
      <section
        data-section="International Perspective"
        className="band veil-bottom grain relative w-full overflow-hidden bg-void"
        aria-labelledby="about-international"
      >
        <Parallax className="absolute inset-0" strength={8}>
          <Picture
            name="city-mono"
            alt=""
            decorative
            sizes="100vw"
            focal="50% 45%"
            className="h-full w-full object-cover"
          />
        </Parallax>

        <div className="shell relative z-10 flex min-h-[clamp(26rem,64vh,38rem)] flex-col justify-end py-[clamp(3rem,6vw,5.5rem)]">
          <div className="max-w-[44rem]">
            <Reveal kind="label" className="kicker">
              <p className="t-label text-gold">International Perspective</p>
            </Reveal>

            <h2
              id="about-international"
              className="t-h2 mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[18ch] text-ivory"
            >
              <MaskedLines lines={['Relationships and', 'partnerships that', 'span the globe.']} />
            </h2>

            <Reveal delay={0.12}>
              <p className="t-body mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[56ch] text-ivory/75">
                From our world headquarters in the {contact.headquarters}, we work with
                counterparties whose assumptions were formed elsewhere — and read each
                position on its own terms rather than by regional average.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 — Corporate advisory: the page's dark passage. The statement and
             its plate share one row, the plate out of the height calculation
             so the two start and finish together. */}
      <section data-section="Corporate Advisory" className="section ground-void" aria-labelledby="about-positioning">
        <div className="shell">
          <div className="grid items-stretch gap-[clamp(2rem,6vw,6.25rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)]">
            <div className="flex flex-col justify-center">
              <Reveal kind="label" className="kicker">
                <p className="t-label">Corporate Advisory</p>
              </Reveal>

              <h2
                id="about-positioning"
                className="t-display mt-[clamp(1.5rem,2.2vw,2rem)] max-w-[47.5rem] text-ivory"
              >
                <MaskedLines lines={['Where the', 'decision cannot', 'be delegated.']} />
              </h2>

              <Reveal kind="body" delay={0.12}>
                <p className="t-body mt-[clamp(2rem,2.8vw,2.75rem)] max-w-[54ch] text-ivory/75">
                  The matters we are brought into tend to sit above the level at which
                  an organisation can resolve them internally: what a leadership team
                  should do next, how a board should hold a position, whether a
                  structure is carrying more weight than it was designed for.
                </p>
              </Reveal>

              <Reveal kind="body" delay={0.18}>
                <p className="t-body mt-5 max-w-[54ch] text-sage">
                  Our principals are highly successful business executives and investors
                  that bring unique perspectives to all of our mandates and investments.
                  That is the vantage point the advice is given from.
                </p>
              </Reveal>
            </div>

            <ImageReveal delay={0.1} className="lg:relative lg:h-full lg:min-h-[32.5rem] lg:max-h-[43.75rem]">
              <div className="media aspect-[4/3] w-full sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
                <Picture
                  name="lounge-dark"
                  alt="A spacious meeting room with a long table, columns and a wide city view"
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
      <section data-section="Working Principles" className="section ground-char" aria-labelledby="about-principles">
        <div className="shell">
          <div className="head">
            <div>
              <Reveal kind="label" className="kicker">
                <p className="t-label">Working Principles</p>
              </Reveal>

              <h2
                id="about-principles"
                className="t-display head-title mt-[clamp(1.75rem,2.4vw,2.25rem)] max-w-[14ch] text-ivory"
              >
                <MaskedLines lines={['How the firm', 'actually operates.']} />
              </h2>
            </div>

            <Reveal kind="body" delay={0.1} className="lg:pb-2">
              <p className="t-body head-note text-sage">
                Six commitments that govern how an engagement is taken on and how it is
                carried.
              </p>
            </Reveal>
          </div>

          <ol className="mt-[var(--pad-sm)] grid grid-cols-1 gap-x-[clamp(3.5rem,6vw,6.875rem)] md:grid-cols-2">
            {operatingPrinciples.map((p, i) => (
              <RowReveal
                key={p.k}
                delay={i * 0.08}
                className="group pb-[clamp(2rem,2.6vw,2.5rem)] pt-[clamp(1.75rem,2.4vw,2.125rem)]"
              >
                <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 sm:gap-x-4">
                  <span className="t-num pt-[0.3rem] text-[0.85rem] text-gold">{p.k}</span>

                  <div>
                    <h3 className="font-display text-[clamp(1.3rem,1.5vw,1.7rem)] leading-[1.14] tracking-tight text-ivory transition-transform duration-500 ease-premium group-hover:translate-x-1">
                      {p.t}
                    </h3>
                    <p className="t-small mt-3 max-w-[46ch] text-sage">{p.d}</p>
                  </div>
                </div>
              </RowReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 07 — World headquarters: a cinematic plate against structured detail. */}
      <section data-section="Dubai — DMCC" className="section ground-graphite" aria-labelledby="about-dmcc">
        <div className="shell">
          <div className="grid gap-[var(--gap)] lg:grid-cols-[minmax(0,1.25fr)_minmax(19rem,0.8fr)] lg:items-center lg:gap-[clamp(2rem,4vw,4.5rem)]">
            <ImageReveal>
              <div className="media aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[5/4]">
                <Picture
                  name="dubai-haze"
                  alt="The Dubai skyline at golden hour, its towers standing in warm haze"
                  sizes="(min-width:1024px) 58vw, 100vw"
                  focal="50% 55%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>

            <div>
              <Reveal kind="label" className="kicker">
                <p className="t-label">Dubai — DMCC</p>
              </Reveal>

              <h2 id="about-dmcc" className="t-h2 mt-[clamp(1rem,2vw,1.5rem)] max-w-[12ch] text-ivory">
                <MaskedLines lines={['World', 'headquarters.']} />
              </h2>

              <Reveal kind="body" delay={0.12}>
                <p className="t-body mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[44ch] text-sage">
                  SOFISAM FZCO is based in the {contact.headquarters}, a free zone in
                  Jumeirah Lake Towers that concentrates internationally oriented
                  businesses within a defined and well-understood framework.
                </p>
              </Reveal>

              <RowReveal as="div" delay={0.16} className="mt-[clamp(1.75rem,3vw,2.5rem)] pt-5">
                <p className="t-label text-sage">Address</p>
                <address className="mt-3 not-italic">
                  <p className="t-h4 leading-relaxed text-ivory">
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

      {/* 08 — Global perspective, opened out rather than banded */}
      <GlobalPerspective variant="editorial" />

      {/* 09 — Enquiries */}
      <CTASection
        eyebrow="Enquiries"
        lines={['Speak with', 'the firm.']}
        body="Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence."
      />
    </>
  );
}
