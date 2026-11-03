'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { Picture } from '@/components/ui/Picture';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';

const EASE = [0.16, 1, 0.3, 1] as const;

interface CoreArea {
  index: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** object-position for the card crop */
  focal?: string;
  href: string;
  cta: string;
}

const coreAreas: CoreArea[] = [
  {
    index: '01',
    category: 'Headquarters & Platform',
    title: 'Dubai — DMCC Hub',
    description:
      'From our world headquarters in the Dubai Multi Commodities Centre, our relationships and partnerships span the globe, bridging key international financial centers.',
    image: 'jlt-dusk',
    imageAlt: 'The towers of Jumeirah Lake Towers at dusk over the lake',
    href: '/about',
    cta: 'Explore Headquarters',
  },
  {
    index: '02',
    category: 'Core Discipline',
    title: 'Strategic Consulting',
    description:
      'Providing confidential, unconflicted strategic advice to navigate complex global markets, evaluate commercial risks, and make critical business decisions.',
    image: 'dubai-museum-atrium',
    imageAlt: 'Museum of the Future grand interior atrium with illuminated Arabic calligraphy and flowing architectural curves',
    focal: '50% 45%',
    href: '/services/strategic-consulting',
    cta: 'Explore Consulting',
  },
  {
    index: '03',
    category: 'Core Discipline',
    title: 'Corporate Advisory',
    description:
      'Leveraging decades of international business experience to guide executive decision-making, shareholder alignment, and corporate governance.',
    image: 'capital-columns',
    imageAlt: 'Classical stone columns of an institutional facade',
    focal: '50% 50%',
    href: '/services/advisory',
    cta: 'Explore Advisory',
  },
  {
    index: '04',
    category: 'Core Discipline',
    title: 'Structuring',
    description:
      'Expert structuring for mandates and investments, built on proven executive frameworks designed to withstand complex cross-border conditions.',
    image: 'gold-lattice',
    imageAlt: 'Ordered bronze facade grid of a contemporary office building',
    focal: '50% 50%',
    href: '/services/structuring',
    cta: 'Explore Structuring',
  },
  {
    index: '05',
    category: 'Executive Perspective',
    title: 'Mandates & Investments',
    description:
      'Advice given from the vantage point of principals and business executives who have held positions and deployed capital rather than only advising on them.',
    image: 'dubai-investor-outreach',
    imageAlt: 'Executives presenting to an audience in a boardroom overlooking the Dubai skyline at night',
    focal: '50% 50%',
    href: '/services/structuring',
    cta: 'Explore Mandates',
  },
];

/**
 * SOFISAM Core Capabilities Showcase
 *
 * Asymmetric editorial showcase layout:
 * - Large featured headline showcase for Core Platform (Dubai DMCC)
 * - 4-grid supporting disciplines with distinct proportions and luxury hover states
 * - Preserves verified business facts without inventing clients or transactions
 */
export function OurWork() {
  const reduce = useReducedMotion();
  const [featured, ...supporting] = coreAreas;

  return (
    <section
      data-section="Capabilities"
      id="core-areas"
      className="relative bg-[var(--char)] py-20 sm:py-24 lg:py-28 border-b border-[var(--line-soft)]"
      aria-labelledby="core-areas-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <SectionHeader
          ruled
          label="Capabilities & Reach"
          heading="Core foundations and disciplines of the firm."
          headingId="core-areas-heading"
          copy="Five core foundations and disciplines through which SOFISAM advises boards, principals, and international corporate clients."
        />

        {/* Asymmetric Showcase Grid */}
        <div className="mt-12 space-y-8">
          {/* Featured Large Plate: 01 Dubai Platform */}
          <motion.article
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.75, ease: EASE }}
            className="group relative overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)] grid lg:grid-cols-12 items-stretch transition-all duration-300 hover:border-[var(--line-strong)]"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-500 ease-out group-hover:scale-x-100"
            />

            {/* Content (Left Column on Desktop, First on Mobile) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10 order-1">
              <div>
                <div className="flex items-center justify-between">
                  <span className="t-label text-[var(--gold)]">
                    Platform
                  </span>
                  <span className="text-[0.6875rem] uppercase tracking-wider text-[var(--stone)] font-mono">
                    {featured.category}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl sm:text-3xl text-[var(--ivory)] font-light group-hover:text-[var(--gold)] transition-colors leading-snug">
                  {featured.title}
                </h3>
                <p className="mt-3 t-body text-[var(--sage)] leading-relaxed">
                  {featured.description}
                </p>

                {/* Platform Highlights */}
                <div className="mt-5 grid grid-cols-2 gap-4 py-3.5 border-y border-[var(--line)]">
                  <div>
                    <span className="text-[0.6875rem] uppercase tracking-wider text-[var(--stone)] font-mono block">
                      Jurisdiction
                    </span>
                    <span className="text-xs text-[var(--ivory)] font-medium mt-0.5 block">
                      DMCC Free Zone
                    </span>
                  </div>
                  <div>
                    <span className="text-[0.6875rem] uppercase tracking-wider text-[var(--stone)] font-mono block">
                      Strategic Hub
                    </span>
                    <span className="text-xs text-[var(--ivory)] font-medium mt-0.5 block">
                      Crossroads of Time Zones
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between">
                <span className="text-xs text-[var(--stone)]">SOFISAM Global Base</span>
                <Button variant="link" href={featured.href}>
                  {featured.cta}
                </Button>
              </div>
            </div>

            {/* Media Plate (Right Column on Desktop, Below on Mobile) */}
            {/* Out-of-flow image: on lg the plate matches the content column
                instead of the photograph's own ratio stretching the card. */}
            <div className="relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-auto lg:col-span-7 lg:min-h-[20rem] overflow-hidden bg-[var(--graphite)] order-2">
              <Picture
                name={featured.image}
                alt={featured.imageAlt}
                sizes="(min-width: 1024px) 60vw, 100vw"
                focal="50% 60%"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent lg:hidden"
              />
              <div className="absolute top-4 right-4 hidden lg:flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-[var(--r-sm)] border border-white/20 text-white text-[0.6875rem] font-mono uppercase tracking-wider">
                <span>JLT, Dubai · 500001</span>
              </div>
            </div>
          </motion.article>

          {/* 4 Supporting Disciplines in 2x2 Grid */}
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
            {supporting.map((item, i) => (
              <motion.article
                key={item.index}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.09 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-plate)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                />

                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--graphite)]">
                  <Picture
                    name={item.image}
                    alt={item.imageAlt}
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    focal={item.focal}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="t-label text-gold">
                      {item.category}
                    </p>
                    <h3 className="mt-2.5 t-card text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 t-small text-[var(--sage)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between">
                    <span className="text-[0.6875rem] text-[var(--stone)] uppercase tracking-wider">Practice</span>
                    <Button variant="link" size="sm" href={item.href}>
                      {item.cta}
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
