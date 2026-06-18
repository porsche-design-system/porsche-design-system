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
import { prefix } from '../prefix';
import type { CssNode, TailwindThemeVariable } from '../types';

/**
 * Nested single source of truth for typography, grouped like `cssVariablesMeta`
 * (family / weight / lineHeight / text). Access a single variable via its path,
 * e.g. `typography.weight.semibold`, to read e.g. `typography.weight.semibold.property`.
 * The generated `@theme` block flattens these groups (plus the {@link textSizeCompanions}
 * below).
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
  group: 'typography',
};

export const typography = {
  family: {
    porscheNext: porscheNextFamily,
    sans: {
      property: '--font-sans',
      value: prefix(porscheNextFamily.property),
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

// Companion theme variables for each text size: the Tailwind-required `--*--line-height`
// pairing plus the `--text-base` alias for `xs`. Non-documented CSS-only plumbing: kept out of
// `tailwindMeta.theme.typography` (the storefront docs don't surface them) but appended to the
// `@theme` typography section by the CSS assembly in `css.ts`.
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
