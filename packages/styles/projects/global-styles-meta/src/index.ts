import { colorSchemeClassesMeta, colorSchemeCss } from './colorSchemeMeta';
import { cssVariableLangOverridesMeta, cssVariablesMeta, variablesCss } from './cssVariablesMeta';
import { legacyRadiusCss, legacyRadiusMeta } from './legacyRadiusMeta';
import { normalizeCss } from './normalizeMeta';
import { stylesheetsMeta } from './stylesheetsMeta';
import type { CssNode, GlobalStylesMeta } from './types';

// The single source of truth describing every part of the global styles. It is
// consumed by the global-styles build scripts to generate the CSS files and by
// the storefront to render documentation and produce LLM context.
export const globalStylesMeta = {
  cssVariables: cssVariablesMeta,
  cssVariableLangOverrides: cssVariableLangOverridesMeta,
  colorSchemeClasses: colorSchemeClassesMeta,
  legacyRadius: legacyRadiusMeta,
  stylesheets: stylesheetsMeta,
} satisfies GlobalStylesMeta;

// The fully resolved CSS for each generated stylesheet, expressed as `CssNode`
// trees. This is how the meta gives away exactly how it becomes CSS: the build
// scripts only have to `renderCss()` these nodes and format the result. Each
// stylesheet's `CssNode` tree lives in its own `*Meta.ts` file and is merely
// aggregated here.
// Note: `font-face.css` is intentionally not modeled here as it is a raw
// stylesheet built from the font-face package (see `stylesheetsMeta`).
export const globalStylesCss = {
  'variables.css': variablesCss,
  'color-scheme.css': colorSchemeCss,
  'normalize.css': normalizeCss,
  'legacy-radius.css': legacyRadiusCss,
} satisfies Record<string, CssNode[]>;
