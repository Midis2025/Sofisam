'use client';

import { useEffect, useRef } from 'react';

/**
 * The architectural scene.
 *
 * An abstract international financial district, assembled floor by floor and
 * lit at night. Nothing here reproduces an identifiable building; towers are
 * generated from a small set of architectural archetypes — plain glass slabs,
 * stepped towers, twisted shafts and podium blocks — so the skyline has the
 * variation of a real district without copying one.
 *
 * Realism comes from three things rather than from imported models:
 *
 *   1. A generated facade texture. One canvas produces the glazing — mullions,
 *      spandrel bands, glass panes — and a second produces the emissive map of
 *      which windows are lit. That is what separates a glass tower from a
 *      black box.
 *   2. Per-instance UV scaling. A single box geometry is shared by every
 *      floor, so its UVs would stretch differently on a wide podium than on a
 *      narrow shaft. A per-instance attribute scales the UVs by each floor's
 *      real dimensions, holding window size constant across the district.
 *   3. A generated environment map. A night gradient — deep sky above, a warm
 *      horizon, dark ground — run through PMREM, so the glass carries real
 *      reflections rather than a single specular highlight.
 *
 * Depth is carried by exponential fog rather than a bokeh pass: real
 * depth-of-field would add a full-screen pass for the whole hero, and at this
 * scale atmospheric falloff reads the same.
 *
 * Draw calls: one instanced mesh for every floor in the district, one line
 * buffer for the parapets, one grid, one ground plane.
 */

const GOLD = 0xc5a47e;

export interface SceneHandle {
  /** 0 at the top of the hero, 1 once it has been scrolled past. */
  setScroll: (v: number) => void;
  /** Pointer position in normalised device coordinates, -1 to 1. */
  setPointer: (x: number, y: number) => void;
}

/** Deterministic pseudo-random, so the district is identical on every load. */
function rand(i: number, salt = 0) {
  return Math.abs(Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453) % 1;
}

/**
 * Draws the facade: the glazing on one canvas, the lit windows on another.
 * One tile covers roughly 1.6 world units, and the per-instance UV scale
 * repeats it to each floor's real size.
 */
function facadeTextures() {
  const S = 256;
  const COLS = 14;
  const ROWS = 14;

  const glass = document.createElement('canvas');
  glass.width = glass.height = S;
  const g = glass.getContext('2d')!;

  const lights = document.createElement('canvas');
  lights.width = lights.height = S;
  const l = lights.getContext('2d')!;

  // The spandrel — the opaque band between floors — is the ground the
  // mullion grid sits on.
  g.fillStyle = '#0b0c10';
  g.fillRect(0, 0, S, S);
  l.fillStyle = '#000000';
  l.fillRect(0, 0, S, S);

  const cw = S / COLS;
  const ch = S / ROWS;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Inset leaves the mullion visible between panes.
      const px = c * cw + cw * 0.12;
      const py = r * ch + ch * 0.16;
      const pw = cw * 0.76;
      const ph = ch * 0.62;

      // The pane itself: a cool, slightly varying blue-grey.
      const tint = 0.6 + rand(r * COLS + c, 11) * 0.4;
      g.fillStyle = `rgb(${Math.round(20 * tint)}, ${Math.round(24 * tint)}, ${Math.round(
        32 * tint,
      )})`;
      g.fillRect(px, py, pw, ph);

      // Offices light by floor, not by window: roughly half the floors are
      // occupied, and most of a lit floor is on.
      const floorLit = rand(r, 21) > 0.5;
      const lit = floorLit ? rand(r * COLS + c, 31) > 0.28 : rand(r * COLS + c, 41) > 0.92;
      if (lit) {
        const warm = 0.5 + rand(r * COLS + c, 51) * 0.5;
        l.fillStyle = `rgba(255, ${Math.round(203 + warm * 32)}, ${Math.round(
          150 + warm * 50,
        )}, ${warm})`;
        l.fillRect(px, py, pw, ph);
      }
    }
  }

  return { glass, lights };
}

