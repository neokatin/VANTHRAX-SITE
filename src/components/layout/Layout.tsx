import { useEffect, type ReactNode } from 'react';
import { Cursor } from '../effects/Cursor';
import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  isHome: boolean;
  children: ReactNode;
}

/** Observes [data-reveal] elements once and reveals them as they enter view. */
function useScrollReveal() {
  useEffect(() => {
    window.__VX_READY__ = true;
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-revealed'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
}

function ColumnGuides() {
  return (
    <div className="column-guides" aria-hidden="true">
      <div className="container">
        <div className="grid-12">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Layout({ isHome, children }: LayoutProps) {
  useScrollReveal();
  return (
    <div id="top">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <ColumnGuides />
      <Header isHome={isHome} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <Cursor />
    </div>
  );
}
