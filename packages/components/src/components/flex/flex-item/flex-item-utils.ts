export const FLEX_ITEM_WIDTHS = [
  'auto',
  'one-quarter',
  'one-third',
  'half',
  'two-thirds',
  'three-quarters',
  'full',
] as const;
export type FlexItemWidth = typeof FLEX_ITEM_WIDTHS[number];

export const FLEX_ITEM_OFFSETS = ['none', 'one-quarter', 'one-third', 'half', 'two-thirds', 'three-quarters'] as const;
export type FlexItemOffset = typeof FLEX_ITEM_OFFSETS[number];

export const FLEX_ITEM_ALIGN_SELFS = ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'] as const;
export type FlexItemAlignSelf = typeof FLEX_ITEM_ALIGN_SELFS[number];

export const FLEX_ITEM_GROWS = [0, 1] as const;
export type FlexItemGrow = typeof FLEX_ITEM_GROWS[number];

export const FLEX_ITEM_SHRINKS = [0, 1] as const;
export type FlexItemShrink = typeof FLEX_ITEM_SHRINKS[number];

export const FLEX_ITEM_FLEXS = ['initial', 'auto', 'none', 'equal'] as const;
export type FlexItemFlex = typeof FLEX_ITEM_FLEXS[number];
