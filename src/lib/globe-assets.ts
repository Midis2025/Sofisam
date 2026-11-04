/**
 * The globe's static assets, fetched and decoded once per page session.
 *
 * Kept apart from the globe itself (and from three.js) so the section can
 * start these downloads the moment it comes within range, in parallel with the
 * three.js chunk, rather than only after that chunk has arrived and the scene
 * begins to build. Each request is memoised: a remount, a theme change or a
 * return to the page reuses the decoded image instead of fetching it again.
 */

const LAND_HI = '/images/globe-land-4096.webp';
const LAND = '/images/globe-land-2048.webp';
const SHELF = '/images/globe-shelf.webp';

const cache = new Map<string, Promise<HTMLImageElement>>();

function load(url: string): Promise<HTMLImageElement> {
  let p = cache.get(url);
  if (!p) {
    p = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        // Decoded off the main thread where the browser can, so the upload
        // to the GPU is not also paying for the decode.
        img.decode().then(() => resolve(img), () => resolve(img));
      };
      img.onerror = () => reject(new Error(`globe asset failed: ${url}`));
      img.src = url;
    });
    // A failure is not cached, so a later attempt can try again.
    p.catch(() => cache.delete(url));
    cache.set(url, p);
  }
  return p;
}

/** Whether a stage this wide needs the high-resolution land mask. */
export function wantsHiResLand(stageWidth: number) {
  const dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
  const cap = stageWidth < 640 ? 1.75 : 2;
  return stageWidth * Math.min(dpr, cap) > 1100;
}

/** The land mask and the shelf field for a stage of this width. */
export function loadGlobeTextures(stageWidth: number) {
  return Promise.all([load(wantsHiResLand(stageWidth) ? LAND_HI : LAND), load(SHELF)]);
}
