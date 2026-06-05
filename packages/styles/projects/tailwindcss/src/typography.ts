import {
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
import { fontPorscheNextDynamicVar } from './font';
import { sizeLabel } from './shared';
import type { CssNode, TailwindThemeVariable } from './types';

// Typography — font family.
export const fontFamilyThemeVariables: TailwindThemeVariable[] = [
  {
    property: '--font-porsche-next',
    value: `var(${fontPorscheNextDynamicVar})`,
    classes: ['.font-porsche-next'],
    description:
      'Applies the **Porsche Next** font family along with fallback fonts. Automatically swaps to the locale-specific CJK stack (Simplified Chinese, Traditional Chinese, Japanese, Korean) via `:lang()` based on the nearest `lang` attribute.',
    group: 'typography',
  },
];

// Typography — font weights.
export const fontWeightThemeVariables: TailwindThemeVariable[] = [
  {
    property: '--font-weight-normal',
    value: fontWeightNormal,
    classes: ['.font-normal'],
    description: 'Applies the **regular** font weight optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  {
    property: '--font-weight-semibold',
    value: fontWeightSemibold,
    classes: ['.font-semibold'],
    description: 'Applies the **semi-bold** font weight optimized for the Porsche Next typeface.',
    group: 'typography',
  },
  {
    property: '--font-weight-bold',
    value: fontWeightBold,
    classes: ['.font-bold'],
    description: 'Applies the **bold** font weight optimized for the Porsche Next typeface.',
    group: 'typography',
  },
];

// Typography — line height.
export const leadingThemeVariables: TailwindThemeVariable[] = [
  {
    property: '--leading-normal',
    value: leadingNormal,
    classes: ['.leading-normal'],
    description: 'Applies a dynamic default line height specifically optimized for the Porsche Next typeface.',
    group: 'typography',
  },
];

// Typography — font sizes (each ships with a matching `--*--line-height` companion).
const textSizeValues: Record<string, string | number> = {
  '2xs': typescale2Xs,
  xs: typescaleXs,
  sm: typescaleSm,
  md: typescaleMd,
  lg: typescaleLg,
  xl: typescaleXl,
  '2xl': typescale2Xl,
  '3xl': typescale3Xl,
  '4xl': typescale4Xl,
  '5xl': typescale5Xl,
};
export const textSizeThemeVariables: TailwindThemeVariable[] = (
  ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const
).map((size) => ({
  property: `--text-${size}`,
  value: textSizeValues[size],
  classes: [`.text-${size}`],
  description: `Applies the **${sizeLabel[size]}** font size and line height optimized for the Porsche Next typeface.`,
  group: 'typography',
}));

// Font sizes interleaved with their `--*--line-height` companions (plus the Tailwind `--text-base` alias).
export const textSizeNodes: CssNode[] = textSizeThemeVariables.flatMap((variable) => {
  const size = variable.property.replace('--text-', '');
  const nodes: CssNode[] = [variable, { raw: `--text-${size}--line-height: ${leadingNormal};` }];
  if (size === 'xs') {
    nodes.push({ raw: `--text-base: ${typescaleSm};` }, { raw: `--text-base--line-height: ${leadingNormal};` });
  }
  return nodes;
});
