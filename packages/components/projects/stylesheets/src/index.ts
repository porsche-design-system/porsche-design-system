import { colorSchemeCss } from './colorSchemeMeta';
import { variablesCss } from './cssVariablesMeta';
import { legacyRadiusCss } from './legacyRadiusMeta';
import { normalizeCss } from './normalizeMeta';
import type { GlobalStylesMeta } from './types';

export { colorSchemeClassesMeta } from './colorSchemeMeta';
// Independent, granular exports for component and docs access. These expose the
// authored meta directly (the grouped CSS variable tree, the `.scheme-*` class
// metas, the legacy radius variables) so consumers can read single entries
// (e.g. `cssVariablesMeta.color.background.canvas`) without going through the
// per-stylesheet aggregation below.
export { cssVariablesMeta } from './cssVariablesMeta';
// Individual, tree-shakeable CSS custom property *name* consts (e.g. `colorCanvas =
// '--p-color-canvas'`) plus the `ref()` helper that wraps a name into `var(...)`. The
// consts are a DERIVED build artifact generated from `cssVariablesMeta` (the single source
// of truth) into the gitignored `src/generated/` folder by `scripts/buildCssVariableConstants.ts`;
// `ref` is hand-written. Components consume these directly in their JSS styles.
export * from './generated/cssVariables';
export { flattenColorVariables, flattenCssVariables, renderCss, renderCssNode } from './helpers';
export { legacyRadiusMeta } from './legacyRadiusMeta';
export { ref } from './ref';
export type * from './types';

// The complete, per-stylesheet meta describing every generated global stylesheet.
// Each entry carries its published `file` name, a markdown-enabled `description`
// and the fully resolved `meta` (`CssNode` tree). This is how the meta gives
// away exactly how it becomes CSS: the build scripts only have to `renderCss()`
// each entry's `meta` and write the result to its `file`. Every stylesheet's
// `CssNode` tree lives in its own `*Meta.ts` file and is merely aggregated here.
// Note: `font-face.css` is intentionally not modeled here as it is a raw
// stylesheet built from the font-face package.
export const stylesheetsMeta = {
  cssVariables: {
    file: 'variables.css',
    description:
      'Exposes the design system **CSS variables** (custom properties) on `:root`, including theme-aware colors resolved via `light-dark()` and `:lang()` font overrides.',
    meta: variablesCss,
  },
  colorScheme: {
    file: 'color-scheme.css',
    description:
      'Provides the `.scheme-*` utility classes controlling the CSS `color-scheme` property, plus the `@supports` `light-dark()` polyfill.',
    meta: colorSchemeCss,
  },
  normalize: {
    file: 'normalize.css',
    description:
      'Recommended **normalize** styles including CSS reset rules and base typography (font family and line height) for `html` and `body`.',
    meta: normalizeCss,
  },
  legacyRadius: {
    file: 'legacy-radius.css',
    description: 'Private `--_p-legacy-radius-*` variables preserving backwards-compatible radii for legacy consumers.',
    meta: legacyRadiusCss,
  },
} satisfies GlobalStylesMeta;
