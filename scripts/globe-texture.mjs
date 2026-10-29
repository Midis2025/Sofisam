/**
 * Globe land texture.
 *
 * Builds the equirectangular land mask the Global Perspective globe is
 * shaded from, so the page ships one small image instead of coastline
 * geometry or a map library.
 *
 *   node scripts/globe-texture.mjs
 *
 * Land comes from Natural Earth 50m (public domain) via the `world-atlas`
 * package. Longitude and latitude map straight to x and y, which is the
 * projection a sphere samples in. Output, in public/images:
 *
 *   globe-land-{2048,4096}.webp   the coastline, sharp — where land is.
 *       Lossless and single-channel: a mask is flat fields and edges, which
 *       lossless WebP holds in very little. The smaller is for phones.
 *   globe-shelf.webp   the same mask blurred wide — how far inland or
 *       offshore a point is, which the shader reads as relief on land and
 *       as the shallow shelf that lightens the sea along a coast. It has no
 *       detail, so it is held at a quarter of the resolution; it stays lossless
 *       because block artefacts in a gradient read as a stepped coast.
 */

import sharp from 'sharp';

const SRC = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-50m.json';
const SIZES = [2048, 4096];

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

/** A ring that crosses the antimeridian (Russia, Fiji) is unwrapped into one
    continuous run of longitudes; it is then drawn a world to either side as
    well, and the image edge clips whichever copy falls outside it. */
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

for (const W of SIZES) {
  const H = W / 2;
  const px = (lon, lat) => `${(((lon + 180) / 360) * W).toFixed(1)} ${(((90 - lat) / 180) * H).toFixed(1)}`;
  let d = '';
  for (const r of rings) {
    const u = unwrap(r);
    const shifts = [0];
    if (u.some(([lon]) => lon > 180)) shifts.push(-360);
    if (u.some(([lon]) => lon < -180)) shifts.push(360);
    for (const s of shifts) d += 'M' + u.map(([lon, lat]) => px(lon + s, lat)).join('L') + 'Z';
  }
  // Antarctica's ring runs along the pole as a line of latitude; everything
  // south of 86° is filled outright so the cap closes.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="#000"/>
    <path d="${d}" fill="#fff" fill-rule="evenodd"/>
    <rect y="${H - (4 * H) / 180}" width="${W}" height="${(4 * H) / 180}" fill="#fff"/>
  </svg>`;

  const mask = await sharp(Buffer.from(svg)).greyscale().png().toBuffer();
  const file = `public/images/globe-land-${W}.webp`;
  const info = await sharp(mask).greyscale().webp({ lossless: true, effort: 6 }).toFile(file);
  console.log(`${file}  ${(info.size / 1024).toFixed(0)} KB`);

  if (W === 2048) {
    const shelf = 'public/images/globe-shelf.webp';
    const s = await sharp(mask).resize(512, 256).blur(2.5).greyscale().webp({ lossless: true, effort: 6 }).toFile(shelf);
    console.log(`${shelf}  ${(s.size / 1024).toFixed(0)} KB`);
  }
}
