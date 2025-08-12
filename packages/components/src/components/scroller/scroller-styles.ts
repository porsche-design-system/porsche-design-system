import { borderRadiusSmall, dropShadowLowStyle, fontLineHeight } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  dismissButtonJssStyle,
  getFocusJssStyle,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import type { Theme } from '../../types';
import { getCss, isThemeDark } from '../../utils';
import type { ScrollerAlignScrollIndicator } from './scroller-utils';

const prevNextWrapperWidth = `calc(${fontLineHeight} + 24px)`;

export const getComponentCss = (
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
        mask: isNextHidden
          ? 'linear-gradient(90deg,#0000 8px,#000 40px) alpha'
          : isPrevHidden
            ? 'linear-gradient(90deg,#000 calc(100% - 40px), #0000 calc(100% - 8px)) alpha'
            : 'linear-gradient(90deg,#0000 8px,#000 40px calc(100% - 40px),#0000 calc(100% - 8px)) alpha',
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
