'use client';

import { useEffect, useRef, useState } from 'react';

import { Picture } from '@/components/ui/Picture';

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
 * render. A 720p cut is used on small viewports, and playback is skipped
 * entirely under reduced-motion, on a saveData connection, or on a very slow
 * effective connection — in each of those cases the still simply remains.
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
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // Respect data-saver and genuinely slow connections.
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return;

    const small = window.matchMedia('(max-width: 767px)').matches;
    setSrc(small ? '/videos/hero-dubai-720.mp4' : '/videos/hero-dubai-1080.mp4');
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;

    const onPlaying = () => setReady(true);
    v.addEventListener('playing', onPlaying);

    // Autoplay can still be refused; the poster stays visible if it is.
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
        className="absolute inset-0 h-full w-full"
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
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-premium ${
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
