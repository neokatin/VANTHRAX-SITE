import { useCallback, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS, type Product } from '../content/products';
import { ProductDialog } from '../components/ui/ProductDialog';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProductIllustration } from '../components/visuals/ProductIllustrations';
import { IMAGES, imageIfAvailable, type ImageAsset } from '../lib/images';
import styles from './Products.module.css';

const RENDERS: Partial<Record<Product['id'], ImageAsset | null>> = {
  vsc: imageIfAvailable(IMAGES.vscChip),
  evsc: imageIfAvailable(IMAGES.evscDevice),
};

export function Products() {
  const [selected, setSelected] = useState<Product | null>(null);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section id="products" className="section" aria-labelledby="products-title">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="Products"
          titleId="products-title"
          title={
            <>
              Engineered for resilience<span className="accent-stop">.</span>
            </>
          }
          intro={
            <p>
              Three technologies, one architecture. From silicon to the endpoint to the systems that were never
              designed to be defended, every VANTHRAX product shares a single principle: trust is established,
              never assumed.
            </p>
          }
        />

        <ul role="list" className={styles.grid}>
          {PRODUCTS.map((product, i) => {
            const render = RENDERS[product.id];
            return (
              <li
                key={product.id}
                className={styles.item}
                data-reveal
                style={{ '--reveal-delay': `${i * 110}ms` } as React.CSSProperties}
              >
                <article className={styles.card} aria-labelledby={`product-${product.id}`}>
                  <div className={styles.visual}>
                    <div className={`mono ${styles.visualMeta}`} aria-hidden="true">
                      <span>
                        {product.code} / 0{i + 1}
                      </span>
                      <span>{product.category}</span>
                    </div>
                    {render ? (
                      <img
                        className={styles.render}
                        src={render.src}
                        width={render.width}
                        height={render.height}
                        alt={render.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className={styles.drawing}>
                        <ProductIllustration id={product.id} />
                      </div>
                    )}
                    <span className={styles.corners} aria-hidden="true" />
                  </div>

                  <div className={styles.body}>
                    <p className={`display ${styles.code}`} aria-hidden="true">
                      {product.code}
                    </p>
                    <h3 id={`product-${product.id}`} className={styles.name}>
                      {product.name}
                    </h3>
                    <p className={styles.summary}>{product.summary}</p>
                    <ul role="list" className={styles.capabilities} aria-label={`${product.code} key capabilities`}>
                      {product.capabilities.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className={styles.more}
                      aria-haspopup="dialog"
                      onClick={() => setSelected(product)}
                    >
                      Learn more<span className="visually-hidden"> about {product.name}</span>
                      <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      <ProductDialog product={selected} onClose={handleClose} />
    </section>
  );
}
