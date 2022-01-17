import { getCss, pxToRemWithUnit, getThemedColors } from '../../../../utils';
import type { ThemeExtendedElectric } from '../../../../types';

export const getComponentCss = (theme: ThemeExtendedElectric): string => {
  const { baseColor } = getThemedColors(theme);
  return getCss({
    ':host': {
      display: 'block',
    },
    root: {
      marginBottom: pxToRemWithUnit(8),
    },
    '::slotted': {
      '&(p-tabs-item)': {
        outline: '1px solid transparent',
        WebkitAppearance: 'none',
        appearance: 'none',
        outlineOffset: '1px',
      },
      '&(p-tabs-item:focus)': {
        outlineColor: baseColor,
      },
      '&(p-tabs-item:focus:not(:focus-visible))': {
        outlineColor: 'transparent',
      },
    },
  });
};
