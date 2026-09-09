import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
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

      {/* Introduction */}
      <section className="rd-section rd-paper" aria-labelledby="st-intro">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Reveal className="rd-kicker">
                <p className="rd-label">Introduction</p>
              </Reveal>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <h2 id="st-intro" className="sr-only">
                Introduction to Structuring
              </h2>
              <Reveal>
                <p className="rd-display max-w-[24ch] text-[var(--rd-ink)]">
                  {service.intro.lead}
                </p>
              </Reveal>

              <div className="mt-[clamp(2rem,3.4vw,3rem)] space-y-6">
                {service.intro.body.map((p, i) => (
                  <Reveal key={p} delay={0.08 * (i + 1)}>
                    <p className="rd-body max-w-[54ch] text-[var(--rd-stone)]">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework thinking — architecture beside an editorial ledger */}
      <section className="rd-section rd-dark" aria-labelledby="st-framework">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal className="rd-kicker">
                <p className="rd-label">Framework Thinking</p>
              </Reveal>
              <h2
                id="st-framework"
                className="rd-h2 mt-[clamp(1.25rem,2.6vw,2rem)] max-w-[15ch] text-bone"
              >
                <MaskedLines lines={['Intent before', 'instrument.']} />
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="rd-body max-w-[44ch] text-[var(--rd-sage)]">
                  We begin with what an arrangement is meant to achieve and for
                  whom, and only then consider the form it should take. The
                  reverse order produces structures that outlive their purpose.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-[var(--rd-pad-sm)] grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            <ImageReveal className="lg:col-span-5">
              <div className="rd-media aspect-[4/5] w-full">
                <Picture
                  name="structure-grid"
                  alt="Dark modular facade of precisely repeating panels, read as a structural grid"
                  sizes="(min-width:1024px) 42vw, 100vw"
                  focal="50% 50%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="rd-label text-[var(--rd-sage)]">The order of decisions</p>
                <p className="rd-display mt-5 text-[var(--rd-accent)]">Intent</p>
                <p className="rd-body mt-4 max-w-[44ch] text-[var(--rd-sage)]">
                  Everything below resolves from it. Settle the intent and the
                  instruments follow; reverse the order and the structure ends
                  up explaining itself rather than working.
                </p>
              </Reveal>

              <ol className="mt-[clamp(2rem,3.4vw,3rem)]">
                {layers.map((l, i) => (
                  <Reveal
                    as="li"
                    key={l.t}
                    delay={i * 0.06}
                    className="rd-row-inv last:border-b last:border-[var(--rd-line-inv)]"
                  >
                    <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 py-[clamp(1.1rem,1.8vw,1.5rem)] sm:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1fr)] sm:gap-x-6">
                      <span className="rd-num text-[0.85rem] text-[var(--rd-accent)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="rd-h4 text-bone">{l.t}</span>
                      <span className="rd-small col-start-2 mt-2 max-w-[26ch] text-[var(--rd-sage)] sm:col-start-3 sm:mt-0">
                        {l.d}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ol>

              <Reveal delay={0.2}>
                <p className="rd-meta mt-6 max-w-[46ch] text-bone/40">
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
      <section className="rd-section rd-paper" aria-labelledby="st-tests">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal className="rd-kicker">
                <p className="rd-label">Structuring Approach</p>
              </Reveal>
              <h2
                id="st-tests"
                className="rd-h2 mt-[clamp(1.25rem,2.6vw,2rem)] max-w-[16ch] text-[var(--rd-ink)]"
              >
                <MaskedLines lines={['Five tests a', 'structure has', 'to survive.']} />
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
              <Reveal delay={0.1}>
                <p className="rd-body max-w-[38ch] text-[var(--rd-stone)]">
                  Applied to mandates and investments alike, and revisited when
                  circumstances move away from the base case.
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="mt-[var(--rd-pad-sm)]">
            {tests.map((t, i) => (
              <Reveal
                as="li"
                key={t.n}
                delay={i * 0.05}
                className="rd-row rd-row-hover last:border-b last:border-[var(--rd-line)]"
              >
                <div className="grid gap-x-8 gap-y-3 px-1 py-[clamp(1.75rem,3vw,2.4rem)] md:grid-cols-12">
                  <span className="rd-num text-[clamp(1.1rem,2vw,1.6rem)] text-[var(--rd-accent-ink)] md:col-span-1">
                    {t.n}
                  </span>
                  <h3 className="rd-h3 max-w-[24ch] text-[var(--rd-ink)] md:col-span-6">{t.t}</h3>
                  <p className="rd-small max-w-[44ch] text-[var(--rd-stone)] md:col-span-5">
                    {t.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Mandates and investments */}
      <section className="rd-section rd-paper-2" aria-labelledby="st-mandates">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-center lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            <ImageReveal className="lg:col-span-7">
              <div className="rd-media aspect-[16/11] w-full">
                <Picture
                  name="spiral-dark"
                  alt="Dark spiral stair seen from below, forming a precise geometric spiral"
                  sizes="(min-width:1024px) 56vw, 100vw"
                  focal="50% 50%"
                  className="h-full w-full"
                />
              </div>
            </ImageReveal>

            <div className="lg:col-span-5">
              <Reveal className="rd-kicker">
                <p className="rd-label">Mandates &amp; Investments</p>
              </Reveal>

              <h2
                id="st-mandates"
                className="rd-h3 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[20ch] text-[var(--rd-ink)]"
              >
                Terms that stay legible when conditions move.
              </h2>

              <Reveal delay={0.12}>
                <p className="rd-body mt-5 max-w-[42ch] text-[var(--rd-stone)]">
                  {service.themes[1].body}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="rd-body mt-5 max-w-[42ch] text-[var(--rd-stone)]">
                  {service.themes[2].body}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Proven frameworks — statement panel */}
      <section className="rd-section-sm rd-paper-2" aria-labelledby="st-precision">
        <div className="rd-shell">
          <div className="rd-panel rd-on-dark relative overflow-hidden bg-ink">
            <div className="media veil-editorial absolute inset-0">
              <Picture
                name="gold-lattice"
                alt=""
                decorative
                sizes="100vw"
                focal="50% 68%"
                className="h-full w-full"
              />
            </div>

            <div className="relative z-10 flex min-h-[24rem] flex-col justify-end px-[clamp(1.5rem,4vw,4.5rem)] py-[clamp(2.5rem,5vw,4.5rem)] lg:min-h-[28rem]">
              <Reveal className="rd-kicker">
                <p className="rd-label">Proven Frameworks</p>
              </Reveal>
              <h2
                id="st-precision"
                className="rd-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[16ch] text-bone"
              >
                <MaskedLines lines={['Novelty is rarely', 'a virtue in a', 'structure.']} />
              </h2>
              <Reveal delay={0.14}>
                <p className="rd-lead mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[46ch] text-bone/70">
                  Established frameworks carry the weight of everything that has
                  already been tested against them. We fit them to the situation
                  rather than fitting the situation to them.
                </p>
              </Reveal>
            </div>
          </div>
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
