export interface Layer {
  id: string;
  name: string;
  short: string;
  body: string;
  products: string;
  /** Principal mechanisms at this layer. */
  points: string[];
}

/** Ordered from the foundation upward. */
export const LAYERS: readonly Layer[] = [
  {
    id: 'hardware',
    name: 'Hardware Integrity',
    short: 'Trust begins in silicon.',
    body: 'A verified foundation is established before any software runs. Keys, identity and boot integrity are anchored in dedicated hardware that higher layers can rely on.',
    products: 'VSC · EVSC',
    points: ['Immutable hardware root of trust', 'Measured and verified boot', 'Protected keys and device identity'],
  },
  {
    id: 'endpoint',
    name: 'Endpoint Defense',
    short: 'Every device is a perimeter.',
    body: 'Behavior on each computer and mobile device is observed and governed, so hostile activity is identified and contained where it starts.',
    products: 'VCP',
    points: ['Behavioral detection on every device', 'Exploit and ransomware interruption', 'Isolation of compromised endpoints'],
  },
  {
    id: 'network',
    name: 'Network Protection',
    short: 'Movement is never implicit.',
    body: 'Communication between systems is segmented and governed by policy, limiting how far any compromise can travel.',
    products: 'Architecture layer',
    points: ['Segmentation between systems and trust zones', 'Explicit, policy-governed communication paths', 'Containment of lateral movement'],
  },
  {
    id: 'intelligence',
    name: 'Threat Intelligence',
    short: 'Every observation strengthens the whole.',
    body: 'Signals from every layer are correlated and returned as defensive context, so protection evolves alongside the threat.',
    products: 'Intelligence layer',
    points: ['Correlation of signals across every layer', 'Classification by technique and severity', 'Defensive context returned to each layer'],
  },
  {
    id: 'resilience',
    name: 'Infrastructure Resilience',
    short: 'Designed to continue.',
    body: 'Systems are engineered to keep operating safely under pressure — degrading gracefully, recovering deliberately, and never failing silently.',
    products: 'Architecture layer',
    points: ['Graceful degradation under attack', 'Deliberate, verified recovery', 'Continuity planning for critical functions'],
  },
];
