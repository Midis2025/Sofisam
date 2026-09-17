'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

import { Picture } from '@/components/ui/Picture';
import { Reveal } from '@/components/animations/Reveal';
import { SplitText } from '@/components/animations/SplitText';

/**
 * Way of working.
 *
 * Wording is kept deliberately generic to the advisory process itself — it
 * does not claim any service, permission or capability beyond what SOFISAM
 * states about strategic consulting, advisory and structuring.
 *
 * Each step carries a photograph chosen for what the step actually is, and
 * every one of the five is an architectural frame already held in the site's
 * own library: the city read from above, the gate of a financial district, a
 * structure seen as pure geometry, a considered interior, and a tower still
 * lit at night. None of them is used elsewhere on this page, so the sequence
 * reads as five distinct places rather than as one photograph repeated.
 *
 * On a desktop the five are a horizontal sequence: the frame pins and the rail
 * travels sideways as the page scrolls, so the reader moves through the order
 * rather than down a list. Below that width they are a carousel the thumb
 * drags, one card at a time with the next one showing. Under reduced motion —
 * where pinning would strand the content and a drag is not an animation to
 * suppress — they are an ordinary vertical stack. Every description is
 * visible in all three.
 */
const steps = [
  {
    k: '01',
    title: 'Understand',
    body: 'What is actually being decided, who carries it, and what the constraints really are — as opposed to how they were described.',
    /* The city read whole, from above: the position as it actually is rather
       than as it was described. An aerial also happens to be the one frame in
       the library with detail everywhere, so the tall crop a card takes lands
       on something wherever it falls. */
    image: 'hero-dubai',
    focal: '50% 52%',
  },
  {
    k: '02',
    title: 'Evaluate',
    body: 'The position tested from the outside. What has to be true, what it costs if it is not, and which parts become difficult to reverse.',
    /* The gate of a financial district — a threshold, read from outside it. */
    image: 'difc-gate',
    focal: '50% 46%',
  },
  {
    k: '03',
    title: 'Structure',
    body: 'Intent expressed in a form that behaves predictably: authority, accountability and terms that remain legible at the edges.',
    /* A structure as pure geometry: the form, with nothing else in the frame. */
    image: 'spiral-dark',
    focal: '50% 50%',
  },
  {
    k: '04',
    title: 'Advise',
    body: 'A clear recommendation with the reasoning attached, given confidentially and without a competing interest behind it.',
    /* A considered interior, lit low. Where counsel is actually given. */
    image: 'lounge-dark',
    focal: '52% 48%',
  },
  {
    k: '05',
    title: 'Support',
    body: 'Remaining available while the decision is carried out, because the difficult questions rarely arrive on the day it is made.',
    /* Floors still lit after hours: the work that continues after the advice. */
    image: 'tower-detail',
    focal: '50% 50%',
  },
];

type Step = (typeof steps)[number];

/* Card geometry, declared once. The rail, the carousel and the stack differ in
   how they are laid out, never in what a card is. */
const RAIL_CARD = 'h-[clamp(30rem,58vh,35rem)] w-[clamp(22.5rem,25vw,28rem)]';
const SWIPE_CARD = 'h-[clamp(28rem,64vh,34rem)] w-[86vw] max-w-[25rem]';
const STACK_CARD = 'h-[clamp(26rem,58vh,32rem)] w-full max-w-[28rem]';

