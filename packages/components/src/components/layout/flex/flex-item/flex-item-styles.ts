import type { GetStylesFunction, JssStyle } from '../../../../utils';
import {
  addImportantToEachRule,
  attachComponentCss,
  buildHostStyles,
  buildResponsiveHostStyles,
  getCss,
  mergeDeep,
} from '../../../../utils';
import type {
  FlexItemAlignSelf,
  FlexItemAlignSelfType,
  FlexItemFlex,
  FlexItemFlexType,
  FlexItemGrow,
  FlexItemGrowType,
  FlexItemOffset,
  FlexItemOffsetType,
  FlexItemShrink,
  FlexItemShrinkType,
  FlexItemWidth,
  FlexItemWidthType,
} from './flex-item-utils';

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

const getWidthStyles: GetStylesFunction = (width: FlexItemWidthType): JssStyle => ({
  width: `${flexItemWidths[width]}%`,
});

const getOffsetStyles: GetStylesFunction = (offset: FlexItemOffsetType): JssStyle => ({
  marginLeft: `${flexItemWidths[offset]}%`,
});

const getAlignSelfStyles: GetStylesFunction = (alignSelf: FlexItemAlignSelfType): JssStyle => ({ alignSelf });

const getGrowStyles: GetStylesFunction = (flexGrow: FlexItemGrowType): JssStyle => ({ flexGrow });

const getShrinkStyles: GetStylesFunction = (flexShrink: FlexItemShrinkType): JssStyle => ({ flexShrink });

const getFlexStyles: GetStylesFunction = (flex: FlexItemFlexType): JssStyle => ({
  flex: flex === 'equal' ? '1 1 0' : flex,
});

export const getComponentCss = (
  width: FlexItemWidth,
  offset: FlexItemOffset,
  alignSelf: FlexItemAlignSelf,
  grow: FlexItemGrow,
  shrink: FlexItemShrink,
  flex: FlexItemFlex
): string => {
  return getCss(
    addImportantToEachRule(
      mergeDeep(
        buildHostStyles({
          boxSizing: 'border-box',
        }),
        buildResponsiveHostStyles(width, getWidthStyles),
        buildResponsiveHostStyles(offset, getOffsetStyles),
        buildResponsiveHostStyles(alignSelf, getAlignSelfStyles),
        flex !== 'initial' // flex shorthand conflicts with grow and shrink, which means even default grow or shrink props would override flex
          ? buildResponsiveHostStyles(flex, getFlexStyles)
          : mergeDeep(
              buildResponsiveHostStyles(grow, getGrowStyles),
              buildResponsiveHostStyles(shrink, getShrinkStyles)
            )
      )
    )
  );
};

export const addComponentCss = (
  host: HTMLElement,
  width: FlexItemWidth,
  offset: FlexItemOffset,
  alignSelf: FlexItemAlignSelf,
  grow: FlexItemGrow,
  shrink: FlexItemShrink,
  flex: FlexItemFlex
): void => {
  attachComponentCss(host, getComponentCss, width, offset, alignSelf, grow, shrink, flex);
};
