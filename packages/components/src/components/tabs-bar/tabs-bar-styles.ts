import type { TabSize, TabWeight } from './tabs-bar-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, getThemedColors, getTransition } from '../../styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import { borderRadiusSmall, borderWidthBase, fontSizeText, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../styles/hover-media-query';
import { hostHiddenStyles } from '../../styles/host-hidden-styles';

const tabsTransitionDuration = '.4s';

const transformSelector = (selector: string): string =>
  ['a', 'button'].map((tag) => selector.replace(/\[role]/g, tag)).join();

export const getComponentCss = (size: BreakpointCustomizable<TabSize>, weight: TabWeight, theme: Theme): string => {
  const { primaryColor, hoverColor, focusColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        position: 'relative',
        ...hostHiddenStyles,
      }),
      ...addImportantToEachRule({
        // would be nice to use shared selector like '::slotted([role])'
        // but this doesn't work reliably when rendering in browser
        [transformSelector('::slotted([role])')]: {
          display: 'inline-block',
          position: 'relative',
          margin: '0 0 4px 0',
          padding: 0,
          verticalAlign: 'top',
          fontFamily: 'inherit',
          fontStyle: 'inherit',
          fontVariant: 'inherit',
          fontWeight: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          WebkitAppearance: 'none',
          appearance: 'none',
          outline: 0,
          outlineOffset: '1px',
          textDecoration: 'none',
          textAlign: 'left',
          border: 0,
          background: 'transparent',
          color: primaryColor,
          cursor: 'pointer',
          transition: getTransition('background'),
          borderRadius: borderRadiusSmall,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-2px',
            bottom: '-2px',
            left: '-4px',
            right: '-4px',
            background: 'transparent',
            borderRadius: borderRadiusSmall,
          },
        },
        ...hoverMediaQuery({
          [transformSelector('::slotted([role]:hover)::before')]: {
            background: hoverColor,
          },
        }),
        // TODO: combine link-social-styles with link-button-styles and tabs-bar-styles
        [transformSelector('::slotted([role]:focus)::before')]: {
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: borderRadiusSmall,
        },
        [transformSelector('::slotted([role]:focus:not(:focus-visible))::before')]: {
          borderColor: 'transparent',
        },
        [transformSelector('::slotted([role]:not(:last-child))')]: {
          marginRight: '16px', // No token for this spacing exists yet
        },
      }),
    },
    scroller: {
      ...textSmallStyle,
      fontWeight: getFontWeight(weight),
      ...buildResponsiveStyles(size, (s: TabSize) => ({ fontSize: fontSizeText[s] })),
    },
    bar: {
      display: 'block',
      position: 'absolute',
      width: 0,
      height: weight === 'semibold' ? '2px' : '1.5px',
      left: 0,
      bottom: '-4px',
      background: primaryColor,
      '&--enable-transition': {
        willChange: 'width',
        transition: `transform ${tabsTransitionDuration},width ${tabsTransitionDuration}`,
      },
    },
  });
};
