import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, DrawRule, ImageReveal } from '@/components/animations/Reveal';
import { Parallax, ScaleOnScroll } from '@/components/animations/Parallax';
import { ServicePager } from '@/components/sections/ServicePager';
import { CTASection } from '@/components/sections/CTASection';
import { serviceBySlug } from '@/data/services';

const service = serviceBySlug('structuring')!;

export const metadata: Metadata = {
  title: 'Structuring',
  description: service.metaDescription,
  alternates: { canonical: '/services/structuring' },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: '/services/structuring',
  },
};

/** Design tests we apply to a structure — a ledger, not a service list. */
const tests = [
  {
    n: '01',
    t: 'Can every party describe it?',
    d: 'If the description varies between the people bound by it, the structure is carrying an unrecognised liability.',
  },
  {
    n: '02',
    t: 'What happens at the edges?',
    d: 'Base cases are easy. A structure is tested by death, incapacity, deadlock, exit and the arrival of a party nobody anticipated.',
  },
  {
    n: '03',
    t: 'Where is the deadlock resolved?',
    d: 'An arrangement that only functions while everyone agrees is not a structure. It is an arrangement waiting for a disagreement.',
  },
  {
    n: '04',
    t: 'Does form still match intent?',
    d: 'Structures outlive the reasons they were built. Reviewing that fit on a schedule is unglamorous and consequential.',
  },
  {
    n: '05',
    t: 'Is complexity doing work?',
    d: 'Complexity is sometimes unavoidable. Opacity almost never is. Where the two are confused, the cost falls to whoever inherits it.',
  },
];

/** The decisions a framework settles, before any instrument is chosen. */
const layers = [
  { t: 'Authority', d: 'Who may commit, and up to what size.' },
  { t: 'Oversight', d: 'What is seen, by whom, and how often.' },
  { t: 'Economics', d: 'How returns and costs are actually shared.' },
  { t: 'Exit', d: 'What happens when a party needs to leave.' },
];

