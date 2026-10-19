import landMask from '../../content/land-mask.json';
import { REGIONS, type Region, type Severity } from '../../content/threats';

/*
 * Canvas renderer for the simulated threat map: a dot-matrix world (derived
 * from Natural Earth land polygons at build time — see land-mask.json) with
 * procedurally generated vectors between regional nodes.
 */

export interface Arc {
  from: Region;
  to: Region;
  severity: Severity;
  start: number;
}

const INK = '240,241,243';
const RED = '224,43,63';
const LAT_BOTTOM = landMask.LAT_TOP - landMask.ROWS * landMask.LAT_STEP;
const TRAVEL = 1.8;
const LIFE = 3.4;

const LAND: [number, number][] = (() => {
  const cells: [number, number][] = [];
  landMask.rows.forEach((hex, r) => {
    [...hex].forEach((ch, i) => {
      const bits = parseInt(ch, 16);
      for (let b = 0; b < 4; b++) {
        if (bits & (8 >> b)) cells.push([i * 4 + b, r]);
      }
    });
  });
  return cells;
})();

export function createThreatMapRenderer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  const base = document.createElement('canvas');
  let w = 0;
  let h = 0;
  let dpr = 1;

  const project = (lon: number, lat: number): [number, number] => [
    ((lon + 180) / 360) * w,
    ((landMask.LAT_TOP - lat) / (landMask.LAT_TOP - LAT_BOTTOM)) * h,
  ];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = base.width = Math.round(w * dpr);
    canvas.height = base.height = Math.round(h * dpr);

    // Static layer: land dots, graticule and regional nodes.
    const b = base.getContext('2d');
    if (!b) return;
    b.setTransform(dpr, 0, 0, dpr, 0, 0);
    b.clearRect(0, 0, w, h);
    const cw = w / landMask.COLS;
    const ch = h / landMask.ROWS;
    const size = Math.max(1, Math.min(cw, ch) * 0.42);
    b.fillStyle = `rgba(${INK},0.2)`;
    for (const [c, r] of LAND) {
      b.fillRect(c * cw + cw / 2 - size / 2, r * ch + ch / 2 - size / 2, size, size);
    }
    b.strokeStyle = `rgba(${INK},0.05)`;
    b.lineWidth = 1;
    b.beginPath();
    for (let lon = -150; lon < 180; lon += 30) {
      const [x] = project(lon, 0);
      b.moveTo(Math.round(x) + 0.5, 0);
      b.lineTo(Math.round(x) + 0.5, h);
    }
    for (let lat = 60; lat > LAT_BOTTOM; lat -= 30) {
      const [, y] = project(0, lat);
      b.moveTo(0, Math.round(y) + 0.5);
      b.lineTo(w, Math.round(y) + 0.5);
    }
    b.stroke();
    for (const region of REGIONS) {
      const [x, y] = project(region.lon, region.lat);
      b.strokeStyle = `rgba(${INK},0.35)`;
      b.strokeRect(x - 3.5, y - 3.5, 7, 7);
      b.fillStyle = `rgba(${INK},0.9)`;
      b.fillRect(x - 1, y - 1, 2, 2);
    }
  }

  function draw(t: number, arcs: Arc[]) {
    if (!ctx || !w) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(base, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Scanning meridian
    const sx = ((t * 0.035) % 1) * w;
    const grad = ctx.createLinearGradient(sx - 80, 0, sx, 0);
    grad.addColorStop(0, `rgba(${INK},0)`);
    grad.addColorStop(1, `rgba(${INK},0.05)`);
    ctx.fillStyle = grad;
    ctx.fillRect(sx - 80, 0, 80, h);
    ctx.fillStyle = `rgba(${INK},0.14)`;
    ctx.fillRect(sx, 0, 1, h);

    for (const arc of arcs) {
      const age = t - arc.start;
      if (age < 0 || age > LIFE) continue;
      const [x0, y0] = project(arc.from.lon, arc.from.lat);
      const [x1, y1] = project(arc.to.lon, arc.to.lat);
      const dist = Math.hypot(x1 - x0, y1 - y0);
      const mx = (x0 + x1) / 2;
      const my = (y0 + y1) / 2 - dist * 0.32;
      const severe = arc.severity === 'High' || arc.severity === 'Critical';
      const colour = severe ? RED : INK;
      const progress = Math.min(age / TRAVEL, 1);
      const fade = age > TRAVEL ? 1 - (age - TRAVEL) / (LIFE - TRAVEL) : 1;

      const point = (p: number): [number, number] => {
        const q = 1 - p;
        return [q * q * x0 + 2 * q * p * mx + p * p * x1, q * q * y0 + 2 * q * p * my + p * p * y1];
      };

      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${colour},${(severe ? 0.7 : 0.45) * fade})`;
      ctx.beginPath();
      const steps = 48;
      const tail = Math.max(0, progress - 0.55);
      for (let i = 0; i <= steps; i++) {
        const p = tail + ((progress - tail) * i) / steps;
        const [x, y] = point(p);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (progress < 1) {
        const [hx, hy] = point(progress);
        ctx.fillStyle = `rgba(${colour},1)`;
        ctx.fillRect(hx - 1.5, hy - 1.5, 3, 3);
      } else {
        // Arrival: interception ring at the destination node.
        const k = (age - TRAVEL) / (LIFE - TRAVEL);
        ctx.strokeStyle = `rgba(${colour},${0.8 * (1 - k)})`;
        ctx.beginPath();
        ctx.arc(x1, y1, 4 + k * 18, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(${colour},${0.9 * fade})`;
      ctx.fillRect(x0 - 2, y0 - 2, 4, 4);
    }
  }

  return { resize, draw };
}

export const ARC_LIFETIME = LIFE;
