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
        ...colorSchemeStyles,
        ...hostHiddenStyles,
      }),
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
          transition: getTransition('background-color', 'short', 'base'),
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
      display: 'grid',
      gridTemplateColumns: `calc(${fontLineHeight} + 24px) minmax(0, 1fr) calc(${fontLineHeight} + 24px)`,
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
      marginLeft: '-1px', // ensures that the gradient always overlays the content (e.g. when zoomed)
      gridArea: '1 / 1 / 1 / 1',
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
      marginRight: '-1px', // ensures that the gradient always overlays the content (e.g. when zoomed)
      gridArea: '1 / 3 / 1 / 3',
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
