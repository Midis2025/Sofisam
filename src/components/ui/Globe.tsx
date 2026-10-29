'use client';

import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';

/**
 * The globe.
 *
 * A lit sphere rather than a map: the land is one small equirectangular mask
 * (see scripts/globe-texture.mjs) that a shader turns into coast, relief and
 * shallow sea, under a single soft light and a champagne atmosphere. It is
 * drawn in the site's own palette — ivory sea and champagne land in the light
 * theme, the near-black grounds in the dark one — so it reads as printed
 * corporate cartography in three dimensions, not as satellite imagery.
 *
 * Over it: a marker for each centre, and from the headquarters a great-circle
 * arc to each of the others, lifted off the surface in proportion to its
 * length and drawn outward on arrival. Labels are HTML, set in the site's
 * type and placed from the projected marker each frame, so they stay crisp
 * and fade as their centre turns away.
 *
 * Interaction is a turntable, not a map: drag to turn it (horizontal only on
 * touch, so a vertical swipe still scrolls the page), the buttons to zoom a
 * step or return it to Dubai, a tap on a marker to select it. The wheel is
 * left to the page.
 *
 * Cost: one sphere, one halo quad, a thin tube per arc and a quad per marker.
 * The loop stops whenever the globe is off-screen or the tab is hidden.
 */

export type GlobeHub = {
  key: string;
  name: string;
  lon: number;
  lat: number;
  /** The headquarters: drawn larger, labelled always, the origin of every arc. */
  hq?: boolean;
  /** Labelled only when selected or zoomed in — it sits too close to another. */
  minor?: boolean;
  /** Which side of its marker the label is set on. */
  side: 'l' | 'r';
};

export interface GlobeHandle {
  /** Turn the globe to a centre, or back to the headquarters view. */
  focus: (key: string | null) => void;
  /** Return to the opening view and zoom. */
  reset: () => void;
  zoom: (step: 1 | -1) => void;
  /** Turn by a few degrees — the keyboard's way of dragging. */
  nudge: (dLon: number, dLat: number) => void;
}

type Palette = {
  oceanDeep: string;
  oceanShallow: string;
  land: string;
  landHigh: string;
  coast: string;
  grid: string;
  gridAmt: number;
  night: number;
  rim: string;
  halo: string;
  haloAmt: number;
  spec: string;
  specAmt: number;
  marker: string;
  markerCore: string;
  arc: string;
  arcHi: string;
  arcAmt: number;
};

/* Display values, written as they should appear: the shaders output them
   as they are, without a colour-space conversion in between. */
const PALETTES: Record<'light' | 'dark', Palette> = {
  light: {
    oceanDeep: '#e6dfd2',
    oceanShallow: '#eae4d9',
    land: '#d5c7ab',
    landHigh: '#c7b491',
    coast: '#a28866',
    grid: '#7d6b4f',
    gridAmt: 0.06,
    night: 0.87,
    rim: '#f5efe4',
    halo: '#d9c6a4',
    haloAmt: 0.34,
    spec: '#fffaf0',
    specAmt: 0.1,
    marker: '#a5824e',
    markerCore: '#fbf8f1',
    arc: '#b08d58',
    arcHi: '#7a5d33',
    arcAmt: 0.72,
  },
  dark: {
    oceanDeep: '#111115',
    oceanShallow: '#18181d',
    land: '#2f2a23',
    landHigh: '#3b342a',
    coast: '#7a6646',
    grid: '#c9a97c',
    gridAmt: 0.05,
    night: 0.55,
    rim: '#5c4b33',
    halo: '#9e8154',
    haloAmt: 0.42,
    spec: '#e3cba4',
    specAmt: 0.12,
    marker: '#d4b585',
    markerCore: '#141416',
    arc: '#c9a97c',
    arcHi: '#f0dcb8',
    arcAmt: 0.6,
  },
};

const DEG = Math.PI / 180;
const FOV = 30;
/** How much of the stage's short side the globe's diameter fills, per zoom step. */
const FILLS = [0.76, 0.95, 1.16];
const HOME = { lon: 47, lat: 22 };
const LAT_MIN = -50;
const LAT_MAX = 68;

