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
import { blurThemeVariables } from './blur';
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

// Border — width.
export const borderWidthThemeVariables: TailwindThemeVariable[] = [
  {
    property: '--default-border-width',
    value: '1px',
    description: 'Default border width applied globally via the Tailwind `@theme` block.',
    group: 'border',
  },
  {
    property: '--border-width-regular',
    value: '2px',
    comment: 'alias (deprecated)',
    description: 'Alias for the regular (2 px) border width. **Deprecated** — prefer `--default-border-width`.',
    group: 'border',
  },
  {
    property: '--border-width-thin',
    value: '1px',
    comment: 'alias (deprecated)',
    description: 'Alias for the thin (1 px) border width. **Deprecated** — prefer `--default-border-width`.',
    group: 'border',
  },
];

export const borderThemeVariables: TailwindThemeVariable[] = [...radiusThemeVariables, ...borderWidthThemeVariables];
