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
import { scssIdentifier } from '../deprecation';
import type { ScssCatalog, ScssMixin, ScssVariable } from '../types';

/** The Porsche Next font families (base plus the locale-specific CJK stacks). */
const family = {
  porscheNext: {
    name: '$font-porsche-next',
    value: fontPorscheNext,
    description: 'Holds the **Porsche Next** font family along with fallback fonts.',
  },
  porscheNextZhHans: {
    name: '$font-porsche-next-zh-hans',
    value: fontPorscheNextZhHans,
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Simplified Chinese**.',
  },
  porscheNextZhHant: {
    name: '$font-porsche-next-zh-hant',
    value: fontPorscheNextZhHant,
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Traditional Chinese**.',
  },
  porscheNextJa: {
    name: '$font-porsche-next-ja',
    value: fontPorscheNextJa,
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Japanese**.',
  },
  porscheNextKo: {
    name: '$font-porsche-next-ko',
    value: fontPorscheNextKo,
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Korean**.',
  },
} satisfies Record<string, ScssVariable>;

/** The font weights optimized for the Porsche Next typeface. */
const weight = {
  normal: {
    name: '$font-weight-normal',
    value: fontWeightNormal,
    description: 'Holds the **normal** font weight optimized for the Porsche Next typeface.',
  },
  semibold: {
    name: '$font-weight-semibold',
    value: fontWeightSemibold,
    description: 'Holds the **semibold** font weight optimized for the Porsche Next typeface.',
  },
  bold: {
    name: '$font-weight-bold',
    value: fontWeightBold,
    description: 'Holds the **bold** font weight optimized for the Porsche Next typeface.',
  },
} satisfies Record<string, ScssVariable>;

/** The dynamic default line height optimized for the Porsche Next typeface. */
const lineHeight = {
  normal: {
    name: '$leading-normal',
    value: leadingNormal,
    description: 'Holds a dynamic default line height specifically optimized for the Porsche Next typeface.',
  },
} satisfies Record<string, ScssVariable>;

/** The fluid type scale (`$typescale-2xs` … `$typescale-5xl`) optimized for the Porsche Next typeface. */
const size = {
  '2xs': {
    name: '$typescale-2xs',
    value: typescale2Xs,
    description: 'Holds the **2x-small** font size optimized for the Porsche Next typeface.',
  },
  xs: {
    name: '$typescale-xs',
    value: typescaleXs,
    description: 'Holds the **x-small** font size optimized for the Porsche Next typeface.',
  },
  sm: {
    name: '$typescale-sm',
    value: typescaleSm,
    description: 'Holds the **small** font size optimized for the Porsche Next typeface.',
  },
  md: {
    name: '$typescale-md',
    value: typescaleMd,
    description: 'Holds the **medium** font size optimized for the Porsche Next typeface.',
  },
  lg: {
    name: '$typescale-lg',
    value: typescaleLg,
    description: 'Holds the **large** font size optimized for the Porsche Next typeface.',
  },
  xl: {
    name: '$typescale-xl',
    value: typescaleXl,
    description: 'Holds the **x-large** font size optimized for the Porsche Next typeface.',
  },
  '2xl': {
    name: '$typescale-2xl',
    value: typescale2Xl,
    description: 'Holds the **2x-large** font size optimized for the Porsche Next typeface.',
  },
  '3xl': {
    name: '$typescale-3xl',
    value: typescale3Xl,
    description: 'Holds the **3x-large** font size optimized for the Porsche Next typeface.',
  },
  '4xl': {
    name: '$typescale-4xl',
    value: typescale4Xl,
    description: 'Holds the **4x-large** font size optimized for the Porsche Next typeface.',
  },
  '5xl': {
    name: '$typescale-5xl',
    value: typescale5Xl,
    description: 'Holds the **5x-large** font size optimized for the Porsche Next typeface.',
  },
} satisfies Record<string, ScssVariable>;

/** The `cjk-font-family` helper mixin: swaps to the locale-specific font stack by nearest `lang` attribute. Referenced via `ref('font')` from the prose helpers (plumbing). */
export const cjkFontFamily: ScssMixin = {
  name: 'cjk-font-family',
  description: 'Swaps to the locale-specific CJK font stack based on the nearest `lang` attribute.',
  raw: `  /* Simplified Chinese */
  &:lang(zh-Hans),
  &:lang(zh-CN),
  &:lang(zh-SG) {
    font-family: ${family.porscheNextZhHans.name};
  }

  /* Traditional Chinese */
  &:lang(zh-Hant),
  &:lang(zh-TW),
  &:lang(zh-HK),
  &:lang(zh-MO) {
    font-family: ${family.porscheNextZhHant.name};
  }

  /* Japanese */
  &:lang(ja) {
    font-family: ${family.porscheNextJa.name};
  }

  /* Korean */
  &:lang(ko) {
    font-family: ${family.porscheNextKo.name};
  }`,
};

