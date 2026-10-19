/**
 * Vocabulary for the threat-intelligence demonstration. Every event shown on
 * the site is procedurally generated from these lists — none of it is real
 * telemetry, and the interface says so explicitly.
 */

import { seededRandom } from '../lib/motion';

export interface Region {
  id: string;
  name: string;
  lon: number;
  lat: number;
}

export const REGIONS: readonly Region[] = [
  { id: 'naw', name: 'North America West', lon: -120, lat: 41 },
  { id: 'nae', name: 'North America East', lon: -78, lat: 40 },
  { id: 'sam', name: 'South America', lon: -50, lat: -14 },
  { id: 'weu', name: 'Western Europe', lon: 3, lat: 48 },
  { id: 'neu', name: 'Northern Europe', lon: 18, lat: 60 },
  { id: 'eeu', name: 'Eastern Europe', lon: 32, lat: 50 },
  { id: 'mea', name: 'Middle East', lon: 47, lat: 26 },
  { id: 'afr', name: 'Southern Africa', lon: 26, lat: -25 },
  { id: 'sas', name: 'South Asia', lon: 78, lat: 21 },
  { id: 'eas', name: 'East Asia', lon: 121, lat: 33 },
  { id: 'sea', name: 'Southeast Asia', lon: 104, lat: 3 },
  { id: 'oce', name: 'Oceania', lon: 146, lat: -30 },
];

export const CLASSES = [
  'Reconnaissance',
  'Credential access',
  'Malware delivery',
  'Lateral movement',
  'Exfiltration attempt',
] as const;
export type ThreatClass = (typeof CLASSES)[number];

export const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'] as const;
export type Severity = (typeof SEVERITIES)[number];

const STATUSES = ['Blocked', 'Contained', 'Isolated', 'Under analysis'] as const;
export type Status = (typeof STATUSES)[number];

export interface SimEvent {
  id: string;
  /** Seconds since the start of the demonstration session. */
  t: number;
  cls: ThreatClass;
  severity: Severity;
  from: Region;
  to: Region;
  status: Status;
}

function pick<T>(list: readonly T[], r: number): T {
  return list[Math.floor(r * list.length) % list.length]!;
}

export function createEvent(rand: () => number, t: number): SimEvent {
  const from = pick(REGIONS, rand());
  let to = pick(REGIONS, rand());
  if (to.id === from.id) to = REGIONS[(REGIONS.indexOf(from) + 4) % REGIONS.length]!;
  const sevRoll = rand();
  const severity: Severity = sevRoll > 0.9 ? 'Critical' : sevRoll > 0.68 ? 'High' : sevRoll > 0.3 ? 'Medium' : 'Low';
  return {
    id: 'SIM-' + Math.floor(rand() * 0xffff).toString(16).toUpperCase().padStart(4, '0'),
    t,
    cls: pick(CLASSES, rand()),
    severity,
    from,
    to,
    status: severity === 'Critical' ? 'Isolated' : pick(STATUSES, rand()),
  };
}

/** Deterministic opening state so prerendered HTML and hydration agree. */
export function initialSimulation() {
  const rand = seededRandom(20261019);
  const times = [3, 7, 12, 16, 21, 26];
  const events = times.map((t) => createEvent(rand, t)).reverse();
  const counts = Object.fromEntries(CLASSES.map((c) => [c, 0])) as Record<ThreatClass, number>;
  for (const c of CLASSES) counts[c] = 2 + Math.floor(rand() * 9);
  for (const e of events) counts[e.cls] += 1;
  return { events, counts, clock: 28 };
}

export function formatClock(seconds: number): string {
  const s = Math.floor(seconds);
  const m = Math.floor(s / 60);
  return `T+${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
