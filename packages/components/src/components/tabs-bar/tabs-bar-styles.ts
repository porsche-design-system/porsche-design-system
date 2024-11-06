import type { TabsBarSize, TabsBarWeight, TabsBarWeightDeprecated } from './tabs-bar-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss, isHighContrastMode } from '../../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  colorSchemeStyles,
  cssVariableAnimationDuration,
  cssVariableTransitionDuration,
  getFocusJssStyle,
  getHighContrastColors,
  getResetInitialStylesForSlottedAnchor,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getFontWeight } from '../../styles/font-weight-styles';
import {
  borderRadiusSmall,
  fontSizeText,
  frostedGlassStyle,
  motionDurationModerate,
  spacingStaticMedium,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';

export const scrollerAnimatedCssClass = 'scroller--animated';

const targetSelectors = ['a', 'button'];
const transformSelector = (selector: string): string =>
  targetSelectors.map((tag) => selector.replace(/\[role]/g, tag)).join();

export const getComponentCss = (
  size: BreakpointCustomizable<TabsBarSize>,
  weight: Exclude<TabsBarWeight, TabsBarWeightDeprecated>,
  theme: Theme
): string => {
  const { primaryColor, hoverColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, hoverColor: hoverColorDark } = getThemedColors('dark');

  const barJssStyle: JssStyle = {
    position: 'absolute',
    height: '2px',
    left: 0,
    ...(isHighContrastMode
      ? {
          background: getHighContrastColors().canvasTextColor,
        }
      : {
          background: primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            background: primaryColorDark,
          }),
        }),
  };

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
          ...getFocusJssStyle(theme, { slotted: 'a', offset: '1px' }),
          ...getFocusJssStyle(theme, { slotted: 'button', offset: '1px' }),
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
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: primaryColorDark,
          }),
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
            ...prefersColorSchemeDarkMediaQuery(theme, {
              background: hoverColorDark,
            }),
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
      ['& ' +
      transformSelector(
        '::slotted([role][aria-selected="true"])::after, ::slotted([role][aria-current="true"])::after'
      )]: {
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
