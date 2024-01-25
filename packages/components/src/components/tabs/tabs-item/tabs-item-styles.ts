import type { Theme } from '../../../types';
import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getFocusJssStyle,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';

export const getComponentCss = (theme: Theme): string => {
  const { primaryColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          color: primaryColor, // enables color inheritance for e.g. slotted anchor
          outline: 0, // prevents :focus
          borderRadius: '2px',
          ...hostHiddenStyles,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
          }),
          ...getFocusJssStyle(theme, { slotted: true }),
        }),
      },
    },
  });
};
