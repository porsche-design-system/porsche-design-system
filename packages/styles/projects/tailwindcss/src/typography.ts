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
import type { TailwindThemeVariable } from './types';

/**
 * Nested single source of truth for typography, grouped like `cssVariablesMeta`
 * (family / weight / lineHeight / text). Access a single variable via its path,
 * e.g. `typography.weight.semibold`, to read e.g. `typography.weight.semibold.property`.
 * The `@theme` variables ({@link typographyThemeVariables}) are produced by
 * flattening the groups (plus the {@link textSizeCompanions} below).
 */
export const typography = {
  family: {
    porscheNext: {
      property: '--font-porsche-next',
      value: `var(${fontPorscheNextDynamicVar})`,
      classes: ['.font-porsche-next'],
      description:
        'Applies the **Porsche Next** font family along with fallback fonts. Automatically swaps to the locale-specific CJK stack (Simplified Chinese, Traditional Chinese, Japanese, Korean) via `:lang()` based on the nearest `lang` attribute.',
      comment:
        'This variable might be prefixed by Tailwind (e.g., --tw-font-porsche-next). By pointing it to our dynamic variable, we create a stable link.',
      group: 'typography',
    },
    sans: {
      property: '--font-sans',
      value: '--theme(--font-porsche-next)',
      classes: ['.font-sans'],
      description:
        'Aliases the Tailwind `--font-sans` variable to `--font-porsche-next`, so the built-in `.font-sans` utility automatically applies the Porsche Next typeface.',
      group: 'typography',
    },
  },
  weight: {
    normal: {
      property: '--font-weight-normal',
      value: fontWeightNormal,
      classes: ['.font-normal'],
      description: 'Applies the **regular** font weight optimized for the Porsche Next typeface.',
      group: 'typography',
    },
    semibold: {
      property: '--font-weight-semibold',
      value: fontWeightSemibold,
      classes: ['.font-semibold'],
      description: 'Applies the **semi-bold** font weight optimized for the Porsche Next typeface.',
      group: 'typography',
    },
    bold: {
      property: '--font-weight-bold',
      value: fontWeightBold,
      classes: ['.font-bold'],
      description: 'Applies the **bold** font weight optimized for the Porsche Next typeface.',
      group: 'typography',
    },
  },
  lineHeight: {
    normal: {
      property: '--leading-normal',
      value: leadingNormal,
      classes: ['.leading-normal'],
      description: 'Applies a dynamic default line height specifically optimized for the Porsche Next typeface.',
      group: 'typography',
    },
  },
  text: {
    '2xs': {
      property: '--text-2xs',
      value: typescale2Xs,
      classes: ['.text-2xs'],
      description: 'Applies the **2x-small** font size and line height optimized for the Porsche Next typeface.',
      group: 'typography',
    },
    xs: {
      property: '--text-xs',
      value: typescaleXs,
      classes: ['.text-xs'],
      description: 'Applies the **x-small** font size and line height optimized for the Porsche Next typeface.',
      group: 'typography',
    },
    sm: {
      property: '--text-sm',
      value: typescaleSm,
      classes: ['.text-sm'],
      description: 'Applies the **small** font size and line height optimized for the Porsche Next typeface.',
      group: 'typography',
    },
    md: {
      property: '--text-md',
      value: typescaleMd,
      classes: ['.text-md'],
      description: 'Applies the **medium** font size and line height optimized for the Porsche Next typeface.',
      group: 'typography',
    },
    lg: {
      property: '--text-lg',
      value: typescaleLg,
      classes: ['.text-lg'],
      description: 'Applies the **large** font size and line height optimized for the Porsche Next typeface.',
      group: 'typography',
    },
    xl: {
      property: '--text-xl',
      value: typescaleXl,
      classes: ['.text-xl'],
      description: 'Applies the **x-large** font size and line height optimized for the Porsche Next typeface.',
      group: 'typography',
    },
    '2xl': {
      property: '--text-2xl',
      value: typescale2Xl,
      classes: ['.text-2xl'],
      description: 'Applies the **2x-large** font size and line height optimized for the Porsche Next typeface.',
      group: 'typography',
    },
    '3xl': {
      property: '--text-3xl',
      value: typescale3Xl,
      classes: ['.text-3xl'],
      description: 'Applies the **3x-large** font size and line height optimized for the Porsche Next typeface.',
      group: 'typography',
    },
    '4xl': {
      property: '--text-4xl',
      value: typescale4Xl,
      classes: ['.text-4xl'],
      description: 'Applies the **4x-large** font size and line height optimized for the Porsche Next typeface.',
      group: 'typography',
    },
    '5xl': {
      property: '--text-5xl',
      value: typescale5Xl,
      classes: ['.text-5xl'],
      description: 'Applies the **5x-large** font size and line height optimized for the Porsche Next typeface.',
      group: 'typography',
    },
  },
} satisfies Record<string, Record<string, TailwindThemeVariable>>;

