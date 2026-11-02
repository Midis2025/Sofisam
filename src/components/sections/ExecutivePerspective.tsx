'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Compass, Eye, Shield, Users } from 'lucide-react';
import Link from 'next/link';

import { Picture } from '@/components/ui/Picture';
import { MaskedLines } from '@/components/animations/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

const markers = [
  {
    k: '01',
    title: 'Decades of Experience',
    desc: 'International business experience is the foundation of our advice, built across economic cycles, jurisdictions, and ownership structures.',
    icon: Compass,
  },
  {
    k: '02',
    title: 'Executives & Investors',
    desc: 'Principals who have operated as both, bringing the decisive perspective of capital deployment rather than detached third-party commentary.',
    icon: Users,
  },
  {
    k: '03',
    title: 'Mandates & Investments',
    desc: 'The same rigorous executive standard is applied across every corporate engagement, restructuring mandate, and strategic partnership.',
    icon: Eye,
  },
  {
    k: '04',
    title: 'Unconflicted by Design',
    desc: 'Independence is a structural condition, not a stated intention. We hold no financial products to place and no competing corporate interests.',
    icon: Shield,
  },
];

/**
 * SOFISAM Executive Perspective
 *
 * Distinctive boardroom layout emphasizing:
 * - Direct principal operating and investment experience
 * - 4 interactive principle pillars with subtle metallic hover states
 * - Boardroom imagery with scroll-linked parallax depth
 */
export function ExecutivePerspective() {
  const reduce = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section
      data-section="Executive Perspective"
      id="perspective"
      className="relative bg-[var(--char)] py-20 sm:py-24 lg:py-28 border-b border-[var(--line-soft)]"
      aria-labelledby="perspective-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <div className="max-w-[52rem]">
          <div className="kicker">
            <p className="t-label">
              Executive Perspective
            </p>
          </div>

          <h2
            id="perspective-heading"
            className="mt-eyebrow t-h2 text-[var(--ivory)] font-light leading-[1.08]"
          >
            <MaskedLines lines={['Advice given by people who', 'have held the position.']} />
          </h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.16 }}
            className="mt-5 t-body text-[var(--sage)] max-w-[56ch] leading-relaxed"
          >
            Our principals are highly successful business executives and investors that bring unique perspectives to all of our mandates and investments.
          </motion.p>
        </div>

        {/* 2-Column Split: 4 Interactive Pillars (Left) + Parallax Plate (Right) */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14 items-stretch">
          {/* 4 Pillars Column */}
          <div className="lg:col-span-6 grid gap-5 sm:grid-cols-2">
            {markers.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.k}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
                  className="group relative flex flex-col justify-between p-7 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-plate)]"
                >
                  {/* Subtle Gold Indicator on Hover */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="t-label text-[var(--gold)]">
                        Principle
                      </span>
                      <Icon className="h-4 w-4 text-[var(--stone)] group-hover:text-[var(--gold)] transition-colors" />
                    </div>

                    <h3 className="mt-4 t-card text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                      {m.title}
                    </h3>
                    <p className="mt-2.5 t-small text-[var(--sage)] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-[var(--line-soft)] flex items-center justify-between text-[0.6875rem] text-[var(--stone)] uppercase tracking-wider">
                    <span>Advisory Ethos</span>
                    <span className="text-[var(--brass)] font-medium">SOFISAM</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: High-Resolution Boardroom Plate with Parallax */}
          <div ref={imageRef} className="lg:col-span-6 flex flex-col justify-between">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="relative h-full min-h-[24rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--graphite)] shadow-[var(--shadow-plate)]"
            >
              <motion.div
                className="h-full w-full"
                style={reduce ? undefined : { scale: imgScale, y: imgY }}
              >
                <Picture
                  name="exec-boardroom-sunset"
                  alt="Executives in discussion around a boardroom table with Dubai sunset skyline through the glass"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  focal="30% 55%"
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 flex items-baseline justify-between text-white z-10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#e8c89b] font-mono">
                    Direct Ownership Vantage
                  </p>
                  <p className="mt-1 font-display text-lg text-white font-light">
                    Confidential Advice for Consequential Mandates
                  </p>
                </div>
                <Link
                  href="/services/advisory"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/90 hover:text-[#e8c89b] transition-colors"
                >
                  <span>Explore Advisory</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
