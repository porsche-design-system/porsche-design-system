import type { Theme } from '../../../types';
import { getCss } from '../../../utils';
import {
  addImportantToEachRule,
  getThemedColors,
  hostHiddenStyles,
  getInsetJssStyle,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import { borderRadiusSmall, borderWidthBase } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (theme: Theme): string => {
  const { primaryColor, focusColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, focusColor: focusColorDark } = getThemedColors('dark');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          position: 'relative',
          color: primaryColor, // enables color inheritance for e.g. slotted anchor
          outline: 0,
          ...hostHiddenStyles,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
          }),
          '&(:focus:focus-visible)::before': {
            content: '""',
            position: 'absolute',
            ...getInsetJssStyle(-4),
            border: `${borderWidthBase} solid ${focusColor}`,
            borderRadius: borderRadiusSmall,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: focusColorDark,
            }),
          },
        }),
      },
    },
  });
};
