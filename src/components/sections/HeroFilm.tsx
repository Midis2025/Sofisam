'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * The masthead's ground: a fixed-camera timelapse of the Dubai Marina towers,
 * the clouds moving over them through an afternoon.
 *
 * One 1920×1080 clip serves every shape of masthead, cropped by
 * `object-cover` around `position` — the tower cluster sits left of centre,
 * so the crop is held there and a tall phone frame still keeps it in view.
 *
 * The clip is a single forward pass, not a palindrome, so it is not left to
 * `loop` (which would jump from the last frame back to the first). Instead the
 * film dissolves out over its final second onto the poster — which is the
 * clip's own first frame — and is then restarted underneath it at 0 and shown
 * again at once. Frame 0 over frame 0 is invisible, so the only seam is a
 * slow cross-dissolve.
 *
 * The poster is also the whole ground where the film is not run.
 */

const FILM = '/videos/hero-film.mp4';
const POSTER = '/videos/hero-film-poster.webp';

/** Seconds before the end at which the film starts dissolving to the poster. */
const DISSOLVE = 1.2;

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
 *  part of the frame kept when the masthead is a different shape from 16:9. */
export function HeroFilm({ position = '48% 50%' }: { position?: string }) {
  const reduce = useReducedMotion();
  const wants = useWantsFilm();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  // 'in': fully shown · 'out': dissolving to the poster · 'cut': restarting
  // under the poster, shown again with no transition.
  const [phase, setPhase] = useState<'in' | 'out' | 'cut'>('in');

  const run = wants && !failed;

  const frame = useRef<HTMLDivElement>(null);
  const film = useRef<HTMLVideoElement>(null);

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
  }, [run]);

  // After a restart, let one frame paint at full opacity with no transition
  // before transitions apply again.
  useEffect(() => {
    if (phase !== 'cut') return;
    // Flush the untransitioned full opacity to the style engine first, or the
    // browser sees 0 → 1 with the transition back on and fades it up again.
    void film.current?.offsetHeight;
    const id = window.setTimeout(() => setPhase('in'), 60);
    return () => window.clearTimeout(id);
  }, [phase]);

  const onTimeUpdate = () => {
    const v = film.current;
    if (!v || !v.duration || phase !== 'in') return;
    if (v.duration - v.currentTime <= DISSOLVE) setPhase('out');
  };

  const onEnded = () => {
    const v = film.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play().catch(() => {});
    setPhase('cut');
  };

  const shown = ready && phase !== 'out';

  return (
    <div ref={frame} className="absolute inset-0">
      {/* The poster: the clip's first frame. It carries the description only
          where it is the whole ground; under the film it is decoration. The
          still drifts slowly when there is no film to move it. */}
      <div className={`media media-flat absolute inset-0${reduce || run ? '' : ' hero-drift'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={POSTER}
          alt={run ? '' : 'The towers of Dubai Marina under a moving afternoon sky'}
          aria-hidden={run || undefined}
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="block h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
      </div>

      {/* The film. Muted and inline — what autoplay costs on every mobile
          browser — and out of the tab order and the accessibility tree,
          because it is the ground rather than content. */}
      {run && (
        <video
          ref={film}
          aria-hidden
          tabIndex={-1}
          autoPlay
          muted
          playsInline
          preload="auto"
          src={FILM}
          poster={POSTER}
          onLoadedData={() => setReady(true)}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          onError={() => setFailed(true)}
          style={{ objectPosition: position }}
          className={`absolute inset-0 h-full w-full object-cover ${
            phase === 'cut'
              ? 'transition-none'
              : `transition-opacity ease-premium ${phase === 'out' ? 'duration-[1200ms]' : 'duration-[1400ms]'}`
          } ${shown ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}
