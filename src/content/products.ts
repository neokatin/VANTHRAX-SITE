/**
 * Product portfolio copy. Descriptions are deliberately qualitative: no
 * benchmarks, certifications or compatibility guarantees are claimed.
 */

export type ProductId = 'vsc' | 'vcp' | 'evsc';

export interface Capability {
  title: string;
  body: string;
}

export interface ProcessStep {
  label: string;
  body: string;
}

export interface Product {
  id: ProductId;
  code: string;
  name: string;
  category: string;
  /** One-line positioning used in page headers. */
  tagline: string;
  summary: string;
  capabilities: Capability[];
  overview: string[];
  /** Index into LAYERS for the layer this product primarily operates at. */
  layer: number;
  /** Other layers this product feeds or integrates with. */
  supports: number[];
  process: {
    kind: 'chain' | 'loop' | 'sequence';
    title: string;
    intro: string;
    steps: ProcessStep[];
  };
  architecture: string[];
  deployment: string[];
}

export const PRODUCTS: readonly Product[] = [
  {
    id: 'vsc',
    code: 'VSC',
    name: 'VANTHRAX Security Chip',
    category: 'Hardware security',
    tagline: 'Trust, established in silicon.',
    summary:
      'A hardware-integrated security architecture that establishes protection at the device level — beneath the operating system, where trust begins.',
    capabilities: [
      {
        title: 'Hardware root of trust',
        body: 'An immutable starting point for every security decision the device makes, anchored in dedicated silicon rather than software.',
      },
      {
        title: 'Isolated key storage',
        body: 'Cryptographic keys and device identity are held apart from the host processor, out of reach of compromised software.',
      },
      {
        title: 'Measured boot verification',
        body: 'Each stage of start-up is measured and checked before it runs, so a tampered component is caught before it gains control.',
      },
      {
        title: 'Tamper-aware design',
        body: 'The architecture is designed to recognize conditions that indicate physical interference and to respond according to policy.',
      },
    ],
    overview: [
      'The VANTHRAX Security Chip anchors a device’s security posture in silicon. By isolating its most sensitive operations from general-purpose software, VSC is designed to preserve integrity even when higher layers of the system are under attack.',
      'VSC treats every boot, every key and every privileged operation as something to be verified — never assumed.',
    ],
    layer: 0,
    supports: [1],
    process: {
      kind: 'chain',
      title: 'A chain of verified trust',
      intro: 'Every stage of start-up must be proven before the next one is allowed to run. If any link fails, the chain stops there.',
      steps: [
        { label: 'Immutable root', body: 'Verification begins from code anchored in VSC that cannot be modified in the field.' },
        { label: 'Boot loader', body: 'The first software to run is measured and checked against its expected state.' },
        { label: 'Firmware', body: 'Platform firmware is verified in turn; a deviation halts or flags the boot according to policy.' },
        { label: 'Operating system', body: 'Control passes to the operating system only once the chain beneath it is intact.' },
        { label: 'Attestation', body: 'Integrity evidence is made available to VCP and to policy, so higher layers know what they stand on.' },
      ],
    },
    architecture: [
      'Dedicated secure execution environment, isolated from the host processor',
      'Protected storage for cryptographic keys and device identity',
      'Verification of firmware and boot components before control is handed over',
      'Signals to higher VANTHRAX layers when integrity cannot be established',
    ],
    deployment: [
      'Integrated during device design and manufacturing',
      'Forms the foundation for VCP endpoint defense',
      'Technical specifications are shared during product briefings',
    ],
  },
  {
    id: 'vcp',
    code: 'VCP',
    name: 'VANTHRAX Cybersecurity Protection',
    category: 'Endpoint platform',
    tagline: 'Every device, continuously defended.',
    summary:
      'A comprehensive endpoint security platform for computers and mobile devices — continuous defense across every machine an organization depends on.',
    capabilities: [
      {
        title: 'Behavioral threat detection',
        body: 'Activity is judged by what it does, not only by what it is, so unfamiliar attacks can be recognized by their behavior.',
      },
      {
        title: 'Exploit and ransomware defense',
        body: 'Techniques used to hijack legitimate software or encrypt data for extortion are identified and interrupted.',
      },
      {
        title: 'Centralized policy enforcement',
        body: 'Security policy is defined once and enforced consistently on every managed computer and mobile device.',
      },
      {
        title: 'Rapid containment and response',
        body: 'A compromised device can be isolated decisively, limiting how far an intrusion can spread while it is investigated.',
      },
    ],
    overview: [
      'VANTHRAX Cybersecurity Protection extends a single, consistent defensive posture across desktops, laptops and mobile devices. It is engineered to identify hostile behavior early and to contain it decisively.',
      'Where hardware with VSC is present, VCP draws on device-level integrity signals to make better-informed decisions.',
    ],
    layer: 1,
    supports: [3],
    process: {
      kind: 'loop',
      title: 'A continuous defensive loop',
      intro: 'Endpoint defense is never finished. VCP runs a cycle that tightens with every pass.',
      steps: [
        { label: 'Observe', body: 'Process, file, network and identity activity on the device is monitored continuously.' },
        { label: 'Analyze', body: 'Behavior is evaluated against policy and threat intelligence to separate the hostile from the routine.' },
        { label: 'Contain', body: 'Hostile activity is stopped and, where necessary, the device is isolated from the rest of the estate.' },
        { label: 'Recover', body: 'Affected systems are restored deliberately, and what was learned is fed back into detection.' },
      ],
    },
    architecture: [
      'Lightweight on-device agent with behavioral analysis',
      'Policy managed centrally and enforced locally',
      'Isolation controls to contain compromised endpoints',
      'Integration with VANTHRAX threat intelligence',
    ],
    deployment: [
      'Deployed to managed computers and mobile devices',
      'Operates alongside existing enterprise management tooling',
      'Supported platforms are confirmed during product briefings',
    ],
  },
  {
    id: 'evsc',
    code: 'EVSC',
    name: 'External VANTHRAX Security Chip',
    category: 'External hardware',
    tagline: 'Hardware trust for systems already in service.',
    summary:
      'An external security module that extends VANTHRAX hardware protection to compatible legacy systems and connected devices that were never designed with it.',
    capabilities: [
      {
        title: 'External hardware trust anchor',
        body: 'A dedicated secure element that brings hardware-anchored protection to hosts that lack it internally.',
      },
      {
        title: 'Protection for legacy systems',
        body: 'Designed for equipment that must stay in service for years, where replacement is impractical or impossible.',
      },
      {
        title: 'Secure device identity',
        body: 'Gives the host a cryptographic identity that is difficult to clone, so it can be recognized and trusted on the network.',
      },
      {
        title: 'Physical presence verification',
        body: 'Attachment and removal of the module are visible to security policy, so its absence never goes unnoticed.',
      },
    ],
    overview: [
      'Critical environments often depend on equipment that cannot simply be replaced. The External VANTHRAX Security Chip brings hardware-anchored protection to compatible systems already in service.',
      'EVSC is designed for the long operational lifetimes typical of infrastructure, industrial and institutional environments.',
    ],
    layer: 0,
    supports: [1],
    process: {
      kind: 'sequence',
      title: 'How a host gains a trust anchor',
      intro: 'EVSC and its host establish trust through a short, explicit exchange before protection begins.',
      steps: [
        { label: 'Attach', body: 'The module is connected to a compatible host, and its presence is registered.' },
        { label: 'Identify', body: 'EVSC presents its cryptographic identity to the host and to policy.' },
        { label: 'Verify', body: 'The module and its state are confirmed before it is trusted with any operation.' },
        { label: 'Protect', body: 'Keys and identity operations run inside EVSC; removal is visible to policy immediately.' },
      ],
    },
    architecture: [
      'Self-contained secure element in a hardened external enclosure',
      'Provides cryptographic identity and key protection to the host',
      'Works with VCP where the host platform supports it',
      'Removal and presence are visible to security policy',
    ],
    deployment: [
      'Attached to compatible legacy hardware and connected devices',
      'Compatibility is assessed per environment',
      'Technical specifications are shared during product briefings',
    ],
  },
];

export function productById(id: ProductId): Product {
  return PRODUCTS.find((p) => p.id === id)!;
}
