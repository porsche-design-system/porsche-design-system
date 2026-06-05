import {
  radius2Xl,
  radius3Xl,
  radius4Xl,
  radiusFull,
  radiusLg,
  radiusMd,
  radiusSm,
  radiusXl,
  radiusXs,
} from '@porsche-design-system/tokens';
import { sizeLabel } from './shared';
import type { TailwindThemeVariable } from './types';

// Border — radius.
const radiusValues: Record<string, string | number> = {
  xs: radiusXs,
  sm: radiusSm,
  md: radiusMd,
  lg: radiusLg,
  xl: radiusXl,
  '2xl': radius2Xl,
  '3xl': radius3Xl,
  '4xl': radius4Xl,
  full: radiusFull,
};
export const radiusThemeVariables: TailwindThemeVariable[] = (
  ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'] as const
).map((size) => ({
  property: `--radius-${size}`,
  value: radiusValues[size],
  classes: [`.rounded-${size}`],
  description:
    size === 'full'
      ? 'Applies a **fully** rounded `border-radius`.'
      : `Applies a **${sizeLabel[size]}** \`border-radius\`.`,
  group: 'border',
}));
