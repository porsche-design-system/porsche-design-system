import { getCss } from '../../utils';
import { addImportantToRule, getThemedColors, getTransition, pxToRemWithUnit } from '../../styles';
import type { Theme } from '../../types';
import type { GradientColorTheme } from './scroller-utils';
import { borderRadiusSmall, fontLineHeight, getFocusStyle, textSmallStyle } from '@porsche-design-system/utilities-v2';
import type { ScrollIndicatorPosition } from './scroller-utils';

export const getComponentCss = (
  gradientColorScheme: GradientColorTheme,
  isNextHidden: boolean,
  isPrevHidden: boolean,
  scrollIndicatorPosition: ScrollIndicatorPosition,
  theme: Theme
): string => {
  const { backgroundColor } = getThemedColors(theme);

  const actionPrevNextStyles = {
    position: 'relative',
    padding: `${pxToRemWithUnit(4)} 0`,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: scrollIndicatorPosition === 'center' ? 'center' : 'flex-start',
    borderRadius: borderRadiusSmall,
  };

  const gradient =
    'rgba(31,31,31,0.9) 0%,' +
    'rgba(31,31,31,0.9) 20%,' +
    'rgba(31,31,31,0.852589) 26.67%,' +
    'rgba(32,32,32,0.768225) 33.33%,' +
    'rgba(33,33,33,0.668116) 40%,' +
    'rgba(34,34,34,0.557309) 46.67%,' +
    'rgba(35,35,35,0.442691) 53.33%,' +
    'rgba(36,36,36,0.331884) 60%,' +
    'rgba(37,37,37,0.231775) 66.67%,' +
    'rgba(38,38,38,0.147411) 73.33%,' +
    'rgba(39,39,39,0.0816599) 80%,' +
    'rgba(39,39,39,0.03551) 86.67%,' +
    'rgba(39,39,39,0.0086472) 93.33%,' +
    'rgba(39,39,39,0)';

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        height: addImportantToRule('inherit'),
      },
    },
    root: {
      display: 'grid',
      gridTemplateColumns: '48px minmax(0, 1fr) 48px',
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
    // Extra wrapper needed to compensate different offset parent calculation depending on browser.
    // Needed for position of status bar.
    'scroll-wrapper': {
      ...getFocusStyle(),
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
      marginLeft: '-1px', // ensures that the gradient always overlays the content (e.g. when zoomed)
      gridArea: '1 / 1 / 1 / 1',
      justifyContent: 'flex-start',
      background: `linear-gradient(to right, ${gradient} 100%)`,
      visibility: isPrevHidden ? 'hidden' : 'visible',
      '& .button': {
        marginLeft: '10px',
      },
      '& .button::before': {
        left: 0,
      },
    },
    'action-next': {
      ...actionPrevNextStyles,
      marginRight: '-1px', // ensures that the gradient always overlays the content (e.g. when zoomed)
      gridArea: '1 / 3 / 1 / 3',
      justifyContent: 'flex-end',
      background: `linear-gradient(to left, ${gradient} 100%)`,
      visibility: isNextHidden ? 'hidden' : 'visible',
      '& .button': {
        marginRight: '10px',
      },
      '& .button::before': {
        right: 0,
      },
    },
    temp: {
      color: gradientColorScheme,
    },
    button: {
      pointerEvents: 'auto',
      position: 'static',
      ...textSmallStyle,
      backgroundColor,
      borderRadius: 'inherit',
      transition: getTransition('background-color'),
      // Pseudo-element to stretch the click-area to full height
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: fontLineHeight,
        height: fontLineHeight,
      },
    },
  });
};
