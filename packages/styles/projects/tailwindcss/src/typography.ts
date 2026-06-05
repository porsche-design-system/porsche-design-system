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
import type { TailwindThemeVariable } from './types';

// Typography — font family.
export const fontFamilyThemeVariables: TailwindThemeVariable[] = [
  {
    property: '--font-porsche-next',
    value: `var(${fontPorscheNextDynamicVar})`,
    classes: ['.font-porsche-next'],
    description:
      'Applies the **Porsche Next** font family along with fallback fonts. Automatically swaps to the locale-specific CJK stack (Simplified Chinese, Traditional Chinese, Japanese, Korean) via `:lang()` based on the nearest `lang` attribute.',
    group: 'typography',
    comment:
      'This variable might be prefixed by Tailwind (e.g., --tw-font-porsche-next). By pointing it to our dynamic variable, we create a stable link.',
  },
];

export const fontSansThemeVariable: TailwindThemeVariable = {
  property: '--font-sans',
  value: '--theme(--font-porsche-next)',
  classes: ['.font-sans'],
  description:
    'Aliases the Tailwind `--font-sans` variable to `--font-porsche-next`, so the built-in `.font-sans` utility automatically applies the Porsche Next typeface.',
  group: 'typography',
};

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
  group: 'typography' as const,
}));

// Companion theme variables for each text size: the Tailwind-required `--*--line-height`
// pairing plus the `--text-base` alias for `xs`. Kept separate from `typographyThemeVariables`
// so storefront docs can choose whether to surface them.
export const textSizeCompanions: TailwindThemeVariable[] = [
  {
    property: '--text-base',
    value: typescaleSm,
    classes: ['.text-base'],
    description:
      'Aliases the Tailwind `--text-base` variable to the **small** typescale, making `.text-base` equivalent to `.text-sm` in the Porsche Next type scale.',
    group: 'typography',
  },
  {
    property: '--text-base--line-height',
    value: leadingNormal,
    classes: ['.text-base'],
    description: 'Sets the line height applied alongside `--text-base` by the `.text-base` utility.',
    group: 'typography',
  },
  ...(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const).map((size) => ({
    property: `--text-${size}--line-height`,
    value: leadingNormal,
    classes: [`.text-${size}`],
    description: `Sets the line height applied alongside \`--text-${size}\` by the \`.text-${size}\` utility for the **${sizeLabel[size]}** type scale.`,
    group: 'typography' as const,
  })),
];

// All typography theme variables — consumed by the @theme block.
export const typographyThemeVariables: TailwindThemeVariable[] = [
  ...fontFamilyThemeVariables,
  fontSansThemeVariable,
  ...fontWeightThemeVariables,
  ...leadingThemeVariables,
  ...textSizeThemeVariables,
  ...textSizeCompanions,
];
