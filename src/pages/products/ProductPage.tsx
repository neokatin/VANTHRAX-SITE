import { ArrowRight } from 'lucide-react';
import { LAYERS } from '../../content/layers';
import { PRODUCTS, type Product } from '../../content/products';
import { ProductGrid, ProductVisual } from '../../components/products/ProductGrid';
import { Block } from '../../components/ui/Block';
import { ButtonLink } from '../../components/ui/Button';
import { NextPage } from '../../components/ui/NextPage';
import { PageHeader } from '../../components/ui/PageHeader';
import { LayerStack } from '../../components/visuals/LayerStack';
import { ProcessDiagram } from '../../components/visuals/ProcessDiagram';
import { IMAGES, imageIfAvailable } from '../../lib/images';
import styles from './ProductPage.module.css';

const hasRender = {
  vsc: !!imageIfAvailable(IMAGES.vscChip),
  vcp: false,
  evsc: !!imageIfAvailable(IMAGES.evscDevice),
};

export function ProductPage({ product }: { product: Product }) {
  const index = PRODUCTS.indexOf(product);
  const next = PRODUCTS[index + 1];
  const layer = LAYERS[product.layer]!;
  const others = PRODUCTS.filter((p) => p.id !== product.id).map((p) => p.id);

  return (
    <>
      <PageHeader
        index={product.code}
        eyebrow={product.category}
        crumbs={[{ name: 'Products', href: '/products/' }]}
        current={product.code}
        title={
          <>
            {product.name}
            <span className="accent-stop">.</span>
          </>
        }
        intro={<p>{product.summary}</p>}
      >
        <div className={styles.actions}>
          <ButtonLink href="/contact/#product" arrow>
            Request product information
          </ButtonLink>
          <ButtonLink href="#how-it-works" variant="secondary">
            How it works
          </ButtonLink>
        </div>
      </PageHeader>

      <div className="container">
        <figure className={styles.figure} data-reveal="fade">
          <div className={styles.stage}>
            <div className={`mono ${styles.stageMeta}`} aria-hidden="true">
              <span>
                {product.code} / 0{index + 1}
              </span>
              <span>{product.category}</span>
            </div>
            <ProductVisual product={product} className={styles.visual} />
          </div>
          <figcaption className="mono">
            <span>Fig. {product.code}</span>
            {hasRender[product.id] ? 'Product render' : 'Conceptual technical illustration'}
          </figcaption>
        </figure>
      </div>

      <Block id="overview" label="Overview" title={product.tagline}>
        <div className={styles.overview}>
          {product.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Block>

      <Block id="capabilities" label="Capabilities" title="Key capabilities" tone="raised">
        <ol role="list" className={styles.capabilities}>
          {product.capabilities.map((c, i) => (
            <li key={c.title} data-reveal style={{ '--reveal-delay': `${(i % 2) * 90}ms` } as React.CSSProperties}>
              <span className="mono">0{i + 1}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="how-it-works" label="How it works" title={product.process.title}>
        <div className={styles.process}>
          <div className={styles.processDiagram} data-reveal="fade">
            <ProcessDiagram process={product.process} />
          </div>
          <div>
            <p className={styles.processIntro}>{product.process.intro}</p>
            <ol role="list" className={styles.steps}>
              {product.process.steps.map((s, i) => (
                <li key={s.label}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{s.label}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Block>

      <Block id="architecture" label="Architecture" title={`Layer ${product.layer + 1}: ${layer.name}`} tone="raised">
        <div className={styles.architecture}>
          <div className={styles.stack} data-reveal="fade">
            <LayerStack active={product.layer} />
          </div>
          <div>
            <p className={styles.layerShort}>{layer.short}</p>
            <p className={styles.layerBody}>
              {product.code} operates within the VANTHRAX five-layer architecture at <strong>{layer.name}</strong>.{' '}
              {layer.body}
            </p>
            <ul role="list" className={styles.bullets}>
              {product.architecture.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <a href="/technology/" className={styles.inline}>
              Explore the full architecture <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Block>

      <Block id="deployment" label="Deployment" title="Deployment considerations">
        <div className={styles.deployment}>
          <ul role="list" className={styles.bullets}>
            {product.deployment.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <div className={styles.briefing}>
            <p>
              VANTHRAX does not publish performance figures, certifications or compatibility lists on this website.
              Detailed technical information is provided directly, under briefing.
            </p>
            <ButtonLink href="/contact/#product" arrow>
              Request a briefing
            </ButtonLink>
          </div>
        </div>
      </Block>

      <section className={styles.related} aria-labelledby="related-title">
        <div className="container">
          <h2 id="related-title" className={`mono ${styles.relatedTitle}`}>
            Related products
          </h2>
          <ProductGrid ids={others} />
        </div>
      </section>

      {next ? (
        <NextPage href={`/products/${next.id}/`} eyebrow="Next product" title={`${next.code} — ${next.name}`} />
      ) : (
        <NextPage href="/solutions/" eyebrow="Continue" title="Solutions" />
      )}
    </>
  );
}
