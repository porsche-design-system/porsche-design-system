import {
  fontPorscheNext,
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
import type { CssVariableTokens } from '../types';

export const font = {
  family: {
    porscheNext: {
      type: 'font',
      property: '--p-font-porsche-next',
      description:
        'Applies the **Porsche Next** font family along with fallback fonts. Automatically swaps to the locale-specific CJK stack (Simplified Chinese, Traditional Chinese, Japanese, Korean) via `:lang()` based on the nearest `lang` attribute.',
      value: fontPorscheNext,
    },
    sans: {
      type: 'font',
      property: '--p-font-sans',
      description: 'Alias for `--p-font-porsche-next`, provided for Tailwind-style `font-sans` usage.',
      value: 'var(--p-font-porsche-next)',
    },
  },
  weight: {
    normal: {
      type: 'font',
      property: '--p-font-weight-normal',
      description: 'Applies the **regular** font weight optimized for the Porsche Next typeface.',
      value: fontWeightNormal,
    },
    semibold: {
      type: 'font',
      property: '--p-font-weight-semibold',
      description: 'Applies the **semi-bold** font weight optimized for the Porsche Next typeface.',
      value: fontWeightSemibold,
    },
    bold: {
      type: 'font',
      property: '--p-font-weight-bold',
      description: 'Applies the **bold** font weight optimized for the Porsche Next typeface.',
      value: fontWeightBold,
    },
  },
  lineHeight: {
    normal: {
      type: 'font',
      property: '--p-leading-normal',
      description: 'Applies a dynamic default line height specifically optimized for the Porsche Next typeface.',
      value: leadingNormal,
    },
  },
  size: {
    '2xs': {
      type: 'font',
      property: '--p-typescale-2xs',
      description: 'Applies the **2x-small** font size for the Porsche Next typeface.',
      value: typescale2Xs,
    },
    xs: {
      type: 'font',
      property: '--p-typescale-xs',
      description: 'Applies the **x-small** font size for the Porsche Next typeface.',
      value: typescaleXs,
    },
    sm: {
      type: 'font',
      property: '--p-typescale-sm',
      description: 'Applies the **small** font size for the Porsche Next typeface.',
      value: typescaleSm,
    },
    md: {
      type: 'font',
      property: '--p-typescale-md',
      description: 'Applies the **medium** font size for the Porsche Next typeface.',
      value: typescaleMd,
    },
    lg: {
      type: 'font',
      property: '--p-typescale-lg',
      description: 'Applies the **large** font size for the Porsche Next typeface.',
      value: typescaleLg,
    },
    xl: {
      type: 'font',
      property: '--p-typescale-xl',
      description: 'Applies the **x-large** font size for the Porsche Next typeface.',
      value: typescaleXl,
    },
    '2xl': {
      type: 'font',
      property: '--p-typescale-2xl',
      description: 'Applies the **2x-large** font size for the Porsche Next typeface.',
      value: typescale2Xl,
    },
    '3xl': {
      type: 'font',
      property: '--p-typescale-3xl',
      description: 'Applies the **3x-large** font size for the Porsche Next typeface.',
      value: typescale3Xl,
    },
    '4xl': {
      type: 'font',
      property: '--p-typescale-4xl',
      description: 'Applies the **4x-large** font size for the Porsche Next typeface.',
      value: typescale4Xl,
    },
    '5xl': {
      type: 'font',
      property: '--p-typescale-5xl',
      description: 'Applies the **5x-large** font size for the Porsche Next typeface.',
      value: typescale5Xl,
    },
  },
} satisfies CssVariableTokens['font'];
