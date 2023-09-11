import type {
  FlexAlignContent,
  FlexAlignItems,
  FlexDirection,
  FlexInline,
  FlexJustifyContent,
  FlexWrap,
} from './flex-utils';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../../utils';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';

export const getComponentCss = (
  inline: BreakpointCustomizable<FlexInline>,
  wrap: BreakpointCustomizable<FlexWrap>,
  direction: BreakpointCustomizable<FlexDirection>,
  justifyContent: BreakpointCustomizable<FlexJustifyContent>,
  alignItems: BreakpointCustomizable<FlexAlignItems>,
  alignContent: BreakpointCustomizable<FlexAlignContent>
): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule(
        mergeDeep(
          colorSchemeStyles,
          hostHiddenStyles,
          buildResponsiveStyles(inline, (inlineResponsive: FlexInline) => ({
            display: inlineResponsive ? 'inline-flex' : 'flex',
          })),
          buildResponsiveStyles(wrap, (flexWrapResponsive: FlexWrap) => ({ flexWrap: flexWrapResponsive })),
          buildResponsiveStyles(direction, (flexDirectionResponsive: FlexDirection) => ({
            flexDirection: flexDirectionResponsive,
          })),
          buildResponsiveStyles(justifyContent, (justifyContentResponsive: FlexJustifyContent) => ({
            justifyContent: justifyContentResponsive,
          })),
          buildResponsiveStyles(alignItems, (alignItemsResponsive: FlexAlignItems) => ({
            alignItems: alignItemsResponsive,
          })),
          buildResponsiveStyles(alignContent, (alignContentResponsive: FlexAlignContent) => ({
            alignContent: alignContentResponsive,
          }))
        )
      ),
    },
  });
};
