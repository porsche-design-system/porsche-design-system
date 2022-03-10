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
import { buildResponsiveStyles, getCss, mergeDeep } from '../../../../utils';
import { addImportantToEachRule } from '../../../../styles';

export const getComponentCss = (
  inline: FlexInline,
  wrap: FlexWrap,
  direction: FlexDirection,
  justifyContent: FlexJustifyContent,
  alignItems: FlexAlignItems,
  alignContent: FlexAlignContent
): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule(
        mergeDeep(
          buildResponsiveStyles(inline, (inlineResponsive: FlexInlineType) => ({
            display: inlineResponsive ? 'inline-flex' : 'flex',
          })),
          buildResponsiveStyles(wrap, (flexWrapResponsive: FlexWrapType) => ({ flexWrap: flexWrapResponsive })),
          buildResponsiveStyles(direction, (flexDirectionResponsive: FlexDirectionType) => ({
            flexDirection: flexDirectionResponsive,
          })),
          buildResponsiveStyles(justifyContent, (justifyContentResponsive: FlexJustifyContentType) => ({
            justifyContent: justifyContentResponsive,
          })),
          buildResponsiveStyles(alignItems, (alignItemsResponsive: FlexAlignItemsType) => ({
            alignItems: alignItemsResponsive,
          })),
          buildResponsiveStyles(alignContent, (alignContentResponsive: FlexAlignContentType) => ({
            alignContent: alignContentResponsive,
          }))
        )
      ),
    },
  });
};
