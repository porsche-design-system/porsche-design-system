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

export const borderMeta = {
  radius: {
    radiusXs: { name: 'radiusXs', value: radiusXs, description: 'Holds a **x-small** `border-radius`.' },
    radiusSm: { name: 'radiusSm', value: radiusSm, description: 'Holds a **small** `border-radius`.' },
    radiusMd: { name: 'radiusMd', value: radiusMd, description: 'Holds a **medium** `border-radius`.' },
    radiusLg: { name: 'radiusLg', value: radiusLg, description: 'Holds a **large** `border-radius`.' },
    radiusXl: { name: 'radiusXl', value: radiusXl, description: 'Holds a **x-large** `border-radius`.' },
    radius2Xl: { name: 'radius2Xl', value: radius2Xl, description: 'Holds a **2x-large** `border-radius`.' },
    radius3Xl: { name: 'radius3Xl', value: radius3Xl, description: 'Holds a **3x-large** `border-radius`.' },
    radius4Xl: { name: 'radius4Xl', value: radius4Xl, description: 'Holds a **4x-large** `border-radius`.' },
    radiusFull: { name: 'radiusFull', value: radiusFull, description: 'Holds a **fully** rounded `border-radius`.' },
  },
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use radiusSm instead. */
export const deprecatedBorderRadiusSmall = {
  name: 'borderRadiusSmall',
  value: radiusSm,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use radiusSm instead.',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use radiusMd instead. */
export const deprecatedBorderRadiusMedium = {
  name: 'borderRadiusMedium',
  value: radiusMd,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use radiusMd instead.',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use radiusLg instead. */
export const deprecatedBorderRadiusLarge = {
  name: 'borderRadiusLarge',
  value: radiusLg,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use radiusLg instead.',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use variables directly instead. */
export const deprecatedBorderRadius = {
  name: 'borderRadius',
  value: { small: radiusSm, medium: radiusMd, large: radiusLg } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use variables directly instead.',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use variables directly instead. */
export const deprecatedBorder = {
  name: 'border',
  value: {
    radius: { small: radiusSm, medium: radiusMd, large: radiusLg },
    width: { base: '2px', thin: '1px' },
  } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use variables directly instead.',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use variables directly instead. */
export const deprecatedBorderWidth = {
  name: 'borderWidth',
  value: { base: '2px', thin: '1px' } as const,
  description: 'deprecated since v4.0.0, will be removed with next major release. Use variables directly instead.',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use 2px instead. */
export const deprecatedBorderWidthBase = {
  name: 'borderWidthBase',
  value: '2px',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use 2px instead.',
} as const;

/** @deprecated since v4.0.0, will be removed with next major release. Use 1px instead. */
export const deprecatedBorderWidthThin = {
  name: 'borderWidthThin',
  value: '1px',
  description: 'deprecated since v4.0.0, will be removed with next major release. Use 1px instead.',
} as const;

export const deprecatedBorderMeta = {
  borderRadiusSmall: deprecatedBorderRadiusSmall,
  borderRadiusMedium: deprecatedBorderRadiusMedium,
  borderRadiusLarge: deprecatedBorderRadiusLarge,
  border: deprecatedBorder,
  borderRadius: deprecatedBorderRadius,
  borderWidth: deprecatedBorderWidth,
  borderWidthBase: deprecatedBorderWidthBase,
  borderWidthThin: deprecatedBorderWidthThin,
} as const;
