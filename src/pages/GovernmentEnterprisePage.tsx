import { Building2, Briefcase, FileCheck2, MessageSquareQuote } from 'lucide-react';
import { CONTRACTS, REVIEWS } from '../content/references';
import { Block } from '../components/ui/Block';
import { NextPage } from '../components/ui/NextPage';
import { PageHeader } from '../components/ui/PageHeader';
import styles from './GovernmentEnterprisePage.module.css';

const AUDIENCES = [
  {
    icon: Building2,
    title: 'Government',
    intro: 'Public institutions operate systems that citizens cannot do without, often over decades.',
    points: [
      'Long-lived estates where legacy equipment must stay in service — the reason EVSC exists',
      'Clear accountability for where protection decisions are made and by whom',
      'Defense across every layer, from device hardware to national-scale infrastructure',
      'Discretion as a default, not an option',
    ],
  },
  {
    icon: Briefcase,
    title: 'Enterprise',
    intro: 'Organizations whose operations, customers or obligations depend on systems that must not fail.',
    points: [
      'Consistent protection across complex, mixed estates of computers and mobile devices',
      'Integration with existing management and security tooling rather than replacement',
      'Security that leadership can understand, govern and be accountable for',
      'Architecture that scales from a single critical site to a global footprint',
    ],
  },
];

const ENGAGEMENT = [
  { title: 'Confidential briefing', body: 'An initial, discreet conversation about your environment, obligations and concerns.' },
  { title: 'Assessment', body: 'A structured review of the systems in scope and where trust is currently assumed rather than established.' },
  { title: 'Architecture', body: 'A protection design mapped to the five VANTHRAX layers, sequenced around operational realities.' },
  { title: 'Deployment', body: 'Phased introduction of VANTHRAX technology, planned to avoid disruption to critical operations.' },
  { title: 'Continuous defense', body: 'Ongoing intelligence, review and refinement as systems and threats change.' },
];

export function GovernmentEnterprisePage() {
  const nothingPublished = CONTRACTS.length === 0 && REVIEWS.length === 0;

  return (
    <>
      <PageHeader
        index="G/E"
        eyebrow="Government & Enterprise"
        crumbs={[{ name: 'Solutions', href: '/solutions/' }]}
        current="Government & Enterprise"
        title={
          <>
            For institutions that cannot fail<span className="accent-stop">.</span>
          </>
        }
        intro={
          <p>
            Governments and enterprises carry responsibility for systems that others depend on. VANTHRAX works with
            them directly — from a first confidential briefing to continuous defense.
          </p>
        }
      />

      <Block id="who" label="Who we work with" title="Two kinds of responsibility, one architecture">
        <div className={styles.audiences}>
          {AUDIENCES.map((a) => {
            const Icon = a.icon;
            return (
              <article key={a.title} className={styles.audience} aria-labelledby={`aud-${a.title}`} data-reveal>
                <Icon size={26} strokeWidth={1.25} aria-hidden="true" />
                <h3 id={`aud-${a.title}`} className="display">
                  {a.title}
                </h3>
                <p className={styles.audienceIntro}>{a.intro}</p>
                <ul role="list">
                  {a.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Block>

      <Block id="engagement" label="Engagement model" title="How an engagement works" tone="raised">
        <ol role="list" className={styles.timeline}>
          {ENGAGEMENT.map((step, i) => (
            <li key={step.title} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}>
              <span className={styles.node} aria-hidden="true" />
              <span className="mono">E—0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="references" label="Contracts & references" title="Published only with permission">
        <div className={styles.references}>
          <div className={styles.policy}>
            <p>
              VANTHRAX publishes a contract or client reference only when the client has authorized it in writing.
              Every review is attributed to a named person and organization and published verbatim. We do not
              publish anonymous testimonials, client logos without permission, or figures we cannot substantiate.
            </p>
          </div>

          {nothingPublished ? (
            <div className={styles.empty} role="status">
              <FileCheck2 size={28} strokeWidth={1.25} aria-hidden="true" />
              <div>
                <p className={styles.emptyTitle}>No contracts or client references are published at this time.</p>
                <p>
                  Authorized references will appear here as they are approved. Organizations evaluating VANTHRAX can
                  discuss its work directly, under confidentiality, through an enterprise inquiry.
                </p>
              </div>
            </div>
          ) : (
            <>
              {CONTRACTS.length > 0 && (
                <div className={styles.tableWrap} role="region" aria-labelledby="contracts-caption" tabIndex={0}>
                  <table className={styles.table}>
                    <caption id="contracts-caption" className="mono">
                      Published contracts
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Client</th>
                        <th scope="col">Type</th>
                        <th scope="col">Sector</th>
                        <th scope="col">Scope</th>
                        <th scope="col">Year</th>
                        <th scope="col">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CONTRACTS.map((c) => (
                        <tr key={c.client + c.year}>
                          <th scope="row">{c.client}</th>
                          <td>{c.type}</td>
                          <td>{c.sector}</td>
                          <td>{c.scope}</td>
                          <td>{c.year}</td>
                          <td>
                            <Source value={c.source} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {REVIEWS.length > 0 && (
                <ul role="list" className={styles.reviews} aria-label="Client reviews">
                  {REVIEWS.map((r) => (
                    <li key={r.author + r.date}>
                      <figure>
                        <MessageSquareQuote size={22} strokeWidth={1.25} aria-hidden="true" />
                        <blockquote>
                          <p>{r.quote}</p>
                        </blockquote>
                        <figcaption>
                          <span className={styles.author}>{r.author}</span>
                          <span>
                            {r.role}, {r.organization}
                          </span>
                          <span className="mono">
                            {r.type} · <time dateTime={r.date}>{r.date}</time> · <Source value={r.source} />
                          </span>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </Block>

      <NextPage href="/contact/#enterprise" eyebrow="Begin a confidential briefing" title="Enterprise inquiries" />
    </>
  );
}

function Source({ value }: { value: string }) {
  return /^https:\/\//.test(value) ? (
    <a href={value} rel="noopener noreferrer">
      Verify
    </a>
  ) : (
    <span>{value}</span>
  );
}
