import type { ReactNode } from 'react';
import styles from './PageHeader.module.css';

export interface Crumb {
  name: string;
  href: string;
}

interface PageHeaderProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Ancestors of the current page; the current page is appended automatically. */
  crumbs?: Crumb[];
  current: string;
  children?: ReactNode;
}

/** Opening block for interior pages: breadcrumb, indexed eyebrow, headline. */
export function PageHeader({ index, eyebrow, title, intro, crumbs = [], current, children }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.grid} aria-hidden="true" />
      <div className="container">
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <ol role="list" className="mono">
            <li>
              <a href="/">Home</a>
            </li>
            {crumbs.map((c) => (
              <li key={c.href}>
                <a href={c.href}>{c.name}</a>
              </li>
            ))}
            <li>
              <span aria-current="page">{current}</span>
            </li>
          </ol>
        </nav>

        <div className={`grid-12 ${styles.body}`}>
          <p className={`mono ${styles.meta}`}>
            <span className={styles.index}>{index}</span>
            <span className={styles.rule} aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>
          <h1 className={`display ${styles.title}`}>{title}</h1>
          {intro && <div className={`lead ${styles.intro}`}>{intro}</div>}
          {children && <div className={styles.extra}>{children}</div>}
        </div>
      </div>
    </header>
  );
}
