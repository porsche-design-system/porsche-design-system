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
          buildResponsiveStyles(inline, (inline: FlexInlineType) => ({ display: inline ? 'inline-flex' : 'flex' })),
          buildResponsiveStyles(wrap, (flexWrap: FlexWrapType) => ({ flexWrap })),
          buildResponsiveStyles(direction, (flexDirection: FlexDirectionType) => ({ flexDirection })),
          buildResponsiveStyles(justifyContent, (justifyContent: FlexJustifyContentType) => ({ justifyContent })),
          buildResponsiveStyles(alignItems, (alignItems: FlexAlignItemsType) => ({ alignItems })),
          buildResponsiveStyles(alignContent, (alignContent: FlexAlignContentType) => ({ alignContent }))
        )
      ),
    },
  });
};
