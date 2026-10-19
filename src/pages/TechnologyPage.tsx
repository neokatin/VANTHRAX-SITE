import { LAYERS } from '../content/layers';
import { NextPage } from '../components/ui/NextPage';
import { PageHeader } from '../components/ui/PageHeader';
import { Block } from '../components/ui/Block';
import { LayerStack } from '../components/visuals/LayerStack';
import { useActiveId } from '../lib/useActiveId';
import { ThreatIntel } from '../sections/ThreatIntel';
import styles from './TechnologyPage.module.css';

const layerIds = LAYERS.map((l) => `layer-${l.id}`);

const DEFENSE = [
  {
    title: 'No implicit trust',
    body: 'Nothing is trusted because of where it sits. Devices, software and connections are verified before they are relied upon.',
  },
  {
    title: 'Depth over perimeter',
    body: 'Layers are independent. Defeating one does not defeat the next, and each assumes the one beneath it may be tested.',
  },
  {
    title: 'Fail secure',
    body: 'When integrity cannot be established, systems move to a safe, known state rather than carrying on regardless.',
  },
  {
    title: 'Continuous verification',
    body: 'Trust is not granted once. It is re-established continuously as conditions change.',
  },
];

export function TechnologyPage() {
  const activeId = useActiveId(layerIds, layerIds[0]);
  const active = Math.max(0, layerIds.indexOf(activeId ?? ''));

  const goTo = (i: number) => {
    document.getElementById(layerIds[i]!)?.scrollIntoView({ block: 'center' });
  };

  return (
    <>
      <PageHeader
        index="04"
        eyebrow="Technology"
        current="Technology"
        title={
          <>
            Security at the architectural level.
          </>
        }
        intro={
          <p>
            Security should not be an afterthought. It should be embedded into the architecture of every system.
            VANTHRAX builds that architecture in five independent layers, from silicon to the infrastructure
            itself.
          </p>
        }
      />

      <section className={styles.layers} aria-labelledby="layers-title">
        <div className="container">
          <h2 id="layers-title" className={`mono ${styles.layersTitle}`}>
            The five-layer architecture
          </h2>
          <div className={styles.scrolly}>
            <div className={styles.sticky}>
              <LayerStack active={active} onSelect={goTo} />
              <p className={`mono ${styles.caption}`} aria-hidden="true">
                <span>L{active + 1}</span> {LAYERS[active]!.name}
              </p>
            </div>
            <ol role="list" className={styles.steps}>
              {LAYERS.map((layer, i) => (
                <li
                  key={layer.id}
                  id={layerIds[i]}
                  className={styles.step}
                  data-active={i === active}
                  aria-labelledby={`${layerIds[i]}-h`}
                >
                  <p className={`mono ${styles.stepIndex}`}>Layer {String(i + 1).padStart(2, '0')}</p>
                  <h3 id={`${layerIds[i]}-h`} className={`display ${styles.stepName}`}>
                    {layer.name}
                  </h3>
                  <p className={styles.stepShort}>{layer.short}</p>
                  <p className={styles.stepBody}>{layer.body}</p>
                  <ul role="list" className={styles.points}>
                    {layer.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <p className={`mono ${styles.stepProducts}`}>{layer.products}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className={styles.intel}>
        <ThreatIntel index="L4" />
      </div>

      <Block id="principles" label="Defense principles" title="How the layers hold" tone="raised">
        <ol role="list" className={styles.defense}>
          {DEFENSE.map((d, i) => (
            <li key={d.title} data-reveal style={{ '--reveal-delay': `${(i % 2) * 90}ms` } as React.CSSProperties}>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </li>
          ))}
        </ol>
      </Block>

      <NextPage href="/company/" title="Company" />
    </>
  );
}
