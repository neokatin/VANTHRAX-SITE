import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  /** Shows the trailing arrow glyph. */
  arrow?: boolean;
  size?: 'md' | 'lg';
}

function classes(variant: Variant, size: 'md' | 'lg', extra?: string) {
  return [styles.button, styles[variant], styles[size], extra].filter(Boolean).join(' ');
}

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && (
        <span className={styles.arrow} aria-hidden="true">
          <ArrowRight size={16} strokeWidth={1.75} />
        </span>
      )}
    </>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  arrow = false,
  children,
  className,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={classes(variant, size, className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  children,
  className,
  type = 'button',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
