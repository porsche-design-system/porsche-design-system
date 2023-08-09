import type { JssStyle } from 'jss';
import type { SpinnerSize } from './spinner-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isHighContrastMode } from '../../utils';
import {
  addImportantToEachRule,
  getHiddenTextJssStyle,
  getHighContrastColors,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';

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
  const strokeDasharray = '57'; // C = 2πR
  const animationDuration = 'var(--p-animation-duration, 2s)';
  const strokeDasharrayVar = `var(--p-temporary-spinner-stroke-dasharray, ${strokeDasharray})`; // override needed for VRT to visualize both circles
  const { primaryColor, contrastMediumColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');
  const { canvasColor, canvasTextColor } = getHighContrastColors();

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        colorScheme: 'light dark',
        display: 'inline-flex',
        verticalAlign: 'top',
        ...hostHiddenStyles,
      }),
      svg: {
        display: 'block',
        position: 'relative',
        fill: 'none',
        transform: 'translate3d(0,0,0)',
        animation: `$rotate ${animationDuration} linear infinite`,
      },
      circle: {
        '&:first-child': {
          // TODO: High Contrast Mode should be handled within a local color helper function
          stroke: isHighContrastMode ? canvasTextColor : contrastMediumColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            stroke: isHighContrastMode ? canvasTextColor : contrastMediumColorDark,
          }),
          animation: `$rotate ${animationDuration} linear infinite`, // needs to rotate to eliminate stutter in safari
        },
        '&:last-child': {
          transformOrigin: '0 0',
          animation: `$dash ${animationDuration} ease-in-out infinite`,
          // TODO: High Contrast Mode should be handled within a local color helper function
          stroke: isHighContrastMode ? canvasColor : primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            stroke: isHighContrastMode ? canvasColor : primaryColorDark,
          }),
          strokeDasharray:
            ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
              ? strokeDasharray
              : strokeDasharrayVar,
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
      strokeWidth: 1.5,
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
