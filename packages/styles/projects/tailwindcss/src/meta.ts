import { blur } from './blur';
import { border } from './border';
import { breakpoint } from './breakpoint';
import { color } from './color';
import { displayUtilities } from './display';
import { fontBaseLayer } from './font';
import { gradientUtilities } from './gradient';
import { gridUtilities } from './grid';
import { headingUtilities } from './heading';
import { defaultTransitionDuration, defaultTransitionTimingFunction, motion, motionDeprecatedThemeVariables } from './motion';
import { renderNode } from './render';
import { schemeRootFallback, schemeUtilities } from './scheme';
import { shadow, shadowDeprecatedThemeVariables } from './shadow';
import { allAnimationThemeDeclarations, skeletonUtilities } from './skeleton';
import { spacing } from './spacing';
import { textUtilities } from './text';
import type { CssNode, TailwindCssMeta, TailwindMeta, TailwindThemeVariable } from './types';
import { textSizeCompanions, typography } from './typography';

/**
 * The single source of truth for the Tailwind styling solution. Everything needed to
 * generate the CSS file, render the storefront docs and (later) the LLM context lives
 * here — nothing is scattered across the build script or topic files.
 *
 * - `theme`: the shared-shape design-token catalog (the common vocabulary — same group
 *   taxonomy and size keys as `tokens` / stylesheets' `cssVariablesMeta`). Drives the docs,
 *   the future LLM context and the `@theme` tokens.
 * - `utilities`: the documented `@utility` blocks.
 * - `infrastructure`: the solution-specific CSS-only parts (resets, companions, deprecated
 *   aliases, transition defaults, skeleton keyframes, the locale-aware font base layer and
 *   the color-scheme fallback). These are the per-solution extension points; they are
 *   authored in their topic files and merely assembled here.
 *
 * The token groups (`color`, `typography`, …) are the same objects consumed by the CSS
 * recipe below, so the docs and the generated CSS can never diverge.
 */
export const tailwindMeta = {
  theme: {
    color,
    typography,
    spacing,
    border,
    blur,
    shadow,
    breakpoint,
    motion,
  },
  utilities: {
    heading: headingUtilities,
    text: textUtilities,
    display: displayUtilities,
    gradient: gradientUtilities,
    grid: gridUtilities,
    skeleton: skeletonUtilities,
  },
  infrastructure: {
    // `@theme` namespace resets — clear the framework defaults so only the Porsche
    // Design System tokens remain in each namespace.
    themeResets: [
      { property: '--breakpoint-*', value: 'initial' },
      { property: '--color-*', value: 'initial' },
      { property: '--radius-*', value: 'initial' },
      { property: '--shadow-*', value: 'initial' },
      { property: '--text-*', value: 'initial' },
    ],
    // Base colors retained after the `--color-*` reset.
    themeBaseColors: [
      { property: '--color-black', value: '#000' },
      { property: '--color-white', value: '#fff' },
    ],
    outlineWidth: { property: '--default-outline-width', value: '2px' },
    typographyCompanions: textSizeCompanions,
    deprecatedAliases: { shadow: shadowDeprecatedThemeVariables, motion: motionDeprecatedThemeVariables },
    transitionDefaults: { timingFunction: defaultTransitionTimingFunction, duration: defaultTransitionDuration },
    keyframes: allAnimationThemeDeclarations,
    fontBaseLayer,
    schemeFallback: schemeRootFallback,
    schemeUtilities,
  },
} satisfies TailwindMeta;

const { theme, utilities, infrastructure } = tailwindMeta;

// A theme branch is a variable, an array of branches, or a nested record of branches.
type ThemeBranch = TailwindThemeVariable | ThemeBranch[] | { [key: string]: ThemeBranch };
const isVariable = (node: ThemeBranch): node is TailwindThemeVariable => 'property' in node;
// Recursively flatten any theme branch (e.g. `theme.color`, or `theme.border` as a whole)
// into a flat declaration list, in source order.
const flatten = (node: ThemeBranch): TailwindThemeVariable[] =>
  Array.isArray(node) ? node.flatMap(flatten) : isVariable(node) ? [node] : Object.values(node).flatMap(flatten);

// The complete Tailwind CSS theme as an ordered `CssNode` tree, assembled **exclusively**
// from `tailwindMeta`. This recipe is the only place that knows Tailwind's `@theme` /
// `@layer` / `@utility` structure and ordering. The `@theme` block interleaves the
// documented design tokens (flattened from `theme`) with the non-documented
// infrastructure; the layers and `@utility` blocks follow.
export const tailwindCssMeta: TailwindCssMeta = {
  file: 'index.css',
  description:
    'The complete Tailwind CSS theme: the `@theme` block of design tokens, the locale-aware font base layer, the color-scheme fallback with its `scheme-*` utilities and the documented Porsche Design System utilities.',
  meta: [
    {
      selector: '@theme',
      declarations: [
        ...infrastructure.themeResets,
        ...infrastructure.themeBaseColors,
        ...flatten(theme.color),
        ...flatten(theme.typography),
        ...infrastructure.typographyCompanions,
        ...theme.breakpoint,
        ...flatten(theme.spacing),
        ...flatten(theme.border),
        ...theme.blur,
        ...theme.shadow,
        ...infrastructure.deprecatedAliases.shadow,
        infrastructure.outlineWidth,
        infrastructure.transitionDefaults.timingFunction,
        ...theme.motion.easing,
        infrastructure.transitionDefaults.duration,
        ...theme.motion.duration,
        ...infrastructure.deprecatedAliases.motion,
        ...infrastructure.keyframes,
      ] satisfies CssNode[],
    },
    infrastructure.fontBaseLayer,
    infrastructure.schemeFallback,
    ...infrastructure.schemeUtilities,
    ...utilities.gradient,
    ...utilities.grid,
    ...utilities.skeleton,
    ...utilities.text,
    ...utilities.heading,
    ...utilities.display,
  ],
};

export const getTailwindcssTheme = () => tailwindCssMeta.meta.map(renderNode).join('\n\n');
