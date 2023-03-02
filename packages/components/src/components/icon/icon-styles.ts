import type { TextSize, Theme } from '../../types';
import { getCss, isThemeDark } from '../../utils';
import {
  fontFamily,
  fontLineHeight,
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
} from '@porsche-design-system/utilities-v2';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import type { IconColor } from './icon-utils';
import {
  filterDarkContrastHigh,
  filterDarkContrastLow,
  filterDarkContrastMedium,
  filterDarkNotificationError,
  filterDarkNotificationInfo,
  filterDarkNotificationSuccess,
  filterDarkNotificationWarning,
  filterDarkPrimary,
  filterLightContrastHigh,
  filterLightContrastLow,
  filterLightContrastMedium,
  filterLightNotificationError,
  filterLightNotificationInfo,
  filterLightNotificationSuccess,
  filterLightNotificationWarning,
  filterLightPrimary,
} from '../../styles/color-filters';

const sizeMap: Record<Exclude<TextSize, 'inherit'>, string> = {
  'x-small': fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  'x-large': fontSizeTextXLarge,
};

const filter: Record<Theme, Record<Exclude<IconColor, 'inherit'>, string>> = {
  light: {
    primary: filterLightPrimary,
    brand: filterLightPrimary, // deprecated
    default: filterLightPrimary, // deprecated
    'state-disabled': filterLightContrastMedium,
    'contrast-low': filterLightContrastLow,
    'neutral-contrast-low': filterLightContrastLow, // deprecated
    'contrast-medium': filterLightContrastMedium,
    'neutral-contrast-medium': filterLightContrastMedium, // deprecated
    'contrast-high': filterLightContrastHigh,
    'neutral-contrast-high': filterLightContrastHigh, // deprecated
    'notification-success': filterLightNotificationSuccess,
    'notification-warning': filterLightNotificationWarning,
    'notification-error': filterLightNotificationError,
    'notification-info': filterLightNotificationInfo,
    'notification-neutral': filterLightNotificationInfo, // deprecated
  },
  dark: {
    primary: filterDarkPrimary,
    brand: filterDarkPrimary, // deprecated
    default: filterDarkPrimary, // deprecated
    'state-disabled': filterDarkContrastMedium,
    'contrast-low': filterDarkContrastLow,
    'neutral-contrast-low': filterDarkContrastLow, // deprecated
    'contrast-medium': filterDarkContrastMedium,
    'neutral-contrast-medium': filterDarkContrastMedium, // deprecated
    'contrast-high': filterDarkContrastHigh,
    'neutral-contrast-high': filterDarkContrastHigh, // deprecated
    'notification-success': filterDarkNotificationSuccess,
    'notification-warning': filterDarkNotificationWarning,
    'notification-error': filterDarkNotificationError,
    'notification-info': filterDarkNotificationInfo,
    'notification-neutral': filterDarkNotificationInfo, // deprecated
  },
};

const forceRerenderAnimationStyle = {
  '0%': {
    transform: 'rotateZ(0)',
  },
  '100%': {
    transform: 'rotateZ(0)',
  },
};
const keyFramesLight = 'rerender-light';
const keyFramesDark = 'rerender-dark';

export const getComponentCss = (color: IconColor, size: TextSize, theme: Theme): string => {
  const isColorInherit = color === 'inherit';
  const isSizeInherit = size === 'inherit';

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      img: {
        display: 'block', // without display, img tag gets some extra spacing
        margin: 0,
        padding: 0,
        ...(!isColorInherit && {
          filter: filter[theme][color],
          WebkitAnimation: `${theme === 'light' ? keyFramesLight : keyFramesDark} 1ms`, // needed to enforce repaint in Safari if theme is switched programmatically.
        }),
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
      ...(!isColorInherit && {
        [`@keyframes ${isThemeDark(theme) ? keyFramesDark : keyFramesLight}`]: forceRerenderAnimationStyle,
      }),
    },
  });
};
