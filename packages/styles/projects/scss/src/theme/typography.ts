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
import type { ScssVariable } from '../types';

/** The Porsche Next font families (base plus the locale-specific CJK stacks). */
export const family = {
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
export const weight = {
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
export const lineHeight = {
  normal: {
    name: '$leading-normal',
    value: leadingNormal,
    description: 'Holds a dynamic default line height specifically optimized for the Porsche Next typeface.',
    group: 'typography',
  },
} satisfies Record<string, ScssVariable>;

/** The fluid type scale (`$typescale-2xs` … `$typescale-5xl`) optimized for the Porsche Next typeface. */
export const text = {
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

/**
 * Typography theme variables grouped like the storefront API tables and the tailwind taxonomy
 * (`family` / `weight` / `lineHeight` / `text`). The `cjk-font-family` helper mixin and the
 * deprecated `$pds-font-*` aliases are plumbing — they live in the composition layer, not here.
 * The documented `prose-heading-*` / `prose-text-*` mixins land in the typography-mixins slice.
 */
export const typography = {
  family,
  weight,
  lineHeight,
  text,
} satisfies Record<'family' | 'weight' | 'lineHeight' | 'text', Record<string, ScssVariable>>;
