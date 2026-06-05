import { radius } from './border';
import { color } from './color';
import { prefix } from './shared';
import type { CssNode, CssRaw, TailwindThemeVariable, TailwindUtility } from './types';

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

// Animation — theme variables.
export const animateSkeletonThemeVariable: TailwindThemeVariable = {
  property: '--animate-skeleton',
  value: 'skeleton --theme(--transition-duration-xl) --theme(--ease-in-out) infinite',
  classes: ['.animate-skeleton'],
  description:
    'Applies the skeleton loading animation: combines the `skeleton` keyframes with the XL transition duration and in-out easing, repeating infinitely.',
};

export const animationThemeVariables: TailwindThemeVariable[] = [animateSkeletonThemeVariable];

// All CSS nodes for the `@theme` block — documented variables first, then the
// accompanying `@keyframes` that back them.
export const allAnimationThemeDeclarations: CssNode[] = [...animationThemeVariables, skeletonKeyframes];

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
