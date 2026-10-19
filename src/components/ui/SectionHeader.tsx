import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  titleId: string;
  intro?: ReactNode;
}

/**
 * Editorial section opening: an indexed rail on the left, a commanding
 * headline, and an optional introduction set into the right-hand columns.
 */
export function SectionHeader({ index, eyebrow, title, titleId, intro }: SectionHeaderProps) {
  return (
    <header className={`grid-12 ${styles.header}`}>
      <p className={`mono ${styles.meta}`} data-reveal="fade">
        <span className={styles.index}>{index}</span>
        <span className={styles.rule} aria-hidden="true" />
        <span>{eyebrow}</span>
      </p>
      <h2 id={titleId} className={`display ${styles.title}`} data-reveal>
        {title}
      </h2>
      {intro && (
        <div className={`lead ${styles.intro}`} data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          {intro}
        </div>
      )}
    </header>
  );
}
