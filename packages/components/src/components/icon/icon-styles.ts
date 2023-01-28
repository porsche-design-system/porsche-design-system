import type { TextColor, TextSize, Theme } from '../../types';
import { getCss } from '../../utils';
import {
  fontFamily,
  fontLineHeight,
  fontSizeTextLarge,
  fontSizeTextMedium,
  fontSizeTextSmall,
  fontSizeTextXLarge,
  fontSizeTextXSmall,
} from '@porsche-design-system/utilities-v2';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';
import { addImportantToEachRule } from '../../styles';

const sizeMap: { [key in Exclude<TextSize, 'inherit'>]: string } = {
  'x-small': fontSizeTextXSmall,
  small: fontSizeTextSmall,
  medium: fontSizeTextMedium,
  large: fontSizeTextLarge,
  'x-large': fontSizeTextXLarge,
};

// TODO: shall icon component support 'disabled' color too? For e.g. button-pure disabled state?
const filterLightPrimary = 'invert(3%) sepia(7%) saturate(2930%) hue-rotate(188deg) brightness(91%) contrast(103%)';
const filterLightContrastLow = 'invert(93%) sepia(11%) saturate(36%) hue-rotate(201deg) brightness(89%) contrast(102%)';
const filterLightContrastMedium =
  'invert(65%) sepia(6%) saturate(119%) hue-rotate(187deg) brightness(90%) contrast(92%)';
const filterLightContrastHigh = 'invert(40%) sepia(2%) saturate(686%) hue-rotate(187deg) brightness(80%) contrast(94%)';
const filterLightNotificationSuccess =
  'invert(62%) sepia(61%) saturate(551%) hue-rotate(86deg) brightness(86%) contrast(80%)';
const filterLightNotificationWarning =
  'invert(74%) sepia(91%) saturate(343%) hue-rotate(348deg) brightness(92%) contrast(86%)';
const filterLightNotificationError =
  'invert(25%) sepia(62%) saturate(2003%) hue-rotate(335deg) brightness(100%) contrast(97%)';
const filterLightNotificationInfo =
  'invert(31%) sepia(32%) saturate(5493%) hue-rotate(216deg) brightness(90%) contrast(107%)';

const filterDarkPrimary = 'invert(97%) sepia(55%) saturate(2840%) hue-rotate(180deg) brightness(114%) contrast(103%)';
const filterDarkContrastLow = 'invert(20%) sepia(7%) saturate(421%) hue-rotate(202deg) brightness(97%) contrast(82%)';
const filterDarkContrastMedium =
  'invert(54%) sepia(4%) saturate(229%) hue-rotate(187deg) brightness(91%) contrast(84%)';
const filterDarkContrastHigh = 'invert(68%) sepia(6%) saturate(108%) hue-rotate(187deg) brightness(104%) contrast(88%)';
const filterDarkNotificationSuccess =
  'invert(59%) sepia(22%) saturate(1342%) hue-rotate(86deg) brightness(96%) contrast(88%)';
const filterDarkNotificationWarning =
  'invert(72%) sepia(94%) saturate(303%) hue-rotate(354deg) brightness(89%) contrast(94%)';
const filterDarkNotificationError =
  'invert(28%) sepia(34%) saturate(3133%) hue-rotate(333deg) brightness(95%) contrast(100%)';
const filterDarkNotificationInfo =
  'invert(31%) sepia(32%) saturate(5493%) hue-rotate(216deg) brightness(90%) contrast(107%)';

const filter: { [theme in Theme]: { [color in Exclude<TextColor, 'inherit'>]: string } } = {
  light: {
    primary: filterLightPrimary,
    brand: filterLightPrimary, // deprecated
    default: filterLightPrimary, // deprecated
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

export const getComponentCss = (color: TextColor, size: TextSize, theme: Theme): string => {
  const isColorInherit = color === 'inherit';
  const isSizeInherit = size === 'inherit';

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        ...hostHiddenStyles,
        display: 'inline-block',
        verticalAlign: 'top',
      }),
      img: {
        display: 'block', // without img tag gets some extra spacing
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
