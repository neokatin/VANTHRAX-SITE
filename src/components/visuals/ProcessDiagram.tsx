import type { Product } from '../../content/products';
import styles from './ProcessDiagram.module.css';

/*
 * Mechanism diagrams for product pages. Steps are labelled by number only;
 * the full explanation sits beside the diagram as an ordered list, so the
 * SVG itself is decorative and stays legible at any width.
 */

const pad = (n: number) => String(n).padStart(2, '0');

function Chain({ count }: { count: number }) {
  const gap = 92;
  const top = 40;
  const x = 150;
  const bottom = top + (count - 1) * gap;
  return (
    <svg viewBox={`0 0 300 ${bottom + 60}`} className={styles.svg}>
      <path className={styles.rail} d={`M${x} ${top}V${bottom}`} />
      <path className={styles.pulse} d={`M${x} ${top}V${bottom}`} />
      {Array.from({ length: count }, (_, i) => {
        const y = top + i * gap;
        const root = i === 0;
        return (
          <g key={i}>
            {i > 0 && (
              <g className={styles.gate}>
                <path d={`M${x} ${y - gap / 2 - 7}l7 7l-7 7l-7 -7Z`} />
                <path className={styles.tick} d={`M${x + 18} ${y - gap / 2}h52`} />
                <text x={x + 76} y={y - gap / 2 + 3} className={styles.small}>
                  VERIFY
                </text>
              </g>
            )}
            <rect
              className={root ? styles.nodeRoot : styles.node}
              x={x - 46}
              y={y - 16}
              width={92}
              height={32}
            />
            <text x={x} y={y + 4} textAnchor="middle" className={root ? styles.labelRoot : styles.label}>
              {pad(i + 1)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Loop({ count }: { count: number }) {
  const cx = 160;
  const cy = 160;
  const r = 108;
  return (
    <svg viewBox="0 0 320 320" className={styles.svg}>
      <circle className={styles.rail} cx={cx} cy={cy} r={r} />
      <circle className={styles.ringFaint} cx={cx} cy={cy} r={r + 26} />
      <g className={styles.orbit} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <path className={styles.arc} d={`M${cx} ${cy - r}A${r} ${r} 0 0 1 ${cx + r} ${cy}`} />
        <circle className={styles.dotRed} cx={cx + r} cy={cy} r={3.5} />
      </g>
      <rect className={styles.device} x={cx - 34} y={cy - 24} width={68} height={48} />
      <path className={styles.tick} d={`M${cx - 20} ${cy + 34}h40`} />
      <text x={cx} y={cy + 4} textAnchor="middle" className={styles.small}>
        ENDPOINT
      </text>
      {Array.from({ length: count }, (_, i) => {
        const a = -Math.PI / 2 + (i / count) * Math.PI * 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        const ax = cx + Math.cos(a + Math.PI / count) * r;
        const ay = cy + Math.sin(a + Math.PI / count) * r;
        const deg = ((a + Math.PI / count) * 180) / Math.PI + 90;
        return (
          <g key={i}>
            <path className={styles.arrow} d="M-5 -4L0 0L-5 4" transform={`translate(${ax} ${ay}) rotate(${deg - 90})`} />
            <rect className={i === 2 ? styles.nodeRoot : styles.node} x={x - 22} y={y - 14} width={44} height={28} />
            <text x={x} y={y + 4} textAnchor="middle" className={i === 2 ? styles.labelRoot : styles.label}>
              {pad(i + 1)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Sequence({ count }: { count: number }) {
  const left = 70;
  const right = 250;
  const top = 64;
  const gap = 70;
  const bottom = top + count * gap;
  return (
    <svg viewBox={`0 0 320 ${bottom + 20}`} className={styles.svg}>
      <rect className={styles.hostBox} x={left - 46} y={12} width={92} height={30} />
      <text x={left} y={31} textAnchor="middle" className={styles.small}>
        HOST
      </text>
      <rect className={styles.nodeRoot} x={right - 46} y={12} width={92} height={30} />
      <text x={right} y={31} textAnchor="middle" className={styles.labelRoot}>
        EVSC
      </text>
      <path className={styles.lifeline} d={`M${left} 42V${bottom}M${right} 42V${bottom}`} />
      {Array.from({ length: count }, (_, i) => {
        const y = top + i * gap + 24;
        const toRight = i % 2 === 0;
        const x1 = toRight ? left : right;
        const x2 = toRight ? right : left;
        const dir = toRight ? 1 : -1;
        return (
          <g key={i}>
            <path className={i === count - 1 ? styles.messageRed : styles.message} d={`M${x1} ${y}H${x2 - dir * 4}`} />
            <path className={i === count - 1 ? styles.arrowRed : styles.arrow} d={`M${x2 - dir * 9} ${y - 4}L${x2 - dir * 3} ${y}L${x2 - dir * 9} ${y + 4}`} />
            <rect className={styles.badge} x={(left + right) / 2 - 16} y={y - 22} width={32} height={16} />
            <text x={(left + right) / 2} y={y - 10} textAnchor="middle" className={styles.badgeText}>
              {pad(i + 1)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ProcessDiagram({ process }: { process: Product['process'] }) {
  const count = process.steps.length;
  return (
    <div className={styles.frame} aria-hidden="true">
      {process.kind === 'chain' && <Chain count={count} />}
      {process.kind === 'loop' && <Loop count={count} />}
      {process.kind === 'sequence' && <Sequence count={count} />}
    </div>
  );
}
