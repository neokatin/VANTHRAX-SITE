import type { ReactNode } from 'react';
import styles from './Block.module.css';

interface BlockProps {
  id?: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
  tone?: 'base' | 'raised';
}

/**
 * Content block for interior pages: a mono label rail on the left and the
 * block's heading and body on the right. Lighter than a homepage section.
 */
export function Block({ id, label, title, children, tone = 'base' }: BlockProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} className={styles.block} data-tone={tone} aria-labelledby={headingId}>
      <div className={`container grid-12 ${styles.inner}`}>
        <p className={`mono ${styles.label}`} data-reveal="fade">
          {label}
        </p>
        <div className={styles.main}>
          <h2 id={headingId} className={`display ${styles.title}`} data-reveal>
            {title}
          </h2>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </section>
  );
}
