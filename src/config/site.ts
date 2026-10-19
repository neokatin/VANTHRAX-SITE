/**
 * Central site configuration. Everything that is likely to change when the
 * site moves from foundation to production lives here.
 */

export const SITE = {
  name: 'VANTHRAX Systems',
  shortName: 'VANTHRAX',
  url: 'https://vanthrax.com',
  tagline: 'Security Without Compromise.',
  description:
    'VANTHRAX Systems secures the systems that power civilization — from individual devices to global infrastructure.',
  locale: 'en_US',
  ogImage: '/images/social/vanthrax-og.jpg',
  ogImageAlt: 'VANTHRAX Systems — Cybersecurity, Defense, Intelligence',
  year: __BUILD_YEAR__,
} as const;

export type ContactChannelId = 'enterprise' | 'product' | 'partnership' | 'general';

export interface ContactChannel {
  id: ContactChannelId;
  title: string;
  summary: string;
  /**
   * Destination address for this channel. Leave empty until the mailbox (or a
   * form service) is actually receiving messages — the site then shows an
   * explicit "not yet open" state instead of a link that goes nowhere.
   */
  email: string;
}

export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  {
    id: 'enterprise',
    title: 'Enterprise inquiries',
    summary: 'Security programs for organizations operating critical systems at scale.',
    email: '',
  },
  {
    id: 'product',
    title: 'Product information',
    summary: 'Technical briefings on VSC, VCP and EVSC architecture and deployment.',
    email: '',
  },
  {
    id: 'partnership',
    title: 'Partnership opportunities',
    summary: 'Integration, research and technology partnerships.',
    email: '',
  },
  {
    id: 'general',
    title: 'General inquiries',
    summary: 'Press, careers and all other correspondence.',
    email: '',
  },
];

export const isContactConfigured = CONTACT_CHANNELS.some((c) => c.email.length > 0);

export interface NavItem {
  label: string;
  href: string;
  /** Section id used for scroll-spy on the home page. */
  section: string;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: 'Products', href: '/#products', section: 'products' },
  { label: 'Solutions', href: '/#solutions', section: 'solutions' },
  { label: 'Technology', href: '/#technology', section: 'technology' },
  { label: 'Company', href: '/#company', section: 'company' },
  { label: 'Contact', href: '/#contact', section: 'contact' },
];

export const LEGAL_NAV = [
  { label: 'Privacy Policy', href: '/legal/privacy/' },
  { label: 'Terms of Use', href: '/legal/terms/' },
  { label: 'Accessibility', href: '/legal/accessibility/' },
] as const;
