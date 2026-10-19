import { ArrowUpRight, Lock } from 'lucide-react';
import { CONTACT_CHANNELS, isContactConfigured } from '../../config/site';
import styles from './ContactChannels.module.css';

interface ContactChannelsProps {
  /** Give each channel an id so other pages can deep-link to it. */
  anchors?: boolean;
  headingLevel?: 'h2' | 'h3';
}

/** The four inquiry channels, with explicit state for unconfigured ones. */
export function ContactChannels({ anchors = false, headingLevel = 'h3' }: ContactChannelsProps) {
  const Heading = headingLevel;
  return (
    <>
      <ul role="list" className={styles.channels}>
        {CONTACT_CHANNELS.map((channel, i) => {
          const live = channel.email.length > 0;
          return (
            <li
                key={channel.id}
                id={anchors ? channel.id : undefined}
                className={styles.channel} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}>
              <span className={`mono ${styles.index}`}>0{i + 1}</span>
              <div className={styles.text}>
                <Heading className={styles.title}>{channel.title}</Heading>
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
    </>
  );
}
