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

/** A single typography entry without its `group` (always `typography`). */
type TypographyConfig = Omit<TailwindThemeVariable, 'group'>;

const makeText = (size: string, value: string | number): TypographyConfig => ({
  property: `--text-${size}`,
  value,
  classes: [`.text-${size}`],
  description: `Applies the **${sizeLabel[size]}** font size and line height optimized for the Porsche Next typeface.`,
});

/**
 * Nested single source of truth for typography, grouped like `cssVariablesMeta`
 * (family / weight / lineHeight / text). Access a single variable via its path,
 * e.g. `typography.weight.semibold`, to read e.g. `typography.weight.semibold.property`.
 * The `@theme` variables ({@link typographyThemeVariables}) are produced by
 * flat-mapping the groups (plus the {@link textSizeCompanions} below).
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
    },
    sans: {
      property: '--font-sans',
      value: '--theme(--font-porsche-next)',
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
  text: {
    '2xs': makeText('2xs', typescale2Xs),
    xs: makeText('xs', typescaleXs),
    sm: makeText('sm', typescaleSm),
    md: makeText('md', typescaleMd),
    lg: makeText('lg', typescaleLg),
    xl: makeText('xl', typescaleXl),
    '2xl': makeText('2xl', typescale2Xl),
    '3xl': makeText('3xl', typescale3Xl),
    '4xl': makeText('4xl', typescale4Xl),
    '5xl': makeText('5xl', typescale5Xl),
  },
};

// Text-size theme variables — mapped from the nested `typography.text` group.
// Kept as a dedicated export because utilities consume it to build the
// `prose-*` font shorthands.
export const textSizeThemeVariables: TailwindThemeVariable[] = Object.values(typography.text).map((config) => ({
  ...config,
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

// All typography theme variables — consumed by the @theme block. Flat-mapped from
// the nested `typography` groups (family → weight → lineHeight → text), followed by
// the companions.
export const typographyThemeVariables: TailwindThemeVariable[] = [
  ...Object.values(typography.family).map((config) => ({ ...config, group: 'typography' as const })),
  ...Object.values(typography.weight).map((config) => ({ ...config, group: 'typography' as const })),
  ...Object.values(typography.lineHeight).map((config) => ({ ...config, group: 'typography' as const })),
  ...textSizeThemeVariables,
  ...textSizeCompanions,
];
