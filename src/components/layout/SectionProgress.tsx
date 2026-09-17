'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

interface Section {
  /** The element's id, used as the anchor target. */
  id: string;
  /** The section's own name, taken from its kicker. */
  label: string;
  el: HTMLElement;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Two lists describe the same page only if they are the same elements.
 *
 * Ids and labels are not enough: one article's sections are named exactly like
 * the next one's, so comparing names alone would hold on to the outgoing
 * page's elements — detached from the document, and never again crossing the
 * band the observer watches, which would leave the rail frozen on whichever
 * section the reader left.
 */
function same(a: Section[], b: Section[]) {
  return (
    a.length === b.length &&
    a.every((s, i) => s.el === b[i].el && s.id === b[i].id && s.label === b[i].label)
  );
}

/**
 * The page's own index.
 *
 * A vertical rail on the right of the frame carrying the number, name and
 * position of the section currently in the viewport — the masthead's side rail,
 * generalised so that every page has one and it follows the reader.
 *
 * Sections declare themselves. Any element carrying `data-section="Name"`
 * inside `<main>` is picked up, in document order, and numbered from it: there
 * is no per-page configuration here and nothing to keep in step when a page is
 * re-ordered. The list is rebuilt on navigation and whenever the contents of
 * `<main>` change, so a route change cannot leave a stale name or number behind.
 *
 * Which section is current is decided by an IntersectionObserver watching a
 * narrow band across the middle of the viewport, never by scroll arithmetic, so
 * it stays correct whatever height a section happens to be. The fill on the
 * rail follows that answer rather than the scrollbar — how far through the
 * sections you are, which is not what the hairline at the top of the frame
 * already says — and it travels as a MotionValue, so it never re-renders React.
 *
 * Below 1024 the rail loses its vertical name and keeps the ticks; below 768 it
 * becomes a single line at the foot of the frame that cannot be tapped and
 * fades out when the reader stops scrolling, so it can never sit over content
 * or take a tap meant for something else.
 */
export function SectionProgress() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState(0);

  /* ---------- Discover the sections on this page ---------- */

  const scan = useCallback(() => {
    const main = document.getElementById('main');
    if (!main) return;

    const next: Section[] = [];
    main.querySelectorAll<HTMLElement>('[data-section]').forEach((el, i) => {
      const label = el.dataset.section?.trim();
      if (!label) return;
      // The rail links to the section, so it needs something to link to.
      if (!el.id) el.id = `sec-${slugify(label) || 'section'}-${i + 1}`;
      next.push({ id: el.id, label, el });
    });

    setSections((prev) => (same(prev, next) ? prev : next));
  }, []);

