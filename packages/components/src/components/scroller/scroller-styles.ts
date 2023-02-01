import { getCss, isThemeDark } from '../../utils';
import { addImportantToEachRule, getInsetJssStyle, getThemedColors } from '../../styles';
import type { Theme } from '../../types';
import type { GradientColorTheme } from './scroller-utils';
import { borderRadiusSmall, borderWidthBase } from '@porsche-design-system/utilities-v2';
import type { ScrollIndicatorPosition } from './scroller-utils';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

const gradientColorMap: { [K in Theme]: { [T in GradientColorTheme]: string } } = {
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
  const gradientRGB = gradientColorMap[theme][gradientColorTheme];

  return (
    `rgba(${gradientRGB},1) 0%,` +
    `rgba(${gradientRGB},0.9) 20%,` +
    `rgba(${gradientRGB},0.852589) 26.67%,` +
    `rgba(${gradientRGB},0.768225) 33.33%,` +
    `rgba(${gradientRGB},0.668116) 40%,` +
    `rgba(${gradientRGB},0.557309) 46.67%,` +
    `rgba(${gradientRGB},0.442691) 53.33%,` +
    `rgba(${gradientRGB},0.331884) 60%,` +
    `rgba(${gradientRGB},0.231775) 66.67%,` +
    `rgba(${gradientRGB},0.147411) 73.33%,` +
    `rgba(${gradientRGB},0.0816599) 80%,` +
    `rgba(${gradientRGB},0.03551) 86.67%,` +
    `rgba(${gradientRGB},0.0086472) 93.33%,` +
    `rgba(${gradientRGB},0)`
  );
};

export const getComponentCss = (
  gradientColorTheme: GradientColorTheme,
  isNextHidden: boolean,
  isPrevHidden: boolean,
  scrollIndicatorPosition: ScrollIndicatorPosition,
  theme: Theme
): string => {
  const { backgroundColor, focusColor } = getThemedColors(theme);

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
    },
    root: {
      display: 'grid',
      gridTemplateColumns: '48px minmax(0, 1fr) 48px',
      margin: '0 -4px',
      height: 'inherit',
    },
    'scroll-area': {
      minHeight: '28px',
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
      '& .button': {
        marginLeft: '6px',
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
      '& .button': {
        marginRight: '6px',
        ...hoverMediaQuery({
          visibility: isNextHidden ? 'hidden' : 'visible',
        }),
      },
    },
    button: {
      pointerEvents: 'auto',
      position: 'static',
      backgroundColor,
      borderRadius: borderRadiusSmall,
      border: `2px solid ${backgroundColor}`,
      visibility: 'hidden',
      ...(!isThemeDark(theme) && {
        // Needed to ensure visibility as dropShadowMediumStyle conflicts with frostedGlass filter
        boxShadow:
          '0px 0px 0.6px rgba(0, 0, 0, 0.02), 0px 0px 2.7px rgba(0, 0, 0, 0.028), 0px 0px 6.3px rgba(0, 0, 0, 0.035), 0px 0px 10.9px rgba(0, 0, 0, 0.042), 0px 0px 14.6px rgba(0, 0, 0, 0.05), 0px 0px 16px rgba(0, 0, 0, 0.07)',
      }),
      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
    },
  });
};
