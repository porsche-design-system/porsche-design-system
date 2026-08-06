import {
  fontHyphenationStyle,
  fontPorscheNext,
  fontPorscheNextJa,
  fontPorscheNextKo,
  fontPorscheNextZhHans,
  fontPorscheNextZhHant,
  fontWeightBold,
  fontWeightNormal,
  fontWeightSemibold,
  getCJKFontFamilyStyle,
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
} from '../../src/font/';
import type { EmotionMeta, EmotionToken } from '../types';

const family = {
  porscheNext: {
    name: 'fontPorscheNext',
    description: 'Holds the **Porsche Next** font family along with fallback fonts.',
    value: fontPorscheNext,
  },
  porscheNextZhHans: {
    name: 'fontPorscheNextZhHans',
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Simplified Chinese**.',
    value: fontPorscheNextZhHans,
  },
  porscheNextZhHant: {
    name: 'fontPorscheNextZhHant',
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Traditional Chinese**.',
    value: fontPorscheNextZhHant,
  },
  porscheNextJa: {
    name: 'fontPorscheNextJa',
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Japanese**.',
    value: fontPorscheNextJa,
  },
  porscheNextKo: {
    name: 'fontPorscheNextKo',
    description: 'Holds the **Porsche Next** font family along with fallback fonts for **Korean**.',
    value: fontPorscheNextKo,
  },
} satisfies Record<string, EmotionToken>;

const weight = {
  normal: {
    name: 'fontWeightNormal',
    description: 'Holds the **normal** font weight optimized for the Porsche Next typeface.',
    value: fontWeightNormal,
  },
  semibold: {
    name: 'fontWeightSemibold',
    description: 'Holds the **semibold** font weight optimized for the Porsche Next typeface.',
    value: fontWeightSemibold,
  },
  bold: {
    name: 'fontWeightBold',
    description: 'Holds the **bold** font weight optimized for the Porsche Next typeface.',
    value: fontWeightBold,
  },
} satisfies Record<string, EmotionToken>;

const lineHeight = {
  normal: {
    name: 'leadingNormal',
    description: 'Holds a dynamic default line height specifically optimized for the Porsche Next typeface.',
    value: leadingNormal,
  },
} satisfies Record<string, EmotionToken>;

const size = {
  '2xs': {
    name: 'typescale2Xs',
    description: 'Holds the **2x-small** font size optimized for the Porsche Next typeface.',
    value: typescale2Xs,
  },
  xs: {
    name: 'typescaleXs',
    description: 'Holds the **x-small** font size optimized for the Porsche Next typeface.',
    value: typescaleXs,
  },
  sm: {
    name: 'typescaleSm',
    description: 'Holds the **small** font size optimized for the Porsche Next typeface.',
    value: typescaleSm,
  },
  md: {
    name: 'typescaleMd',
    description: 'Holds the **medium** font size optimized for the Porsche Next typeface.',
    value: typescaleMd,
  },
  lg: {
    name: 'typescaleLg',
    description: 'Holds the **large** font size optimized for the Porsche Next typeface.',
    value: typescaleLg,
  },
  xl: {
    name: 'typescaleXl',
    description: 'Holds the **x-large** font size optimized for the Porsche Next typeface.',
    value: typescaleXl,
  },
  '2xl': {
    name: 'typescale2Xl',
    description: 'Holds the **2x-large** font size optimized for the Porsche Next typeface.',
    value: typescale2Xl,
  },
  '3xl': {
    name: 'typescale3Xl',
    description: 'Holds the **3x-large** font size optimized for the Porsche Next typeface.',
    value: typescale3Xl,
  },
  '4xl': {
    name: 'typescale4Xl',
    description: 'Holds the **4x-large** font size optimized for the Porsche Next typeface.',
    value: typescale4Xl,
  },
  '5xl': {
    name: 'typescale5Xl',
    description: 'Holds the **5x-large** font size optimized for the Porsche Next typeface.',
    value: typescale5Xl,
  },
} satisfies Record<string, EmotionToken>;

export const font = {
  family,
  weight,
  lineHeight,
  size,
  // Emotion-specific helpers with no scss counterpart, kept keyed by export name.
  getCJKFontFamilyStyle: {
    name: 'getCJKFontFamilyStyle',
    description:
      "Applies locale-specific **Porsche Next** font stacks for **CJK** languages (Simplified Chinese, Traditional Chinese, Japanese, Korean) based on the element's `lang` attribute.",
    styles: getCJKFontFamilyStyle,
  },
  fontHyphenationStyle: {
    name: 'fontHyphenationStyle',
    description: 'Applies **hyphenation** styles (`overflow-wrap` and `hyphens`) to break and hyphenate long words.',
    styles: fontHyphenationStyle,
  },
} satisfies EmotionMeta['font'];
