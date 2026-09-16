'use client';

import { useEffect, useRef } from 'react';

/**
 * The skyline scene.
 *
 * Photographic depth rather than generated geometry.
 *
 * Real-time WebGL cannot reach architectural-visualisation realism from
 * procedural models — the geometry budget that runs at 60fps in a browser is
 * the geometry budget that reads as a game. So the buildings here are not
 * modelled at all. Three real architectural photographs are hung at three
 * depths in a perspective camera's frustum and moved against each other:
 *
 *   far    a financial district against a dusk sky, hazed and softened, so
 *          the horizon falls away with atmospheric perspective
 *   mid    the lit district — the hero plate, the only sharp layer
 *   near   a close glass facade with warm interiors, thrown well out of
 *          focus and feathered to the frame edges, which is what puts a
 *          foreground in front of the camera
 *
 * Because the planes sit at genuinely different distances, the parallax is
 * real: the camera moves and the layers separate by their own depth. Nothing
 * is faked with offsets.
 *
 * The shader carries four things per layer: a cover fit (the plane's aspect
 * never matches the photograph's), a variable-radius blur for depth of field,
 * an atmospheric haze mix, and a slow shimmer that lifts only the brightest
 * pixels — which on a night city means the windows and the traffic, and
 * nothing else.
 *
 * Cost: three textured quads. The blur is the only real expense, and it runs
 * on the two layers that are out of focus anyway — so those two load at low
 * resolution, because detail that is about to be blurred away is bytes spent
 * for nothing.
 */

export interface SceneHandle {
  /** 0 at the top of the hero, 1 once it has been scrolled past. */
  setScroll: (v: number) => void;
  /** Pointer position in normalised device coordinates, -1 to 1. */
  setPointer: (x: number, y: number) => void;
}

type LayerSpec = {
  /** Path under /images. Blurred layers deliberately load small. */
  src: string;
  /** Distance in front of the camera. */
  z: number;
  /** Blur radius, in UV units. 0 is sharp. */
  blur: number;
  /** How far the layer is mixed toward the haze colour. */
  haze: number;
  /** Feathers the layer toward its edges; 1 clears the centre entirely. */
  frame: number;
  /** How strongly the bright pixels breathe. */
  shimmer: number;
  opacity: number;
  /** How much the camera's lateral motion is amplified for this layer. */
  drift: number;
};

const LAYERS: LayerSpec[] = [
  {
    src: '/images/district-dusk-1080.webp',
    z: -17,
    blur: 0.0022,
    haze: 0.58,
    frame: 0,
    shimmer: 0.05,
    opacity: 1,
    drift: 0.15,
  },
  {
    src: '/images/city-blue-night-1600.webp',
    z: -7.5,
    blur: 0,
    haze: 0.12,
    frame: 0,
    shimmer: 0.16,
    opacity: 1,
    drift: 0.5,
  },
  {
    src: '/images/tower-dusk-640.webp',
    z: -2.1,
    // Well past recognition: a foreground this close should read as bokeh,
    // not as a facade someone can identify.
    blur: 0.024,
    haze: 0.22,
    frame: 1,
    shimmer: 0.08,
    // Light enough to suggest something in front of the lens without
    // washing the city behind it.
    opacity: 0.32,
    drift: 1,
  },
];

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = `
  precision highp float;

  uniform sampler2D uMap;
  uniform vec2  uCover;
  uniform float uBlur;
  uniform float uHaze;
  uniform vec3  uHazeColor;
  uniform float uFrame;
  uniform float uShimmer;
  uniform float uOpacity;
  uniform float uTime;
  uniform float uReveal;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // A small separable-ish gaussian. Nine taps is enough for a defocus this
  // soft, and keeps the fill cost of the out-of-focus layers down.
  vec3 sampleBlurred(vec2 uv) {
    if (uBlur <= 0.0) return texture2D(uMap, uv).rgb;

    vec3 sum = vec3(0.0);
    float total = 0.0;
    for (int i = -2; i <= 2; i++) {
      for (int j = -2; j <= 2; j++) {
        vec2 off = vec2(float(i), float(j)) * uBlur;
        float w = exp(-(float(i * i + j * j)) * 0.4);
        sum += texture2D(uMap, uv + off).rgb * w;
        total += w;
      }
    }
    return sum / total;
  }

  void main() {
    // Cover fit: the plane's aspect never matches the photograph's.
    vec2 uv = (vUv - 0.5) * uCover + 0.5;

    // Outside the photograph, fall back to haze rather than clamping, which
    // would smear the edge pixels across the frame.
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(uHazeColor, uOpacity * uReveal);
      return;
    }

    vec3 color = sampleBlurred(uv);

    // Shimmer. Only the brightest pixels move — on a night city that means
    // the lit windows and the traffic, and nothing else. Each one is given
    // its own phase so the layer breathes rather than pulsing as one.
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    float bright = smoothstep(0.35, 0.85, lum);
    float phase = hash(floor(uv * 420.0)) * 6.2831;
    color += color * bright * sin(uTime * 0.9 + phase) * uShimmer;

    // Atmospheric perspective.
    color = mix(color, uHazeColor, uHaze);

    // The near layer is feathered away from the centre, so it frames the
    // statement instead of covering it.
    float alpha = uOpacity;
    if (uFrame > 0.0) {
      vec2 d = (vUv - 0.5) * vec2(1.85, 1.35);
      float r = length(d);
      // Only the outer corners carry it, so the centre of the frame — where
      // the statement sits — is left completely clear.
      alpha *= smoothstep(0.58, 1.0, r) * uFrame;
    }

    gl_FragColor = vec4(color, alpha * uReveal);
  }
`;

