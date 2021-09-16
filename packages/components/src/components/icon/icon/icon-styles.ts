import type { Theme, TextColor as IconColor, IconSize } from '../../../types';
import { attachComponentCss, buildHostStyles, getCss, getThemedColors, pxToRemWithUnit } from '../../../utils';

const getColor = (color: IconColor, theme: Theme): string => {
  const {
    textColor,
    brandColor,
    contrastHighColor,
    contrastMediumColor,
    contrastLowColor,
    successColor,
    errorColor,
    warningColor,
    neutralColor,
  } = getThemedColors(theme);
  switch (color) {
    case 'brand':
      return brandColor;
    case 'neutral-contrast-high':
      return contrastHighColor;
    case 'neutral-contrast-medium':
      return contrastMediumColor;
    case 'neutral-contrast-low':
      return contrastLowColor;
    case 'notification-success':
      return successColor;
    case 'notification-warning':
      return warningColor;
    case 'notification-error':
      return errorColor;
    case 'notification-neutral':
      return neutralColor;
    case 'inherit':
      return 'currentColor';
    default:
      return textColor;
  }
};

const getSize = (size: IconSize): string => {
  switch (size) {
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

export const getComponentCss = (color: IconColor, size: IconSize, theme: Theme): string => {
  const dimension = getSize(size);

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
      width: dimension,
      height: dimension,
      fill: getColor(color, theme),
    },
  });
};

export const addComponentCss = (host: HTMLElement, color: IconColor, size: IconSize, theme: Theme): void => {
  attachComponentCss(host, getComponentCss, color, size, theme);
};
