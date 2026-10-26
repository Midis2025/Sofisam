'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * The masthead's ground: a skyline timelapse, from night into day and back.
 *
 * One supplied 4K clip, cut three ways for the three shapes a masthead takes,
 * rather than one landscape file cropped by `object-cover` into a phone:
 *
 *   desktop  16:9  1920×1080   the full width of the frame
 *   tablet    4:3  1440×1080   the skyline held centre
 *   mobile   9:16   810×1440   the tower cluster, composed for a tall screen
 *
 * Every cut is a downscale of the 4K source, never an enlargement, with the
 * highlights rolled off so the overcast daylight at the bright end never goes
 * paper-white behind the type. The timelapse runs forward and then back, so
 * the loop has no cut in it. Each cut has a poster that is its own first
 * frame: the still the film fades up out of, and the whole ground where the
 * film is not run.
 *
 * The cut is chosen by the frame's shape, not its width, and the same
 * breakpoints drive the <picture> that carries the posters and the hook that
 * picks the film, so the still and the film it fades into are always the same
 * composition. Only the cut in force is ever requested.
 */

const CUTS = [
  { key: 'mobile', media: '(max-aspect-ratio: 13/20)', w: 810, h: 1440 },
  { key: 'tablet', media: '(max-aspect-ratio: 3/2)', w: 1440, h: 1080 },
  { key: 'desktop', media: null, w: 1920, h: 1080 },
] as const;

type Cut = (typeof CUTS)[number]['key'];

const filmSrc = (cut: Cut) => `/videos/hero-${cut}.mp4`;
const posterSrc = (cut: Cut) => `/videos/hero-${cut}-poster.webp`;

/** Which cut this frame takes, kept current as the frame changes shape. */
function useFilmCut() {
  const [cut, setCut] = useState<Cut | null>(null);

  useEffect(() => {
    const queries = CUTS.map((c) => (c.media ? window.matchMedia(c.media) : null));
    const pick = () => setCut(CUTS[queries.findIndex((q) => q === null || q.matches)].key);
    pick();
    queries.forEach((q) => q?.addEventListener('change', pick));
    return () => queries.forEach((q) => q?.removeEventListener('change', pick));
  }, []);

  return cut;
}

/**
 * Whether this device gets film at all. Decided after mount, because the
 * server cannot know: reduced motion, data-saver, or a 2g/3g link all mean the
 * poster, since several megabytes of film on a constrained connection is not
 * a background, it is a download.
 */
function useWantsFilm() {
  const [wants, setWants] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)(2g|3g)$/.test(conn.effectiveType)) return;
    setWants(true);
  }, []);

  return wants;
}

/** `position` is the object-position for both the still and the film — the
 *  part of the frame kept when the window is wider than the cut. */
export function HeroFilm({ position = '50% 50%' }: { position?: string }) {
  const reduce = useReducedMotion();
  const wants = useWantsFilm();
  const cut = useFilmCut();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  const run = wants && !failed && cut !== null;

  const frame = useRef<HTMLDivElement>(null);
  const film = useRef<HTMLVideoElement>(null);

  // A change of cut is a new file: it fades up again from its own poster.
  useEffect(() => setReady(false), [cut]);

  // Nothing decodes while the masthead is off screen.
  useEffect(() => {
    const el = frame.current;
    if (!el || !run) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = film.current;
        if (!v) return;
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [run, cut]);

  return (
    <div ref={frame} className="absolute inset-0">
      {/* The poster, in the cut this frame takes. It carries the description
          only where it is the whole ground; under the film it is decoration.
          The still drifts slowly when there is no film to move it. */}
      <div className={`media media-flat absolute inset-0${reduce || run ? '' : ' hero-drift'}`}>
        <picture>
          {CUTS.filter((c) => c.media).map((c) => (
            <source
              key={c.key}
              media={c.media ?? undefined}
              srcSet={posterSrc(c.key)}
              type="image/webp"
              width={c.w}
              height={c.h}
            />
          ))}
          <img
            src={posterSrc('desktop')}
            alt={run ? '' : 'A city skyline before dawn, its towers still lit'}
            aria-hidden={run || undefined}
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="block h-full w-full object-cover"
            style={{ objectPosition: position }}
          />
        </picture>
      </div>

      {/* The film. Muted, looping and inline — what autoplay costs on every
          mobile browser — and out of the tab order and the accessibility
          tree, because it is the ground rather than content. Keyed by cut, so
          a change of shape loads the other file rather than stretching this
          one. The poster is the file the <picture> has already loaded. */}
      {run && (
        <video
          key={cut}
          ref={film}
          aria-hidden
          tabIndex={-1}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={filmSrc(cut)}
          poster={posterSrc(cut)}
          onLoadedData={() => setReady(true)}
          onError={() => setFailed(true)}
          style={{ objectPosition: position }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-premium ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
