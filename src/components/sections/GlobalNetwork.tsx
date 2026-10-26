'use client';

import { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

import { WORLD_GRATICULE, WORLD_H, WORLD_LAND, WORLD_OUTLINE, WORLD_W, project } from '@/data/world-map';

const EASE = [0.16, 1, 0.3, 1] as const;

type Hub = {
  key: string;
  name: string;
  tier: string;
  coords: [number, number];
};

const HQ = project(55.14, 25.07); // Dubai, DMCC

const hubs: Hub[] = [
  { key: 'london', name: 'London', tier: 'European Financial Centre', coords: project(-0.13, 51.51) },
  { key: 'new-york', name: 'New York', tier: 'Americas Capital Hub', coords: project(-74.0, 40.71) },
  { key: 'geneva', name: 'Geneva', tier: 'Private Capital & Advisory', coords: project(6.14, 46.2) },
  { key: 'riyadh', name: 'Riyadh', tier: 'Regional Institutional Partner', coords: project(46.68, 24.71) },
  { key: 'abu-dhabi', name: 'Abu Dhabi', tier: 'Regional Capital Hub', coords: project(54.37, 24.45) },
  { key: 'singapore', name: 'Singapore', tier: 'Asia-Pacific Gateway', coords: project(103.82, 1.35) },
  { key: 'hong-kong', name: 'Hong Kong', tier: 'Asia Financial Centre', coords: project(114.17, 22.32) },
];

function arc([x1, y1]: readonly [number, number], [x2, y2]: readonly [number, number]) {
  const mx = (x1 + x2) / 2;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const my = (y1 + y2) / 2 - len * 0.24;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

export function GlobalNetwork({ lead, note }: { lead: string; note: string }) {
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { once: true, margin: '-10% 0px' });
  const [active, setActive] = useState<string | null>(null);

  const selectedHub = hubs.find((h) => h.key === active);

  return (
    <section
      data-section="Global Perspective"
      className="relative bg-[var(--void)] py-16 sm:py-20 lg:py-24 border-b border-[var(--line-soft)]"
      aria-labelledby="global-heading"
    >
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--brass)]" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                Global Perspective
              </p>
            </div>
            <h2
              id="global-heading"
              className="mt-3 font-display text-[clamp(2.1rem,3.4vw,3.25rem)] font-light tracking-[-0.02em] text-[var(--ivory)]"
            >
              One vantage point. A global field of view.
            </h2>
          </div>
          <div className="max-w-[44ch]">
            <p className="text-sm font-medium leading-relaxed text-[var(--ivory-2)]">{lead}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--sage)]">{note}</p>
          </div>
        </div>

        {/* Global Vector Map Stage */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.85, ease: EASE }}
          className="mt-10 overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-plate)] p-5 sm:p-8 lg:p-10"
        >
          <div ref={stage} className="relative aspect-[1000/450] w-full">
            <svg
              viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
              className="w-full h-full"
              role="img"
              aria-label="Global network map centering on SOFISAM headquarters in Dubai"
            >
              <defs>
                <linearGradient id="gold-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b8945f" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#c5a880" stopOpacity="0.35" />
                </linearGradient>
              </defs>

              {/* World outline and graticule */}
              <path
                d={WORLD_OUTLINE}
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth={0.8}
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={WORLD_GRATICULE}
                fill="none"
                stroke="rgba(0,0,0,0.04)"
                strokeWidth={0.5}
                vectorEffect="non-scaling-stroke"
              />

              {/* Landmass */}
              <path
                d={WORLD_LAND}
                fill="#ebe7df"
                stroke="#d8d3c7"
                strokeWidth={0.6}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />

              {/* Connection Arcs from Dubai (HQ) */}
              {hubs.map((hub, i) => {
                const arcPath = arc(HQ, hub.coords);
                const isSelected = active === hub.key;

                return (
                  <g key={hub.key} className="transition-opacity duration-300">
                    <motion.path
                      d={arcPath}
                      fill="none"
                      stroke={isSelected ? '#9e7d47' : 'url(#gold-line-grad)'}
                      strokeWidth={isSelected ? 2 : 1.1}
                      strokeLinecap="round"
                      strokeDasharray={isSelected ? undefined : '4 3'}
                      vectorEffect="non-scaling-stroke"
                      initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.4, ease: EASE, delay: 0.15 + i * 0.12 }}
                    />
                    {/* Destination node */}
                    <circle
                      cx={hub.coords[0]}
                      cy={hub.coords[1]}
                      r={isSelected ? 4.5 : 2.5}
                      fill={isSelected ? '#9e7d47' : '#b8945f'}
                      className="transition-all duration-300"
                    />
                    <text
                      x={hub.coords[0] + 5}
                      y={hub.coords[1] - 4}
                      className={`text-[9px] font-sans font-medium select-none transition-colors duration-300 ${
                        isSelected ? 'fill-[#121417] font-semibold' : 'fill-[#5c564c]'
                      }`}
                    >
                      {hub.name}
                    </text>
                  </g>
                );
              })}

              {/* Dubai Primary Hub (HQ) */}
              <circle
                cx={HQ[0]}
                cy={HQ[1]}
                r={7}
                fill="none"
                stroke="#b8945f"
                strokeWidth={1.5}
                className="animate-pulse"
              />
              <circle
                cx={HQ[0]}
                cy={HQ[1]}
                r={3.5}
                fill="#9e7d47"
              />
              <text
                x={HQ[0] + 8}
                y={HQ[1] + 3}
                className="text-[10px] font-sans font-bold fill-[#1c1a17] select-none tracking-wide"
              >
                DUBAI (HQ)
              </text>
            </svg>
          </div>

          {/* Active Hub Card & Filter Buttons Below Map */}
          <div className="mt-6 pt-5 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[var(--brass)]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ivory)]">
                {selectedHub ? `${selectedHub.name} · ${selectedHub.tier}` : 'Select a Financial Centre'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {hubs.map((hub) => (
                <button
                  key={hub.key}
                  type="button"
                  onMouseEnter={() => setActive(hub.key)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(active === hub.key ? null : hub.key)}
                  className={`rounded-none border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    active === hub.key
                      ? 'border-[var(--brass)] bg-[var(--brass)] text-white shadow-sm'
                      : 'border-[var(--line)] bg-[var(--void)] text-[var(--sage)] hover:border-[var(--line-strong)] hover:text-[var(--ivory)]'
                  }`}
                >
                  {hub.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 3 Metric Summary Pillars */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="group p-6 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]">
            <p className="text-xs uppercase tracking-widest text-[var(--brass)] font-sans">
              Headquarters
            </p>
            <p className="mt-2 font-display text-2xl text-[var(--ivory)] font-light">
              Dubai, DMCC
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--sage)]">
              World headquarters at the crossroads of international capital flows.
            </p>
          </div>

          <div className="group p-6 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]">
            <p className="text-xs uppercase tracking-widest text-[var(--brass)] font-sans">
              Reach
            </p>
            <p className="mt-2 font-display text-2xl text-[var(--ivory)] font-light">
              4 Continents
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--sage)]">
              Relationships across Europe, the Middle East, the Americas, and Asia.
            </p>
          </div>

          <div className="group p-6 rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--plate)] shadow-[var(--shadow-pill)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]">
            <p className="text-xs uppercase tracking-widest text-[var(--brass)] font-sans">
              Method
            </p>
            <p className="mt-2 font-display text-2xl text-[var(--ivory)] font-light">
              Principal Relationships
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--sage)]">
              Confidential, unconflicted advisory conducted by senior principals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
