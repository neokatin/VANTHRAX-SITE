import { Emblem } from '../brand/Emblem';
import { IMAGES, imageIfAvailable } from '../../lib/images';
import styles from './Leadership.module.css';

const portrait = imageIfAvailable(IMAGES.ceoPortrait);

/** Executive leadership: Vexy Razor, with portrait or designed placeholder. */
export function Leadership({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <div className={styles.leadership}>
      <Heading id="leadership-title" className={`mono ${styles.leadershipLabel}`}>
        Executive leadership
      </Heading>
      <div className={styles.leader}>
        <div className={styles.portrait} data-reveal="fade">
          {portrait ? (
            <img
              src={portrait.src}
              width={portrait.width}
              height={portrait.height}
              alt={portrait.alt}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={styles.placeholder}>
              <Emblem size={120} className={styles.watermark} />
              <span className={`mono ${styles.placeholderTag}`}>Official portrait forthcoming</span>
            </div>
          )}
          <span className={`mono ${styles.frameTag}`} aria-hidden="true">
            VR / CEO
          </span>
        </div>
        <div className={styles.bio} data-reveal>
          <p className={`mono ${styles.role}`}>Founder &amp; Chief Executive Officer</p>
          <p className={`display ${styles.name}`}>Vexy Razor</p>
          <div className={styles.bioText}>
            <p>
              Vexy Razor founded VANTHRAX Systems on a single conviction: that the systems civilization
              depends on deserve protection designed in from the beginning — not added after failure.
            </p>
            <p>
              As Chief Executive Officer, Vexy Razor sets the direction of the company and holds it to the
              standard its name implies: security without compromise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
