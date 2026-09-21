'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

import { Picture } from '@/components/ui/Picture';
import { Reveal, ImageReveal } from '@/components/animations/Reveal';
import { SplitText } from '@/components/animations/SplitText';

/**
 * Stat-free credibility markers, drawn only from stated facts.
 *
 * Each one carries a plate. The four are four different kinds of building at
 * four different times of day — a district in morning haze, a facade at dusk,
 * two towers at night, a structural screen in flat daylight — which matters
 * more here than it did before: the strip shows three of them at once, so the
 * set has to read as four places rather than four crops of one.
 */
const markers = [
  {
    t: 'Decades of experience',
    d: 'International business experience is the foundation of the advice.',
    /* An established waterfront district in the morning: the settled,
       long-standing environment the experience was gathered in. */
    image: 'business-bay',
    alt: 'An established waterfront business district in morning haze, its towers standing along the water',
    focal: '50% 40%',
  },
  {
    t: 'Executives and investors',
    d: 'Principals who have operated as both, not one or the other.',
    /* A curtain wall at dusk with one floor open to view, the table laid and
       the room empty — the position itself, with nobody standing in for the
       people who have held it. */
    image: 'tower-dusk',
    alt: 'A corporate facade at dusk, one lit floor visible behind the glass with its meeting table set out',
    focal: '50% 52%',
  },
  {
    t: 'Mandates and investments',
    d: 'The same perspective is applied across every engagement.',
    /* Two towers of floors still lit after hours: every engagement carried at
       once, and all of them the same way. */
    image: 'tower-detail',
    alt: 'Two corporate towers at night, their floors still lit across the whole of both facades',
    focal: '50% 50%',
  },
  {
    t: 'Unconflicted by design',
    d: 'Independence is a structural condition, not a stated intention.',
    /* A structural screen, straight on: independence as something built into
       the thing rather than stated about it. */
    image: 'lattice-white',
    alt: 'A pale concrete lattice screen on an institutional facade, seen straight on',
    focal: '50% 48%',
  },
];

type Marker = (typeof markers)[number];

const N = markers.length;

/**
 * The shape of the scroll.
 *
 * `pos` is a continuous position along the strip, 0 → N-1, and it is what
 * every value in this file is derived from: the plate at `pos` is centred and
 * sharp, and a plate's distance from `pos` decides how far back it sits.
 *
 * The mapping from scroll to `pos` is deliberately not linear. One hold per
 * position and one transition between each pair account for the whole track,
 * so a position arrives, stops dead long enough to be read, and only then
 * hands over — the difference between a sequence and a conveyor belt. Every
 * position gets the same plateau, the last one included, so the fourth is held
 * and read rather than arriving just as the section lets go of the frame.
 */
const HOLD_W = 0.13;
const TRANS_W = (1 - N * HOLD_W) / (N - 1);

function posKeys(): [number[], number[]] {
  const at: number[] = [];
  const to: number[] = [];
  let mark = 0;
  for (let k = 0; k < N; k++) {
    at.push(mark);
    to.push(k);
    mark += HOLD_W;
    at.push(mark);
    to.push(k);
    if (k < N - 1) mark += TRANS_W;
  }
  at[at.length - 1] = 1;
  return [at, to];
}

/** How far back a plate sits, 0 at the centre and 1 one slot away or more. */
const recede = (d: number) => Math.min(Math.abs(d), 1);

/**
 * A plate's distance from the standing position, taken the short way round.
 *
 * The strip is a ring rather than a line, so the fourth plate stands to the
 * left of the first and the first to the right of the fourth: at either end of
 * the sequence the frame has a neighbour on both sides and is composed rather
 * than half empty. The two are only ever a preview of each other — the words,
 * the rule and the order of the section are all still 01 → 04.
 *
 * A plate changes sides when it is exactly half the ring away, which at four
 * plates is two slots out. That is far enough off the edge of the frame at
 * every width that the swap is never on screen.
 */
function wrap(d: number) {
  const m = ((d % N) + N) % N;
  return m > N / 2 ? m - N : m;
}

/**
 * The same value, kept on Motion's own frame loop.
 *
 * A value interpolated linearly from `useScroll` carries an `accelerate`
 * descriptor, and Motion binds it to a native animation on a view timeline for
 * any property in its accelerated set — opacity, clip-path, filter, transform
 * and background-color. On a stage that is `sticky` for several viewports that
 * timeline measures the stage's own time in view rather than the track's, so
 * it barely moves and the property freezes a few per cent in. Every value
 * below is derived from `pos` through a function instead, which cannot be
 * expressed as keyframes and so is never handed off: it follows the scroll
 * exactly, which is the whole contract of the strip.
 */
