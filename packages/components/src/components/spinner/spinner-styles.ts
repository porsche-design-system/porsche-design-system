import type { JssStyle } from 'jss';
import type { SpinnerSize, SpinnerSizeType } from './spinner-utils';
import type { ThemeExtendedElectricDark } from '../../types';
import { buildResponsiveStyles, buildSlottedStyles, getCss, isThemeDark, isThemeDarkElectric } from '../../utils';
import { getBaseSlottedStyles, pxToRemWithUnit, getThemedColors, getScreenReaderOnlyJssStyle } from '../../styles';

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
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
      },
      svg: {
        display: 'block',
        position: 'relative',
        fill: 'none',
        transform: 'translate3d(0,0,0)',
      },
      circle: {
        stroke: isThemeDark(theme) || isThemeDarkElectric(theme) ? baseColor : contrastHighColor,
        '&:first-child': {
          opacity: 0.4,
        },
        '&:last-child': {
          transformOrigin: '0 0',
          animation: `$rotate ${animationDuration} linear infinite,$dash ${animationDuration} ease-in-out infinite`,
          strokeDasharray: '40, 200',
          strokeDashoffset: 0,
          strokeLinecap: 'round',
        },
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
    },
    root: {
      display: 'block',
      ...buildResponsiveStyles(size, (s: SpinnerSizeType) => sizeMap[s]),
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      strokeWidth: 1,
    },
    'sr-only': getScreenReaderOnlyJssStyle(),
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
