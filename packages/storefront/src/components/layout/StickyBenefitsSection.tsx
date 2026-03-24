'use client';

import { PHeading, PText } from '@porsche-design-system/components-react/ssr';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { useStorefrontColorScheme } from '@/hooks/useStorefrontColorScheme';

const BENEFITS = [
  {
    label: 'Short & Longterm Efficiency',
    text: 'Speeds up design and development by reusing maintained components and patterns. Enables better collaboration and delivers up to 31% faster implementation.',
  },
  {
    label: 'Brand Fit',
    text: "Built on Porsche's design principles, it aligns with the brand identity, delivering a cohesive and premium digital experience.",
  },
  {
    label: 'Accessibility Compliant',
    text: 'WCAG compliant components ensure inclusivity and accessibility for all users, enhancing usability and user experience.',
  },
  {
    label: 'Framework Agnostic',
    text: 'Works seamlessly with any framework, offering flexibility, compatibility, and ease of use across platforms.',
  },
  {
    label: 'Fluid & Responsive',
    text: 'The system is fully responsive and adaptable, ensuring an optimal user experience across all devices and screen sizes.',
  },
  {
    label: 'Compliant Quality',
    text: 'The system ensures flawless performance with automated tests, security checks, and smooth updates, delivering reliable, high-quality results every time.',
  },
  {
    label: 'Updated Capability',
    text: 'Styles, tokens, and components can be updated anytime, enabling flexibility, improvement, and alignment with evolving design trends.',
  },
  {
    label: 'Open-Source Code',
    text: 'It fosters collaboration by allowing everyone to use the code, ensuring transparency, innovation, and well-tested, dependable solutions.',
  },
];

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

/* ══════════════════════════════════════════════════
   StickyBenefitsSection
   Each card sits in normal flow and becomes sticky.
   The next card scrolls up and covers the previous one.
   While being covered, the previous card shrinks & fades.
   ══════════════════════════════════════════════════ */

const CARD_HEIGHT_CSS = 'min(597px, 85vh)';
const STICKY_TOP = 64; // px – leaves some breathing room at top

