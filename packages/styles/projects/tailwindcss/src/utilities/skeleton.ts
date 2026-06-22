import { radius } from '../theme/border';
import { color } from '../theme/color';
import { durationXlThemeVariable, easeInOutThemeVariable } from '../theme/motion';
import { prefix } from '../prefix';
import type { CssDeclaration, CssRaw, TailwindUtility } from '../types';

// Animation — @keyframes skeleton.
export const skeletonKeyframes: CssRaw = {
  raw: `@keyframes skeleton {
  from {
    background-position-x: 100%;
  }
  to {
    background-position-x: -100%;
  }
}`,
};

// Animation — theme variable. Non-documented CSS-only plumbing (not part of `tailwindMeta`); it
// backs the documented `.skeleton` utility below rather than being surfaced on its own. The
// duration and easing reference the real motion variables so they stay in sync.
export const animateSkeletonThemeVariable: CssDeclaration = {
  property: '--animate-skeleton',
  value: `skeleton ${prefix(durationXlThemeVariable.property)} ${prefix(easeInOutThemeVariable.property)} infinite`,
};

// Documented Tailwind skeleton utility — the loading placeholder built on top of
// the skeleton animation theme variable.
export const skeletonUtilities: TailwindUtility[] = [
  {
    comment: 'Skeleton',
    selector: '@utility skeleton',
    class: '.skeleton',
    description: 'Applies a skeleton placeholder style to indicate loading state.',
    raw: `  animation: ${prefix(animateSkeletonThemeVariable.property)};
  display: block;
  border-radius: ${prefix(radius.sm.property)};
  background-color: transparent;
  background-image: linear-gradient(to right, ${prefix(color.background.frosted.property)} 0%, ${prefix(color.background.frostedStrong.property)} 50%, ${prefix(color.background.frosted.property)} 100%);
  background-position: 0 0;
  background-size: 200% 100%;`,
  },
];
