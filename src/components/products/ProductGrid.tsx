import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS, type Product, type ProductId } from '../../content/products';
import { IMAGES, imageIfAvailable, type ImageAsset } from '../../lib/images';
import { ProductIllustration } from '../visuals/ProductIllustrations';
import styles from './ProductGrid.module.css';

const RENDERS: Partial<Record<ProductId, ImageAsset | null>> = {
  vsc: imageIfAvailable(IMAGES.vscChip),
  evsc: imageIfAvailable(IMAGES.evscDevice),
};

/** The supplied product render if present, otherwise the original drawing. */
export function ProductVisual({ product, className }: { product: Product; className?: string }) {
  const render = RENDERS[product.id];
  if (render) {
    return (
      <img
        className={`${styles.render} ${className ?? ''}`}
        src={render.src}
        width={render.width}
        height={render.height}
        alt={render.alt}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <div className={`${styles.drawing} ${className ?? ''}`}>
      <ProductIllustration id={product.id} />
    </div>
  );
}

interface ProductGridProps {
  /** Restrict to these products (defaults to the full portfolio). */
  ids?: ProductId[];
  /** Heading level for card titles, to keep the outline correct per page. */
  headingLevel?: 'h2' | 'h3';
}

export function ProductGrid({ ids, headingLevel = 'h3' }: ProductGridProps) {
  const products = ids ? PRODUCTS.filter((p) => ids.includes(p.id)) : PRODUCTS;
  const Heading = headingLevel;
  return (
    <ul role="list" className={styles.grid} data-count={products.length}>
      {products.map((product, i) => (
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
                  {product.code} / 0{PRODUCTS.indexOf(product) + 1}
                </span>
                <span>{product.category}</span>
              </div>
              <ProductVisual product={product} />
              <span className={styles.corners} aria-hidden="true" />
            </div>

            <div className={styles.body}>
              <p className={`display ${styles.code}`} aria-hidden="true">
                {product.code}
              </p>
              <Heading id={`product-${product.id}`} className={styles.name}>
                {product.name}
              </Heading>
              <p className={styles.summary}>{product.summary}</p>
              <ul role="list" className={styles.capabilities} aria-label={`${product.code} key capabilities`}>
                {product.capabilities.map((c) => (
                  <li key={c.title}>{c.title}</li>
                ))}
              </ul>
              <a href={`/products/${product.id}/`} className={styles.more}>
                Learn more<span className="visually-hidden"> about {product.name}</span>
                <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
