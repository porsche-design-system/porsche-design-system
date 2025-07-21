import { getCss, isThemeDark } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  dismissButtonJssStyle,
  getFocusJssStyle,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import type { Theme } from '../../types';
import type { ScrollerAlignScrollIndicator, ScrollerGradientColor } from './scroller-utils';
import { borderRadiusSmall, dropShadowLowStyle, fontLineHeight } from '@porsche-design-system/styles';

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
  alignScrollIndicator: ScrollerAlignScrollIndicator,
  hasScrollbar: boolean,
  theme: Theme
): string => {
  const actionPrevNextStyles = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    direction: 'ltr',
    width: prevNextWrapperWidth,
    padding: '4px 0',
    display: 'flex',
    alignItems: alignScrollIndicator === 'center' ? 'center' : 'flex-start',
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
      ...preventFoucOfNestedElementsStyles,
    },
    root: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: `${prevNextWrapperWidth} minmax(0, 1fr) ${prevNextWrapperWidth}`,
      height: 'inherit',
    },
    'scroll-area': {
      gridArea: '1 / 1 / 1 / -1',
      padding: '4px 0',
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
      borderRadius: borderRadiusSmall,
      ...getFocusJssStyle(theme),
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
      visibility: isPrevHidden ? 'hidden' : 'inherit',
      '& .action-button': {
        marginLeft: '8px',
        // hide buttons on mobile (actually devices not supporting hover)
        ...hoverMediaQuery({
          visibility: isPrevHidden ? 'hidden' : 'inherit',
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
      visibility: isNextHidden ? 'hidden' : 'inherit',
      '& .action-button': {
        marginRight: '8px',
        // hide buttons on mobile (actually devices not supporting hover)
        ...hoverMediaQuery({
          visibility: isNextHidden ? 'hidden' : 'inherit',
        }),
      },
    },
    'action-button': {
      ...dismissButtonJssStyle,
      ...(!isThemeDark(theme) && dropShadowLowStyle),
    },
    icon: {
      '&:dir(rtl)': {
        transform: 'scaleX(-1)',
      },
    },
  });
};
