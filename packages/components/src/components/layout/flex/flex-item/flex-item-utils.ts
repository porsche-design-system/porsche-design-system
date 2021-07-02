import type { BreakpointCustomizable } from '../../../../types';
import type { GetStylesFunction, JssStyle } from '../../../../utils';
import {
  addImportantToEachRule,
  attachCss,
  buildHostStyles,
  buildResponsiveJss,
  getCss,
  mergeDeep,
} from '../../../../utils';

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
  none: 0,
  'one-quarter': 25,
  'one-third': 33.333333,
  half: 50,
  'two-thirds': 66.666667,
  'three-quarters': 75,
  full: 100,
  auto: 'auto',
};

const getWidthStyles: GetStylesFunction = (width: FlexItemWidthType): JssStyle =>
  addImportantToEachRule({
    width: `${flexItemWidths[width]}%`,
  });

const getOffsetStyles: GetStylesFunction = (offset: FlexItemOffsetType): JssStyle =>
  addImportantToEachRule({
    marginLeft: `${flexItemWidths[offset]}%`,
  });

const getAlignSelfStyles: GetStylesFunction = (alignSelf: FlexItemAlignSelfType): JssStyle =>
  addImportantToEachRule({ alignSelf });

const getGrowStyles: GetStylesFunction = (flexGrow: FlexItemGrowType): JssStyle => addImportantToEachRule({ flexGrow });

const getShrinkStyles: GetStylesFunction = (flexShrink: FlexItemShrinkType): JssStyle =>
  addImportantToEachRule({ flexShrink });

const getFlexStyles: GetStylesFunction = (flex: FlexItemFlexType): JssStyle =>
  addImportantToEachRule({
    flex: flex === 'equal' ? '1 1 0' : flex,
  });

const baseCss: string = getCss(
  buildHostStyles(
    addImportantToEachRule({
      boxSizing: 'border-box',
    })
  )
);

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
      flex !== 'initial' // flex shorthand conflicts with grow and shrink, which means even default grow or shrink props would override flex
        ? buildResponsiveJss(flex, getFlexStyles)
        : mergeDeep(buildResponsiveJss(grow, getGrowStyles), buildResponsiveJss(shrink, getShrinkStyles))
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
