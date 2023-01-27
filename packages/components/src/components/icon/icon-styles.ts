import type { IconSize, TextColor, Theme } from '../../types';
import { getCss } from '../../utils';
import { getThemedTextColor } from '../../styles/text-icon-styles';
import {
  fontFamily,
  fontLineHeight,
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
} from '@porsche-design-system/utilities-v2';

const sizeMap: { [key in IconSize]: string } = {
  'x-small': fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  'x-large': fontSizeTextXLarge,
  inherit: null,
};

export const getComponentCss = (color: TextColor, size: IconSize, theme: Theme): string => {
  const isSizeInherit = size === 'inherit';

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
      },
      img: {
        filter: ['dark', 'dark-electric'].includes(theme) ? 'invert(100%)' : 'none',
      },
      svg: {
        fill: 'currentColor',
        // TODO: This is a temporary fallback for Chromium and should be removed if this bug is resolved: https://bugs.chromium.org/p/chromium/issues/detail?id=1242706
        // further information: https://melanie-richards.com/blog/currentcolor-svg-hcm/
        '@media (forced-colors: active)': {
          fill: 'canvasText',
        },
      },
    },
    root: {
      display: 'flex',
      flexShrink: 0,
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      color: getThemedTextColor(theme, color),
      ...(isSizeInherit
        ? {
            width: size,
            height: size,
          }
        : {
            width: fontLineHeight,
            height: fontLineHeight,
            font: `${sizeMap[size]} ${fontFamily}`,
          }),
    },
  });
};
