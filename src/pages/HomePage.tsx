import { Company } from '../sections/Company';
import { Contact } from '../sections/Contact';
import { Hero } from '../sections/Hero';
import { Infrastructure } from '../sections/Infrastructure';
import { Products } from '../sections/Products';
import { Technology } from '../sections/Technology';
import { ThreatIntel } from '../sections/ThreatIntel';

export function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <Infrastructure />
      <ThreatIntel />
      <Technology />
      <Company />
      <Contact />
    </>
  );
}
