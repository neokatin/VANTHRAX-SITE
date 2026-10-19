import type { ProductId } from '../../content/products';
import styles from './ProductIllustrations.module.css';

/*
 * Original isometric technical drawings for each product. They act as the
 * product imagery until photographic renders are supplied, and remain the
 * illustration for software products that have no physical form.
 */

type P = [number, number];
const COS = 0.866;

function iso(x: number, y: number, z = 0, ox = 200, oy = 150): P {
  return [ox + (x - y) * COS, oy + (x + y) * 0.5 - z];
}

function poly(points: P[]): string {
  return 'M' + points.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('L') + 'Z';
}

function line(a: P, b: P): string {
  return `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
}

function rhombus(x0: number, y0: number, x1: number, y1: number, z: number, ox?: number, oy?: number) {
  return poly([iso(x0, y0, z, ox, oy), iso(x1, y0, z, ox, oy), iso(x1, y1, z, ox, oy), iso(x0, y1, z, ox, oy)]);
}

interface SlabProps {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  z0: number;
  z1: number;
  ox?: number;
  oy?: number;
  dashed?: boolean;
}

function Slab({ x0, y0, x1, y1, z0, z1, ox, oy, dashed }: SlabProps) {
  const cls = dashed ? styles.ghost : undefined;
  return (
    <g className={cls}>
      <path
        className={styles.faceLeft}
        d={poly([iso(x0, y1, z0, ox, oy), iso(x1, y1, z0, ox, oy), iso(x1, y1, z1, ox, oy), iso(x0, y1, z1, ox, oy)])}
      />
      <path
        className={styles.faceRight}
        d={poly([iso(x1, y0, z0, ox, oy), iso(x1, y1, z0, ox, oy), iso(x1, y1, z1, ox, oy), iso(x1, y0, z1, ox, oy)])}
      />
      <path className={styles.faceTop} d={rhombus(x0, y0, x1, y1, z1, ox, oy)} />
    </g>
  );
}

function GroundGrid({ size = 170, step = 17 }: { size?: number; step?: number }) {
  const d: string[] = [];
  for (let v = -size; v <= size; v += step) {
    d.push(line(iso(v, -size), iso(v, size)));
    d.push(line(iso(-size, v), iso(size, v)));
  }
  return <path className={styles.ground} d={d.join('')} />;
}

function VscDrawing() {
  const traces: string[] = [];
  const live: string[] = [];
  for (let i = -3; i <= 3; i++) {
    const o = i * 15;
    traces.push(line(iso(66, o), iso(150, o)), line(iso(o, 66), iso(o, 150)));
    traces.push(line(iso(-66, o), iso(-150, o)), line(iso(o, -66), iso(o, -150)));
  }
  live.push(line(iso(66, -15), iso(150, -15)), line(iso(30, 66), iso(30, 150)), line(iso(-66, 30), iso(-150, 30)));

  const pins: string[] = [];
  for (let i = -52; i <= 52; i += 8) {
    pins.push(line(iso(60, i, 2), iso(68, i, 0)), line(iso(i, 60, 2), iso(i, 68, 0)));
  }

  return (
    <>
      <GroundGrid />
      <path className={styles.trace} d={traces.join('')} />
      <path className={styles.live} d={live.join('')} />
      <path className={styles.pin} d={pins.join('')} />
      <Slab x0={-60} y0={-60} x1={60} y1={60} z0={0} z1={12} />
      <path className={styles.guide} d={rhombus(-50, -50, 50, 50, 12)} />
      <Slab x0={-34} y0={-34} x1={34} y1={34} z0={12} z1={17} />
      <path className={styles.enclave} d={rhombus(-14, -14, 14, 14, 17)} />
      <path className={styles.enclaveCore} d={rhombus(-4, -4, 4, 4, 17)} />
      <path className={styles.leader} d={line(iso(0, 0, 17), iso(0, 0, 92))} />
      <circle className={styles.node} cx={iso(0, 0, 92)[0]} cy={iso(0, 0, 92)[1]} r={2.5} />
      <text className={styles.label} x={iso(0, 0, 92)[0] + 8} y={iso(0, 0, 92)[1] + 3}>
        ROOT OF TRUST
      </text>
    </>
  );
}

function VcpDrawing() {
  const policy = iso(0, 0, 110);
  const targets: P[] = [iso(-60, 40, 40), iso(55, -50, 50), iso(70, 55, 34)];
  return (
    <>
      <GroundGrid />
      <path className={styles.perimeter} d={rhombus(-120, -110, 125, 115, 0)} />
      {/* Workstation */}
      <Slab x0={20} y0={-80} x1={90} y1={-70} z0={0} z1={4} />
      <Slab x0={52} y0={-74} x1={58} y1={-70} z0={4} z1={18} />
      <path className={styles.faceLeft} d={poly([iso(20, -70, 18), iso(90, -70, 18), iso(90, -70, 62), iso(20, -70, 62)])} />
      <path className={styles.screen} d={poly([iso(25, -70, 22), iso(85, -70, 22), iso(85, -70, 58), iso(25, -70, 58)])} />
      {/* Laptop */}
      <Slab x0={-100} y0={10} x1={-30} y1={60} z0={0} z1={4} />
      <path className={styles.faceRight} d={poly([iso(-30, 10, 4), iso(-30, 60, 4), iso(-30, 60, 48), iso(-30, 10, 48)])} />
      <path className={styles.screen} d={poly([iso(-30, 15, 8), iso(-30, 55, 8), iso(-30, 55, 44), iso(-30, 15, 44)])} />
      {/* Mobile */}
      <Slab x0={60} y0={40} x1={84} y1={80} z0={0} z1={4} />
      <path className={styles.screen} d={rhombus(63, 44, 81, 76, 4)} />
      {/* Policy plane and enforcement links */}
      <path className={styles.policy} d={rhombus(-30, -30, 30, 30, 110)} />
      {targets.map((t, i) => (
        <path key={i} className={styles.live} d={line(policy, t)} />
      ))}
      {targets.map((t, i) => (
        <circle key={i} className={styles.node} cx={t[0]} cy={t[1]} r={2.5} />
      ))}
      <circle className={styles.nodeRed} cx={policy[0]} cy={policy[1]} r={3} />
      <text className={styles.label} x={policy[0] + 38} y={policy[1] - 4}>
        POLICY
      </text>
    </>
  );
}

function EvscDrawing() {
  const port = iso(40, 30, 14, 170, 150);
  const plug = iso(-12, -2, 6, 270, 168);
  const cable = `M${port[0]} ${port[1]}C${port[0] + 40} ${port[1] + 30} ${plug[0] - 50} ${plug[1] + 40} ${plug[0]} ${plug[1]}`;
  return (
    <>
      <GroundGrid />
      {/* Legacy host — drawn as a ghosted, existing system */}
      <path className={styles.perimeter} d={rhombus(-110, -100, 70, 80, 0, 170, 150)} />
      <Slab x0={-70} y0={-60} x1={40} y1={40} z0={0} z1={44} ox={170} oy={150} dashed />
      <path className={styles.guide} d={rhombus(-60, -50, 30, 30, 44, 170, 150)} />
      {/* EVSC module */}
      <path className={styles.cable} d={cable} />
      <Slab x0={-12} y0={-28} x1={34} y1={-2} z0={0} z1={10} ox={270} oy={168} />
      <Slab x0={-18} y0={-10} x1={-12} y1={-2} z0={2} z1={8} ox={270} oy={168} />
      <path className={styles.enclave} d={rhombus(0, -22, 16, -8, 10, 270, 168)} />
      <path className={styles.indicator} d={line(iso(22, -22, 10, 270, 168), iso(30, -22, 10, 270, 168))} />
      <path className={styles.leader} d={line(iso(8, -15, 10, 270, 168), iso(8, -15, 80, 270, 168))} />
      <circle className={styles.nodeRed} cx={iso(8, -15, 80, 270, 168)[0]} cy={iso(8, -15, 80, 270, 168)[1]} r={2.5} />
      <text className={styles.label} x={iso(8, -15, 80, 270, 168)[0] - 92} y={iso(8, -15, 80, 270, 168)[1] + 3}>
        EXTERNAL ANCHOR
      </text>
      <circle className={styles.node} cx={port[0]} cy={port[1]} r={2.5} />
    </>
  );
}

const DRAWINGS: Record<ProductId, () => React.JSX.Element> = {
  vsc: VscDrawing,
  vcp: VcpDrawing,
  evsc: EvscDrawing,
};

export function ProductIllustration({ id }: { id: ProductId }) {
  const Drawing = DRAWINGS[id];
  return (
    <svg className={styles.svg} viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <Drawing />
    </svg>
  );
}
