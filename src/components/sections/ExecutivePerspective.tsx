'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Picture } from '@/components/ui/Picture';

const EASE = [0.16, 1, 0.3, 1] as const;

const markers = [
  {
    k: '01',
    title: 'Decades of Experience',
    desc: 'International business experience is the foundation of the advice, built across varied economic cycles, jurisdictions, and ownership structures.',
  },
  {
    k: '02',
    title: 'Executives & Investors',
    desc: 'Principals who have operated as both, bringing the decisive perspective of capital deployment rather than detached third-party commentary.',
  },
  {
    k: '03',
    title: 'Mandates & Investments',
    desc: 'The same rigorous executive standard is applied across every corporate engagement, restructuring mandate, and strategic partnership.',
  },
  {
    k: '04',
    title: 'Unconflicted by Design',
    desc: 'Independence is a structural condition, not a stated intention. We hold no financial products to place and no competing corporate interests.',
  },
];

export function ExecutivePerspective() {
  const reduce = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%']);

  return (
    <section
      data-section="Executive Perspective"
      id="perspective"
      className="relative bg-[var(--char)] py-16 sm:py-20 lg:py-24 border-b border-[var(--line-soft)]"
      aria-labelledby="perspective-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <div className="max-w-[50rem]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="kicker"
          >
            <p className="t-label">
              Executive Perspective
            </p>
          </motion.div>

          <motion.h2
            id="perspective-heading"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
            className="mt-eyebrow t-h2 text-[var(--ivory)]"
          >
            Advice given by people who have held the position.
          </motion.h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
            className="mt-4 t-body text-[var(--sage)] max-w-[54ch]"
          >
            Our principals are highly successful business executives and investors that bring unique perspectives to all of our mandates and investments.
          </motion.p>
        </div>

        {/* 2-Column Split: Interactive 4-Pillar Grid (Left) + Parallax Plate (Right) */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12 items-stretch">
          {/* 4 Pillars Column */}
          <div className="lg:col-span-6 grid gap-5 sm:grid-cols-2">
            {markers.map((m, i) => (
              <motion.div
                key={m.k}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
                className="group relative flex flex-col justify-between p-6 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-plate)]"
              >
                {/* Thin gold top accent on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--brass)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                />

                <div>
                  <h3 className="t-card text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors">
                    {m.title}
                  </h3>
                  <p className="mt-2 t-small text-[var(--sage)]">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[var(--line-soft)] flex items-center justify-between text-[0.6875rem] text-[var(--stone)] uppercase tracking-wider">
                  <span>Principle</span>
                  <span className="text-[var(--brass)]">SOFISAM</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: High-Resolution Boardroom Plate with Subtle Scale */}
          <div ref={imageRef} className="lg:col-span-6 flex flex-col justify-between">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
              className="relative h-full min-h-[22rem] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--graphite)] shadow-[var(--shadow-plate)]"
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
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-baseline justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#e8c89b] font-medium">
                    Principal Vantage
                  </p>
                  <p className="mt-1 text-sm font-light text-white/95">
                    Unconflicted Counsel in Consequential Matters
                  </p>
                </div>
                <span className="text-xs text-white/70 hidden sm:block">
                  Direct Operating Experience
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
