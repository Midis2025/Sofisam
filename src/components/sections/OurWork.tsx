'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { workScenes, type WorkScene } from '@/data/work';
import { Picture } from '@/components/ui/Picture';
import { ImageReveal } from '@/components/animations/Reveal';

/**
 * How many scenes, and how the scroll is divided between them.
 *
 * The track is one viewport per scene plus one, so the sticky frame has a full
 * viewport of scroll to spend on each. In that unit scale — `u`, running 0 → N
 * across the whole track — scene `i` takes over at `u = i` and the hand-over
 * is finished by `u = i + T`. What is left of the unit is the hold, where
 * nothing moves but the slow zoom. Every keyframe in this file is derived from
 * those two numbers rather than tuned on its own.
 */
const N = workScenes.length;
const T = 0.4;

/** Where in the track scene `i` is fully arrived and standing. */
const holdOf = (i: number) => (i === 0 ? 0.4 : i + T + 0.15);

/**
 * Scene `i`'s four marks on the track, as progress rather than units: the
 * plate rises between `rs` and `re`, stands, and leaves between `xs` and `xe`.
 *
 * The last scene never leaves, so its exit marks fall past the end of the
 * track and the transforms that use them are never applied. Its zoom is the
 * exception — that one is held to the end of the track so it completes, which
 * is what `zEnd` is for.
 */
function marksFor(i: number) {
  const xe = (i + 1 + T) / N;
  return {
    first: i === 0,
    last: i === N - 1,
    rs: i / N,
    re: (i + T) / N,
    xs: (i + 1) / N,
    xe,
    zEnd: Math.min(xe, 1),
  };
}

/**
 * The same value, kept on Motion's own frame loop.
 *
 * A value interpolated linearly from `useScroll` carries an `accelerate`
 * descriptor, and Motion binds it to a native animation on a scroll timeline
 * for any property in its accelerated set — which is opacity, clip-path,
 * filter, transform and background-color. On a frame that is `sticky` for five
 * viewports that timeline measures the frame's own progress through the
 * viewport rather than the track's, so it barely moves and the property
 * freezes a few per cent in.
 *
 * A transform of a transform cannot be expressed as keyframes, so it is never
 * handed off. That is structural rather than a heuristic worked around: the
 * value follows the scroll exactly, which is the whole contract of the frame.
 * Transforms proper — `scale`, `x`, `y` — are bound under their own names and
 * are never accelerated, so they are left declarative.
 */
function useExact<T>(v: MotionValue<T>): MotionValue<T> {
  return useTransform(v, (x) => x);
}

/* ==========================================================================
   The section
   ========================================================================== */

/**
 * Our work, as a sequence of frames rather than a set of cards.
 *
 * Five scenes share one full-height frame and the page scroll moves between
 * them: the standing plate holds while it is being read, then drifts and
 * loses light as the next one rises over it through a mask. The type is handed
 * over on the same clock — the outgoing line leaves upward, the incoming one
 * arrives from below — so a scene change reads as a page turning rather than
 * as a slide advancing.
 *
 * Nothing here is a new claim about the firm. The five scenes are its base,
 * its three disciplines and the perspective its principals bring, in the words
 * the site already uses; see `data/work.ts`.
 *
 * Two compositions, one content:
 *
 *   from 1024   the sticky frame, scroll-driven, with the ladder on the right
 *               edge and a plate that leans away from the pointer;
 *   below 1024  the reel — the same five scenes at close to full height, one
 *               under the next, the photograph dominant and the type under it,
 *               walked by ordinary scrolling.
 *
 * Which of the two shows is decided in CSS rather than in Javascript —
 * `motion-safe:lg:` on both — so the section renders the same on the server as
 * on the client's first pass, and a reader who has asked for reduced motion
 * gets the reel at every width with its entrance already dropped. The content
 * is identical either way, and nothing in the reel transforms.
 *
 * The frame is deliberately not `.tone-dark`. This passage follows the theme,
 * so the veil over the photograph is near-black in the dark theme and ivory in
 * the light one and the type on it inverts with the page — the `band`
 * behaviour the site already uses for full-bleed photography, and what keeps
 * the light theme from carrying a dark hole through an ivory page.
 */
