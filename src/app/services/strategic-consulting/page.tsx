import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { ServiceIntro } from '@/components/sections/ServiceIntro';
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
        sectionLabel={service.title}
        headline={['Judgement applied', 'to consequential', 'decisions.']}
        headlineWide={['Judgement applied to', 'consequential decisions.']}
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
        labelledBy="sc-intro"
        label="Introduction"
        heading={
          <>
            <h2 id="sc-intro" className="sr-only">
              Introduction to Strategic Consulting
            </h2>
            <Reveal delay={0.06}>
              <p className="intro-title mt-[clamp(1.25rem,2.4vw,1.75rem)] text-ivory">
                {service.intro.lead}
              </p>
            </Reveal>
          </>
        }
      >
        <Reveal>
          <p className="t-label text-sage">Strategic perspective</p>
        </Reveal>

        <div className="intro-body">
          {service.intro.body.map((p, i) => (
            <Reveal key={p} delay={0.08 * (i + 1)}>
              <p className="t-lead text-sage">{p}</p>
            </Reveal>
          ))}
        </div>
      </ServiceIntro>

      {/* Decision framework — numbered ledger on a warm dark ground */}
      <section data-section="Decision Framework" className="section ground-void" aria-labelledby="sc-framework">
        <div className="shell">
          <Reveal kind="label" className="kicker">
            <p className="t-label">Decision Framework</p>
          </Reveal>
          <h2
            id="sc-framework"
            className="t-h2 head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-ivory"
          >
            <span className="sr-only">
              Five questions we work through before we give a view.
            </span>
            <span aria-hidden className="block lg:hidden">
              <MaskedLines
                lines={['Five questions we', 'work through before', 'we give a view.']}
              />
            </span>
            <span aria-hidden className="hidden lg:block">
              <MaskedLines lines={['Five questions we work through', 'before we give a view.']} />
            </span>
          </h2>

          <ol className="mt-[var(--pad-sm)]">
            {framework.map((f, i) => (
              <Reveal
                as="li"
                key={f.n}
                delay={i * 0.05}
                className="row row-hover last:border-b last:border-[var(--line)]"
              >
                <div className="ledger px-1 py-[clamp(1.75rem,3vw,2.5rem)]">
                  <span className="t-num text-[clamp(1.1rem,2vw,1.6rem)] text-gold">
                    {f.n}
                  </span>
                  <h3 className="t-h3 max-w-[26ch] text-ivory">{f.q}</h3>
                  <p className="t-small max-w-[42ch] text-sage">
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Global outlook — statement panel */}
      <section
        data-section="Global Outlook"
        className="section ground-void grain relative overflow-hidden"
        aria-labelledby="sc-outlook"
      >
        <div className="media media-flat veil-editorial absolute inset-0">
          <Picture
            name="city-mono"
            alt=""
            decorative
            sizes="100vw"
            focal="50% 40%"
            className="h-full w-full"
          />
        </div>

        <div className="shell relative z-10 flex min-h-[16rem] flex-col justify-end lg:min-h-[22rem]">
          <Reveal kind="label" className="kicker">
            <p className="t-label">Global Outlook</p>
          </Reveal>
          <h2
            id="sc-outlook"
            className="t-h2 head-title mt-[clamp(1.25rem,2.4vw,1.75rem)] text-ivory"
          >
            <span className="sr-only">Growth is published. Durability is not.</span>
            <span aria-hidden className="block lg:hidden">
              <MaskedLines lines={['Growth is', 'published.', 'Durability is not.']} />
            </span>
            <span aria-hidden className="hidden lg:block">
              <MaskedLines lines={['Growth is published.', 'Durability is not.']} />
            </span>
          </h2>
          <Reveal delay={0.14}>
            <p className="t-lead mt-[clamp(1.25rem,2.2vw,1.75rem)] max-w-[45rem] text-ivory/70">
              The conditions that sustain a market are rarely in the same documents as
              the numbers describing it. That is where the work has to go.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Themes — alternating editorial split */}
      <section data-section="How We Work" className="section ground-graphite" aria-labelledby="sc-themes">
        <div className="shell">
          <h2 id="sc-themes" className="sr-only">
            How we work in strategic consulting
          </h2>

          <ul className="space-y-[var(--pad-sm)]">
            {service.themes.map((t, i) => {
              const flipped = i % 2 === 1;
              const m = themeMedia[i] ?? themeMedia[0];
              return (
                <li
                  key={t.label}
                  className="grid gap-[var(--gap)] lg:grid-cols-12 lg:items-center lg:gap-[clamp(2.5rem,4.5vw,5rem)]"
                >
                  <div
                    className={
                      flipped
                        ? 'lg:col-span-5 lg:col-start-8 lg:row-start-1'
                        : 'lg:col-span-5'
                    }
                  >
                    <Reveal>
                      <p className="t-label text-gold">{t.label}</p>
                      <h3 className="t-h3 mt-5 max-w-[18ch] text-ivory">{t.title}</h3>
                      <p className="t-body mt-5 max-w-[44ch] text-sage">{t.body}</p>
                    </Reveal>
                  </div>

                  <ImageReveal
                    className={
                      flipped
                        ? 'lg:col-span-6 lg:col-start-1 lg:row-start-1'
                        : 'lg:col-span-6 lg:col-start-7'
                    }
                  >
                    <div className="media aspect-[16/10] w-full">
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
        sectionLabel="Enquiries"
        lines={['Bring us the', 'difficult one.']}
        body="Reach out to discuss strategic opportunities or advisory requirements. Every enquiry is handled in confidence."
        image="city-blue-night"
        focal="50% 55%"
      />
    </>
  );
}