/** Font declarations, grouped like the storefront API tables, each group followed by its deprecated `$pds-font-*` aliases. */
export const font = {
  family: {
    ...family,
    family: {
      name: '$pds-font-family',
      value: fontPorscheNext,
      description: 'Holds the **Porsche Next** font family.',
      deprecation: { replacement: scssIdentifier(family.porscheNext) },
    },
  },
  weight: {
    ...weight,
    weightRegular: {
      name: '$pds-font-weight-regular',
      value: fontWeightNormal,
      description: 'Holds the **normal** font weight optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(weight.normal) },
    },
    weightSemiBold: {
      name: '$pds-font-weight-semi-bold',
      value: fontWeightSemibold,
      description: 'Holds the **semibold** font weight optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(weight.semibold) },
    },
    weightBold: {
      name: '$pds-font-weight-bold',
      value: fontWeightBold,
      description: 'Holds the **bold** font weight optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(weight.bold) },
    },
  },
  lineHeight: {
    ...lineHeight,
    lineHeight: {
      name: '$pds-font-line-height',
      value: leadingNormal,
      description: 'Holds a dynamic default line height specifically optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(lineHeight.normal) },
    },
  },
  size: {
    ...size,
    sizeTextXxSmall: {
      name: '$pds-font-size-text-xx-small',
      value: typescale2Xs,
      description: 'Holds the **2x-small text** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size['2xs']) },
    },
    sizeTextXSmall: {
      name: '$pds-font-size-text-x-small',
      value: typescaleXs,
      description: 'Holds the **x-small text** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size.xs) },
    },
    sizeTextSmall: {
      name: '$pds-font-size-text-small',
      value: typescaleSm,
      description: 'Holds the **small text** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size.sm) },
    },
    sizeTextMedium: {
      name: '$pds-font-size-text-medium',
      value: typescaleMd,
      description: 'Holds the **medium text** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size.md) },
    },
    sizeTextLarge: {
      name: '$pds-font-size-text-large',
      value: typescaleLg,
      description: 'Holds the **large text** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size.lg) },
    },
    sizeTextXLarge: {
      name: '$pds-font-size-text-x-large',
      value: typescaleXl,
      description: 'Holds the **x-large text** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size.xl) },
    },
    sizeHeadingSmall: {
      name: '$pds-font-size-heading-small',
      value: typescaleSm,
      description: 'Holds the **small heading** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size.sm) },
    },
    sizeHeadingMedium: {
      name: '$pds-font-size-heading-medium',
      value: typescaleMd,
      description: 'Holds the **medium heading** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size.md) },
    },
    sizeHeadingLarge: {
      name: '$pds-font-size-heading-large',
      value: typescaleLg,
      description: 'Holds the **large heading** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size.lg) },
    },
    sizeHeadingXLarge: {
      name: '$pds-font-size-heading-x-large',
      value: typescaleXl,
      description: 'Holds the **x-large heading** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size.xl) },
    },
    sizeHeadingXxLarge: {
      name: '$pds-font-size-heading-xx-large',
      value: typescale2Xl,
      description: 'Holds the **2x-large heading** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size['2xl']) },
    },
    sizeDisplaySmall: {
      name: '$pds-font-size-display-small',
      value: 'clamp(1.8rem, 2.41vw + 1.32rem, 4.21rem)',
      description: 'Holds the **small display** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size['3xl']) },
    },
    sizeDisplayMedium: {
      name: '$pds-font-size-display-medium',
      value: 'clamp(2.03rem, 3.58vw + 1.31rem, 5.61rem)',
      description: 'Holds the **medium display** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size['4xl']) },
    },
    sizeDisplayLarge: {
      name: '$pds-font-size-display-large',
      value: 'clamp(2.28rem, 5.2vw + 1.24rem, 7.48rem)',
      description: 'Holds the **large display** font size optimized for the Porsche Next typeface.',
      deprecation: { replacement: scssIdentifier(size['5xl']) },
    },
  },
  hyphenationStyleOverflowWrap: {
    name: '$pds-font-hyphenation-style-overflow-wrap',
    value: 'break-word',
    description: 'Holds the `overflow-wrap` value used for hyphenation. The current scale has no equivalent.',
    deprecation: {},
  },
  hyphenationStyleHyphens: {
    name: '$pds-font-hyphenation-style-hyphens',
    value: 'var(--p-hyphens, auto)',
    description: 'Holds the `hyphens` value used for hyphenation. The current scale has no equivalent.',
    deprecation: {},
  },
  styleNormal: {
    name: '$pds-font-style-normal',
    value: 'normal',
    description: 'Holds the **normal** `font-style`. The current scale has no equivalent.',
    deprecation: {},
  },
  styleItalic: {
    name: '$pds-font-style-italic',
    value: 'italic',
    description: 'Holds the **italic** `font-style`. The current scale has no equivalent.',
    deprecation: {},
  },
  variant: {
    name: '$pds-font-variant',
    value: 'normal',
    description: 'Holds the **normal** `font-variant`. The current scale has no equivalent.',
    deprecation: {},
  },
} satisfies ScssCatalog;
