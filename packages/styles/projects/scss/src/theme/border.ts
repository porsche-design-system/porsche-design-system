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
import type { ScssRaw, ScssVariable } from '../types';

/** The border radius scale. The same entries render both the docs rows and the `$radius-*: …;` declarations. */
export const radius = {
  xs: {
    name: '$radius-xs',
    value: radiusXs,
    description: 'Holds a **x-small** `border-radius`.',
    group: 'border',
  },
  sm: {
    name: '$radius-sm',
    value: radiusSm,
    description: 'Holds a **small** `border-radius`.',
    group: 'border',
  },
  md: {
    name: '$radius-md',
    value: radiusMd,
    description: 'Holds a **medium** `border-radius`. Used for `p-checkbox` in **compact mode**.',
    group: 'border',
  },
  lg: {
    name: '$radius-lg',
    value: radiusLg,
    description:
      'Holds a **large** `border-radius`. Used for interactive controls in **compact mode** (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…).',
    group: 'border',
  },
  xl: {
    name: '$radius-xl',
    value: radiusXl,
    description:
      'Holds a **x-large** `border-radius`. Used for interactive controls (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…). Defines the primary visual appearance alongside **radius3Xl**.',
    group: 'border',
  },
  '2xl': {
    name: '$radius-2xl',
    value: radius2Xl,
    description:
      'Holds a **2x-large** `border-radius`. Used for notification components (e.g. `p-banner`, `p-inline-notification`, `p-toast`,…).',
    group: 'border',
  },
  '3xl': {
    name: '$radius-3xl',
    value: radius3Xl,
    description:
      'Holds a **3x-large** `border-radius`. Used for card-like containers or dialogs (e.g. `p-link-tile`, `p-modal`, `p-flyout`, `p-sheet`,…). Defines the primary visual appearance alongside **radiusXl**.',
    group: 'border',
  },
  '4xl': {
    name: '$radius-4xl',
    value: radius4Xl,
    description: 'Holds a **4x-large** `border-radius`.',
    group: 'border',
  },
  full: {
    name: '$radius-full',
    value: radiusFull,
    description:
      'Holds a **fully** rounded `border-radius`. Used for pill shapes (e.g. `p-tag`, `p-switch`,…). Recommended only for standalone indicators.',
    group: 'border',
  },
} satisfies Record<string, ScssVariable>;

/** Border theme variables: the `radius` scale. `width` stays empty — the only widths are deprecated `$pds-border-width-*` aliases. */
export const border = {
  radius,
  width: [],
} satisfies { radius: Record<string, ScssVariable>; width: ScssVariable[] };

/**
 * Deprecated `$pds-border-*` aliases (plumbing).
 * @deprecated Use the documented `$radius-*` variables.
 */
export const borderDeprecatedAliases: ScssRaw = {
  raw: `$pds-border-radius-small: ${radiusSm}; /* alias (deprecated) */
$pds-border-radius-medium: ${radiusMd}; /* alias (deprecated) */
$pds-border-radius-large: ${radiusLg}; /* alias (deprecated) */
$pds-border-width-base: 2px; /* alias (deprecated) */
$pds-border-width-thin: 1px; /* alias (deprecated) */`,
};
