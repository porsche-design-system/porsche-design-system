import { getCss, addImportantToEachRule, pxToRemWithUnit, getThemedColors } from '../../../../utils';
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
    ...addImportantToEachRule({
      '::slotted(p-tabs-item)': {
        outline: '1px solid transparent',
        WebkitAppearance: 'none',
        appearance: 'none',
        outlineOffset: '1px',
      },
      '::slotted(p-tabs-item:focus)': {
        outlineColor: baseColor,
      },
      '::slotted(p-tabs-item:focus:not(:focus-visible))': {
        outlineColor: 'transparent',
      },
    }),
  });
};
