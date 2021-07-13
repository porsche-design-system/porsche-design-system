import type { GetStylesFunction, JssStyle } from '../../../../utils';
import { addImportantToEachRule, attachCss, buildResponsiveJss, getCss, mergeDeep } from '../../../../utils';
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
        buildResponsiveJss(inline, getInlineStyles),
        buildResponsiveJss(wrap, getWrapStyles),
        buildResponsiveJss(direction, getDirectionStyles),
        buildResponsiveJss(justifyContent, getJustifyContentStyles),
        buildResponsiveJss(alignItems, getAlignItemsStyles),
        buildResponsiveJss(alignContent, getAlignContentStyles)
      )
    )
  );
};

export const addComponentCss = (
  host: HTMLElement,
  inline: FlexInline,
  wrap: FlexWrap,
  direction: FlexDirection,
  justifyContent: FlexJustifyContent,
  alignItems: FlexAlignItems,
  alignContent: FlexAlignContent
): void => {
  attachCss(host, getComponentCss(inline, wrap, direction, justifyContent, alignItems, alignContent));
};