const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
const easeInOut = (t: number) => {
  const x = Math.min(Math.max(t, 0), 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

/* ---------- Shaders --------------------------------------------------- */

const SPHERE_VERT = /* glsl */ `
  varying vec3 vObj;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vObj = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const SPHERE_FRAG = /* glsl */ `
  uniform sampler2D uLandMap;
  uniform sampler2D uShelfMap;
  uniform vec3 uOceanDeep, uOceanShallow, uLand, uLandHigh, uCoast, uGrid, uRim, uSpec;
  uniform float uGridAmt, uNight, uSpecAmt;
  uniform vec3 uLight;
  varying vec3 vObj;
  varying vec3 vN;
  varying vec3 vV;

  const float PI = 3.141592653589793;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float a = 0.5, s = 0.0;
    for (int i = 0; i < 4; i++) { s += a * noise(p); p *= 2.03; a *= 0.5; }
    return s;
  }

  // The coastline is filtered here rather than by mipmaps: four taps on a
  // rotated grid across the pixel's footprint. Mip selection on an
  // equirectangular lookup varies by driver — some pick far too coarse a
  // level and step the coast — and without mips there is no seam down the
  // Pacific either. The footprint is measured on whichever of two longitude
  // parameterisations is continuous at this pixel.
  float sampleMask(sampler2D map, vec2 uv) {
    vec2 alt = vec2(fract(uv.x + 0.5), uv.y);
    vec2 dxA = dFdx(uv), dyA = dFdy(uv), dxB = dFdx(alt), dyB = dFdy(alt);
    vec2 dx = abs(dxA.x) <= abs(dxB.x) ? dxA : dxB;
    vec2 dy = abs(dyA.x) <= abs(dyB.x) ? dyA : dyB;
    return 0.25 * (
      texture2D(map, uv + dx * 0.125 + dy * 0.375).r +
      texture2D(map, uv - dx * 0.125 - dy * 0.375).r +
      texture2D(map, uv + dx * 0.375 - dy * 0.125).r +
      texture2D(map, uv - dx * 0.375 + dy * 0.125).r);
  }

  void main() {
    vec3 n = normalize(vObj);
    float lon = atan(n.x, n.z);
    float lat = asin(clamp(n.y, -1.0, 1.0));
    vec2 uv = vec2(lon / (2.0 * PI) + 0.5, lat / PI + 0.5);

    float m = sampleMask(uLandMap, uv);
    float shelf = texture2D(uShelfMap, uv).r;

    // The supersampled mask is already the pixel's land coverage, so it is
    // used as it is: thresholding it would step the coast again and drop
    // the smaller islands.
    float land = m;
    // The coast is defined by the land darkening a shade toward its edge,
    // read off the shelf field rather than stroked, so it has no line to alias.
    float coast = 1.0 - smoothstep(0.5, 0.78, shelf);

    vec3 ocean = mix(uOceanDeep, uOceanShallow, smoothstep(0.04, 0.5, shelf));
    float grain = fbm(n * 7.0) * 0.65 + fbm(n * 26.0) * 0.35;
    float relief = smoothstep(0.55, 1.0, shelf) * 0.75 + (grain - 0.5) * 0.45;
    vec3 col = mix(ocean, mix(uLand, uLandHigh, clamp(relief, 0.0, 1.0)), land);
    col = mix(col, uCoast, coast * land * 0.22);

    // Meridians and parallels every 15°, quieter over land.
    vec2 g = vec2(lon, lat) / (PI / 12.0);
    vec2 gd = abs(fract(g - 0.5) - 0.5) / max(fwidth(g), vec2(1e-4));
    float line = 1.0 - min(min(gd.x, gd.y), 1.0);
    col = mix(col, uGrid, line * uGridAmt * (1.0 - land * 0.6));

    vec3 N = normalize(vN);
    vec3 V = normalize(vV);
    float lit = smoothstep(-0.5, 0.95, dot(N, uLight));
    col *= mix(uNight, 1.035, lit);

    vec3 H = normalize(uLight + V);
    col += uSpec * pow(max(dot(N, H), 0.0), 45.0) * (1.0 - land) * uSpecAmt;

    // Limb: the atmosphere thickens toward the edge of the disc.
    float fr = pow(1.0 - max(dot(N, V), 0.0), 2.6);
    col = mix(col, uRim, fr * 0.6);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const HALO_VERT = /* glsl */ `
  varying vec2 vP;
  void main() {
    vP = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// The atmosphere outside the disc, on one camera-facing quad through the
// centre of the globe. The sphere's depth hides whatever of it falls behind
// the disc. Nothing is cast beneath the globe: the stage stays flat.
const HALO_FRAG = /* glsl */ `
  uniform vec3 uHalo;
  uniform float uRs, uHaloAmt, uReveal;
  varying vec2 vP;
  void main() {
    float t = length(vP) - uRs;
    float halo = (exp(-max(t, 0.0) / 0.05) * 0.75 + exp(-max(t, 0.0) / 0.2) * 0.25)
      * smoothstep(-0.015, 0.004, t) * uHaloAmt;
    gl_FragColor = vec4(uHalo, halo * uReveal);
  }
`;

// An arc is faded only where it stands outside the globe's disc on screen
// AND over or near the horizon — the part that would otherwise read as a
// loop hanging off the limb. vFacing is how squarely the ground under the
// point faces the camera; vDisc is the point's distance from the disc's
// centre on screen, in disc radii.
const ARC_VERT = /* glsl */ `
  uniform float uAspect, uDisc;
  varying float vT;
  varying float vFacing;
  varying float vDisc;
  void main() {
    vT = uv.x;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 c = (viewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    vFacing = dot(normalize(mv.xyz - c), normalize(-c));
    gl_Position = projectionMatrix * mv;
    vec4 cc = projectionMatrix * vec4(c, 1.0);
    vDisc = length((gl_Position.xy / gl_Position.w - cc.xy / cc.w) * vec2(uAspect, 1.0)) / uDisc;
  }
`;

// Drawn outward from Dubai to uProgress, the leading end lit while it draws;
// once drawn, a soft pulse travels it every few seconds.
const ARC_FRAG = /* glsl */ `
  uniform vec3 uColor, uHi;
  uniform float uProgress, uOpacity, uTime, uSeed, uFlow;
  varying float vT;
  varying float vFacing;
  varying float vDisc;
  void main() {
    if (vT > uProgress) discard;
    float outside = smoothstep(0.97, 1.04, vDisc);
    float nearLimb = 1.0 - smoothstep(0.3, 0.62, vFacing);
    float horizon = 1.0 - outside * nearLimb;
    float ends = smoothstep(0.0, 0.08, vT) * (0.6 + 0.4 * smoothstep(1.0, 0.82, vT));
    float drawing = 1.0 - step(0.999, uProgress);
    float head = exp(-pow((vT - uProgress) / 0.035, 2.0)) * drawing;
    float p = fract(uTime * 0.16 + uSeed);
    float pulse = exp(-pow((vT - p * 1.3 + 0.15) / 0.06, 2.0)) * uFlow * (1.0 - drawing);
    float lift = max(head, pulse);
    gl_FragColor = vec4(mix(uColor, uHi, lift), uOpacity * ends * horizon * (0.62 + 0.6 * lift));
  }
`;

const MARK_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// A gold point with a pale centre and a soft glow, and a ring that opens
// from it on a slow period. The headquarters runs two rings, offset.
const MARK_FRAG = /* glsl */ `
  uniform vec3 uColor, uCore;
  uniform float uAppear, uTime, uSeed, uPulse, uHq, uActive;
  varying vec2 vUv;
  float ring(float r, float phase) {
    float rr = 0.24 + phase * 0.74;
    float w = 0.035 + fwidth(r);
    return (1.0 - smoothstep(0.0, w, abs(r - rr))) * (1.0 - phase) * 0.75;
  }
  void main() {
    float r = length(vUv - 0.5) * 2.0;
    float aa = fwidth(r) * 1.2;
    float coreR = mix(0.2, 0.26, uActive);
    float dotA = 1.0 - smoothstep(coreR - aa, coreR + aa, r);
    float centre = (1.0 - smoothstep(coreR * 0.42 - aa, coreR * 0.42 + aa, r)) * uHq;
    float glow = exp(-r * r * 9.0) * 0.32;
    float p1 = fract(uTime * 0.38 + uSeed);
    float p2 = fract(uTime * 0.38 + uSeed + 0.5);
    float rings = (ring(r, p1) + ring(r, p2) * uHq) * uPulse;
    float a = max(max(dotA, glow), rings) * uAppear;
    vec3 c = mix(uColor, uCore, centre * dotA);
    gl_FragColor = vec4(c, a);
  }
`;

/* ---------- Component -------------------------------------------------- */

type Props = {
  hubs: GlobeHub[];
  active: string | null;
  onSelect: (key: string) => void;
  /** Called on the first drag, so the stage can retire its hint. */
  onInteract?: () => void;
  onFail?: () => void;
  theme: 'light' | 'dark';
  reduce: boolean;
  handleRef: MutableRefObject<GlobeHandle | null>;
  className?: string;
};

export function Globe({
  hubs,
  active,
  onSelect,
  onInteract,
  onFail,
  theme,
  reduce,
  handleRef,
  className = '',
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labels = useRef<Record<string, HTMLDivElement | null>>({});

  // Read by the loop on every frame, so a change never rebuilds the scene.
  const live = useRef({ active, theme, onSelect, onInteract });
  live.current = { active, theme, onSelect, onInteract };

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = wrap.current;
    if (!canvas || !stage) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      let THREE: typeof import('three');
      try {
        THREE = await import('three');
      } catch {
        onFail?.();
        return;
      }
      if (disposed) return;

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch {
        onFail?.();
        return;
      }
      renderer.setClearColor(0x000000, 0);

      const small = () => stage.clientWidth < 640;
      const dpr = () => Math.min(window.devicePixelRatio || 1, small() ? 1.75 : 2);

      const v3 = (hex: string) => {
        const n = parseInt(hex.slice(1), 16);
        return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
      };
      const toVec = (lat: number, lon: number, r = 1) =>
        new THREE.Vector3(
          r * Math.cos(lat * DEG) * Math.sin(lon * DEG),
          r * Math.sin(lat * DEG),
          r * Math.cos(lat * DEG) * Math.cos(lon * DEG),
        );

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
      const globe = new THREE.Group();
      globe.rotation.order = 'XYZ';
      scene.add(globe);

      /* ---------- Sphere ---------- */
      const hiRes = stage.clientWidth * dpr() > 1100;
      const loader = new THREE.TextureLoader();
      let landTex: import('three').Texture;
      let shelfTex: import('three').Texture;
      try {
        [landTex, shelfTex] = await Promise.all([
          loader.loadAsync(`/images/globe-land-${hiRes ? 4096 : 2048}.webp`),
          loader.loadAsync('/images/globe-shelf.webp'),
        ]);
      } catch {
        renderer.dispose();
        onFail?.();
        return;
      }
      if (disposed) {
        landTex.dispose();
        shelfTex.dispose();
        renderer.dispose();
        return;
      }
      for (const t of [landTex, shelfTex]) {
        t.wrapS = THREE.RepeatWrapping;
        t.generateMipmaps = false;
        t.minFilter = THREE.LinearFilter;
        t.needsUpdate = true;
      }

      const sphereUniforms = {
        uLandMap: { value: landTex },
        uShelfMap: { value: shelfTex },
        uOceanDeep: { value: new THREE.Vector3() },
        uOceanShallow: { value: new THREE.Vector3() },
        uLand: { value: new THREE.Vector3() },
        uLandHigh: { value: new THREE.Vector3() },
        uCoast: { value: new THREE.Vector3() },
        uGrid: { value: new THREE.Vector3() },
        uRim: { value: new THREE.Vector3() },
        uSpec: { value: new THREE.Vector3() },
        uGridAmt: { value: 0 },
        uNight: { value: 1 },
        uSpecAmt: { value: 0 },
        uLight: { value: new THREE.Vector3(-0.55, 0.55, 0.63).normalize() },
      };
      const segs = small() ? 72 : 128;
      const sphereGeo = new THREE.SphereGeometry(1, segs, segs / 2);
      const sphereMat = new THREE.ShaderMaterial({
        vertexShader: SPHERE_VERT,
        fragmentShader: SPHERE_FRAG,
        uniforms: sphereUniforms,
      });
      globe.add(new THREE.Mesh(sphereGeo, sphereMat));

      /* ---------- Halo ---------- */
      const haloUniforms = {
        uHalo: { value: new THREE.Vector3() },
        uRs: { value: 1 },
        uHaloAmt: { value: 0 },
        uReveal: { value: 0 },
      };
      const haloGeo = new THREE.PlaneGeometry(4, 4);
      const haloMat = new THREE.ShaderMaterial({
        vertexShader: HALO_VERT,
        fragmentShader: HALO_FRAG,
        uniforms: haloUniforms,
        transparent: true,
        depthWrite: false,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.renderOrder = -1;
      scene.add(halo);

      /* ---------- Markers ---------- */
      const hq = hubs.find((h) => h.hq) ?? hubs[0];
      const hqVec = toVec(hq.lat, hq.lon);
      const markGeo = new THREE.PlaneGeometry(1, 1);
      const Z = new THREE.Vector3(0, 0, 1);
      const marks = hubs.map((h, i) => {
        const normal = toVec(h.lat, h.lon);
        const mat = new THREE.ShaderMaterial({
          vertexShader: MARK_VERT,
          fragmentShader: MARK_FRAG,
          transparent: true,
          depthWrite: false,
          uniforms: {
            uColor: { value: new THREE.Vector3() },
            uCore: { value: new THREE.Vector3() },
            uAppear: { value: reduce ? 1 : 0 },
            uTime: { value: 0 },
            uSeed: { value: i * 0.37 },
            uPulse: { value: reduce ? 0 : h.hq ? 1 : 0.55 },
            uHq: { value: h.hq ? 1 : 0 },
            uActive: { value: 0 },
          },
        });
        const mesh = new THREE.Mesh(markGeo, mat);
        mesh.position.copy(normal).multiplyScalar(1.0035);
        mesh.quaternion.setFromUnitVectors(Z, normal);
        mesh.renderOrder = 2;
        globe.add(mesh);
        return { hub: h, normal, mesh, mat, order: h.hq ? 0 : i + 1, screen: { x: 0, y: 0, vis: 0 } };
      });

      /* ---------- Arcs ---------- */
      const arcMats: import('three').ShaderMaterial[] = [];
      const arcs = hubs
        .filter((h) => !h.hq)
        .map((h, i) => {
          const b = toVec(h.lat, h.lon);
          const angle = hqVec.angleTo(b);
          const liftH = Math.min(angle * 0.2, 0.2);
          const pts: import('three').Vector3[] = [];
          const N = 72;
          for (let k = 0; k <= N; k++) {
            const t = k / N;
            const s = Math.sin(angle) || 1;
            const p = hqVec
              .clone()
              .multiplyScalar(Math.sin((1 - t) * angle) / s)
              .add(b.clone().multiplyScalar(Math.sin(t * angle) / s))
              .normalize()
              .multiplyScalar(1.004 + Math.sin(Math.PI * t) * liftH);
            pts.push(p);
          }
          const curve = new THREE.CatmullRomCurve3(pts);
          const mat = new THREE.ShaderMaterial({
            vertexShader: ARC_VERT,
            fragmentShader: ARC_FRAG,
            transparent: true,
            depthWrite: false,
            uniforms: {
              uColor: { value: new THREE.Vector3() },
              uHi: { value: new THREE.Vector3() },
              uProgress: { value: reduce ? 1 : 0 },
              uOpacity: { value: 0 },
              uTime: { value: 0 },
              uSeed: { value: i * 0.23 },
              uFlow: { value: reduce ? 0 : 1 },
              uAspect: { value: 1 },
              uDisc: { value: 1 },
            },
          });
          arcMats.push(mat);
          const mesh = new THREE.Mesh(undefined, mat);
          mesh.renderOrder = 1;
          globe.add(mesh);
          return { hub: h, curve, mesh, mat, order: i, radius: 0 };
        });

      // Arc stroke and marker size are held in pixels, so a phone-sized
      // globe does not draw hairlines and a wide one does not draw cords.
      const fitStrokes = (globePx: number) => {
        const r = 0.8 / globePx;
        for (const a of arcs) {
          if (a.radius && Math.abs(a.radius - r) / a.radius < 0.2) continue;
          a.radius = r;
          a.mesh.geometry?.dispose();
          a.mesh.geometry = new THREE.TubeGeometry(a.curve, 120, r, 6, false);
        }
        for (const m of marks) m.mesh.scale.setScalar((m.hub.hq ? 34 : 24) / globePx);
      };

      /* ---------- Theme ---------- */
      let appliedTheme = '';
      const applyTheme = (t: 'light' | 'dark') => {
        if (t === appliedTheme) return;
        appliedTheme = t;
        const p = PALETTES[t];
        const u = sphereUniforms;
        u.uOceanDeep.value.copy(v3(p.oceanDeep));
        u.uOceanShallow.value.copy(v3(p.oceanShallow));
        u.uLand.value.copy(v3(p.land));
        u.uLandHigh.value.copy(v3(p.landHigh));
        u.uCoast.value.copy(v3(p.coast));
        u.uGrid.value.copy(v3(p.grid));
        u.uRim.value.copy(v3(p.rim));
        u.uSpec.value.copy(v3(p.spec));
        u.uGridAmt.value = p.gridAmt;
        u.uNight.value = p.night;
        u.uSpecAmt.value = p.specAmt;
        haloUniforms.uHalo.value.copy(v3(p.halo));
        haloUniforms.uHaloAmt.value = p.haloAmt;
        for (const m of marks) {
          m.mat.uniforms.uColor.value.copy(v3(p.marker));
          m.mat.uniforms.uCore.value.copy(v3(p.markerCore));
        }
        for (const a of arcs) {
          a.mat.uniforms.uColor.value.copy(v3(p.arc));
          a.mat.uniforms.uHi.value.copy(v3(p.arcHi));
        }
      };

      /* ---------- View state ---------- */
      const view = {
        lon: HOME.lon,
        lat: HOME.lat,
        tLon: HOME.lon,
        tLat: HOME.lat,
        vLon: 0,
        vLat: 0,
        zoom: 0,
        dist: 0,
        sway: reduce ? 0 : 1,
        tSway: reduce ? 0 : 1,
      };
      let W = 1;
      let H = 1;
      let globePx = 200;

      const distFor = (zoom: number) => {
        const fill = FILLS[Math.round(zoom)] ?? FILLS[0];
        const aspect = W / H;
        return 1 / ((fill * Math.tan((FOV / 2) * DEG)) * Math.min(1, aspect));
      };

      const resize = () => {
        W = Math.max(stage.clientWidth, 1);
        H = Math.max(stage.clientHeight, 1);
        renderer.setPixelRatio(dpr());
        renderer.setSize(W, H, false);
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        if (!view.dist) view.dist = distFor(view.zoom);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(stage);

      const turnTo = (lon: number, lat: number) => {
        // The short way round.
        let d = lon - view.tLon;
        d = ((((d + 180) % 360) + 360) % 360) - 180;
        view.tLon += d;
        view.tLat = Math.min(Math.max(lat, LAT_MIN), LAT_MAX);
        view.vLon = view.vLat = 0;
      };

      handleRef.current = {
        focus: (key) => {
          const h = hubs.find((x) => x.key === key);
          if (!h || h.hq) {
            turnTo(HOME.lon, HOME.lat);
          } else {
            // Halfway between the centre and Dubai, so the arc between them
            // is in view rather than only its far end.
            const mid = new THREE.Vector3().addVectors(toVec(h.lat, h.lon), hqVec);
            const lat = Math.asin(mid.normalize().y) / DEG;
            const lon = Math.atan2(mid.x, mid.z) / DEG;
            turnTo(lon, lat * 0.85);
          }
          view.tSway = 0;
        },
        reset: () => {
          turnTo(HOME.lon, HOME.lat);
          view.zoom = 0;
          view.tSway = reduce ? 0 : 1;
        },
        zoom: (step) => {
          view.zoom = Math.min(Math.max(view.zoom + step, 0), FILLS.length - 1);
        },
        nudge: (dLon, dLat) => {
          turnTo(view.tLon + dLon, view.tLat + dLat);
          view.tSway = 0;
        },
      };

      /* ---------- Pointer ---------- */
      let drag: { id: number; x: number; y: number; moved: number; touch: boolean } | null = null;
      let lastMove = 0;
      const degPerPx = () => 150 / (globePx * 2 * Math.PI) * 2.2;

      const onDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0, touch: e.pointerType !== 'mouse' };
        view.vLon = view.vLat = 0;
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch {
          /* A pointer the browser no longer tracks — the drag still works without capture. */
        }
        canvas.dataset.dragging = '';
      };
      const onMove = (e: PointerEvent) => {
        if (!drag || e.pointerId !== drag.id) return;
        const dx = e.clientX - drag.x;
        const dy = e.clientY - drag.y;
        drag.x = e.clientX;
        drag.y = e.clientY;
        drag.moved += Math.abs(dx) + Math.abs(dy);
        const k = degPerPx();
        view.tLon -= dx * k;
        // On touch only the horizontal turns the globe: the vertical belongs
        // to the page's own scroll.
        if (!drag.touch) view.tLat = Math.min(Math.max(view.tLat + dy * k, LAT_MIN), LAT_MAX);
        const now = performance.now();
        const dt = Math.max(now - lastMove, 8) / 1000;
        lastMove = now;
        view.vLon = (-dx * k) / dt;
        view.vLat = drag.touch ? 0 : (dy * k) / dt;
        if (drag.moved > 4) {
          view.tSway = 0;
          live.current.onInteract?.();
        }
      };
      const onUp = (e: PointerEvent) => {
        if (!drag || e.pointerId !== drag.id) return;
        const tap = drag.moved < 6;
        drag = null;
        delete canvas.dataset.dragging;
        if (performance.now() - lastMove > 80) view.vLon = view.vLat = 0;
        if (!tap) return;
        // A tap selects the nearest visible marker within reach of a finger.
        const box = canvas.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        let best: (typeof marks)[number] | null = null;
        let bestD = 26;
        for (const m of marks) {
          if (m.screen.vis < 0.5) continue;
          const d = Math.hypot(m.screen.x - x, m.screen.y - y);
          if (d < bestD) {
            bestD = d;
            best = m;
          }
        }
        if (best) live.current.onSelect(best.hub.key);
      };
      const onCancel = () => {
        drag = null;
        delete canvas.dataset.dragging;
      };
      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerup', onUp);
      canvas.addEventListener('pointercancel', onCancel);

      /* ---------- Visibility ---------- */
      let visible = false;
      let introAt = -1;
      const io = new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting;
          if (visible && introAt < 0 && e.intersectionRatio > 0.2) introAt = clock;
          if (visible) schedule();
        },
        { threshold: [0, 0.2, 0.5] },
      );
      io.observe(stage);
      const onVis = () => {
        if (!document.hidden) schedule();
      };
      document.addEventListener('visibilitychange', onVis);

      /* ---------- Loop ---------- */
      let raf = 0;
      let last = performance.now();
      let clock = 0;
      const p = new THREE.Vector3();
      const camDir = new THREE.Vector3();
      const nW = new THREE.Vector3();
      const toCam = new THREE.Vector3();

      function schedule() {
        if (!raf && !disposed) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      }

      const tick = (now: number) => {
        raf = 0;
        if (!visible || document.hidden) return;
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        clock += dt;
        applyTheme(live.current.theme);

        // Inertia after a release, then the ease toward the target.
        if (!drag) {
          view.tLon += view.vLon * dt;
          view.tLat = Math.min(Math.max(view.tLat + view.vLat * dt, LAT_MIN), LAT_MAX);
          const decay = Math.exp(-dt * 4.5);
          view.vLon *= decay;
          view.vLat *= decay;
        }
        const k = 1 - Math.exp(-dt * (drag ? 18 : 5));
        view.lon += (view.tLon - view.lon) * k;
        view.lat += (view.tLat - view.lat) * k;
        view.sway += (view.tSway - view.sway) * (1 - Math.exp(-dt * 1.5));
        const tDist = distFor(view.zoom);
        view.dist += (tDist - view.dist) * (1 - Math.exp(-dt * 5));

        // Before anyone touches it, the globe breathes a few degrees either
        // side of Dubai so it reads as an object rather than a picture.
        const lon = view.lon + Math.sin(clock * 0.16) * 6 * view.sway;
        globe.rotation.x = view.lat * DEG;
        globe.rotation.y = -lon * DEG;

        // On a portrait stage the globe is centred in the top square, which
        // leaves the band beneath it to the controls.
        const shift = H > W ? ((H - W) / H) * view.dist * Math.tan((FOV / 2) * DEG) : 0;
        camera.position.set(0, -shift, view.dist);
        camera.lookAt(0, -shift, 0);
        globePx = (H / 2) / (view.dist * Math.tan((FOV / 2) * DEG));
        fitStrokes(globePx);
        haloUniforms.uRs.value = 1 / Math.sqrt(1 - 1 / (view.dist * view.dist));

        // The opening: the globe settles in, the atmosphere follows, the
        // centres arrive in turn and the arcs draw out from Dubai.
        const t = introAt < 0 ? 0 : reduce ? 99 : clock - introAt;
        const settle = ease(t / 1.4);
        globe.scale.setScalar(0.93 + 0.07 * settle);
        canvas.style.opacity = String(introAt < 0 ? 0 : settle);
        haloUniforms.uReveal.value = ease((t - 0.3) / 1.3);

        const act = live.current.active;
        const pal = PALETTES[live.current.theme];
        for (const m of marks) {
          const u = m.mat.uniforms;
          u.uAppear.value = ease((t - 0.7 - m.order * 0.12) / 0.6);
          u.uTime.value = clock;
          const on = act === m.hub.key ? 1 : 0;
          u.uActive.value += (on - u.uActive.value) * (1 - Math.exp(-dt * 8));
        }
        for (const a of arcs) {
          const u = a.mat.uniforms;
          if (!reduce) u.uProgress.value = easeInOut((t - 1.1 - a.order * 0.14) / 1.5);
          u.uTime.value = clock;
          u.uAspect.value = W / H;
          u.uDisc.value = (globePx * haloUniforms.uRs.value * globe.scale.x) / (H / 2);
          const target = act && !hubs.find((h) => h.key === act)?.hq
            ? act === a.hub.key ? 1 : 0.28
            : pal.arcAmt;
          u.uOpacity.value += (target - u.uOpacity.value) * (1 - Math.exp(-dt * 6));
        }

        renderer.render(scene, camera);

        // Labels follow their markers and fade as they turn to the limb.
        globe.updateMatrixWorld();
        camDir.copy(camera.position);
        const compact = W < 520;
        const zoomed = view.zoom >= 1;
        for (const m of marks) {
          p.copy(m.normal).multiplyScalar(1.004).applyMatrix4(globe.matrixWorld);
          nW.copy(p).normalize();
          const facing = nW.dot(toCam.copy(camDir).sub(p).normalize());
          const vis = Math.min(Math.max((facing - 0.08) / 0.2, 0), 1) * Number(m.mat.uniforms.uAppear.value);
          p.project(camera);
          m.screen.x = (p.x * 0.5 + 0.5) * W;
          m.screen.y = (-p.y * 0.5 + 0.5) * H;
          m.screen.vis = vis;
          const el = labels.current[m.hub.key];
          if (!el) continue;
          const isActive = act === m.hub.key;
          const wanted = m.hub.hq || isActive || (!compact && (!m.hub.minor || zoomed));
          const o = wanted ? vis : 0;
          el.style.transform = `translate3d(${m.screen.x.toFixed(1)}px, ${m.screen.y.toFixed(1)}px, 0)`;
          el.style.opacity = o.toFixed(3);
          el.style.visibility = o > 0.01 ? 'visible' : 'hidden';
        }

        raf = requestAnimationFrame(tick);
      };
      schedule();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerup', onUp);
        canvas.removeEventListener('pointercancel', onCancel);
        handleRef.current = null;
        sphereGeo.dispose();
        sphereMat.dispose();
        haloGeo.dispose();
        haloMat.dispose();
        markGeo.dispose();
        for (const m of marks) m.mat.dispose();
        for (const a of arcs) {
          a.mesh.geometry?.dispose();
          a.mat.dispose();
        }
        landTex.dispose();
        shelfTex.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
    // The scene is built once; what changes later is read through `live`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrap} className={`relative h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="globe-canvas absolute inset-0 h-full w-full"
        style={{ opacity: 0 }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {hubs.map((h) => (
          <div
            key={h.key}
            ref={(el) => {
              labels.current[h.key] = el;
            }}
            className="globe-label absolute left-0 top-0"
            style={{ opacity: 0, visibility: 'hidden' }}
          >
            <span
              className={`absolute top-0 whitespace-nowrap ${
                h.side === 'l' ? 'right-0 pr-3 text-right' : 'left-0 pl-3'
              } ${h.hq ? '-translate-y-full pb-1' : '-translate-y-1/2'}`}
            >
              {h.hq ? (
                <>
                  <span className="block font-display text-[clamp(0.95rem,1.2vw,1.125rem)] leading-none text-ivory">
                    {h.name}
                  </span>
                  <span className="mt-1 block text-[0.5625rem] font-semibold uppercase leading-none tracking-[0.18em] text-gold">
                    Headquarters
                  </span>
                </>
              ) : (
                <span
                  className={`text-[0.6875rem] font-medium tracking-[0.01em] transition-colors duration-300 ${
                    active === h.key ? 'text-ivory' : 'text-ivory-2'
                  }`}
                >
                  {h.name}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
