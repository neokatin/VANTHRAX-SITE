import { ArrowUpRight, Lock } from 'lucide-react';
import { CONTACT_CHANNELS, isContactConfigured } from '../config/site';
import { SectionHeader } from '../components/ui/SectionHeader';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader
          index="06"
          eyebrow="Contact"
          titleId="contact-title"
          title={
            <>
              Secure your future<span className="accent-stop">.</span>
            </>
          }
          intro={
            <p>
              Whether you are responsible for a single critical system or an entire national infrastructure,
              VANTHRAX engages directly and discreetly.
            </p>
          }
        />

        <ul role="list" className={styles.channels}>
          {CONTACT_CHANNELS.map((channel, i) => {
            const live = channel.email.length > 0;
            return (
              <li key={channel.id} className={styles.channel} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}>
                <span className={`mono ${styles.index}`}>0{i + 1}</span>
                <div className={styles.text}>
                  <h3 className={styles.title}>{channel.title}</h3>
                  <p className={styles.summary}>{channel.summary}</p>
                </div>
                {live ? (
                  <a className={styles.action} href={`mailto:${channel.email}`}>
                    <span>{channel.email}</span>
                    <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                ) : (
                  <p className={`mono ${styles.pending}`}>
                    <span className={styles.pendingDot} aria-hidden="true" />
                    Channel opening soon
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        {!isContactConfigured && (
          <aside className={styles.notice} aria-label="Contact availability" data-reveal>
            <Lock size={18} strokeWidth={1.5} aria-hidden="true" />
            <p>
              <strong>Secure intake channels are being provisioned.</strong> Direct contact addresses will be
              published here once they are monitored. This website has no forms and does not collect, store or
              transmit any information you provide.
            </p>
          </aside>
        )}
      </div>
    </section>
  );
}
