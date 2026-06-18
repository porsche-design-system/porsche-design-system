import { gradientStopsFadeDark } from '@porsche-design-system/tokens';
import type { ScssVariable } from '../types';

/**
 * Gradient theme variable — the documented `$gradient-stops-fade-dark` color stops. The deprecated
 * `pds-gradient-to-*` mixins are plumbing — they live in the composition layer, not here.
 */
export const gradient = [
  {
    name: '$gradient-stops-fade-dark',
    value: gradientStopsFadeDark,
    description: 'Holds color stops for a faded gradient, used as `background-image`.',
    group: 'gradient',
  },
] satisfies ScssVariable[];
