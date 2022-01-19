import { addImportantToEachRule, getCss, getFocusStyles, getThemedColors } from '../../../../utils';
import type { ThemeExtendedElectric } from '../../../../types';
import type { JssStyle } from '../../../../utils';

export const getComponentCss = (theme: ThemeExtendedElectric): string => {
  const { baseColor } = getThemedColors(theme);

  const hostFocusStyle: JssStyle = getFocusStyles({ color: baseColor });
  Object.keys(hostFocusStyle).forEach((item) => {
    if (item.charAt(0) === '&') {
      hostFocusStyle[`&(${item.slice(1)})`] = hostFocusStyle[item];
      delete hostFocusStyle[item];
    }
  });

  return getCss({
    ':host': addImportantToEachRule({
      display: 'block',
      '&([hidden])': {
        display: 'none',
      },
      ...hostFocusStyle,
    }),
  });
};
