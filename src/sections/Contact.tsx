import { ContactChannels } from '../components/contact/ContactChannels';
import { SectionHeader } from '../components/ui/SectionHeader';

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
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
          link={{ href: '/contact/', label: 'All contact options' }}
          intro={
            <p>
              Whether you are responsible for a single critical system or an entire national infrastructure,
              VANTHRAX engages directly and discreetly.
            </p>
          }
        />

        <ContactChannels />
      </div>
    </section>
  );
}
