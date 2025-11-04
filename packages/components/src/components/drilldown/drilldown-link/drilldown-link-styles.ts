import { borderRadiusSmall, spacingFluidSmall, textMediumStyle } from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getCss } from '../../../utils';
import { cssVarColorPrimary } from '../drilldown/drilldown-styles';

export const getComponentCss = (hasSlottedAnchor: boolean, isActive: boolean): string => {
  const anchorJssStyle: JssStyle = {
    all: 'unset',
    padding: `calc(${spacingFluidSmall} + 2px) calc(${spacingFluidSmall} + 4px)`, // aligned with link-pure
    margin: `-2px calc(${spacingFluidSmall} * -1 - 4px)`, // aligned with link-pure
    borderRadius: borderRadiusSmall, // needed for focus outline
    font: textMediumStyle.font,
    color: `var(${cssVarColorPrimary})`,
    textDecoration: 'underline',
    textDecorationColor: isActive ? 'inherit' : 'transparent',
    cursor: isActive ? 'default' : 'pointer',
    transition: getTransition('text-decoration-color'),
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      ...(hasSlottedAnchor
        ? {
            '::slotted': addImportantToEachRule({
              '&(a)': anchorJssStyle,
              ...hoverMediaQuery({
                '&(a:hover)': {
                  textDecorationColor: 'inherit',
                },
              }),
              // TODO: focus color is the same for all themes but could change in the future
              ...getFocusJssStyle('light', { slotted: 'a', offset: '-2px' }),
            }),
          }
        : {
            a: {
              ...anchorJssStyle,
              ...hoverMediaQuery({
                '&:hover': {
                  textDecorationColor: 'inherit',
                },
              }),
              // TODO: focus color is the same for all themes but could change in the future
              ...getFocusJssStyle('light', { offset: '-2px' }),
            },
          }),
    },
  });
};
