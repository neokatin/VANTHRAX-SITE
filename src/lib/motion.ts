import { useEffect, useRef, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(QUERY).matches;
}

/** Tracks the user's reduced-motion preference. Always false during prerender. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);
  return reduced;
}

/**
 * Drives an animation loop that only runs while the element is on screen,
 * the tab is visible and the animation is not paused. When paused or under
 * reduced motion a single still frame is painted instead.
 */
export function useAnimationLoop(
  target: React.RefObject<Element | null>,
  frame: (time: number, dt: number) => void,
  options: { paused?: boolean; reduced?: boolean } = {},
) {
  const { paused = false, reduced = false } = options;
  const frameRef = useRef(frame);
  frameRef.current = frame;
  const elapsedRef = useRef(0);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    let raf = 0;
    let last = 0;
    let visible = false;

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      elapsedRef.current += dt;
      frameRef.current(elapsedRef.current, dt);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || paused || reduced || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Reduced motion shows a composed still; pause freezes the current frame.
    if (reduced && elapsedRef.current === 0) elapsedRef.current = 6;
    frameRef.current(elapsedRef.current, 0);

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(el);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [target, paused, reduced]);
}

/** Seeded PRNG (mulberry32) so prerendered and hydrated output match. */
export function seededRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
