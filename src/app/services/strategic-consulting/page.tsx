import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
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

const themeMedia = [
  {
    name: 'district-dusk',
    alt: 'International financial district towers standing against a heavy dusk sky',
  },
  {
    name: 'spiral-dark',
    alt: 'Dark spiral stair seen from below, forming a precise geometric spiral',
  },
  {
    name: 'lounge-dark',
    alt: 'Darkened executive lounge with slatted screens and low, considered lighting',
  },
  {
    name: 'dubai-haze',
    alt: 'Dubai skyline across the water in warm morning haze',
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
      <section className="rd-section rd-paper" aria-labelledby="sc-intro">
        <div className="rd-shell">
          <Reveal className="rd-kicker">
            <p className="rd-label">Introduction</p>
          </Reveal>

          <h2 id="sc-intro" className="sr-only">
            Introduction to Strategic Consulting
          </h2>

          <Reveal delay={0.06}>
            <p className="rd-display mt-[clamp(1.5rem,3vw,2.75rem)] max-w-[22ch] text-[var(--rd-ink)]">
              {service.intro.lead}
            </p>
          </Reveal>

          <div className="mt-[var(--rd-pad-sm)] grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:gap-[clamp(2.5rem,4vw,4.5rem)]">
            <div className="lg:col-span-3">
              <Reveal>
                <p className="rd-label text-[var(--rd-stone)]">Strategic perspective</p>
              </Reveal>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="space-y-6">
                {service.intro.body.map((p, i) => (
                  <Reveal key={p} delay={i * 0.08}>
                    <p className="rd-lead max-w-[56ch] text-[var(--rd-stone)]">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision framework — numbered ledger on a warm dark ground */}
      <section className="rd-section rd-dark" aria-labelledby="sc-framework">
        <div className="rd-shell">
          <div className="grid gap-[var(--rd-gap)] lg:grid-cols-12">
            <div className="lg:col-span-7 lg:col-start-4">
              <Reveal className="rd-kicker">
                <p className="rd-label">Decision Framework</p>
              </Reveal>
              <h2
                id="sc-framework"
                className="rd-h2 mt-[clamp(1.25rem,2.6vw,2rem)] max-w-[17ch] text-bone"
              >
                <MaskedLines
                  lines={['Five questions we', 'work through before', 'we give a view.']}
                />
              </h2>
            </div>
          </div>

          <ol className="mt-[var(--rd-pad-sm)] lg:ml-[25%]">
            {framework.map((f, i) => (
              <Reveal
                as="li"
                key={f.n}
                delay={i * 0.05}
                className="rd-row-inv rd-row-inv-hover last:border-b last:border-[var(--rd-line-inv)]"
              >
                <div className="grid gap-x-8 gap-y-4 px-1 py-[clamp(1.75rem,3vw,2.5rem)] md:grid-cols-12">
                  <span className="rd-num text-[clamp(1.1rem,2vw,1.6rem)] text-[var(--rd-accent)] md:col-span-1">
                    {f.n}
                  </span>
                  <h3 className="rd-h3 max-w-[24ch] text-bone md:col-span-6">{f.q}</h3>
                  <p className="rd-small max-w-[42ch] text-[var(--rd-sage)] md:col-span-5">
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Global outlook — statement panel */}
      <section className="rd-section-sm rd-paper" aria-labelledby="sc-outlook">
        <div className="rd-shell">
          <div className="rd-panel rd-on-dark relative overflow-hidden bg-ink">
            <div className="media veil-editorial absolute inset-0">
              <Picture
                name="city-mono"
                alt=""
                decorative
                sizes="100vw"
                focal="50% 40%"
                className="h-full w-full"
              />
            </div>

            <div className="relative z-10 flex min-h-[24rem] flex-col justify-end px-[clamp(1.5rem,4vw,4.5rem)] py-[clamp(2.5rem,5vw,4.5rem)] lg:min-h-[30rem]">
              <Reveal className="rd-kicker">
                <p className="rd-label">Global Outlook</p>
              </Reveal>
              <h2
                id="sc-outlook"
                className="rd-h2 mt-[clamp(1.25rem,2.4vw,1.75rem)] max-w-[16ch] text-bone"
              >
                <MaskedLines lines={['Growth is', 'published.', 'Durability is not.']} />
              </h2>
              <Reveal delay={0.14}>
                <p className="rd-lead mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[48ch] text-bone/70">
                  The conditions that sustain a market are rarely in the same
                  documents as the numbers describing it. That is where the work has
                  to go.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Themes — alternating editorial split */}
      <section className="rd-section rd-paper-2" aria-labelledby="sc-themes">
        <div className="rd-shell">
          <h2 id="sc-themes" className="sr-only">
            How we work in strategic consulting
          </h2>

          <ul className="space-y-[var(--rd-pad-sm)]">
            {service.themes.map((t, i) => {
              const flipped = i % 2 === 1;
              const m = themeMedia[i] ?? themeMedia[0];
              return (
                <li
                  key={t.label}
                  className="grid gap-[var(--rd-gap)] lg:grid-cols-12 lg:items-center lg:gap-[clamp(2.5rem,4.5vw,5rem)]"
                >
                  <div
                    className={
                      flipped
                        ? 'lg:col-span-5 lg:col-start-8 lg:row-start-1'
                        : 'lg:col-span-5'
                    }
                  >
                    <Reveal>
                      <p className="rd-label text-[var(--rd-accent-ink)]">{t.label}</p>
                      <h3 className="rd-h3 mt-5 max-w-[18ch] text-[var(--rd-ink)]">{t.title}</h3>
                      <p className="rd-body mt-5 max-w-[44ch] text-[var(--rd-stone)]">{t.body}</p>
                    </Reveal>
                  </div>

                  <ImageReveal
                    className={
                      flipped
                        ? 'lg:col-span-6 lg:col-start-1 lg:row-start-1'
                        : 'lg:col-span-6 lg:col-start-7'
                    }
                  >
                    <div className="rd-media aspect-[16/10] w-full">
                      <Picture
                        name={m.name}
                        alt={m.alt}
                        sizes="(min-width:1024px) 50vw, 100vw"
                        focal="50% 50%"
                        className="h-full w-full"
                      />
                    </div>
                  </ImageReveal>
                </li>
              );
            })}
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
