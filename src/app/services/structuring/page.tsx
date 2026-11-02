import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Layers, ShieldCheck } from 'lucide-react';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { ServiceIntro } from '@/components/sections/ServiceIntro';
import { ServicePager } from '@/components/sections/ServicePager';
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

/** Five tests a structure must survive */
const tests = [
  {
    n: '01',
    t: 'Can every counterparty describe it clearly?',
    d: 'If the functional description varies between the people bound by it, the structure carries an unrecognised liability that will emerge during stress.',
  },
  {
    n: '02',
    t: 'What happens at the jurisdictional edges?',
    d: 'Base cases are simple. A structure is tested by deadlock, exit, regulatory shifts, and the arrival of conditions neither party planned for.',
  },
  {
    n: '03',
    t: 'Where is deadlock resolved without damage?',
    d: 'An arrangement that only functions while everyone remains aligned is not a structure. It is merely an agreement waiting for a dispute.',
  },
  {
    n: '04',
    t: 'Does the form still reflect the commercial intent?',
    d: 'Corporate and investment structures frequently outlive the intent that prompted them. Reviewing that alignment on a disciplined schedule is essential.',
  },
  {
    n: '05',
    t: 'Is the complexity doing genuine work?',
    d: 'Complexity is occasionally unavoidable across cross-border mandates. Opacity almost never is. Where confused, the cost falls on whoever inherits it.',
  },
];

const layers = [
  { t: 'Authority', d: 'Who may commit capital or corporate assets, and up to what defined threshold.' },
  { t: 'Oversight', d: 'What reporting is seen, by whom, and at what verification cadence.' },
  { t: 'Economics', d: 'How commercial returns, carried risk, and downside costs are actually distributed.' },
  { t: 'Exit & Transfer', d: 'What predictable mechanism governs when a party needs to unwind or exit.' },
];

