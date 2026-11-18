import type { Metadata } from 'next';

import { PageHero } from '@/components/layout/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Reveal, MaskedLines, ImageReveal } from '@/components/animations/Reveal';
import { AdvisoryThemes } from '@/components/sections/AdvisoryThemes';
import { ServicePager } from '@/components/sections/ServicePager';
import { serviceBySlug } from '@/data/services';

const service = serviceBySlug('advisory')!;

export const metadata: Metadata = {
  title: 'Corporate Advisory',
  description: service.metaDescription,
  alternates: { canonical: '/services/advisory' },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: '/services/advisory',
  },
};

const governanceNotes = [
  {
    t: 'Authority',
    d: 'Who is entitled to commit the organisation, up to what financial magnitude, and on whose explicit behalf.',
  },
  {
    t: 'Oversight',
    d: 'What information the board actually reviews, how frequently, and whether it is sufficient to hold a legally defensible position.',
  },
  {
    t: 'Accountability',
    d: 'Where commercial and legal responsibility lands when an outcome reverses, and whether that distribution is settled in advance.',
  },
  {
    t: 'Succession & Continuity',
    d: 'Whether the operational governance and decision frameworks survive the departure of the individuals who created them.',
  },
];

/**
 * The four photographs on this page are each framed for their own subject
 * rather than forced into one ratio. Positions were read off the photographs:
 *
 *   exec-boardroom-sunset          16:9 — the table on the left, the Burj
 *                                  Khalifa at the far right; held right so the
 *                                  narrower phone frame keeps the tower.
 *   lounge-dark                    3:2 — table and chairs centred between two
 *                                  timber columns, the window wall at right.
 *   dubai-burj-khalifa-reflection  3:4 portrait — spire near the top, the
 *                                  reflection pool across the bottom; the
 *                                  frame ends with the governance content, so
 *                                  the crop is taken from the pool.
 *   dubai-burj-al-arab-gulf        3:2 — the tower a third in from the left,
 *                                  the horizon just below centre.
 *
 * Every column below sits on the one `.shell` container and a 12-column grid;
 * on phones each section stacks label, heading, copy, photograph, detail.
 */
