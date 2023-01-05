import type { JssStyle } from 'jss';
import type { SpinnerSize } from './spinner-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, buildSlottedStyles, getCss, isThemeDark } from '../../utils';
import { getBaseSlottedStyles, getScreenReaderOnlyJssStyle, getThemedColors, pxToRemWithUnit } from '../../styles';

const sizeSmall = pxToRemWithUnit(48);
const sizeMedium = pxToRemWithUnit(72);
const sizeLarge = pxToRemWithUnit(104);

const sizeMap: Record<SpinnerSize, Pick<JssStyle, 'height' | 'width'>> = {
  small: { height: sizeSmall, width: sizeSmall },
  medium: { height: sizeMedium, width: sizeMedium },
  large: { height: sizeLarge, width: sizeLarge },
  inherit: { height: 'inherit', width: 'inherit' },
};

export const getComponentCss = (
  size: BreakpointCustomizable<SpinnerSize>,
  theme: Theme
): string => {
  const { contrastHighColor, primaryColor } = getThemedColors(theme);
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
        stroke: isThemeDark(theme) ? primaryColor : contrastHighColor,
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
      ...buildResponsiveStyles(size, (s: SpinnerSize) => sizeMap[s]),
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
