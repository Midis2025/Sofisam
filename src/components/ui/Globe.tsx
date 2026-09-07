'use client';

import { useEffect, useRef } from 'react';
import landDots from '@/data/land-dots.json';

const DOTS = landDots as [number, number][];

/** Dubai — the firm's stated world headquarters. Used as the visual anchor. */
const ANCHOR = { lon: 55.14, lat: 25.0693 };

/**
 * Abstract destination points for the connection arcs. These are deliberately
 * unlabelled and represent international reach and relationships — they are
 * not office locations and are never presented as such.
 */
const ARC_TARGETS: [number, number][] = [
  [-0.13, 51.5],
  [-74.0, 40.71],
  [103.82, 1.35],
  [8.68, 50.11],
  [72.88, 19.08],
  [116.4, 39.9],
  [-46.63, -23.55],
  [151.21, -33.87],
  [3.38, 6.52],
  [37.62, 55.75],
];

const DEG = Math.PI / 180;

function toVec(lon: number, lat: number): [number, number, number] {
  const la = lat * DEG;
  const lo = lon * DEG;
  return [Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)];
}

/** Rotate about Y (spin) then X (tilt). Returns camera-space coordinates. */
function rotate(
  v: [number, number, number],
  spin: number,
  tilt: number,
): [number, number, number] {
  const [x, y, z] = v;
  const cs = Math.cos(spin);
  const ss = Math.sin(spin);
  const x1 = x * cs + z * ss;
  const z1 = -x * ss + z * cs;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  const y2 = y * ct - z1 * st;
  const z2 = y * st + z1 * ct;
  return [x1, y2, z2];
}

function slerp(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-6) return a;
  const s = Math.sin(omega);
  const k0 = Math.sin((1 - t) * omega) / s;
  const k1 = Math.sin(t * omega) / s;
  return [a[0] * k0 + b[0] * k1, a[1] * k0 + b[1] * k1, a[2] * k0 + b[2] * k1];
}

export function Globe({ className = '' }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let radius = 0;
    let dpr = 1;

    // Positions Dubai near the centre of the visible face on first paint.
    let spin = -0.92;
    let tilt = -0.14;
    let spinVel = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let pointerId: number | null = null;
    let visible = true;
    let raf = 0;
    let t0 = performance.now();

    const anchorVec = toVec(ANCHOR.lon, ANCHOR.lat);
    const dotVecs = DOTS.map(([lon, lat]) => toVec(lon, lat));
    const arcs = ARC_TARGETS.map((tgt) => {
      const b = toVec(tgt[0], tgt[1]);
      const pts: [number, number, number][] = [];
      const N = 46;
      for (let i = 0; i <= N; i++) pts.push(slerp(anchorVec, b, i / N));
      return pts;
    });

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      radius = Math.min(width, height) * 0.435;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (v: [number, number, number]) => {
      const r = rotate(v, spin, tilt);
      return {
        x: width / 2 + r[0] * radius,
        y: height / 2 - r[1] * radius,
        z: r[2],
      };
    };

    const draw = (now: number) => {
      const dt = Math.min((now - t0) / 1000, 0.05);
      t0 = now;

      if (!dragging) {
        spin += (reduce ? 0 : 0.055) * dt + spinVel * dt;
        spinVel *= Math.pow(0.0016, dt); // inertial decay
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Sphere ground — a faint radial wash so the form reads as solid.
      const grad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.4,
        radius * 0.1,
        cx,
        cy,
        radius,
      );
      grad.addColorStop(0, 'rgba(197,164,126,0.075)');
      grad.addColorStop(0.65, 'rgba(197,164,126,0.022)');
      grad.addColorStop(1, 'rgba(11,11,12,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Limb
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(197,164,126,0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Graticule
      ctx.strokeStyle = 'rgba(246,244,239,0.1)';
      ctx.lineWidth = 0.8;
      for (let lon = -180; lon < 180; lon += 20) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 4) {
          const p = project(toVec(lon, lat));
          if (p.z < 0) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 4) {
          const p = project(toVec(lon, lat));
          if (p.z < 0) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Landmass dots
      const dotR = Math.max(0.85, radius * 0.0068);
      for (let i = 0; i < dotVecs.length; i++) {
        const p = project(dotVecs[i]);
        if (p.z <= 0.02) continue;
        const a = 0.26 + p.z * 0.74;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(246,244,239,${a.toFixed(3)})`;
        ctx.fill();
      }

      // Connection arcs — drawn only where both the path and anchor face us.
      ctx.lineWidth = 1.1;
      for (const pts of arcs) {
        ctx.beginPath();
        let started = false;
        let visiblePts = 0;
        for (const v of pts) {
          const p = project(v);
          if (p.z < 0.01) {
            started = false;
            continue;
          }
          visiblePts++;
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        if (visiblePts > 2) {
          ctx.strokeStyle = 'rgba(197,164,126,0.5)';
          ctx.stroke();
        }
      }

      // Anchor
      const a = project(anchorVec);
      if (a.z > 0) {
        const pulse = reduce ? 0.5 : (Math.sin(now / 900) + 1) / 2;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 4 + pulse * 13, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,164,126,${(0.38 * (1 - pulse)).toFixed(3)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(a.x, a.y, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = '#C5A47E';
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      pointerId = e.pointerId;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      spin += dx * 0.006;
      tilt = Math.max(-1.05, Math.min(1.05, tilt + dy * 0.005));
      spinVel = dx * 0.28;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = null;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* capture may already be released */
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !visible) {
          t0 = performance.now();
          raf = requestAnimationFrame(draw);
        }
        if (!nowVisible && visible) cancelAnimationFrame(raf);
        visible = nowVisible;
      },
      { rootMargin: '120px' },
    );
    io.observe(wrap);

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive globe showing SOFISAM's Dubai anchor point and lines representing international relationships"
        className="block h-full w-full touch-none select-none"
        style={{ cursor: 'grab' }}
      />
    </div>
  );
}
