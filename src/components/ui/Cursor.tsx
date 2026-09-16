'use client';

import { useEffect, useRef } from 'react';

/**
 * Pointer.
 *
 * A gold dot that tracks the cursor exactly and a hairline ring that follows a
 * frame behind it. Over anything interactive the ring opens and the dot
 * recedes, so the cursor reads the interface rather than decorating it.
 *
 * It attaches only on a device with a real pointer that is not asking for
 * reduced motion. The native cursor is hidden only once this component is
 * live — `data-cursor="on"` is what the stylesheet keys off — so if the script
 * never runs, the ordinary cursor is simply left alone.
 *
 * Positions are written straight to the element's transform inside a single
 * animation frame; nothing here goes through React state.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduce.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let target = 1;
    let visible = false;
    let frame = 0;

    const INTERACTIVE =
      'a, button, [role="button"], input, textarea, select, summary, [data-cursor-hover]';

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      if (!visible) {
        visible = true;
        rx = x;
        ry = y;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        // The native cursor is hidden only once there is something to
        // replace it with, so the pointer is never missing.
        root.dataset.cursor = 'on';
      }

      target = (e.target as Element | null)?.closest?.(INTERACTIVE) ? 1.75 : 1;
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const tick = () => {
      // The ring eases toward the pointer; the dot is exact.
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      scale += (target - scale) * 0.14;

      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      ring.style.borderColor =
        scale > 1.3 ? 'rgba(197, 164, 126, 0.85)' : 'rgba(197, 164, 126, 0.42)';

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      delete root.dataset.cursor;
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[150] hidden lg:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border opacity-0 transition-opacity duration-500"
        style={{ borderColor: 'rgba(197, 164, 126, 0.42)' }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-[5px] w-[5px] rounded-full bg-gold opacity-0 transition-opacity duration-500"
      />
    </div>
  );
}
