import type { Theme } from '../../../types';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors, hostHiddenStyles, getInsetJssStyle } from '../../../styles';
import { borderRadiusSmall, borderWidthBase } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (theme: Theme): string => {
  const { primaryColor, focusColor } = getThemedColors(theme);
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        position: 'relative',
        color: primaryColor, // enables color inheritance for e.g. slotted anchor
        ...hostHiddenStyles,
        outline: 0,
        '&(:focus:focus-visible)::before': {
          content: '""',
          position: 'absolute',
          ...getInsetJssStyle(-4),
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: borderRadiusSmall,
        },
      }),
    },
  });
};
