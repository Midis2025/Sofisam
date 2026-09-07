'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A structural schematic for the Structuring page: intent at the top,
 * distributing through decision layers into defined positions. Abstract by
 * design — it depicts the shape of a framework, not any specific arrangement.
 */

const W = 1000;
const H = 520;

const nodes = {
  intent: { x: 500, y: 58, label: 'Intent' },
  layer: [
    { x: 210, y: 224, label: 'Authority' },
    { x: 405, y: 224, label: 'Oversight' },
    { x: 600, y: 224, label: 'Economics' },
    { x: 795, y: 224, label: 'Exit' },
  ],
  base: [
    { x: 140, y: 424, label: 'Position A' },
    { x: 380, y: 424, label: 'Position B' },
    { x: 620, y: 424, label: 'Position C' },
    { x: 860, y: 424, label: 'Position D' },
  ],
};

const edges: [number, number, number, number][] = [
  ...nodes.layer.map(
    (n) => [nodes.intent.x, nodes.intent.y, n.x, n.y] as [number, number, number, number],
  ),
  [nodes.layer[0].x, nodes.layer[0].y, nodes.base[0].x, nodes.base[0].y],
  [nodes.layer[0].x, nodes.layer[0].y, nodes.base[1].x, nodes.base[1].y],
  [nodes.layer[1].x, nodes.layer[1].y, nodes.base[1].x, nodes.base[1].y],
  [nodes.layer[1].x, nodes.layer[1].y, nodes.base[2].x, nodes.base[2].y],
  [nodes.layer[2].x, nodes.layer[2].y, nodes.base[2].x, nodes.base[2].y],
  [nodes.layer[2].x, nodes.layer[2].y, nodes.base[3].x, nodes.base[3].y],
  [nodes.layer[3].x, nodes.layer[3].y, nodes.base[3].x, nodes.base[3].y],
  [nodes.layer[3].x, nodes.layer[3].y, nodes.base[0].x, nodes.base[0].y],
];

export function FrameworkDiagram({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  const viewport = { once: true, margin: '-15% 0px -15% 0px' } as const;

  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Schematic of a structure: a single intent distributing through authority, oversight, economics and exit into four defined positions."
      >
        {/* Baseline rules */}
        {[58, 224, 424].map((y, i) => (
          <motion.line
            key={y}
            x1={0}
            y1={y}
            x2={W}
            y2={y}
            stroke="rgba(197,164,126,0.18)"
            strokeWidth={1}
            initial={reduce ? undefined : { pathLength: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1 }}
            viewport={viewport}
            transition={{ duration: 1.3, ease: EASE, delay: i * 0.12 }}
          />
        ))}

        {/* Edges */}
        {edges.map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={`${x1}-${y1}-${x2}-${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(246,244,239,0.28)"
            strokeWidth={1}
            initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 1, ease: EASE, delay: 0.35 + i * 0.055 }}
          />
        ))}

        {/* Nodes */}
        {[nodes.intent, ...nodes.layer, ...nodes.base].map((n, i) => (
          <motion.g
            key={n.label}
            initial={reduce ? undefined : { opacity: 0, scale: 0.4 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 + i * 0.06 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r={i === 0 ? 8 : 5} fill="#C5A47E" />
            {i === 0 && (
              <circle
                cx={n.x}
                cy={n.y}
                r={17}
                fill="none"
                stroke="rgba(197,164,126,0.4)"
                strokeWidth={1}
              />
            )}
            <text
              x={n.x}
              y={n.y + (i === 0 ? -28 : i <= 4 ? -20 : 30)}
              textAnchor="middle"
              className="fill-bone/70 font-sans"
              style={{
                fontSize: 17,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>

      <figcaption className="mt-6 max-w-[52ch] text-[0.78rem] font-light leading-relaxed text-bone/35">
        Illustrative schematic. It shows the shape of a well-formed framework —
        one intent, resolved through defined decision layers — not any specific
        arrangement.
      </figcaption>
    </figure>
  );
}