export function SkylineScene({
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
          antialias: false, // nothing here has a hard geometric edge
          alpha: true,
          powerPreference: 'high-performance',
        });
      } catch {
        onFail?.();
        return;
      }

      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      // A night photograph needs lifting before ACES, or the district reads
      // as a black rectangle with a few lights in it.
      renderer.toneMappingExposure = 1.55;

      const parent = canvas.parentElement ?? document.body;
      const size = () => ({
        w: parent.clientWidth || window.innerWidth,
        h: parent.clientHeight || window.innerHeight,
      });

      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      renderer.setPixelRatio(dpr);
      {
        const { w, h } = size();
        renderer.setSize(w, h, false);
      }

      const FOV = 42;

      /* The motion budget. Every one of these is used twice: once to move the
         scene, once to size the planes so their edges stay outside the frame.
         They are declared here so the two can never fall out of step. */
      const PASS = { x: 0.62, y: 0.2 }; // the drone's own slow pass
      const PTR = { x: 0.62, y: 0.34 }; // how far the pointer pushes a layer
      const SCROLL_Y = 1.6; // layer lift as the hero is scrolled away
      const CAM = { x: 0.12, y: 0.07, z: 2.6 }; // the camera's own travel
      const DOLLY = 0.55; // the slow push in and out, in world units
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
      camera.position.set(0, 0, 0);

      const HAZE = new THREE.Color(0x0a0c12);

      /* ---------- Layers ------------------------------------------------- */
      const loader = new THREE.TextureLoader();
      const planeGeo = new THREE.PlaneGeometry(1, 1);

      type Layer = {
        mesh: import('three').Mesh;
        mat: import('three').ShaderMaterial;
        spec: LayerSpec;
        texAspect: number;
      };
      const layers: Layer[] = [];
      let loaded = 0;

      for (const spec of LAYERS) {
        const mat = new THREE.ShaderMaterial({
          vertexShader: VERT,
          fragmentShader: FRAG,
          transparent: true,
          depthWrite: false,
          depthTest: false,
          uniforms: {
            uMap: { value: null },
            uCover: { value: new THREE.Vector2(1, 1) },
            uBlur: { value: spec.blur },
            uHaze: { value: spec.haze },
            uHazeColor: { value: HAZE },
            uFrame: { value: spec.frame },
            uShimmer: { value: spec.shimmer },
            uOpacity: { value: spec.opacity },
            uTime: { value: 0 },
            uReveal: { value: 0 },
          },
        });

        const mesh = new THREE.Mesh(planeGeo, mat);
        mesh.position.z = spec.z;
        // Painter's order: depth testing is off, so the draw order IS the
        // depth. The most negative z must be drawn first.
        mesh.renderOrder = spec.z;
        mesh.frustumCulled = false;
        scene.add(mesh);

        const layer: Layer = { mesh, mat, spec, texAspect: 1 };
        layers.push(layer);

        loader.load(
          spec.src,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.generateMipmaps = false;
            tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
            mat.uniforms.uMap.value = tex;
            layer.texAspect = tex.image.width / tex.image.height;
            fit();
            loaded++;
            // The hero waits for the sharp plate; the soft layers can land
            // afterwards without anyone noticing.
            if (loaded === 1) onReady?.();
          },
          undefined,
          () => {
            loaded++;
            if (loaded >= LAYERS.length && !layers.some((l) => l.mat.uniforms.uMap.value)) {
              onFail?.();
            }
          },
        );
      }

      /**
       * Sizes each plane so its edge can never enter the frame.
       *
       * A fixed percentage margin is not enough, and that is not a detail: a
       * layer's travel is multiplied by its own `drift`, and the near layer
       * moves further than a whole frustum height. The plane is therefore
       * sized from the worst case — the camera pushed fully back, which widens
       * the frustum at that depth, plus the full travel this layer can reach.
       * Any smaller and the rectangle slides into view.
       */
      const fit = () => {
        const { w, h } = size();
        const aspect = w / h;
        for (const l of layers) {
          // Worst case depth: the camera at the far end of its scroll push.
          const dist = Math.abs(l.spec.z) + CAM.z;
          const baseH = 2 * dist * Math.tan((FOV * Math.PI) / 360);
          const baseW = baseH * aspect;

          // Worst case travel of this layer relative to the camera.
          const travelX = (PASS.x + PTR.x) * l.spec.drift + CAM.x;
          const travelY = (PASS.y + PTR.y + SCROLL_Y) * l.spec.drift + CAM.y;

          const ph = baseH + 2 * travelY;
          const pw = baseW + 2 * travelX;
          l.mesh.scale.set(pw, ph, 1);

          // Cover fit, the same rule as object-fit: cover.
          const planeAspect = pw / ph;
          const c = l.mat.uniforms.uCover.value as import('three').Vector2;
          if (planeAspect > l.texAspect) {
            c.set(1, l.texAspect / planeAspect);
          } else {
            c.set(planeAspect / l.texAspect, 1);
          }
        }
      };

      const resize = () => {
        const { w, h } = size();
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        fit();
      };
      resize();
      window.addEventListener('resize', resize, { passive: true });

      /* ---------- Motion --------------------------------------------------- */
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

      const tick = (now: number) => {
        raf = requestAnimationFrame(tick);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!visible) return;
        clock += dt;

        eased.x += (pointer.x - eased.x) * Math.min(1, dt * 1.5);
        eased.y += (pointer.y - eased.y) * Math.min(1, dt * 1.5);
        easedScroll += (scroll - easedScroll) * Math.min(1, dt * 4);

        // A long, slow drone: a lateral pass and a gentle rise, neither fast
        // enough to register as movement — only as the frame being alive.
        // The drone's pass. Slow enough to read as a camera rather than a
        // loop, and the periods are coprime so it never visibly repeats.
        const passX = Math.sin(clock * 0.058) * PASS.x;
        const passY = Math.sin(clock * 0.037) * PASS.y;
        // A long push in and out — the movement most visible as motion.
        const dolly = (Math.sin(clock * 0.045 - Math.PI / 2) * 0.5 + 0.5) * DOLLY;

        for (const l of layers) {
          const d = l.spec.drift;
          l.mesh.position.x = -(passX + eased.x * PTR.x) * d;
          l.mesh.position.y = -(passY + eased.y * PTR.y) * d - easedScroll * SCROLL_Y * d;

          // The camera pushes in as the page is scrolled away.
          l.mat.uniforms.uTime.value = clock;

          // Reveal back to front, so the depth builds rather than the whole
          // frame appearing at once.
          const target = l.mat.uniforms.uMap.value ? 1 : 0;
          const u = l.mat.uniforms.uReveal;
          u.value += (target - u.value) * Math.min(1, dt * 0.85);
        }

        // Negative z moves the camera toward the layers: the push in.
        camera.position.z = easedScroll * CAM.z - dolly;
        camera.position.x = eased.x * CAM.x;
        camera.position.y = eased.y * CAM.y;

        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', onVis);
        if (handleRef) handleRef.current = null;
        planeGeo.dispose();
        for (const l of layers) {
          (l.mat.uniforms.uMap.value as import('three').Texture | null)?.dispose();
          l.mat.dispose();
        }
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
