'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Minus, Move, Plus, RotateCcw } from 'lucide-react';

import type { GlobeHandle, GlobeHub } from '@/components/ui/Globe';
import { useTheme } from '@/lib/theme';
import { SectionHeader } from '@/components/ui/SectionHeader';

const EASE = [0.16, 1, 0.3, 1] as const;

// Three.js and the land texture load only when the section is close to view.
const Globe = dynamic(() => import('@/components/ui/Globe').then((m) => m.Globe), { ssr: false });

type Hub = GlobeHub & { tier: string };

const hubs: Hub[] = [
  { key: 'dubai', name: 'Dubai', tier: 'World Headquarters · DMCC', lon: 55.14, lat: 25.07, hq: true, side: 'r' },
  { key: 'london', name: 'London', tier: 'European Financial Centre', lon: -0.13, lat: 51.51, side: 'l' },
  { key: 'new-york', name: 'New York', tier: 'Americas Capital Hub', lon: -74.0, lat: 40.71, side: 'l' },
  { key: 'geneva', name: 'Geneva', tier: 'Private Capital & Advisory', lon: 6.14, lat: 46.2, minor: true, side: 'r' },
  { key: 'riyadh', name: 'Riyadh', tier: 'Regional Institutional Partner', lon: 46.68, lat: 24.71, side: 'l' },
  { key: 'abu-dhabi', name: 'Abu Dhabi', tier: 'Regional Capital Hub', lon: 54.37, lat: 24.45, minor: true, side: 'l' },
  { key: 'singapore', name: 'Singapore', tier: 'Asia-Pacific Gateway', lon: 103.82, lat: 1.35, side: 'r' },
  { key: 'hong-kong', name: 'Hong Kong', tier: 'Asia Financial Centre', lon: 114.17, lat: 22.32, side: 'r' },
];

const [hq, ...centres] = hubs;

const controlClass =
  'flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--plate)]/80 text-[var(--sage)] shadow-[var(--control-shadow)] backdrop-blur-md transition-colors duration-300 hover:border-[var(--line-gold)] hover:text-[var(--ivory)] disabled:pointer-events-none disabled:opacity-40 sm:h-11 sm:w-11';

