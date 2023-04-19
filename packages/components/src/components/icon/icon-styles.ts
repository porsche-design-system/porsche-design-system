import type { TextSize, Theme } from '../../types';
import { getCss, isThemeDark, isHighContrastMode } from '../../utils';
import {
  fontFamily,
  fontLineHeight,
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
  fontSizeTextXXSmall,
} from '@porsche-design-system/utilities-v2';
import { addImportantToEachRule, hostHiddenStyles, getSchemedHighContrastMediaQuery } from '../../styles';
import type { IconColor, IconColorDeprecated } from './icon-utils';
import {
  filterDarkContrastHigh,
  filterDarkContrastLow,
  filterDarkContrastMedium,
  filterDarkDisabled,
  filterDarkNotificationError,
  filterDarkNotificationInfo,
  filterDarkNotificationSuccess,
  filterDarkNotificationWarning,
  filterDarkPrimary,
  filterLightContrastHigh,
  filterLightContrastLow,
  filterLightContrastMedium,
  filterLightDisabled,
  filterLightNotificationError,
  filterLightNotificationInfo,
  filterLightNotificationSuccess,
  filterLightNotificationWarning,
  filterLightPrimary,
} from '../../styles/color-filters';

const sizeMap: Record<Exclude<TextSize, 'inherit'>, string> = {
  'xx-small': fontSizeTextXXSmall,
  'x-small': fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  'x-large': fontSizeTextXLarge,
};

const filter: Record<Theme, Record<Exclude<IconColor, IconColorDeprecated | 'inherit'>, string>> = {
  light: {
    primary: filterLightPrimary,
    'state-disabled': filterLightDisabled,
    'contrast-low': filterLightContrastLow,
    'contrast-medium': filterLightContrastMedium,
    'contrast-high': filterLightContrastHigh,
    'notification-success': filterLightNotificationSuccess,
    'notification-warning': filterLightNotificationWarning,
    'notification-error': filterLightNotificationError,
    'notification-info': filterLightNotificationInfo,
  },
  dark: {
    primary: filterDarkPrimary,
    'state-disabled': filterDarkDisabled,
    'contrast-low': filterDarkContrastLow,
    'contrast-medium': filterDarkContrastMedium,
    'contrast-high': filterDarkContrastHigh,
    'notification-success': filterDarkNotificationSuccess,
    'notification-warning': filterDarkNotificationWarning,
    'notification-error': filterDarkNotificationError,
    'notification-info': filterDarkNotificationInfo,
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

export const getComponentCss = (
  color: Exclude<IconColor, IconColorDeprecated>,
  size: TextSize,
  theme: Theme
): string => {
  const isColorInherit = color === 'inherit';
  const isSizeInherit = size === 'inherit';
  const isDark = isThemeDark(theme);

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
          ...(isHighContrastMode &&
            getSchemedHighContrastMediaQuery(
              {
                filter: filter.light[color],
              },
              {
                filter: filter.dark[color],
              }
            )),
          WebkitAnimation: `${isDark ? keyFramesDark : keyFramesLight} 1ms`, // needed to enforce repaint in Safari if theme is switched programmatically.
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
        [`@keyframes ${isDark ? keyFramesDark : keyFramesLight}`]: forceRerenderAnimationStyle,
      }),
    },
  });
};
