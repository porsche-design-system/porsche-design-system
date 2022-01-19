import { addImportantToEachRule, getCss, getThemedColors } from '../../../../utils';
import type { ThemeExtendedElectric } from '../../../../types';

export const getComponentCss = (theme: ThemeExtendedElectric): string => {
  const { baseColor } = getThemedColors(theme);

  return getCss({
    ':host': addImportantToEachRule({
      display: 'block',
      outline: 'transparent solid 1px',
      '&([hidden])': {
        display: 'none',
      },
      '&(:focus)': {
        outlineColor: baseColor,
      },
      '&(:focus:not(:focus-visible))': {
        outlineColor: 'transparent',
      },
    }),
  });
};
