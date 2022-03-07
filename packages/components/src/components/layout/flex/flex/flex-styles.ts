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
import { buildResponsiveStyle, getCss, mergeDeep } from '../../../../utils';
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
          buildResponsiveStyle(inline, (inlineResponsive: FlexInlineType) => ({
            display: inlineResponsive ? 'inline-flex' : 'flex',
          })),
          buildResponsiveStyle(wrap, (flexWrapResponsive: FlexWrapType) => ({ flexWrap: flexWrapResponsive })),
          buildResponsiveStyle(direction, (flexDirectionResponsive: FlexDirectionType) => ({
            flexDirection: flexDirectionResponsive,
          })),
          buildResponsiveStyle(justifyContent, (justifyContentResponsive: FlexJustifyContentType) => ({
            justifyContent: justifyContentResponsive,
          })),
          buildResponsiveStyle(alignItems, (alignItemsResponsive: FlexAlignItemsType) => ({
            alignItems: alignItemsResponsive,
          })),
          buildResponsiveStyle(alignContent, (alignContentResponsive: FlexAlignContentType) => ({
            alignContent: alignContentResponsive,
          }))
        )
      ),
    },
  });
};
