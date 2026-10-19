import { ShieldAlert } from 'lucide-react';
import { CONTACT_CHANNELS, SECURITY_CONTACT } from '../config/site';
import { INQUIRY_GUIDANCE } from '../content/contact';
import { ContactChannels } from '../components/contact/ContactChannels';
import { Block } from '../components/ui/Block';
import { PageHeader } from '../components/ui/PageHeader';
import styles from './ContactPage.module.css';

export function ContactPage() {
  return (
    <>
      <PageHeader
        index="06"
        eyebrow="Contact"
        current="Contact"
        title={
          <>
            Secure your future.
          </>
        }
        intro={
          <p>
            Whether you are responsible for a single critical system or an entire national infrastructure, VANTHRAX
            engages directly and discreetly. Choose the channel that fits your inquiry.
          </p>
        }
      />

      <section className={styles.channels} aria-label="Contact channels">
        <div className="container">
          <ContactChannels anchors headingLevel="h2" />
        </div>
      </section>

      <Block id="preparing" label="Preparing an inquiry" title="What to include" tone="raised">
        <p className={styles.lead}>
          A short, specific first message lets the right people respond quickly. Please do not include passwords,
          credentials or sensitive technical detail in an initial message.
        </p>
        <div className={styles.guidance}>
          {CONTACT_CHANNELS.map((c) => (
            <div key={c.id} className={styles.guide}>
              <h3>{c.title}</h3>
              <ul role="list">
                {INQUIRY_GUIDANCE[c.id].map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <Block id="security" label="Responsible disclosure" title="Reporting a security vulnerability">
        <div className={styles.disclosure}>
          <div>
            <p>
              If you believe you have found a security vulnerability in a VANTHRAX product or in this website,
              VANTHRAX wants to hear about it, and will work with you to understand and resolve it.
            </p>
            <p>
              Please give reasonable time for a fix before any public disclosure, and do not access, modify or
              retain data that is not yours while investigating.
            </p>
          </div>
          <div className={styles.status} data-open={SECURITY_CONTACT ? 'true' : 'false'}>
            <ShieldAlert size={22} strokeWidth={1.5} aria-hidden="true" />
            {SECURITY_CONTACT ? (
              <p>
                Send reports to{' '}
                <a href={`mailto:${SECURITY_CONTACT}`} className={styles.mail}>
                  {SECURITY_CONTACT}
                </a>
                .
              </p>
            ) : (
              <p>
                <strong>The disclosure channel is not yet open.</strong> A dedicated, monitored address will be
                published here. Until then, please do not send vulnerability details through any other channel.
              </p>
            )}
          </div>
        </div>
      </Block>

      <section className={styles.privacy} aria-label="Privacy">
        <div className="container">
          <p>
            This website has no forms and does not collect, store or transmit information about you. See the{' '}
            <a href="/legal/privacy/">Privacy Policy</a>.
          </p>
        </div>
      </section>
    </>
  );
}
