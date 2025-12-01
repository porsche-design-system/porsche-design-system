import {
  borderRadiusSmall,
  fontSizeText,
  frostedGlassStyle,
  motionDurationModerate,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  addImportantToRule,
  colorSchemeStyles,
  colors,
  cssVariableAnimationDuration,
  cssVariableTransitionDuration,
  getFocusJssStyle,
  getResetInitialStylesForSlottedAnchor,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss, isHighContrastMode } from '../../utils';
import type { TabsBarSize, TabsBarWeight } from './tabs-bar-utils';

export const scrollerAnimatedCssClass = 'scroller--animated';

const targetSelectors = ['a', 'button'];
const transformSelector = (selector: string): string =>
  targetSelectors.map((tag) => selector.replace(/\[role]/g, tag)).join();

const { primaryColor, frostedColor } = colors;

const barJssStyle: JssStyle = {
  position: 'absolute',
  height: '2px',
  left: 0,
  background: primaryColor,
};

export const getComponentCss = (size: BreakpointCustomizable<TabsBarSize>, weight: TabsBarWeight): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          position: 'relative',
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      ...addImportantToEachRule({
        '::slotted': {
          // TODO: produces duplicated css code in SSR context, we should try to make use of multiple selector like
          //  `::slotted(:is(a,button))`.
          ...getFocusJssStyle({ slotted: 'a', offset: '1px' }),
          ...getFocusJssStyle({ slotted: 'button', offset: '1px' }),
        },
        // would be nice to use shared selector like '::slotted([role])'
        // but this doesn't work reliably when rendering in browser
        [transformSelector('::slotted([role])')]: {
          ...getResetInitialStylesForSlottedAnchor,
          display: 'inline-block',
          position: 'relative',
          margin: '0 0 4px 0',
          verticalAlign: 'top',
          // TODO: can we use `all: 'inherit'` instead?
          fontFamily: 'inherit',
          fontStyle: 'inherit',
          fontVariant: 'inherit',
          fontWeight: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          WebkitAppearance: 'none', // iOS safari
          appearance: 'none',
          outlineOffset: '1px',
          textDecoration: 'none',
          textAlign: 'start',
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
            background: frostedColor,
          },
        }),
        // basic invisible bar, that will be delayed via transition: visibility
        [transformSelector('::slotted([role])::after')]: {
          content: '""',
          visibility: 'hidden',
        },
        // visible bar for selected tab
        [transformSelector(
          '::slotted([role][aria-selected="true"])::after, ::slotted([role][aria-current="true"])::after'
        )]: {
          ...barJssStyle,
          right: '0px',
          bottom: isHighContrastMode ? '-4px' : '-6px',
          visibility: 'inherit',
        },
        [transformSelector('::slotted([role]:not(:last-child))')]: {
          marginInlineEnd: spacingStaticMedium,
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
      [`& ${transformSelector(
        '::slotted([role][aria-selected="true"])::after, ::slotted([role][aria-current="true"])::after'
      )}`]: {
        transition: addImportantToRule(
          `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationModerate})`
        ), // bar appears after transition
      },
    },
    // moving bar
    bar: {
      ...barJssStyle,
      width: 0, // actual width and transform is set via inline css
      bottom: isHighContrastMode ? '0' : '-2px',
      visibility: 'inherit',
      transition: `${getTransition('transform', 'moderate')}, ${getTransition('width', 'moderate')}`,
      animation: `$hide 0s var(${cssVariableAnimationDuration},0.5s) forwards`, // auto hide bar after transition, needs to be a little longer in Safari
    },
    '@keyframes hide': {
      to: {
        visibility: 'hidden',
      },
    },
  });
};
