import type { ThemeExtendedElectric } from '../../../../types';
import { getCss } from '../../../../utils';
import { addImportantToEachRule, getFocusJssStyle, getThemedColors } from '../../../../styles';
import { getFocusVisibleFallback } from '../../../../styles/focus-visible-fallback';
import type { JssStyle } from 'jss';

export const getComponentCss = (theme: ThemeExtendedElectric): string => {
  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        '&([hidden])': {
          display: 'none',
        },
        ...getFocusVisibleFallback(
          Object.entries(getFocusJssStyle({ color: getThemedColors(theme).baseColor })).reduce((result, [key, val]) => {
            result[key.startsWith('&') ? `&(${key.slice(1)})` : key] = val;
            return result;
          }, {} as JssStyle)
        ),
      }),
    },
  });
};
