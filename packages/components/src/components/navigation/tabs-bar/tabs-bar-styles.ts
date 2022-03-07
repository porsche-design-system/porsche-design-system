import type { BreakpointCustomizable } from '../../../types';
import type { TabGradientColorTheme, TabSize, TabWeight } from './tabs-bar-utils';
import type { ThemeExtendedElectric } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import { addImportantToEachRule, addImportantToRule, getTransition, getThemedColors } from '../../../styles';
import { fontFamily, fontSize, fontWeight } from '@porsche-design-system/utilities-v2';

const tabsTransitionDuration = '.4s';

const transformSelector = (selector: string): string =>
  ['a', 'button'].map((tag) => selector.replace(/\[role]/g, tag)).join(',');

export const getComponentCss = (
  size: BreakpointCustomizable<TabSize>,
  weight: TabWeight,
  gradientColorScheme: TabGradientColorTheme,
  theme: ThemeExtendedElectric
): string => {
  const { baseColor, backgroundColor, backgroundSurfaceColor, hoverColor, activeColor, focusColor } =
    getThemedColors(theme);
  const gradientColor = gradientColorScheme === 'surface' ? backgroundSurfaceColor : backgroundColor;
  const gradientColorTransparent = gradientColor + (gradientColor.length === 4 ? '0' : '00');

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        position: addImportantToRule('relative'),
      },
      ...addImportantToEachRule({
        // would be nice to use shared selector like '::slotted([role])'
        // but this doesn't work reliably when rendering in browser
        [transformSelector('::slotted([role])')]: {
          display: 'inline-block',
          margin: 0,
          padding: 0,
          verticalAlign: 'top',
          fontFamily,
          fontWeight: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          boxSizing: 'border-box',
          WebkitAppearance: 'none',
          appearance: 'none',
          outline: '1px solid transparent',
          outlineOffset: '1px',
          textDecoration: 'none',
          textAlign: 'left',
          border: 0,
          background: 'transparent',
          color: baseColor,
          cursor: 'pointer',
          transition: getTransition('color'),
        },
        [transformSelector('::slotted([role]:hover)')]: {
          color: hoverColor,
        },
        [transformSelector('::slotted([role]:active),::slotted([role][aria-selected="true"])')]: {
          color: activeColor,
        },
        [transformSelector('::slotted([role]:focus)')]: {
          outlineColor: focusColor,
        },
        [transformSelector('::slotted([role]:focus:not(:focus-visible))')]: {
          outlineColor: 'transparent',
        },
        [transformSelector('::slotted([role]:not(:last-child))')]: {
          marginRight: '1em',
        },
      }),
    },
    root: {
      position: 'relative',
      ...fontSize.small,
      fontWeight: fontWeight[weight],
      margin: '0 -4px',
      ...buildResponsiveStyles(size, (s: TabSize) => ({ ...fontSize[s] })),
    },
    'scroll-area': {
      position: 'relative',
      padding: '4px 4px 0',
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
      padding: '0 0 .5em',
      minWidth: '100%',
    },
    bar: {
      display: 'block',
      position: 'absolute',
      width: 0,
      height: weight === 'semibold' ? '.125em' : '.09375em',
      left: 0,
      bottom: 0,
      background: activeColor,
      '&--enable-transition': {
        willChange: 'width',
        transition: `transform ${tabsTransitionDuration},width ${tabsTransitionDuration}`,
      },
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
    action: {
      display: 'flex',
      position: 'absolute',
      top: '4px',
      transform: 'translate3d(0,0,0)',
      '&--prev': {
        left: 0,
        justifyContent: 'flex-start',
        '& $gradient': {
          background: `linear-gradient(90deg, ${gradientColor} 50%, ${gradientColorTransparent} 100%)`,
        },
      },
      '&--next': {
        right: 0,
        justifyContent: 'flex-end',
        '& $gradient': {
          background: `linear-gradient(90deg, ${gradientColorTransparent} 0%, ${gradientColor} 50%)`,
        },
      },
      '&--hidden': {
        visibility: 'hidden', // to make offsetWidth work
      },
    },
    gradient: {
      position: 'absolute',
      top: '-4px',
      bottom: '-.5em',
      width: '2em',
      pointerEvents: 'none',
    },
  });
};
