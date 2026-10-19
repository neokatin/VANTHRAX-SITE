import { ArrowRight } from 'lucide-react';
import styles from './NextPage.module.css';

interface NextPageProps {
  href: string;
  eyebrow?: string;
  title: string;
}

/** Full-width closing band that leads the reader to the next page. */
export function NextPage({ href, eyebrow = 'Continue', title }: NextPageProps) {
  return (
    <aside className={styles.band} aria-label="Next page">
      <div className="container">
        <a href={href} className={styles.link}>
          <span className={`mono ${styles.eyebrow}`}>{eyebrow}</span>
          <span className={`display ${styles.title}`}>
            {title}
            <ArrowRight className={styles.arrow} size={40} strokeWidth={1.25} aria-hidden="true" />
          </span>
        </a>
      </div>
    </aside>
  );
}
