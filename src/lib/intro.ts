'use client';

import { useState } from 'react';

/**
 * How long a page's opening sequence should wait before it begins.
 *
 * On the first view of a session the preloader curtain is still over the page,
 * so the hero holds until it lifts. On every navigation after that the curtain
 * is skipped and the sequence starts almost immediately.
 *
 * The value is read once, during the first render on the client, and frozen —
 * it only ever feeds a transition delay, so the server and client markup are
 * identical either way.
 */
export function useIntroDelay(whilePreloading = 0.95, otherwise = 0.05) {
  const [delay] = useState(() =>
    typeof document !== 'undefined' &&
    document.documentElement.dataset.preload === 'pending'
      ? whilePreloading
      : otherwise,
  );

  return delay;
}
