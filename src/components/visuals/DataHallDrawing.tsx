import styles from './DataHallDrawing.module.css';

/*
 * One-point perspective line drawing of a secure data hall. Serves as the
 * facility visual until photography is supplied (see docs/IMAGE-ASSETS.md).
 */

const VW = 1200;
const VH = 460;
const VX = 600;
const VY = 205;
const F = 330;
const EYE = 1.05;
const AISLE = 1.25;
const DEPTH = 0.95;
const RACK_H = 2.15;

function p(x: number, y: number, z: number): string {
  return `${(VX + (x / z) * F).toFixed(1)} ${(VY + ((EYE - y) / z) * F).toFixed(1)}`;
}

function quad(a: string, b: string, c: string, d: string) {
  return `M${a}L${b}L${c}L${d}Z`;
}

const RACK_STEP = 0.72;
const RACK_LEN = 0.66;
const NEAR = 1.15;
const RACKS = 18;

function buildRacks() {
  const faces: string[] = [];
  const units: string[] = [];
  const tops: string[] = [];
  const leds: { x: string; y: string; red: boolean; far: number }[] = [];
  for (const side of [-1, 1]) {
    const x = side * AISLE;
    const xo = side * (AISLE + DEPTH);
    for (let i = 0; i < RACKS; i++) {
      const z0 = NEAR + i * RACK_STEP;
      const z1 = z0 + RACK_LEN;
      faces.push(quad(p(x, 0, z0), p(x, 0, z1), p(x, RACK_H, z1), p(x, RACK_H, z0)));
      tops.push(quad(p(x, RACK_H, z0), p(x, RACK_H, z1), p(xo, RACK_H, z1), p(xo, RACK_H, z0)));
      for (let u = 0.2; u < RACK_H - 0.1; u += 0.16) {
        units.push(`M${p(x, u, z0 + 0.04)}L${p(x, u, z1 - 0.04)}`);
      }
      // Sparse status lights, deterministic so prerender and client agree.
      for (let k = 0; k < 3; k++) {
        const seed = (i * 7 + k * 13 + (side > 0 ? 5 : 0)) % 11;
        if (seed > 6) continue;
        const [lx, ly] = p(x, 0.32 + seed * 0.26, z0 + 0.1).split(' ');
        leds.push({ x: lx!, y: ly!, red: seed === 3, far: i / RACKS });
      }
    }
  }
  return { faces: faces.join(''), units: units.join(''), tops: tops.join(''), leds };
}

function buildFloor() {
  const lines: string[] = [];
  for (let x = -4; x <= 4; x += 0.5) lines.push(`M${p(x, 0, 0.9)}L${p(x, 0, 40)}`);
  for (let z = 1; z < 30; z *= 1.18) lines.push(`M${p(-6, 0, z)}L${p(6, 0, z)}`);
  return lines.join('');
}

function buildCeiling() {
  const lines: string[] = [];
  for (const x of [-0.5, 0, 0.5]) lines.push(`M${p(x, 2.9, 0.9)}L${p(x, 2.9, 40)}`);
  for (let z = 1.2; z < 30; z *= 1.32) lines.push(`M${p(-0.55, 2.9, z)}L${p(0.55, 2.9, z)}`);
  return lines.join('');
}

const RACK_GEO = buildRacks();
const FLOOR = buildFloor();
const CEILING = buildCeiling();

export function DataHallDrawing() {
  return (
    <svg className={styles.svg} viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="dh-fog" cx="50%" cy="45%" r="45%">
          <stop offset="0" stopColor="#101216" stopOpacity="1" />
          <stop offset="0.25" stopColor="#101216" stopOpacity="0.85" />
          <stop offset="1" stopColor="#101216" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dh-red" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#b51224" stopOpacity="0" />
          <stop offset="1" stopColor="#b51224" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <path className={styles.floor} d={FLOOR} />
      <path className={styles.ceiling} d={CEILING} />
      <path className={styles.tops} d={RACK_GEO.tops} />
      <path className={styles.faces} d={RACK_GEO.faces} />
      <path className={styles.units} d={RACK_GEO.units} />
      {RACK_GEO.leds.map((l, i) => (
        <rect
          key={i}
          className={l.red ? styles.ledRed : styles.led}
          x={l.x}
          y={l.y}
          width={Math.max(1, 3.5 - l.far * 3)}
          height={Math.max(1, 3.5 - l.far * 3)}
          style={{ animationDelay: `${(i % 9) * 0.4}s` }}
        />
      ))}
      <rect x="0" y="0" width={VW} height={VH} fill="url(#dh-fog)" />
      <path d={`M${p(-AISLE + 0.05, 0.002, 1)}L${p(AISLE - 0.05, 0.002, 1)}L${VX} ${VY}Z`} fill="url(#dh-red)" />
      <path className={styles.aisle} d={`M${p(0, 0, 0.9)}L${VX} ${VY}`} />
    </svg>
  );
}