export function ProcessNarrative() {
  const reduce = useReducedMotion();

  return (
    <section
      data-section="Way of Working"
      // No `overflow-hidden` here, however tempting: an ancestor that clips
      // becomes the scrollport for anything sticky inside it, which would
      // quietly stop the rail below from pinning at all.
      className="section ground-char grain relative"
      aria-labelledby="process-heading"
    >
      {/* Atmosphere behind the cards: one very low radial, so the gallery sits
          in a room rather than on a flat ground. It is not a light source and
          nothing is lit by it. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_38%,rgba(201,169,124,0.05)_0%,rgba(201,169,124,0.018)_38%,transparent_72%)]"
      />

      <div className="shell relative z-[4]">
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
        <div className="shell relative z-[4]">
          <Stack />
        </div>
      ) : (
        <>
          <Carousel />
          <HorizontalRail />
        </>
      )}
    </section>
  );
}

/* ==========================================================================
   The card
   ========================================================================== */

/**
 * One step, as a cinematic frame.
 *
 * The photograph is the card — it is not a texture behind one — so everything
 * over it earns its opacity. Two scrims do the carrying: a tall one rising
 * from the foot, where the title and the description sit, and a short one at
 * the head for the number. Between them the picture is left alone, which is
 * the part that has to stay visible for the card to be worth having.
 *
 * A card that is not the current one is held back rather than hidden: the
 * photograph loses a little light and gains a thin veil, and that is all. At
 * no point is one of the five unreadable.
 */
function StepCard({
  s,
  i,
  active,
  reduce,
  className = '',
  sizes,
}: {
  s: Step;
  i: number;
  active: boolean;
  reduce: boolean | null;
  className?: string;
  sizes: string;
}) {
  const last = i === steps.length - 1;

  return (
    <div
      className={`group relative isolate flex shrink-0 flex-col overflow-hidden rounded-[var(--r-lg)] border transition-[transform,border-color,box-shadow] duration-700 ease-premium ${className} ${
        active
          ? 'border-gold/40 shadow-[var(--depth-2),0_0_0_1px_rgba(201,169,124,0.12)]'
          : 'border-ivory/10 shadow-[var(--depth-1)]'
      } ${reduce ? '' : 'hover:-translate-y-1.5 hover:border-ivory/28 hover:shadow-[var(--depth-2)]'}`}
    >
      {/* ---------- The photograph ---------- */}
      <div
        className={`absolute inset-0 -z-10 ${
          reduce
            ? ''
            : 'transition-[transform,filter] duration-[900ms] ease-premium group-hover:scale-[1.06]'
        } ${
          active
            ? '[filter:saturate(0.94)_contrast(1.03)_brightness(1.04)]'
            : '[filter:saturate(0.82)_contrast(1.03)_brightness(0.9)]'
        }`}
      >
        <Picture
          name={s.image}
          alt=""
          decorative
          sizes={sizes}
          focal={s.focal}
          className="h-full w-full object-cover"
        />
      </div>

      {/* ---------- The scrims ----------
          Dense across the foot, a short one at the head, and a vignette to
          close the corners. The middle of the frame is left open. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(5,5,5,0.94)_0%,rgba(5,5,5,0.87)_18%,rgba(5,5,5,0.6)_34%,rgba(5,5,5,0.28)_50%,rgba(5,5,5,0.1)_68%,transparent_100%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.58)_0%,rgba(5,5,5,0.26)_15%,transparent_36%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_48%,rgba(5,5,5,0.3)_100%)]"
      />
      {/* The veil that holds an inactive card back. */}
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 bg-ink transition-opacity duration-700 ease-premium ${
          active ? 'opacity-0' : 'opacity-[0.14]'
        } ${reduce ? '' : 'group-hover:opacity-0'}`}
      />
      {/* Light on the upper rim — the card as an object, not a rectangle. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[var(--r-lg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.02)]"
      />

      {/* ---------- The content ---------- */}
      <div className="relative flex h-full flex-col justify-between p-[clamp(1.35rem,1.9vw,2rem)]">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`t-num text-[clamp(3rem,4.4vw,5rem)] leading-[0.9] transition-colors duration-700 ease-premium ${
              active ? 'text-gold' : 'text-gold/55'
            } ${reduce ? '' : 'group-hover:text-gold'}`}
          >
            {s.k}
          </span>
          <span
            className={`chip shrink-0 bg-[rgba(6,6,8,0.5)] backdrop-blur-md ${
              active ? 'border-gold/40 text-gold' : ''
            }`}
          >
            {i + 1} / {steps.length}
          </span>
        </div>

        <div>
          <h3 className="t-h3 text-ivory">{s.title}</h3>
          <p className="t-body mt-4 max-w-[34ch] text-ivory/75">{s.body}</p>

          {/* The sequence continues. Not a control — nothing here is pressable
              — so it is a rule that reaches forward rather than an arrow
              inviting a click, and the last card does not carry one. */}
          {!last && (
            <span
              aria-hidden
              className="mt-[clamp(1.1rem,1.6vw,1.6rem)] flex items-center gap-2"
            >
              <span
                className={`block h-px transition-all duration-700 ease-premium ${
                  active ? 'w-9 bg-gold/70' : 'w-6 bg-ivory/25'
                } ${reduce ? '' : 'group-hover:w-12 group-hover:bg-gold/70'}`}
              />
              <span
                className={`block h-1.5 w-1.5 rotate-45 border-r border-t transition-colors duration-700 ease-premium ${
                  active ? 'border-gold/70' : 'border-ivory/25'
                } ${reduce ? '' : 'group-hover:border-gold/70'}`}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Desktop — the pinned rail
   ========================================================================== */

/**
 * The travel is measured rather than guessed: the distance is the overflow of
 * the rail past the viewport, and the scroll track is made exactly that much
 * taller than one screen. Scrolling and travelling therefore move
 * one-for-one — the sequence never races ahead of the page or lags behind it,
 * at any viewport width.
 *
 * Which card is current is arithmetic on measured offsets, not a rect read per
 * frame: the centres are taken once per layout and compared against the
 * travel, so the pointer stays on the card in the middle of the frame without
 * the scroll handler ever touching the DOM.
 */
function HorizontalRail() {
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const centres = useRef<number[]>([]);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    // The rail's own overflow past the window, plus one gutter so the last
    // card finishes clear of the right edge.
    const gutter = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    setDistance(Math.max(0, el.scrollWidth - window.innerWidth + gutter));
    centres.current = Array.from(el.children).map((c) => {
      const li = c as HTMLElement;
      return li.offsetLeft + li.offsetWidth / 2;
    });
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

  useMotionValueEvent(x, 'change', (v) => {
    const cs = centres.current;
    if (cs.length === 0) return;
    const mid = window.innerWidth / 2;
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < cs.length; i++) {
      const d = Math.abs(cs[i] + v - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    setActive((prev) => (prev === best ? prev : best));
  });

  return (
    <div
      ref={track}
      className="relative z-[4] mt-[var(--pad-sm)] hidden lg:block"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.ol
          ref={rail}
          style={{ x }}
          className="flex w-max gap-[clamp(1.5rem,3vw,3rem)] px-[var(--gutter)]"
        >
          {steps.map((s, i) => (
            <li key={s.k} className={`${RAIL_CARD} shrink-0`}>
              <StepCard
                s={s}
                i={i}
                active={i === active}
                reduce={false}
                className="h-full w-full"
                sizes="(min-width: 1600px) 28rem, 25vw"
              />
            </li>
          ))}
        </motion.ol>

        {/* The rail's own progress, drawn along the bottom of the frame. */}
        <Progress value={progress} className="absolute inset-x-[var(--gutter)] bottom-[clamp(3rem,9vh,6rem)]" />
      </div>
    </div>
  );
}

/* ==========================================================================
   Below 1024 — the carousel
   ========================================================================== */

/**
 * One card at a time, the next one showing at the edge so the sequence
 * announces that it continues.
 *
 * The scrolling is the browser's own, with snap points — it is the thumb
 * moving the cards, not a script, so it keeps its momentum and its rubber
 * band and it costs nothing. The carousel sits outside the container and
 * pads itself by one gutter, so the cards line up with the text above while
 * the scroll area still runs edge to edge. Only this strip scrolls: the page
 * itself never gains a horizontal axis.
 */
function Carousel() {
  const scroller = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestD = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const li = c as HTMLElement;
      const d = Math.abs(li.offsetLeft + li.offsetWidth / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive((prev) => (prev === best ? prev : best));
  }, []);

  return (
    <div className="relative z-[4] mt-[var(--pad-sm)] lg:hidden">
      <ol
        ref={scroller}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-[clamp(0.875rem,3vw,1.5rem)] overflow-x-auto scroll-smooth px-[var(--gutter)] pb-2 [scroll-padding-left:var(--gutter)]"
      >
        {steps.map((s, i) => (
          <li key={s.k} className={`${SWIPE_CARD} shrink-0 snap-start`}>
            <StepCard
              s={s}
              i={i}
              active={i === active}
              reduce={false}
              className="h-full w-full"
              sizes="(min-width: 640px) 25rem, 86vw"
            />
          </li>
        ))}
      </ol>

      <div className="shell mt-[clamp(1.25rem,3vw,1.75rem)]">
        <Progress
          value={`${((active + 1) / steps.length) * 100}%`}
          eased
          className="relative"
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   Reduced motion — the stack
   ========================================================================== */

/** The same five frames, one under the next, with nothing moving. */
function Stack() {
  return (
    <ol className="mt-[var(--pad-sm)] grid justify-items-center gap-[clamp(1.25rem,3vw,2rem)] sm:grid-cols-2 sm:justify-items-stretch">
      {steps.map((s, i) => (
        <li key={s.k} className={`${STACK_CARD} sm:last:col-span-2 sm:last:max-w-none`}>
          <StepCard
            s={s}
            i={i}
            active
            reduce
            className="h-full w-full"
            sizes="(min-width: 640px) 28rem, 90vw"
          />
        </li>
      ))}
    </ol>
  );
}

/* ========================================================================== */

/**
 * The hairline the sequence draws itself along.
 *
 * `eased` is only for the carousel, where the value steps from one card to the
 * next and wants smoothing. The rail's value is already the scroll position,
 * arriving every frame: a CSS transition on top of that would chase its own
 * target and leave the bar permanently lagging the cards it is reporting on.
 */
function Progress({
  value,
  eased = false,
  className = '',
}: {
  value: MotionValue<string> | string;
  eased?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={`h-px bg-[var(--line)] ${className}`}>
      <motion.span
        style={{ width: value }}
        className={`absolute inset-y-0 left-0 block bg-gold ${
          eased ? 'transition-[width] duration-500 ease-premium' : ''
        }`}
      />
    </div>
  );
}
