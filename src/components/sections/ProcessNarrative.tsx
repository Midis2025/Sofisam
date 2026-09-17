'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { Reveal } from '@/components/animations/Reveal';
import { SplitText } from '@/components/animations/SplitText';

/**
 * Way of working.
 *
 * Wording is kept deliberately generic to the advisory process itself — it
 * does not claim any service, permission or capability beyond what SOFISAM
 * states about strategic consulting, advisory and structuring.
 *
 * On a desktop the five steps are a horizontal sequence: the frame pins and
 * the rail travels sideways as the page scrolls, so the reader moves through
 * the order rather than down a list. Below that width — and under reduced
 * motion, where pinning would strand the content — the same five steps are an
 * ordinary vertical ledger. Every description is visible in both.
 */
const steps = [
  {
    k: '01',
    title: 'Understand',
    body: 'What is actually being decided, who carries it, and what the constraints really are — as opposed to how they were described.',
  },
  {
    k: '02',
    title: 'Evaluate',
    body: 'The position tested from the outside. What has to be true, what it costs if it is not, and which parts become difficult to reverse.',
  },
  {
    k: '03',
    title: 'Structure',
    body: 'Intent expressed in a form that behaves predictably: authority, accountability and terms that remain legible at the edges.',
  },
  {
    k: '04',
    title: 'Advise',
    body: 'A clear recommendation with the reasoning attached, given confidentially and without a competing interest behind it.',
  },
  {
    k: '05',
    title: 'Support',
    body: 'Remaining available while the decision is carried out, because the difficult questions rarely arrive on the day it is made.',
  },
];

export function ProcessNarrative() {
  const reduce = useReducedMotion();

  return (
    <section data-section="Way of Working" className="section ground-char" aria-labelledby="process-heading">
      <div className="shell">
        <div className="head">
          <div>
            <Reveal kind="label" className="kicker">
              <p className="t-label">Way of Working</p>
            </Reveal>
            <SplitText
              as="h2"
              text="A sequence, not a methodology."
              className="t-h2 head-title mt-[clamp(1.25rem,2.6vw,2rem)] text-ivory"
              stagger={0.05}
            />
          </div>
          <div className="lg:pb-2">
            <Reveal delay={0.1}>
              <p className="t-body head-note text-sage">
                Every engagement is different. The order in which we think about one
                rarely is.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {reduce ? (
        <div className="shell">
          <Ledger />
        </div>
      ) : (
        <>
          <div className="shell lg:hidden">
            <Ledger />
          </div>
          <HorizontalRail />
        </>
      )}
    </section>
  );
}

/**
 * The pinned rail.
 *
 * The travel is measured rather than guessed: the distance is the overflow of
 * the rail past the viewport, and the scroll track is made exactly that much
 * taller than one screen. Scrolling and travelling therefore move
 * one-for-one — the sequence never races ahead of the page or lags behind it,
 * at any viewport width.
 */
function HorizontalRail() {
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    // The rail's own overflow past the window, plus one gutter so the last
    // card finishes clear of the right edge.
    const gutter = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    setDistance(Math.max(0, el.scrollWidth - window.innerWidth + gutter));
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (rail.current) ro.observe(rail.current);
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      ref={track}
      className="mt-[var(--pad-sm)] hidden lg:block"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.ol
          ref={rail}
          style={{ x }}
          className="flex w-max gap-[clamp(1.5rem,3vw,3rem)] px-[var(--gutter)]"
        >
          {steps.map((s, i) => (
            <li
              key={s.k}
              className={`group ${
                i % 2 === 1 ? 'surface-tint' : 'surface'
              } surface-lift flex h-[clamp(22rem,54vh,34rem)] w-[clamp(20rem,26vw,28rem)] shrink-0 flex-col justify-between p-[clamp(1.5rem,2.2vw,2.25rem)]`}
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className="t-num text-[clamp(3.5rem,5.5vw,6.5rem)] text-gold/55 transition-colors duration-700 group-hover:text-gold">
                  {s.k}
                </span>
                <span className="chip">
                  {i + 1} / {steps.length}
                </span>
              </span>

              <span className="block">
                <h3 className="t-h3 text-ivory">{s.title}</h3>
                <p className="t-body mt-5 max-w-[34ch] text-sage">{s.body}</p>
              </span>
            </li>
          ))}
        </motion.ol>

        {/* The rail's own progress, drawn along the bottom of the frame. */}
        <div
          aria-hidden
          className="absolute inset-x-[var(--gutter)] bottom-[clamp(3rem,9vh,6rem)] h-px bg-[var(--line)]"
        >
          <motion.span
            style={{ width: progress }}
            className="absolute inset-y-0 left-0 block bg-gold"
          />
        </div>
      </div>
    </div>
  );
}

/** The vertical form of the same five steps. */
function Ledger() {
  return (
    <ol className="mt-[var(--pad-sm)] grid gap-x-[clamp(1.5rem,2.4vw,2.5rem)] gap-y-9 border-l border-[var(--line)] pl-6 sm:grid-cols-2 sm:gap-y-12 sm:border-l-0 sm:pl-0">
      {steps.map((s, i) => (
        <Reveal
          as="li"
          key={s.k}
          delay={i * 0.07}
          className="group relative transition-colors duration-500 sm:border-t sm:border-[var(--line)] sm:pt-7 sm:last:col-span-2 sm:hover:border-gold"
        >
          <span
            aria-hidden
            className="absolute -left-[1.6rem] top-[0.4rem] block h-[0.4rem] w-[0.4rem] rounded-full bg-gold sm:-top-[0.2rem] sm:left-0"
          />
          <span className="t-num block text-[0.82rem] text-gold">{s.k}</span>
          <h3 className="t-h4 mt-3.5 text-ivory">{s.title}</h3>
          <p className="t-small mt-3.5 max-w-[34ch] text-sage">{s.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