  useEffect(() => {
    setActive(0);

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    };

    schedule();

    const main = document.getElementById('main');
    const mo = main ? new MutationObserver(schedule) : null;
    mo?.observe(main as HTMLElement, { childList: true, subtree: true });

    // The route transition swaps the page after an exit animation, so the new
    // sections can land a beat after the pathname changes.
    const settle = window.setTimeout(schedule, 800);

    return () => {
      cancelAnimationFrame(raf);
      mo?.disconnect();
      window.clearTimeout(settle);
    };
  }, [pathname, scan]);

  /* ---------- Decide which one is current ---------- */

  useEffect(() => {
    if (sections.length === 0) return;

    const visible = new Set<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        // The topmost section crossing the band wins. When nothing crosses it —
        // over the footer, say — the last answer stands rather than blanking.
        const i = sections.findIndex((s) => visible.has(s.el));
        if (i !== -1) setActive((prev) => (prev === i ? prev : i));
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    sections.forEach((s) => io.observe(s.el));
    return () => io.disconnect();
  }, [sections]);

  /* ---------- The fill on the rail ----------
     How far through the sections the reader is, not how far down the document.
     Raw scroll progress is already the hairline across the top of the frame; a
     second gold line repeating it — on its own smoothing, so never quite in
     step — would only read as a fault. This one moves with the rail's ticks. */

  const target = useMotionValue(0);
  const fill = useSpring(target, { stiffness: 170, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    target.set(sections.length > 0 ? (active + 1) / sections.length : 0);
  }, [active, sections.length, target]);

  /* ---------- Phone: show it while scrolling, then let it go ---------- */

  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => {
      setIdle(false);
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setIdle(true), 1600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(idleTimer.current);
    };
  }, []);

  /* ---------- Stand down over the footer ----------
     The index reports a position within the page's sections. The footer is
     not one of them — it sits outside `<main>` — so once the reader has
     reached it the rail is reporting on a section they have already left,
     and a number held over the closing frame is simply clutter on it. */

  const [atFoot, setAtFoot] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const io = new IntersectionObserver(
      ([e]) => setAtFoot(e.isIntersecting),
      // Fires once the footer has taken the lower half of the viewport, which
      // is the point at which the last section stops being what is on screen.
      { rootMargin: '-50% 0px 0px 0px', threshold: 0 },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, [pathname]);

  // Nothing is rendered on the server or before the first scan, so there is no
  // markup to mismatch on hydration.
  if (sections.length < 2) return null;

  const current = sections[Math.min(active, sections.length - 1)];
  const enter = reduce ? { opacity: 0 } : { opacity: 0, y: 10 };
  const centre = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };
  const leave = reduce ? { opacity: 0 } : { opacity: 0, y: -10 };

  return (
    <>
      {/* ---------------- The rail, from 768 up ---------------- */}
      <nav
        aria-label="Page sections"
        className={`fixed right-[max(0.75rem,calc(var(--gutter)-1.75rem))] top-1/2 z-[90] hidden -translate-y-1/2 flex-col items-center gap-[clamp(0.75rem,1.4vw,1.15rem)] md:flex ${
          reduce ? '' : 'transition-opacity duration-500 ease-premium'
        } ${atFoot ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      >
        {/* The number of the section you are in. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`n-${current.id}`}
            className="t-num text-[0.7rem] text-gold"
            initial={enter}
            animate={centre}
            exit={leave}
            transition={{ duration: reduce ? 0.2 : 0.42, ease: EASE }}
          >
            {pad(active + 1)}
          </motion.span>
        </AnimatePresence>

        {/* The line. One tick per section, over a hairline that fills as the
            page is read. Each tick is the link to its own section. */}
        <ol className="relative flex flex-col items-center gap-[clamp(0.4rem,0.7vw,0.6rem)]">
          <span
            aria-hidden
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--line-soft)]"
          />
          {!reduce && (
            <motion.span
              aria-hidden
              style={{ scaleY: fill }}
              className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-[var(--line-gold)]"
            />
          )}

          {sections.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.id} className="relative flex">
                <a
                  href={`#${s.id}`}
                  aria-label={`Section ${pad(i + 1)}: ${s.label}`}
                  aria-current={on ? 'true' : undefined}
                  className="group flex items-center px-2 py-[0.3rem] focus-visible:outline-none"
                >
                  <span
                    className={`block h-px transition-all duration-500 ease-premium ${
                      on
                        ? 'w-4 bg-gold'
                        : 'w-2 bg-ivory/30 group-hover:w-3.5 group-hover:bg-ivory/70 group-focus-visible:w-3.5 group-focus-visible:bg-gold'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ol>

        {/* The name of the section you are in, set along the edge of the frame.
            Held back below 1024, where the gutter is too narrow to give it. */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`l-${current.id}`}
              className="t-vertical t-label block max-h-[38vh] overflow-hidden text-ivory"
              initial={enter}
              animate={centre}
              exit={leave}
              transition={{ duration: reduce ? 0.2 : 0.45, ease: EASE }}
            >
              {current.label}
            </motion.span>
          </AnimatePresence>
        </div>

        <span aria-hidden className="block h-[clamp(1.5rem,4vh,2.5rem)] w-px bg-[var(--line)]" />

        {/* How many there are in all. */}
        <span className="t-num text-[0.7rem] text-stone">{pad(sections.length)}</span>
      </nav>

      {/* ---------------- The phone line, below 768 ----------------
          It reports position and nothing else: it takes no pointer events, so
          it can never intercept a tap, and it stands down once the reader
          stops scrolling. */}
      <div
        aria-hidden
        className={`pointer-events-none fixed bottom-[max(0.875rem,env(safe-area-inset-bottom))] left-[var(--gutter)] right-[var(--gutter)] z-[90] flex justify-start md:hidden ${
          reduce ? '' : 'transition-opacity duration-500 ease-premium'
        } ${idle || atFoot ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="flex max-w-full items-center gap-2.5 rounded-[var(--r-md)] border border-ivory/10 bg-[rgba(6,6,8,0.72)] px-3 py-2 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.9)] backdrop-blur-md">
          <span className="t-num text-[0.66rem] text-gold">{pad(active + 1)}</span>
          <span className="t-num text-[0.66rem] text-stone">/ {pad(sections.length)}</span>
          <span className="block h-px w-4 shrink-0 bg-[var(--line-strong)]" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`m-${current.id}`}
              className="t-label truncate text-ivory"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0.2 : 0.4, ease: EASE }}
            >
              {current.label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
