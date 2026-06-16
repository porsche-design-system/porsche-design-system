import type { Meta } from '../meta.types';
import {
  border,
  borderRadius,
  borderRadiusLarge,
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidth,
  borderWidthBase,
  borderWidthThin,
  radius2Xl,
  radius3Xl,
  radius4Xl,
  radiusFull,
  radiusLg,
  radiusMd,
  radiusSm,
  radiusXl,
  radiusXs,
} from '.';

export const borderMeta: Meta = {
  radius: {
    radiusXs: { name: 'radiusXs', description: 'Holds a **x-small** `border-radius`.', value: radiusXs },
    radiusSm: { name: 'radiusSm', description: 'Holds a **small** `border-radius`.', value: radiusSm },
    radiusMd: {
      name: 'radiusMd',
      description: 'Holds a **medium** `border-radius`. Used for `p-checkbox` in **compact mode**.',
      value: radiusMd,
    },
    radiusLg: {
      name: 'radiusLg',
      description:
        'Holds a **large** `border-radius`. Used for interactive controls in **compact mode** (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…).',
      value: radiusLg,
    },
    radiusXl: {
      name: 'radiusXl',
      description:
        'Holds a **x-large** `border-radius`. Used for interactive controls (e.g. `p-tabs-bar`, `p-input-*`, `p-textarea`, `p-select`, `p-button`, `p-link`,…). Defines the primary visual appearance alongside **radius3Xl**.',
      value: radiusXl,
    },
    radius2Xl: {
      name: 'radius2Xl',
      description:
        'Holds a **2x-large** `border-radius`. Used for notification components (e.g. `p-banner`, `p-inline-notification`, `p-toast`,…).',
      value: radius2Xl,
    },
    radius3Xl: {
      name: 'radius3Xl',
      description:
        'Holds a **3x-large** `border-radius`. Used for card-like containers or dialogs (e.g. `p-link-tile`, `p-modal`, `p-flyout`, `p-sheet`,…). Defines the primary visual appearance alongside **radiusXl**.',
      value: radius3Xl,
    },
    radius4Xl: { name: 'radius4Xl', description: 'Holds a **4x-large** `border-radius`.', value: radius4Xl },
    radiusFull: {
      name: 'radiusFull',
      description:
        'Holds a **fully** rounded `border-radius`. Used for pill shapes (e.g. `p-tag`, `p-switch`,…). Recommended only for standalone indicators.',
      value: radiusFull,
    },
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use radiusSm instead. */
  borderRadiusSmall: {
    name: 'borderRadiusSmall',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use radiusSm instead.',
    value: borderRadiusSmall,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use radiusMd instead. */
  borderRadiusMedium: {
    name: 'borderRadiusMedium',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use radiusMd instead.',
    value: borderRadiusMedium,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use radiusLg instead. */
  borderRadiusLarge: {
    name: 'borderRadiusLarge',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use radiusLg instead.',
    value: borderRadiusLarge,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use variables directly instead. */
  border: {
    name: 'border',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use variables directly instead.',
    value: border,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use variables directly instead. */
  borderRadius: {
    name: 'borderRadius',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use variables directly instead.',
    value: borderRadius,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use variables directly instead. */
  borderWidth: {
    name: 'borderWidth',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use variables directly instead.',
    value: borderWidth,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use 2px instead. */
  borderWidthBase: {
    name: 'borderWidthBase',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use 2px instead.',
    value: borderWidthBase,
    deprecated: true,
  },
  /** @deprecated since v4.0.0, will be removed with next major release. Use 1px instead. */
  borderWidthThin: {
    name: 'borderWidthThin',
    description: 'deprecated since v4.0.0, will be removed with next major release. Use 1px instead.',
    value: borderWidthThin,
    deprecated: true,
  },
} as const;