export function StickyBenefitsSection() {
  const { isDark } = useStorefrontColorScheme();
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  const illustrations = [
    <Image
      key="efficiency"
      src={isDark ? 'assets/efficiency_dark.webp' : 'assets/efficiency_light.webp'}
      alt=""
      width={240}
      height={220}
      loading="eager"
      className="w-auto h-auto max-w-[160px] max-h-[140px] @xl:max-w-[240px] @xl:max-h-[220px] object-contain"
    />,
    <Image
      key="brand-fit"
      src={isDark ? 'assets/brand-fit_dark.webp' : 'assets/brand-fit_light.webp'}
      alt=""
      width={240}
      height={220}
      loading="eager"
      className="w-auto h-auto max-w-[160px] max-h-[140px] @xl:max-w-[240px] @xl:max-h-[220px] object-contain"
    />,
    <Image
      key="accessible"
      src={isDark ? 'assets/accessible_dark.webp' : 'assets/accessible_light.webp'}
      alt=""
      width={240}
      height={220}
      loading="eager"
      className="w-auto h-auto max-w-[160px] max-h-[140px] @xl:max-w-[240px] @xl:max-h-[220px] object-contain"
    />,
    <Image
      key="agnostic"
      src={isDark ? 'assets/agnostic_dark.webp' : 'assets/agnostic_light.webp'}
      alt=""
      width={240}
      height={220}
      loading="eager"
      className="w-auto h-auto max-w-[160px] max-h-[140px] @xl:max-w-[240px] @xl:max-h-[220px] object-contain"
    />,
    <Image
      key="responsive"
      src={isDark ? 'assets/responsive_dark.webp' : 'assets/responsive_light.webp'}
      alt=""
      width={240}
      height={220}
      loading="eager"
      className="w-auto h-auto max-w-[160px] max-h-[140px] @xl:max-w-[240px] @xl:max-h-[220px] object-contain"
    />,
    <Image
      key="quality"
      src={isDark ? 'assets/quality_dark.webp' : 'assets/quality_light.webp'}
      alt=""
      width={240}
      height={220}
      loading="eager"
      className="w-auto h-auto max-w-[160px] max-h-[140px] @xl:max-w-[240px] @xl:max-h-[220px] object-contain"
    />,
    <Image
      key="update"
      src={isDark ? 'assets/update_dark.webp' : 'assets/update_light.webp'}
      alt=""
      width={240}
      height={220}
      loading="eager"
      className="w-auto h-auto max-w-[160px] max-h-[140px] @xl:max-w-[240px] @xl:max-h-[220px] object-contain"
    />,
    <Image
      key="open-source"
      src={isDark ? 'assets/open-source_dark.webp' : 'assets/open-source_light.webp'}
      alt=""
      width={240}
      height={220}
      loading="eager"
      className="w-auto h-auto max-w-[160px] max-h-[140px] @xl:max-w-[240px] @xl:max-h-[220px] object-contain"
    />,
  ];

  /* Dim-overlay refs – one per card, created once */
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateCards = useCallback(() => {
    const n = BENEFITS.length;

    /* ── 1. Batch-READ: collect all rects first (no style writes yet) ── */
    const rects: (DOMRect | null)[] = [];
    for (let i = 0; i < n; i++) {
      const w = wrapperRefs.current[i];
      rects.push(w ? w.getBoundingClientRect() : null);
    }

    /* ── 2. Compute cover-progress per card ── */
    const progresses: number[] = [];
    for (let i = 0; i < n; i++) {
      let coverProgress = 0;
      const thisRect = rects[i];
      const nextRect = rects[i + 1];
      if (thisRect && nextRect && i < n - 1) {
        const totalTravel = thisRect.height;
        if (nextRect.top <= STICKY_TOP + totalTravel) {
          coverProgress = clamp01(1 - (nextRect.top - STICKY_TOP) / totalTravel);
        }
      }
      progresses.push(coverProgress);
    }

    /* ── 3. Batch-WRITE: apply styles in one pass ── */
    for (let i = 0; i < n; i++) {
      const inner = cardInnerRefs.current[i];
      const overlay = overlayRefs.current[i];
      if (!inner) continue;

      const p = progresses[i];
      if (p > 0.001) {
        const scale = 1 - p * 0.06;
        inner.style.transform = `scale3d(${scale},${scale},1)`;
        if (overlay) overlay.style.opacity = `${Math.min(1, p * 0.85)}`;
      } else {
        inner.style.transform = '';
        if (overlay) overlay.style.opacity = '0';
      }
    }
  }, []);

  /* rAF-throttled scroll handler — at most one updateCards per frame */
  const rafId = useRef(0);
  const onScroll = useCallback(() => {
    if (rafId.current) return; // already scheduled
    rafId.current = requestAnimationFrame(() => {
      rafId.current = 0;
      updateCards();
    });
  }, [updateCards]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateCards(); // initial positioning
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [onScroll, updateCards]);

  return (
    <>
      {BENEFITS.map((card, i) => (
        <div
          key={i}
          ref={(el) => {
            wrapperRefs.current[i] = el;
          }}
          className="sticky"
          style={{
            top: `${STICKY_TOP}px`,
            zIndex: i,
            marginBottom: i < BENEFITS.length - 1 ? '1.5rem' : 0,
            height: CARD_HEIGHT_CSS,
            contain: 'layout style paint',
          }}
        >
          <div
            ref={(el) => {
              cardInnerRefs.current[i] = el;
            }}
            className="origin-[center_top] relative w-full h-full px-fluid-xl py-fluid-md bg-frosted backdrop-blur-frosted rounded-4xl flex flex-col gap-static-md @2xl:flex-row items-center justify-between"
          >
            {/* Dimming overlay – GPU-composited opacity instead of expensive filter */}
            <div
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              className="absolute inset-0 opacity-0 bg-[light-dark(white,black)] rounded-4xl pointer-events-none"
            />
            <div className="flex-1 flex items-center justify-center @xl:h-full">{illustrations[i]}</div>
            <div className="flex-1 h-full flex flex-col items-center justify-center rounded-[2.5rem]">
              <div className="text-center max-w-[28rem] flex flex-col gap-static-xs">
                <PHeading tag="h3" size="xs" color="contrast-medium">
                  {card.label}
                </PHeading>
                <PText size="lg">{card.text}</PText>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
