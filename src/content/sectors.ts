import { Building2, Factory, HeartPulse, Landmark, RadioTower, TrainFront, Zap, type LucideIcon } from 'lucide-react';

export interface Sector {
  id: string;
  name: string;
  description: string;
  focus: string;
  icon: LucideIcon;
}

export const SECTORS: readonly Sector[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Clinical systems, medical devices and patient data where downtime is measured in lives.',
    focus: 'Continuity of care',
    icon: HeartPulse,
  },
  {
    id: 'energy',
    name: 'Electrical grids',
    description: 'Generation, transmission and distribution networks that every other sector depends on.',
    focus: 'Grid stability',
    icon: Zap,
  },
  {
    id: 'telecom',
    name: 'Telecommunications',
    description: 'Core networks and carrier infrastructure that move the world’s communications.',
    focus: 'Network integrity',
    icon: RadioTower,
  },
  {
    id: 'finance',
    name: 'Financial networks',
    description: 'Payment, clearing and settlement systems that must remain trustworthy at every moment.',
    focus: 'Transaction trust',
    icon: Landmark,
  },
  {
    id: 'industrial',
    name: 'Industrial control systems',
    description: 'Operational technology where digital compromise becomes physical consequence.',
    focus: 'Safe operation',
    icon: Factory,
  },
  {
    id: 'transport',
    name: 'Transportation',
    description: 'Rail, aviation, maritime and traffic systems that keep people and goods in motion.',
    focus: 'Operational safety',
    icon: TrainFront,
  },
  {
    id: 'government',
    name: 'Government systems',
    description: 'Public institutions and services that citizens rely on to function without interruption.',
    focus: 'Institutional resilience',
    icon: Building2,
  },
];
