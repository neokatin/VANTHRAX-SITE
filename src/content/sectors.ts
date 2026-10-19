import { Building2, Factory, HeartPulse, Landmark, RadioTower, TrainFront, Zap, type LucideIcon } from 'lucide-react';
import type { ProductId } from './products';

export interface Sector {
  id: string;
  name: string;
  description: string;
  focus: string;
  icon: LucideIcon;
  /** What is at risk if these systems fail. */
  stakes: string;
  /** How the VANTHRAX architecture is applied. */
  approach: string;
  /** Indexes into LAYERS. */
  layers: number[];
  products: ProductId[];
}

export const SECTORS: readonly Sector[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Clinical systems, medical devices and patient data where downtime is measured in lives.',
    focus: 'Continuity of care',
    icon: HeartPulse,
    stakes:
      'Clinical systems and connected medical devices must remain available and trustworthy around the clock — often on equipment with long service lives that was never designed to be defended.',
    approach:
      'Hardware-anchored identity for connected devices, endpoint defense for clinical workstations, and segmentation that keeps a compromise in one system from reaching another.',
    layers: [0, 1, 2],
    products: ['evsc', 'vcp'],
  },
  {
    id: 'energy',
    name: 'Electrical grids',
    description: 'Generation, transmission and distribution networks that every other sector depends on.',
    focus: 'Grid stability',
    icon: Zap,
    stakes:
      'A disruption to generation or distribution cascades immediately into every sector that depends on power, from hospitals to water treatment to communications.',
    approach:
      'Protection for operational technology that cannot simply be replaced, strict separation between corporate and control networks, and resilience designed for continuous operation.',
    layers: [0, 2, 4],
    products: ['evsc', 'vcp'],
  },
  {
    id: 'telecom',
    name: 'Telecommunications',
    description: 'Core networks and carrier infrastructure that move the world’s communications.',
    focus: 'Network integrity',
    icon: RadioTower,
    stakes:
      'Carrier networks carry the communications of entire populations. Their integrity underpins emergency services, commerce and government alike.',
    approach:
      'Verified integrity for network equipment, governance of how traffic moves between systems, and intelligence that tracks adversary activity across the estate.',
    layers: [0, 2, 3],
    products: ['vsc', 'vcp'],
  },
  {
    id: 'finance',
    name: 'Financial networks',
    description: 'Payment, clearing and settlement systems that must remain trustworthy at every moment.',
    focus: 'Transaction trust',
    icon: Landmark,
    stakes:
      'Payment and settlement systems must be trustworthy at every moment. Even brief doubt about their integrity carries systemic cost.',
    approach:
      'Hardware-protected keys and identities, endpoint defense across operations environments, and intelligence-led detection of intrusion.',
    layers: [0, 1, 3],
    products: ['vsc', 'vcp'],
  },
  {
    id: 'industrial',
    name: 'Industrial control systems',
    description: 'Operational technology where digital compromise becomes physical consequence.',
    focus: 'Safe operation',
    icon: Factory,
    stakes:
      'In operational technology, a digital compromise can become physical harm, equipment damage or environmental release.',
    approach:
      'External hardware anchors for legacy controllers, tightly governed network paths, and recovery planning that always prioritizes a safe state.',
    layers: [0, 2, 4],
    products: ['evsc'],
  },
  {
    id: 'transport',
    name: 'Transportation',
    description: 'Rail, aviation, maritime and traffic systems that keep people and goods in motion.',
    focus: 'Operational safety',
    icon: TrainFront,
    stakes:
      'Signaling, traffic management and logistics systems keep people moving safely. When they fail, the consequences are public and immediate.',
    approach:
      'Device-level integrity for embedded systems, endpoint defense for operations centers, and resilience that degrades gracefully rather than failing outright.',
    layers: [0, 1, 4],
    products: ['evsc', 'vcp'],
  },
  {
    id: 'government',
    name: 'Government systems',
    description: 'Public institutions and services that citizens rely on to function without interruption.',
    focus: 'Institutional resilience',
    icon: Building2,
    stakes:
      'Public institutions hold sensitive information and deliver services that citizens cannot obtain anywhere else.',
    approach:
      'Defense across every layer, with particular attention to long-lived legacy estates, accountability, and control over where protection decisions are made.',
    layers: [0, 1, 2, 3, 4],
    products: ['vsc', 'vcp', 'evsc'],
  },
];