// Text-size theme variables — the nested `typography.text` group. Kept as a
// dedicated export because utilities consume it to build the `prose-*` font shorthands.
export const textSizeThemeVariables: TailwindThemeVariable[] = Object.values(typography.text);

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
  {
    property: '--text-2xs--line-height',
    value: leadingNormal,
    classes: ['.text-2xs'],
    description:
      'Sets the line height applied alongside `--text-2xs` by the `.text-2xs` utility for the **2x-small** type scale.',
    group: 'typography',
  },
  {
    property: '--text-xs--line-height',
    value: leadingNormal,
    classes: ['.text-xs'],
    description:
      'Sets the line height applied alongside `--text-xs` by the `.text-xs` utility for the **x-small** type scale.',
    group: 'typography',
  },
  {
    property: '--text-sm--line-height',
    value: leadingNormal,
    classes: ['.text-sm'],
    description:
      'Sets the line height applied alongside `--text-sm` by the `.text-sm` utility for the **small** type scale.',
    group: 'typography',
  },
  {
    property: '--text-md--line-height',
    value: leadingNormal,
    classes: ['.text-md'],
    description:
      'Sets the line height applied alongside `--text-md` by the `.text-md` utility for the **medium** type scale.',
    group: 'typography',
  },
  {
    property: '--text-lg--line-height',
    value: leadingNormal,
    classes: ['.text-lg'],
    description:
      'Sets the line height applied alongside `--text-lg` by the `.text-lg` utility for the **large** type scale.',
    group: 'typography',
  },
  {
    property: '--text-xl--line-height',
    value: leadingNormal,
    classes: ['.text-xl'],
    description:
      'Sets the line height applied alongside `--text-xl` by the `.text-xl` utility for the **x-large** type scale.',
    group: 'typography',
  },
  {
    property: '--text-2xl--line-height',
    value: leadingNormal,
    classes: ['.text-2xl'],
    description:
      'Sets the line height applied alongside `--text-2xl` by the `.text-2xl` utility for the **2x-large** type scale.',
    group: 'typography',
  },
  {
    property: '--text-3xl--line-height',
    value: leadingNormal,
    classes: ['.text-3xl'],
    description:
      'Sets the line height applied alongside `--text-3xl` by the `.text-3xl` utility for the **3x-large** type scale.',
    group: 'typography',
  },
  {
    property: '--text-4xl--line-height',
    value: leadingNormal,
    classes: ['.text-4xl'],
    description:
      'Sets the line height applied alongside `--text-4xl` by the `.text-4xl` utility for the **4x-large** type scale.',
    group: 'typography',
  },
  {
    property: '--text-5xl--line-height',
    value: leadingNormal,
    classes: ['.text-5xl'],
    description:
      'Sets the line height applied alongside `--text-5xl` by the `.text-5xl` utility for the **5x-large** type scale.',
    group: 'typography',
  },
];

// All typography theme variables — consumed by the @theme block. Flattened from
// the nested `typography` groups (family → weight → lineHeight → text), followed by
// the companions.
export const typographyThemeVariables: TailwindThemeVariable[] = [
  ...Object.values(typography.family),
  ...Object.values(typography.weight),
  ...Object.values(typography.lineHeight),
  ...textSizeThemeVariables,
  ...textSizeCompanions,
];
