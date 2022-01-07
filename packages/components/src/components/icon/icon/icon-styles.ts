import type { TextColor as IconColor, IconSize, ThemeExtendedElectricDark } from '../../../types';
import { getCss, pxToRemWithUnit, getColor } from '../../../utils';

const sizeMap: { [key in IconSize]: string } = {
  small: pxToRemWithUnit(24),
  medium: pxToRemWithUnit(36),
  large: pxToRemWithUnit(48),
  inherit: 'inherit',
};

export const getComponentCss = (color: IconColor, size: IconSize, theme: ThemeExtendedElectricDark): string => {
  const dimension = sizeMap[size];

  return getCss({
    ':host': {
      display: 'inline-flex',
      verticalAlign: 'top',
    },
    root: {
      display: 'flex',
      flexShrink: 0,
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      width: dimension,
      height: dimension,
      color: getColor(color, theme),
      '& > svg': {
        fill: 'currentcolor',
      },
    },
  });
};
