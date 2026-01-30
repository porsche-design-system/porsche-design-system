import { motionDurationVeryLong } from '@porsche-design-system/emotion';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  colors,
  cssVariableAnimationDuration,
  getHiddenTextJssStyle,
  hostHiddenStyles,
} from '../../styles';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { SpinnerSize } from './spinner-utils';

const sizeSmall = '48px';
const sizeMedium = '72px';
const sizeLarge = '104px';

const sizeMap: Record<SpinnerSize, Pick<JssStyle, 'height' | 'width'>> = {
  small: { height: sizeSmall, width: sizeSmall },
  medium: { height: sizeMedium, width: sizeMedium },
  large: { height: sizeLarge, width: sizeLarge },
  inherit: { height: 'inherit', width: 'inherit' },
};

const { primaryColor, contrastLowerColor } = colors;

export const getComponentCss = (size: BreakpointCustomizable<SpinnerSize>): string => {
  const strokeDasharray = '57'; // C = 2πR
  const animationDuration = `var(${cssVariableAnimationDuration}, ${motionDurationVeryLong})`;
  const strokeDasharrayVar = `var(--p-temporary-spinner-stroke-dasharray, ${strokeDasharray})`; // override needed for VRT to visualize both circles

  return getCss({
    '@global': {
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
      ':host': {
        display: 'inline-flex',
        ...addImportantToEachRule({
          verticalAlign: 'top',
          ...hostHiddenStyles,
        }),
      },
      svg: {
        display: 'block', // for correct vertical alignment
        fill: 'none',
        animation: `$rotate ${animationDuration} steps(50) infinite`,
      },
      circle: {
        '&:first-child': {
          stroke: contrastLowerColor,
        },
        '&:last-child': {
          animation: `$dash ${animationDuration} steps(50) infinite`,
          stroke: primaryColor,
          strokeDasharray:
            ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
              ? strokeDasharray
              : strokeDasharrayVar,
          strokeLinecap: 'round',
        },
      },
    },
    root: {
      display: 'block',
      ...buildResponsiveStyles(size, (s: SpinnerSize) => sizeMap[s]),
      strokeWidth: 1.5,
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
