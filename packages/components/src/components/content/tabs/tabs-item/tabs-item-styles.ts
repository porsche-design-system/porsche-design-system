import type { ThemeExtendedElectric } from '../../../../types';
import { getCss, isSafari } from '../../../../utils';
import { addImportantToEachRule, getFocusStyles, getThemedColors } from '../../../../styles';
import type { JssStyle } from 'jss';

export const getComponentCss = (theme: ThemeExtendedElectric): string => {
  // TODO: remove safari fallback once :focus-visible is supported
  const hostFocusStyle = isSafari
    ? { outline: 0 }
    : Object.entries(getFocusStyles({ color: getThemedColors(theme).baseColor })).reduce((result, [key, val]) => {
        result[key.startsWith('&') ? `&(${key.slice(1)})` : key] = val;
        return result;
      }, {} as JssStyle);

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
