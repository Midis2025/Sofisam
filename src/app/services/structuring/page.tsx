import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { ServiceIntro } from '@/components/sections/ServiceIntro';
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
        headlineWide={['Form determines what', 'a structure can withstand.']}
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
      <ServiceIntro
        labelledBy="st-intro"
        label="Introduction"
        heading={
          <>
            <h2 id="st-intro" className="sr-only">
              Introduction to Structuring
            </h2>
            <Reveal delay={0.06}>
              <p className="intro-title mt-[clamp(1.25rem,2.4vw,1.75rem)] text-[var(--ink)]">
                {service.intro.lead}
              </p>
            </Reveal>
          </>
        }
      >
        <div>
          {service.intro.body.map((p, i) => (
            <Reveal key={p} delay={0.08 * (i + 1)}>
              <p className="t-body text-[var(--stone)]">{p}</p>
            </Reveal>
          ))}
        </div>
      </ServiceIntro>

      {/* Framework thinking — architecture beside an editorial ledger */}
      <section className="section ground-dark" aria-labelledby="st-framework">
        <div className="shell">
          <div className="head">
            <div>
              <Reveal kind="label" className="kicker">
                <p className="t-label">Framework Thinking</p>
              </Reveal>
              <h2
                id="st-framework"
                className="t-h2 head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-ivory"
              >
                <MaskedLines lines={['Intent before', 'instrument.']} />
              </h2>
            </div>
            <div className="lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body head-note text-[var(--sage)]">
                  We begin with what an arrangement is meant to achieve and for
                  whom, and only then consider the form it should take. The
                  reverse order produces structures that outlive their purpose.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-[var(--pad-sm)] grid gap-[var(--gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            <ImageReveal className="lg:col-span-5">
              <div className="media aspect-[4/5] w-full">
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
                <p className="t-label text-[var(--sage)]">The order of decisions</p>
                <p className="t-display mt-5 text-[var(--gold)]">Intent</p>
                <p className="t-body mt-4 max-w-[44ch] text-[var(--sage)]">
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
                    className="row-inv last:border-b last:border-[var(--line-inv)]"
                  >
                    <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 py-[clamp(1.1rem,1.8vw,1.5rem)] sm:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1fr)] sm:gap-x-6">
                      <span className="t-num text-[0.85rem] text-[var(--gold)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="t-h4 text-ivory">{l.t}</span>
                      <span className="t-small col-start-2 mt-2 max-w-[26ch] text-[var(--sage)] sm:col-start-3 sm:mt-0">
                        {l.d}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ol>

              <Reveal delay={0.2}>
                <p className="t-meta mt-6 max-w-[46ch] text-ivory/40">
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
      <section className="section ground-ivory" aria-labelledby="st-tests">
        <div className="shell">
          <div className="head head-ledger">
            <div>
              <Reveal kind="label" className="kicker">
                <p className="t-label">Structuring Approach</p>
              </Reveal>
              <h2
                id="st-tests"
                className="t-h2 head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-[var(--ink)]"
              >
                <span className="sr-only">Five tests a structure has to survive.</span>
                <span aria-hidden className="block lg:hidden">
                  <MaskedLines lines={['Five tests a', 'structure has', 'to survive.']} />
                </span>
                <span aria-hidden className="hidden lg:block">
                  <MaskedLines lines={['Five tests a structure', 'has to survive.']} />
                </span>
              </h2>
            </div>
            <div className="lg:pb-2">
              <Reveal delay={0.1}>
                <p className="t-body head-note text-[var(--stone)]">
                  Applied to mandates and investments alike, and revisited when
                  circumstances move away from the base case.
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="mt-[var(--pad-sm)]">
            {tests.map((t, i) => (
              <Reveal
                as="li"
                key={t.n}
                delay={i * 0.05}
                className="row row-hover last:border-b last:border-[var(--line)]"
              >
                <div className="ledger px-1 py-[clamp(1.75rem,3vw,2.4rem)]">
                  <span className="t-num text-[clamp(1.1rem,2vw,1.6rem)] text-[var(--gold-ink)]">
                    {t.n}
                  </span>
                  <h3 className="t-h3 max-w-[26ch] text-[var(--ink)]">{t.t}</h3>
                  <p className="t-small max-w-[44ch] text-[var(--stone)]">
                    {t.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Mandates and investments */}
      <section className="section ground-ivory-2" aria-labelledby="st-mandates">
        <div className="shell">
          <div className="grid gap-[var(--gap)] lg:grid-cols-12 lg:items-center lg:gap-[clamp(2.5rem,4.5vw,5rem)]">
            <ImageReveal className="lg:col-span-7">
              <div className="media aspect-[16/11] w-full">
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
              <Reveal kind="label" className="kicker">
                <p className="t-label">Mandates &amp; Investments</p>
              </Reveal>

              <h2
                id="st-mandates"
                className="t-h3 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[20ch] text-[var(--ink)]"
              >
                Terms that stay legible when conditions move.
              </h2>

              <Reveal delay={0.12}>
                <p className="t-body mt-5 max-w-[42ch] text-[var(--stone)]">
                  {service.themes[1].body}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="t-body mt-5 max-w-[42ch] text-[var(--stone)]">
                  {service.themes[2].body}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Proven frameworks — statement panel */}
      <section className="section ground-dark on-dark relative overflow-hidden" aria-labelledby="st-precision">
        <div className="media media-flat veil-editorial absolute inset-0">
              <Picture
                name="gold-lattice"
                alt=""
                decorative
                sizes="100vw"
                focal="50% 68%"
                className="h-full w-full"
              />
            </div>

        <div className="shell relative z-10 flex min-h-[16rem] flex-col justify-end lg:min-h-[22rem]">
              <Reveal kind="label" className="kicker">
                <p className="t-label">Proven Frameworks</p>
              </Reveal>
              <h2
                id="st-precision"
                className="t-h2 head-title mt-[clamp(1.25rem,2.4vw,1.75rem)] text-ivory"
              >
                <span className="sr-only">Novelty is rarely a virtue in a structure.</span>
                <span aria-hidden className="block lg:hidden">
                  <MaskedLines lines={['Novelty is rarely', 'a virtue in a', 'structure.']} />
                </span>
                <span aria-hidden className="hidden lg:block">
                  <MaskedLines lines={['Novelty is rarely', 'a virtue in a structure.']} />
                </span>
              </h2>
              <Reveal delay={0.14}>
                <p className="t-lead mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[45rem] text-ivory/70">
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
