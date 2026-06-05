import { durationSm, easeInOut } from '@porsche-design-system/tokens';
import { blurThemeVariables } from './blur';
import { radiusThemeVariables } from './border';
import { breakpointThemeVariables } from './breakpoint';
import { colorThemeVariables } from './color';
import { fontBaseLayer } from './font';
import { durationThemeVariables, easeThemeVariables } from './motion';
import { renderNode } from './render';
import { schemeRootFallback, schemeUtilities } from './scheme';
import { shadowThemeVariables } from './shadow';
import { spacingFluidThemeVariables, spacingStaticThemeVariables } from './spacing';
import type { TailwindCssMeta } from './types';
import { fontFamilyThemeVariables, fontWeightThemeVariables, leadingThemeVariables, textSizeNodes } from './typography';
import { tailwindUtilities } from './utilities';

export * from './blur';
export * from './border';
export * from './breakpoint';
export * from './color';
export * from './font';
export * from './motion';
export * from './render';
export * from './scheme';
export * from './shadow';
export * from './spacing';
// Public API — types and the documented theme variables / utilities (single
// source for the generated CSS, the storefront docs and the LLM context).
export * from './types';
export * from './typography';
export * from './utilities';

// The complete Tailwind CSS theme described as data. `meta` is a single CssNode
// tree where everything comes together: the `@theme` block (documented theme
// variables interleaved with the non-documented infrastructure — resets, aliases,
// companions, keyframes — via `raw` nodes), the font base layer, the scheme
// fallback + `@utility` blocks and the documented utilities. Prettier normalizes
// spacing afterwards, so no manual blank-line separators are needed.
export const tailwindCssMeta: TailwindCssMeta = {
  file: 'index.css',
  description:
    'The complete Tailwind CSS theme: the `@theme` block of design tokens, the locale-aware font base layer, the color-scheme fallback with its `scheme-*` utilities and the documented Porsche Design System utilities.',
  meta: [
    {
      selector: '@theme',
      declarations: [
        { raw: '/* Reset */' },
        { raw: '--breakpoint-*: initial;' },
        { raw: '--color-*: initial;' },
        { raw: '--radius-*: initial;' },
        { raw: '--shadow-*: initial;' },
        { raw: '--text-*: initial;' },
        { raw: '/* Color */' },
        { raw: '--color-black: #000;' },
        { raw: '--color-white: #fff;' },
        ...colorThemeVariables,
        { raw: '/* Typography */' },
        {
          raw: `/*
    This variable might be prefixed by Tailwind (e.g., --tw-font-porsche-next).
    By pointing it to our dynamic variable, we create a stable link.
  */`,
        },
        ...fontFamilyThemeVariables,
        { raw: '--font-sans: --theme(--font-porsche-next);' },
        ...fontWeightThemeVariables,
        ...leadingThemeVariables,
        ...textSizeNodes,
        { raw: '/* Breakpoint */' },
        ...breakpointThemeVariables,
        { raw: '/* Spacing */' },
        ...spacingFluidThemeVariables,
        ...spacingStaticThemeVariables,
        { raw: '/* Border */' },
        ...radiusThemeVariables,
        { raw: '--default-border-width: 1px;' },
        { raw: '--border-width-regular: 2px; /* alias (deprecated) */' },
        { raw: '--border-width-thin: 1px; /* alias (deprecated) */' },
        { raw: '/* Blur */' },
        ...blurThemeVariables,
        { raw: '/* Shadow */' },
        ...shadowThemeVariables,
        { raw: '--shadow-low: --theme(--shadow-sm); /* alias (deprecated) */' },
        { raw: '--shadow-medium: --theme(--shadow-md); /* alias (deprecated) */' },
        { raw: '--shadow-high: --theme(--shadow-lg); /* alias (deprecated) */' },
        { raw: '/* Outline */' },
        { raw: '--default-outline-width: 2px;' },
        { raw: '/* Motion */' },
        { raw: `--default-transition-timing-function: ${easeInOut};` },
        ...easeThemeVariables,
        { raw: `--default-transition-duration: ${durationSm};` },
        ...durationThemeVariables,
        { raw: '--transition-duration-short: --theme(--transition-duration-sm); /* alias (deprecated) */' },
        { raw: '--transition-duration-moderate: --theme(--transition-duration-md); /* alias (deprecated) */' },
        { raw: '--transition-duration-long: --theme(--transition-duration-lg); /* alias (deprecated) */' },
        { raw: '--transition-duration-very-long: --theme(--transition-duration-xl); /* alias (deprecated) */' },
        { raw: '/* Animation */' },
        { raw: '--animate-skeleton: skeleton --theme(--transition-duration-xl) --theme(--ease-in-out) infinite;' },
        {
          raw: `@keyframes skeleton {
  from {
    background-position-x: 100%;
  }
  to {
    background-position-x: -100%;
  }
}`,
        },
      ],
    },
    fontBaseLayer,
    schemeRootFallback,
    ...schemeUtilities,
    // The documented utilities reduced to their renderable shape (the `class` /
    // `description` metadata is only consumed by the docs + LLM context).
    ...tailwindUtilities.map(({ comment, selector, raw }) => ({ comment, selector, raw })),
  ],
};

export const getTailwindcssTheme = () => tailwindCssMeta.meta.map(renderNode).join('\n\n');