export default function StructuringPage() {
  return (
    <>
      <PageHero
        eyebrow={service.hero.eyebrow}
        headline={['Form determines', 'what a structure', 'can withstand.']}
        standfirst={service.hero.standfirst}
        image={service.hero.image}
        imageAlt={service.hero.imageAlt}
        focal={service.hero.focal}
        size="tall"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      {/* Introduction — narrow measure over a wide rule grid */}
      <section className="section relative overflow-hidden bg-bone" aria-labelledby="st-intro">
        <div className="shell-wide">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Introduction</p>
              </Reveal>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <h2 id="st-intro" className="sr-only">
                Introduction to Structuring
              </h2>
              <Reveal>
                <p className="max-w-[26ch] font-display text-[clamp(1.85rem,4.4vw,3.4rem)] leading-[1.08] tracking-tighter text-ink">
                  {service.intro.lead}
                </p>
              </Reveal>

              <div className="mt-9 space-y-6">
                {service.intro.body.map((p, i) => (
                  <Reveal key={p} delay={0.08 * (i + 1)}>
                    <p className="t-body max-w-[54ch] text-ink/60">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework thinking — editorial, image-led. The layers are set as
          typography against architecture rather than drawn as a diagram. */}
      <section
        className="relative overflow-hidden bg-ink text-bone"
        aria-labelledby="st-framework"
      >
        <div className="shell-wide section">
          <div className="grid gap-[var(--content-gap-lg)] lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 shrink-0 bg-gold sm:w-16" />
                <p className="t-label text-gold">Framework Thinking</p>
              </Reveal>
              <h2 id="st-framework" className="t-h2 mt-[var(--content-gap-md)] max-w-[15ch] text-bone">
                <MaskedLines lines={['Intent before', 'instrument.']} />
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body measure-sm text-bone/60">
                  We begin with what an arrangement is meant to achieve and for
                  whom, and only then consider the form it should take. The
                  reverse order produces structures that outlive their purpose.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-[var(--content-gap-lg)] grid gap-[var(--content-gap-lg)] lg:grid-cols-12">
            {/* Architecture carries the idea of load and order */}
            <ImageReveal className="lg:col-span-5">
              <ScaleOnScroll className="media aspect-[4/5] w-full" from={1.1} to={1}>
                <Picture
                  name="structure-grid"
                  alt="Dark modular facade of precisely repeating panels, read as a structural grid"
                  sizes="(min-width:1024px) 40vw, 100vw"
                  focal="50% 50%"
                  className="h-full w-full"
                />
              </ScaleOnScroll>
            </ImageReveal>

            {/* The layers, set as an editorial ledger */}
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
              <Reveal>
                <p className="t-label text-bone/60">The order of decisions</p>
                <p className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] tracking-tighter text-gold">
                  Intent
                </p>
                <p className="t-body measure-sm mt-4 text-bone/70">
                  Everything below resolves from it. Settle the intent and the
                  instruments follow; reverse the order and the structure ends
                  up explaining itself rather than working.
                </p>
              </Reveal>

              <ol className="mt-[var(--content-gap-lg)] border-t border-bone/15">
                {layers.map((l, i) => (
                  <Reveal
                    as="li"
                    key={l.t}
                    delay={i * 0.06}
                    className="flex items-baseline gap-6 border-b border-bone/15 py-5"
                  >
                    <span className="t-index w-8 shrink-0 text-[0.95rem] text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-tight tracking-tight text-bone">
                      {l.t}
                    </span>
                    <span className="hidden max-w-[24ch] text-[0.85rem] font-light leading-relaxed text-bone/65 sm:block">
                      {l.d}
                    </span>
                  </Reveal>
                ))}
              </ol>

              <Reveal delay={0.2}>
                <p className="measure-sm mt-6 text-[0.8rem] font-light leading-relaxed text-bone/55">
                  Illustrative. These are the decisions a well-formed framework
                  settles in advance, not a description of any specific
                  arrangement.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Design tests — precise ledger */}
      <section className="section bg-bone" aria-labelledby="st-tests">
        <div className="shell-wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Structuring Approach</p>
              </Reveal>
              <h2 id="st-tests" className="t-h2 mt-7 max-w-[16ch] text-ink">
                <MaskedLines lines={['Five tests a', 'structure has', 'to survive.']} />
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body max-w-[38ch] text-ink/55">
                  Applied to mandates and investments alike, and revisited when
                  circumstances move away from the base case.
                </p>
              </Reveal>
            </div>
          </div>

          <DrawRule className="mt-[var(--space-section-sm)]" />

          <ol className="mt-2">
            {tests.map((t, i) => (
              <Reveal
                as="li"
                key={t.n}
                delay={i * 0.05}
                className="grid gap-3 border-b border-ink/12 py-8 md:grid-cols-12 md:gap-8 md:py-9"
              >
                <span className="t-index text-[clamp(1.4rem,2.4vw,2rem)] text-gold md:col-span-1">
                  {t.n}
                </span>
                <h3 className="max-w-[24ch] font-display text-[clamp(1.35rem,2.4vw,1.95rem)] leading-tight tracking-tight text-ink md:col-span-6">
                  {t.t}
                </h3>
                <p className="max-w-[44ch] text-[0.92rem] font-light leading-relaxed text-ink/55 md:col-span-5">
                  {t.d}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Mandates and investments — image pair */}
      <section className="section bg-bone pt-0" aria-labelledby="st-mandates">
        <div className="shell-wide">
          <div className="grid gap-[var(--content-gap-lg)] lg:grid-cols-12 lg:gap-12">
            <ImageReveal className="lg:col-span-7">
              <ScaleOnScroll className="media aspect-[16/11] w-full" from={1.1} to={1}>
                <Picture
                  name="spiral-dark"
                  alt="Dark spiral stair seen from below, forming a precise geometric spiral"
                  sizes="(min-width:1024px) 56vw, 100vw"
                  focal="50% 50%"
                  className="h-full w-full"
                />
              </ScaleOnScroll>
            </ImageReveal>

            <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Mandates &amp; Investments</p>
              </Reveal>

              <h2 id="st-mandates" className="t-h3 mt-6 max-w-[20ch] text-ink">
                Terms that stay legible when conditions move.
              </h2>

              <Reveal delay={0.12}>
                <p className="t-body mt-5 max-w-[42ch] text-ink/60">
                  {service.themes[1].body}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="t-body mt-5 max-w-[42ch] text-ink/60">
                  {service.themes[2].body}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed precision */}
      <section
        className="relative w-full overflow-hidden bg-ink text-bone"
        aria-labelledby="st-precision"
      >
        <Parallax strength={9} className="absolute inset-0">
          <div className="media veil-editorial h-full w-full">
            <Picture
              name="gold-lattice"
              alt=""
              decorative
              sizes="100vw"
              focal="50% 68%"
              className="h-full w-full"
            />
          </div>
        </Parallax>

        <div className="shell-wide relative z-10 flex min-h-[29rem] lg:min-h-[33rem] flex-col justify-end py-[var(--space-section-lg)]">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
            <p className="t-label text-gold">Proven Frameworks</p>
          </Reveal>
          <h2 id="st-precision" className="t-h1 mt-7 max-w-[16ch] text-bone">
            <MaskedLines lines={['Novelty is rarely', 'a virtue in a', 'structure.']} />
          </h2>
          <Reveal delay={0.14}>
            <p className="t-lead mt-8 max-w-[46ch] text-bone/65">
              Established frameworks carry the weight of everything that has
              already been tested against them. We fit them to the situation
              rather than fitting the situation to them.
            </p>
          </Reveal>
        </div>
      </section>

      <ServicePager current="structuring" />

      <CTASection
        eyebrow="Structuring"
        lines={['Design it', 'to hold.']}
        body="Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence."
        image="structure-grid"
        focal="50% 50%"
      />
    </>
  );
}
