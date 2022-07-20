import { BreakpointCustomizable } from '../../../../utils';

export const FLEX_ITEM_WIDTHS = [
  'auto',
  'one-quarter',
  'one-third',
  'half',
  'two-thirds',
  'three-quarters',
  'full',
] as const;
export type FlexItemWidthType = typeof FLEX_ITEM_WIDTHS[number];
export type FlexItemWidth = BreakpointCustomizable<FlexItemWidthType>;

export const FLEX_ITEM_OFFSETS = ['none', 'one-quarter', 'one-third', 'half', 'two-thirds', 'three-quarters'] as const;
export type FlexItemOffsetType = typeof FLEX_ITEM_OFFSETS[number];
export type FlexItemOffset = BreakpointCustomizable<FlexItemOffsetType>;

export const FLEX_ITEM_ALIGN_SELFS = ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'] as const;
export type FlexItemAlignSelfType = typeof FLEX_ITEM_ALIGN_SELFS[number];
export type FlexItemAlignSelf = BreakpointCustomizable<FlexItemAlignSelfType>;

export const FLEX_ITEM_GROWS = [0, 1] as const;
export type FlexItemGrowType = typeof FLEX_ITEM_GROWS[number];
export type FlexItemGrow = BreakpointCustomizable<FlexItemGrowType>;

export const FLEX_ITEM_SHRINKS = [0, 1] as const;
export type FlexItemShrinkType = typeof FLEX_ITEM_SHRINKS[number];
export type FlexItemShrink = BreakpointCustomizable<FlexItemShrinkType>;

export const FLEX_ITEM_FLEXS = ['initial', 'auto', 'none', 'equal'] as const;
export type FlexItemFlexType = typeof FLEX_ITEM_FLEXS[number];
export type FlexItemFlex = BreakpointCustomizable<FlexItemFlexType>;
