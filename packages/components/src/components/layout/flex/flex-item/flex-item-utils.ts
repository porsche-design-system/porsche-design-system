import type { BreakpointCustomizable } from '../../../../types';
import { attachCss, buildResponsiveJss, getCss, mergeDeep } from '../../../../utils';
import type { JssStyle } from '../../../../utils';

export const FLEX_ITEM_WIDTHS = [
  'auto',
  'one-quarter',
  'one-third',
  'half',
  'two-thirds',
  'three-quarters',
  'full',
] as const;
type FlexItemWidthType = typeof FLEX_ITEM_WIDTHS[number];
export type FlexItemWidth = BreakpointCustomizable<FlexItemWidthType>;

export const FLEX_ITEM_OFFSETS = ['none', 'one-quarter', 'one-third', 'half', 'two-thirds', 'three-quarters'] as const;
type FlexItemOffsetType = typeof FLEX_ITEM_OFFSETS[number];
export type FlexItemOffset = BreakpointCustomizable<FlexItemOffsetType>;

export const FLEX_ITEM_ALIGN_SELFS = ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'] as const;
type FlexItemAlignSelfType = typeof FLEX_ITEM_ALIGN_SELFS[number];
export type FlexItemAlignSelf = BreakpointCustomizable<FlexItemAlignSelfType>;

export const FLEX_ITEM_GROWS = [0, 1] as const;
type FlexItemGrowType = typeof FLEX_ITEM_GROWS[number];
export type FlexItemGrow = BreakpointCustomizable<FlexItemGrowType>;

export const FLEX_ITEM_SHRINKS = [0, 1] as const;
type FlexItemShrinkType = typeof FLEX_ITEM_SHRINKS[number];
export type FlexItemShrink = BreakpointCustomizable<FlexItemShrinkType>;

export const FLEX_ITEM_FLEXES = ['initial', 'auto', 'none', 'equal'] as const;
type FlexItemFlexType = typeof FLEX_ITEM_FLEXES[number];
export type FlexItemFlex = BreakpointCustomizable<FlexItemFlexType>;

const flexItemWidths: { [key in Exclude<FlexItemWidthType, 'auto'>]: number } & { none: number; auto: string } = {
  'none': 0,
  'one-quarter': 25,
  'one-third': 33.333333,
  'half': 50,
  'two-thirds': 66.666667,
  'three-quarters': 75,
  'full': 100,
  'auto': 'auto',
};

const getWidthStyles = (width: FlexItemWidthType): JssStyle =>
  width === 'auto'
    ? {}
    : {
        width: `${flexItemWidths[width]}% !important`,
      };
const getOffsetStyles = (offset: FlexItemOffsetType): JssStyle =>
  offset === 'none'
    ? {}
    : {
        marginLeft: `${flexItemWidths[offset]}% !important`,
      };
const getAlignSelfStyles = (alignSelf: FlexItemAlignSelfType): JssStyle =>
  alignSelf === 'auto'
    ? {}
    : {
        alignSelf: `${alignSelf} !important`,
      };
const getGrowStyles = (grow: FlexItemGrowType): JssStyle =>
  grow === 0
    ? {}
    : {
        flexGrow: `${grow} !important`,
      };
const getShrinkStyles = (shrink: FlexItemShrinkType): JssStyle =>
  shrink === 1
    ? {}
    : {
        flexShrink: `${shrink} !important`,
      };
const getFlexStyles = (flex: FlexItemFlexType): JssStyle =>
  flex === 'initial'
    ? {}
    : {
        flex: `${flex} !important`,
      };

const baseCss: string = getCss({
  ':host': {
    boxSizing: 'border-box !important',
  },
});

export const getDynamicCss = (
  width: FlexItemWidth,
  offset: FlexItemOffset,
  alignSelf: FlexItemAlignSelf,
  grow: FlexItemGrow,
  shrink: FlexItemShrink,
  flex: FlexItemFlex
): string => {
  return getCss(
    mergeDeep(
      buildResponsiveJss(width, getWidthStyles),
      buildResponsiveJss(offset, getOffsetStyles),
      buildResponsiveJss(alignSelf, getAlignSelfStyles),
      buildResponsiveJss(grow, getGrowStyles),
      buildResponsiveJss(shrink, getShrinkStyles),
      buildResponsiveJss(flex, getFlexStyles)
    )
  );
};

export const addCss = (
  host: HTMLElement,
  width: FlexItemWidth,
  offset: FlexItemOffset,
  alignSelf: FlexItemAlignSelf,
  grow: FlexItemGrow,
  shrink: FlexItemShrink,
  flex: FlexItemFlex
): void => {
  attachCss(host, baseCss + getDynamicCss(width, offset, alignSelf, grow, shrink, flex));
};
