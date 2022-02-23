import type { JssStyle } from 'jss';
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
import type { GetStyleFunction } from '../../../../utils';
import { buildResponsiveHostStyles, getCss, mergeDeep } from '../../../../utils';
import { addImportantToEachRule } from '../../../../styles';

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

const getWidthStyle: GetStyleFunction = (width: FlexItemWidthType): JssStyle => ({
  width: `${flexItemWidths[width]}%`,
});

const getOffsetStyle: GetStyleFunction = (offset: FlexItemOffsetType): JssStyle => ({
  marginLeft: `${flexItemWidths[offset]}%`,
});

const getAlignSelfStyle: GetStyleFunction = (alignSelf: FlexItemAlignSelfType): JssStyle => ({ alignSelf });

const getGrowStyle: GetStyleFunction = (flexGrow: FlexItemGrowType): JssStyle => ({ flexGrow });

const getShrinkStyle: GetStyleFunction = (flexShrink: FlexItemShrinkType): JssStyle => ({ flexShrink });

const getFlexStyle: GetStyleFunction = (flex: FlexItemFlexType): JssStyle => ({
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
        {
          ':host': {
            boxSizing: 'border-box',
          },
        },
        buildResponsiveHostStyles(width, getWidthStyle),
        buildResponsiveHostStyles(offset, getOffsetStyle),
        buildResponsiveHostStyles(alignSelf, getAlignSelfStyle),
        flex !== 'initial' // flex shorthand conflicts with grow and shrink, which means even default grow or shrink props would override flex
          ? buildResponsiveHostStyles(flex, getFlexStyle)
          : mergeDeep(buildResponsiveHostStyles(grow, getGrowStyle), buildResponsiveHostStyles(shrink, getShrinkStyle))
      )
    )
  );
};
