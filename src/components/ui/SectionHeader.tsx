import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  titleId: string;
  intro?: ReactNode;
  /** Optional onward link, e.g. to the dedicated page for this topic. */
  link?: { href: string; label: string };
}

/**
 * Editorial section opening: an indexed rail on the left, a commanding
 * headline, and an optional introduction set into the right-hand columns.
 */
export function SectionHeader({ index, eyebrow, title, titleId, intro, link }: SectionHeaderProps) {
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
      {(intro || link) && (
        <div className={`lead ${styles.intro}`} data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          {intro}
          {link && (
            <a href={link.href} className={styles.link}>
              {link.label}
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </header>
  );
}
