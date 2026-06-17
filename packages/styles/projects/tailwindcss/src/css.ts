import { fontBaseLayer } from './font';
import { tailwindMeta } from './meta';
import { defaultTransitionDuration, defaultTransitionTimingFunction, motionDeprecatedThemeVariables } from './motion';
import { flatten, renderNode } from './render';
import { schemeRootFallback, schemeUtilities } from './scheme';
import { animateSkeletonThemeVariable, skeletonKeyframes } from './skeleton';
import { shadowDeprecatedThemeVariables } from './shadow';
import { textSizeCompanions } from './typography';
import type { CssNode, CssRule, TailwindCssMeta } from './types';

/**
 * The CSS-generation layer for the Tailwind styling solution: the assembly that composes the
 * documented {@link tailwindMeta} with the non-documented, CSS-only implementation detail (resets,
 * base colors, the focus-outline default, line-height companions, transition defaults, deprecated
 * aliases, keyframes and the outside-`@theme` layers) into the final stylesheet
 * ({@link tailwindCssMeta} / {@link getTailwindcssTheme}).
 *
 * Kept separate from `meta.ts` on purpose: `meta.ts` is the documented model (what the storefront
 * and the LLM skill consume), this file is *how the CSS is produced*. The documented catalog is
 * referenced here by the same object identity, so the docs and the generated CSS can never diverge.
 */

// `@theme` namespace resets — clear the framework defaults so only the Porsche Design System
// tokens remain in each namespace.
const resets: CssNode[] = [
  { property: '--breakpoint-*', value: 'initial' },
  { property: '--color-*', value: 'initial' },
  { property: '--radius-*', value: 'initial' },
  { property: '--shadow-*', value: 'initial' },
  { property: '--text-*', value: 'initial' },
];

// Base colors retained after the `--color-*` reset.
const baseColors: CssNode[] = [
  { property: '--color-black', value: '#000' },
  { property: '--color-white', value: '#fff' },
];

const outlineWidth: CssNode = { property: '--default-outline-width', value: '2px' };

// The `@theme` block: the documented catalog (referenced from `tailwindMeta`) interleaved with the
// CSS-only implementation detail in the exact render order. `flatten()` walks each branch (record /
// array / leaf) in source order, so this explicit recipe is the single place the `@theme` ordering
// is decided. Only resets/baseColors must functionally come first; the rest is grouped for clarity.
const themeBlock: CssRule = {
  selector: '@theme',
  declarations: flatten([
    resets,
    baseColors,
    tailwindMeta.theme.color,
    tailwindMeta.theme.typography,
    textSizeCompanions,
    tailwindMeta.theme.breakpoint,
    tailwindMeta.theme.spacing,
    tailwindMeta.theme.border,
    tailwindMeta.theme.blur,
    tailwindMeta.theme.shadow,
    outlineWidth,
    tailwindMeta.theme.motion,
    defaultTransitionTimingFunction,
    defaultTransitionDuration,
    shadowDeprecatedThemeVariables,
    motionDeprecatedThemeVariables,
    animateSkeletonThemeVariable,
    skeletonKeyframes,
  ]),
};

// The final CSS tree used to generate the index.css file containing the tailwind theme which gets exposed.
// After the `@theme` block come the outside-`@theme` layers (font base, color-scheme fallback,
// `scheme-*` utilities) and finally the documented `@utility` blocks.
export const tailwindCssMeta: TailwindCssMeta = {
  file: 'index.css',
  description:
    'The complete Tailwind CSS theme: the `@theme` block of design tokens, the locale-aware font base layer, the color-scheme fallback with its `scheme-*` utilities and the documented Porsche Design System utilities.',
  meta: [
    themeBlock,
    fontBaseLayer,
    schemeRootFallback,
    ...schemeUtilities,
    ...Object.values(tailwindMeta.utilities).flat(),
  ],
};

export const getTailwindcssTheme = (): string => tailwindCssMeta.meta.map(renderNode).join('\n\n');
