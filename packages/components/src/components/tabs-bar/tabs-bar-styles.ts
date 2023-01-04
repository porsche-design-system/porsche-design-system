import type { TabSize, TabWeight } from './tabs-bar-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import {
  addImportantToEachRule,
  getTransition,
  getThemedColors,
  pxToRemWithUnit,
  addImportantToRule,
} from '../../styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import { fontSize, textSmallFluid } from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../styles/hover-media-query';
const tabsTransitionDuration = '.4s';

const transformSelector = (selector: string): string =>
  ['a', 'button'].map((tag) => selector.replace(/\[role]/g, tag)).join();

export const getComponentCss = (size: BreakpointCustomizable<TabSize>, weight: TabWeight, theme: Theme): string => {
  const { primaryColor, hoverColor, activeColor, focusColor } = getThemedColors(theme);

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
          margin: `0 0 calc(.5em - ${pxToRemWithUnit(4)}) 0`,
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
          outline: '1px solid transparent',
          outlineOffset: '1px',
          textDecoration: 'none',
          textAlign: 'left',
          border: 0,
          background: 'transparent',
          color: primaryColor,
          cursor: 'pointer',
          transition: getTransition('color'),
        },
        ...hoverMediaQuery({
          [transformSelector('::slotted([role]:hover)')]: {
            color: hoverColor,
          },
        }),
        [transformSelector('::slotted([role]:active),::slotted([role][aria-selected="true"])')]: {
          color: activeColor,
        },
        // TODO: combine link-social-styles with link-button-styles and tabs-bar-styles
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
    scroller: {
      ...textSmallFluid,
      fontWeight: getFontWeight(weight),
      ...buildResponsiveStyles(size, (s: TabSize) => ({ fontSize: fontSize.fluid[s] })),
    },
    bar: {
      display: 'block',
      position: 'absolute',
      width: 0,
      height: weight === 'semibold' ? '.125em' : '.09375em',
      left: 0,
      bottom: `-${pxToRemWithUnit(4)}`,
      background: activeColor,
      '&--enable-transition': {
        willChange: 'width',
        transition: `transform ${tabsTransitionDuration},width ${tabsTransitionDuration}`,
      },
    },
  });
};
