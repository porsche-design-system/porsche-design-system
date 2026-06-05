import {
  durationLg,
  durationMd,
  durationSm,
  durationXl,
  easeIn,
  easeInOut,
  easeOut,
} from '@porsche-design-system/tokens';
import type { TailwindThemeVariable } from './types';

// Motion — easing.
export const easeThemeVariables: TailwindThemeVariable[] = [
  {
    property: '--ease-in-out',
    value: easeInOut,
    classes: ['.ease-in-out'],
    description: 'Applies an **in-out** `transition-timing-function`.',
    group: 'motion',
  },
  {
    property: '--ease-in',
    value: easeIn,
    classes: ['.ease-in'],
    description: 'Applies an **in** `transition-timing-function`.',
    group: 'motion',
  },
  {
    property: '--ease-out',
    value: easeOut,
    classes: ['.ease-out'],
    description: 'Applies an **out** `transition-timing-function`.',
    group: 'motion',
  },
];

// Motion — duration.
const durationValues: Record<string, string> = { sm: durationSm, md: durationMd, lg: durationLg, xl: durationXl };
const durationLabel: Record<string, string> = { sm: 'short', md: 'moderate', lg: 'long', xl: 'very long' };
export const durationThemeVariables: TailwindThemeVariable[] = (['sm', 'md', 'lg', 'xl'] as const).map((size) => ({
  property: `--transition-duration-${size}`,
  value: durationValues[size],
  classes: [`.duration-${size}`],
  description: `Applies a **${durationLabel[size]}** \`transition-duration\`.`,
  group: 'motion',
}));