function useExact<T>(v: MotionValue<T>): MotionValue<T> {
  return useTransform(v, (x) => x);
}

const num = (i: number) => String(i + 1).padStart(2, '0');

/* ==========================================================================
   The section
   ========================================================================== */

/**
 * Executive perspective.
 *
 * Deliberately architectural rather than portrait-led: no photograph on this
 * site represents an actual SOFISAM principal. The statement opens the section
 * in the ordinary way, and the four attributes then take a stage of their own:
 * one plate held sharp in the middle of the frame with its neighbours standing
 * behind it, part-shown at the edges, softened and set back, so the sequence
 * is visible as a sequence at every moment rather than one card at a time.
 *
 * The page scroll is the only thing that moves it. Scroll position maps to a
 * continuous position along the strip, every plate's size, focus and weight is
 * a function of its distance from that position, and there is no timer, no
 * autoplay and no snapping anywhere in it. The number is a caption on the
 * position and is given no movement of its own.
 *
 * Two compositions of the same four positions:
 *
 *   the strip   at every width, sized for its own — the plate is 84% of a
 *               phone and a little under half a desktop, the neighbours stand
 *               just clear of it on a desktop and overlap it a little on a
 *               phone, and the softening is eased right back on a small screen
 *               where a blurred edge reads as a rendering fault rather than as
 *               depth;
 *   the reel    the reduced-motion form — the four positions one under the
 *               next, nothing transformed, nothing blurred.
 *
 * Which one shows is decided in CSS — `motion-safe:` and `motion-reduce:` — so
 * the section renders the same on the server as on the client's first pass.
 * All four positions are in the document in order in both, so none of them is
 * ever only available to someone who can scroll.
 */
export function ExecutivePerspective() {
  return (
    <section
      data-section="Executive Perspective"
      // Nothing on the way down to the sticky stage may clip, or it would
      // never pin.
      className="section ground-char relative"
      aria-labelledby="executive-heading"
    >
      <div className="shell">
        <div className="head">
          <div>
            <Reveal kind="label" className="kicker">
              <p className="t-label">Executive Perspective</p>
            </Reveal>

            <h2
              id="executive-heading"
              className="t-h2 head-title mt-[clamp(1.25rem,2.2vw,2rem)] text-ivory"
            >
              <SplitText text="Advice given by people who have held the position." stagger={0.045} />
            </h2>
          </div>

          <div className="lg:pb-2">
            <Reveal kind="body" delay={0.12}>
              <p className="t-lead max-w-[50ch] text-ivory">
                Our principals are highly successful business executives and investors
                that bring unique perspectives to all of our mandates and investments.
              </p>
            </Reveal>

            <Reveal kind="body" delay={0.18}>
              <p className="t-body mt-[clamp(1.25rem,1.8vw,1.75rem)] max-w-[56ch] text-sage">
                That distinction matters more than it sounds. Someone who has carried a
                decision — its financing, its timing, its consequences for the people
                involved — asks different questions of a proposal than someone who has
                only ever reviewed one.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <Strip />
      <Reel />
    </section>
  );
}

/* ==========================================================================
   The strip
   ========================================================================== */

