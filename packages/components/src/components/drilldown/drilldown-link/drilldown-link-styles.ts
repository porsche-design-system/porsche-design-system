import { borderRadiusSmall, spacingFluidSmall, textMediumStyle } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getCss, type Theme } from '../../../utils';
import type { JssStyle } from 'jss';

export const getComponentCss = (hasSlottedAnchor: boolean, isActive: boolean, theme: Theme): string => {
  const { primaryColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark } = getThemedColors('dark');

  const anchorJssStyle: JssStyle = {
    all: 'unset',
    padding: `calc(${spacingFluidSmall} + 2px) calc(${spacingFluidSmall} + 4px)`, // aligned with link-pure
    margin: `-2px calc(${spacingFluidSmall} * -1 - 4px)`, // aligned with link-pure
    borderRadius: borderRadiusSmall, // needed for focus outline
    font: textMediumStyle.font,
    color: primaryColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      color: primaryColorDark,
    }),
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
              ...getFocusJssStyle(theme, { slotted: 'a', offset: '-2px' }),
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
              ...getFocusJssStyle(theme, { offset: '-2px' }),
            },
          }),
    },
  });
};
