import {
  fontPorscheNext,
  fontPorscheNextJa,
  fontPorscheNextKo,
  fontPorscheNextZhHans,
  fontPorscheNextZhHant,
  fontWeightBold,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  typescale2Xl,
  typescale2Xs,
  typescale3Xl,
  typescale4Xl,
  typescale5Xl,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
  typescaleXs,
} from '@porsche-design-system/tokens';
import { prefix } from '../prefix';
import type { CssNode, CssRule, TailwindCatalog, TailwindThemeVariable } from '../types';

// The "Bridge Variable" pointing the Tailwind `--font-porsche-next` theme variable
// to the dynamic, locale-aware font stack. Shared as a single source so the base
// layer and the typography theme variable stay in sync.
export const fontPorscheNextDynamicVar = '--_font-porsche-next-dynamic';

// The `@layer base` block defining the dynamic Porsche Next font variable and its
// language-specific overrides. The `:root, :host` rule provides the default font,
// while the `:lang(…)` rules switch the variable for CJK locales.
//
// Tailwind v4 won't add a prefix to variables defined outside the `@theme` block,
// so we override the "Bridge Variable" here. Since the Tailwind theme variable
// points to `--_font-porsche-next-dynamic`, the font updates even if the utility
// class is prefixed.
export const fontBaseLayer: CssRule = {
  selector: '@layer base',
  declarations: [
    {
      raw: `/*
    Tailwind v4 won't add a prefix to variables defined outside the @theme block.
    We override the "Bridge Variable". Since the Tailwind theme variable
    points here, the font will update even if the utility class is prefixed.
  */`,
    },
    {
      selector: ':root, :host',
      declarations: [{ property: fontPorscheNextDynamicVar, value: fontPorscheNext }],
    },
    {
      comment: 'Simplified Chinese',
      selector: ':lang(zh-Hans),\n:lang(zh-CN),\n:lang(zh-SG)',
      declarations: [{ property: fontPorscheNextDynamicVar, value: fontPorscheNextZhHans }],
    },
    {
      comment: 'Traditional Chinese',
      selector: ':lang(zh-Hant),\n:lang(zh-TW),\n:lang(zh-HK),\n:lang(zh-MO)',
      declarations: [{ property: fontPorscheNextDynamicVar, value: fontPorscheNextZhHant }],
    },
    {
      comment: 'Japanese',
      selector: ':lang(ja)',
      declarations: [{ property: fontPorscheNextDynamicVar, value: fontPorscheNextJa }],
    },
    {
      comment: 'Korean',
      selector: ':lang(ko)',
      declarations: [{ property: fontPorscheNextDynamicVar, value: fontPorscheNextKo }],
    },
  ],
};

/**
 * Nested single source of truth for the font token variables, grouped like `tokensMeta`
 * (`family` / `weight` / `lineHeight` / `size`). Access a single variable via its path,
 * e.g. `font.weight.semibold`, to read e.g. `font.weight.semibold.property`. The generated
 * `@theme` block flattens these groups (plus the {@link textSizeCompanions} below). The prose
 * shorthands live in `utilities/{heading,text,display}.ts` (the `typography` utility domain).
 */
// Named on its own because `sans` aliases it via the prefix helper — referencing the real
// variable rather than re-deriving its property name.
const porscheNextFamily: TailwindThemeVariable = {
  property: '--font-porsche-next',
  value: `var(${fontPorscheNextDynamicVar})`,
  classes: ['.font-porsche-next'],
  description:
    'Applies the **Porsche Next** font family along with fallback fonts. Automatically swaps to the locale-specific CJK stack (Simplified Chinese, Traditional Chinese, Japanese, Korean) via `:lang()` based on the nearest `lang` attribute.',
  comment:
    'This variable might be prefixed by Tailwind (e.g., --tw-font-porsche-next). By pointing it to our dynamic variable, we create a stable link.',
};

