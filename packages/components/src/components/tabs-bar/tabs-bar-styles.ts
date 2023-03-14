import type { TabsBarSize, TabsBarWeight, TabsBarWeightDeprecated } from './tabs-bar-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import {
  addImportantToEachRule,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontSizeText,
  frostedGlassStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';

const tabsTransitionDuration = '.4s';

const transformSelector = (selector: string): string =>
  ['a', 'button'].map((tag) => selector.replace(/\[role]/g, tag)).join();

export const getComponentCss = (
  size: BreakpointCustomizable<TabsBarSize>,
  weight: Exclude<TabsBarWeight, TabsBarWeightDeprecated>,
  theme: Theme
): string => {
  const { primaryColor, hoverColor, focusColor } = getThemedColors(theme);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          position: 'relative',
          // TODO: probably not needed because there is no style with position: fixed
          transform: 'translate3d(0,0,0)', // creates new stacking context
          ...hostHiddenStyles,
        }),
      },
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
          borderRadius: borderRadiusSmall,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-2px',
            bottom: '-2px',
            left: '-4px',
            right: '-4px',
            borderRadius: borderRadiusSmall,
            zIndex: '-1', // Stack the pseudo-element behind the button to avoid overlay of frosted-glass effect with label text
            ...hoverMediaQuery({
              transition: getTransition('background'),
            }),
          },
        },
        ...hoverMediaQuery({
          [transformSelector('::slotted([role]:hover)::before')]: {
            ...frostedGlassStyle,
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
      ...buildResponsiveStyles(size, (s: TabsBarSize) => ({ fontSize: fontSizeText[s] })),
    },
    bar: {
      display: 'block',
      position: 'absolute',
      width: 0,
      height: weight === 'semi-bold' ? '2px' : '1.5px',
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
