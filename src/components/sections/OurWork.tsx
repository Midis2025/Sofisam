'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { Picture } from '@/components/ui/Picture';

const EASE = [0.16, 1, 0.3, 1] as const;

interface CoreArea {
  index: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
}

const coreAreas: CoreArea[] = [
  {
    index: '01',
    category: 'Headquarters & Base',
    title: 'Dubai — DMCC',
    description:
      'From our world headquarters in the Dubai Multi Commodities Centre, our relationships and partnerships span the globe, bridging major international financial centers.',
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
      'Providing confidential, unconflicted strategic advice to navigate complex global markets, evaluate risks, and make critical business decisions.',
    image: 'city-blue-night',
    imageAlt: 'Financial district illuminated at night',
    href: '/services/strategic-consulting',
    cta: 'Explore Consulting',
  },
  {
    index: '03',
    category: 'Core Discipline',
    title: 'Corporate Advisory',
    description:
      'Leveraging decades of international business experience to guide executive decision-making, shareholder alignment, and corporate governance.',
    image: 'boardroom-leather',
    imageAlt: 'Executive conference boardroom table and leather seating',
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
    imageAlt: 'Architectural lattice and structural grid',
    href: '/services/structuring',
    cta: 'Explore Structuring',
  },
  {
    index: '05',
    category: 'Executive Perspective',
    title: 'Mandates & Investments',
    description:
      'Advice given from the vantage point of principals and business executives who have held positions and deployed capital rather than only advising on them.',
    image: 'capital-columns',
    imageAlt: 'Colonnade and architectural columns representing institutional permanence',
    href: '/services/structuring',
    cta: 'Explore Mandates',
  },
];

export function OurWork() {
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Core Areas"
      id="core-areas"
      className="relative bg-[var(--char)] py-16 sm:py-20 lg:py-24 border-b border-[var(--line-soft)]"
      aria-labelledby="core-areas-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-[var(--line)]">
          <div>
            <div className="kicker">
              <p className="t-label">
                Our Work
              </p>
            </div>
            <h2
              id="core-areas-heading"
              className="mt-eyebrow t-h2 text-[var(--ivory)]"
            >
              Core Areas &amp; Capabilities
            </h2>
          </div>
          <p className="max-w-[44ch] t-body text-[var(--sage)]">
            Five core foundations and disciplines through which SOFISAM advises boards, principals, and international corporate clients.
          </p>
        </div>

        {/* 5-Card Editorial Grid: 3 on top row, 2 on bottom row on desktop */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {coreAreas.slice(0, 3).map((item, i) => (
            <motion.article
              key={item.index}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-plate)]"
            >
              {/* Thin gold top accent */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
              />

              {/* Media container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--graphite)]">
                <Picture
                  name={item.image}
                  alt={item.imageAlt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                />
              </div>

              {/* Text content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="t-label text-gold">
                    {item.category}
                  </p>
                  <h3 className="mt-2 t-card text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 t-small text-[var(--sage)]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="text-[0.6875rem] text-[var(--stone)] uppercase tracking-wider">Advisory Practice</span>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors"
                  >
                    <span>{item.cta}</span>
                    <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}

          {/* Bottom 2 items */}
          {coreAreas.slice(3, 5).map((item, i) => (
            <motion.article
              key={item.index}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.25 + i * 0.1 }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-plate)] ${
                i === 0 ? 'lg:col-span-1' : 'lg:col-span-2'
              }`}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
              />

              <div className={`relative w-full overflow-hidden bg-[var(--graphite)] ${
                i === 0 ? 'aspect-[16/10]' : 'aspect-[16/10] sm:aspect-[21/9]'
              }`}>
                <Picture
                  name={item.image}
                  alt={item.imageAlt}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
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
                  <h3 className="mt-2 t-card text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 t-small text-[var(--sage)] max-w-[65ch]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="text-[0.6875rem] text-[var(--stone)] uppercase tracking-wider">Mandates &amp; Frameworks</span>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors"
                  >
                    <span>{item.cta}</span>
                    <ArrowUpRight aria-hidden strokeWidth={1.5} className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
