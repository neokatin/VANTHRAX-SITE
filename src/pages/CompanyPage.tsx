import { ArrowRight } from 'lucide-react';
import { COMMITMENTS, PRINCIPLES } from '../content/company';
import { Leadership } from '../components/company/Leadership';
import { Block } from '../components/ui/Block';
import { NextPage } from '../components/ui/NextPage';
import { PageHeader } from '../components/ui/PageHeader';
import styles from './CompanyPage.module.css';

export function CompanyPage() {
  return (
    <>
      <PageHeader
        index="05"
        eyebrow="Company"
        current="Company"
        title={
          <>
            Built to defend what matters<span className="accent-stop">.</span>
          </>
        }
        intro={
          <p>
            VANTHRAX Systems is a cybersecurity company with a singular ambition: to make the systems that power
            civilization fundamentally harder to compromise.
          </p>
        }
      />

      <Block id="mission" label="Mission" title="Protection designed in from the beginning — not added after failure.">
        <div className={styles.mission}>
          <p>
            Most security is applied to systems after they are built, by people who did not design them. VANTHRAX
            exists to change that order: to establish trust in hardware, extend it to every device, and carry it
            through the networks and infrastructure above.
          </p>
          <p>
            We work across the full depth of the stack because attackers do too — and because the organizations
            that operate critical systems deserve a partner that understands every layer they depend on.
          </p>
        </div>
      </Block>

      <Block id="principles" label="Principles" title="How we work" tone="raised">
        <ol role="list" className={styles.principles}>
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} data-reveal style={{ '--reveal-delay': `${(i % 2) * 90}ms` } as React.CSSProperties}>
              <span className="mono">P—0{i + 1}</span>
              <h3>{p.title}</h3>
              <p className={styles.pBody}>{p.body}</p>
              <p className={styles.pDetail}>{p.detail}</p>
            </li>
          ))}
        </ol>
      </Block>

      <section className={styles.leadership} aria-labelledby="leadership-title">
        <div className="container">
          <Leadership headingLevel="h2" />
        </div>
      </section>

      <Block id="commitments" label="Commitments" title="What we will not do" tone="raised">
        <ol role="list" className={styles.commitments}>
          {COMMITMENTS.map((c, i) => (
            <li key={c} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}>
              <span className="mono">0{i + 1}</span>
              <p>{c}</p>
            </li>
          ))}
        </ol>
        <a href="/government-enterprise/" className={styles.inline}>
          How we work with government and enterprise
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </Block>

      <NextPage href="/contact/" title="Contact" />
    </>
  );
}
