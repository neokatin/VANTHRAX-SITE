export interface Principle {
  title: string;
  body: string;
  detail: string;
}

export const PRINCIPLES: readonly Principle[] = [
  {
    title: 'Architecture first',
    body: 'Protection is designed into systems from their foundations. It is never bolted on after the fact.',
    detail:
      'Every product begins with where it sits in the architecture and what it must be able to trust. Features come after that question is answered.',
  },
  {
    title: 'Defense in depth',
    body: 'No single control is trusted to hold alone. Every layer assumes the one beneath it may be tested.',
    detail:
      'Independent layers mean that defeating one does not defeat the system. Each is designed to keep working when its neighbors are under pressure.',
  },
  {
    title: 'Restraint',
    body: 'We build what is necessary and nothing more. Complexity is an attack surface.',
    detail:
      'Every added capability is something that must itself be defended. VANTHRAX favors fewer, stronger mechanisms over broad, shallow ones.',
  },
  {
    title: 'Accountability',
    body: 'Security is a responsibility to the people who depend on the systems we protect.',
    detail:
      'Patients, passengers, customers and citizens rarely know which systems protect them. VANTHRAX works as though they are watching.',
  },
];

export const COMMITMENTS: readonly string[] = [
  'We will not publish claims we cannot substantiate.',
  'We will not sell fear in place of protection.',
  'We will not publish a client’s name, contract or words without their written permission.',
  'We will not treat security as a feature to be added later.',
];
