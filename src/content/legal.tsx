import type { ReactNode } from 'react';

export interface LegalSection {
  id: string;
  heading: string;
  body: ReactNode;
}

export interface LegalDocument {
  slug: 'privacy' | 'terms' | 'accessibility';
  title: string;
  description: string;
  updated: string;
  summary: ReactNode;
  sections: LegalSection[];
}

const UPDATED = '19 October 2026';

const ContactLine = () => (
  <p>
    Questions can be sent through the channels listed on the <a href="/contact/">Contact</a> page once they
    are open. Until then, no contact address is published.
  </p>
);

export const LEGAL_DOCUMENTS: Record<LegalDocument['slug'], LegalDocument> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description: 'How vanthrax.com handles information about visitors.',
    updated: UPDATED,
    summary: (
      <p>
        In short: this website does not ask for, collect or store personal information. It has no forms, no
        accounts, no cookies, no analytics and no advertising trackers.
      </p>
    ),
    sections: [
      {
        id: 'scope',
        heading: 'Scope',
        body: (
          <p>
            This policy applies to the website at vanthrax.com operated by VANTHRAX Systems (“VANTHRAX”, “we”,
            “us”). It describes what information is, and is not, processed when you visit.
          </p>
        ),
      },
      {
        id: 'collection',
        heading: 'Information we collect',
        body: (
          <>
            <p>We do not collect personal information through this website. Specifically, the website:</p>
            <ul>
              <li>contains no contact forms, sign-up forms or user accounts;</li>
              <li>sets no cookies and does not use browser storage to identify you;</li>
              <li>runs no analytics, advertising or social-media tracking scripts;</li>
              <li>
                serves its fonts, images and code from vanthrax.com itself, so browsing the site does not send
                requests to third-party content providers.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: 'hosting',
        heading: 'Hosting and server logs',
        body: (
          <p>
            This website is hosted on GitHub Pages, a service of GitHub, Inc. Like any web host, GitHub may
            process technical information such as IP addresses and request details in order to deliver and
            secure the service. That processing is governed by the{' '}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener noreferrer">
              GitHub General Privacy Statement
            </a>
            . VANTHRAX does not receive access logs identifying individual visitors.
          </p>
        ),
      },
      {
        id: 'simulations',
        heading: 'Simulated visualizations',
        body: (
          <p>
            Interactive demonstrations on this website, including the threat-intelligence console, are generated
            entirely within your browser. They do not transmit any data about you or your device.
          </p>
        ),
      },
      {
        id: 'correspondence',
        heading: 'Correspondence',
        body: (
          <p>
            When contact channels are published and you choose to write to us, we will receive the information
            you include in your message. We use it only to respond to you and do not sell it.
          </p>
        ),
      },
      {
        id: 'changes',
        heading: 'Changes to this policy',
        body: (
          <p>
            If the way this website handles information changes — for example, if a contact form is introduced —
            this policy will be updated before that change takes effect, and the date below will be revised.
          </p>
        ),
      },
      { id: 'contact', heading: 'Contact', body: <ContactLine /> },
    ],
  },

  terms: {
    slug: 'terms',
    title: 'Terms of Use',
    description: 'The terms that apply to your use of vanthrax.com.',
    updated: UPDATED,
    summary: (
      <p>
        This website provides general information about VANTHRAX Systems and its technology. By using it, you
        agree to the terms below.
      </p>
    ),
    sections: [
      {
        id: 'acceptance',
        heading: 'Acceptance',
        body: (
          <p>
            By accessing vanthrax.com you agree to these Terms of Use. If you do not agree, please do not use the
            website.
          </p>
        ),
      },
      {
        id: 'nature',
        heading: 'Nature of the content',
        body: (
          <>
            <p>
              Content on this website is provided for general information. Descriptions of products, capabilities
              and architecture are expressed in general terms and do not constitute technical specifications,
              offers, commitments or warranties of any kind.
            </p>
            <p>No products or services can be purchased through this website.</p>
          </>
        ),
      },
      {
        id: 'simulated',
        heading: 'Simulated and illustrative material',
        body: (
          <p>
            Visualizations labelled as illustrative, demonstration or simulated are generated for presentation
            only. They do not depict real security events, real telemetry, real organizations or real
            locations, and must not be relied upon for any purpose.
          </p>
        ),
      },
      {
        id: 'ip',
        heading: 'Intellectual property',
        body: (
          <p>
            The VANTHRAX name, emblem and logo, and the written and visual content of this website, belong to
            VANTHRAX Systems. You may view and share links to the website, but you may not reproduce the brand
            or present content in a way that suggests endorsement without permission.
          </p>
        ),
      },
      {
        id: 'use',
        heading: 'Acceptable use',
        body: (
          <p>
            You agree not to interfere with the operation of the website, attempt to gain unauthorized access to
            the systems that host it, or use it in any way that is unlawful or harmful to others.
          </p>
        ),
      },
      {
        id: 'links',
        heading: 'External links',
        body: (
          <p>
            Where this website links to third-party sites, those links are provided for convenience. VANTHRAX is
            not responsible for the content or practices of external sites.
          </p>
        ),
      },
      {
        id: 'warranty',
        heading: 'Disclaimer and limitation of liability',
        body: (
          <p>
            The website is provided “as is” and “as available”, without warranties of any kind. To the fullest
            extent permitted by applicable law, VANTHRAX is not liable for any loss arising from your use of, or
            inability to use, the website or its content.
          </p>
        ),
      },
      {
        id: 'changes',
        heading: 'Changes to these terms',
        body: <p>These terms may be updated from time to time. The date below shows when they last changed.</p>,
      },
      { id: 'contact', heading: 'Contact', body: <ContactLine /> },
    ],
  },

  accessibility: {
    slug: 'accessibility',
    title: 'Accessibility Statement',
    description: 'Our commitment to an accessible vanthrax.com.',
    updated: UPDATED,
    summary: (
      <p>
        VANTHRAX aims for this website to be usable by everyone, and designs it to meet the Web Content
        Accessibility Guidelines (WCAG) 2.2 at Level AA.
      </p>
    ),
    sections: [
      {
        id: 'measures',
        heading: 'Measures taken',
        body: (
          <ul>
            <li>Semantic HTML with a logical heading structure and labelled landmarks.</li>
            <li>Full keyboard operation, a skip link and clearly visible focus indicators.</li>
            <li>Text and interface colors chosen to meet WCAG AA contrast ratios.</li>
            <li>Your operating system’s reduced-motion preference is respected throughout.</li>
            <li>Animated visualizations can be paused, and stop automatically when out of view.</li>
            <li>Severity and status are always conveyed in text, never by color alone.</li>
            <li>Layouts adapt to small screens and to text zoom of up to 400%.</li>
          </ul>
        ),
      },
      {
        id: 'visualizations',
        heading: 'Visualizations',
        body: (
          <p>
            Decorative diagrams and animations are hidden from assistive technology; the information they
            illustrate is always available in the surrounding text. The simulated event stream in the
            threat-intelligence demonstration is presented as a readable list.
          </p>
        ),
      },
      {
        id: 'limitations',
        heading: 'Known limitations',
        body: (
          <p>
            Accessibility is reviewed as the website evolves. If you encounter a barrier, we want to know about it
            so that it can be fixed.
          </p>
        ),
      },
      { id: 'feedback', heading: 'Feedback', body: <ContactLine /> },
    ],
  },
};
