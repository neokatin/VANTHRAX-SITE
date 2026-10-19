import { useEffect, useRef } from 'react';
import { useAnimationLoop } from '../../lib/motion';
import styles from './HeroField.module.css';

/*
 * Hero visualization — "the lattice".
 *
 * A geodesic shield of nodes surrounds a rotating stellated core. Inbound
 * vectors approach from all directions and are intercepted at the shield
 * boundary; nothing reaches the core. Orbital rings and a sweeping scan band
 * add depth. Everything is procedural (no assets) and drawn on one canvas.
 */

type Vec3 = [number, number, number];

interface Packet {
  dir: Vec3;
  r: number;
  speed: number;
}

interface Flash {
  dir: Vec3;
  age: number;
}

const NODE_COUNT = 240;
const NEIGHBOURS = 4;
const CAMERA = 3.6;

const INK = '240,241,243';
const RED = '224,43,63';

function fibonacciSphere(n: number): Vec3[] {
  const pts: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius]);
  }
  return pts;
}

function dist2(a: Vec3, b: Vec3) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}

function buildEdges(pts: Vec3[], k: number): [number, number][] {
  const seen = new Set<number>();
  const edges: [number, number][] = [];
  pts.forEach((p, i) => {
    const nearest = pts
      .map((q, j) => [j, dist2(p, q)] as const)
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1])
      .slice(0, k);
    for (const [j] of nearest) {
      const key = i < j ? i * 1000 + j : j * 1000 + i;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([i, j]);
    }
  });
  return edges;
}

function randomDir(): Vec3 {
  const u = Math.random() * 2 - 1;
  const t = Math.random() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  return [s * Math.cos(t), u, s * Math.sin(t)];
}

// Stellated core: two interlocking tetrahedra inscribed in a cube.
const CORE_VERTS: Vec3[] = ([
  [1, 1, 1],
  [1, -1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [-1, -1, -1],
  [-1, 1, 1],
  [1, -1, 1],
  [1, 1, -1],
] as Vec3[]).map(([x, y, z]) => [x * 0.3, y * 0.3, z * 0.3]);
const CORE_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3],
  [4, 5], [4, 6], [4, 7], [5, 6], [5, 7], [6, 7],
];

const NODES = fibonacciSphere(NODE_COUNT);
const EDGES = buildEdges(NODES, NEIGHBOURS);

interface HeroFieldProps {
  paused: boolean;
  reduced: boolean;
}