export function GlobalNetwork({ lead, note }: { lead: string; note: string }) {
  const reduce = useReducedMotion() ?? false;
  const theme = useTheme();
  const stage = useRef<HTMLDivElement>(null);
  // Mounted a screen ahead, so the texture is in hand by the time it is seen.
  const near = useInView(stage, { once: true, margin: '600px 0px' });
  const globe = useRef<GlobeHandle | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0);
  const [touched, setTouched] = useState(false);
  const [failed, setFailed] = useState(false);

  // The globe reads this through a ref on every frame, so a fresh closure
  // per render is harmless.
  const select = (key: string) => {
    const next = active === key ? null : key;
    setActive(next);
    globe.current?.focus(next);
  };

  const reset = () => {
    setActive(null);
    setZoom(0);
    globe.current?.reset();
  };

  const zoomBy = (step: 1 | -1) => {
    setZoom((z) => Math.min(Math.max(z + step, 0), 2));
    globe.current?.zoom(step);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const g = globe.current;
    if (!g) return;
    const map: Record<string, () => void> = {
      ArrowLeft: () => g.nudge(-12, 0),
      ArrowRight: () => g.nudge(12, 0),
      ArrowUp: () => g.nudge(0, 8),
      ArrowDown: () => g.nudge(0, -8),
      '+': () => zoomBy(1),
      '=': () => zoomBy(1),
      '-': () => zoomBy(-1),
      Home: reset,
      '0': reset,
    };
    const fn = map[e.key];
    if (fn) {
      e.preventDefault();
      fn();
      setTouched(true);
    }
  };

  const selectedHub = hubs.find((h) => h.key === active);

  return (
    <section
      data-section="Global Perspective"
      className="relative bg-[var(--void)] py-16 sm:py-20 lg:py-24 border-b border-[var(--line-soft)]"
      aria-labelledby="global-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <SectionHeader
          ruled
          label="Global Perspective"
          heading="One vantage point. A&nbsp;global field of view."
          headingId="global-heading"
          copy={
            <>
              <p className="t-body text-[var(--ivory-2)]">{lead}</p>
              <p className="mt-1.5 t-small text-[var(--sage)]">{note}</p>
            </>
          }
        />

        {/* Content & Globe stage (Left: Centres & Narrative, Right: Interactive Globe) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.85, ease: EASE }}
          className="mt-10 overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)] flex flex-col lg:grid lg:grid-cols-12"
        >
          {/* Left Column on Desktop / First on Mobile: The Centres & Relationships */}
          <div className="order-1 flex flex-col border-b border-[var(--line)] p-5 sm:p-8 lg:order-1 lg:col-span-4 lg:border-r lg:border-b-0 lg:p-10">
            <p className="t-label text-gold">Financial Centres</p>

            <button
              type="button"
              aria-pressed={active === hq.key}
              onClick={() => select(hq.key)}
              className="group mt-5 flex items-start gap-3 border-y border-[var(--line)] py-5 text-left"
            >
              <span className="relative mt-2 flex h-2.5 w-2.5 flex-none">
                <span className="absolute inset-0 rounded-full bg-[var(--brass)] opacity-40 motion-safe:animate-ping" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--brass)]" />
              </span>
              <span>
                <span className="block font-display text-[clamp(1.5rem,2vw,1.875rem)] font-light leading-tight text-[var(--ivory)] transition-colors group-hover:text-[var(--gold)]">
                  {hq.name}
                </span>
                <span className="mt-1 block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--brass)]">
                  {hq.tier}
                </span>
              </span>
            </button>

            <ul className="mt-1 grid grid-cols-2 gap-x-5 lg:grid-cols-1">
              {centres.map((c) => {
                const on = active === c.key;
                return (
                  <li key={c.key} className="border-b border-[var(--line-soft)]">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => select(c.key)}
                      className={`group relative flex w-full items-baseline gap-2.5 py-3 text-left lg:py-3.5 transition-all ${
                        on ? 'pl-2.5 border-l-2 border-[var(--brass)]' : 'pl-0 border-l-2 border-transparent'
                      }`}
                    >
                      <span className="min-w-0">
                        <span
                          className={`block text-sm font-medium transition-colors duration-300 ${
                            on ? 'text-[var(--gold)]' : 'text-[var(--ivory)] group-hover:text-[var(--gold)]'
                          }`}
                        >
                          {c.name}
                        </span>
                        <span className="mt-0.5 hidden text-xs leading-snug text-[var(--sage)] sm:block">{c.tier}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p aria-live="polite" className="mt-5 text-xs leading-relaxed text-[var(--stone)] lg:mt-auto lg:pt-6">
              {selectedHub
                ? selectedHub.hq
                  ? 'Dubai — the headquarters every relationship is held from.'
                  : `${selectedHub.name} · ${selectedHub.tier}`
                : 'Select a centre to bring it into view.'}
            </p>
          </div>

          {/* Right Column on Desktop / Second on Mobile: Globe Stage Visual Element */}
          <div
            ref={stage}
            role="application"
            aria-roledescription="interactive globe"
            aria-label="Globe centred on the SOFISAM headquarters in Dubai, with arcs to London, New York, Geneva, Riyadh, Abu Dhabi, Singapore and Hong Kong. Use the arrow keys to turn it, plus and minus to zoom, and Home to return to Dubai."
            tabIndex={0}
            onKeyDown={onKey}
            className="globe-stage order-2 relative aspect-[10/11] w-full outline-offset-[-3px] sm:aspect-[4/3] lg:order-2 lg:col-span-8 lg:aspect-auto lg:h-[clamp(34rem,44vw,50rem)]"
          >
            {near && !failed && (
              <Globe
                hubs={hubs}
                active={active}
                onSelect={select}
                onInteract={() => setTouched(true)}
                onFail={() => setFailed(true)}
                theme={theme}
                reduce={reduce}
                handleRef={globe}
              />
            )}

            {failed && (
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <p className="max-w-[30ch] t-body text-[var(--sage)]">
                  Headquartered in Dubai, with relationships across London, New York, Geneva, Riyadh, Abu
                  Dhabi, Singapore and Hong Kong.
                </p>
              </div>
            )}

            {/* Hint */}
            {!failed && (
              <p
                aria-hidden
                className={`pointer-events-none absolute bottom-4 left-4 hidden items-center xs:flex gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[var(--stone)] transition-opacity duration-700 sm:bottom-6 sm:left-6 ${
                  touched ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Move strokeWidth={1.5} className="h-3.5 w-3.5" />
                <span>Drag to explore</span>
              </p>
            )}

            {/* Controls */}
            {!failed && (
              <div className="absolute bottom-3 right-3 flex items-center gap-2 sm:bottom-5 sm:right-5">
                <button type="button" aria-label="Zoom out" disabled={zoom === 0} onClick={() => zoomBy(-1)} className={controlClass}>
                  <Minus strokeWidth={1.5} className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Zoom in" disabled={zoom === 2} onClick={() => zoomBy(1)} className={controlClass}>
                  <Plus strokeWidth={1.5} className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Return to Dubai" onClick={reset} className={controlClass}>
                  <RotateCcw strokeWidth={1.5} className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* 3 Metric Summary Pillars */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="group p-6 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]">
            <p className="t-label text-gold">
              Headquarters
            </p>
            <p className="t-card mt-2 text-[var(--ivory)]">
              Dubai, DMCC
            </p>
            <p className="mt-2 t-small text-[var(--sage)]">
              World headquarters at the crossroads of international capital flows.
            </p>
          </div>

          <div className="group p-6 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]">
            <p className="t-label text-gold">
              Reach
            </p>
            <p className="t-card mt-2 text-[var(--ivory)]">
              4 Continents
            </p>
            <p className="mt-2 t-small text-[var(--sage)]">
              Relationships across Europe, the Middle East, the Americas, and Asia.
            </p>
          </div>

          <div className="group p-6 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]">
            <p className="t-label text-gold">
              Method
            </p>
            <p className="t-card mt-2 text-[var(--ivory)]">
              Principal Relationships
            </p>
            <p className="mt-2 t-small text-[var(--sage)]">
              Confidential, unconflicted advisory conducted by senior principals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
