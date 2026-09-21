'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

import { heroCopy, contact } from '@/data/site';
import { Picture } from '@/components/ui/Picture';
import { ButtonLink } from '@/components/ui/Button';
import { useIntroDelay } from '@/lib/intro';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The masthead's film.
 *
 * The supplied file, untouched — not renamed, re-encoded or replaced. Its name
 * carries an ellipsis, so the path is percent-encoded at the reference site
 * and `/public` never appears in the URL, the same way the clip before it was
 * referenced.
 */
const FILM = '/videos/Dubai_skyline_day-to-night_timel%E2%80%A6_1080p_20260921170851.mp4';

/**
 * The headline is broken differently on phones so no line ever has to wrap
 * inside its own mask. Both copies are decorative; the accessible name comes
 * from the screen-reader span.
 */
const DESKTOP_LINES = heroCopy.headline; // ['A Global Corporate', 'Advisory Platform']
const MOBILE_LINES = ['A Global', 'Corporate', 'Advisory', 'Platform'] as const;
const FULL_HEADLINE = heroCopy.headline.join(' ');

/**
 * Decides whether this device gets the film.
 *
 * Width is deliberately not a condition: a phone gets the city moving behind
 * the statement the same as a desktop does, because that is the masthead. What
 * does disqualify it is anything the browser tells us about the connection or
 * the reader — reduced motion, data-saver, a metered-feeling 2g or 3g link —
 * since thirteen megabytes of timelapse on a constrained connection is not a
 * background, it is a download. Those all fall back to the photograph, which
 * is the same subject held still, and so does a file that fails to load.
 *
 * The decision is made on the client, after mount: the server has no way to
 * know any of it, and the photograph is what both render until it is made.
 */
function useWantsFilm() {
  const [wants, setWants] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)(2g|3g)$/.test(conn.effectiveType)) return;

    setWants(true);
  }, []);

  return wants;
}

