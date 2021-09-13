import type { Theme, TextColor as IconColor, IconSize } from '../../../types';
import { attachCss, buildHostStyles, getCss, isDark, pxToRemWithUnit } from '../../../utils';
import { color } from '@porsche-design-system/utilities';

const getColor = (iconColor: IconColor, theme: Theme): string => {
  const {
    default: baseColor,
    brand,
    neutralContrast: { high, medium, low },
    notification: { success, warning, error, neutral },
  } = isDark(theme) ? color.darkTheme : color;

  switch (iconColor) {
    case 'brand':
      return brand;
    case 'neutral-contrast-high':
      return high;
    case 'neutral-contrast-medium':
      return medium;
    case 'neutral-contrast-low':
      return low;
    case 'notification-success':
      return success;
    case 'notification-warning':
      return warning;
    case 'notification-error':
      return error;
    case 'notification-neutral':
      return neutral;
    case 'inherit':
      return 'currentColor';
    default:
      return baseColor;
  }
};

const getSize = (iconSize: IconSize): string => {
  switch (iconSize) {
    case 'large':
      return pxToRemWithUnit(48);
    case 'medium':
      return pxToRemWithUnit(36);
    case 'inherit':
      return 'inherit';
    default:
      return pxToRemWithUnit(24);
  }
};

export const getComponentCss = (iconColor: IconColor, iconSize: IconSize, theme: Theme): string => {
  const size = getSize(iconSize);

  return getCss({
    ...buildHostStyles({
      display: 'inline-flex',
      verticalAlign: 'top',
    }),
    root: {
      display: 'flex',
      flexShrink: 0,
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      width: size,
      height: size,
      fill: getColor(iconColor, theme),
    },
  });
};

export const addComponentCss = (host: HTMLElement, iconColor: IconColor, iconSize: IconSize, theme: Theme): void => {
  attachCss(host, getComponentCss(iconColor, iconSize, theme));
};
