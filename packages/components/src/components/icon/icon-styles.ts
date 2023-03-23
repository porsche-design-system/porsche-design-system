import type { TextSize, Theme } from '../../types';
import { getCss } from '../../utils';
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
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import type { IconColor, IconColorDeprecated } from './icon-utils';
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
    'state-disabled': filterLightContrastMedium,
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
    'state-disabled': filterDarkContrastMedium,
    'contrast-low': filterDarkContrastLow,
    'contrast-medium': filterDarkContrastMedium,
    'contrast-high': filterDarkContrastHigh,
    'notification-success': filterDarkNotificationSuccess,
    'notification-warning': filterDarkNotificationWarning,
    'notification-error': filterDarkNotificationError,
    'notification-info': filterDarkNotificationInfo,
  },
};

export const getComponentCss = (
  color: Exclude<IconColor, IconColorDeprecated>,
  size: TextSize,
  theme: Theme
): string => {
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
    },
  });
};
