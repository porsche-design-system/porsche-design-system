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
import type { GetStylesFunction, JssStyle } from '../../../../utils';
import { buildResponsiveHostStyles, getCss, mergeDeep } from '../../../../utils';
import { addImportantToEachRule } from '../../../../styles/common';

const getInlineStyles: GetStylesFunction = (inline: FlexInlineType): JssStyle => ({
  display: inline ? 'inline-flex' : 'flex',
});

const getWrapStyles: GetStylesFunction = (flexWrap: FlexWrapType): JssStyle => ({ flexWrap });

const getDirectionStyles: GetStylesFunction = (flexDirection: FlexDirectionType): JssStyle => ({ flexDirection });

const getJustifyContentStyles: GetStylesFunction = (justifyContent: FlexJustifyContentType): JssStyle => ({
  justifyContent,
});

const getAlignItemsStyles: GetStylesFunction = (alignItems: FlexAlignItemsType): JssStyle => ({ alignItems });

const getAlignContentStyles: GetStylesFunction = (alignContent: FlexAlignContentType): JssStyle => ({ alignContent });

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
        buildResponsiveHostStyles(inline, getInlineStyles),
        buildResponsiveHostStyles(wrap, getWrapStyles),
        buildResponsiveHostStyles(direction, getDirectionStyles),
        buildResponsiveHostStyles(justifyContent, getJustifyContentStyles),
        buildResponsiveHostStyles(alignItems, getAlignItemsStyles),
        buildResponsiveHostStyles(alignContent, getAlignContentStyles)
      )
    )
  );
};
