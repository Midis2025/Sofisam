import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, DrawRule, ImageReveal } from '@/components/animations/Reveal';
import { Parallax, ScaleOnScroll } from '@/components/animations/Parallax';
import { ServicePager } from '@/components/sections/ServicePager';
import { CTASection } from '@/components/sections/CTASection';
import { serviceBySlug } from '@/data/services';

const service = serviceBySlug('strategic-consulting')!;

export const metadata: Metadata = {
  title: 'Strategic Consulting',
  description: service.metaDescription,
  alternates: { canonical: '/services/strategic-consulting' },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: '/services/strategic-consulting',
  },
};

/** The decision framework — the distinguishing device on this page. */
const framework = [
  {
    n: '01',
    q: 'What is actually being decided?',
    a: 'Most briefs describe a symptom. The first task is to establish the decision underneath it, and who is entitled to take it.',
  },
  {
    n: '02',
    q: 'What has to be true?',
    a: 'Every case rests on a small number of load-bearing assumptions. Naming them converts a forecast into something that can be tested.',
  },
  {
    n: '03',
    q: 'What does the downside cost?',
    a: 'Not the probability of being wrong, but the consequence of it — in capital, in time, and in what becomes harder to do next.',
  },
  {
    n: '04',
    q: 'What becomes irreversible?',
    a: 'Some commitments can be unwound at a price. Others cannot be unwound at all. The distinction usually decides the sequencing.',
  },
  {
    n: '05',
    q: 'Who is on the other side?',
    a: 'A counterparty formed by different conditions will read the same proposal differently. Anticipating that is half the negotiation.',
  },
];

export default function StrategicConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow={service.hero.eyebrow}
        headline={['Judgement applied', 'to consequential', 'decisions.']}
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

      {/* Introduction — oversized lead */}
      <section className="section bg-bone" aria-labelledby="sc-intro">
        <div className="shell-wide">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
            <p className="t-label text-gold">Introduction</p>
          </Reveal>

          <h2 id="sc-intro" className="sr-only">
            Introduction to Strategic Consulting
          </h2>

          <Reveal delay={0.06}>
            <p className="mt-8 max-w-[24ch] font-display text-[clamp(1.85rem,4.6vw,3.6rem)] leading-[1.08] tracking-tighter text-ink">
              {service.intro.lead}
            </p>
          </Reveal>

          <DrawRule className="mt-[var(--space-section-sm)]" />

          <div className="mt-[var(--content-gap-lg)] grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="t-label text-ink/40">Strategic perspective</p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {service.intro.body.map((p, i) => (
                  <Reveal key={p} delay={i * 0.08}>
                    <p className="t-lead max-w-[56ch] text-ink/70">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision framework — dark, meridian motif, numbered ledger */}
      <section
        className="relative overflow-hidden bg-ink text-bone"
        aria-labelledby="sc-framework"
      >

        <div className="shell-wide relative z-10 section">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7 lg:col-start-4">
              <Reveal className="flex items-center gap-4">
                <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
                <p className="t-label text-gold">Decision Framework</p>
              </Reveal>
              <h2 id="sc-framework" className="t-h2 mt-7 max-w-[17ch] text-bone">
                <MaskedLines lines={['Five questions we', 'work through before', 'we give a view.']} />
              </h2>
            </div>
          </div>

          <ol className="mt-[var(--space-section-sm)] lg:ml-[25%]">
            {framework.map((f, i) => (
              <Reveal
                as="li"
                key={f.n}
                delay={i * 0.05}
                className="grid gap-4 border-t border-bone/12 py-8 md:grid-cols-12 md:gap-8 md:py-10"
              >
                <span className="t-index text-[clamp(1.5rem,2.6vw,2.1rem)] text-gold md:col-span-1">
                  {f.n}
                </span>
                <h3 className="max-w-[24ch] font-display text-[clamp(1.4rem,2.5vw,2rem)] leading-tight tracking-tight text-bone md:col-span-6">
                  {f.q}
                </h3>
                <p className="max-w-[42ch] text-[0.92rem] font-light leading-relaxed text-bone/55 md:col-span-5">
                  {f.a}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Full-bleed global outlook */}
      <section
        className="relative w-full overflow-hidden bg-ink text-bone"
        aria-labelledby="sc-outlook"
      >
        <Parallax strength={9} className="absolute inset-0">
          <div className="media veil-editorial h-full w-full">
            <Picture
              name="city-mono"
              alt=""
              decorative
              sizes="100vw"
              focal="50% 40%"
              className="h-full w-full"
            />
          </div>
        </Parallax>

        <div className="shell-wide relative z-10 flex min-h-[30rem] lg:min-h-[34rem] flex-col justify-end py-[var(--space-section-lg)]">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden className="block h-px w-10 bg-gold sm:w-16" />
            <p className="t-label text-gold">Global Outlook</p>
          </Reveal>
          <h2 id="sc-outlook" className="t-h1 mt-7 max-w-[16ch] text-bone">
            <MaskedLines lines={['Growth is', 'published.', 'Durability is not.']} />
          </h2>
          <Reveal delay={0.14}>
            <p className="t-lead mt-8 max-w-[48ch] text-bone/65">
              The conditions that sustain a market are rarely in the same
              documents as the numbers describing it. That is where the work has
              to go.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Themes — alternating editorial split */}
      <section className="section bg-bone" aria-labelledby="sc-themes">
        <div className="shell-wide">
          <h2 id="sc-themes" className="sr-only">
            How we work in strategic consulting
          </h2>

          <ul className="space-y-[var(--space-section-md)]">
            {service.themes.map((t, i) => (
              <li
                key={t.label}
                className={`grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12 ${
                  i % 2 === 1 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <Reveal>
                    <p className="t-label text-gold">{t.label}</p>
                    <h3 className="t-h3 mt-5 max-w-[18ch] text-ink">{t.title}</h3>
                    <p className="t-body mt-5 max-w-[44ch] text-ink/60">{t.body}</p>
                  </Reveal>
                </div>

                <ImageReveal className={`lg:col-span-6 lg:col-start-7 ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <ScaleOnScroll className="media aspect-[16/10] w-full" from={1.1} to={1}>
                    <Picture
                      name={
                        ['district-dusk', 'spiral-dark', 'lounge-dark', 'dubai-haze'][i] ??
                        'district-dusk'
                      }
                      alt={
                        [
                          'International financial district towers standing against a heavy dusk sky',
                          'Dark spiral stair seen from below, forming a precise geometric spiral',
                          'Darkened executive lounge with slatted screens and low, considered lighting',
                          'Dubai skyline across the water in warm morning haze',
                        ][i] ?? ''
                      }
                      sizes="(min-width:1024px) 50vw, 100vw"
                      focal="50% 50%"
                      className="h-full w-full"
                    />
                  </ScaleOnScroll>
                </ImageReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServicePager current="strategic-consulting" />

      <CTASection
        eyebrow="Strategic Consulting"
        lines={['Bring us the', 'difficult one.']}
        body="Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence."
        image="city-blue-night"
        focal="50% 55%"
      />
    </>
  );
}
