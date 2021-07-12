import type { GetStylesFunction, JssStyle } from '../../../../utils';
import {
  addImportantToEachRule,
  attachCss,
  buildHostStyles,
  buildResponsiveJss,
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

export const getComponentCss = (
  width: FlexItemWidth,
  offset: FlexItemOffset,
  alignSelf: FlexItemAlignSelf,
  grow: FlexItemGrow,
  shrink: FlexItemShrink,
  flex: FlexItemFlex
): string => {
  return (
    baseCss +
    getCss(
      mergeDeep(
        buildResponsiveJss(width, getWidthStyles),
        buildResponsiveJss(offset, getOffsetStyles),
        buildResponsiveJss(alignSelf, getAlignSelfStyles),
        flex !== 'initial' // flex shorthand conflicts with grow and shrink, which means even default grow or shrink props would override flex
          ? buildResponsiveJss(flex, getFlexStyles)
          : mergeDeep(buildResponsiveJss(grow, getGrowStyles), buildResponsiveJss(shrink, getShrinkStyles))
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
  attachCss(host, getComponentCss(width, offset, alignSelf, grow, shrink, flex));
};
