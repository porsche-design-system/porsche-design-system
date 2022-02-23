import type { ThemeExtendedElectric } from '../../../../types';
import { getCss } from '../../../../utils';
import { addImportantToEachRule, getFocusStyle, getThemedColors } from '../../../../styles';

export const getComponentCss = (theme: ThemeExtendedElectric): string => {
  const { baseColor } = getThemedColors(theme);

  const hostFocusStyle = Object.entries(getFocusStyle({ color: baseColor })).reduce((newObj, [key, val]) => {
    if (key.startsWith('&')) {
      newObj[`&(${key.slice(1)})`] = val;
    } else {
      newObj[key] = val;
    }
    return newObj;
  }, {});

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
