'use client';

import { useEffect, useRef, useState } from 'react';

import { Picture } from '@/components/ui/Picture';

/**
 * Local asset in /public/videos. The filename contains spaces, so it is
 * percent-encoded here — the browser URL must never include /public.
 */
const HERO_VIDEO_SRC = '/videos/West%20Point%20Gold.mp4';

interface HeroVideoProps {
  /** Poster asset name in the image manifest — also the still fallback. */
  poster: string;
  posterAlt: string;
  focal?: string;
  className?: string;
}

/**
 * Cinematic hero background.
 *
 * The poster still renders immediately and carries first paint; the video is
 * attached only after mount, so it never competes with the LCP text or blocks
 * render. One local file serves every viewport. Playback is skipped entirely
 * under reduced motion, on a saveData connection, or on a very slow effective
 * connection — in each of those cases the still simply remains.
 *
 * Both the still and the footage carry a very slow drift, so the frame is
 * never completely static even before the video has arrived.
 */
export function HeroVideo({
  poster,
  posterAlt,
  focal = '50% 55%',
  className = '',
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // The clip is a single large file. A phone shows it in a portrait crop
    // where it adds very little over the still, and is the most likely device
    // to be paying for the bytes, so the video is a desktop and tablet
    // treatment only.
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    // Respect data-saver and genuinely slow connections.
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)(2g|3g)$/.test(conn.effectiveType)) return;

    setSrc(HERO_VIDEO_SRC);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;

    const onPlaying = () => setReady(true);
    v.addEventListener('playing', onPlaying);

    // Autoplay can still be refused; the still stays visible if it is.
    const attempt = v.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});

    return () => v.removeEventListener('playing', onPlaying);
  }, [src]);

  // Pause when scrolled away — no reason to decode frames nobody can see.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const a = v.play();
          if (a && typeof a.catch === 'function') a.catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.01 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink ${className}`}>
      {/* Still — carries first paint and remains the fallback. */}
      <Picture
        name={poster}
        alt={posterAlt}
        sizes="100vw"
        priority
        focal={focal}
        className="absolute inset-0 h-full w-full animate-slow-drift object-cover"
      />

      {src && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster="/videos/hero-poster.jpg"
          aria-hidden
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full animate-slow-drift object-cover transition-opacity duration-[1600ms] ease-premium ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectPosition: focal }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
