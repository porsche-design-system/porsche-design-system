import { colorContrastLower, durationXl, fontPorscheNext, leadingNormal, ref } from '@porsche-design-system/stylesheets';
import {
  addImportantToEachRule,
  addImportantToRule,
  cssVariableAnimationDuration,
  forcedColorsMediaQuery,
  getHiddenTextCssStyle,
  hostHiddenStyles,
} from '../../styles';
import { colorMap, sizeMap } from '../../styles/maps';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import type { SpinnerColor, SpinnerSize } from './spinner-utils';

/**
 * @css-variable {"name": "--p-spinner-size", "description": "Defines the width and height of the spinner. Overrides the `size` property when set.", "defaultValue": ""}
 */
const cssVarSize = '--p-spinner-size';

/**
 * @css-variable {"name": "--p-spinner-color", "description": "Defines the foreground color. Overrides the `color` property when set.", "defaultValue": ""}
 */
const cssVarColor = '--p-spinner-color';

/**
 * @css-variable {"name": "--p-spinner-track-color", "description": "Defines the track/background color. Overrides the `color` property when set.", "defaultValue": ""}
 */
const cssVarTrackColor = '--p-spinner-track-color';

export const getComponentCss = (color: SpinnerColor, size: BreakpointCustomizable<SpinnerSize>): string => {
  const dimension = ref(cssVarSize, ref(leadingNormal));
  const strokeDasharray = '69'; // C = 2πR
  const animationDuration = ref(cssVariableAnimationDuration, ref(durationXl));
  const strokeDasharrayVar = ref('--p-temporary-spinner-stroke-dasharray', strokeDasharray); // override needed for VRT to visualize both circles

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
        fontFamily: ref(fontPorscheNext), // needed for correct width/height definition based on ex-unit
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
          stroke: ref(cssVarTrackColor, ref(colorContrastLower)),
          '@supports (color: oklch(from red l c h))': {
            stroke: ref(cssVarTrackColor, `oklch(from ${ref(cssVarColor, colorMap[color])} l c h/.2)`),
          },
          ...forcedColorsMediaQuery({
            stroke: addImportantToRule('none'),
          }),
        },
        '&:last-child': {
          stroke: ref(cssVarColor, colorMap[color]),
          ...forcedColorsMediaQuery({
            stroke: 'CanvasText',
          }),
          strokeDasharray:
            ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
              ? strokeDasharray
              : strokeDasharrayVar,
          strokeLinecap: 'round',
          animation: `dash ${animationDuration} steps(50) infinite`,
        },
      },
    },
    'sr-only': getHiddenTextCssStyle(),
  });
};