export default function AdvisoryPage() {
  return (
    <>
      {/* 01 — Page Hero */}
      <PageHero
        eyebrow={service.hero.eyebrow}
        sectionLabel={service.title}
        headline={['Counsel formed in the room', 'where decisions are taken.']}
        headlineWide={['Counsel formed in the room', 'where decisions are taken.']}
        standfirst={service.hero.standfirst}
        image={service.hero.image}
        imageAlt={service.hero.imageAlt}
        focal="75% 40%"
        frame="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1]"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Expertise', href: '/services' },
          { label: service.title },
        ]}
      />

      {/* 02 — Executive Counsel: copy (5 of 12) beside the meeting room (7 of 12) */}
      <section data-section="Executive Counsel" className="section ground-char" aria-labelledby="adv-intro">
        <div className="shell">
          <div className="grid gap-y-10 md:gap-y-12 xl:grid-cols-12 xl:items-start xl:gap-x-[clamp(2.5rem,4vw,4.5rem)]">
            <div className="xl:col-span-5">
              <Reveal kind="label" className="kicker">
                <p className="t-label">Executive Counsel</p>
              </Reveal>
              <h2
                id="adv-intro"
                className="font-display text-2xl sm:text-3xl mt-4 max-w-[26ch] text-[var(--ivory)] font-light leading-snug"
              >
                Executive decision-making, supported rather than substituted.
              </h2>

              <Reveal delay={0.06}>
                <p className="t-lead mt-6 max-w-[60ch] text-[var(--ivory)] leading-relaxed">{service.intro.lead}</p>
              </Reveal>

              <div className="mt-5 space-y-4">
                {service.intro.body.map((p, i) => (
                  <Reveal key={p} delay={0.08 * (i + 1)}>
                    <p className="t-body max-w-[60ch] text-[var(--sage)] leading-relaxed">{p}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.08}>
                <blockquote className="mt-8 max-w-[60ch] border-t border-[var(--line)] pt-7">
                  <p className="font-display text-xl sm:text-2xl text-[var(--ivory)] font-light leading-snug">
                    &ldquo;Built over decades of international business experience, advising boards and executive teams across consequential matters.&rdquo;
                  </p>
                  <footer className="mt-4 flex items-center gap-3">
                    <span aria-hidden className="block h-px w-8 bg-[var(--brass)]" />
                    <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">SOFISAM FZCO</span>
                  </footer>
                </blockquote>
              </Reveal>
            </div>

            {/* The room is shown whole (3:2, its own proportion) on phones and
                tablets, under the copy; beside it, from xl, it takes 4:3 and 16:10 from
                2xl, trimming only the side walls so the table, chairs, both
                timber columns and the window wall all stay in frame. */}
            <figure className="xl:col-span-7">
              <ImageReveal>
                <div className="media aspect-[3/2] w-full border border-[var(--line)] shadow-[var(--shadow-plate)] xl:aspect-[4/3] 2xl:aspect-[16/10]">
                  <Picture
                    name="lounge-dark"
                    alt="A spacious meeting room with a long table, columns and a wide city view"
                    sizes="(min-width:1280px) 56vw, 100vw"
                    focal="50% 55%"
                    className="h-full w-full object-cover"
                  />
                </div>
              </ImageReveal>
              <figcaption className="t-meta mt-4 text-stone">
                Imagery is illustrative. No photograph on this site depicts a principal of the firm.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 03 — Corporate Governance: content (7 of 12) beside the tower (5 of 12) */}
      <section data-section="Corporate Governance" className="section ground-graphite border-b border-[var(--line-soft)]" aria-labelledby="adv-governance">
        <div className="shell">
          <div className="grid md:grid-cols-12 md:gap-x-[var(--gap)] lg:grid-rows-[auto_1fr_auto] lg:gap-x-[clamp(2.5rem,4vw,4.5rem)]">
            <div className="md:col-span-12 md:pb-10 lg:col-span-7 lg:pb-0 2xl:col-span-8">
              <div className="kicker">
                <p className="t-label">Corporate Governance</p>
              </div>

              <h2
                id="adv-governance"
                className="t-h2 mt-eyebrow text-[var(--ivory)] font-light leading-[1.08]"
              >
                <MaskedLines lines={['Governance is a working', 'system, not a document.']} />
              </h2>

              <Reveal delay={0.12}>
                <p className="t-body mt-5 max-w-[60ch] text-[var(--sage)] leading-relaxed">
                  We consider how authority, oversight, and accountability are actually distributed in practice, and whether that distribution matches the scale of the strategic decisions being made.
                </p>
              </Reveal>
            </div>

            <dl className="mt-10 grid gap-x-[var(--gap)] md:col-span-7 md:row-start-2 md:mt-0 lg:mt-10 lg:grid-cols-2 2xl:col-span-8">
              {governanceNotes.map((g, i) => (
                <Reveal key={g.t} delay={i * 0.06} className="border-t border-[var(--line)] py-5 lg:py-6">
                  <dt className="text-xs uppercase tracking-wider text-[var(--gold)] font-mono font-medium">
                    <span aria-hidden className="text-stone">{String(i + 1).padStart(2, '0')} / </span>
                    {g.t}
                  </dt>
                  <dd className="t-small mt-2 text-[var(--ivory-2)] leading-relaxed">{g.d}</dd>
                </Reveal>
              ))}
            </dl>

            {/* The tower takes its height from the content beside it: from md the
                frame is stretched to the governance grid's row(s) and contributes
                no height of its own (contain: size), so its bottom edge is the
                bottom of the last governance item. The crop is held near the top
                of the photograph, so the spire and the tower are kept and the
                length is taken from the reflection pool. Phones get a square. */}
            <figure
              aria-describedby="adv-governance-caption"
              className="mt-10 sm:max-w-[26rem] md:col-span-5 md:col-start-8 md:row-start-2 md:mt-0 md:max-w-none md:[contain:size] lg:row-span-2 lg:row-start-1 2xl:col-span-4 2xl:col-start-9"
            >
              <ImageReveal className="md:h-full">
                <div className="media group aspect-square w-full border border-[var(--line)] shadow-[var(--shadow-plate)] md:aspect-auto md:h-full">
                  <Picture
                    name="dubai-burj-khalifa-reflection"
                    alt="Burj Khalifa soaring vertically with symmetrical architectural reflection in Downtown Dubai"
                    sizes="(min-width:1536px) 30vw, (min-width:768px) 40vw, (min-width:640px) 416px, 100vw"
                    focal="50% 10%"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </ImageReveal>
            </figure>
            <p
              id="adv-governance-caption"
              className="mt-4 sm:max-w-[26rem] md:col-span-5 md:col-start-8 md:row-start-3 md:max-w-none 2xl:col-span-4 2xl:col-start-9"
            >
              <span className="block text-xs uppercase tracking-widest text-[var(--gold)] font-mono">
                Governance Structure
              </span>
              <span className="mt-1 block text-sm font-light text-[var(--ivory-2)]">
                Defensible frameworks designed for high-stakes decisions
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 04 — Advisory Perspective Themes */}
      <AdvisoryThemes themes={service.themes} />

      {/* 05 — Direct Ownership: the closing plate over the Gulf */}
      <section data-section="Experience" className="section ground-char border-b border-[var(--line-soft)]" aria-labelledby="adv-experience">
        <div className="shell">
          <ImageReveal>
            <div className="media group aspect-[3/2] w-full border border-[var(--line)] shadow-[var(--shadow-plate)] md:aspect-[16/9] lg:aspect-[21/9]">
              <Picture
                name="dubai-burj-al-arab-gulf"
                alt="Panoramic view of Burj Al Arab along the Dubai coastline over the Arabian Gulf"
                sizes="(min-width: 1600px) 1600px, 100vw"
                focal="38% 45%"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </ImageReveal>

          <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-y-8 lg:grid-cols-12 lg:gap-x-[clamp(2.5rem,4.5vw,5rem)]">
            <div className="lg:col-span-6">
              <Reveal kind="label" className="kicker">
                <p className="t-label">Direct Ownership</p>
              </Reveal>
              <h2 id="adv-experience" className="t-h2 mt-eyebrow max-w-[20ch] text-ivory">
                <MaskedLines lines={['The view of an owner, not a bystander.']} />
              </h2>
            </div>

            <div className="lg:col-span-5 lg:col-start-8 lg:pt-[2.25rem]">
              <Reveal delay={0.12}>
                <p className="t-body max-w-[52ch] text-[var(--sage)]">
                  Our principals bring unique perspectives to all of our mandates and investments — grounded in capital deployed and operating leadership.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8 border-t border-[var(--line)] pt-6">
                  <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-mono">
                    Principal Executive Standard
                  </span>
                  <p className="mt-1 font-display text-2xl text-[var(--ivory)] font-light">
                    Confidential Strategic Advisory
                  </p>
                  <span className="mt-3 block text-xs font-mono text-stone">
                    Dubai Multi Commodities Centre
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — Service Pager */}
      <ServicePager current="advisory" />
    </>
  );
}
