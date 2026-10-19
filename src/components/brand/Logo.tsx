import { Emblem } from './Emblem';
import styles from './Logo.module.css';

interface LogoProps {
  href?: string;
  size?: 'sm' | 'lg';
}

export function Logo({ href = '/', size = 'sm' }: LogoProps) {
  return (
    <a href={href} className={`${styles.logo} ${styles[size]}`}>
      <Emblem size={size === 'lg' ? 44 : 30} className={styles.emblem} />
      <span className={styles.wordmark}>
        <span className={styles.name}>VANTHRAX</span>{' '}
        <span className={styles.sub}>Systems</span>
        <span className="visually-hidden"> — home</span>
      </span>
    </a>
  );
}
