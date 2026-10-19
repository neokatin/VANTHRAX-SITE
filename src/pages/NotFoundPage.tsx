import { ButtonLink } from '../components/ui/Button';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <section className={`container ${styles.page}`} aria-labelledby="nf-title">
      <p className={`mono ${styles.code}`}>Error 404 — Resource not found</p>
      <h1 id="nf-title" className={`display ${styles.title}`}>
        This path does not exist<span className="accent-stop">.</span>
      </h1>
      <p className={`lead ${styles.text}`}>
        The page you requested could not be located. It may have moved, or the address may be incorrect.
      </p>
      <div className={styles.actions}>
        <ButtonLink href="/" arrow size="lg">
          Return to VANTHRAX
        </ButtonLink>
        <ButtonLink href="/contact/" variant="secondary" size="lg">
          Contact
        </ButtonLink>
      </div>
    </section>
  );
}
