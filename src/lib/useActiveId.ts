import { useEffect, useState } from 'react';

/**
 * Returns the id of whichever observed element currently crosses the
 * viewport's reading line. Used for sticky in-page indexes and scrollytelling.
 */
export function useActiveId(ids: readonly string[], fallback: string | null = null): string | null {
  const [active, setActive] = useState<string | null>(fallback);
  const key = ids.join('|');

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // ids are compared by value through `key`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
