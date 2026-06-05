import {
  breakpoint2Xl,
  breakpointLg,
  breakpointMd,
  breakpointSm,
  breakpointXl,
  breakpointXs,
} from '@porsche-design-system/tokens';
import { sizeLabel } from './shared';
import type { TailwindThemeVariable } from './types';

// Breakpoint — generates the responsive variant prefixes (e.g. `md:`).
const breakpointValues: Record<string, number> = {
  xs: breakpointXs,
  sm: breakpointSm,
  md: breakpointMd,
  lg: breakpointLg,
  xl: breakpointXl,
  '2xl': breakpoint2Xl,
};
export const breakpointThemeVariables: TailwindThemeVariable[] = (['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map(
  (size) => ({
    property: `--breakpoint-${size}`,
    value: `${breakpointValues[size]}px`,
    classes: [`${size}:*`],
    description: `Defines the **${sizeLabel[size]}** responsive breakpoint.`,
    group: 'breakpoint',
  })
);
