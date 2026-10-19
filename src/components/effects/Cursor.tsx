import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

const INTERACTIVE = 'a, button, [role="button"], summary, label[for], [data-cursor]';

/**
 * A quiet tracking reticle for precise pointers. The native cursor is kept —
 * the reticle only adds feedback when the pointer settles on something
 * interactive. Disabled on touch devices and under reduced motion.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!el || !fine.matches || reduced.matches) return;

    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let raf = 0;

    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      el.dataset.visible = 'true';
      const target = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      el.dataset.active = target ? 'true' : 'false';
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => (el.dataset.visible = 'false');
    const onDown = () => (el.dataset.pressed = 'true');
    const onUp = () => (el.dataset.pressed = 'false');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div ref={ref} className={styles.cursor} aria-hidden="true">
      <span className={styles.ring} />
    </div>
  );
}
