import { LAYERS } from '../../content/layers';
import styles from './LayerStack.module.css';

/*
 * Isometric stack of the five protection layers. Each plate carries a motif
 * for its layer; the active plate lifts and illuminates. A conduit runs
 * through every plate to show that intelligence crosses all layers.
 */

const CX = 220;
const BASE_Y = 440;
const GAP = 82;
const HW = 190;
const HH = 95;
const THICK = 7;

function pt(u: number, v: number, cy: number): [number, number] {
  return [CX + ((u - v) * HW) / 2, cy + ((u + v) * HH) / 2];
}

function d(points: [number, number][], close = true) {
  return 'M' + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + (close ? 'Z' : '');
}

function motif(index: number, cy: number): string {
  const lines: string[] = [];
  switch (index) {
    case 0: // silicon cells
      for (let i = -0.6; i <= 0.61; i += 0.3) {
        lines.push(d([pt(i, -0.6, cy), pt(i, 0.6, cy)], false), d([pt(-0.6, i, cy), pt(0.6, i, cy)], false));
      }
      lines.push(d([pt(-0.12, -0.12, cy), pt(0.12, -0.12, cy), pt(0.12, 0.12, cy), pt(-0.12, 0.12, cy)]));
      break;
    case 1: {
      // endpoints
      const nodes = [[-0.55, -0.4], [-0.5, 0.45], [0.45, -0.55], [0.55, 0.4], [0, 0]] as const;
      for (const [u, v] of nodes) {
        lines.push(d([pt(u - 0.08, v - 0.08, cy), pt(u + 0.08, v - 0.08, cy), pt(u + 0.08, v + 0.08, cy), pt(u - 0.08, v + 0.08, cy)]));
      }
      break;
    }
    case 2: {
      // network mesh
      const n = [[-0.6, -0.2], [-0.2, -0.6], [0.3, -0.4], [0.6, 0.1], [0.2, 0.55], [-0.4, 0.4], [0, 0]] as const;
      for (let i = 0; i < n.length - 1; i++) {
        lines.push(d([pt(n[i]![0], n[i]![1], cy), pt(n[(i + 1) % 6]![0], n[(i + 1) % 6]![1], cy)], false));
        lines.push(d([pt(n[i]![0], n[i]![1], cy), pt(0, 0, cy)], false));
      }
      break;
    }
    case 3: // intelligence rings
      for (const r of [0.2, 0.4, 0.6]) {
        lines.push(d([pt(-r, -r, cy), pt(r, -r, cy), pt(r, r, cy), pt(-r, r, cy)]));
      }
      lines.push(d([pt(0, 0, cy), pt(0.75, -0.2, cy)], false));
      break;
    default: // resilience frame
      lines.push(d([pt(-0.75, -0.75, cy), pt(0.75, -0.75, cy), pt(0.75, 0.75, cy), pt(-0.75, 0.75, cy)]));
      lines.push(d([pt(-0.55, -0.55, cy), pt(0.55, -0.55, cy), pt(0.55, 0.55, cy), pt(-0.55, 0.55, cy)]));
      for (const s of [-1, 1]) {
        lines.push(d([pt(-0.75, s * 0.75, cy), pt(-0.55, s * 0.55, cy)], false), d([pt(0.75, s * 0.75, cy), pt(0.55, s * 0.55, cy)], false));
      }
  }
  return lines.join('');
}

interface LayerStackProps {
  active: number;
  /** When omitted the diagram is display-only. */
  onSelect?: (index: number) => void;
}

export function LayerStack({ active, onSelect }: LayerStackProps) {
  const topY = BASE_Y - (LAYERS.length - 1) * GAP;
  return (
    <svg className={styles.svg} viewBox="0 0 440 560" aria-hidden="true" focusable="false">
      {/* Corner rails */}
      <path
        className={styles.rail}
        d={[pt(-1, 1, BASE_Y), pt(-1, 1, topY)].map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('') +
          [pt(1, -1, BASE_Y), pt(1, -1, topY)].map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('') +
          [pt(1, 1, BASE_Y + THICK), pt(1, 1, topY)].map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('')}
      />
      {LAYERS.map((layer, i) => {
        const cy = BASE_Y - i * GAP;
        const top = [pt(-1, -1, cy), pt(1, -1, cy), pt(1, 1, cy), pt(-1, 1, cy)];
        const left = [pt(-1, 1, cy), pt(1, 1, cy), pt(1, 1, cy + THICK), pt(-1, 1, cy + THICK)];
        const right = [pt(1, -1, cy), pt(1, 1, cy), pt(1, 1, cy + THICK), pt(1, -1, cy + THICK)];
        const [lx, ly] = pt(-1, 1, cy);
        return (
          <g
            key={layer.id}
            className={styles.plate}
            data-active={i === active}
            data-below={i < active}
            data-interactive={!!onSelect}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <path className={styles.side} d={d(left)} />
            <path className={styles.sideDark} d={d(right)} />
            <path className={styles.top} d={d(top)} />
            <path className={styles.motif} d={motif(i, cy)} />
            <text className={styles.label} x={lx + 12} y={ly + 4}>
              L{i + 1}
            </text>
          </g>
        );
      })}
      <path className={styles.conduit} d={`M${CX} ${BASE_Y}L${CX} ${topY - 60}`} />
      <path className={styles.conduitPulse} d={`M${CX} ${BASE_Y}L${CX} ${topY - 60}`} />
      <circle className={styles.apex} cx={CX} cy={topY - 60} r={3} />
    </svg>
  );
}
