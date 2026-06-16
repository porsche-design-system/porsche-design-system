import { blurThemeVariables } from './blur';
import { borderThemeVariables } from './border';
import { breakpointThemeVariables } from './breakpoint';
import { colorThemeVariables } from './color';
import { displayUtilities } from './display';
import { fontBaseLayer } from './font';
import { gradientUtilities } from './gradient';
import { gridUtilities } from './grid';
import { headingUtilities } from './heading';
import { allMotionThemeVariables } from './motion';
import { renderNode } from './render';
import { schemeRootFallback, schemeUtilities } from './scheme';
import { allShadowThemeVariables } from './shadow';
import { allAnimationThemeDeclarations, skeletonUtilities } from './skeleton';
import { spacingThemeVariables } from './spacing';
import { textUtilities } from './text';
import type { TailwindCssMeta } from './types';
import { typographyThemeVariables } from './typography';

export * from './blur';
export * from './border';
export * from './breakpoint';
export * from './color';
export * from './display';
export * from './font';
export * from './gradient';
export * from './grid';
export * from './heading';
export * from './meta';
export * from './motion';
export * from './render';
export * from './scheme';
export * from './shadow';
export * from './skeleton';
export * from './spacing';
export * from './text';
// Public API — types and the documented theme variables / utilities (single
// source for the generated CSS, the storefront docs and the LLM context).
export * from './types';
export * from './typography';

// The complete Tailwind CSS theme described as data. `meta` is a single CssNode
// tree where everything comes together: the `@theme` block (documented theme
// variables interleaved with the non-documented infrastructure — resets, aliases,
// companions, keyframes), the font base layer, the scheme fallback + `@utility`
// blocks and the documented utilities. Prettier normalizes spacing afterwards, so
// no manual blank-line separators are needed.
export const tailwindCssMeta: TailwindCssMeta = {
  file: 'index.css',
  description:
    'The complete Tailwind CSS theme: the `@theme` block of design tokens, the locale-aware font base layer, the color-scheme fallback with its `scheme-*` utilities and the documented Porsche Design System utilities.',
  meta: [
    {
      selector: '@theme',
      declarations: [
        { property: '--breakpoint-*', value: 'initial' },
        { property: '--color-*', value: 'initial' },
        { property: '--radius-*', value: 'initial' },
        { property: '--shadow-*', value: 'initial' },
        { property: '--text-*', value: 'initial' },
        { property: '--color-black', value: '#000' },
        { property: '--color-white', value: '#fff' },
        ...colorThemeVariables,
        ...typographyThemeVariables,
        ...breakpointThemeVariables,
        ...spacingThemeVariables,
        ...borderThemeVariables,
        ...blurThemeVariables,
        ...allShadowThemeVariables,
        { property: '--default-outline-width', value: '2px' },
        ...allMotionThemeVariables,
        ...allAnimationThemeDeclarations,
      ],
    },
    fontBaseLayer,
    schemeRootFallback,
    ...schemeUtilities,
    ...gradientUtilities,
    ...gridUtilities,
    ...skeletonUtilities,
    ...textUtilities,
    ...headingUtilities,
    ...displayUtilities,
  ],
};

export const getTailwindcssTheme = () => tailwindCssMeta.meta.map(renderNode).join('\n\n');
