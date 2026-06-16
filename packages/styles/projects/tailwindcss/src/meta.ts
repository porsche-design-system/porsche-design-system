import { blur } from './blur';
import { border } from './border';
import { breakpoint } from './breakpoint';
import { color } from './color';
import { displayUtilities } from './display';
import { fontBaseLayer } from './font';
import { gradientUtilities } from './gradient';
import { gridUtilities } from './grid';
import { headingUtilities } from './heading';
import {
  defaultTransitionDuration,
  defaultTransitionTimingFunction,
  motion,
  motionDeprecatedThemeVariables,
} from './motion';
import { flatten, renderNode } from './render';
import { schemeRootFallback, schemeUtilities } from './scheme';
import { shadow, shadowDeprecatedThemeVariables } from './shadow';
import { allAnimationThemeDeclarations, skeletonUtilities } from './skeleton';
import { spacing } from './spacing';
import { textUtilities } from './text';
import type { TailwindCssMeta, TailwindMeta } from './types';
import { textSizeCompanions, typography } from './typography';

/**
 * The single source of truth for the Tailwind styling solution. Everything needed to
 * generate the CSS file, render the storefront docs and (later) the LLM context lives
 * here — nothing is scattered across the build script or topic files. Split by where it
 * renders:
 *
 * - `theme`: everything inside the `@theme` block — the shared-shape design-token catalog
 *   (`color`, `typography`, … — the common vocabulary, same group taxonomy and size keys as
 *   `tokens` / stylesheets' `cssVariablesMeta`, drives the docs + LLM) plus the
 *   solution-specific, non-documented additions (`resets`, `baseColors`, `outlineWidth`,
 *   `typographyCompanions`, `deprecatedAliases`, `transitionDefaults`, `keyframes`).
 * - `utilities`: the documented `@utility` blocks.
 * - `layers`: the solution-specific rules rendered outside `@theme` (the locale-aware font
 *   base layer, the color-scheme fallback and the `scheme-*` utilities).
 *
 * The catalog groups are the same objects consumed by the CSS recipe below, so the docs and
 * the generated CSS can never diverge.
 */
export const tailwindMeta = {
  theme: {
    // `@theme` namespace resets — clear the framework defaults so only the Porsche
    // Design System tokens remain in each namespace.
    resets: [
      { property: '--breakpoint-*', value: 'initial' },
      { property: '--color-*', value: 'initial' },
      { property: '--radius-*', value: 'initial' },
      { property: '--shadow-*', value: 'initial' },
      { property: '--text-*', value: 'initial' },
    ],
    // Base colors retained after the `--color-*` reset.
    baseColors: [
      { property: '--color-black', value: '#000' },
      { property: '--color-white', value: '#fff' },
    ],
    color,
    typography,
    typographyCompanions: textSizeCompanions,
    breakpoint,
    spacing,
    border,
    blur,
    shadow,
    outlineWidth: { property: '--default-outline-width', value: '2px' },
    motion,
    transitionDefaults: { timingFunction: defaultTransitionTimingFunction, duration: defaultTransitionDuration },
    deprecatedAliases: { shadow: shadowDeprecatedThemeVariables, motion: motionDeprecatedThemeVariables },
    keyframes: allAnimationThemeDeclarations,
  },
  layers: {
    fontBase: fontBaseLayer,
    schemeFallback: schemeRootFallback,
    schemeUtilities,
  },
  utilities: {
    gradient: gradientUtilities,
    grid: gridUtilities,
    skeleton: skeletonUtilities,
    text: textUtilities,
    heading: headingUtilities,
    display: displayUtilities,
  },
} satisfies TailwindMeta;

// The final CSS tree used to generate the index.css file containing the tailwind theme which gets exposed
export const tailwindCssMeta: TailwindCssMeta = {
  file: 'index.css',
  description:
    'The complete Tailwind CSS theme: the `@theme` block of design tokens, the locale-aware font base layer, the color-scheme fallback with its `scheme-*` utilities and the documented Porsche Design System utilities.',
  meta: [
    { selector: '@theme', declarations: flatten(tailwindMeta.theme) },
    ...Object.values(tailwindMeta.layers).flat(),
    ...Object.values(tailwindMeta.utilities).flat(),
  ],
};

export const getTailwindcssTheme = () => tailwindCssMeta.meta.map(renderNode).join('\n\n');
