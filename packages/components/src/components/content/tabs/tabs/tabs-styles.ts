import {getCss, pxToRemWithUnit, getThemedColors, getFocusStyles} from '../../../../utils';
import type { ThemeExtendedElectric } from '../../../../types';

export const getComponentCss = (theme: ThemeExtendedElectric): string => {
  const { baseColor } = getThemedColors(theme);
  const {
    '&:focus': focusStyle,
    '&:focus:not(:focus-visible)': focusNotFocusVisibleStyle,
    '&::-moz-focus-inner': mozFocusInnerStyle,
    ...defaultStyle
  } = getFocusStyles({color: baseColor, offset: 1}) as any;

  return getCss({
    ':host': {
      display: 'block',
    },
    root: {
      marginBottom: pxToRemWithUnit(8),
    },
    '::slotted': {
      '&(p-tabs-item)': defaultStyle,
      '&(p-tabs-item:focus)': focusStyle,
      '&(p-tabs-item:focus:not(:focus-visible))': focusNotFocusVisibleStyle,
    },
  });
};
