import type { JssStyle } from 'jss';
import type {
  FlexAlignContent,
  FlexAlignItems,
  FlexDirection,
  FlexInline,
  FlexJustifyContent,
  FlexWrap,
  FlexInlineType,
  FlexWrapType,
  FlexDirectionType,
  FlexJustifyContentType,
  FlexAlignItemsType,
  FlexAlignContentType,
} from './flex-utils';
import type { GetStyleFunction } from '../../../../utils';
import { buildResponsiveHostStyles, getCss, mergeDeep } from '../../../../utils';
import { addImportantToEachRule } from '../../../../styles';

const getInlineStyle: GetStyleFunction = (inline: FlexInlineType): JssStyle => ({
  display: inline ? 'inline-flex' : 'flex',
});

const getWrapStyle: GetStyleFunction = (flexWrap: FlexWrapType): JssStyle => ({ flexWrap });

const getDirectionStyle: GetStyleFunction = (flexDirection: FlexDirectionType): JssStyle => ({ flexDirection });

const getJustifyContentStyle: GetStyleFunction = (justifyContent: FlexJustifyContentType): JssStyle => ({
  justifyContent,
});

const getAlignItemsStyle: GetStyleFunction = (alignItems: FlexAlignItemsType): JssStyle => ({ alignItems });

const getAlignContentStyle: GetStyleFunction = (alignContent: FlexAlignContentType): JssStyle => ({ alignContent });

export const getComponentCss = (
  inline: FlexInline,
  wrap: FlexWrap,
  direction: FlexDirection,
  justifyContent: FlexJustifyContent,
  alignItems: FlexAlignItems,
  alignContent: FlexAlignContent
): string => {
  return getCss(
    addImportantToEachRule(
      mergeDeep(
        buildResponsiveHostStyles(inline, getInlineStyle),
        buildResponsiveHostStyles(wrap, getWrapStyle),
        buildResponsiveHostStyles(direction, getDirectionStyle),
        buildResponsiveHostStyles(justifyContent, getJustifyContentStyle),
        buildResponsiveHostStyles(alignItems, getAlignItemsStyle),
        buildResponsiveHostStyles(alignContent, getAlignContentStyle)
      )
    )
  );
};
