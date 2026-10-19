import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Pause, Play } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';
import { HeroField } from '../components/visuals/HeroField';
import { IMAGES, imageIfAvailable } from '../lib/images';
import { useReducedMotion } from '../lib/motion';
import styles from './Hero.module.css';

const heroImage = imageIfAvailable(IMAGES.heroBackground);

export function Hero() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Gentle parallax: the visualization trails the page as it scrolls away.
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el || reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      el.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      el.style.transform = '';
    };
  }, [reduced]);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop} aria-hidden="true">
        {heroImage && (
          <img
            className={styles.image}
            src={heroImage.src}
            width={heroImage.width}
            height={heroImage.height}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        )}
        <div className={styles.grid} />
      </div>

      <div ref={parallaxRef} className={styles.parallax}>
        <HeroField paused={paused} reduced={reduced} />
      </div>

      <div className={`container ${styles.inner}`}>
        <p className={`mono ${styles.kicker}`}>
          <span>Cybersecurity</span>
          <span className={styles.sep} aria-hidden="true" />
          <span>Defense</span>
          <span className={styles.sep} aria-hidden="true" />
          <span>Intelligence</span>
        </p>
        <h1 id="hero-title" className={`display ${styles.title}`}>
          <span className={styles.line}>
            <span>Security</span>
          </span>{' '}
          <span className={styles.line}>
            <span>without</span>
          </span>{' '}
          <span className={styles.line}>
            <span>
              compromise<span className="accent-stop">.</span>
            </span>
          </span>
        </h1>
        <p className={`lead ${styles.lead}`}>
          Securing the systems that power civilization. From individual devices to global infrastructure,
          VANTHRAX delivers uncompromising protection against an evolving digital threat landscape.
        </p>
        <div className={styles.actions}>
          <ButtonLink href="/technology/" size="lg" arrow>
            Explore Our Technology
          </ButtonLink>
          <ButtonLink href="/company/" variant="secondary" size="lg">
            Discover VANTHRAX
          </ButtonLink>
        </div>
      </div>

      <div className={`container ${styles.hud}`}>
        <p className={`mono ${styles.caption}`}>
          <span className={styles.figure}>Fig. 00</span> Layered defense lattice — illustrative rendering
        </p>
        <a href="#products" className={`mono ${styles.scroll}`}>
          <ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" />
          Scroll
        </a>
        {!reduced && (
          <button
            type="button"
            className={`mono ${styles.motion}`}
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? (
              <Play size={12} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Pause size={12} strokeWidth={1.75} aria-hidden="true" />
            )}
            {paused ? 'Resume motion' : 'Pause motion'}
          </button>
        )}
      </div>
    </section>
  );
}
