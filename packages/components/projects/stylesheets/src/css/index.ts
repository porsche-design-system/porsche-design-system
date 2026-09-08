import {
  fontPorscheNextJa,
  fontPorscheNextKo,
  fontPorscheNextZhHans,
  fontPorscheNextZhHant,
} from '@porsche-design-system/tokens';
import { flattenColorVariables, flattenCssVariables } from '../helpers';
import { normalizeCss } from '../normalize';
import { cssVariableTokens } from '../theme';
import { colorScheme, colorSchemePolyfillCssRule } from '../utilities/color-scheme';
import type { CssNode, GlobalStylesMeta } from '../types';

// Composition layer: resolves the documented catalog plus the CSS-only plumbing (the `:root`
// wrapper, the `:lang()` font overrides, the `light-dark()` polyfill, the raw normalize reset)
// into the concrete per-file `CssNode` trees the build scripts render. This mirrors the
// scss/tailwind composition (`scss/src/scss/index.ts`): the meta stays the single source of truth,
// the file structure stays out of the build scripts.

const fontPorscheNextProperty = cssVariableTokens.font.family.porscheNext.property;

// The fully resolved CSS for `variables.css`.
const variablesCss: CssNode[] = [
  {
    selector: ':root',
    declarations: [
      { property: 'color-scheme', value: 'light' },
      // Variable leaves are structurally `CssDeclaration`s, so they are emitted directly.
      ...flattenCssVariables(cssVariableTokens),
    ],
  },
  {
    comment: 'Simplified Chinese',
    selector: ':lang(zh-Hans), :lang(zh-CN), :lang(zh-SG)',
    declarations: [{ property: fontPorscheNextProperty, value: fontPorscheNextZhHans }],
  },
  {
    comment: 'Traditional Chinese',
    selector: ':lang(zh-Hant), :lang(zh-TW), :lang(zh-HK), :lang(zh-MO)',
    declarations: [{ property: fontPorscheNextProperty, value: fontPorscheNextZhHant }],
  },
  {
    comment: 'Japanese',
    selector: ':lang(ja)',
    declarations: [{ property: fontPorscheNextProperty, value: fontPorscheNextJa }],
  },
  {
    comment: 'Korean',
    selector: ':lang(ko)',
    declarations: [{ property: fontPorscheNextProperty, value: fontPorscheNextKo }],
  },
];

// The fully resolved CSS for `color-scheme.css`.
const colorSchemeCss: CssNode[] = [...colorScheme, colorSchemePolyfillCssRule(flattenColorVariables(cssVariableTokens))];

// The complete, per-stylesheet composition describing every generated global stylesheet. Each
// entry carries its published `file` name, a markdown-enabled `description` and the fully resolved
// `meta` (`CssNode` tree). The build scripts only have to `renderCss()` each entry's `meta` and
// write the result to its `file`. Note: `font-face.css` is intentionally not modeled here as it is
// a raw stylesheet built from the font-face package.
export const globalStylesMeta = {
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
} satisfies GlobalStylesMeta;
