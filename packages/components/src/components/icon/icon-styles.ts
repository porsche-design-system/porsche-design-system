import type { IconSize, TextColor, ThemeExtendedElectricDark } from '../../types';
import { getCss } from '../../utils';
import { pxToRemWithUnit } from '../../styles';
import { getThemedTextColor } from '../../styles/text-icon-styles';

const sizeMap: { [key in IconSize]: string } = {
  small: pxToRemWithUnit(24),
  medium: pxToRemWithUnit(36),
  large: pxToRemWithUnit(48),
  inherit: 'inherit',
};

const filterMapLight: { [key in TextColor]: string } = {
  inherit: 'none',
  brand: 'invert(19%) sepia(81%) saturate(5201%) hue-rotate(343deg) brightness(78%) contrast(118%)',
  default: 'none',
  'neutral-contrast-high': 'invert(13%) sepia(1%) saturate(4107%) hue-rotate(164deg) brightness(105%) contrast(81%)',
  'neutral-contrast-medium': 'invert(40%) sepia(7%) saturate(287%) hue-rotate(163deg) brightness(96%) contrast(89%)',
  'neutral-contrast-low': 'invert(97%) sepia(4%) saturate(54%) hue-rotate(169deg) brightness(95%) contrast(92%)',
  'notification-success': 'invert(25%) sepia(73%) saturate(6345%) hue-rotate(137deg) brightness(98%) contrast(99%)',
  'notification-warning': 'invert(57%) sepia(72%) saturate(1178%) hue-rotate(359deg) brightness(100%) contrast(107%)',
  'notification-error': 'invert(11%) sepia(77%) saturate(6300%) hue-rotate(359deg) brightness(94%) contrast(115%)',
  'notification-neutral': 'invert(23%) sepia(55%) saturate(6693%) hue-rotate(198deg) brightness(89%) contrast(101%)',
};

const filterMapDark: { [key in TextColor]: string } = {
  inherit: 'none',
  brand: 'invert(19%) sepia(81%) saturate(5201%) hue-rotate(343deg) brightness(78%) contrast(118%)',
  default: 'invert(100%) sepia(2%) saturate(7467%) hue-rotate(258deg) brightness(102%) contrast(97%)',
  'neutral-contrast-high': 'invert(100%) sepia(17%) saturate(334%) hue-rotate(175deg) brightness(87%) contrast(107%)',
  'neutral-contrast-medium': 'invert(85%) sepia(0%) saturate(1780%) hue-rotate(321deg) brightness(83%) contrast(97%)',
  'neutral-contrast-low': 'invert(28%) sepia(7%) saturate(367%) hue-rotate(164deg) brightness(98%) contrast(87%)',
  'notification-success': 'invert(48%) sepia(30%) saturate(5281%) hue-rotate(102deg) brightness(99%) contrast(106%)',
  'notification-warning': 'invert(58%) sepia(55%) saturate(1685%) hue-rotate(0deg) brightness(103%) contrast(105%)',
  'notification-error': 'invert(32%) sepia(74%) saturate(5437%) hue-rotate(349deg) brightness(95%) contrast(108%)',
  'notification-neutral': 'invert(54%) sepia(61%) saturate(4567%) hue-rotate(192deg) brightness(101%) contrast(105%)',
};

const getFilterMap = (color: TextColor, theme: ThemeExtendedElectricDark): string => {
  switch (theme) {
    case 'light':
    case 'light-electric':
      return filterMapLight[color];
    case 'dark':
    case 'dark-electric':
      return filterMapDark[color];
  }
};

export const getComponentCss = (color: TextColor, size: IconSize, theme: ThemeExtendedElectricDark): string => {
  const dimension = sizeMap[size];

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
      },
      img: {
        filter: getFilterMap(color, theme),
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
      width: dimension,
      height: dimension,
      color: getThemedTextColor(theme, color),
    },
  });
};
