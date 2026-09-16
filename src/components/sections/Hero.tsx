'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { heroCopy, contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { ButtonLink } from '@/components/ui/Button';
import { useIntroDelay } from '@/lib/intro';
import type { SceneHandle } from '@/components/ui/SkylineScene';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * three.js is never in the initial bundle. The chunk is requested only once
 * this component has decided the device should run the scene at all.
 */
const SkylineScene = dynamic(
  () => import('@/components/ui/SkylineScene').then((m) => m.SkylineScene),
  { ssr: false },
);

/**
 * The headline is broken differently on phones so no line ever has to wrap
 * inside its own mask. Both copies are decorative; the accessible name comes
 * from the screen-reader span.
 */
const DESKTOP_LINES = heroCopy.headline; // ['A Global Corporate', 'Advisory Platform']
const MOBILE_LINES = ['A Global', 'Corporate', 'Advisory', 'Platform'] as const;
const FULL_HEADLINE = heroCopy.headline.join(' ');

/**
 * Decides whether this device gets the WebGL scene.
 *
 * Three textured quads is cheap enough for a tablet, so the gate is 768 up.
 * A phone gets the same photograph as a still: the scene's value is the
 * parallax, and parallax needs either a pointer or a wide frame to read at
 * all. Reduced motion, data-saver, a slow connection and a machine with few
 * cores all fall back the same way, and so does any device where the context
 * cannot be created or the photographs fail to load.
 */
function useWantsScene() {
  const [wants, setWants] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)(2g|3g)$/.test(conn.effectiveType)) return;

    // A rough proxy for a machine that will hold a steady frame rate.
    if ((navigator.hardwareConcurrency ?? 8) < 4) return;

    setWants(true);
  }, []);

  return wants;
}

/**
 * The opening frame.
 *
 * A centred cinematic composition: the label at the top of the frame, the
 * statement through its middle, the actions at the foot, and a photographic
 * night skyline moving in depth behind all of it. The type sits in front of
 * the scene with its own scrim, so the city frames the headline rather than
 * competing with it.
 *
 * Where the scene is not appropriate — a phone, reduced motion, a slow
 * connection, no WebGL — the same composition runs over the same photograph,
 * held still. The layout, the copy, the timing and the subject are identical
 * either way; only the depth behind them is lost.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const d = useIntroDelay();
  const wantsScene = useWantsScene();
  const [sceneFailed, setSceneFailed] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const ref = useRef<HTMLElement>(null);
  const scene = useRef<SceneHandle | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const showScene = wantsScene && !sceneFailed;

  // Hand the scene the page's scroll position. Subscribing to the motion value
  // keeps this off the React render path entirely.
  useEffect(() => {
    if (!showScene) return;
    return scrollYProgress.on('change', (v) => scene.current?.setScroll(v));
  }, [scrollYProgress, showScene]);

  // …and the pointer, in normalised device coordinates.
  useEffect(() => {
    if (!showScene) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      scene.current?.setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [showScene]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink"
      aria-label="Introduction"
    >
      {/* ---------- Ground ---------- */}
      {showScene ? (
        <>
          {/* The holding frame is the same photograph the scene's own mid
              layer uses, so the hand-over to WebGL is invisible: no video, no
              change of subject, nothing to catch on a reload. */}
          <div
            aria-hidden
            className={`absolute inset-0 transition-opacity duration-700 ease-premium ${
              sceneReady ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Picture
              name="city-blue-night"
              alt=""
              decorative
              sizes="100vw"
              priority
              focal="50% 50%"
              className="h-full w-full object-cover"
            />
          </div>

          <SkylineScene
            className={`absolute inset-0 h-full w-full transition-opacity duration-[2000ms] ease-premium ${
              sceneReady ? 'opacity-100' : 'opacity-0'
            }`}
            handleRef={scene}
            onReady={() => setSceneReady(true)}
            onFail={() => setSceneFailed(true)}
          />

          {/* A soft vignette seats the city in the frame and keeps the
              baseline row off the brightest part of it. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(82%_70%_at_50%_45%,transparent_0%,rgba(6,6,7,0.28)_78%,rgba(6,6,7,0.8)_100%)]"
          />
        </>
      ) : (
        <div className="media media-flat veil-hero absolute inset-0">
          <Picture
            name="city-blue-night"
            alt="Aerial view of an international financial district lit at night"
            sizes="100vw"
            priority
            focal="50% 50%"
            className="h-full w-full"
          />
        </div>
      )}

      {/* ---------- Statement ---------- */}
      <motion.div
        className="shell relative z-10 flex min-h-[100svh] flex-col pb-[clamp(1.75rem,5vh,3rem)] pt-[calc(var(--header-h)+clamp(1.5rem,5vh,3rem))]"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Top — the label, centred in the frame */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: d }}
        >
          <motion.span
            aria-hidden
            className="hidden h-px w-10 shrink-0 origin-right bg-gold/60 sm:block sm:w-16"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: d + 0.05 }}
          />
          <p className="t-label text-center text-gold">{heroCopy.eyebrow}</p>
          <motion.span
            aria-hidden
            className="hidden h-px w-10 shrink-0 origin-left bg-gold/60 sm:block sm:w-16"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: d + 0.05 }}
          />
        </motion.div>

        {/* Centre — the statement, through the middle of the sphere */}
        <div className="relative flex flex-1 flex-col items-center justify-center py-[clamp(1.5rem,4vh,3rem)] text-center">
          {/* Its own scrim, so the headline never has to fight the lattice
              behind it. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-14%] inset-y-[-20%] bg-[radial-gradient(50%_42%_at_50%_48%,rgba(6,6,7,0.58)_0%,rgba(6,6,7,0.24)_60%,transparent_100%)]"
          />

          <h1 className="t-hero relative max-w-[18ch] text-ivory">
            <span className="sr-only">{FULL_HEADLINE}</span>
            <span aria-hidden className="block sm:hidden">
              <Lines lines={MOBILE_LINES} reduce={reduce} delay={d + 0.07} />
            </span>
            <span aria-hidden className="hidden sm:block">
              <Lines lines={DESKTOP_LINES} reduce={reduce} delay={d + 0.07} />
            </span>
          </h1>

          <motion.p
            className="t-lead relative mt-[clamp(1.25rem,2.4vw,2rem)] max-w-[46ch] text-ivory/75"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: d + 0.42 }}
          >
            {heroCopy.statement}
          </motion.p>

          <motion.div
            className="relative mt-[clamp(1.75rem,3.2vw,2.75rem)] flex flex-wrap items-center justify-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: d + 0.56 }}
          >
            <ButtonLink href={heroCopy.primaryCta.href} tone="light" variant="solid">
              {heroCopy.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={heroCopy.secondaryCta.href} tone="light" variant="outline">
              {heroCopy.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </div>

        {/* Foot — the firm's stated location and the scroll cue */}
        <motion.div
          className="flex items-center justify-between gap-6 border-t border-ivory/12 pt-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: d + 0.8 }}
        >
          <p className="t-label text-ivory/40">{contact.headquarters}</p>

          <a
            href="#welcome"
            className="group flex items-center gap-3 py-1 text-ivory/40 transition-colors duration-500 hover:text-gold"
          >
            <span className="t-label hidden sm:block">Scroll</span>
            <span className="relative block h-9 w-px overflow-hidden bg-ivory/20">
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 block h-3 bg-gold"
                animate={reduce ? undefined : { y: ['-100%', '300%'] }}
                transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
              />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Lines({
  lines,
  reduce,
  delay,
}: {
  lines: readonly string[];
  reduce: boolean | null;
  delay: number;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: '112%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.1 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}
