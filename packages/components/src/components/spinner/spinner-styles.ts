import {
  addImportantToEachRule,
  cssVariableAnimationDuration,
  getHiddenTextJssStyle,
  hostHiddenStyles,
} from '../../styles';
import {
  colorContrastLower,
  colorPrimary,
  durationXl,
  fontPorscheNext,
  leadingNormal,
  typescale2Xl,
  typescale2Xs,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
  typescaleXs,
} from '../../styles/css-variables';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { SpinnerColor, SpinnerSize } from './spinner-utils';

/**
 * @css-variable {"name": "--p-spinner-size", "description": "Defines the width and height of the spinner. Overrides the `size` property when set.", "defaultValue": ""}
 */
const cssVarSize = '--p-spinner-size';

/**
 * @css-variable {"name": "--p-spinner-color", "description": "Defines the foreground color.", "defaultValue": ""}
 */
const cssVarColor = '--p-spinner-color';

/**
 * @css-variable {"name": "--p-spinner-track-color", "description": "Defines the track/background color.", "defaultValue": ""}
 */
const cssVarTrackColor = '--p-spinner-track-color';

const colorMap: Record<SpinnerColor, string> = {
  primary: colorPrimary,
  inherit: 'currentcolor',
};

const sizeMap: Record<SpinnerSize, string> = {
  'xx-small': typescale2Xs,
  'x-small': typescaleXs,
  small: typescaleSm,
  medium: typescaleMd,
  large: typescaleLg,
  'x-large': typescaleXl,
  'xx-large': typescale2Xl,
  inherit: 'inherit',
};

export const getComponentCss = (color: SpinnerColor, size: BreakpointCustomizable<SpinnerSize>): string => {
  const dimension = `var(${cssVarSize},${leadingNormal})`;
  const strokeDasharray = '69'; // C = 2πR
  const animationDuration = `var(${cssVariableAnimationDuration}, ${durationXl})`;
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
          strokeDashoffset: 69,
          transform: 'rotateZ(0)',
        },
        '50%, 75%': {
          strokeDashoffset: 24,
          transform: 'rotateZ(80deg)',
        },
        '100%': {
          strokeDashoffset: 69,
          transform: 'rotateZ(360deg)',
        },
      },
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      div: {
        width: dimension,
        height: dimension,
        fontFamily: fontPorscheNext, // needed for correct width/height definition based on ex-unit
        ...buildResponsiveStyles(size, (s: SpinnerSize) => ({
          fontSize: sizeMap[s], // needed for correct width/height definition based on ex-unit
        })),
      },
      svg: {
        display: 'block', // for correct vertical alignment
        fill: 'none',
        strokeWidth: 1.5,
        animation: `rotate ${animationDuration} steps(50) infinite`,
      },
      circle: {
        '&:first-child': {
          stroke: `var(${cssVarTrackColor},${colorContrastLower})`,
          '@supports (color: oklch(from red l c h))': {
            stroke: `var(${cssVarTrackColor},oklch(from var(${cssVarColor},${colorMap[color]}) l c h/.2))`,
          },
        },
        '&:last-child': {
          stroke: `var(${cssVarColor},${colorMap[color]})`,
          strokeDasharray:
            ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
              ? strokeDasharray
              : strokeDasharrayVar,
          strokeLinecap: 'round',
          animation: `dash ${animationDuration} steps(50) infinite`,
        },
      },
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
