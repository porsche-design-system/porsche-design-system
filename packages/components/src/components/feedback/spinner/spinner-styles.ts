import {
  buildGlobalStyles,
  buildHostStyles,
  buildResponsiveStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColors,
  isDark,
  isDarkElectric,
  pxToRemWithUnit,
} from '../../../utils';
import type { SpinnerSize, SpinnerSizeType } from './spinner-utils';
import { JssStyle } from 'jss';
import { srOnly } from '@porsche-design-system/utilities';
import { ThemeExtendedElectricDark } from '../../../types';

const sizeSmall = pxToRemWithUnit(48);
const sizeMedium = pxToRemWithUnit(72);
const sizeLarge = pxToRemWithUnit(104);

const sizeMap: { [key in SpinnerSizeType]: Pick<JssStyle, 'height' | 'width'> } = {
  small: { height: sizeSmall, width: sizeSmall },
  medium: { height: sizeMedium, width: sizeMedium },
  large: { height: sizeLarge, width: sizeLarge },
  inherit: { height: 'inherit', width: 'inherit' },
};

export const getComponentCss = (size: SpinnerSize, theme: ThemeExtendedElectricDark): string => {
  const { contrastHighColor, baseColor } = getThemedColors(theme);
  const animationDuration = 'var(--p-animation-duration__spinner, 2s)';

  return getCss({
    ...buildHostStyles({
      display: 'inline-flex',
      verticalAlign: 'top',
    }),
    root: {
      display: 'block',
      ...buildResponsiveStyles(size, (s: SpinnerSizeType) => sizeMap[s]),
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      strokeWidth: 1,
      animationDuration,
    },
    'sr-oonly': srOnly(),
    ...buildGlobalStyles({
      circle: {
        stroke: isDark(theme) || isDarkElectric(theme) ? baseColor : contrastHighColor,
      },
      svg: {
        display: 'block',
        position: 'relative',
        fill: 'none',
        transform: 'translate3d(0,0,0)',
      },
      'circle:first-child': {
        opacity: 0.4,
      },
      'circle:last-child': {
        transformOrigin: '0 0',
        animation: `$rotate ${animationDuration} linear infinite,$dash ${animationDuration} ease-in-out infinite`,
        strokeDasharray: '40, 200',
        strokeDashoffset: 0,
        strokeLinecap: 'round',
      },
      '@keyframes rotate': {
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      '@keyframes dash': {
        '0%': {
          strokeDasharray: '3, 1000',
        },
        '50%': {
          strokeDasharray: '42, 1000',
        },
        '100%': {
          strokeDasharray: '30, 1000',
          strokeDashoffset: '-52',
        },
      },
    }),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
