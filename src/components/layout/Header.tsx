import { useCallback, useEffect, useRef, useState } from 'react';
import { PRIMARY_NAV } from '../../config/site';
import { Logo } from '../brand/Logo';
import { ButtonLink } from '../ui/Button';
import styles from './Header.module.css';

interface HeaderProps {
  isHome: boolean;
}

export function Header({ isHome }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Translucent bar + reading-progress hairline.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Scroll-spy: highlight the section currently occupying the reading line.
  useEffect(() => {
    if (!isHome) return;
    const sections = PRIMARY_NAV.map((n) => document.getElementById(n.section)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, [isHome]);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Mobile menu: lock the page behind it, make it inert, and support Escape.
  useEffect(() => {
    const outside = ['main', 'site-footer'].map((id) => document.getElementById(id));
    document.documentElement.classList.toggle('menu-open', open);
    outside.forEach((el) => el?.toggleAttribute('inert', open));
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const mql = window.matchMedia('(min-width: 961px)');
    const onWide = () => mql.matches && close(false);
    document.addEventListener('keydown', onKey);
    mql.addEventListener('change', onWide);
    return () => {
      document.removeEventListener('keydown', onKey);
      mql.removeEventListener('change', onWide);
      document.documentElement.classList.remove('menu-open');
      outside.forEach((el) => el?.removeAttribute('inert'));
    };
  }, [open, close]);

  return (
    <header className={styles.header} data-scrolled={scrolled || open} data-open={open}>
      <div className={`container ${styles.bar}`}>
        <Logo />

        <nav className={styles.nav} aria-label="Primary">
          <ul role="list" className={styles.links}>
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.link}
                  aria-current={active === item.section ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ButtonLink href="/#solutions" variant="primary" className={styles.cta} arrow>
            Explore Solutions
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            <span className={styles.toggleLines} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <div ref={progressRef} className={styles.progressBar} />
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={styles.menu}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <nav aria-label="Mobile primary">
          <ol role="list" className={styles.menuList}>
            {PRIMARY_NAV.map((item, i) => (
              <li key={item.href} style={{ '--i': i } as React.CSSProperties}>
                <a href={item.href} className={styles.menuLink} onClick={() => close(false)}>
                  <span className="mono" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.menuFoot}>
          <ButtonLink href="/#solutions" size="lg" arrow onClick={() => close(false)}>
            Explore Solutions
          </ButtonLink>
          <p className="mono">Security without compromise.</p>
        </div>
      </div>
    </header>
  );
}
