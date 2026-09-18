'use client';

import { useCallback, useEffect, useLayoutEffect, useState, useSyncExternalStore } from 'react';
import type { RefObject } from 'react';

import { STORAGE_KEY } from './theme-script';

export type Theme = 'light' | 'dark';

type ThemeApi = { apply: (t: Theme, ease: boolean) => void; key: string };

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => mo.disconnect();
}

/**
 * The theme in force. The server has no way to know it, so it renders the
 * dark default and the client settles on the real value straight after
 * hydration — without a mismatch, because the snapshot differs rather than
 * the markup React is reconciling.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => 'dark');
}

/** A choice made by the visitor. It is remembered and outranks the system. */
export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Private browsing — the choice holds for this page view. */
  }
  const api = (window as Window & { __sofisamTheme?: ThemeApi }).__sofisamTheme;
  if (api) {
    api.apply(theme, true);
  } else {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }
}

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Whether a fixed element is sitting over a tone-dark passage — a masthead or
 * any other frame whose type is set over a photograph.
 *
 * A fixed element has no ground of its own, so it borrows the one under it:
 * the header over a masthead has to read light even in the light theme,
 * because what it is actually set on is the photograph. The point sampled is
 * given by `probe`, relative to the element's own box; anything marked
 * `data-tone-ignore` (the curtain, the other fixed furniture) is looked
 * through rather than taken as the ground.
 */
export function useDarkUnder(
  ref: RefObject<HTMLElement | null>,
  probe: (box: DOMRect) => { x: number; y: number },
  initial: boolean,
  deps: unknown[] = [],
) {
  const [dark, setDark] = useState(initial);

  // `probe` is an inline function at every call site; it is read through a
  // stable callback so it does not re-subscribe on every render.
  const sample = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const { x, y } = probe(box);
    if (x < 0 || y < 0 || x >= window.innerWidth || y >= window.innerHeight) return;
    const under = document
      .elementsFromPoint(x, y)
      .find((n) => !el.contains(n) && !n.closest('[data-tone-ignore]'));
    setDark(Boolean(under?.closest('.tone-dark')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  useIsoLayoutEffect(() => {
    let raf = 0;
    const schedule = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          sample();
        });
      }
    };

    sample();
    // The route transition fades the outgoing page before the incoming one
    // arrives; sample again once it has.
    const late = window.setTimeout(sample, 700);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(late);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sample, ...deps]);

  return dark;
}
