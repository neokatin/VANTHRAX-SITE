/**
 * Contracts and client references shown on /government-enterprise/.
 *
 * Publication policy (enforced by review, supported by these types):
 * - Add an entry only for a real engagement the client has authorized in
 *   writing to be made public.
 * - Every entry must say where it can be verified (`source`): a public award
 *   notice, a press release, or a note recording the written authorization.
 * - Reviews are published verbatim, attributed to a named person and
 *   organization. No anonymous, composite or paraphrased testimonials.
 *
 * While both lists are empty, the page shows an explicit "nothing published"
 * state instead of placeholder or sample content.
 */

export type ClientType = 'Government' | 'Enterprise';

export interface Contract {
  client: string;
  type: ClientType;
  sector: string;
  /** Plain description of the work, as authorized by the client. */
  scope: string;
  /** Year the contract was awarded or began, e.g. "2026". */
  year: string;
  /** Public URL, or a note recording the client's written authorization. */
  source: string;
}

export interface Review {
  quote: string;
  author: string;
  role: string;
  organization: string;
  type: ClientType;
  /** ISO date the review was given, e.g. "2026-10-19". */
  date: string;
  /** Public URL, or a note recording the client's written authorization. */
  source: string;
}

export const CONTRACTS: readonly Contract[] = [];

export const REVIEWS: readonly Review[] = [];
