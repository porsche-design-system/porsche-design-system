import { getFunctionalComponentPrevNextButtonStyles } from './prev-next-button-styles';
import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors, pxToRemWithUnit } from '../../../styles';
import type { ThemeExtendedElectric } from '../../../types';
import type { GradientColorTheme } from './scroller-utils';
import type { JssStyle } from 'jss';

export const getComponentCss = (
  gradientColorScheme: GradientColorTheme,
  theme: ThemeExtendedElectric,
  prevNextButtonStyle?: JssStyle
): string => {
  const { backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);
  const gradientColor = gradientColorScheme === 'surface' ? backgroundSurfaceColor : backgroundColor;

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        height: '100%',
      }),
    },
    root: {
      position: 'relative',
      margin: `0 ${pxToRemWithUnit(-4)}`,
      height: 'inherit',
    },
    'scroll-area': {
      position: 'relative',
      height: 'inherit',
      boxSizing: 'border-box',
      padding: pxToRemWithUnit(4),
      overflowY: 'hidden',
      overflowX: 'scroll',
      whiteSpace: 'nowrap',
      msOverflowStyle: 'none' /* IE and Edge */,
      scrollbarWidth: 'none' /* Firefox */,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    // Extra wrapper needed to compensate different offset parent calculation depending of browser.
    // Needed for position of status bar.
    'scroll-wrapper': {
      position: 'relative',
      display: 'inline-block',
      padding: '0',
      minWidth: '100%',
    },
    trigger: {
      display: 'block',
      position: 'absolute',
      top: 0,
      height: '100%',
      width: pxToRemWithUnit(1),
      visibility: 'hidden',
      '&:first-of-type': {
        left: 0,
      },
      '&:last-of-type': {
        right: 0,
      },
    },
    ...getFunctionalComponentPrevNextButtonStyles(gradientColor, prevNextButtonStyle),
  });
};
