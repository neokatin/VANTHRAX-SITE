export interface Layer {
  id: string;
  name: string;
  short: string;
  body: string;
  products: string;
}

/** Ordered from the foundation upward. */
export const LAYERS: readonly Layer[] = [
  {
    id: 'hardware',
    name: 'Hardware Integrity',
    short: 'Trust begins in silicon.',
    body: 'A verified foundation is established before any software runs. Keys, identity and boot integrity are anchored in dedicated hardware that higher layers can rely on.',
    products: 'VSC · EVSC',
  },
  {
    id: 'endpoint',
    name: 'Endpoint Defense',
    short: 'Every device is a perimeter.',
    body: 'Behavior on each computer and mobile device is observed and governed, so hostile activity is identified and contained where it starts.',
    products: 'VCP',
  },
  {
    id: 'network',
    name: 'Network Protection',
    short: 'Movement is never implicit.',
    body: 'Communication between systems is segmented and governed by policy, limiting how far any compromise can travel.',
    products: 'Architecture layer',
  },
  {
    id: 'intelligence',
    name: 'Threat Intelligence',
    short: 'Every observation strengthens the whole.',
    body: 'Signals from every layer are correlated and returned as defensive context, so protection evolves alongside the threat.',
    products: 'Intelligence layer',
  },
  {
    id: 'resilience',
    name: 'Infrastructure Resilience',
    short: 'Designed to continue.',
    body: 'Systems are engineered to keep operating safely under pressure — degrading gracefully, recovering deliberately, and never failing silently.',
    products: 'Architecture layer',
  },
];
