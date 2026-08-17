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
import { scssIdentifier } from '../deprecation';
import type { DeprecatedScssVariable, ScssMeta, ScssVariable } from '../types';

/** The border radius scale. The same entries render both the docs rows and the `$radius-*: …;` declarations. */
export const radius = {
  xs: {
    name: '$radius-xs',
    value: radiusXs,
    description: 'Holds a **x-small** `border-radius`.',
  },
  sm: {
    name: '$radius-sm',
    value: radiusSm,
    description: 'Holds a **small** `border-radius`.',
  },
  md: {
    name: '$radius-md',
    value: radiusMd,
    description: 'Holds a **medium** `border-radius`. Used for `p-checkbox` in **compact mode**.',
  },
  lg: {
    name: '$radius-lg',
    value: radiusLg,
    description:
      'Holds a **large** `border-radius`. Used for interactive controls in **compact mode** (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…).',
  },
  xl: {
    name: '$radius-xl',
    value: radiusXl,
    description:
      'Holds a **x-large** `border-radius`. Used for interactive controls (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…). Defines the primary visual appearance alongside **radius3Xl**.',
  },
  '2xl': {
    name: '$radius-2xl',
    value: radius2Xl,
    description:
      'Holds a **2x-large** `border-radius`. Used for notification components (e.g. `p-banner`, `p-inline-notification`, `p-toast`,…).',
  },
  '3xl': {
    name: '$radius-3xl',
    value: radius3Xl,
    description:
      'Holds a **3x-large** `border-radius`. Used for card-like containers or dialogs (e.g. `p-link-tile`, `p-modal`, `p-flyout`, `p-sheet`,…). Defines the primary visual appearance alongside **radiusXl**.',
  },
  '4xl': {
    name: '$radius-4xl',
    value: radius4Xl,
    description: 'Holds a **4x-large** `border-radius`.',
  },
  full: {
    name: '$radius-full',
    value: radiusFull,
    description:
      'Holds a **fully** rounded `border-radius`. Used for pill shapes (e.g. `p-tag`, `p-switch`,…). Recommended only for standalone indicators.',
  },
} satisfies Record<string, ScssVariable>;

/** Border theme variables: the `radius` scale. `width` stays empty — the only widths are deprecated `$pds-border-width-*` aliases. */
export const border = {
  radius,
  width: [],
} satisfies ScssMeta['border'];

/** Deprecated `$pds-border-*` aliases. The width aliases have no modern equivalent. */
export const borderDeprecations = {
  radiusSmall: {
    name: '$pds-border-radius-small',
    value: radiusSm,
    deprecation: { replacement: scssIdentifier(radius.sm) },
  },
  radiusMedium: {
    name: '$pds-border-radius-medium',
    value: radiusMd,
    deprecation: { replacement: scssIdentifier(radius.md) },
  },
  radiusLarge: {
    name: '$pds-border-radius-large',
    value: radiusLg,
    deprecation: { replacement: scssIdentifier(radius.lg) },
  },
  widthBase: {
    name: '$pds-border-width-base',
    value: '2px',
    deprecation: {},
  },
  widthThin: {
    name: '$pds-border-width-thin',
    value: '1px',
    deprecation: {},
  },
} satisfies Record<string, DeprecatedScssVariable>;
