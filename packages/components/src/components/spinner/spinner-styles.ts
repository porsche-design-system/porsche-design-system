import type { JssStyle } from 'jss';
import type { SpinnerSize } from './spinner-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToRule, getScreenReaderOnlyJssStyle, getThemedColors } from '../../styles';

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
      ':host([hidden])': {
        display: addImportantToRule('none'),
      },
      svg: {
        display: 'block',
        position: 'relative',
        fill: 'none',
        transform: 'translate3d(0,0,0)',
      },
      circle: {
        '&:first-child': {
          stroke: contrastMediumColor,
        },
        '&:last-child': {
          transformOrigin: '0 0',
          animation: `$rotate ${animationDuration} linear infinite,$dash ${animationDuration} ease-in-out infinite`,
          stroke: primaryColor,
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
