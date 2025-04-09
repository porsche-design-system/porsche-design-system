import {
  borderRadiusSmall,
  frostedGlassStyle,
  spacingFluidSmall,
  spacingStaticSmall,
  textMediumStyle,
} from '@porsche-design-system/styles';
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

export const getComponentCss = (isActive: boolean, theme: Theme): string => {
  const { primaryColor, hoverColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, hoverColor: hoverColorDark } = getThemedColors('dark');

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
      button: {
        all: 'unset',
        display: 'flex',
        gap: spacingStaticSmall,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `calc(${spacingFluidSmall} + 2px) calc(${spacingFluidSmall} + 4px)`, // aligned with link-pure
        margin: `-2px calc(${spacingFluidSmall} * -1 - 4px)`, // aligned with link-pure
        borderRadius: borderRadiusSmall, // needed for focus outline and hover
        font: textMediumStyle.font,
        color: primaryColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
        }),
        cursor: isActive ? 'default' : 'pointer',
        transition: getTransition('background'),
        ...(isActive && {
          ...frostedGlassStyle,
          background: hoverColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: hoverColorDark,
          }),
        }),
        ...hoverMediaQuery({
          '&:hover': {
            ...frostedGlassStyle,
            background: hoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: hoverColorDark,
            }),
          },
        }),
        ...getFocusJssStyle(theme, { offset: '-2px' }),
      },
    },
  });
};
