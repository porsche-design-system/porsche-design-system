import type { TabsBarSize, TabsBarWeight, TabsBarWeightDeprecated } from './tabs-bar-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isHighContrastMode } from '../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  getHighContrastColors,
  getResetInitialStylesForSlottedAnchor,
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
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { JssStyle } from 'jss';

const barTransitionDuration = '.4s';
export const scrollerAnimatedCssClass = 'scroller--animated';

const targetSelectors = ['a', 'button'];
const transformSelector = (selector: string): string =>
  targetSelectors.map((tag) => selector.replace(/\[role]/g, tag)).join();

export const getComponentCss = (
  size: BreakpointCustomizable<TabsBarSize>,
  weight: Exclude<TabsBarWeight, TabsBarWeightDeprecated>,
  theme: Theme
): string => {
  const { primaryColor, hoverColor, focusColor } = getThemedColors(theme);

  const barJssStyle: JssStyle = {
    position: 'absolute',
    height: '2px',
    left: 0,
    background: isHighContrastMode ? getHighContrastColors().canvasTextColor : primaryColor,
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          position: 'relative',
          ...hostHiddenStyles,
        }),
      },
      ...addImportantToEachRule({
        // would be nice to use shared selector like '::slotted([role])'
        // but this doesn't work reliably when rendering in browser
        [transformSelector('::slotted([role])')]: {
          ...getResetInitialStylesForSlottedAnchor,
          display: 'inline-block',
          position: 'relative',
          margin: '0 0 4px 0',
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
          outlineOffset: '1px',
          textDecoration: 'none',
          textAlign: 'left',
          border: 0,
          color: primaryColor,
          cursor: 'pointer',
          borderRadius: borderRadiusSmall,
          zIndex: 0, // needed for ::before pseudo element to be visible
          ...hoverMediaQuery({
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: '-2px -4px',
              borderRadius: borderRadiusSmall,
              zIndex: -1, // Stack the pseudo-element behind the button to avoid overlay of frosted-glass effect with label text
              transition: getTransition('background-color'),
            },
          }),
        },
        ...hoverMediaQuery({
          [transformSelector('::slotted([role]:hover)::before')]: {
            ...frostedGlassStyle,
            background: hoverColor,
          },
        }),
        // basic invisible bar, that will be delayed via transition: visibility
        [transformSelector('::slotted([role])::after')]: {
          content: '""',
          visibility: 'hidden',
        },
        // visible bar for selected tab
        [transformSelector('::slotted([role][aria-selected="true"])::after')]: {
          ...barJssStyle,
          right: '0px',
          bottom: isHighContrastMode ? '-4px' : '-6px',
          visibility: 'visible',
        },
        // TODO: combine link-social-styles with link-button-styles and tabs-bar-styles
        [transformSelector('::slotted([role]:focus:focus-visible)::before')]: {
          border: `${borderWidthBase} solid ${focusColor}`,
        },
        [transformSelector('::slotted([role]:not(:last-child))')]: {
          marginRight: spacingStaticMedium,
        },
      }),
    },
    scroller: {
      ...textSmallStyle,
      fontWeight: getFontWeight(weight),
      ...buildResponsiveStyles(size, (s: TabsBarSize) => ({ fontSize: fontSizeText[s] })),
    },
    // conditionally applied and removed based on if activeTabIndex exists
    [scrollerAnimatedCssClass]: {
      ['& ' + transformSelector('::slotted([role][aria-selected="true"])::after')]: {
        transition: addImportantToRule(`visibility 0s linear ${barTransitionDuration}`), // bar appears after transition
      },
    },
    // moving bar
    bar: {
      ...barJssStyle,
      width: 0, // actual width and transform is set via inline css
      bottom: isHighContrastMode ? '0' : '-2px',
      visibility: 'visible',
      transition: `transform ${barTransitionDuration},width ${barTransitionDuration}`,
      animation: '$hide 0s .5s forwards', // auto hide bar after transition, needs to be a little longer in Safari
    },
    '@keyframes hide': {
      to: {
        visibility: 'hidden',
      },
    },
  });
};
