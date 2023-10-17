import { getCss, isThemeDark } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../styles';
import type { Theme } from '../../types';
import type { ScrollerGradientColor, ScrollerScrollIndicatorPosition } from './scroller-utils';
import {
  borderRadiusSmall,
  borderWidthBase,
  dropShadowLowStyle,
  fontLineHeight,
  frostedGlassStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';

const gradientColorLight: Record<ScrollerGradientColor, string> = {
  'background-base': '255,255,255',
  'background-surface': '238,239,242',
};

const gradientColorDark: Record<ScrollerGradientColor, string> = {
  'background-base': '14,14,18',
  'background-surface': '33,34,37',
};

const gradientColorMap: Record<Theme, Record<ScrollerGradientColor, string>> = {
  auto: gradientColorLight,
  light: gradientColorLight,
  dark: gradientColorDark,
};

const getGradient = (theme: Theme, gradientColorTheme: ScrollerGradientColor): string => {
  const gradientColor = gradientColorMap[theme][gradientColorTheme];

  return (
    `rgba(${gradientColor},1) 20%,` +
    `rgba(${gradientColor},0.6) 48%,` +
    `rgba(${gradientColor},0.3) 68%,` +
    `rgba(${gradientColor},0)`
  );
};

const prevNextWrapperWidth = `calc(${fontLineHeight} + 24px)`;

export const getComponentCss = (
  gradientColor: ScrollerGradientColor,
  isNextHidden: boolean,
  isPrevHidden: boolean,
  scrollIndicatorPosition: ScrollerScrollIndicatorPosition,
  hasScrollbar: boolean,
  theme: Theme
): string => {
  const { backgroundColor, backgroundSurfaceColor, focusColor, hoverColor } = getThemedColors(theme);
  const {
    backgroundColor: backgroundColorDark,
    backgroundSurfaceColor: backgroundSurfaceColorDark,
    focusColor: focusColorDark,
    hoverColor: hoverColorDark,
  } = getThemedColors('dark');
  const backgroundColorLight: Record<ScrollerGradientColor, string> = {
    'background-base': backgroundColor,
    'background-surface': backgroundSurfaceColor,
  };

  const backgroundColorMap: Record<Theme, Record<ScrollerGradientColor, string>> = {
    auto: backgroundColorLight,
    light: backgroundColorLight,
    dark: {
      'background-base': backgroundSurfaceColorDark,
      'background-surface': backgroundColorDark,
    },
  };

  const actionPrevNextStyles = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    direction: 'ltr',
    width: prevNextWrapperWidth,
    padding: '4px 0',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: scrollIndicatorPosition === 'center' ? 'center' : 'flex-start',
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          height: 'inherit',
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      button: {
        display: 'flex',
        pointerEvents: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        ...textSmallStyle,
        height: `calc(${fontLineHeight} + 4px)`,
        width: `calc(${fontLineHeight} + 4px)`,
        border: 0,
        outline: 0,
        cursor: 'pointer',
        background: backgroundColorMap[theme][gradientColor],
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundColorMap.dark[gradientColor],
        }),
        borderRadius: borderRadiusSmall,
        ...frostedGlassStyle,
        visibility: 'hidden',
        ...(!isThemeDark(theme) && dropShadowLowStyle),
        ...hoverMediaQuery({
          transition: getTransition('background-color'),
          '&:hover': {
            ...frostedGlassStyle,
            background: hoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: hoverColorDark,
            }),
          },
        }),
      },
    },
    root: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: `${prevNextWrapperWidth} minmax(0, 1fr) ${prevNextWrapperWidth}`,
      margin: '0 -4px',
      height: 'inherit',
    },
    'scroll-area': {
      gridArea: '1 / 1 / 1 / -1',
      padding: '4px',
      overflow: 'auto hidden',
      ...(!hasScrollbar && {
        // If scrollbar is disabled - hide scrollbar
        msOverflowStyle: 'none' /* IE and Edge */,
        scrollbarWidth: 'none' /* Firefox */,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }),
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
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: focusColorDark,
        }),
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
      left: '-1px', // ensures that the gradient always overlays the content (e.g. when zoomed)
      justifyContent: 'flex-start',
      background: `linear-gradient(to right, ${getGradient(theme, gradientColor)} 100%)`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        background: `linear-gradient(to right, ${getGradient('dark', gradientColor)} 100%)`,
      }),
      visibility: isPrevHidden ? 'hidden' : 'visible',
      '& button': {
        marginLeft: '8px',
        // hide buttons on mobile (actually devices not supporting hover)
        ...hoverMediaQuery({
          visibility: isPrevHidden ? 'hidden' : 'visible',
        }),
      },
    },
    'action-next': {
      ...actionPrevNextStyles,
      right: '-1px', // ensures that the gradient always overlays the content (e.g. when zoomed)
      justifyContent: 'flex-end',
      background: `linear-gradient(to left, ${getGradient(theme, gradientColor)} 100%)`,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        background: `linear-gradient(to left, ${getGradient('dark', gradientColor)} 100%)`,
      }),
      visibility: isNextHidden ? 'hidden' : 'visible',
      '& button': {
        marginRight: '8px',
        // hide buttons on mobile (actually devices not supporting hover)
        ...hoverMediaQuery({
          visibility: isNextHidden ? 'hidden' : 'visible',
        }),
      },
    },
  });
};
