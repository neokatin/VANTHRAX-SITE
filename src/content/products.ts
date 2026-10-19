/**
 * Product portfolio copy. Descriptions are deliberately qualitative: no
 * benchmarks, certifications or compatibility guarantees are claimed.
 */

export type ProductId = 'vsc' | 'vcp' | 'evsc';

export interface Product {
  id: ProductId;
  code: string;
  name: string;
  category: string;
  summary: string;
  capabilities: string[];
  overview: string[];
  architecture: string[];
  deployment: string[];
}

export const PRODUCTS: readonly Product[] = [
  {
    id: 'vsc',
    code: 'VSC',
    name: 'VANTHRAX Security Chip',
    category: 'Hardware security',
    summary:
      'A hardware-integrated security architecture that establishes protection at the device level — beneath the operating system, where trust begins.',
    capabilities: [
      'Hardware root of trust',
      'Isolated key storage',
      'Measured boot verification',
      'Tamper-aware design',
    ],
    overview: [
      'The VANTHRAX Security Chip anchors a device’s security posture in silicon. By isolating its most sensitive operations from general-purpose software, VSC is designed to preserve integrity even when higher layers of the system are under attack.',
      'VSC treats every boot, every key and every privileged operation as something to be verified — never assumed.',
    ],
    architecture: [
      'Dedicated secure execution environment, isolated from the host processor',
      'Protected storage for cryptographic keys and device identity',
      'Verification of firmware and boot components before control is handed over',
      'Signals to higher VANTHRAX layers when integrity cannot be established',
    ],
    deployment: [
      'Integrated during device design and manufacturing',
      'Forms the foundation for VCP endpoint defense',
    ],
  },
  {
    id: 'vcp',
    code: 'VCP',
    name: 'VANTHRAX Cybersecurity Protection',
    category: 'Endpoint platform',
    summary:
      'A comprehensive endpoint security platform for computers and mobile devices — continuous defense across every machine an organization depends on.',
    capabilities: [
      'Behavioral threat detection',
      'Exploit and ransomware defense',
      'Centralized policy enforcement',
      'Rapid containment and response',
    ],
    overview: [
      'VANTHRAX Cybersecurity Protection extends a single, consistent defensive posture across desktops, laptops and mobile devices. It is engineered to identify hostile behavior early and to contain it decisively.',
      'Where hardware with VSC is present, VCP draws on device-level integrity signals to make better-informed decisions.',
    ],
    architecture: [
      'Lightweight on-device agent with behavioral analysis',
      'Policy managed centrally and enforced locally',
      'Isolation controls to contain compromised endpoints',
      'Integration with VANTHRAX threat intelligence',
    ],
    deployment: [
      'Deployed to managed computers and mobile devices',
      'Operates alongside existing enterprise management tooling',
    ],
  },
  {
    id: 'evsc',
    code: 'EVSC',
    name: 'External VANTHRAX Security Chip',
    category: 'External hardware',
    summary:
      'An external security module that extends VANTHRAX hardware protection to compatible legacy systems and connected devices that were never designed with it.',
    capabilities: [
      'External hardware trust anchor',
      'Protection for legacy systems',
      'Secure device identity',
      'Physical presence verification',
    ],
    overview: [
      'Critical environments often depend on equipment that cannot simply be replaced. The External VANTHRAX Security Chip brings hardware-anchored protection to compatible systems already in service.',
      'EVSC is designed for the long operational lifetimes typical of infrastructure, industrial and institutional environments.',
    ],
    architecture: [
      'Self-contained secure element in a hardened external enclosure',
      'Provides cryptographic identity and key protection to the host',
      'Works with VCP where the host platform supports it',
      'Removal and presence are visible to security policy',
    ],
    deployment: [
      'Attached to compatible legacy hardware and connected devices',
      'Compatibility is assessed per environment',
    ],
  },
];