export function OurWork() {
  return (
    <section
      data-section="Our Work"
      // `band` rather than `section`: the passage carries its own vertical
      // measure and the sections either side of it trim for a full-bleed one.
      // Nothing on the way down to the sticky frame may clip, or it would
      // never pin.
      className="band relative w-full bg-void"
      aria-labelledby="work-heading"
    >
      {/* The frame carries the label visually. The heading is here so the
          section is announced once rather than once per composition. */}
      <h2 id="work-heading" className="sr-only">
        Our Work
      </h2>

      <Stage />
      <Reel />
    </section>
  );
}

/* ==========================================================================
   From 1024 — the sticky frame
   ========================================================================== */

function Stage() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end end'],
  });

  /* Which scene is current. The hand-over reads as done at its own midpoint,
     which is where the ladder and the counter should change — later than the
     mask starts and earlier than it finishes. Five state changes for the whole
     passage; everything else is a motion value and never re-renders. */
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.max(0, Math.min(N - 1, Math.floor(p * N - T / 2)));
    setActive((prev) => (prev === i ? prev : i));
  });

  /* ---------- The pointer ----------
     The standing plate leans away from the cursor by seven pixels at the far
     edge of the frame, on a spring slow enough that the movement is never
     attributable to one mouse event. A single node carries it for all five
     plates: only the top one is visible, so moving them together costs one
     transform instead of five. */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 80, damping: 26, mass: 0.7 };
  const px = useTransform(useSpring(mx, spring), [0, 1], [7, -7]);
  const py = useTransform(useSpring(my, spring), [0, 1], [5, -5]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  /* The veil moves against the plates: down by ten pixels across the passage
     while they drift left. It is inflated past the frame top and bottom, so
     the movement can never bring an edge into view. */
  const veilY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  /* ---------- Going to a scene ----------
     The ladder sets the scroll position rather than animating anything. The
     frame is a function of where the page is, so moving the page is the only
     way to move it — and what the reader sees on the way is the same
     transition they would have got by scrolling there themselves. */
  const jump = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const distance = el.offsetHeight - window.innerHeight;
    if (distance <= 0) return;
    const top = el.getBoundingClientRect().top + window.scrollY + (holdOf(i) / N) * distance;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <div
      ref={track}
      className="relative hidden motion-safe:lg:block"
      style={{ height: `calc(${N + 1} * 100svh)` }}
    >
      <div
        onPointerMove={onPointerMove}
        // `grain` needs a positioned host and takes ::before at z-3, so the
        // plates sit under it and the type above it.
        className="grain sticky top-0 h-[100svh] w-full overflow-hidden"
      >
        {/* ---------- The plates ---------- */}
        <motion.div style={{ x: px, y: py }} className="absolute inset-0 z-0">
          {workScenes.map((s, i) => (
            <Panel
              key={s.k}
              i={i}
              scene={s}
              p={scrollYProgress}
              active={i === active}
              // The standing plate and its two neighbours are everything that
              // can be even partly in view during a hand-over.
              near={Math.abs(i - active) <= 1}
            />
          ))}
        </motion.div>

        {/* ---------- The veil ---------- */}
        <motion.span
          aria-hidden
          style={{ y: veilY }}
          className="veil-stage pointer-events-none absolute inset-x-0 -inset-y-[3%] z-[1]"
        />

        {/* ---------- The type ---------- */}
        {/* The right edge is reserved twice over: once for the ladder, and
            again for the page's own section rail out in the gutter. */}
        <div className="relative z-[4] flex h-full flex-col justify-between pb-[clamp(2.5rem,6vh,4.5rem)] pl-[var(--gutter)] pr-[calc(var(--gutter)+6rem)] pt-[calc(var(--header-h)+clamp(1.25rem,4vh,2.5rem))]">
          <p aria-hidden className="kicker t-label">
            Our Work
          </p>

          {/* One stack, every scene held to its foot: the title, the link and
              the description land on the same lines whichever scene is
              standing and however long its title runs. */}
          <div className="relative">
            {workScenes.map((s, i) => (
              <Copy key={s.k} i={i} scene={s} p={scrollYProgress} active={i === active} />
            ))}
          </div>
        </div>

        <Ladder active={active} onJump={jump} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   One plate
   -------------------------------------------------------------------------- */

/**
 * The photograph for one scene, and the whole of its transition.
 *
 * Four movements, every one of them monotonic — a plate never reverses
 * direction, which is most of what separates a camera move from an animation:
 *
 *   mask   the plate rises into the frame from its lower edge, over the one
 *          before it. The first scene has none; it is already standing.
 *   zoom   1.03 to 1.10 across its whole life, slowly, the entire time it is
 *          on screen. The base scale is over 1 so the pointer's seven pixels
 *          can never bring an edge in.
 *   drift  a little under two per cent to the left, on the same clock.
 *   exit   once the next plate begins to rise, this one loses light and gains
 *          a very short blur, so the frame softens under the arriving plate
 *          rather than cutting to it. The last plate has no exit, and is not
 *          given the transform at all.
 *
 * A plate more than one scene from the standing one is hidden: its transforms
 * still resolve from the scroll position, so scrolling back to it is exact,
 * but nothing is painted for it in the meantime.
 */
function Panel({
  i,
  scene,
  p,
  active,
  near,
}: {
  i: number;
  scene: WorkScene;
  p: MotionValue<number>;
  active: boolean;
  near: boolean;
}) {
  const { first, last, rs, re, xs, xe, zEnd } = marksFor(i);

  const scale = useTransform(p, [rs, zEnd], [1.03, 1.1]);
  const x = useTransform(p, [rs, zEnd], ['0%', '-1.8%']);

  /* The mask and the exit are written through a second transform — see
     `useExact`. Both read better this way in any case: one number for how far
     the plate has risen, one for how far it has gone. */
  const risen = useTransform(p, [rs, re], [100, 0]);
  const clip = useTransform(risen, (v) => `inset(${v}% 0% 0% 0%)`);

  const gone = useTransform(p, [xs, xe], [0, 1]);
  const filter = useTransform(gone, (v) => `brightness(${1 - v * 0.4}) blur(${v * 4}px)`);

  return (
    <motion.div
      aria-hidden
      style={{
        visibility: near ? 'visible' : 'hidden',
        // The first plate is given no clip-path at all rather than one that
        // happens to be open.
        ...(first ? null : { clipPath: clip }),
      }}
      className="absolute inset-0"
    >
      <motion.div
        style={{ scale, x, ...(last ? null : { filter }) }}
        className="media media-flat media-graded h-full w-full"
      >
        <Plate scene={scene} active={active} sizes="100vw" priority={first} />
      </motion.div>
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   One scene's type
   -------------------------------------------------------------------------- */

/**
 * The line leaves upward and the next arrives from below, on the same clock as
 * the mask — a beat behind it starting and a beat ahead of it finishing, so
 * the words are never legible over two photographs at once.
 *
 * Under the entrance there is a second, far slower movement: the type rises
 * fourteen pixels across the hold while the plate behind it drifts left and
 * zooms in. The two speeds are what give the frame its depth, and the figure
 * is small enough to be felt rather than seen.
 */
function Copy({
  i,
  scene,
  p,
  active,
}: {
  i: number;
  scene: WorkScene;
  p: MotionValue<number>;
  active: boolean;
}) {
  const { first, last, rs, re, xs, xe } = marksFor(i);

  /* The arrival, then the departure. The first scene is already standing when
     the track starts, so it has no arrival; the last never leaves, so it has
     no departure. Both marks and values are assembled rather than written out,
     because a keyframe list has to stay strictly increasing and inside [0,1]
     whichever of the three shapes this scene is. */
  const inB = first ? 0 : re;
  const marks: number[] = first ? [0] : [rs + 0.5 * (re - rs), inB];
  const fade: number[] = first ? [1] : [0, 1];
  const rise: number[] = first ? [0] : [36, 0];

  if (!last) {
    marks.push(xs, xs + 0.65 * (xe - xs));
    fade.push(1, 0);
    rise.push(0, -28);
  }

  // Opacity is in Motion's accelerated set; the transform is not. See
  // `useExact` for why the one is passed through and the other is not.
  const opacity = useExact(useTransform(p, marks, fade));
  const y = useTransform(p, marks, rise);
  const drift = useTransform(p, [inB, xs], [0, -14]);

  return (
    <motion.div
      style={{ opacity, y }}
      // Inert rather than aria-hidden: a scene that is not standing is out of
      // the tab order as well as out of the accessibility tree, so the five
      // links never stack up behind one another.
      inert={!active}
      className="absolute inset-x-0 bottom-0"
    >
      <motion.div
        style={{ y: drift }}
        className="grid items-end gap-x-[clamp(1.5rem,2.6vw,3rem)] gap-y-[clamp(1.5rem,2.4vw,2rem)] lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
          <Heading scene={scene} />
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <p className="t-lead max-w-[40ch] text-ivory/80">{scene.body}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * The number, the category, the title and the link, as one target.
 *
 * Where a scene continues somewhere the whole block is the link — clicking the
 * standing scene is the obvious gesture, and a link the size of a headline is
 * easier to hit than an arrow. Where it does not, the same block is set
 * without one: no scene is given a destination it does not have.
 */
function Heading({ scene }: { scene: WorkScene }) {
  const inner = (
    <>
      <div className="flex items-center gap-[clamp(0.875rem,1.4vw,1.25rem)]">
        <span className="t-num text-[0.78rem] text-gold">{scene.k}</span>
        <span
          aria-hidden
          className="block h-px w-[clamp(1.5rem,2.6vw,2.5rem)] bg-[var(--line-gold)]"
        />
        <p className="t-label text-ivory/70">{scene.category}</p>
      </div>

      <h3 className="mt-[clamp(1rem,1.8vw,1.75rem)] max-w-[17ch] font-display text-[clamp(2.1rem,4.2vw,4.5rem)] font-normal leading-[1] tracking-tighter text-ivory">
        {scene.title}
      </h3>

      {scene.cta && (
        <span className="cta mt-[clamp(1.25rem,2.2vw,2rem)] text-ivory group-hover:text-gold">
          <span className="link-underline">{scene.cta}</span>
          <ArrowUpRight aria-hidden strokeWidth={1.5} className="arrow h-3.5 w-3.5" />
        </span>
      )}
    </>
  );

  if (!scene.href) return <div>{inner}</div>;

  return (
    <Link href={scene.href} className="group block">
      {inner}
    </Link>
  );
}

/* --------------------------------------------------------------------------
   The ladder
   -------------------------------------------------------------------------- */

/**
 * The ladder on the right edge.
 *
 * It sits inside the frame's own right reserve, clear of the page's section
 * rail out in the gutter beyond it, and it reports as well as steers: the
 * standing scene's tick runs long and turns gold. Five rules and no figures —
 * the frame already carries the scene's number beside its category, and the
 * page rail carries the section's, which is as much counting as one screen
 * can hold. Arrow keys walk it, so the sequence can be moved through without a
 * pointer, and nothing here listens to the scroll — the reader's own scrolling
 * is never intercepted.
 */
function Ladder({ active, onJump }: { active: number; onJump: (i: number) => void }) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = N - 1;
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = Math.min(last, active + 1);
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = Math.max(0, active - 1);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    onJump(next);
    buttons.current[next]?.focus();
  };

  return (
    <nav
      aria-label="Scenes"
      onKeyDown={onKeyDown}
      className="absolute right-[calc(var(--gutter)+3rem)] top-1/2 z-[5] -translate-y-1/2"
    >
      <ol className="flex flex-col items-end gap-[clamp(0.6rem,1.1vh,0.9rem)]">
        {workScenes.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.k} className="flex">
              <button
                type="button"
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                onClick={() => onJump(i)}
                aria-current={on ? 'true' : undefined}
                aria-label={`Scene ${s.k} — ${s.category}`}
                className="group flex items-center gap-2.5 py-1 focus-visible:outline-none"
              >
                <span
                  className={`block h-px transition-all duration-700 ease-premium ${
                    on
                      ? 'w-7 bg-gold'
                      : 'w-3 bg-ivory/30 group-hover:w-5 group-hover:bg-ivory/70 group-focus-visible:w-5 group-focus-visible:bg-gold'
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ==========================================================================
   Below 1024, and reduced motion — the reel
   ========================================================================== */

/**
 * The same five scenes, composed for a held device rather than scaled down
 * from the frame: the photograph takes most of the height, the type sits under
 * it on the page's own ground, and the sequence is walked by scrolling — which
 * on a phone is the swipe.
 *
 * It is also the reduced-motion form of the whole section, at every width. The
 * plate's entrance is the site's own `ImageReveal`, which is already still
 * when reduced motion has been asked for, so there is no third layout here to
 * keep aligned with the other two.
 */
function Reel() {
  return (
    <ol className="relative z-[2] motion-safe:lg:hidden">
      {workScenes.map((s, i) => (
        <li
          key={s.k}
          className="flex min-h-[88svh] flex-col justify-center gap-[clamp(1.25rem,3.6vw,2rem)] px-[var(--gutter)] py-[clamp(2.5rem,7vw,4rem)]"
        >
          <div className="flex items-center gap-[clamp(0.75rem,2.6vw,1.1rem)]">
            <span className="t-num text-[0.72rem] text-gold">{s.k}</span>
            <span aria-hidden className="block h-px w-[clamp(1rem,4vw,1.75rem)] bg-[var(--line-gold)]" />
            <p className="t-label text-ivory/70">{s.category}</p>
          </div>

          <Framed scene={s} />

          <div>
            <h3 className="max-w-[20ch] font-display text-[clamp(1.75rem,6.4vw,2.75rem)] font-normal leading-[1.06] tracking-tighter text-ivory">
              {s.title}
            </h3>
            <p className="t-body mt-[clamp(0.875rem,2.4vw,1.25rem)] max-w-[46ch] text-sage">
              {s.body}
            </p>

            {s.href && s.cta && (
              <Link
                href={s.href}
                className="group cta mt-[clamp(1.25rem,3.2vw,1.75rem)] text-ivory hover:text-gold"
              >
                <span className="link-underline">{s.cta}</span>
                <ArrowUpRight aria-hidden strokeWidth={1.5} className="arrow h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {/* Where the scene sits in the five, drawn rather than counted. */}
          <ol aria-hidden className="flex items-center gap-1.5">
            {workScenes.map((t, ti) => (
              <li
                key={t.k}
                className={`h-px transition-colors duration-500 ${
                  ti === i ? 'w-6 bg-gold' : 'w-3 bg-[var(--line-strong)]'
                }`}
              />
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

/**
 * The plate, framed and veiled at its foot so the reel reads as the same
 * material as the frame on a larger screen.
 */
function Framed({ scene }: { scene: WorkScene }) {
  const plate = (
    <div className="media media-graded relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9]">
      <Plate scene={scene} active sizes="(min-width:640px) 92vw, 100vw" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgb(var(--scrim-rgb)/0.4)_0%,rgb(var(--scrim-rgb)/0.12)_26%,transparent_54%)]"
      />
    </div>
  );

  return <ImageReveal>{plate}</ImageReveal>;
}

/* ==========================================================================
   The medium
   ========================================================================== */

/**
 * A scene's plate: the photograph, or a clip where one is given.
 *
 * A clip is muted, looping, inline and never fetched until it is asked for, it
 * shows its own photograph until it has something to play, and it is paused
 * whenever its scene is not the standing one — five decoding video elements is
 * a frame budget spent on four things nobody is looking at. Under reduced
 * motion the photograph is used and the clip is not loaded at all.
 *
 * None of the five scenes carries one today: the only clip in the repository
 * is unrelated to the firm's world, and a photograph is the right medium for
 * architecture. This is here so that a suitable clip is a data change.
 */
function Plate({
  scene,
  active,
  sizes,
  priority = false,
}: {
  scene: WorkScene;
  active: boolean;
  sizes: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (active) void el.play().catch(() => {});
    else el.pause();
  }, [active]);

  if (scene.video && !reduce) {
    return (
      <video
        ref={video}
        aria-hidden
        tabIndex={-1}
        muted
        loop
        playsInline
        preload="none"
        poster={`/images/${scene.image}-1600.webp`}
        style={{ objectPosition: scene.focal }}
        className="h-full w-full object-cover"
      >
        <source src={scene.video} type="video/mp4" />
      </video>
    );
  }

  return (
    <Picture
      name={scene.image}
      alt=""
      decorative
      sizes={sizes}
      focal={scene.focal}
      priority={priority}
      className="h-full w-full object-cover"
    />
  );
}
