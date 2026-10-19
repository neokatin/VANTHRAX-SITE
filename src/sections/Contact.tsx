import { ButtonLink } from '../components/ui/Button';
import styles from './Contact.module.css';

/** Closing call to action on the home page; channels live on /contact/. */
export function Contact() {
  return (
    <section id="contact" className={styles.cta} aria-labelledby="contact-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <p className={`mono ${styles.meta}`} data-reveal="fade">
          <span className={styles.index}>06</span>
          <span className={styles.rule} aria-hidden="true" />
          <span>Contact</span>
        </p>
        <h2 id="contact-title" className={`display ${styles.title}`} data-reveal>
          Secure your future.
        </h2>
        <div className={styles.side} data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          <p className="lead">
            Whether you are responsible for a single critical system or an entire national infrastructure,
            VANTHRAX engages directly and discreetly.
          </p>
          <div className={styles.actions}>
            <ButtonLink href="/contact/" size="lg" arrow>
              Contact VANTHRAX
            </ButtonLink>
            <ButtonLink href="/contact/#enterprise" variant="secondary" size="lg">
              Enterprise inquiries
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
