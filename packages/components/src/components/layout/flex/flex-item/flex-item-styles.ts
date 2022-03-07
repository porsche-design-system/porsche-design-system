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
import { buildResponsiveStyle, getCss, mergeDeep } from '../../../../utils';
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
          buildResponsiveStyle(width, (widthResponsive: FlexItemWidthType) => ({
            width: `${flexItemWidths[widthResponsive]}%`,
          })),
          buildResponsiveStyle(offset, (offsetResponsive: FlexItemOffsetType) => ({
            marginLeft: `${flexItemWidths[offsetResponsive]}%`,
          })),
          buildResponsiveStyle(alignSelf, (alignSelfResponsive: FlexItemAlignSelfType) => ({
            alignSelf: alignSelfResponsive,
          })),
          flex !== 'initial' // flex shorthand conflicts with grow and shrink, which means even default grow or shrink props would override flex
            ? buildResponsiveStyle(flex, (flexResponsive: FlexItemFlexType) => ({
                flex: flexResponsive === 'equal' ? '1 1 0' : flexResponsive,
              }))
            : mergeDeep(
                buildResponsiveStyle(grow, (flexGrow: FlexItemGrowType) => ({ flexGrow })),
                buildResponsiveStyle(shrink, (flexShrink: FlexItemShrinkType) => ({ flexShrink }))
              )
        ),
      }),
    },
  });
};