export function HeroField({ paused, reduced }: HeroFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    w: 0,
    h: 0,
    dpr: 1,
    pointer: [0, 0] as [number, number],
    tilt: [0, 0] as [number, number],
    packets: [] as Packet[],
    flashes: [] as Flash[],
    nodeHeat: new Float32Array(NODE_COUNT),
    spawnIn: 0,
  });

  // Seed a few vectors so the first (or reduced-motion) frame is composed.
  useEffect(() => {
    const s = state.current;
    if (s.packets.length) return;
    for (let i = 0; i < 7; i++) {
      s.packets.push({ dir: randomDir(), r: 1.15 + Math.random() * 1.1, speed: 0.45 + Math.random() * 0.3 });
    }
    for (let i = 0; i < 3; i++) s.flashes.push({ dir: randomDir(), age: 0.15 + i * 0.3 });
  }, []);

  // Size the backing store to the element, capped at 2x DPR.
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const resize = () => {
      const s = state.current;
      s.dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.w = wrap.clientWidth;
      s.h = wrap.clientHeight;
      canvas.width = Math.round(s.w * s.dpr);
      canvas.height = Math.round(s.h * s.dpr);
      if (paused || reduced) draw(0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    const onPointer = (e: PointerEvent) => {
      state.current.pointer = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1];
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reduced]);

  const timeRef = useRef(6);

  function draw(dt: number) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const s = state.current;
    if (!canvas || !ctx || !s.w) return;
    const t = timeRef.current;
    const { w, h, dpr } = s;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const wide = w > 960;
    const cx = wide ? w * 0.7 : w * 0.72;
    const cy = wide ? h * 0.5 : h * 0.3;
    const R = wide ? Math.min(h * 0.32, w * 0.24) : Math.min(w * 0.46, h * 0.3);

    // Ease pointer tilt for a weighty, unhurried parallax.
    if (!reduced) {
      s.tilt[0] += (s.pointer[0] * 0.22 - s.tilt[0]) * Math.min(dt * 2.2, 1);
      s.tilt[1] += (s.pointer[1] * 0.1 - s.tilt[1]) * Math.min(dt * 2.2, 1);
    }
    const yaw = t * 0.075 + s.tilt[0];
    const pitch = -0.38 + s.tilt[1];
    const cyaw = Math.cos(yaw);
    const syaw = Math.sin(yaw);
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);

    const project = (v: Vec3, scale = 1): [number, number, number] => {
      const x0 = v[0] * scale;
      const y0 = v[1] * scale;
      const z0 = v[2] * scale;
      const x1 = x0 * cyaw + z0 * syaw;
      const z1 = -x0 * syaw + z0 * cyaw;
      const y2 = y0 * cp - z1 * sp;
      const z2 = y0 * sp + z1 * cp;
      const f = CAMERA / (CAMERA - z2);
      return [cx + x1 * R * f, cy + y2 * R * f, z2];
    };

    // --- Screen-space HUD: segmented outer reticle -------------------------
    const hudR = R * 1.72;
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${INK},0.07)`;
    ctx.beginPath();
    ctx.arc(cx, cy, hudR, 0, Math.PI * 2);
    ctx.stroke();
    const rot = t * 0.02;
    ctx.strokeStyle = `rgba(${INK},0.2)`;
    for (let i = 0; i < 4; i++) {
      const a = rot + (i * Math.PI) / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, hudR, a + 0.12, a + 0.52);
      ctx.stroke();
    }
    ctx.strokeStyle = `rgba(${RED},0.75)`;
    ctx.beginPath();
    ctx.arc(cx, cy, hudR, rot - 0.06, rot + 0.06);
    ctx.stroke();
    // Tick ring
    ctx.strokeStyle = `rgba(${INK},0.12)`;
    ctx.beginPath();
    for (let i = 0; i < 120; i++) {
      const a = (i / 120) * Math.PI * 2 - rot * 0.5;
      const len = i % 10 === 0 ? 9 : 4;
      const r0 = hudR + 10;
      ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
      ctx.lineTo(cx + Math.cos(a) * (r0 + len), cy + Math.sin(a) * (r0 + len));
    }
    ctx.stroke();
    // Crosshair rails
    ctx.strokeStyle = `rgba(${INK},0.06)`;
    ctx.beginPath();
    ctx.moveTo(cx - hudR * 1.25, cy);
    ctx.lineTo(cx - R * 1.12, cy);
    ctx.moveTo(cx + R * 1.12, cy);
    ctx.lineTo(cx + hudR * 1.25, cy);
    ctx.moveTo(cx, cy - hudR * 1.18);
    ctx.lineTo(cx, cy - R * 1.12);
    ctx.moveTo(cx, cy + R * 1.12);
    ctx.lineTo(cx, cy + hudR * 1.18);
    ctx.stroke();

    // --- Orbital rings ------------------------------------------------------
    const ring = (radius: number, tiltX: number, tiltZ: number, alpha: number, phase: number) => {
      const cx2 = Math.cos(tiltX);
      const sx2 = Math.sin(tiltX);
      const cz = Math.cos(tiltZ);
      const sz = Math.sin(tiltZ);
      const pts: [number, number, number][] = [];
      for (let i = 0; i <= 160; i++) {
        const a = (i / 160) * Math.PI * 2 + phase;
        let x = Math.cos(a) * radius;
        let y = 0;
        let z = Math.sin(a) * radius;
        const y1 = y * cx2 - z * sx2;
        z = y * sx2 + z * cx2;
        y = y1;
        const x1 = x * cz - y * sz;
        y = x * sz + y * cz;
        x = x1;
        pts.push(project([x, y, z]));
      }
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1]!;
        const b = pts[i]!;
        const depth = (a[2] / radius + 1) / 2;
        ctx.strokeStyle = `rgba(${INK},${alpha * (0.25 + depth * 0.75)})`;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
      }
      // Orbiting marker
      const m = pts[Math.floor(((t * 0.06 + phase) % 1) * 160)] ?? pts[0]!;
      ctx.fillStyle = `rgba(${RED},0.9)`;
      ctx.fillRect(m[0] - 1.5, m[1] - 1.5, 3, 3);
    };
    ring(1.34, 1.18, 0.32, 0.16, 0);
    ring(1.5, 1.42, -0.5, 0.1, 0.37);

    // --- Shield lattice -----------------------------------------------------
    const proj = NODES.map((n) => project(n));
    const scanY = Math.sin(t * 0.32) * 0.92;

    const BUCKETS = 5;
    const paths: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
    for (const [i, j] of EDGES) {
      const a = proj[i]!;
      const b = proj[j]!;
      const depth = ((a[2] + b[2]) / 2 + 1) / 2;
      const bucket = Math.min(BUCKETS - 1, Math.floor(depth * BUCKETS));
      paths[bucket]!.moveTo(a[0], a[1]);
      paths[bucket]!.lineTo(b[0], b[1]);
    }
    paths.forEach((p, i) => {
      ctx.strokeStyle = `rgba(${INK},${0.025 + (i / (BUCKETS - 1)) * 0.13})`;
      ctx.stroke(p);
    });

    // Heat decays; flashes warm their neighbourhood.
    const heat = s.nodeHeat;
    for (let i = 0; i < heat.length; i++) heat[i] = Math.max(0, heat[i]! - dt * 0.7);

    for (let i = 0; i < NODE_COUNT; i++) {
      const p = proj[i]!;
      const n = NODES[i]!;
      const depth = (p[2] + 1) / 2;
      const scan = Math.max(0, 1 - Math.abs(n[1] - scanY) / 0.07);
      const hot = heat[i]!;
      const size = 1 + depth * 1.1 + scan * 0.6;
      if (hot > 0.02) {
        ctx.fillStyle = `rgba(${RED},${Math.min(1, 0.35 + hot)})`;
      } else {
        ctx.fillStyle = `rgba(${INK},${0.12 + depth * 0.55 + scan * 0.35})`;
      }
      ctx.fillRect(p[0] - size / 2, p[1] - size / 2, size, size);
    }

    // --- Core ---------------------------------------------------------------
    const coreSpin = -t * 0.22;
    const cc = Math.cos(coreSpin);
    const cs = Math.sin(coreSpin);
    const coreProj = CORE_VERTS.map(([x, y, z]) => project([x * cc - y * cs, x * cs + y * cc, z]));
    ctx.lineWidth = 1;
    CORE_EDGES.forEach(([i, j], k) => {
      const a = coreProj[i]!;
      const b = coreProj[j]!;
      ctx.strokeStyle = k < 6 ? `rgba(${INK},0.55)` : `rgba(${RED},0.6)`;
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.stroke();
    });
    const pulse = 0.5 + Math.sin(t * 1.6) * 0.5;
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.55);
    glow.addColorStop(0, `rgba(${RED},${0.1 + pulse * 0.06})`);
    glow.addColorStop(1, `rgba(${RED},0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(${INK},0.95)`;
    ctx.fillRect(cx - 1.5, cy - 1.5, 3, 3);

    // --- Inbound vectors ----------------------------------------------------
    if (dt > 0) {
      s.spawnIn -= dt;
      if (s.spawnIn <= 0 && s.packets.length < 12) {
        s.packets.push({ dir: randomDir(), r: 2.3, speed: 0.4 + Math.random() * 0.35 });
        s.spawnIn = 0.35 + Math.random() * 0.6;
      }
    }
    s.packets = s.packets.filter((pk) => {
      pk.r -= pk.speed * dt;
      if (pk.r <= 1.02) {
        s.flashes.push({ dir: pk.dir, age: 0 });
        NODES.forEach((n, i) => {
          const d = dist2(n, pk.dir);
          if (d < 0.06) heat[i] = Math.min(1, heat[i]! + 1 - d * 12);
        });
        return false;
      }
      const head = project(pk.dir, pk.r);
      const tail = project(pk.dir, Math.min(pk.r + 0.32, 2.4));
      const fade = Math.min(1, (2.3 - pk.r) * 2.5);
      const grad = ctx.createLinearGradient(tail[0], tail[1], head[0], head[1]);
      grad.addColorStop(0, `rgba(${INK},0)`);
      grad.addColorStop(1, `rgba(${INK},${0.55 * fade})`);
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(tail[0], tail[1]);
      ctx.lineTo(head[0], head[1]);
      ctx.stroke();
      ctx.fillStyle = `rgba(${INK},${0.85 * fade})`;
      ctx.fillRect(head[0] - 1, head[1] - 1, 2, 2);
      return true;
    });

    // --- Interceptions --------------------------------------------------------
    s.flashes = s.flashes.filter((f) => {
      f.age += dt;
      if (f.age > 1.4) return false;
      const p = project(f.dir, 1.0);
      const k = f.age / 1.4;
      const a = (1 - k) ** 2;
      ctx.strokeStyle = `rgba(${RED},${0.85 * a})`;
      ctx.beginPath();
      ctx.arc(p[0], p[1], 3 + k * 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(${RED},${a})`;
      ctx.fillRect(p[0] - 2, p[1] - 2, 4, 4);
      return true;
    });
  }

  useAnimationLoop(
    wrapRef,
    (time, dt) => {
      timeRef.current = time;
      draw(dt);
    },
    { paused, reduced },
  );

  return (
    <div ref={wrapRef} className={styles.field} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
