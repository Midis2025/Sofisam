/**
 * AVIF siblings for the WebP ladder.
 *
 * For every rung of an image in /public/images, writes `${name}-${w}.avif`
 * beside `${name}-${w}.webp`, and marks the manifest entry `avif: true` so
 * `Picture` offers it ahead of the WebP. Browsers that cannot decode AVIF never
 * see the <source> and keep fetching the WebP.
 *
 *   node scripts/avif.mjs            every image in the manifest
 *   node scripts/avif.mjs a b c      only these names
 *
 * Quality 56 was chosen side by side against the WebP at 1:1 on the
 * architecture: 50 begins to smooth facade and window detail, 56 holds it. An
 * image whose AVIF set does not come in at least 12% lighter than its WebP set
 * keeps WebP alone — a second format that saves nothing is only a second
 * download path to maintain.
 *
 * `scripts/images.mjs` runs this for every image it ingests.
 */

import { readFile, writeFile, stat, unlink } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const OUT_DIR = 'public/images';
const META = 'src/data/image-meta.json';
const QUALITY = 56;
/** The AVIF set must weigh at most this share of the WebP set to be kept. */
const KEEP_BELOW = 0.88;

/**
 * Encodes one manifest entry's rungs; returns the size ratio and whether it
 * was kept, or null when the entry's WebP files are not on disk. An AVIF
 * already newer than its WebP is reused rather than encoded again.
 */
export async function avifFor(name, entry) {
  const srcs = entry.variants.map((w) => path.join(OUT_DIR, `${name}-${w}.webp`));
  if (!srcs.every((f) => existsSync(f))) return null;
  let webp = 0;
  let avif = 0;
  const written = [];
  for (const w of entry.variants) {
    const src = path.join(OUT_DIR, `${name}-${w}.webp`);
    const out = path.join(OUT_DIR, `${name}-${w}.avif`);
    const fresh = existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;
    if (!fresh) await sharp(src).avif({ quality: QUALITY, effort: 4 }).toFile(out);
    written.push(out);
    webp += (await stat(src)).size;
    avif += (await stat(out)).size;
  }
  const ratio = avif / webp;
  const keep = ratio <= KEEP_BELOW;
  if (keep) entry.avif = true;
  else {
    delete entry.avif;
    await Promise.all(written.map((f) => unlink(f).catch(() => {})));
  }
  return { ratio, keep, webp, avif };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const meta = JSON.parse(await readFile(META, 'utf8'));
  const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(meta);
  let before = 0;
  let after = 0;
  for (const name of names) {
    if (!meta[name]) {
      console.error(`${name}: not in the manifest`);
      continue;
    }
    const r = await avifFor(name, meta[name]);
    if (!r) {
      console.log(`${name.padEnd(34)}   -  webp files missing, skipped`);
      continue;
    }
    before += r.webp;
    after += r.keep ? r.avif : r.webp;
    console.log(`${name.padEnd(34)} ${(r.ratio * 100).toFixed(0).padStart(3)}%  ${r.keep ? 'avif' : 'webp only'}`);
  }
  const sorted = Object.fromEntries(Object.keys(meta).sort().map((k) => [k, meta[k]]));
  await writeFile(META, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`\n${names.length} images: ${(before / 1048576).toFixed(1)} MB as WebP -> ${(after / 1048576).toFixed(1)} MB served`);
}
