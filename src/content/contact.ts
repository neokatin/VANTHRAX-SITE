import type { ContactChannelId } from '../config/site';

/** What to include when writing to each channel. */
export const INQUIRY_GUIDANCE: Record<ContactChannelId, readonly string[]> = {
  enterprise: [
    'Your organization and the sector it operates in',
    'The systems or environments you need to protect',
    'Any constraints: legacy equipment, regulation, operating hours',
  ],
  product: [
    'Which product or products you are interested in — VSC, VCP or EVSC',
    'The platforms or hardware involved',
    'Whether you are evaluating, planning or ready to deploy',
  ],
  partnership: [
    'Your organization and what it builds or provides',
    'The kind of partnership you have in mind',
    'How it would benefit the organizations VANTHRAX protects',
  ],
  general: ['The nature of your inquiry', 'How and when you would prefer to be contacted'],
};