export default function StructuringPage() {
  return (
    <>
      {/* 01 — Page Hero */}
      <PageHero
        eyebrow={service.hero.eyebrow}
        sectionLabel={service.title}
        headline={['Form determines what a', 'structure can withstand.']}
        headlineWide={['Form determines what a', 'structure can withstand.']}
        standfirst={service.hero.standfirst}
        image={service.hero.image}
        imageAlt={service.hero.imageAlt}
        focal={service.hero.focal}
        size="tall"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Expertise', href: '/services' },
          { label: service.title },
        ]}
      />

      {/* 02 — Introduction */}
      <ServiceIntro
        labelledBy="st-intro"
        label="Structuring Mandates"
        heading={
          <>
            <h2 id="st-intro" className="sr-only">
              Introduction to Structuring
            </h2>
            <Reveal delay={0.06}>
              <p className="intro-title mt-4 text-[var(--ivory)] font-light leading-snug">
                {service.intro.lead}
              </p>
            </Reveal>
          </>
        }
      >
        <div className="space-y-4">
          {service.intro.body.map((p, i) => (
            <Reveal key={p} delay={0.08 * (i + 1)}>
              <p className="t-lead text-[var(--sage)] leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </ServiceIntro>

      {/* 03 — Framework Thinking: Intent Before Instrument */}
      <section data-section="Framework Thinking" className="section ground-void border-b border-[var(--line-soft)]" aria-labelledby="st-framework">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[var(--line)]">
            <div>
              <div className="kicker">
                <p className="t-label">Framework Thinking</p>
              </div>
              <h2
                id="st-framework"
                className="mt-eyebrow t-h2 text-[var(--ivory)] font-light leading-[1.08]"
              >
                <MaskedLines lines={['Intent before instrument.', 'Architecture before form.']} />
              </h2>
            </div>
            <p className="t-body text-[var(--sage)] max-w-[42ch] leading-relaxed">
              We begin with what an arrangement is meant to achieve, and only then consider the legal form it should take.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            {/* Content (Left Column on Desktop, First on Mobile) */}
            <div className="lg:col-span-7 order-1">
              <Reveal>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--brass)] font-mono font-medium">
                  <Layers className="h-3.5 w-3.5" />
                  <span>The Order of Decisions</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl mt-3 text-[var(--ivory)] font-light">
                  Intent Governs Form
                </h3>
                <p className="t-body mt-4 text-[var(--sage)] leading-relaxed">
                  Everything resolves from core commercial intent. Settle the intent and the operational instruments follow naturally; reverse the sequence and the structure ends up spending its life justifying its own friction.
                </p>
              </Reveal>

              <ol className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {layers.map((l, i) => (
                  <Reveal as="li" key={l.t} delay={i * 0.06}>
                    <div className="py-4 grid items-baseline sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--gold)]">{l.t}</span>
                      <span className="text-sm text-[var(--ivory-2)] leading-relaxed">{l.d}</span>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>

            {/* Media Plate (Right Column on Desktop, Below on Mobile) */}
            <ImageReveal className="lg:col-span-5 order-2">
              <div className="media aspect-[4/5] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] shadow-[var(--shadow-plate)] group">
                <Picture
                  name="lattice-white"
                  alt="The facade of a modern building, its balconies set in a regular grid"
                  sizes="(min-width:1024px) 42vw, 100vw"
                  focal="50% 48%"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10">
                  <span className="text-xs uppercase tracking-widest text-[#e8c89b] font-mono">
                    Structured Precision
                  </span>
                  <p className="text-sm font-light text-white/95 mt-1">
                    Load-bearing structures engineered for permanence
                  </p>
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 04 — Five Tests a Structure Has to Survive */}
      <section data-section="Structuring Tests" className="section ground-char border-b border-[var(--line-soft)]" aria-labelledby="st-tests">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[var(--line)]">
            <div>
              <div className="kicker">
                <p className="t-label">Structuring Approach</p>
              </div>
              <h2
                id="st-tests"
                className="mt-eyebrow t-h2 text-[var(--ivory)] font-light leading-[1.08]"
              >
                <MaskedLines lines={['Five tests a structure', 'has to survive.']} />
              </h2>
            </div>
            <p className="t-body text-[var(--sage)] max-w-[42ch] leading-relaxed">
              Applied rigorously across mandates and investments alike, and revisited when circumstances move away from the baseline.
            </p>
          </div>

          <ol className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {tests.map((t, i) => (
              <Reveal
                as="li"
                key={t.n}
                delay={i * 0.05}
                className="group py-8 sm:py-10 transition-colors duration-300 hover:bg-[var(--plate)]/40 px-4 -mx-4 rounded-[var(--r-md)]"
              >
                <div className="grid gap-6 md:grid-cols-12 md:gap-10 items-baseline">
                  <div className="md:col-span-2">
                    <span className="t-label text-[var(--gold)]">
                      Standard
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-xl sm:text-2xl text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors font-light leading-snug">
                      {t.t}
                    </h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="t-body text-[var(--sage)] leading-relaxed">
                      {t.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 05 — Mandates & Investments Asymmetric Feature */}
      <section data-section="Mandates & Investments" className="section ground-graphite border-b border-[var(--line-soft)]" aria-labelledby="st-mandates">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            {/* Content (Left Column on Desktop, First on Mobile) */}
            <div className="lg:col-span-5 order-1">
              <div className="kicker">
                <p className="t-label">Mandates &amp; Investments</p>
              </div>

              <h2
                id="st-mandates"
                className="t-h3 mt-eyebrow text-[var(--ivory)] font-light leading-snug"
              >
                Frameworks that endure beyond the initial agreement.
              </h2>

              <p className="t-body mt-5 text-[var(--sage)] leading-relaxed">
                {service.themes[1].body}
              </p>

              <p className="t-body mt-4 text-[var(--sage)] leading-relaxed">
                {service.themes[2].body}
              </p>

              <div className="mt-8 pt-6 border-t border-[var(--line)]">
                <span className="text-xs uppercase tracking-wider text-[var(--brass)] font-semibold">
                  Principal Executive Standard · DMCC Dubai
                </span>
              </div>
            </div>

            {/* Media Plate (Right Column on Desktop, Below on Mobile) */}
            <ImageReveal className="lg:col-span-7 order-2">
              <div className="media aspect-[16/10] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] shadow-[var(--shadow-plate)] group">
                <Picture
                  name="spiral-dark"
                  alt="A spiral staircase seen down its own well, turning in on itself"
                  sizes="(min-width:1024px) 56vw, 100vw"
                  focal="50% 50%"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-white z-10 flex items-end justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#e8c89b] font-mono">
                      Mandates &amp; Investments
                    </span>
                    <p className="mt-1 font-display text-xl text-white font-light">
                      Terms that remain legible when conditions move
                    </p>
                  </div>
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 06 — Proven Frameworks Statement Banner */}
      <section data-section="Proven Frameworks" className="section tone-dark ground-void grain relative overflow-hidden" aria-labelledby="st-precision">
        <div className="media media-flat veil-full absolute inset-0">
          <Picture
            name="gold-lattice"
            alt=""
            decorative
            sizes="100vw"
            focal="50% 68%"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="shell relative z-10 flex min-h-[18rem] flex-col justify-end lg:min-h-[24rem] py-16">
          <div className="kicker">
            <p className="t-label text-gold">Structural Virtue</p>
          </div>
          <h2
            id="st-precision"
            className="t-h2 text-white font-light leading-[1.08] mt-eyebrow"
          >
            <MaskedLines lines={['Novelty is rarely a', 'virtue in a structure.']} />
          </h2>
          <Reveal delay={0.14}>
            <p className="t-lead mt-5 max-w-[46rem] text-white/85 leading-relaxed">
              Established frameworks carry the weight of everything that has already been tested against them in real market conditions. We fit them to the situation rather than forcing the situation into an experimental form.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 07 — Service Pager */}
      <ServicePager current="structuring" />
    </>
  );
}
