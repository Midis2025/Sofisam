/**
 * MeridianField — the SOFISAM "Global Precision" motif.
 *
 * A thin wireframe sphere drawn from longitude and latitude lines. Meridians
 * animate their horizontal radius, which reads as a slow axial rotation
 * without any JavaScript. Purely decorative.
 */

const R = 200;
const MERIDIANS = 8;
const PARALLEL_LATS = [-60, -35, -12, 12, 35, 60];

export function MeridianField({
  className = '',
  strokeClassName = 'stroke-gold',
}: {
  className?: string;
  strokeClassName?: string;
}) {
  const period = 44; // seconds for a full rotation

  return (
    <div className={className} aria-hidden>
      <svg
        viewBox={`0 0 ${R * 2 + 4} ${R * 2 + 4}`}
        className="h-full w-full overflow-visible"
        fill="none"
        role="presentation"
      >
        <g
          transform={`translate(${R + 2}, ${R + 2})`}
          className={strokeClassName}
          strokeWidth={0.9}
          vectorEffect="non-scaling-stroke"
        >
          {/* Limb */}
          <circle r={R} opacity={0.55} />

          {/* Parallels */}
          {PARALLEL_LATS.map((lat) => {
            const rad = (lat * Math.PI) / 180;
            return (
              <ellipse
                key={lat}
                cy={-R * Math.sin(rad)}
                rx={R * Math.cos(rad)}
                ry={R * Math.cos(rad) * 0.085}
                opacity={0.3}
              />
            );
          })}

          {/* Meridians — animated radius reads as rotation */}
          {Array.from({ length: MERIDIANS }).map((_, i) => (
            <ellipse
              key={i}
              className="sf-meridian"
              // Static fallback distribution so the sphere still reads
              // correctly when the animation is suppressed.
              rx={Math.abs(R * Math.cos((i * Math.PI) / MERIDIANS)).toFixed(2)}
              ry={R}
              opacity={0.34}
              style={{
                animationDuration: `${period}s`,
                animationDelay: `-${(period / MERIDIANS) * i}s`,
              }}
            />
          ))}

          {/* Axis + anchor point */}
          <line x1={0} y1={-R} x2={0} y2={R} opacity={0.16} />
          <circle
            cx={R * 0.34}
            cy={-R * 0.2}
            r={3}
            className="fill-gold stroke-none"
            opacity={0.9}
          />
          <circle
            cx={R * 0.34}
            cy={-R * 0.2}
            r={11}
            opacity={0.5}
            className="sf-pulse"
          />
        </g>
      </svg>
    </div>
  );
}
