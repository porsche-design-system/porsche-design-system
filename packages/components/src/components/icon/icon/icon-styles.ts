import type { TextColor, IconSize, ThemeExtendedElectricDark } from '../../../types';
import { getCss } from '../../../utils';
import { pxToRemWithUnit } from '../../../styles/common';
import { getThemedTextColors } from '../../../styles/colors';

const sizeMap: { [key in IconSize]: string } = {
  small: pxToRemWithUnit(24),
  medium: pxToRemWithUnit(36),
  large: pxToRemWithUnit(48),
  inherit: 'inherit',
};

export const getComponentCss = (color: TextColor, size: IconSize, theme: ThemeExtendedElectricDark): string => {
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
      color: getThemedTextColors(theme, color),
      '& > svg': {
        fill: 'currentColor',
        // TODO: This is a temporary fallback for Chromium and should be removed if this bug is resolved: https://bugs.chromium.org/p/chromium/issues/detail?id=1242706
        // further information: https://melanie-richards.com/blog/currentcolor-svg-hcm/
        '@media (forced-colors: active)': {
          fill: 'canvasText',
        },
      },
    },
  });
};
