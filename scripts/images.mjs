/**
 * Image ingest.
 *
 * Takes source photography and produces everything the site needs from it: the
 * WebP variant ladder in /public/images, and the entry in src/data/image-meta.json
 * that `Picture` reads to build its srcset, its intrinsic size and its blur
 * placeholder.
 *
 *   node scripts/images.mjs <source-dir>
 *
 * Every file in the source directory is ingested under its own basename, so
 * `city-mono.jpg` becomes `city-mono-640.webp` … and the `city-mono` entry in
 * the manifest. Re-running it on a name that already exists replaces that name
 * outright — variants that the new source is too small to fill are deleted
 * rather than left behind at the old size, which would otherwise leave the
 * srcset pointing at a mix of two photographs.
 *
 * The ladder is the set of rungs the site actually asks for, capped at the
 * source's own width — never upscaled, because an upscaled rung is a larger
 * file carrying no more detail. The long edge is capped at 3200, which covers
 * a full-bleed frame on a 1600-wide layout at two times density; past it the
 * file grows faster than the detail anyone can see.
 */

import { readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT_DIR = 'public/images';
const META = 'src/data/image-meta.json';

/** The rungs the site's `sizes` attributes actually ask for. */
const RUNGS = [640, 1080, 1600, 2200];
/** Past this the file grows faster than the detail anyone can resolve. */
const LONG_EDGE_CAP = 3200;
/** Chosen against the top rung: 78 holds the detail 82 does at four fifths
 *  of the bytes, and the top rung is the one a large screen actually fetches. */
const QUALITY = 78;

/** The widths to generate for a source of these dimensions. */
function ladder(w, h) {
  const scale = Math.min(1, LONG_EDGE_CAP / Math.max(w, h));
  const maxW = Math.round(w * scale);
  const rungs = RUNGS.filter((r) => r < maxW);
  return [...new Set([...rungs, maxW])].sort((a, b) => a - b);
}

/** A 20px-wide WebP of the whole frame, inlined as the placeholder. */
async function placeholder(input) {
  const buf = await sharp(input).resize(20).webp({ quality: 60 }).toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

async function ingest(file, meta) {
  const name = path.basename(file, path.extname(file));
  const src = sharp(file);
  const { width, height } = await src.metadata();
  if (!width || !height) throw new Error(`${file}: no dimensions`);

  const widths = ladder(width, height);
  const scale = Math.min(1, LONG_EDGE_CAP / Math.max(width, height));
  const outW = Math.round(width * scale);
  const outH = Math.round(height * scale);

  // Clear any rung this source cannot fill, so one name never serves two
  // photographs across its own srcset.
  const stale = (meta[name]?.variants ?? []).filter((w) => !widths.includes(w));
  await Promise.all(
    stale.map((w) => unlink(path.join(OUT_DIR, `${name}-${w}.webp`)).catch(() => {})),
  );

  for (const w of widths) {
    await sharp(file)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(path.join(OUT_DIR, `${name}-${w}.webp`));
  }

  meta[name] = { w: outW, h: outH, variants: widths, blur: await placeholder(file) };
  return { name, from: `${width}x${height}`, to: `${outW}x${outH}`, widths, stale };
}

const dir = process.argv[2];
if (!dir) {
  console.error('usage: node scripts/images.mjs <source-dir>');
  process.exit(1);
}
if (!existsSync(OUT_DIR)) {
  console.error(`missing ${OUT_DIR} — run from the project root`);
  process.exit(1);
}

const meta = JSON.parse(await readFile(META, 'utf8'));
const files = (await readdir(dir))
  .filter((f) => /\.(jpe?g|png|tiff?|webp)$/i.test(f))
  .map((f) => path.join(dir, f));

if (files.length === 0) {
  console.error(`no images in ${dir}`);
  process.exit(1);
}

for (const file of files) {
  const r = await ingest(file, meta);
  console.log(
    `${r.name.padEnd(20)} ${r.from.padEnd(11)} -> ${r.to.padEnd(11)} ` +
      `[${r.widths.join(' ')}]${r.stale.length ? `  dropped ${r.stale.join(' ')}` : ''}`,
  );
}

// Keep the manifest in a stable order so a re-run produces a readable diff.
const sorted = Object.fromEntries(Object.keys(meta).sort().map((k) => [k, meta[k]]));
await writeFile(META, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`\n${files.length} ingested, ${Object.keys(sorted).length} in the manifest`);
