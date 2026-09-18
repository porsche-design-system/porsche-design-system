import { blur } from '../theme/blur';
import { border } from '../theme/border';
import { breakpoint } from '../theme/breakpoint';
import { color } from '../theme/color';
import { font, fontBaseLayer, textSizeCompanions } from '../theme/font';
import { defaultTransitionDuration, defaultTransitionTimingFunction, motion } from '../theme/motion';
import { shadow } from '../theme/shadow';
import { spacing } from '../theme/spacing';
import type { CssNode, CssRule, TailwindCssMeta } from '../types';
import { displayUtilities } from '../utilities/display';
import { gradientUtilities } from '../utilities/gradient';
import { grid } from '../utilities/grid';
import { headingUtilities } from '../utilities/heading';
import { animateSkeletonThemeVariable, skeletonKeyframes, skeletonUtilities } from '../utilities/skeleton';
import { textUtilities } from '../utilities/text';
import { flatten, renderNode } from './render';
import { schemeRootFallback, schemeUtilities } from './scheme';

/**
 * Composes the documented catalog with CSS-only declarations. Sharing domain objects with
 * `meta.ts` keeps generated CSS and documentation aligned.
 */

// Clear framework defaults so each namespace contains only PDS tokens.
const resets: CssNode[] = [
  { property: '--breakpoint-*', value: 'initial' },
  { property: '--color-*', value: 'initial' },
  { property: '--radius-*', value: 'initial' },
  { property: '--shadow-*', value: 'initial' },
  { property: '--text-*', value: 'initial' },
];

const baseColors: CssNode[] = [
  { property: '--color-black', value: '#000' },
  { property: '--color-white', value: '#fff' },
];

const outlineWidth: CssNode = { property: '--default-outline-width', value: '2px' };

// This recipe defines render order; resets and base colors must precede catalog declarations.
const themeBlock: CssRule = {
  selector: '@theme',
  declarations: flatten([
    resets,
    baseColors,
    color,
    font,
    textSizeCompanions,
    breakpoint,
    spacing,
    border,
    blur,
    shadow,
    outlineWidth,
    motion,
    defaultTransitionTimingFunction,
    defaultTransitionDuration,
    animateSkeletonThemeVariable,
    skeletonKeyframes,
  ]),
};

// Utility render order intentionally differs from documentation grouping.
const utilities: CssNode[] = [
  ...gradientUtilities,
  ...flatten(grid),
  ...skeletonUtilities,
  ...textUtilities,
  ...headingUtilities,
  ...displayUtilities,
];

export const tailwindCssMeta: TailwindCssMeta = {
  file: 'index.css',
  description:
    'The complete Tailwind CSS theme: the `@theme` block of design tokens, the locale-aware font base layer, the color-scheme fallback with its `scheme-*` utilities and the documented Porsche Design System utilities.',
  meta: [themeBlock, fontBaseLayer, schemeRootFallback, ...schemeUtilities, ...utilities],
};

export const getTailwindcssTheme = (): string => tailwindCssMeta.meta.map(renderNode).join('\n\n');
