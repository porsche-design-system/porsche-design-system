import { spacingFluidMedium, spacingFluidSmall } from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  dismissButtonJssStyle,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import {
  dialogGridJssStyle,
  dialogHostJssStyle,
  dialogPaddingBlock,
  getDialogColorJssStyle,
  getDialogJssStyle,
  getDialogStickyAreaJssStyle,
  getDialogTransitionJssStyle,
  getScrollerJssStyle,
} from '../../styles/dialog-styles';
import { type Theme, getCss } from '../../utils';
import type { FlyoutFooterBehavior, FlyoutPosition } from './flyout-utils';

/**
 * @css-variable {"name": "--p-flyout-width", "description": "Width of the flyout.", "defaultValue": "auto"}
 */
const cssVariableWidth = '--p-flyout-width';
// TODO: we shouldn't expose --p-flyout-max-width
const cssVariableMaxWidth = '--p-flyout-max-width';

export const getComponentCss = (
  isOpen: boolean,
  position: FlyoutPosition,
  hasHeader: boolean,
  hasFooter: boolean,
  hasSubFooter: boolean,
  footerBehavior: FlyoutFooterBehavior,
  theme: Theme
): string => {
  const isPositionStart = position === 'start' || position === 'left';
  const isFooterFixed = footerBehavior === 'fixed';

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...dialogHostJssStyle,
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      slot: {
        display: 'block',
        '&:first-of-type': {
          gridRowStart: 1,
        },
        '&:not([name])': {
          gridColumn: '2/3',
          zIndex: 0, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
          ...(isFooterFixed &&
            hasHeader && {
              gridRow: 2,
            }),
        },
        ...(hasHeader && {
          '&[name=header]': {
            ...getDialogStickyAreaJssStyle('header', theme),
            gridColumn: '1/-1',
            zIndex: 3, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
            ...(isFooterFixed && {
              gridRow: 1,
            }),
            marginBlockStart: 0,
          },
        }),
        ...(hasFooter && {
          '&[name=footer]': {
            ...getDialogStickyAreaJssStyle('footer', theme),
            gridColumn: '1/-1',
            zIndex: 2, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
            ...(isFooterFixed && {
              gridRow: hasHeader ? 3 : 2,
              ...(!hasSubFooter && {
                marginBlockEnd: '.3px', // lets the footer shadow disappear when flyout is scrolled to the bottom
              }),
            }),
          },
        }),
        ...(hasSubFooter && {
          '&[name=sub-footer]': {
            gridColumn: '2/3',
            zIndex: 1, // controls layering + creates new stacking context (prevents content within to be above other dialog areas)
          },
        }),
      },
      dialog: getDialogJssStyle(isOpen, theme),
    },
    scroller: {
      ...getScrollerJssStyle(isPositionStart ? 'start' : 'end', theme),
      // compared to Modal, the transition is handled on the scroller to have correct stucked behaviour (visibility of drop shadow)
      // for sticky header area while transitioned
      ...getDialogTransitionJssStyle(isOpen, isPositionStart ? '>' : '<'),
      // Though this might be an accessibility issue, we don't want an outline to be rendered until we have a proper design solution
      '&:focus-visible': {
        outline: 'none',
      },
    },
    flyout: {
      ...dialogGridJssStyle,
      ...getDialogColorJssStyle(theme),
      width: `var(${cssVariableWidth},auto)`,
      minWidth: '320px',
      maxWidth: `var(${cssVariableMaxWidth},1180px)`,
      ...(hasHeader && {
        paddingBlockStart: 0,
      }),
      ...(isFooterFixed &&
        !hasSubFooter && {
          paddingBlockEnd: 0,
        }),
      ...(isFooterFixed && {
        gridTemplateRows: hasHeader ? 'auto 1fr auto' : '1fr',
        '&::before': {
          content: '""',
          minHeight: hasHeader ? '100dvh' : `calc(100dvh - ${dialogPaddingBlock})`,
          gridArea: `1/1/${hasHeader ? '4' : '3'}/-1`,
          pointerEvents: 'none',
        },
      }),
    },
    dismiss: {
      ...dismissButtonJssStyle,
      gridArea: '1/3',
      zIndex: 4, // ensures dismiss button is above everything
      position: 'sticky',
      insetBlockStart: spacingFluidSmall,
      insetInlineEnd: spacingFluidSmall,
      marginBlockStart: `calc(${spacingFluidMedium} * -1)`,
      placeSelf: 'flex-start flex-end',
    },
  });
};
