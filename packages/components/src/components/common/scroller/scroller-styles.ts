import { getCss } from '../../../utils';
import { addImportantToEachRule, getThemedColors, pxToRemWithUnit } from '../../../styles';
import type { ThemeExtendedElectric } from '../../../utils';
import type { GradientColorTheme } from './scroller-utils';
import type { JssStyle } from 'jss';

const actionButtonStyles: JssStyle = {
  display: 'flex',
  position: 'absolute',
  top: 0,
  height: '100%',
  alignItems: 'center',
};

export const getComponentCss = (
  gradientColorScheme: GradientColorTheme,
  theme: ThemeExtendedElectric,
  isNextHidden: boolean,
  isPrevHidden: boolean,
  prevNextButtonStyle?: JssStyle
): string => {
  const { backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);
  const gradientColor = gradientColorScheme === 'surface' ? backgroundSurfaceColor : backgroundColor;
  const gradientColorTransparent = gradientColor + (gradientColor.length === 4 ? '0' : '00');

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
    'action-prev': {
      ...actionButtonStyles,
      left: 0,
      justifyContent: 'flex-start',
      '& $gradient': {
        background: `linear-gradient(90deg, ${gradientColor} 50%, ${gradientColorTransparent} 100%)`,
      },
      visibility: isPrevHidden ? 'hidden' : 'visible',
    },
    'action-next': {
      ...actionButtonStyles,
      right: 0,
      justifyContent: 'flex-end',
      '& $gradient': {
        background: `linear-gradient(90deg, ${gradientColorTransparent} 0%, ${gradientColor} 50%)`,
      },
      visibility: isNextHidden ? 'hidden' : 'visible',
    },
    button: {
      position: 'absolute',
      top: '50%',
      transform: 'translate3d(0,-50%,0)',
      ...prevNextButtonStyle,
    },
    gradient: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '2em',
      pointerEvents: 'none',
    },
  });
};