function Strip() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* ---------- The pitch ----------
     How far apart the plates stand, in pixels, measured rather than declared:
     the plate's width is set in CSS and changes at every breakpoint, and what
     has to stay constant is the peek — how much of the neighbour shows past
     the edge of the frame. Measured here, so the CSS keeps one job and the
     arithmetic keeps the other.

     The pitch is a fraction of the plate rather than of the frame, because a
     phone has no room for a gap: there the neighbours overlap the standing
     plate a little and are held behind it, while on a desktop they stand just
     clear of it. */
  const [pitch, setPitch] = useState(0);
  const [narrow, setNarrow] = useState(false);

  const measure = useCallback(() => {
    const s = stage.current;
    const pl = plate.current;
    if (!s || !pl) return;
    const stageW = s.clientWidth;
    const plateW = pl.clientWidth;
    const small = stageW < 768;
    setPitch(plateW * (small ? 0.92 : 1.02));
    setNarrow(small);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    if (plate.current) ro.observe(plate.current);
    return () => ro.disconnect();
  }, [measure]);

  /* ---------- Scroll to position ---------- */
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end end'],
  });

  const [atKeys, toKeys] = posKeys();
  const pos = useTransform(scrollYProgress, atKeys, toKeys);

  /* Which position is standing. Three state changes for the whole passage;
     everything else is a motion value and never renders. */
  useMotionValueEvent(pos, 'change', (v) => {
    const i = Math.max(0, Math.min(N - 1, Math.round(v)));
    setActive((prev) => (prev === i ? prev : i));
  });

  /* ---------- The pointer ----------
     The standing plate leans away from the cursor by eight pixels at the far
     corner of the stage, and lifts a fraction of a per cent as the cursor
     comes in toward the middle of it. One spring carries all four plates:
     only the standing one is sharp, so moving them together costs one
     transform instead of four. */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 80, damping: 26, mass: 0.7 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);
  const leanX = useTransform(sx, [0, 1], [8, -8]);
  const leanY = useTransform(sy, [0, 1], [6, -6]);
  const lift = useTransform([sx, sy] as MotionValue<number>[], ([x, y]: number[]) => {
    const r = Math.hypot((x as number) - 0.5, (y as number) - 0.5) / 0.707;
    return 1.06 + (1 - r) * 0.025;
  });

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <div
      ref={track}
      className="relative mt-[clamp(2rem,3.5vw,3.5rem)] motion-reduce:hidden"
      style={{ height: `calc(${N - 1} * 120svh + 100svh)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* ---------- The plates ---------- */}
        <div
          ref={stage}
          onPointerMove={onPointerMove}
          className="relative flex h-[clamp(17rem,52svh,34rem)] w-full items-center justify-center"
        >
          {markers.map((m, i) => (
            <Slide
              key={m.t}
              i={i}
              marker={m}
              pos={pos}
              pitch={pitch}
              narrow={narrow}
              depth={N - Math.abs(i - active)}
              lean={{ x: leanX, y: leanY, lift }}
              measureRef={i === 0 ? plate : undefined}
            />
          ))}
        </div>

        {/* ---------- The words ----------
            Under the strip and held to the left of the frame, with the rules
            on the right of it: the plate is centred because the strip has to
            be, so the type is what makes the composition asymmetric. */}
        <div className="shell mt-[clamp(1.5rem,3vh,2.75rem)] w-full md:pr-[calc(var(--gutter)+2rem)]">
          <div className="grid items-end gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-12">
            <div className="relative min-h-[clamp(8.5rem,15svh,11rem)] lg:col-span-6">
              {markers.map((m, i) => (
                <Words key={m.t} i={i} marker={m} pos={pos} />
              ))}
            </div>

            <div className="lg:col-span-3 lg:col-start-10 lg:justify-self-end">
              <Ladder active={active} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   One plate on the strip
   -------------------------------------------------------------------------- */

/**
 * A plate, and its whole relationship to the middle of the frame.
 *
 * Everything is a function of `d`, the plate's signed distance from the
 * standing position, clamped at one slot: at the centre it is full size, sharp
 * and at full weight; a slot away it has given up nine per cent of its size,
 * gained a short blur and dropped to a little over half its opacity — set at
 * the near end of both ranges on purpose, because a neighbour has to stay
 * recognisable as a photograph of somewhere else. Between
 * the two the values simply interpolate, which is what makes the movement
 * continuous rather than staged — there is no state in here at all, and no
 * frame of the transition is a special case.
 *
 * The softening is eased right back on a small screen, where a blurred edge
 * reads as a rendering fault rather than as depth.
 */
function Slide({
  i,
  marker,
  pos,
  pitch,
  narrow,
  depth,
  lean,
  measureRef,
}: {
  i: number;
  marker: Marker;
  pos: MotionValue<number>;
  pitch: number;
  narrow: boolean;
  depth: number;
  lean: { x: MotionValue<number>; y: MotionValue<number>; lift: MotionValue<number> };
  measureRef?: React.RefObject<HTMLDivElement | null>;
}) {
  // Taken the short way round the ring, so the ends of the sequence have a
  // neighbour on both sides. See `wrap`.
  const d = useTransform(pos, (v) => wrap(i - v));

  const x = useTransform(d, (v) => v * pitch);
  const scale = useTransform(d, (v) => 1 - recede(v) * 0.09);
  const opacity = useExact(useTransform(d, (v) => 1 - recede(v) * 0.45));
  const filter = useTransform(d, (v) => `blur(${recede(v) * (narrow ? 4 : 9)}px)`);

  return (
    <motion.div
      ref={measureRef}
      style={{ x, scale, opacity, filter, zIndex: depth }}
      className="media media-graded absolute aspect-[4/5] w-[84vw] shadow-[var(--depth-2)] sm:aspect-[4/3] sm:w-[58vw] lg:w-[46vw]"
    >
      {/* The pointer's lean lives inside the frame, so it moves the photograph
          and never the plate: the strip's own geometry stays exact. The inner
          overscale is what gives it room to move. */}
      <motion.div style={{ x: lean.x, y: lean.y, scale: lean.lift }} className="h-full w-full">
        <Picture
          name={marker.image}
          alt=""
          decorative
          sizes="(min-width:1024px) 46vw, (min-width:640px) 58vw, 84vw"
          focal={marker.focal}
          priority={i === 0}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* One gradient per plate, drawn from the theme's own scrim, so a
          photograph deepens in the dark theme and lifts in the light one. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgb(var(--scrim-rgb)/0.34)_0%,rgb(var(--scrim-rgb)/0.1)_30%,transparent_62%),radial-gradient(115%_90%_at_50%_42%,transparent_46%,rgb(var(--scrim-rgb)/0.28)_100%)]"
      />
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   One position's words
   -------------------------------------------------------------------------- */

/**
 * The number, the title and the description, on the same clock as the plates.
 *
 * A line is legible only while its plate is near the middle: it is gone by
 * four tenths of a slot away, which is well before the neighbouring plate has
 * arrived, so two positions are never readable at once. The direction falls
 * out of the sign of `d` — a position still to come sits below the line and
 * rises into it, one already passed has risen out of it — and the description
 * follows the title a little further behind, both ways.
 *
 * The number is a caption. It fades with its position and is given no movement
 * of its own, because a figure counting itself up is the one animation this
 * section should not have.
 */
function Words({ i, marker, pos }: { i: number; marker: Marker; pos: MotionValue<number> }) {
  const d = useTransform(pos, (v) => i - v);

  const titleIn = useExact(useTransform(d, (v) => Math.max(0, 1 - Math.abs(v) * 2.4)));
  const titleY = useTransform(d, (v) => Math.max(-1, Math.min(1, v)) * 26);
  const bodyIn = useExact(useTransform(d, (v) => Math.max(0, 1 - Math.abs(v) * 3)));
  const bodyY = useTransform(d, (v) => Math.max(-1, Math.min(1, v)) * 34);

  return (
    <div className="absolute inset-x-0 top-0">
      <motion.p aria-hidden style={{ opacity: titleIn }} className="t-num text-[0.72rem] text-gold">
        {num(i)}
      </motion.p>

      <motion.div style={{ opacity: titleIn, y: titleY }}>
        <h3 className="mt-[clamp(0.75rem,1.2vw,1.1rem)] max-w-[20ch] font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal leading-[1.08] tracking-tighter text-ivory">
          {marker.t}
        </h3>
      </motion.div>

      <motion.div style={{ opacity: bodyIn, y: bodyY }}>
        <p className="t-body mt-[clamp(0.625rem,1.1vw,1rem)] max-w-[44ch] text-sage">
          {marker.d}
        </p>
      </motion.div>
    </div>
  );
}

/** Four rules, the standing one longer and gold. No figures: the position
 *  already carries its own number, and one is enough on a screen. */
function Ladder({ active }: { active: number }) {
  return (
    <ol aria-hidden className="flex items-center gap-2">
      {markers.map((m, i) => (
        <li
          key={m.t}
          className={`h-px transition-all duration-700 ease-premium ${
            i === active ? 'w-9 bg-gold' : 'w-4 bg-[var(--line-strong)]'
          }`}
        />
      ))}
    </ol>
  );
}

/* ==========================================================================
   Reduced motion — the reel
   ========================================================================== */

/**
 * The four positions, one under the next, with nothing transformed and nothing
 * blurred. This is the whole section when reduced motion has been asked for;
 * the plate's entrance is the site's own `ImageReveal`, which is already still
 * in that case, so there is no third layout here to keep aligned.
 */
function Reel() {
  return (
    <ol className="shell mt-[clamp(2rem,4vw,3.5rem)] hidden motion-reduce:block">
      {markers.map((m, i) => (
        <li
          key={m.t}
          className="flex flex-col justify-center gap-[clamp(1.25rem,3.6vw,1.75rem)] py-[clamp(1.75rem,5vw,3rem)]"
        >
          <ImageReveal>
            <div className="media media-graded relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9]">
              <Picture
                name={m.image}
                alt={m.alt}
                sizes="(min-width:640px) 92vw, 100vw"
                focal={m.focal}
                className="h-full w-full object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgb(var(--scrim-rgb)/0.4)_0%,rgb(var(--scrim-rgb)/0.12)_26%,transparent_54%)]"
              />
            </div>
          </ImageReveal>

          <div>
            <p aria-hidden className="t-num text-[0.72rem] text-gold">
              {num(i)}
            </p>
            <h3 className="mt-[clamp(0.75rem,2.4vw,1rem)] max-w-[20ch] font-display text-[clamp(1.6rem,6vw,2.4rem)] font-normal leading-[1.08] tracking-tighter text-ivory">
              {m.t}
            </h3>
            <p className="t-body mt-[clamp(0.625rem,2vw,0.875rem)] max-w-[44ch] text-sage">
              {m.d}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
