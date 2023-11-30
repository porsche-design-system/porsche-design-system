import type { JssStyle } from 'jss';
import type { SpinnerSize } from './spinner-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isHighContrastMode } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableAnimationDuration,
  getHiddenTextJssStyle,
  getHighContrastColors,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import { motionDurationVeryLong } from '@porsche-design-system/utilities-v2';

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
  const animationDuration = `var(${cssVariableAnimationDuration}, ${motionDurationVeryLong})`;
  const strokeDasharrayVar = `var(--p-temporary-spinner-stroke-dasharray, ${strokeDasharray})`; // override needed for VRT to visualize both circles
  const { primaryColor, contrastMediumColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, contrastMediumColor: contrastMediumColorDark } = getThemedColors('dark');
  const { canvasColor, canvasTextColor } = getHighContrastColors();
  const firstHighContrastStrokeColor = isHighContrastMode && canvasTextColor;
  const lastHighContrastStrokeColor = isHighContrastMode && canvasColor;

  return getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        ...addImportantToEachRule({
          verticalAlign: 'top',
          ...colorSchemeStyles,
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
          // TODO: High Contrast Mode should be handled within a local color helper function
          stroke: firstHighContrastStrokeColor || contrastMediumColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            stroke: firstHighContrastStrokeColor || contrastMediumColorDark,
          }),
        },
        '&:last-child': {
          animation: `$dash ${animationDuration} steps(50) infinite`,
          // TODO: High Contrast Mode should be handled within a local color helper function
          stroke: lastHighContrastStrokeColor || primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            stroke: lastHighContrastStrokeColor || primaryColorDark,
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
      strokeWidth: 1.5,
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
