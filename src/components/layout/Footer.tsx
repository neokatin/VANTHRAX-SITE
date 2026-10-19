import { ArrowUp } from 'lucide-react';
import { LEGAL_NAV, SITE } from '../../config/site';
import { PRODUCTS } from '../../content/products';
import { Logo } from '../brand/Logo';
import styles from './Footer.module.css';

const SITE_NAV = [
  { label: 'Products', href: '/products/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Government & Enterprise', href: '/government-enterprise/' },
  { label: 'Technology', href: '/technology/' },
  { label: 'Threat Intelligence', href: '/technology/#intelligence' },
  { label: 'Company', href: '/company/' },
  { label: 'Contact', href: '/contact/' },
];

export function Footer() {
  return (
    <footer id="site-footer" className={styles.footer}>
      <div className="container">
        <div className={styles.brand}>
          <div className={styles.identity}>
            <Logo size="lg" />
            <p className={styles.descriptor}>Cybersecurity · Defense · Intelligence</p>
          </div>
          <p className={`display ${styles.tagline}`}>
            Security without compromise<span className="accent-stop">.</span>
          </p>
        </div>

        <div className={styles.columns}>
          <nav aria-labelledby="footer-site" className={styles.col}>
            <h2 id="footer-site" className="mono">
              Navigate
            </h2>
            <ul role="list">
              {SITE_NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="footer-products" className={styles.col}>
            <h2 id="footer-products" className="mono">
              Products
            </h2>
            <ul role="list">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <a href={`/products/${p.id}/`}>
                    {p.code} — {p.category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="footer-legal" className={styles.col}>
            <h2 id="footer-legal" className="mono">
              Legal
            </h2>
            <ul role="list">
              {LEGAL_NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.col}>
            <h2 className="mono">Domain</h2>
            <p>
              <a href="/">vanthrax.com</a>
            </p>
            <p className={styles.note}>
              Visualizations labelled as simulated are generated in your browser and do not represent live
              security telemetry.
            </p>
          </div>
        </div>

        <p className={styles.signature} aria-hidden="true">
          VANTHRAX
        </p>

        <div className={styles.base}>
          <p>
            © {SITE.year} {SITE.name}. All rights reserved.
          </p>
          <a href="/sitemap/" className={styles.sitemap}>
            Sitemap
          </a>
          <a href="#top" className={styles.top}>
            Back to top <ArrowUp size={14} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
