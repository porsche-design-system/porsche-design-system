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
import type { ScssMeta, ScssRaw, ScssVariable } from '../types';

/** The Porsche Next font families (base plus the locale-specific CJK stacks). */
const family = {
  porscheNext: {
    name: '$font-porsche-next',
    value: fontPorscheNext,
    description: 'Holds the **Porsche Next** font family along with fallback fonts.',
    group: 'typography',
  },
  porscheNextZhHans: {
    name: '$font-porsche-next-zh-hans',
    value: fontPorscheNextZhHans,
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Simplified Chinese**.',
    group: 'typography',
  },
  porscheNextZhHant: {
    name: '$font-porsche-next-zh-hant',
    value: fontPorscheNextZhHant,
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Traditional Chinese**.',
    group: 'typography',
  },
  porscheNextJa: {
    name: '$font-porsche-next-ja',
    value: fontPorscheNextJa,
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Japanese**.',
    group: 'typography',
  },
  porscheNextKo: {
    name: '$font-porsche-next-ko',
    value: fontPorscheNextKo,
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Korean**.',
    group: 'typography',
  },
} satisfies Record<string, ScssVariable>;

/** The font weights optimized for the Porsche Next typeface. */
const weight = {
  normal: {
    name: '$font-weight-normal',
    value: fontWeightNormal,
    description: 'Holds the **normal** font weight optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  semibold: {
    name: '$font-weight-semibold',
    value: fontWeightSemibold,
    description: 'Holds the **semibold** font weight optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  bold: {
    name: '$font-weight-bold',
    value: fontWeightBold,
    description: 'Holds the **bold** font weight optimized for the Porsche Next typeface.',
    group: 'typography',
  },
} satisfies Record<string, ScssVariable>;

/** The dynamic default line height optimized for the Porsche Next typeface. */
const lineHeight = {
  normal: {
    name: '$leading-normal',
    value: leadingNormal,
    description: 'Holds a dynamic default line height specifically optimized for the Porsche Next typeface.',
    group: 'typography',
  },
} satisfies Record<string, ScssVariable>;

/** The fluid type scale (`$typescale-2xs` … `$typescale-5xl`) optimized for the Porsche Next typeface. */
const size = {
  '2xs': {
    name: '$typescale-2xs',
    value: typescale2Xs,
    description: 'Holds the **2x-small** font size optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  xs: {
    name: '$typescale-xs',
    value: typescaleXs,
    description: 'Holds the **x-small** font size optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  sm: {
    name: '$typescale-sm',
    value: typescaleSm,
    description: 'Holds the **small** font size optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  md: {
    name: '$typescale-md',
    value: typescaleMd,
    description: 'Holds the **medium** font size optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  lg: {
    name: '$typescale-lg',
    value: typescaleLg,
    description: 'Holds the **large** font size optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  xl: {
    name: '$typescale-xl',
    value: typescaleXl,
    description: 'Holds the **x-large** font size optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  '2xl': {
    name: '$typescale-2xl',
    value: typescale2Xl,
    description: 'Holds the **2x-large** font size optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  '3xl': {
    name: '$typescale-3xl',
    value: typescale3Xl,
    description: 'Holds the **3x-large** font size optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  '4xl': {
    name: '$typescale-4xl',
    value: typescale4Xl,
    description: 'Holds the **4x-large** font size optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  '5xl': {
    name: '$typescale-5xl',
    value: typescale5Xl,
    description: 'Holds the **5x-large** font size optimized for the Porsche Next typeface.',
    group: 'typography',
  },
} satisfies Record<string, ScssVariable>;

/** Font token variables (`family` / `weight` / `lineHeight` / `size`). The prose mixins live in `utilities/typography.ts`. */
export const font = {
  family,
  weight,
  lineHeight,
  size,
} satisfies ScssMeta['font'];

/** Name-only handle for `ref('font')` to reference the `cjk-font-family` mixin (the mixin itself stays a `ScssRaw`). */
export const cjkFontFamily = { name: 'cjk-font-family' };

/** The `cjk-font-family` helper mixin: swaps to the locale-specific font stack by nearest `lang` attribute (plumbing). */
export const cjkFontFamilyMixin: ScssRaw = {
  raw: `@mixin cjk-font-family {
  /* Simplified Chinese */
  &:lang(zh-Hans),
  &:lang(zh-CN),
  &:lang(zh-SG) {
    font-family: $font-porsche-next-zh-hans;
  }

  /* Traditional Chinese */
  &:lang(zh-Hant),
  &:lang(zh-TW),
  &:lang(zh-HK),
  &:lang(zh-MO) {
    font-family: $font-porsche-next-zh-hant;
  }

  /* Japanese */
  &:lang(ja) {
    font-family: $font-porsche-next-ja;
  }

  /* Korean */
  &:lang(ko) {
    font-family: $font-porsche-next-ko;
  }
}`,
};

/**
 * Deprecated `$pds-font-*` aliases (plumbing).
 * @deprecated Use `$font-porsche-next`, `$typescale-*`, `$font-weight-*`, `$leading-normal`.
 */
export const fontDeprecatedAliases: ScssRaw = {
  raw: `$pds-font-family: ${fontPorscheNext}; /* alias (deprecated) */
$pds-font-hyphenation-style-overflow-wrap: break-word; /* alias (deprecated) */
$pds-font-hyphenation-style-hyphens: var(--p-hyphens, auto); /* alias (deprecated) */
$pds-font-line-height: ${leadingNormal}; /* alias (deprecated) */
$pds-font-size-text-xx-small: ${typescale2Xs}; /* alias (deprecated) */
$pds-font-size-text-x-small: ${typescaleXs}; /* alias (deprecated) */
$pds-font-size-text-small: ${typescaleSm}; /* alias (deprecated) */
$pds-font-size-text-medium: ${typescaleMd}; /* alias (deprecated) */
$pds-font-size-text-large: ${typescaleLg}; /* alias (deprecated) */
$pds-font-size-text-x-large: ${typescaleXl}; /* alias (deprecated) */
$pds-font-size-heading-small: ${typescaleSm}; /* alias (deprecated) */
$pds-font-size-heading-medium: ${typescaleMd}; /* alias (deprecated) */
$pds-font-size-heading-large: ${typescaleLg}; /* alias (deprecated) */
$pds-font-size-heading-x-large: ${typescaleXl}; /* alias (deprecated) */
$pds-font-size-heading-xx-large: ${typescale2Xl}; /* alias (deprecated) */
$pds-font-size-display-small: clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem); /* alias (deprecated) */
$pds-font-size-display-medium: clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem); /* alias (deprecated) */
$pds-font-size-display-large: clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem); /* alias (deprecated) */
$pds-font-style-normal: normal; /* alias (deprecated) */
$pds-font-style-italic: italic; /* alias (deprecated) */
$pds-font-variant: normal; /* alias (deprecated) */
$pds-font-weight-regular: ${fontWeightNormal}; /* alias (deprecated) */
$pds-font-weight-semi-bold: ${fontWeightSemibold}; /* alias (deprecated) */
$pds-font-weight-bold: ${fontWeightBold}; /* alias (deprecated) */`,
};
