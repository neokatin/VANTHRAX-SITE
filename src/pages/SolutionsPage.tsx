import { ArrowRight } from 'lucide-react';
import { LAYERS } from '../content/layers';
import { productById } from '../content/products';
import { SECTORS } from '../content/sectors';
import { Block } from '../components/ui/Block';
import { NextPage } from '../components/ui/NextPage';
import { PageHeader } from '../components/ui/PageHeader';
import { DataHallDrawing } from '../components/visuals/DataHallDrawing';
import { IMAGES, imageIfAvailable } from '../lib/images';
import { useActiveId } from '../lib/useActiveId';
import styles from './SolutionsPage.module.css';

const facility = imageIfAvailable(IMAGES.dataCenter);

const PRINCIPLES = [
  {
    title: 'Continuity',
    body: 'Critical functions keep operating under pressure. Protection is designed so that defending a system never becomes the reason it stops.',
  },
  {
    title: 'Containment',
    body: 'A compromise in one place must not become a compromise everywhere. Every layer limits how far an intrusion can travel.',
  },
  {
    title: 'Recovery',
    body: 'When something does go wrong, systems return to a known, verified state — deliberately, and never silently.',
  },
];

const sectorIds = SECTORS.map((s) => s.id);

export function SolutionsPage() {
  const active = useActiveId(sectorIds);

  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Solutions — Critical infrastructure"
        current="Solutions"
        title={
          <>
            When systems cannot fail<span className="accent-stop">.</span>
          </>
        }
        intro={
          <p>
            Some systems are allowed to fail. Others are not. VANTHRAX applies one architecture to the
            infrastructure on which hospitals, economies, governments and daily life depend — adapted to the
            realities of each sector.
          </p>
        }
      />

      <div className="container">
        <figure className={styles.figure} data-reveal="fade">
          <div className={styles.frame}>
            {facility ? (
              <img
                src={facility.src}
                width={facility.width}
                height={facility.height}
                alt={facility.alt}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <DataHallDrawing />
            )}
          </div>
          <figcaption className="mono">
            <span>Fig. 02</span> Secure operations hall —{' '}
            {facility ? 'facility photograph' : 'architectural illustration'}
          </figcaption>
        </figure>
      </div>

      <section className={styles.sectors} aria-labelledby="sectors-title">
        <div className={`container ${styles.sectorsLayout}`}>
          <aside className={styles.index}>
            <h2 id="sectors-title" className="mono">
              Sectors
            </h2>
            <nav aria-label="Sectors">
              <ol role="list">
                {SECTORS.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}>
                      <span className="mono">S—0{i + 1}</span>
                      {s.name}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className={styles.list}>
            {SECTORS.map((sector, i) => {
              const Icon = sector.icon;
              return (
                <article key={sector.id} id={sector.id} className={styles.sector} aria-labelledby={`${sector.id}-h`}>
                  <div className={styles.sectorTop}>
                    <span className="mono">S—0{i + 1}</span>
                    <Icon size={26} strokeWidth={1.25} aria-hidden="true" />
                  </div>
                  <h3 id={`${sector.id}-h`} className={`display ${styles.sectorName}`}>
                    {sector.name}
                  </h3>
                  <dl className={styles.facts}>
                    <div>
                      <dt className="mono">What is at stake</dt>
                      <dd>{sector.stakes}</dd>
                    </div>
                    <div>
                      <dt className="mono">Our approach</dt>
                      <dd>{sector.approach}</dd>
                    </div>
                    <div>
                      <dt className="mono">Layers</dt>
                      <dd>
                        <ul role="list" className={styles.chips}>
                          {sector.layers.map((l) => (
                            <li key={l}>
                              <span className="mono">L{l + 1}</span> {LAYERS[l]!.name}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="mono">Products</dt>
                      <dd>
                        <ul role="list" className={styles.chips}>
                          {sector.products.map((id) => {
                            const p = productById(id);
                            return (
                              <li key={id}>
                                <a href={`/products/${id}/`}>
                                  {p.code}
                                  <span className="visually-hidden"> — {p.name}</span>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Block id="principles" label="Resilience principles" title={<>Resilience is not optional<span className="accent-stop">.</span></>} tone="raised">
        <ol role="list" className={styles.principles}>
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} data-reveal style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}>
              <span className="mono">R—0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </Block>

      <section className={styles.callout} aria-labelledby="gov-callout">
        <div className={`container ${styles.calloutInner}`}>
          <div>
            <p className="mono">Government &amp; enterprise</p>
            <h2 id="gov-callout" className="display">
              For institutions that cannot fail.
            </h2>
          </div>
          <a href="/government-enterprise/" className={styles.calloutLink}>
            How VANTHRAX works with government and enterprise
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </section>

      <NextPage href="/technology/" title="Technology" />
    </>
  );
}