/**
 * The masthead.
 *
 * An architectural environment the statement is set into rather than placed
 * beside. The city occupies the whole frame and the type is held to the foot
 * of it — a masthead composition, so the architecture stays the dominant
 * thing on the page and the copy reads as a caption to it.
 *
 * The opening runs as one move: the curtain lifts, the city arrives out of
 * black with the camera already travelling forward, the statement assembles
 * line by line, the rule draws across the foot of the frame, and the
 * supporting row settles under it. Nothing in it is fast.
 *
 * The ground is the supplied film of the city, running behind the statement.
 * Where it is not appropriate — reduced motion, data-saver, a slow connection,
 * a file that will not load — the same composition runs over the same subject
 * as a photograph, held still. The layout, the copy and the timing are
 * identical either way; only the movement behind them is lost.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const d = useIntroDelay();
  const wantsFilm = useWantsFilm();
  const [filmFailed, setFilmFailed] = useState(false);
  const [filmReady, setFilmReady] = useState(false);

  const ref = useRef<HTMLElement>(null);
  const film = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const showFilm = wantsFilm && !filmFailed;

  /* Nothing decodes while the masthead is off screen. The reader is past it
     for the whole of the rest of the page, and a 1080p timelapse running
     behind nine sections is a frame budget spent on nobody. */
  useEffect(() => {
    const el = ref.current;
    if (!el || !showFilm) return;

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
  }, [showFilm]);

  // The index names this frame for the firm rather than 'Introduction', which
  // would sit directly above the statement welcoming the reader and read as
  // the same entry twice.
  return (
    <section
      data-section="SOFISAM"
      ref={ref}
      className="tone-dark grain relative min-h-[100svh] w-full overflow-hidden bg-void"
      aria-label="Introduction"
    >
      {/* ---------- Ground ----------
          The photograph is always laid down first. It is the frame the film
          fades up out of, so there is no black flash on a reload and nothing
          to catch while the first seconds arrive, and it is the whole ground
          wherever the film is not run. It carries the accessible description
          only in that case; under the film it is decoration, because the film
          above it is the subject and is itself decorative. */}
      <div className="media media-flat absolute inset-0">
        <Picture
          name="city-blue-night"
          alt={showFilm ? '' : 'Aerial view of an international financial district lit at night'}
          decorative={showFilm}
          sizes="100vw"
          priority
          focal="50% 50%"
          className="h-full w-full"
        />
      </div>

      {showFilm && (
        /* Cover at every ratio, from a tall phone to an ultrawide: the file is
           16:9 and the frame is whatever the viewport is, so the crop is the
           centre of the city in both directions. Muted, looping and inline,
           which is what autoplay costs; out of the tab order and out of the
           accessibility tree, because it is the ground rather than content.

           The scale is not a flourish. The generator left its mark in the
           lower right of the source — a translucent four-pointed star at
           roughly 89% across and 82% down — and the honest way to be rid of it
           is to frame it out rather than to paint over it. Anchoring the
           enlargement at the top left takes the whole of the crop off the
           right and the bottom: the mark goes with about two and a half per
           cent of the frame to spare at 16:9, the worst case, and further to
           spare at every other ratio, since anything narrower has already
           cropped that edge away. The top is untouched, which is what keeps
           the tower's spire in frame, and the bottom that is lost is the
           interchange under the heaviest part of the scrim. */
        <video
          ref={film}
          aria-hidden
          tabIndex={-1}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setFilmReady(true)}
          onError={() => setFilmFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover object-center [transform-origin:0_0] [transform:scale(1.16)] transition-opacity duration-[1400ms] ease-premium ${
            filmReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={FILM} type="video/mp4" />
        </video>
      )}

      {/* The scrim. Heavy at the foot, where the statement sits; almost
          nothing through the upper two thirds, which is the city.

          Carried a little heavier through the lower half than the photograph
          needed. The film passes through dusk into a lit interchange, so the
          brightest thing in the frame arrives underneath the copy rather than
          above it, and on a tall phone the 16:9 crop puts more of it there.
          The upper frame is untouched: that is still the city. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgba(5,5,5,0.96)_0%,rgba(5,5,5,0.88)_22%,rgba(5,5,5,0.52)_52%,rgba(5,5,5,0.18)_74%,rgba(5,5,5,0.55)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(120%_85%_at_50%_40%,transparent_35%,rgba(5,5,5,0.55)_100%)]"
      />

      {/* The side rail that used to be pinned here — 01 / Introduction / 09 —
          is now `SectionProgress`, mounted once in the root layout. It is the
          same object, but it reads the page rather than being told about it,
          so it follows the reader past the masthead instead of scrolling away
          with it, and every page has one. */}

      {/* ---------- Statement ---------- */}
      <motion.div
        className="shell relative z-10 flex min-h-[100svh] flex-col pb-[clamp(1.5rem,4vh,2.75rem)] pt-[calc(var(--header-h)+clamp(1.25rem,4vh,2.5rem))]"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* The frame is left open through its middle: that is the city. */}
        <div className="flex-1" />

        {/* Eyebrow */}
        <motion.div
          className="kicker"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: d + 0.15 }}
        >
          <p className="t-label">{heroCopy.eyebrow}</p>
        </motion.div>

        {/* The statement, held to the foot of the frame */}
        <h1 className="t-hero mt-[clamp(0.875rem,1.8vw,1.5rem)] max-w-[15ch] text-ivory">
          <span className="sr-only">{FULL_HEADLINE}</span>
          <span aria-hidden className="block sm:hidden">
            <Lines lines={MOBILE_LINES} reduce={reduce} delay={d + 0.3} />
          </span>
          <span aria-hidden className="hidden sm:block">
            <Lines lines={DESKTOP_LINES} reduce={reduce} delay={d + 0.3} />
          </span>
        </h1>

        {/* The rule draws across the whole measure, then the row below it
            settles — the moment the composition closes. */}
        <motion.span
          aria-hidden
          className="mt-[clamp(1.75rem,3.5vw,3rem)] block h-px w-full origin-left bg-[var(--line-strong)]"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: d + 0.75 }}
        />

        <div className="mt-[clamp(1.5rem,2.6vw,2.25rem)] grid gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-12 lg:items-start">
          <motion.p
            className="t-lead max-w-[46ch] text-ivory/72 lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: d + 0.85 }}
          >
            {heroCopy.statement}
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:col-span-4 lg:col-start-7"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: d + 1 }}
          >
            <ButtonLink href={heroCopy.primaryCta.href} tone="light" variant="solid">
              {heroCopy.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={heroCopy.secondaryCta.href} tone="light" variant="outline">
              {heroCopy.secondaryCta.label}
            </ButtonLink>
          </motion.div>

          <motion.div
            className="hidden lg:col-span-2 lg:col-start-11 lg:block lg:text-right"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: d + 1.1 }}
          >
            <p className="t-label text-stone">Headquarters</p>
            <p className="t-small mt-3 text-ivory/55">{contact.headquarters}</p>
          </motion.div>
        </div>

        {/* Foot — the location on a phone, and the scroll cue on every size */}
        <motion.div
          className="mt-[clamp(1.5rem,3vh,2.5rem)] flex items-end justify-between gap-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: d + 1.15 }}
        >
          <p className="t-label max-w-[18ch] text-stone lg:invisible">
            {contact.headquarters}
          </p>

          <a
            href="#welcome"
            className="group flex shrink-0 items-center gap-3 py-1 text-stone transition-colors duration-500 hover:text-gold"
          >
            <span className="t-label hidden sm:block">Scroll</span>
            <span className="badge h-10 w-10 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
              <ArrowDown
                aria-hidden
                strokeWidth={1.4}
                className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-y-0.5"
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
            transition={{ duration: 1.15, ease: EASE, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}
