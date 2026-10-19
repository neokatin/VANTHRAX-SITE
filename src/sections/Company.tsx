import { Leadership } from '../components/company/Leadership';
import { PRINCIPLES } from '../content/company';
import { SectionHeader } from '../components/ui/SectionHeader';
import styles from './Company.module.css';


export function Company() {
  return (
    <section id="company" className={`section ${styles.section}`} aria-labelledby="company-title">
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow="Company"
          titleId="company-title"
          title={
            <>
              Built to defend what matters<span className="accent-stop">.</span>
            </>
          }
          link={{ href: '/company/', label: 'About VANTHRAX' }}
          intro={
            <>
              <p>
                VANTHRAX Systems is a cybersecurity company with a singular ambition: to make the systems that
                power civilization fundamentally harder to compromise.
              </p>
              <p>
                We work across the full depth of the stack — from hardware to endpoint to infrastructure — because
                attackers do too.
              </p>
            </>
          }
        />

        <ol role="list" className={styles.principles}>
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} data-reveal style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}>
              <span className={`mono ${styles.pIndex}`}>P—0{i + 1}</span>
              <h3 className={styles.pTitle}>{p.title}</h3>
              <p className={styles.pBody}>{p.body}</p>
            </li>
          ))}
        </ol>

        <Leadership />
      </div>
    </section>
  );
}
