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
import { buildResponsiveStyles, getCss, mergeDeep } from '../../../../utils';
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

export const getComponentCss = (
  width: FlexItemWidth,
  offset: FlexItemOffset,
  alignSelf: FlexItemAlignSelf,
  grow: FlexItemGrow,
  shrink: FlexItemShrink,
  flex: FlexItemFlex
): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        boxSizing: 'border-box',
        ...mergeDeep(
          buildResponsiveStyles(width, (width: FlexItemWidthType) => ({ width: `${flexItemWidths[width]}%` })),
          buildResponsiveStyles(offset, (offset: FlexItemOffsetType) => ({ marginLeft: `${flexItemWidths[offset]}%` })),
          buildResponsiveStyles(alignSelf, (alignSelf: FlexItemAlignSelfType) => ({ alignSelf })),
          flex !== 'initial' // flex shorthand conflicts with grow and shrink, which means even default grow or shrink props would override flex
            ? buildResponsiveStyles(flex, (flex: FlexItemFlexType) => ({
                flex: flex === 'equal' ? '1 1 0' : flex,
              }))
            : mergeDeep(
                buildResponsiveStyles(grow, (flexGrow: FlexItemGrowType) => ({ flexGrow })),
                buildResponsiveStyles(shrink, (flexShrink: FlexItemShrinkType) => ({ flexShrink }))
              )
        ),
      }),
    },
  });
};
