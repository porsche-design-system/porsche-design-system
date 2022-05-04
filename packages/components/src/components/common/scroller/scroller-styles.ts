import { getFunctionalComponentPrevNextButtonStyles } from './prev-next-button-styles';
import { getCss } from '../../../utils';
import { getThemedColors } from '../../../styles';
import type { ThemeExtendedElectric } from '../../../types';
import type { GradientColorTheme } from './scroller-utils';

export const getComponentCss = (gradientColorScheme: GradientColorTheme, theme: ThemeExtendedElectric): string => {
  const { backgroundColor, backgroundSurfaceColor } = getThemedColors(theme);
  const gradientColor = gradientColorScheme === 'surface' ? backgroundSurfaceColor : backgroundColor;

  // TODO: When VRT tests align, change px values to rem
  return getCss({
    root: {
      position: 'relative',
      margin: '0 -4px',
    },
    'scroll-area': {
      position: 'relative',
      // TODO: move these styles someplace else
      // padding: hasTabsBarParent ? '4px 4px .5em' : '4px',
      padding: '4px',
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
      width: '1px',
      visibility: 'hidden',
      '&:first-of-type': {
        left: 0,
      },
      '&:last-of-type': {
        right: 0,
      },
    },
    ...getFunctionalComponentPrevNextButtonStyles(gradientColor),
  });
};