export const font = {
  family: {
    porscheNext: porscheNextFamily,
    sans: {
      property: '--font-sans',
      value: prefix(porscheNextFamily.property),
      classes: ['.font-sans'],
      description:
        'Aliases the Tailwind `--font-sans` variable to `--font-porsche-next`, so the built-in `.font-sans` utility automatically applies the Porsche Next typeface.',
    },
  },
  weight: {
    normal: {
      property: '--font-weight-normal',
      value: fontWeightNormal,
      classes: ['.font-normal'],
      description: 'Applies the **regular** font weight optimized for the Porsche Next typeface.',
    },
    semibold: {
      property: '--font-weight-semibold',
      value: fontWeightSemibold,
      classes: ['.font-semibold'],
      description: 'Applies the **semi-bold** font weight optimized for the Porsche Next typeface.',
    },
    bold: {
      property: '--font-weight-bold',
      value: fontWeightBold,
      classes: ['.font-bold'],
      description: 'Applies the **bold** font weight optimized for the Porsche Next typeface.',
    },
  },
  lineHeight: {
    normal: {
      property: '--leading-normal',
      value: leadingNormal,
      classes: ['.leading-normal'],
      description: 'Applies a dynamic default line height specifically optimized for the Porsche Next typeface.',
    },
  },
  size: {
    '2xs': {
      property: '--text-2xs',
      value: typescale2Xs,
      classes: ['.text-2xs'],
      description: 'Applies the **2x-small** font size and line height optimized for the Porsche Next typeface.',
    },
    xs: {
      property: '--text-xs',
      value: typescaleXs,
      classes: ['.text-xs'],
      description: 'Applies the **x-small** font size and line height optimized for the Porsche Next typeface.',
    },
    sm: {
      property: '--text-sm',
      value: typescaleSm,
      classes: ['.text-sm'],
      description: 'Applies the **small** font size and line height optimized for the Porsche Next typeface.',
    },
    md: {
      property: '--text-md',
      value: typescaleMd,
      classes: ['.text-md'],
      description: 'Applies the **medium** font size and line height optimized for the Porsche Next typeface.',
    },
    lg: {
      property: '--text-lg',
      value: typescaleLg,
      classes: ['.text-lg'],
      description: 'Applies the **large** font size and line height optimized for the Porsche Next typeface.',
    },
    xl: {
      property: '--text-xl',
      value: typescaleXl,
      classes: ['.text-xl'],
      description: 'Applies the **x-large** font size and line height optimized for the Porsche Next typeface.',
    },
    '2xl': {
      property: '--text-2xl',
      value: typescale2Xl,
      classes: ['.text-2xl'],
      description: 'Applies the **2x-large** font size and line height optimized for the Porsche Next typeface.',
    },
    '3xl': {
      property: '--text-3xl',
      value: typescale3Xl,
      classes: ['.text-3xl'],
      description: 'Applies the **3x-large** font size and line height optimized for the Porsche Next typeface.',
    },
    '4xl': {
      property: '--text-4xl',
      value: typescale4Xl,
      classes: ['.text-4xl'],
      description: 'Applies the **4x-large** font size and line height optimized for the Porsche Next typeface.',
    },
    '5xl': {
      property: '--text-5xl',
      value: typescale5Xl,
      classes: ['.text-5xl'],
      description: 'Applies the **5x-large** font size and line height optimized for the Porsche Next typeface.',
    },
  },
} satisfies TailwindCatalog;

// Companion theme variables for each text size: the Tailwind-required `--*--line-height`
// pairing plus the `--text-base` alias for `xs`. Non-documented CSS-only plumbing: kept out of
// `tailwindMeta.font` (the storefront docs don't surface them) but appended to the `@theme`
// typography section by the CSS assembly in `css/index.ts`.
export const textSizeCompanions: CssNode[] = [
  { property: '--text-base', value: typescaleSm },
  { property: '--text-base--line-height', value: leadingNormal },
  { property: '--text-2xs--line-height', value: leadingNormal },
  { property: '--text-xs--line-height', value: leadingNormal },
  { property: '--text-sm--line-height', value: leadingNormal },
  { property: '--text-md--line-height', value: leadingNormal },
  { property: '--text-lg--line-height', value: leadingNormal },
  { property: '--text-xl--line-height', value: leadingNormal },
  { property: '--text-2xl--line-height', value: leadingNormal },
  { property: '--text-3xl--line-height', value: leadingNormal },
  { property: '--text-4xl--line-height', value: leadingNormal },
  { property: '--text-5xl--line-height', value: leadingNormal },
];
