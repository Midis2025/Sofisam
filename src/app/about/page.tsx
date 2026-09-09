import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

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

/**
 * Six working principles. `wide` drives the staggered grid: a large block and a
 * compact one alternate so the sequence never settles into six equal cards.
 */
const operatingPrinciples = [
  {
    k: '01',
    t: 'Independence is structural',
    d: 'We hold no product to place and no side to favour. That is a condition of how the firm is set up, not an intention it announces.',
    wide: true,
  },
  {
    k: '02',
    t: 'Discretion is the default',
    d: 'Engagements are handled in a closed circle and remain there. Confidentiality is a working condition rather than a clause.',
    wide: false,
  },
  {
    k: '03',
    t: 'Judgement over volume',
    d: 'A small number of matters, taken seriously, by the principals who accepted them.',
    wide: false,
  },
  {
    k: '04',
    t: 'A plain recommendation',
    d: 'Where we have a view, we give it — with the reasoning attached and the downside stated.',
    wide: true,
  },
  {
    k: '05',
    t: 'Read each market on its terms',
    d: 'Conditions rarely travel between jurisdictions. Neither should the assumptions built on them.',
    wide: true,
  },
  {
    k: '06',
    t: 'Availability after the decision',
    d: 'The difficult questions rarely arrive on the day a decision is taken.',
    wide: false,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 01 — Hero: one architectural field with the statement held at its
             foot. The ground stays dark because the fixed header sits over it
             before any scroll, and its wordmark is the light one. */}
      <section className="relative w-full overflow-hidden bg-ink" aria-labelledby="about-hero">
        <div className="media veil-bottom absolute inset-0">
          <Picture
            name="difc-gate"
            alt="Dubai's financial district gate building lit at dusk, framed between surrounding towers"
            sizes="100vw"
            priority
            focal="50% 45%"
            className="h-full w-full"
          />
        </div>

        <div className="rd-shell below-header relative z-10 flex flex-col justify-end pb-[clamp(2.5rem,5vw,4.5rem)] lg:min-h-[clamp(32.5rem,68vh,47.5rem)]">
          <nav aria-label="Breadcrumb" className="mb-auto pb-[clamp(2rem,6vw,5rem)]">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] uppercase tracking-[0.16em] text-bone/45">
              <li className="flex items-center gap-2">
                <Link href="/" className="link-underline inline-block py-2 hover:text-bone">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight aria-hidden strokeWidth={1.4} className="h-3 w-3 text-bone/25" />
                <span aria-current="page" className="inline-block py-2 text-bone/75">
                  About
                </span>
              </li>
            </ol>
          </nav>

          <Reveal kind="label" className="rd-kicker">
            <p className="rd-label">About SOFISAM</p>
          </Reveal>

          <h1
            id="about-hero"
            className="rd-display mt-[clamp(1rem,2vw,1.75rem)] max-w-[16ch] text-bone"
          >
            <MaskedLines lines={['A firm built', 'around judgement.']} />
          </h1>

          <Reveal kind="body" delay={0.2}>
            <p className="rd-lead mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[44ch] text-bone/70">
              {welcomeCopy.positioning}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02 — The firm in its own words: typography-led. A narrow label rail, a
             main statement column, one tall plate held off to the side. */}
      <section className="rd-section rd-paper" aria-labelledby="about-intro">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-x-[clamp(2rem,3.5vw,4rem)]">
            {/* Label rail */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-[8rem]">
                <Reveal kind="label" className="rd-kicker">
                  <p className="rd-label">{welcomeCopy.eyebrow}</p>
                </Reveal>
              </div>
            </div>

            {/* Statement */}
            <div className="lg:col-span-6">
              <h2 id="about-intro" className="rd-display max-w-[16ch] text-[var(--rd-ink)]">
                <MaskedLines lines={['The firm in', 'its own words']} />
              </h2>

              <Reveal kind="body" delay={0.12}>
                <p className="mt-[clamp(2rem,3.5vw,3rem)] max-w-[26ch] font-display text-[clamp(1.65rem,3vw,2.75rem)] leading-[1.12] tracking-tighter text-[var(--rd-ink)]">
                  {welcomeCopy.paragraphs[1]}
                </p>
              </Reveal>

              <div className="mt-[clamp(2rem,3.5vw,3rem)] grid gap-[clamp(1.5rem,3vw,3rem)] sm:grid-cols-2">
                <RowReveal as="div" className="pt-[clamp(1rem,1.6vw,1.5rem)]">
                  <p className="rd-lead max-w-[34ch] text-[var(--rd-ink)]">
                    {welcomeCopy.positioning}
                  </p>
                </RowReveal>

                <RowReveal as="div" delay={0.1} className="pt-[clamp(1rem,1.6vw,1.5rem)]">
                  <p className="rd-body max-w-[38ch] text-[var(--rd-stone)]">
                    {welcomeCopy.paragraphs[0]}
                  </p>
                  <p className="rd-body mt-5 max-w-[38ch] text-[var(--rd-stone)]">
                    {welcomeCopy.paragraphs[2]}
                  </p>
                </RowReveal>
              </div>
            </div>

            {/* Tall plate, dropped below the statement's first line */}
            <ImageReveal delay={0.1} className="lg:col-span-3 lg:pt-[clamp(3rem,7vw,7rem)]">
              <div className="rd-media aspect-[4/5] w-full lg:aspect-[3/5]">
                <Picture
                  name="facade-pale"
                  alt="Slender pale tower rising beside a sheer reflective glass facade"
                  sizes="(min-width:1024px) 24vw, 100vw"
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
        <div className="rd-shell">
          <div className="relative">
            <ImageReveal>
              <div className="rd-media aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
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

            <Reveal
              delay={0.12}
              className="mt-[clamp(1rem,2vw,1.5rem)] sm:absolute sm:bottom-[clamp(1rem,2.5vw,2.5rem)] sm:left-[clamp(1rem,2.5vw,2.5rem)] sm:mt-0 sm:max-w-[34rem]"
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

      {/* 04 — Corporate advisory: the page's dark passage. */}
      <section className="rd-section rd-dark rd-on-dark" aria-labelledby="about-positioning">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-center lg:gap-x-[clamp(2.5rem,4.5vw,5rem)]">
            <div className="lg:col-span-7">
              <Reveal kind="label" className="rd-kicker">
                <p className="rd-label">Corporate Advisory</p>
              </Reveal>

              <h2
                id="about-positioning"
                className="rd-display mt-[clamp(1rem,2vw,1.75rem)] max-w-[14ch] text-bone"
              >
                <MaskedLines lines={['Where the', 'decision cannot', 'be delegated.']} />
              </h2>

              <Reveal kind="body" delay={0.12}>
                <p className="rd-body mt-[clamp(1.5rem,2.6vw,2.25rem)] max-w-[54ch] text-bone/75">
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

            <ImageReveal delay={0.1} className="lg:col-span-5">
              <div className="rd-media aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/5]">
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
      </section>

      {/* 05 — Confidential / Unconflicted / Strategic / International / Experienced */}
      <AdvisoryPrinciples />

      {/* 06 — Working principles: a staggered sequence, large and compact
             blocks alternating, each entering after the one before it. */}
      <section className="rd-section rd-paper" aria-labelledby="about-principles">
        <div className="rd-shell">
          <div className="grid gap-[clamp(1.25rem,3vw,4rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.8fr)] lg:items-end">
            <div>
              <Reveal kind="label" className="rd-kicker">
                <p className="rd-label">Working Principles</p>
              </Reveal>

              <h2
                id="about-principles"
                className="rd-h2 mt-[clamp(1rem,2vw,1.75rem)] max-w-[13ch] text-[var(--rd-ink)]"
              >
                <MaskedLines lines={['How the firm', 'actually operates.']} />
              </h2>
            </div>

            <Reveal kind="body" delay={0.1} className="lg:pb-2">
              <p className="rd-body max-w-[34ch] text-[var(--rd-stone)]">
                Six commitments that govern how an engagement is taken on and
                how it is carried.
              </p>
            </Reveal>
          </div>

          <ol className="mt-[var(--rd-pad-sm)] grid gap-x-[clamp(1.5rem,3vw,3.5rem)] sm:grid-cols-2 lg:grid-cols-5">
            {operatingPrinciples.map((p, i) => (
              <RowReveal
                key={p.k}
                delay={i * 0.09}
                className={`group py-[clamp(1.25rem,2.2vw,2rem)] ${
                  p.wide ? 'lg:col-span-3' : 'lg:col-span-2'
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="rd-num text-[0.85rem] text-[var(--rd-accent-ink)]">{p.k}</span>
                  <h3 className="rd-h4 max-w-[26ch] text-[var(--rd-ink)] transition-transform duration-500 ease-premium group-hover:translate-x-1">
                    {p.t}
                  </h3>
                </div>
                <p className="rd-small mt-3 max-w-[46ch] pl-[2.4rem] text-[var(--rd-stone)]">
                  {p.d}
                </p>
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
