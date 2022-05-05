import type { BreakpointCustomizable } from '../../../types';
import type { TabSize, TabWeight } from './tabs-bar-utils';
import type { ThemeExtendedElectric } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import { addImportantToEachRule, getTransition, getThemedColors, pxToRemWithUnit } from '../../../styles';
import { getFontWeight } from '../../../styles/font-weight-styles';
import { fontSize, textSmall } from '@porsche-design-system/utilities-v2';
const tabsTransitionDuration = '.4s';

const transformSelector = (selector: string): string =>
  ['a', 'button'].map((tag) => selector.replace(/\[role]/g, tag)).join(',');

export const getComponentCss = (
  size: BreakpointCustomizable<TabSize>,
  weight: TabWeight,
  theme: ThemeExtendedElectric
): string => {
  const { baseColor, hoverColor, activeColor, focusColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          position: 'relative',
          height: size === 'medium' ? pxToRemWithUnit(52) : pxToRemWithUnit(36),
        }),
      },
      ...addImportantToEachRule({
        // would be nice to use shared selector like '::slotted([role])'
        // but this doesn't work reliably when rendering in browser
        [transformSelector('::slotted([role])')]: {
          display: 'inline-block',
          margin: 0,
          padding: 0,
          verticalAlign: 'top',
          fontFamily: 'inherit',
          fontStyle: 'inherit',
          fontVariant: 'inherit',
          fontWeight: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          whiteSpace: 'inherit',
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
      ...textSmall,
      fontWeight: getFontWeight(weight),
      ...buildResponsiveStyles(size, (s: TabSize) => fontSize[s]),
      height: 'inherit',
    },
    bar: {
      display: 'block',
      position: 'absolute',
      width: 0,
      height: weight === 'semibold' ? '.125em' : '.09375em',
      left: 0,
      bottom: '-.5em',
      background: activeColor,
      '&--enable-transition': {
        willChange: 'width',
        transition: `transform ${tabsTransitionDuration},width ${tabsTransitionDuration}`,
      },
    },
  });
};
