/**
 * World map geometry.
 *
 * Builds the land silhouette and graticule used by the Global Presence
 * section as two SVG paths, so the page ships no map library and draws a
 * handful of elements.
 *
 *   node scripts/world-map.mjs
 *
 * Land comes from Natural Earth (public domain) via the `world-atlas`
 * package's 110m land TopoJSON. The projection is Natural Earth I (Šavrič et
 * al.), cropped to 56°S–80°N with Antarctica left out. Points closer than a
 * fraction of a pixel are dropped and coordinates are rounded to one decimal,
 * which keeps the silhouette faithful at every size the section is drawn.
 *
 * Output: src/data/world-map.ts — the paths, the viewBox, and `project()` so
 * markers placed on the map use exactly the projection the land was built in.
 */

import { writeFile } from 'node:fs/promises';

const SRC = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json';
const W = 1000;
const LAT_TOP = 80;
const LAT_BOTTOM = -56;
const MIN_STEP = 1.1; // px — drop a point closer than this to the last kept one
const MIN_RING = 1.4; // px — drop an island whose bounding box is smaller

// ---- Natural Earth I ---------------------------------------------------
const rad = Math.PI / 180;
function ne(lon, lat) {
  const l = lon * rad;
  const p = lat * rad;
  const p2 = p * p;
  const p4 = p2 * p2;
  const x = l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4)));
  const y = p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)));
  return [x, y];
}

const X_MAX = ne(180, 0)[0];
const S = W / (2 * X_MAX);
const Y_TOP = ne(0, LAT_TOP)[1];
const H = Math.round((Y_TOP - ne(0, LAT_BOTTOM)[1]) * S);
const project = (lon, lat) => {
  const [x, y] = ne(lon, lat);
  return [(x + X_MAX) * S, (Y_TOP - y) * S];
};

// ---- TopoJSON → rings of [lon, lat] -------------------------------------
const topo = await (await fetch(SRC)).json();
const { scale, translate } = topo.transform;
const arcs = topo.arcs.map((arc) => {
  let x = 0;
  let y = 0;
  return arc.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
  });
});
const arcPts = (i) => (i >= 0 ? arcs[i] : arcs[~i].slice().reverse());
const ring = (idx) => idx.flatMap((i, k) => (k ? arcPts(i).slice(1) : arcPts(i)));

const rings = [];
for (const g of topo.objects.land.geometries) {
  const list = g.type === 'Polygon' ? [g.arcs] : g.type === 'MultiPolygon' ? g.arcs : [];
  for (const p of list) for (const r of p) rings.push(ring(r));
}

// ---- Land ----------------------------------------------------------------
const f = (n) => (Math.round(n * 10) / 10).toString();
/** A ring as one absolute move and relative steps, in tenths of a pixel so
    rounding never accumulates; a minus sign doubles as the separator. */
const rel = (pts) => {
  const q = pts.map(([x, y]) => [Math.round(x * 10), Math.round(y * 10)]);
  let d = `M${q[0][0] / 10} ${q[0][1] / 10}l`;
  for (let i = 1; i < q.length; i++) {
    const dx = (q[i][0] - q[i - 1][0]) / 10;
    const dy = (q[i][1] - q[i - 1][1]) / 10;
    if (!dx && !dy) continue;
    const sx = String(dx).replace(/^(-?)0./, '$1.');
    const sy = String(dy).replace(/^(-?)0./, '$1.');
    d += (i > 1 && !sx.startsWith('-') ? ' ' : '') + sx + (sy.startsWith('-') ? '' : ' ') + sy;
  }
  return d + 'z';
};
let land = '';
let kept = 0;
let points = 0;
/** Rings that cross the antimeridian (Russia, Fiji) are unwrapped into one
    continuous run of longitudes, copied a world away, and each copy is
    clipped to −180°…180° so neither draws a line across the map. */
