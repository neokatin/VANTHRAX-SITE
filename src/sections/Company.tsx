import { Emblem } from '../components/brand/Emblem';
import { SectionHeader } from '../components/ui/SectionHeader';
import { IMAGES, imageIfAvailable } from '../lib/images';
import styles from './Company.module.css';

const portrait = imageIfAvailable(IMAGES.ceoPortrait);

const PRINCIPLES = [
  {
    title: 'Architecture first',
    body: 'Protection is designed into systems from their foundations. It is never bolted on after the fact.',
  },
  {
    title: 'Defense in depth',
    body: 'No single control is trusted to hold alone. Every layer assumes the one beneath it may be tested.',
  },
  {
    title: 'Restraint',
    body: 'We build what is necessary and nothing more. Complexity is an attack surface.',
  },
  {
    title: 'Accountability',
    body: 'Security is a responsibility to the people who depend on the systems we protect.',
  },
];

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

        <div className={styles.leadership}>
          <h3 id="leadership-title" className={`mono ${styles.leadershipLabel}`}>
            Executive leadership
          </h3>
          <div className={styles.leader}>
            <div className={styles.portrait} data-reveal="fade">
              {portrait ? (
                <img
                  src={portrait.src}
                  width={portrait.width}
                  height={portrait.height}
                  alt={portrait.alt}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className={styles.placeholder}>
                  <Emblem size={120} className={styles.watermark} />
                  <span className={`mono ${styles.placeholderTag}`}>Official portrait forthcoming</span>
                </div>
              )}
              <span className={`mono ${styles.frameTag}`} aria-hidden="true">
                VR / CEO
              </span>
            </div>
            <div className={styles.bio} data-reveal>
              <p className={`mono ${styles.role}`}>Founder &amp; Chief Executive Officer</p>
              <p className={`display ${styles.name}`}>Vexy Razor</p>
              <div className={styles.bioText}>
                <p>
                  Vexy Razor founded VANTHRAX Systems on a single conviction: that the systems civilization
                  depends on deserve protection designed in from the beginning — not added after failure.
                </p>
                <p>
                  As Chief Executive Officer, Vexy Razor sets the direction of the company and holds it to the
                  standard its name implies: security without compromise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