export function ArchitecturalScene({
  className = '',
  onReady,
  onFail,
  handleRef,
}: {
  className?: string;
  onReady?: () => void;
  onFail?: () => void;
  handleRef?: React.MutableRefObject<SceneHandle | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        });
      } catch {
        onFail?.();
        return;
      }

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      const parent = canvas.parentElement ?? document.body;
      const size = () => ({
        w: parent.clientWidth || window.innerWidth,
        h: parent.clientHeight || window.innerHeight,
      });

      // Capped low deliberately: this scene is fill-rate bound, and extra
      // device pixels buy very little on glass at night.
      let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      {
        const { w, h } = size();
        renderer.setSize(w, h, false);
      }

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x08080c, 0.03);
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 220);

      const world = new THREE.Group();
      scene.add(world);

      /* ---------- Environment ------------------------------------------
         A night gradient run through PMREM, so the glass reflects a sky and
         a warm horizon rather than a single highlight. */
      const envCanvas = document.createElement('canvas');
      envCanvas.width = 256;
      envCanvas.height = 128;
      {
        const e = envCanvas.getContext('2d')!;
        const grd = e.createLinearGradient(0, 0, 0, 128);
        grd.addColorStop(0, '#0a0d14');
        grd.addColorStop(0.46, '#141822');
        grd.addColorStop(0.56, '#5a4530');
        grd.addColorStop(0.62, '#241d18');
        grd.addColorStop(1, '#070709');
        e.fillStyle = grd;
        e.fillRect(0, 0, 256, 128);
      }
      const envSrc = new THREE.CanvasTexture(envCanvas);
      envSrc.mapping = THREE.EquirectangularReflectionMapping;
      envSrc.colorSpace = THREE.SRGBColorSpace;
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromEquirectangular(envSrc);
      scene.environment = envRT.texture;
      envSrc.dispose();
      pmrem.dispose();

      /* ---------- Facade ------------------------------------------------ */
      const { glass, lights } = facadeTextures();
      const glassTex = new THREE.CanvasTexture(glass);
      const lightTex = new THREE.CanvasTexture(lights);
      for (const t of [glassTex, lightTex]) {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      }

      /* ---------- The district -------------------------------------------
         Four archetypes, mixed through the cluster:
           0  slab     — a plain glass box, near-constant section
           1  stepped  — setbacks as it rises
           2  twisted  — each floor rotated a little on the one below
           3  podium   — a wide base carrying a narrow shaft
         Every tower is a stack of storeys; the archetype decides how each
         storey's section and rotation follow from the one under it. */
      type Floor = {
        x: number;
        z: number;
        y: number;
        w: number;
        d: number;
        h: number;
        rot: number;
        delay: number;
      };
      const floors: Floor[] = [];

      const TOWERS = 74;
      for (let t = 0; t < TOWERS; t++) {
        const ring = 3 + rand(t, 1) * 9;
        const angle = rand(t, 2) * Math.PI * 2;
        const x = Math.cos(angle) * ring;
        const z = Math.sin(angle) * ring * 0.74;

        // Keep the near-centre foreground clear of the statement.
        if (Math.abs(x) < 2 && z > 1.6) continue;

        const kind = Math.floor(rand(t, 3) * 4);
        const baseW = 0.5 + rand(t, 4) * 0.55;
        const baseD = 0.5 + rand(t, 5) * 0.55;

        // Tallest in the middle distance, lower toward the edges — the
        // profile of a real district rather than a uniform field.
        const falloff = 1 - Math.min(1, ring / 12.5);
        const count = 6 + Math.round(rand(t, 6) * 16 * (0.4 + falloff));

        const towerRot = rand(t, 7) * Math.PI * 0.5;
        let y = 0;
        let w = baseW;
        let d = baseD;

        for (let f = 0; f < count; f++) {
          const p = f / count;
          // One storey. Real towers hold a consistent floor-to-floor height.
          const fh = 0.2 + rand(t, 8) * 0.06;
          let rot = towerRot;

          if (kind === 1) {
            // Setbacks at two thirds and nine tenths of the height.
            if (p > 0.66 && p < 0.7) {
              w *= 0.74;
              d *= 0.74;
            }
            if (p > 0.9 && p < 0.93) {
              w *= 0.7;
              d *= 0.7;
            }
          } else if (kind === 2) {
            rot = towerRot + p * 1.15; // a slow twist up the shaft
            w = baseW * (1 - p * 0.22);
            d = baseD * (1 - p * 0.22);
          } else if (kind === 3) {
            const podium = p < 0.2;
            w = podium ? baseW * 1.65 : baseW * 0.82;
            d = podium ? baseD * 1.65 : baseD * 0.82;
          } else {
            w = baseW * (1 - p * 0.06);
            d = baseD * (1 - p * 0.06);
          }

          floors.push({
            x,
            z,
            y: y + fh / 2,
            w,
            d,
            h: fh * 0.99,
            rot,
            delay: ring * 0.04 + f * 0.035 + rand(t, 9) * 0.3,
          });
          y += fh;
        }

        // A crown on the tallest towers: a slender mast, which is what gives
        // a skyline its silhouette.
        if (count > 16) {
          for (let s = 0; s < 4; s++) {
            const sh = 0.3 - s * 0.05;
            floors.push({
              x,
              z,
              y: y + sh / 2,
              w: baseW * (0.3 - s * 0.06),
              d: baseD * (0.3 - s * 0.06),
              h: sh,
              rot: towerRot,
              delay: ring * 0.04 + (count + s) * 0.035,
            });
            y += sh;
          }
        }
      }

      const COUNT = floors.length;
      const boxGeo = new THREE.BoxGeometry(1, 1, 1);

      /* ---------- Facade material ---------------------------------------
         One box geometry is shared by every floor, so its UVs would stretch
         to whatever proportions that floor happens to have. A per-instance
         attribute carries each floor's real size and scales the UVs by it,
         holding window size constant right across the district. */
      const uvScale = new Float32Array(COUNT * 2);
      const TILE = 1.6; // world units per texture tile
      for (let i = 0; i < COUNT; i++) {
        uvScale[i * 2] = Math.max(0.5, floors[i].w / TILE);
        uvScale[i * 2 + 1] = Math.max(0.5, floors[i].h / TILE);
      }
      boxGeo.setAttribute('aUvScale', new THREE.InstancedBufferAttribute(uvScale, 2));

      const facadeMat = new THREE.MeshStandardMaterial({
        map: glassTex,
        emissiveMap: lightTex,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0,
        color: 0xffffff,
        roughness: 0.14,
        metalness: 0.9,
        envMapIntensity: 1.25,
      });

      facadeMat.onBeforeCompile = (shader) => {
        shader.vertexShader = shader.vertexShader
          .replace(
            '#include <common>',
            '#include <common>\nattribute vec2 aUvScale;\nvarying vec2 vFacadeUv;',
          )
          .replace('#include <uv_vertex>', '#include <uv_vertex>\nvFacadeUv = uv * aUvScale;');

        shader.fragmentShader = shader.fragmentShader
          .replace('#include <common>', '#include <common>\nvarying vec2 vFacadeUv;')
          .replace('#include <map_fragment>', 'diffuseColor *= texture2D( map, vFacadeUv );')
          .replace(
            '#include <emissivemap_fragment>',
            'totalEmissiveRadiance *= texture2D( emissiveMap, vFacadeUv ).rgb;',
          );
      };
      // The injection is fixed, so one cache entry serves every instance.
      facadeMat.customProgramCacheKey = () => 'sofisam-facade';

      const district = new THREE.InstancedMesh(boxGeo, facadeMat, COUNT);
      district.frustumCulled = false;
      world.add(district);

      /* ---------- Parapets -------------------------------------------------
         The roof outline of each storey, baked into one buffer and brought up
         once the district has settled. Box wireframes would draw the triangle
         diagonals of every face and read as crates. */
      const edgePts: number[] = [];
      for (const f of floors) {
        const hw = (f.w / 2) * 1.004;
        const hd = (f.d / 2) * 1.004;
        const top = f.y + f.h / 2;
        const cs = Math.cos(f.rot);
        const sn = Math.sin(f.rot);
        const corner = (sx: number, sz: number): [number, number, number] => [
          f.x + (sx * hw * cs - sz * hd * sn),
          top,
          f.z + (sx * hw * sn + sz * hd * cs),
        ];
        const c = [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)];
        for (let k = 0; k < 4; k++) {
          const a = c[k];
          const b = c[(k + 1) % 4];
          edgePts.push(a[0], a[1], a[2], b[0], b[1], b[2]);
        }
      }
      const edgeGeo = new THREE.BufferGeometry();
      edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePts, 3));
      const edgeMat = new THREE.LineBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      edges.frustumCulled = false;
      world.add(edges);

      /* ---------- Ground -------------------------------------------------- */
      const gridSize = 42;
      const grid = new THREE.GridHelper(gridSize, 42, GOLD, GOLD);
      const gridMat = grid.material as import('three').Material & {
        opacity: number;
        transparent: boolean;
        blending: number;
        depthWrite: boolean;
      };
      gridMat.opacity = 0.055;
      gridMat.transparent = true;
      gridMat.blending = THREE.AdditiveBlending;
      gridMat.depthWrite = false;
      grid.position.y = 0.002;
      world.add(grid);

      const floorGeo = new THREE.PlaneGeometry(gridSize, gridSize);
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x090a0d,
        roughness: 0.28,
        metalness: 0.95,
        envMapIntensity: 0.6,
      });
      const ground = new THREE.Mesh(floorGeo, floorMat);
      ground.rotation.x = -Math.PI / 2;
      world.add(ground);

      /* ---------- Light ---------------------------------------------------
         Night lighting: a low warm key raking across the glass, a cool fill
         opposite it, and a gold rim behind so the towers keep a silhouette.
         The environment map does most of the real work. */
      scene.add(new THREE.AmbientLight(0x2a3040, 0.7));

      const key = new THREE.DirectionalLight(0xffcf9a, 1.5);
      key.position.set(7, 6, 5);
      scene.add(key);

      const fill = new THREE.DirectionalLight(0x6f8bb5, 0.55);
      fill.position.set(-8, 3, 4);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(0xffc98a, 1.2);
      rim.position.set(-3, 4, -9);
      scene.add(rim);

      // Street-level glow, warm, close to the ground.
      const glow = new THREE.PointLight(GOLD, 9, 22, 2);
      glow.position.set(-1, 1.2, 0);
      scene.add(glow);

      // One point light rather than two: each one is a per-fragment cost
      // across every lit pixel of the district, and the directional rim
      // already carries the far side.

      /* ---------- Assembly ------------------------------------------------ */
      const m = new THREE.Matrix4();
      const pos = new THREE.Vector3();
      const quat = new THREE.Quaternion();
      const euler = new THREE.Euler();
      const scl = new THREE.Vector3();

      const BUILD = 2.4;
      let elapsed = 0;
      let settled = false;
      const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

      const writeMatrices = (time: number) => {
        let done = true;
        for (let i = 0; i < COUNT; i++) {
          const f = floors[i];
          const p = Math.min(1, Math.max(0, (time - f.delay) / BUILD));
          if (p < 1) done = false;
          const e = easeOut(p);

          pos.set(f.x, f.y + (1 - e) * 2.4, f.z);
          euler.set(0, f.rot, 0);
          quat.setFromEuler(euler);
          scl.set(f.w * e, f.h * e, f.d * e);
          m.compose(pos, quat, scl);
          district.setMatrixAt(i, m);
        }
        district.instanceMatrix.needsUpdate = true;
        return done;
      };
      writeMatrices(0);

      /* ---------- Motion ---------------------------------------------------
         A slow drone: the district turns on a long arc while the camera
         drifts and breathes. Nothing here is fast enough to register as
         movement — only as the scene being alive. */
      const pointer = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };
      let scroll = 0;
      let easedScroll = 0;
      let clock = 0;

      if (handleRef) {
        handleRef.current = {
          setScroll: (v) => {
            scroll = v;
          },
          setPointer: (x, y) => {
            pointer.x = x;
            pointer.y = y;
          },
        };
      }

      const baseZ = () => {
        const { w, h } = size();
        return w / h < 1 ? 25 : 19;
      };

      const resize = () => {
        const { w, h } = size();
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener('resize', resize, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
        threshold: 0.01,
      });
      io.observe(canvas);
      const onVis = () => {
        visible = !document.hidden;
      };
      document.addEventListener('visibilitychange', onVis);

      let raf = 0;
      let last = performance.now();

      /* Adaptive quality. Real hardware varies far more than any feature
         detection can predict, so the scene measures itself: if the first
         couple of seconds after the build cannot hold a reasonable frame
         rate, the pixel ratio is dropped once. Cheap insurance against an
         integrated GPU, and invisible when it is not needed. */
      let frames = 0;
      let sampleStart = 0;
      let downgraded = false;

      const tick = (now: number) => {
        raf = requestAnimationFrame(tick);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!visible) return;
        clock += dt;

        if (settled && !downgraded) {
          if (sampleStart === 0) sampleStart = now;
          frames++;
          const span = now - sampleStart;
          if (span > 1800) {
            const fps = frames / (span / 1000);
            if (fps < 40 && dpr > 1) {
              dpr = Math.max(1, dpr * 0.7);
              renderer.setPixelRatio(dpr);
              const { w, h } = size();
              renderer.setSize(w, h, false);
            }
            downgraded = true;
          }
        }

        if (!settled) {
          elapsed += dt;
          settled = writeMatrices(elapsed);
        }

        // The windows come up as the towers land, so the district lights
        // rather than arriving already lit.
        if (facadeMat.emissiveIntensity < 1.6) {
          facadeMat.emissiveIntensity = Math.min(
            1.6,
            facadeMat.emissiveIntensity + dt * 0.5,
          );
        }
        if (settled && edgeMat.opacity < 0.2) {
          edgeMat.opacity = Math.min(0.2, edgeMat.opacity + dt * 0.16);
        }

        world.rotation.y += dt * 0.022;

        eased.x += (pointer.x - eased.x) * Math.min(1, dt * 1.6);
        eased.y += (pointer.y - eased.y) * Math.min(1, dt * 1.6);
        easedScroll += (scroll - easedScroll) * Math.min(1, dt * 4);

        // The drift and the bob are what make it a camera rather than a
        // fixed viewpoint.
        const drift = Math.sin(clock * 0.09) * 1.5;
        const bob = Math.sin(clock * 0.13) * 0.32;

        camera.position.set(
          drift + eased.x * 2.2,
          5 + bob + eased.y * 1.2 + easedScroll * 4.5,
          baseZ() + easedScroll * 5.5,
        );
        camera.lookAt(drift * 0.25, 2.8 - easedScroll * 0.7, 0);

        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(tick);

      onReady?.();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', onVis);
        if (handleRef) handleRef.current = null;
        boxGeo.dispose();
        facadeMat.dispose();
        glassTex.dispose();
        lightTex.dispose();
        edgeGeo.dispose();
        edgeMat.dispose();
        floorGeo.dispose();
        floorMat.dispose();
        grid.geometry.dispose();
        gridMat.dispose();
        envRT.texture.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
    // The callbacks are read once, on mount; re-running would rebuild the
    // whole scene.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
