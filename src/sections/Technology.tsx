import { useState } from 'react';
import { Plus } from 'lucide-react';
import { LAYERS } from '../content/layers';
import { SectionHeader } from '../components/ui/SectionHeader';
import { LayerStack } from '../components/visuals/LayerStack';
import styles from './Technology.module.css';

export function Technology() {
  const [active, setActive] = useState(0);

  return (
    <section id="technology" className="section" aria-labelledby="technology-title">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="Technology"
          titleId="technology-title"
          title={
            <>
              Security at the architectural level<span className="accent-stop">.</span>
            </>
          }
        />

        <figure className={`grid-12 ${styles.doctrine}`} data-reveal>
          <blockquote className={styles.quote}>
            <p>
              Security should not be an afterthought. It should be embedded into the architecture of every
              system.
            </p>
          </blockquote>
          <figcaption className="mono">VANTHRAX design philosophy</figcaption>
        </figure>

        <div className={styles.layout}>
          <div className={styles.diagram} data-reveal="fade">
            <LayerStack active={active} onSelect={setActive} />
            <p className={`mono ${styles.caption}`}>
              <span>Fig. 04</span> Five-layer protection architecture
            </p>
          </div>

          <ol role="list" className={styles.layers}>
            {LAYERS.map((layer, i) => {
              const open = i === active;
              return (
                <li key={layer.id} className={styles.layer} data-open={open}>
                  <h3 className={styles.layerHeading}>
                    <button
                      type="button"
                      className={styles.trigger}
                      aria-expanded={open}
                      aria-controls={`layer-panel-${layer.id}`}
                      id={`layer-trigger-${layer.id}`}
                      onClick={() => setActive(i)}
                    >
                      <span className={`mono ${styles.layerIndex}`}>L{i + 1}</span>
                      <span className={styles.layerName}>{layer.name}</span>
                      <Plus className={styles.icon} size={18} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={`layer-panel-${layer.id}`}
                    role="region"
                    aria-labelledby={`layer-trigger-${layer.id}`}
                    className={styles.panel}
                    hidden={!open}
                  >
                    <p className={styles.short}>{layer.short}</p>
                    <p className={styles.body}>{layer.body}</p>
                    <p className={`mono ${styles.products}`}>{layer.products}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
