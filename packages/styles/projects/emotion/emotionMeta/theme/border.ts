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
} from '../../src/border/';
import type { EmotionMeta, EmotionToken } from '../types';

const radius = {
  xs: { name: 'radiusXs', description: 'Holds a **x-small** `border-radius`.', value: radiusXs },
  sm: { name: 'radiusSm', description: 'Holds a **small** `border-radius`.', value: radiusSm },
  md: {
    name: 'radiusMd',
    description: 'Holds a **medium** `border-radius`. Used for `p-checkbox` in **compact mode**.',
    value: radiusMd,
  },
  lg: {
    name: 'radiusLg',
    description:
      'Holds a **large** `border-radius`. Used for interactive controls in **compact mode** (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…).',
    value: radiusLg,
  },
  xl: {
    name: 'radiusXl',
    description:
      'Holds a **x-large** `border-radius`. Used for interactive controls (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…). Defines the primary visual appearance alongside **radius3Xl**.',
    value: radiusXl,
  },
  '2xl': {
    name: 'radius2Xl',
    description:
      'Holds a **2x-large** `border-radius`. Used for notification components (e.g. `p-banner`, `p-inline-notification`, `p-toast`,…).',
    value: radius2Xl,
  },
  '3xl': {
    name: 'radius3Xl',
    description:
      'Holds a **3x-large** `border-radius`. Used for card-like containers or dialogs (e.g. `p-link-tile`, `p-modal`, `p-flyout`, `p-sheet`,…). Defines the primary visual appearance alongside **radiusXl**.',
    value: radius3Xl,
  },
  '4xl': { name: 'radius4Xl', description: 'Holds a **4x-large** `border-radius`.', value: radius4Xl },
  full: {
    name: 'radiusFull',
    description:
      'Holds a **fully** rounded `border-radius`. Used for pill shapes (e.g. `p-tag`, `p-switch`,…). Recommended only for standalone indicators.',
    value: radiusFull,
  },
} satisfies Record<string, EmotionToken>;

export const border = {
  radius,
} satisfies EmotionMeta['border'];
