import { SECTORS } from '../content/sectors';
import { SectionHeader } from '../components/ui/SectionHeader';
import { DataHallDrawing } from '../components/visuals/DataHallDrawing';
import { IMAGES, imageIfAvailable } from '../lib/images';
import styles from './Infrastructure.module.css';

const facility = imageIfAvailable(IMAGES.dataCenter);

/** Pointer-follow spotlight for the sector grid (purely decorative). */
function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  const cell = (e.target as Element).closest<HTMLElement>('[data-spot]');
  if (!cell) return;
  const r = cell.getBoundingClientRect();
  cell.style.setProperty('--mx', `${e.clientX - r.left}px`);
  cell.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export function Infrastructure() {
  return (
    <section id="solutions" className={`section ${styles.section}`} aria-labelledby="solutions-title">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="Solutions — Critical infrastructure"
          titleId="solutions-title"
          title={
            <>
              When systems cannot fail<span className="accent-stop">.</span>
            </>
          }
          link={{ href: '/solutions/', label: 'Explore solutions by sector' }}
          intro={
            <p>
              Some systems are allowed to fail. Others are not. VANTHRAX exists to protect the second kind — the
              infrastructure on which hospitals, economies, governments and daily life depend.
            </p>
          }
        />

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
            <span>Fig. 02</span> Secure operations hall — {facility ? 'facility photograph' : 'architectural illustration'}
          </figcaption>
        </figure>

        <ul role="list" className={styles.grid} onPointerMove={trackSpotlight}>
          {SECTORS.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <li
                key={sector.id}
                className={styles.cell}
                data-spot
                data-reveal
                style={{ '--reveal-delay': `${(i % 4) * 80}ms` } as React.CSSProperties}
              >
                <div className={styles.cellTop}>
                  <span className="mono">S—0{i + 1}</span>
                  <Icon className={styles.icon} size={22} strokeWidth={1.25} aria-hidden="true" />
                </div>
                <h3 className={styles.name}>{sector.name}</h3>
                <p className={styles.desc}>{sector.description}</p>
                <p className={`mono ${styles.focus}`}>
                  <span aria-hidden="true" className={styles.focusDot} />
                  Priority: {sector.focus}
                </p>
              </li>
            );
          })}
          <li className={`${styles.cell} ${styles.statement}`} data-reveal style={{ '--reveal-delay': '240ms' } as React.CSSProperties}>
            <p className={`display ${styles.statementText}`}>
              Resilience is not optional<span className="accent-stop">.</span>
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
