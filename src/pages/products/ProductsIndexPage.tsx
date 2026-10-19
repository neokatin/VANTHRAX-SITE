import { LAYERS } from '../../content/layers';
import { PRODUCTS } from '../../content/products';
import { ProductGrid } from '../../components/products/ProductGrid';
import { Block } from '../../components/ui/Block';
import { NextPage } from '../../components/ui/NextPage';
import { PageHeader } from '../../components/ui/PageHeader';
import styles from './ProductsIndexPage.module.css';

export function ProductsIndexPage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="Products"
        current="Products"
        title={
          <>
            Engineered for resilience<span className="accent-stop">.</span>
          </>
        }
        intro={
          <p>
            Three technologies, one architecture. VSC establishes trust inside the device, EVSC extends it to systems
            already in service, and VCP defends every endpoint built on top.
          </p>
        }
      />

      <section className={styles.portfolio} aria-label="Product portfolio">
        <div className="container">
          <ProductGrid headingLevel="h2" />
        </div>
      </section>

      <Block id="architecture" label="One architecture" title="Where each product sits" tone="raised">
        <p className={styles.lead}>
          Every VANTHRAX product operates at a defined layer of the five-layer architecture and strengthens the
          layers around it. Nothing is designed to stand alone.
        </p>
        <div className={styles.tableWrap} role="region" aria-labelledby="matrix-caption" tabIndex={0}>
          <table className={styles.table}>
            <caption id="matrix-caption" className="mono">
              Products mapped to protection layers
            </caption>
            <thead>
              <tr>
                <th scope="col">Layer</th>
                {PRODUCTS.map((p) => (
                  <th key={p.id} scope="col">
                    <a href={`/products/${p.id}/`}>{p.code}</a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LAYERS.map((layer, i) => (
                <tr key={layer.id}>
                  <th scope="row">
                    <span className="mono">L{i + 1}</span> {layer.name}
                  </th>
                  {PRODUCTS.map((p) => {
                    const role = p.layer === i ? 'Operates' : p.supports.includes(i) ? 'Integrates' : null;
                    return (
                      <td key={p.id} data-role={role ?? 'none'}>
                        {role ? (
                          <>
                            <span className={styles.mark} aria-hidden="true" />
                            {role}
                          </>
                        ) : (
                          <span className={styles.none}>
                            <span aria-hidden="true">—</span>
                            <span className="visually-hidden">Not applicable</span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`mono ${styles.legend}`}>
          Operates — the product’s primary layer. Integrates — the product feeds or works with this layer.
        </p>
      </Block>

      <NextPage href="/solutions/" title="Solutions" />
    </>
  );
}
