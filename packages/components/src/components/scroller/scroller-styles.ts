import { getCss } from '../../utils';
import { addImportantToRule, getThemedColors, pxToRemWithUnit } from '../../styles';
import type { ThemeExtendedElectric } from '../../types';
import type { GradientColorTheme } from './scroller-utils';
import { getFocus } from '@porsche-design-system/utilities-v2';
import type { ScrollIndicatorPosition } from './scroller-utils';

export const getComponentCss = (
  gradientColorScheme: GradientColorTheme,
  isNextHidden: boolean,
  isPrevHidden: boolean,
  scrollIndicatorPosition: ScrollIndicatorPosition,
  theme: ThemeExtendedElectric
): string => {
  const { backgroundColor, backgroundSurfaceColor, baseColor } = getThemedColors(theme);
  const gradientColor = gradientColorScheme === 'surface' ? backgroundSurfaceColor : backgroundColor;
  const gradientColorTransparent = gradientColor + (gradientColor.length === 4 ? '0' : '00');

  const actionPrevNextStyles = {
    position: 'relative',
    margin: '-1px, 0', // Fixes gradient height when zoomed
    padding: `${pxToRemWithUnit(4)} 0`,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: scrollIndicatorPosition === 'center' ? 'center' : 'flex-start',
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        height: addImportantToRule('inherit'),
      },
    },
    root: {
      display: 'grid',
      gridTemplateColumns: '2em minmax(0, 1fr) 2em',
      margin: `0 ${pxToRemWithUnit(-4)}`,
      height: 'inherit',
    },
    'scroll-area': {
      minHeight: pxToRemWithUnit(24),
      gridArea: '1 / 1 / 1 / -1',
      padding: pxToRemWithUnit(4),
      overflow: 'scroll hidden',
      msOverflowStyle: 'none' /* IE and Edge */,
      scrollbarWidth: 'none' /* Firefox */,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    // Extra wrapper needed to compensate different offset parent calculation depending of browser.
    // Needed for position of status bar.
    'scroll-wrapper': {
      ...getFocus({ color: baseColor }),
      position: 'relative',
      display: 'inline-flex',
      minWidth: '100%',
      verticalAlign: 'top',
    },
    trigger: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '1px',
      visibility: 'hidden',
      '&:first-of-type': {
        left: 0,
      },
      '&:last-of-type': {
        right: 0,
      },
    },
    'action-prev': {
      ...actionPrevNextStyles,
      marginLeft: '-1px',  // Fixes gradient height when zoomed
      gridArea: '1 / 1 / 1 / 1',
      justifyContent: 'flex-start',
      background: `linear-gradient(90deg, ${gradientColor} 50%, ${gradientColorTransparent} 100%)`,
      visibility: isPrevHidden ? 'hidden' : 'visible',
      '& .button::before': {
        left: 0,
      },
    },
    'action-next': {
      ...actionPrevNextStyles,
      marginRight: '-1px',  // Fixes gradient height when zoomed
      gridArea: '1 / 3 / 1 / 3',
      justifyContent: 'flex-end',
      background: `linear-gradient(90deg, ${gradientColorTransparent} 0%, ${gradientColor} 50%)`,
      visibility: isNextHidden ? 'hidden' : 'visible',
      '& .button::before': {
        right: 0,
      },
    },
    button: {
      pointerEvents: 'auto',
      position: 'static',
      // Pseudo-element to stretch the click-area to full height
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 'max(2rem, 80%)',
      },
    },
  });
};
