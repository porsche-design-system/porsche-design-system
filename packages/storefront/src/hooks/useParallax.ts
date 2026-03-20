'use client';

import { useEffect, useRef } from 'react';

/**
 * Parallax scroll effect for decorative gradient blobs.
 *
 * Elements register via the returned `ref` callback and are driven by
 * `data-parallax` (speed factor, e.g. "0.3") and an optional
 * `data-base-transform` (e.g. "rotate(58deg)") attribute.
 *
 * Uses rAF-throttled scroll + batched reads/writes to avoid layout thrashing.
 */
export function useParallax() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const vh = window.innerHeight;
      const els = refs.current;

      // Phase 1: READ all positions (no writes, no reflows)
      const data: { el: HTMLDivElement; offset: number; speed: number; base: string }[] = [];
      for (const el of els) {
        if (!el) continue;
        const parent = el.parentElement;
        if (!parent) continue;
        const rect = parent.getBoundingClientRect();
        data.push({
          el,
          offset: rect.top + rect.height / 2 - vh / 2,
          speed: Number(el.dataset.parallax) || 0.3,
          base: el.dataset.baseTransform || '',
        });
      }

      // Phase 2: WRITE all transforms (batched, no reads)
      for (const { el, offset, speed, base } of data) {
        el.style.transform = `${base} translate3d(0, ${offset * speed}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
      update();
    };

    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return refs;
}
