import type {
  FlexItemAlignSelf,
  FlexItemFlex,
  FlexItemGrow,
  FlexItemOffset,
  FlexItemShrink,
  FlexItemWidth,
} from './flex-item-utils';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../../utils';
import { addImportantToEachRule } from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';

const flexItemWidths: { [key in Exclude<FlexItemWidth, 'auto'>]: number } & { none: number; auto: string } = {
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
  width: BreakpointCustomizable<FlexItemWidth>,
  offset: BreakpointCustomizable<FlexItemOffset>,
  alignSelf: BreakpointCustomizable<FlexItemAlignSelf>,
  grow: BreakpointCustomizable<FlexItemGrow>,
  shrink: BreakpointCustomizable<FlexItemShrink>,
  flex: BreakpointCustomizable<FlexItemFlex>
): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        boxSizing: 'border-box',
        ...mergeDeep(
          buildResponsiveStyles(width, (widthResponsive: FlexItemWidth) => ({
            width: `${flexItemWidths[widthResponsive]}%`,
          })),
          buildResponsiveStyles(offset, (offsetResponsive: FlexItemOffset) => ({
            marginLeft: `${flexItemWidths[offsetResponsive]}%`,
          })),
          buildResponsiveStyles(alignSelf, (alignSelfResponsive: FlexItemAlignSelf) => ({
            alignSelf: alignSelfResponsive,
          })),
          flex !== 'initial' // flex shorthand conflicts with grow and shrink, which means even default grow or shrink props would override flex
            ? buildResponsiveStyles(flex, (flexResponsive: FlexItemFlex) => ({
                flex: flexResponsive === 'equal' ? '1 1 0' : flexResponsive,
              }))
            : mergeDeep(
                buildResponsiveStyles(grow, (flexGrow: FlexItemGrow) => ({ flexGrow })),
                buildResponsiveStyles(shrink, (flexShrink: FlexItemShrink) => ({ flexShrink }))
              )
        ),
      }),
    },
  });
};
