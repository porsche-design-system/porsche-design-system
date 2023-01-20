import type { JssStyle } from 'jss';
import type { SpinnerSize } from './spinner-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { getScreenReaderOnlyJssStyle, getThemedColors } from '../../styles';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

const sizeSmall = '48px';
const sizeMedium = '72px';
const sizeLarge = '104px';

const sizeMap: Record<SpinnerSize, Pick<JssStyle, 'height' | 'width'>> = {
  small: { height: sizeSmall, width: sizeSmall },
  medium: { height: sizeMedium, width: sizeMedium },
  large: { height: sizeLarge, width: sizeLarge },
  inherit: { height: 'inherit', width: 'inherit' },
};

export const getComponentCss = (size: BreakpointCustomizable<SpinnerSize>, theme: Theme): string => {
  const animationDuration = 'var(--p-animation-duration__spinner, 2s)';
  const { primaryColor, contrastMediumColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
      },
      ...hostHiddenStyles,
      svg: {
        display: 'block',
        position: 'relative',
        fill: 'none',
        transform: 'translate3d(0,0,0)',
        animation: `$rotate ${animationDuration} linear infinite`,
      },
      circle: {
        '&:first-child': {
          stroke: contrastMediumColor,
          animation: `$rotate ${animationDuration} linear infinite`, // needs to rotate to eliminate stutter in safari
        },
        '&:last-child': {
          transformOrigin: '0 0',
          animation: `$dash ${animationDuration} ease-in-out infinite`,
          stroke: primaryColor,
          strokeDasharray: 57, // C = 2πR
          strokeLinecap: 'round',
        },
      },
      '@keyframes rotate': {
        '0%': {
          transform: 'rotateZ(0deg)',
        },
        '100%': {
          transform: 'rotateZ(360deg)',
        },
      },
      '@keyframes dash': {
        '0%': {
          strokeDashoffset: 57,
          transform: 'rotateZ(0)',
        },
        '50%, 75%': {
          strokeDashoffset: 20,
          transform: 'rotateZ(80deg)',
        },

        '100%': {
          strokeDashoffset: 57,
          transform: 'rotateZ(360deg)',
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
