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
import type { ScssCatalog } from '../types';

/** The documented border radius scale. */
const radius = {
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
};

/** Border declarations: the `radius` scale, plus the deprecated `$pds-border-*` aliases beside their replacements. `width` holds only legacy aliases. */
export const border = {
  radius: {
    ...radius,
    radiusSmall: {
      name: '$pds-border-radius-small',
      value: radiusSm,
      description: 'Holds a **small** `border-radius`.',
      deprecation: { replacement: scssIdentifier(radius.sm) },
    },
    radiusMedium: {
      name: '$pds-border-radius-medium',
      value: radiusMd,
      description: 'Holds a **medium** `border-radius`.',
      deprecation: { replacement: scssIdentifier(radius.md) },
    },
    radiusLarge: {
      name: '$pds-border-radius-large',
      value: radiusLg,
      description: 'Holds a **large** `border-radius`.',
      deprecation: { replacement: scssIdentifier(radius.lg) },
    },
  },
  width: [
    {
      name: '$pds-border-width-base',
      value: '2px',
      description: 'Holds a **base** `border-width`. The current scale has no border width declarations.',
      deprecation: {},
    },
    {
      name: '$pds-border-width-thin',
      value: '1px',
      description: 'Holds a **thin** `border-width`. The current scale has no border width declarations.',
      deprecation: {},
    },
  ],
} satisfies ScssCatalog;