const unwrap = (r) => {
  const out = [r[0]];
  for (let i = 1; i < r.length; i++) {
    let [lon, lat] = r[i];
    const prev = out[i - 1][0];
    while (lon - prev > 180) lon -= 360;
    while (lon - prev < -180) lon += 360;
    out.push([lon, lat]);
  }
  return out;
};
/** Sutherland–Hodgman against one meridian; keep the side where in() holds. */
const clipAt = (r, lon0, keep) => {
  const out = [];
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    const b = r[(i + 1) % r.length];
    const ia = keep(a[0]);
    const ib = keep(b[0]);
    if (ia) out.push(a);
    if (ia !== ib) out.push([lon0, a[1] + ((b[1] - a[1]) * (lon0 - a[0])) / (b[0] - a[0])]);
  }
  return out;
};
const clip = (r) => clipAt(clipAt(r, 180, (x) => x <= 180), -180, (x) => x >= -180);
const copies = [];
for (const r of rings) {
  if (r.every(([, lat]) => lat < -60)) continue; // Antarctica
  const u = unwrap(r);
  const runs = [u];
  if (u.some(([lon]) => lon > 180)) runs.push(u.map(([lon, lat]) => [lon - 360, lat]));
  if (u.some(([lon]) => lon < -180)) runs.push(u.map(([lon, lat]) => [lon + 360, lat]));
  for (const c of runs) {
    const k = runs.length > 1 ? clip(c) : c;
    if (k.length >= 3) copies.push(k);
  }
}
for (const r of copies) {
  const pts = r.map(([lon, lat]) => project(lon, lat));
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  if (Math.max(...xs) - Math.min(...xs) < MIN_RING && Math.max(...ys) - Math.min(...ys) < MIN_RING) continue;

  const out = [pts[0]];
  for (const p of pts.slice(1)) {
    const q = out[out.length - 1];
    if (Math.hypot(p[0] - q[0], p[1] - q[1]) >= MIN_STEP) out.push(p);
  }
  if (out.length < 3) continue;
  land += rel(out);
  kept++;
  points += out.length;
}

// ---- Outline: the edge of the projected world ----------------------------
const edge = [];
for (let lat = LAT_BOTTOM; lat <= LAT_TOP; lat += 2) edge.push(project(180, lat));
for (let lat = LAT_TOP; lat >= LAT_BOTTOM; lat -= 2) edge.push(project(-180, lat));
const outline = 'M' + edge.map(([x, y]) => `${f(x)} ${f(y)}`).join('L') + 'Z';

// ---- Graticule: every 30°, inside the outline -----------------------------
let grid = '';
for (let lon = -150; lon <= 150; lon += 30) {
  const pts = [];
  for (let lat = LAT_BOTTOM; lat <= LAT_TOP; lat += 2) pts.push(project(lon, lat));
  grid += 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L');
}
for (const lat of [-30, 0, 30, 60]) {
  const pts = [];
  for (let lon = -180; lon <= 180; lon += 4) pts.push(project(lon, lat));
  grid += 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L');
}

const out = `/* Generated by scripts/world-map.mjs — do not edit by hand.
   Land: Natural Earth 110m (public domain), via world-atlas.
   Projection: Natural Earth I, ${LAT_BOTTOM}° to ${LAT_TOP}°. */

export const WORLD_W = ${W};
export const WORLD_H = ${H};

/** ${kept} land rings, ${points} points. */
export const WORLD_LAND =
  '${land}';

/** The edge of the projected world — the clip for land and graticule. */
export const WORLD_OUTLINE =
  '${outline}';

/** Meridians and parallels every 30°. */
export const WORLD_GRATICULE =
  '${grid}';

/** Longitude/latitude to the map's own coordinates (Natural Earth I). */
export function project(lon: number, lat: number): [number, number] {
  const l = (lon * Math.PI) / 180;
  const p = (lat * Math.PI) / 180;
  const p2 = p * p;
  const p4 = p2 * p2;
  const x = l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4)));
  const y = p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)));
  return [(x + ${X_MAX.toFixed(6)}) * ${S.toFixed(6)}, (${Y_TOP.toFixed(6)} - y) * ${S.toFixed(6)}];
}
`;

await writeFile('src/data/world-map.ts', out);
console.log(`${kept} rings, ${points} points, ${W}x${H}, ${(out.length / 1024).toFixed(1)} KB`);
