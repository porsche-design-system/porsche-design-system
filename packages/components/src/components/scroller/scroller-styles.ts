import { getCss, isThemeDark } from '../../utils';
import { addImportantToEachRule, getInsetJssStyle, getThemedColors, getTransition } from '../../styles';
import type { Theme } from '../../types';
import type { GradientColorTheme } from './scroller-utils';
import {
  borderRadiusSmall,
  borderWidthBase,
  dropShadowLowStyle,
  fontLineHeight,
  frostedGlassStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { ScrollIndicatorPosition } from './scroller-utils';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

const gradientColorMap: { [key in Theme]: Record<GradientColorTheme, string> } = {
  light: {
    default: '255,255,255',
    surface: '238,239,242',
  },
  dark: {
    default: '14,14,18',
    surface: '33,34,37',
  },
};

const getGradient = (theme: Theme, gradientColorTheme: GradientColorTheme): string => {
  const gradientColor = gradientColorMap[theme][gradientColorTheme];

  return (
    `rgba(${gradientColor},1) 0%,` +
    `rgba(${gradientColor},0.9) 10%,` +
    `rgba(${gradientColor},0.668116) 40%,` +
    `rgba(${gradientColor},0.331884) 60%,` +
    `rgba(${gradientColor},0.0816599) 80%,` +
    `rgba(${gradientColor},0)`
  );
};

export const getComponentCss = (
  gradientColorTheme: GradientColorTheme,
  isNextHidden: boolean,
  isPrevHidden: boolean,
  scrollIndicatorPosition: ScrollIndicatorPosition,
  theme: Theme
): string => {
  const { backgroundColor, backgroundSurfaceColor, focusColor } = getThemedColors('light');
  const { hoverColor } = getThemedColors(theme);

  const isDarkTheme = isThemeDark(theme);

  const actionPrevNextStyles = {
    position: 'relative',
    padding: '4px 0',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: scrollIndicatorPosition === 'center' ? 'center' : 'flex-start',
  };

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        height: 'inherit',
        ...hostHiddenStyles,
      }),
      button: {
        display: 'flex',
        pointerEvents: 'auto',
        position: 'static',
        alignItems: 'center',
        justifyContent: 'center',
        ...textSmallStyle,
        height: `calc(${fontLineHeight} + 4px)`,
        width: `calc(${fontLineHeight} + 4px)`,
        border: 0,
        outline: 0,
        cursor: 'pointer',
        background: gradientColorTheme === 'surface' ? backgroundSurfaceColor : backgroundColor,
        borderRadius: borderRadiusSmall,
        ...frostedGlassStyle,
        visibility: 'hidden',
        ...(!isDarkTheme && {
          ...dropShadowLowStyle,
        }),
        ...hoverMediaQuery({
          transition: getTransition('background-color'),
          '&:hover': {
            backgroundColor: hoverColor,
            ...(isDarkTheme && {
              '& > .icon': {
                filter: 'invert(97%) sepia(55%) saturate(2840%) hue-rotate(180deg) brightness(114%) contrast(103%)', // TODO: this is not shared from icon?
              },
            }),
          },
        }),
      },
    },
    root: {
      display: 'grid',
      gridTemplateColumns: '48px minmax(0, 1fr) 48px',
      ...hoverMediaQuery({
        // distinguish gradient width on mobile and desktop
        gridTemplateColumns: '64px minmax(0, 1fr) 64px',
      }),
      margin: '0 -4px',
      height: 'inherit',
    },
    'scroll-area': {
      gridArea: '1 / 1 / 1 / -1',
      padding: '4px',
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
      position: 'relative',
      display: 'inline-flex',
      minHeight: '28px',
      minWidth: '100%',
      verticalAlign: 'top',
      outline: 0,
      '&::before': {
        content: '""',
        position: 'absolute',
        ...getInsetJssStyle(-4),
        border: `${borderWidthBase} solid transparent`,
        borderRadius: borderRadiusSmall,
        pointerEvents: 'none', // Needed to enable clicks inside of slot
      },
      '&:focus::before': {
        borderColor: focusColor,
      },
      '&:focus:not(:focus-visible)::before': {
        borderColor: 'transparent',
      },
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
      background: `linear-gradient(to right, ${getGradient(theme, gradientColorTheme)} 100%)`,
      visibility: isPrevHidden ? 'hidden' : 'visible',
      '& button': {
        marginLeft: '8px',
        // Hide buttons on mobile
        ...hoverMediaQuery({
          visibility: isPrevHidden ? 'hidden' : 'visible',
        }),
      },
    },
    'action-next': {
      ...actionPrevNextStyles,
      marginRight: '-1px', // ensures that the gradient always overlays the content (e.g. when zoomed)
      gridArea: '1 / 3 / 1 / 3',
      justifyContent: 'flex-end',
      background: `linear-gradient(to left, ${getGradient(theme, gradientColorTheme)} 100%)`,
      visibility: isNextHidden ? 'hidden' : 'visible',
      '& button': {
        marginRight: '8px',
        // Hide buttons on mobile
        ...hoverMediaQuery({
          visibility: isNextHidden ? 'hidden' : 'visible',
        }),
      },
    },
  });
};
