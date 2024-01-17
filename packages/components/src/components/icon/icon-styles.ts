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
import {
  addImportantToEachRule,
  hostHiddenStyles,
  getSchemedHighContrastMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  colorSchemeStyles,
} from '../../styles';
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
import type { IconName } from '../../types';

const sizeMap: Record<Exclude<TextSize, 'inherit'>, string> = {
  'xx-small': fontSizeTextXXSmall,
  'x-small': fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  'x-large': fontSizeTextXLarge,
};

const filterLight: Record<Exclude<IconColor, IconColorDeprecated | 'inherit'>, string> = {
  primary: filterLightPrimary,
  'state-disabled': filterLightDisabled,
  'contrast-low': filterLightContrastLow,
  'contrast-medium': filterLightContrastMedium,
  'contrast-high': filterLightContrastHigh,
  'notification-success': filterLightNotificationSuccess,
  'notification-warning': filterLightNotificationWarning,
  'notification-error': filterLightNotificationError,
  'notification-info': filterLightNotificationInfo,
};

const filterDark: Record<Exclude<IconColor, IconColorDeprecated | 'inherit'>, string> = {
  primary: filterDarkPrimary,
  'state-disabled': filterDarkDisabled,
  'contrast-low': filterDarkContrastLow,
  'contrast-medium': filterDarkContrastMedium,
  'contrast-high': filterDarkContrastHigh,
  'notification-success': filterDarkNotificationSuccess,
  'notification-warning': filterDarkNotificationWarning,
  'notification-error': filterDarkNotificationError,
  'notification-info': filterDarkNotificationInfo,
};

const filterMap: Record<Theme, Record<Exclude<IconColor, IconColorDeprecated | 'inherit'>, string>> = {
  auto: filterLight,
  light: filterLight,
  dark: filterDark,
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

const cssVariableFilter = '--p-internal-icon-filter';

const isFlippableIcon = (name: IconName, source: string): boolean => {
  return (
    !source &&
    (name === 'arrow-double-left' ||
      name === 'arrow-double-right' ||
      name === 'arrow-first' ||
      name === 'arrow-head-left' ||
      name === 'arrow-head-right' ||
      name === 'arrow-last' ||
      name === 'arrow-left' ||
      name === 'arrow-right' ||
      name === 'chart' ||
      name === 'chat' ||
      name === 'external' ||
      name === 'increase' ||
      name === 'list' ||
      name === 'logout' ||
      name === 'send')
  );
};

export const getComponentCss = (
  name: IconName,
  source: string,
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
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      img: {
        display: 'block', // without display, img tag gets some extra spacing
        margin: 0,
        padding: 0,
        pointerEvents: 'none', // disable dragging/ghosting of images
        ...(!isColorInherit && {
          filter: `var(${cssVariableFilter},${filterMap[theme][color]})`,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            filter: `var(${cssVariableFilter},${filterMap.dark[color]})`,
          }),
          ...(isHighContrastMode &&
            getSchemedHighContrastMediaQuery(
              {
                filter: filterMap.light[color],
              },
              {
                filter: filterMap.dark[color],
              }
            )),
          WebkitAnimation: `${isDark ? keyFramesDark : keyFramesLight}-${color} 1ms`, // needed to enforce repaint in Safari if theme is switched programmatically.
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
        ...(isFlippableIcon(name, source) && {
          '&:dir(rtl)': {
            transform: 'scaleX(-1)',
          },
        }),
      },
      ...(!isColorInherit && {
        [`@keyframes ${isDark ? keyFramesDark : keyFramesLight}-${color}`]: forceRerenderAnimationStyle,
      }),
    },
  });
};
