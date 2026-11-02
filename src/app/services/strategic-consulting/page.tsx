import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, HelpCircle, Shield, Sparkles } from 'lucide-react';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { ServiceIntro } from '@/components/sections/ServiceIntro';
import { ServicePager } from '@/components/sections/ServicePager';
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

/** The 5-stage decision framework — the distinguishing device on this page */
const framework = [
  {
    n: '01',
    q: 'What is actually being decided?',
    a: 'Most briefs describe a symptom. The first task is to establish the core decision underneath it, and who holds direct authority to commit the capital or organisation.',
  },
  {
    n: '02',
    q: 'What has to be true?',
    a: 'Every strategic case rests on a small number of load-bearing assumptions. Naming them converts an untested forecast into a model that can be stress-tested.',
  },
  {
    n: '03',
    q: 'What does the downside cost?',
    a: 'Not the statistical probability of being wrong, but the practical consequence of it — in balance sheet capital, in executive time, and in what becomes harder to do next.',
  },
  {
    n: '04',
    q: 'What becomes irreversible?',
    a: 'Some commitments can be unwound at a price. Others cannot be unwound at all. That structural distinction almost always decides the sequencing of the mandate.',
  },
  {
    n: '05',
    q: 'Who is on the other side?',
    a: 'A counterparty formed by different jurisdictions or capital horizons will read the exact same proposal differently. Anticipating that is half the negotiation.',
  },
];

const themeMedia = [
  {
    name: 'executive-digital-communications',
    alt: 'Executive analyzing strategic financial market data and cross-border indicators',
  },
  {
    name: 'dubai-investor-relations',
    alt: 'Confidential executive strategic consultation in private advisory offices',
  },
  {
    name: 'corporate-media-communications',
    alt: 'Senior advisors delivering confidential strategic briefings',
  },
  {
    name: 'abu-dhabi-financial-district',
    alt: 'Modern financial district towers reflecting global capital flows',
  },
];

export default function StrategicConsultingPage() {
  return (
    <>
      {/* 01 — Page Masthead */}
      <PageHero
        eyebrow={service.hero.eyebrow}
        sectionLabel={service.title}
        headline={['Judgement applied to', 'consequential decisions.']}
        headlineWide={['Judgement applied to', 'consequential decisions.']}
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

      {/* 02 — Introduction Chapter */}
      <ServiceIntro
        labelledBy="sc-intro"
        label="Strategic Mandate"
        heading={
          <>
            <h2 id="sc-intro" className="sr-only">
              Introduction to Strategic Consulting
            </h2>
            <Reveal delay={0.06}>
              <p className="intro-title mt-4 text-[var(--ivory)] font-light leading-snug">
                {service.intro.lead}
              </p>
            </Reveal>
          </>
        }
      >
        <Reveal>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--gold)] font-medium">
            <Shield className="h-3.5 w-3.5 text-[var(--brass)]" />
            <span>Unconflicted Strategic Advisory</span>
          </div>
        </Reveal>

        <div className="intro-body space-y-4 pt-2">
          {service.intro.body.map((p, i) => (
            <Reveal key={p} delay={0.08 * (i + 1)}>
              <p className="t-lead text-[var(--sage)] leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </ServiceIntro>

      {/* 03 — Decision Framework: 5 Numbered Questions */}
      <section data-section="Decision Framework" className="section ground-void border-b border-[var(--line-soft)]" aria-labelledby="sc-framework">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[var(--line)]">
            <div>
              <div className="kicker">
                <p className="t-label">Strategic Framework</p>
              </div>
              <h2
                id="sc-framework"
                className="mt-eyebrow t-h2 text-[var(--ivory)] font-light leading-[1.08]"
              >
                <MaskedLines lines={['Five questions we work through', 'before we give a view.']} />
              </h2>
            </div>
            <p className="t-body text-[var(--sage)] max-w-[42ch] leading-relaxed">
              Every mandate is evaluated against strict analytical and structural tests before any strategic recommendation is committed to paper.
            </p>
          </div>

          <ol className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {framework.map((f, i) => (
              <Reveal
                as="li"
                key={f.n}
                delay={i * 0.05}
                className="group py-8 sm:py-10 transition-colors duration-300 hover:bg-[var(--plate)]/40 px-4 -mx-4 rounded-[var(--r-md)]"
              >
                <div className="grid gap-6 md:grid-cols-12 md:gap-10 items-baseline">
                  <div className="md:col-span-2 flex items-baseline">
                    <span className="t-label text-[var(--gold)]">
                      Inquiry
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-xl sm:text-2xl text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors font-light leading-snug">
                      {f.q}
                    </h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="t-body text-[var(--sage)] leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — Global Outlook Statement Panel */}
      <section
        data-section="Global Outlook"
        className="section tone-dark ground-void grain relative overflow-hidden"
        aria-labelledby="sc-outlook"
      >
        <div className="media media-flat veil-editorial absolute inset-0">
          <Picture
            name="hero-video-poster"
            alt=""
            decorative
            sizes="100vw"
            focal="50% 55%"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="shell relative z-10 flex min-h-[18rem] flex-col justify-end lg:min-h-[26rem] py-16">
          <div className="kicker">
            <p className="t-label text-gold">Market Perspective</p>
          </div>
          <h2
            id="sc-outlook"
            className="t-h2 text-white font-light leading-[1.08] mt-eyebrow"
          >
            <MaskedLines lines={['Growth is published.', 'Durability is not.']} />
          </h2>
          <Reveal delay={0.14}>
            <p className="t-lead mt-5 max-w-[46rem] text-white/85 leading-relaxed">
              The conditions that actually sustain a market across cycles are rarely found in the same presentations as the numbers describing it. That hidden architecture is where our analysis focuses.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 05 — Practice Themes: Alternating Editorial Showcase */}
      <section data-section="How We Work" className="section ground-graphite border-b border-[var(--line-soft)]" aria-labelledby="sc-themes">
        <div className="shell">
          <div className="pb-10 border-b border-[var(--line)]">
            <div className="kicker">
              <p className="t-label">Core Dimensions</p>
            </div>
            <h2 id="sc-themes" className="mt-eyebrow t-h2 text-[var(--ivory)] font-light">
              How we work in strategic consulting.
            </h2>
          </div>

          <ul className="mt-14 space-y-16">
            {service.themes.map((t, i) => {
              const m = themeMedia[i] ?? themeMedia[0];
              return (
                <li
                  key={t.label}
                  className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14"
                >
                  <div className="lg:col-span-5 order-1">
                    <Reveal>
                      <span className="text-xs font-mono font-semibold text-[var(--brass)] uppercase">
                        Theme 0{i + 1} · {t.label}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl mt-3 text-[var(--ivory)] font-light leading-snug">
                        {t.title}
                      </h3>
                      <p className="t-body mt-4 text-[var(--sage)] leading-relaxed">
                        {t.body}
                      </p>
                    </Reveal>
                  </div>

                  <ImageReveal className="lg:col-span-7 order-2">
                    <div className="media aspect-[16/10] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] shadow-[var(--shadow-plate)] group">
                      <Picture
                        name={m.name}
                        alt={m.alt}
                        sizes="(min-width:1024px) 50vw, 100vw"
                        focal="50% 50%"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                  </ImageReveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 06 — Service Pager */}
      <ServicePager current="strategic-consulting" />
    </>
  );
}
