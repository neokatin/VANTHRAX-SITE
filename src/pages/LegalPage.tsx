import type { LegalDocument } from '../content/legal';
import { LEGAL_NAV } from '../config/site';
import styles from './LegalPage.module.css';

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <article className={`container ${styles.page}`} aria-labelledby="legal-title">
      <header className={styles.header}>
        <p className={`mono ${styles.eyebrow}`}>
          <span>Legal</span>
          <span aria-hidden="true" className={styles.rule} />
          <span>Last updated {doc.updated}</span>
        </p>
        <h1 id="legal-title" className={`display ${styles.title}`}>
          {doc.title}
        </h1>
        <div className={`lead ${styles.summary}`}>{doc.summary}</div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.aside}>
          <nav aria-labelledby="legal-contents">
            <h2 id="legal-contents" className="mono">
              Contents
            </h2>
            <ol role="list">
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className="mono" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <nav aria-labelledby="legal-other" className={styles.other}>
            <h2 id="legal-other" className="mono">
              Legal documents
            </h2>
            <ul role="list">
              {LEGAL_NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} aria-current={l.href === `/legal/${doc.slug}/` ? 'page' : undefined}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className={styles.body}>
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className={styles.section} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`} className={styles.heading}>
                <span className="mono" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.heading}
              </h2>
              <div className={styles.prose}>{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
