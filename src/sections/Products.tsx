import { ProductGrid } from '../components/products/ProductGrid';
import { SectionHeader } from '../components/ui/SectionHeader';

export function Products() {
  return (
    <section id="products" className="section" aria-labelledby="products-title">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="Products"
          titleId="products-title"
          title={
            <>
              Engineered for resilience.
            </>
          }
          intro={
            <p>
              Three technologies, one architecture. From silicon to the endpoint to the systems that were never
              designed to be defended, every VANTHRAX product shares a single principle: trust is established,
              never assumed.
            </p>
          }
          link={{ href: '/products/', label: 'Explore the portfolio' }}
        />
        <ProductGrid />
      </div>
    </section>
  );
}
